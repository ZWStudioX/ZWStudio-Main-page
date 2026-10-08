import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Play } from "lucide-react";
import { Kicker, Reveal } from "./Reveal";
import { ASSETS } from "@/lib/assets";
import { apiGet } from "@/lib/api";

interface ShortVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
}

interface ShortsFeed {
  videos: ShortVideo[];
  channel_url: string;
  live: boolean;
}

interface CardItem {
  key: string;
  title: string;
  platform: string;
  meta: string;
  img: string;
  href?: string;
}

const FALLBACK: CardItem[] = [
  { key: "short-orb", title: "The Orb Incident", platform: "YouTube Shorts", meta: "Coming soon to the feed", img: ASSETS.short1 },
  { key: "short-banana", title: "Robot vs Banana", platform: "TikTok", meta: "Coming soon to the feed", img: ASSETS.short2 },
  { key: "short-dance", title: "Victory Dance.exe", platform: "Instagram Reels", meta: "Coming soon to the feed", img: ASSETS.short3 },
];

function toCard(v: ShortVideo): CardItem {
  const clean = v.title.replace(/\s*#\w+/g, "").trim();
  return {
    key: v.id,
    title: clean || v.title,
    platform: "YouTube",
    meta: new Date(v.published).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    img: v.thumbnail,
    href: v.url,
  };
}

export function ContentLab() {
  const { data } = useQuery({
    queryKey: ["shorts"],
    queryFn: () => apiGet<ShortsFeed>("/shorts"),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const isLive = !!data && data.live && data.videos.length > 0;
  const items: CardItem[] = isLive ? data.videos.slice(0, 6).map(toCard) : FALLBACK;

  return (
    <section id="content" className="relative border-t border-line py-28 lg:py-40" data-testid="social-content-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Kicker>07 / Broadcast</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 max-w-2xl font-heading text-4xl font-bold leading-[0.95] tracking-tighter text-bone sm:text-5xl lg:text-6xl">
                Watch what we're <span className="text-crimson">making</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-start gap-4">
              <p className="max-w-sm text-sm leading-relaxed text-fog">
                {isLive
                  ? "Latest drops pulled straight from the channel — refreshed every hour."
                  : "Short-form chaos from the animation lab — YouTube, TikTok, and Instagram. New drops soon."}
              </p>
              <a
                href={data?.channel_url || "https://www.youtube.com/@ZWxStudio"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-crimson/60 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-crimson transition-all duration-300 hover:bg-crimson hover:text-white"
                data-testid="content-channel-link"
              >
                {isLive && <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-current" />}
                {isLive ? "Live from YouTube" : "@ZWxStudio"} <ArrowUpRight size={13} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 0.12}>
              <a
                href={s.href}
                target={s.href ? "_blank" : undefined}
                rel={s.href ? "noreferrer" : undefined}
                className="group relative block aspect-[9/13] cursor-pointer overflow-hidden rounded-xl border border-line bg-panel"
                data-testid={`content-${s.key}`}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-ink/30" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                    {s.platform}
                  </span>
                  {isLive && (
                    <span className="rounded-full bg-crimson/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white">
                      Short
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 scale-75 items-center justify-center rounded-full border border-white/25 bg-ink/40 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(229,9,20,0.5)]">
                    <Play size={22} fill="currentColor" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="line-clamp-2 font-heading text-xl font-bold uppercase tracking-tight text-white">{s.title}</h3>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">{s.meta}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
