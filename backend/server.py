import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import re
import uuid
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta

import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
from lib.db import client, db, ensure_indexes


# Startup runs before the yield, shutdown after it. Add your own setup/teardown here.
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())  # background: a big index build must not block boot
    yield
    client.close()


# Create the main app without a prefix
app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# --- YouTube live shorts feed (public RSS, cached in Mongo) ---
YOUTUBE_CHANNEL_HANDLE = os.environ.get("YOUTUBE_CHANNEL_HANDLE", "")
SHORTS_CACHE_TTL_SECONDS = 3600
RSS_NS = {
    "a": "http://www.w3.org/2005/Atom",
    "yt": "http://www.youtube.com/xml/schemas/2015",
    "m": "http://search.yahoo.com/mrss/",
}

class ShortVideo(BaseModel):
    id: str
    title: str
    url: str
    thumbnail: str
    published: str

class ShortsFeed(BaseModel):
    videos: List[ShortVideo]
    channel_url: str
    live: bool

async def _resolve_channel_id(client: httpx.AsyncClient) -> str | None:
    res = await client.get(f"https://www.youtube.com/{YOUTUBE_CHANNEL_HANDLE}")
    match = re.search(r'"channelId":"(UC[\w-]+)"', res.text) or re.search(r'channel/(UC[\w-]{20,})', res.text)
    return match.group(1) if match else None

def _parse_rss(xml_text: str) -> List[ShortVideo]:
    root = ET.fromstring(xml_text)
    videos: List[ShortVideo] = []
    for entry in root.findall("a:entry", RSS_NS):
        vid = entry.find("yt:videoId", RSS_NS)
        title = entry.find("a:title", RSS_NS)
        published = entry.find("a:published", RSS_NS)
        group = entry.find("m:group", RSS_NS)
        thumb = group.find("m:thumbnail", RSS_NS) if group is not None else None
        if vid is None or title is None or not vid.text:
            continue
        videos.append(ShortVideo(
            id=vid.text,
            title=title.text or "",
            url=f"https://www.youtube.com/shorts/{vid.text}",
            thumbnail=(thumb.get("url") if thumb is not None else None) or f"https://i.ytimg.com/vi/{vid.text}/hqdefault.jpg",
            published=published.text if published is not None and published.text else "",
        ))
    return videos

@api_router.get("/shorts", response_model=ShortsFeed)
async def get_shorts():
    channel_url = f"https://www.youtube.com/{YOUTUBE_CHANNEL_HANDLE}" if YOUTUBE_CHANNEL_HANDLE else ""
    empty = ShortsFeed(videos=[], channel_url=channel_url, live=False)
    if not YOUTUBE_CHANNEL_HANDLE:
        return empty
    cached = await db.shorts_cache.find_one({"id": "latest"})
    now = datetime.now(timezone.utc)
    if cached:
        fetched_at = cached["fetched_at"].replace(tzinfo=timezone.utc)
        if (now - fetched_at) < timedelta(seconds=SHORTS_CACHE_TTL_SECONDS):
            return ShortsFeed(videos=[ShortVideo(**v) for v in cached["videos"]], channel_url=channel_url, live=len(cached["videos"]) > 0)
    try:
        async with httpx.AsyncClient(timeout=15, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"}) as client:
            channel_id = cached.get("channel_id") if cached else None
            if not channel_id:
                channel_id = await _resolve_channel_id(client)
            if not channel_id:
                raise ValueError("could not resolve channel id")
            rss = await client.get(f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}")
            videos = [v.model_dump() for v in _parse_rss(rss.text)]
        await db.shorts_cache.update_one(
            {"id": "latest"},
            {"$set": {"id": "latest", "channel_id": channel_id, "fetched_at": now, "videos": videos}},
            upsert=True,
        )
        return ShortsFeed(videos=[ShortVideo(**v) for v in videos], channel_url=channel_url, live=len(videos) > 0)
    except Exception as e:
        logger.warning(f"shorts feed refresh failed: {e}")
        if cached:
            return ShortsFeed(videos=[ShortVideo(**v) for v in cached["videos"]], channel_url=channel_url, live=len(cached["videos"]) > 0)
        return empty

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
