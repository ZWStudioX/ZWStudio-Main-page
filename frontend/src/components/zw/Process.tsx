import { motion, useReducedMotion } from "framer-motion";
import { Kicker, Reveal } from "./Reveal";

const STEPS = [
  { n: "01", title: "Idea", desc: "Concept & latent ideation. Every world starts as a weird little spark." },
  { n: "02", title: "Build", desc: "Roblox & 3D prototyping. Playable, watchable, testable — fast." },
  { n: "03", title: "Create", desc: "Animation, polish, and personality. This is where soul gets added." },
  { n: "04", title: "Release", desc: "Multi-platform launch. Into the wild, then straight back to iterating." },
];

export function Process() {
  const reduce = useReducedMotion();
  return (
    <section id="process" className="relative py-28 lg:py-40" data-testid="process-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <Kicker>06 / The Pipeline</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl font-heading text-4xl font-bold leading-[0.95] tracking-tighter text-bone sm:text-5xl lg:text-6xl">
            From spark to <span className="text-outline-crimson">shipped</span>
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <motion.div
            className="absolute left-0 top-6 hidden h-px w-full origin-left bg-gradient-to-r from-crimson via-line-bright to-line lg:block"
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.14}>
                <div className="group relative lg:pt-14" data-testid={`process-step-${s.n}`}>
                  <span className="absolute left-0 top-0 hidden h-3 w-3 rounded-full border-2 border-crimson bg-obsidian transition-all duration-500 group-hover:bg-crimson group-hover:shadow-[0_0_16px_rgba(229,9,20,0.8)] lg:block" />
                  <p className="font-mono text-xs tracking-[0.28em] text-crimson">{s.n}</p>
                  <h3 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-bone lg:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.25}>
          <p className="mt-16 max-w-2xl font-mono text-xs uppercase leading-loose tracking-[0.2em] text-fog">
            Creative direction <span className="text-crimson">+</span> game development <span className="text-crimson">+</span> 3D production{" "}
            <span className="text-crimson">+</span> AI-assisted workflows <span className="text-crimson">+</span> storytelling{" "}
            <span className="text-crimson">+</span> experimentation
          </p>
        </Reveal>
      </div>
    </section>
  );
}
