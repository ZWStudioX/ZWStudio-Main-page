import { Play } from "lucide-react";
import { Kicker, Reveal } from "./Reveal";
import { ASSETS } from "@/lib/assets";

const SHORTS = [
  { id: "short-orb", title: "The Orb Incident", platform: "YouTube Shorts", duration: "0:42", img: ASSETS.short1 },
  { id: "short-banana", title: "Robot vs Banana", platform: "TikTok", duration: "0:28", img: ASSETS.short2 },
  { id: "short-dance", title: "Victory Dance.exe", platform: "Instagram Reels", duration: "0:35", img: ASSETS.short3 },
];

export function ContentLab() {
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
            <p className="max-w-sm text-sm leading-relaxed text-fog">
              Short-form chaos from the animation lab — YouTube, TikTok, and Instagram. New drops soon.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHORTS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.12}>
              <article
                className="group relative aspect-[9/13] cursor-pointer overflow-hidden rounded-xl border border-line bg-panel"
                data-testid={`content-${s.id}`}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/20 to-obsidian/30" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-obsidian/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                    {s.platform}
                  </span>
                  <span className="rounded-full bg-crimson/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white">
                    {s.duration}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-obsidian/40 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 scale-75 group-hover:shadow-[0_0_40px_rgba(229,9,20,0.5)]">
                    <Play size={22} fill="currentColor" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white">{s.title}</h3>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-fog">Coming soon to the feed</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
