import { ArrowUpRight, Clapperboard, Gamepad2, Sparkles } from "lucide-react";
import { Kicker, Reveal } from "./Reveal";
import { ASSETS } from "@/lib/assets";

interface Discipline {
  id: string;
  index: string;
  title: string;
  desc: string;
  cta: string;
  img: string;
  icon: typeof Gamepad2;
  tags: string[];
  accent: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: "games",
    index: "D—01",
    title: "Games",
    desc: "We create original Roblox experiences designed around gameplay, personality, and community.",
    cta: "Explore Games",
    img: ASSETS.workGames,
    icon: Gamepad2,
    tags: ["Roblox", "Original IP", "Live-Ops"],
    accent: "text-crimson",
  },
  {
    id: "ai",
    index: "D—02",
    title: "AI Creative",
    desc: "We use generative AI as a creative instrument for visual development, content production, experimentation, and storytelling.",
    cta: "Explore AI Work",
    img: ASSETS.workAi,
    icon: Sparkles,
    tags: ["Concept Art", "Characters", "Video Gen"],
    accent: "text-sky-300",
  },
  {
    id: "animation",
    index: "D—03",
    title: "Animation",
    desc: "We create short-form 3D animation built for attention, entertainment, and storytelling.",
    cta: "Watch Animation",
    img: ASSETS.workAnimation,
    icon: Clapperboard,
    tags: ["3D Shorts", "Comedy", "Cinematic"],
    accent: "text-crimson",
  },
];

function DisciplineCard({ d, tall }: { d: Discipline; tall?: boolean }) {
  const Icon = d.icon;
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-line bg-panel ${tall ? "h-[420px] lg:h-full" : "h-[300px] lg:h-[316px]"}`}
      data-testid={`discipline-${d.id}`}
    >
      <img
        src={d.img}
        alt={d.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-opacity duration-500" />
      <div className="relative flex h-full flex-col justify-between p-7 lg:p-9">
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-ink/60 text-bone backdrop-blur-sm">
            <Icon size={19} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">{d.index}</span>
        </div>
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {d.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-ink/50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">{d.title}</h3>
          <p className={`mt-2 max-w-md text-sm leading-relaxed text-white/70 ${tall ? "" : "line-clamp-2"}`}>{d.desc}</p>
          <span className={`mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] ${d.accent} transition-transform duration-300 group-hover:translate-x-1`}>
            {d.cta} <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}

export function Disciplines() {
  return (
    <section id="disciplines" className="relative py-28 lg:py-40" data-testid="disciplines-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Kicker>03 / Three Disciplines</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-heading text-4xl font-bold leading-[0.95] tracking-tighter text-bone sm:text-5xl lg:text-6xl">
                What we <span className="text-outline-crimson">do</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-fog">
              One studio, three crafts — each sharp enough to stand alone, stronger together.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-5 lg:grid-rows-2">
          <Reveal className="lg:col-span-3 lg:row-span-2" delay={0.05}>
            <DisciplineCard d={DISCIPLINES[0]} tall />
          </Reveal>
          <Reveal className="lg:col-span-2" delay={0.15}>
            <DisciplineCard d={DISCIPLINES[1]} />
          </Reveal>
          <Reveal className="lg:col-span-2" delay={0.25}>
            <DisciplineCard d={DISCIPLINES[2]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
