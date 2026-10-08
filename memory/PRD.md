# ZWStudio — PRD

## Original problem statement
Premium single-page landing site for ZWStudio (Zero Wings Studio), an independent creative studio across three disciplines: indie Roblox game development, AIGC (AI-generated content), and 3D animation shorts. Dark cinematic aesthetic, crimson red + electric blue accents (from the uploaded logo), award-worthy motion design, React + Vite + TypeScript + Tailwind + Framer Motion + Lenis. Sections: Hero ("WE BUILD WORLDS."), Manifesto, What We Do (3 disciplines), Featured Work, The Studio, Creative Process, Social/Content, CTA ("LET'S BUILD SOMETHING WEIRD."), Footer.

## Architecture
- Frontend: Vite + React 19 + TS, single page at `/` (`src/pages/Home.tsx`), components in `src/components/zw/`
- Smooth scroll: Lenis (`src/lib/scroll.ts`), disabled under prefers-reduced-motion
- Motion: Framer Motion (masked line reveals, scroll parallax, magnetic buttons, staggered in-view reveals)
- Theme: Tailwind v4 tokens in `src/index.css` — LIGHT editorial "warm paper" theme (paper #F7F6F1, ink #101014, crimson #E50914, deep blue #0070F3); dark imagery preserved inside cards via fixed `--color-ink: #08080C` scrims; fonts Space Grotesk (heading), Geist (body), JetBrains Mono (labels)
- Assets: AI-generated imagery hosted on Emergent CDN, URLs centralized in `src/lib/assets.ts`
- Backend: template FastAPI status endpoints only (no app data); contact is mailto:hello@zwstudiox.com
- Favicon/logo: original SVG mark (crimson 0 + concentric rings + wing facets) at `public/favicon.svg` and `components/zw/Logo.tsx`

## User personas
- Players/fans discovering the studio's games and shorts
- Potential collaborators/partners evaluating the studio's craft
- Social viewers arriving from YouTube/TikTok/Instagram

## Core requirements (static)
1. Cinematic dark hero with 3D character centerpiece + floating collage fragments
2. Typography-driven manifesto
3. Three discipline cards (Games / AI Creative / Animation)
4. Featured work showcase (3 projects with statuses)
5. Studio intro + stats
6. 4-step process timeline
7. Short-form content grid (YouTube/TikTok/Instagram placeholders)
8. Closing CTA with mailto
9. Footer with nav + socials + © 2026

## Implemented (2026-07 / build 1)
- All 9 sections built and verified via screenshots (desktop 1440px + mobile 390px)
- Masked line-by-line hero reveal, scroll parallax on character, floating animated fragments
- Editorial marquee, scroll-reveal sections, magnetic CTAs, hover image transforms
- SEO meta in index.html, semantic HTML, data-testids on interactive elements
- `yarn typecheck` passes; `/api/` responds via public URL

## Implemented (2026-07 / build 2)
- Switched entire site from dark to warm-paper LIGHT theme (user request, anti-"AI slop" editorial direction)
- Image cards keep dark scrims via fixed ink token; stat tiles flipped to dark ink for contrast
- Contact email updated to hello@zwstudiox.com (footer, nav, CTA)

## Implemented (2026-07 / build 3)
- Live Shorts feed: GET /api/shorts resolves @ZWxStudio (channel UCJrV2L7L3AbDFRKxlRj63cg, "ZW Animation") via public YouTube RSS, caches in Mongo `shorts_cache` (1h TTL), falls back to stale cache then placeholders
- ContentLab section renders real videos (thumbnail, cleaned title, date, youtube.com/shorts/<id> links) with "Live from YouTube" badge; placeholder art only when feed unavailable
- Footer YouTube link points to https://www.youtube.com/@ZWxStudio
- Env: YOUTUBE_CHANNEL_HANDLE=@ZWxStudio in backend/.env

## Implemented (2026-07 / build 4)
- Re-themed ALL site artwork to Roblox style based on user's 5 uploaded project characters (Sunburst mascot, France #10 + Norway #9 football stars, ChatGPT + Gemini head avatars)
- Regenerated: hero centerpiece (Sunburst in dark studio), games world (floating soccer stadium), AI lab (both AI avatars), animation comedy frame, studio visual, 3 fallback short thumbnails — all via image edit mode with the uploaded refs
- Hero mascot renamed "The Wingless One" → "Sunburst"

## Implemented (2026-07 / build 5)
- 360° drag-to-rotate Sunburst turntable in hero: 8 AI-generated angle frames (TURNTABLE_FRAMES in assets.ts), `components/zw/Turntable.tsx` — pointer-drag frame stepping, idle auto-rotate until first interaction, preloading, reduced-motion safe, touch-pan-y so mobile scroll still works
- Project detail pages at /work/:slug (`pages/ProjectDetail.tsx`): story, "Inside the Build" feature list, "Meet the Cast" character gallery (uses PORTRAITS.gpt/gemini + Roblox frames), status pills, contact CTA, next-project pager, 404 state
- Project data centralized in `src/lib/projects.ts` (PROJECTS), shared by FeaturedWork cards (now React Router Links) and detail pages
- Navbar section links fall back to "/#section" navigation when off the home page
- Routes: `/` Home, `/work/:slug` ProjectDetail

## Implemented (2026-07 / build 6)
- Removed turntable idle auto-rotate (user request "jangan buat berputar") — Sunburst now static front view, manual drag-to-rotate retained
- Footer socials reduced to YouTube only → https://www.youtube.com/@ZWxStudio (TikTok/Instagram/X removed per user request)

## Backlog / next tasks
- P0: Replace placeholder email hello@zerowings.studio with real address; add real social profile URLs
- P1: ~~Real YouTube/TikTok embeds or API-driven latest-shorts feed~~ DONE (build 3, YouTube RSS live)
- P1: Project detail modals/pages for the 3 featured works
- P2: OG share image, analytics, blog/devlog section, custom cursor
- P2: YouTube Data API v3 upgrade (view counts, durations, Shorts-only filtering) if an API key is ever added
