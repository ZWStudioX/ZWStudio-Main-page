import { motion, useReducedMotion } from "framer-motion";
import { Kicker, Reveal } from "./Reveal";

const LINES = [
  { text: "Games are worlds.", accent: "text-crimson" },
  { text: "Animation is storytelling.", accent: "text-bone" },
  { text: "AI is a new creative instrument.", accent: "text-volt" },
];

const PILLARS = [
  { n: "01", title: "Immersion", desc: "Worlds people want to live in, not just play." },
  { n: "02", title: "Velocity", desc: "Small team, fast iteration, zero bureaucracy." },
  { n: "03", title: "Expressive Craft", desc: "Every frame and mechanic earns its place." },
];

export function Manifesto() {
  const reduce = useReducedMotion();
  return (
    <section id="manifesto" className="relative py-28 lg:py-44" data-testid="manifesto-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <Kicker>02 / The Creed</Kicker>
        </Reveal>
        <h2 className="mt-10 max-w-5xl font-heading text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl lg:text-7xl">
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${line.accent}`}
                initial={{ y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 1, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-fog lg:text-lg">
            We combine all three to create things worth watching, playing, and sharing — original work built with
            obsession, not committees.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.12} className="bg-panel">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-elevated lg:p-10" data-testid={`pillar-${p.n}`}>
                <p className="font-mono text-xs tracking-[0.24em] text-crimson">{p.n}</p>
                <h3 className="mt-4 font-heading text-xl font-bold uppercase tracking-tight text-bone">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
