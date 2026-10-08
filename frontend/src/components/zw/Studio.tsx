import { Kicker, Reveal } from "./Reveal";
import { ASSETS } from "@/lib/assets";

const STATS = [
  { value: "100%", label: "Original IP" },
  { value: "03", label: "Connected Disciplines" },
  { value: "60fps", label: "Pipeline Standard" },
  { value: "00", label: "Corporate Bloat" },
];

export function Studio() {
  return (
    <section id="studio" className="relative border-y border-line bg-panel/30 py-28 lg:py-40" data-testid="studio-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Kicker>05 / The Collective</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-heading text-4xl font-bold leading-[0.95] tracking-tighter text-bone sm:text-5xl lg:text-6xl">
                Small team.
                <br />
                <span className="text-crimson">Big worlds.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-fog lg:text-lg">
                ZWStudio is an independent creative studio exploring the intersection of games, animation, and
                generative AI. No layers of approval, no safe bets — just a small crew building the things we wish
                existed.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-obsidian p-5" data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
                    <p className="font-heading text-2xl font-bold tracking-tight text-white lg:text-3xl">{s.value}</p>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-fog">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="group relative overflow-hidden rounded-xl border border-line-bright" data-testid="studio-visual">
              <img
                src={ASSETS.studioVisual}
                alt="The ZWStudio workspace at night — monitors glowing with 3D characters and game worlds"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="animate-pulse-dot h-2 w-2 rounded-full bg-crimson" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">The lab — where worlds get built</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
