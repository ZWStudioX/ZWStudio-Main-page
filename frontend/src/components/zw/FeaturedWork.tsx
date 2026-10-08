import { ArrowUpRight } from "lucide-react";
import { Kicker, Reveal } from "./Reveal";
import { ASSETS } from "@/lib/assets";

interface Project {
  id: string;
  n: string;
  title: string;
  kind: string;
  status: string;
  statusTone: "crimson" | "volt" | "bone";
  img: string;
  blurb: string;
}

const PROJECTS: Project[] = [
  {
    id: "realm-of-echoes",
    n: "Project 01",
    title: "Realm of Echoes",
    kind: "Original Roblox Experience",
    status: "In Development",
    statusTone: "crimson",
    img: ASSETS.workGames,
    blurb: "A floating-island adventure built around exploration, secrets, and a world that reacts to its players.",
  },
  {
    id: "latent-flesh-chrome",
    n: "Project 02",
    title: "Latent Flesh & Chrome",
    kind: "AI Visual Concept & Lore Bible",
    status: "Experimental",
    statusTone: "volt",
    img: ASSETS.workAi,
    blurb: "A generative visual lab — character lineages, key art, and a world bible grown from latent space.",
  },
  {
    id: "zero-and-the-glitch",
    n: "Project 03",
    title: "Zero & The Glitch",
    kind: "Comedic 3D Micro-Shorts Series",
    status: "Ongoing",
    statusTone: "bone",
    img: ASSETS.workAnimation,
    blurb: "A wingless hero versus a broken universe. Weekly chaos in under sixty seconds.",
  },
];

const TONE: Record<Project["statusTone"], string> = {
  crimson: "border-[#FF5A64]/60 text-[#FF5A64]",
  volt: "border-sky-300/60 text-sky-300",
  bone: "border-white/50 text-white",
};

function WorkCard({ p, large }: { p: Project; large?: boolean }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-line bg-panel ${large ? "aspect-[16/10] lg:aspect-[21/9]" : "aspect-[16/11]"}`}
      data-testid={`work-${p.id}`}
    >
      <img
        src={p.img}
        alt={p.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="absolute left-5 top-5 flex items-center gap-3 lg:left-8 lg:top-8">
        <span className={`rounded-full border bg-ink/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm ${TONE[p.statusTone]}`}>
          {p.status}
        </span>
      </div>
      <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 lg:right-8 lg:top-8">
        {p.n}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 lg:p-8">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-300">{p.kind}</p>
          <h3 className={`mt-2 font-heading font-bold uppercase tracking-tight text-white ${large ? "text-3xl lg:text-5xl" : "text-2xl lg:text-3xl"}`}>
            {p.title}
          </h3>
          {large && <p className="mt-3 hidden max-w-lg text-sm leading-relaxed text-white/70 md:block">{p.blurb}</p>}
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-ink/50 text-white backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-crimson group-hover:bg-crimson">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-28 lg:py-40" data-testid="featured-work-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Kicker>04 / The Archive</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-heading text-4xl font-bold leading-[0.95] tracking-tighter text-bone sm:text-5xl lg:text-6xl">
                Featured <span className="text-outline">work</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-fog">
              Early days, big swings. Everything here is original IP — built in public, shipped with pride.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4">
          <Reveal delay={0.05}>
            <WorkCard p={PROJECTS[0]} large />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal delay={0.12}>
              <WorkCard p={PROJECTS[1]} />
            </Reveal>
            <Reveal delay={0.2}>
              <WorkCard p={PROJECTS[2]} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
