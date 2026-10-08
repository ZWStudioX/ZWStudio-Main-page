import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { scrollToSection } from "@/lib/scroll";
import { ASSETS } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskedLine({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function Fragment({ src, label, className, delay, duration }: { src: string; label: string; className: string; delay: string; duration: string }) {
  return (
    <div
      className={`animate-float absolute z-20 hidden overflow-hidden rounded-lg border border-line-bright bg-panel/80 shadow-2xl shadow-black/60 backdrop-blur-md md:block ${className}`}
      style={{ animationDelay: delay, animationDuration: duration }}
      data-testid={`hero-fragment-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <img src={src} alt={label} className="h-full w-full object-cover" loading="eager" />
      <span className="absolute bottom-1.5 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const charY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="noise-overlay relative flex min-h-svh items-center overflow-hidden pt-16"
      data-testid="hero-section"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 68% 45%, rgba(229,9,20,0.10) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 20% 80%, rgba(0,112,243,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,16,20,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,16,20,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 px-6 pb-24 pt-10 lg:grid-cols-2 lg:gap-6 lg:px-12">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-line-bright bg-panel/60 py-2 pl-3 pr-5 backdrop-blur-sm"
            data-testid="hero-status-badge"
          >
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-crimson" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
              Status: Active in experimental production
            </span>
          </motion.div>

          <h1 className="font-heading text-[17vw] font-bold leading-[0.9] tracking-tighter text-bone sm:text-7xl lg:text-[6.2rem]" data-testid="hero-headline">
            <MaskedLine text="WE BUILD" delay={0.35} />
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.48, ease: EASE }}
              >
                <span className="text-outline">WORLDS</span>
                <span className="text-crimson">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-7 font-mono text-xs uppercase tracking-[0.3em] text-bone sm:text-sm"
            data-testid="hero-tagline"
          >
            Games<span className="mx-3 text-crimson">/</span>AI<span className="mx-3 text-crimson">/</span>Animation
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: EASE }}
            className="mt-6 max-w-md text-base leading-relaxed text-fog"
          >
            ZWStudio is an independent creative studio building games, animated stories, and AI-powered experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton testId="hero-cta-explore" onClick={() => scrollToSection("#work")}>
              Explore Our Work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton testId="hero-cta-whatwedo" variant="ghost" onClick={() => scrollToSection("#disciplines")}>
              What We Do
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: charY }} className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
            className="relative"
            data-testid="hero-character"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-crimson/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-xl border border-line-bright">
              <img
                src={ASSETS.heroCharacter}
                alt="Stylized 3D character in a dark cinematic studio with crimson and blue rim lighting"
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-sky-300">Unit 00 — Mascot</p>
                  <p className="font-heading text-lg font-bold uppercase tracking-tight text-white">The Wingless One</p>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">Render 001</p>
              </div>
            </div>
          </motion.div>

          <Fragment src={ASSETS.workGames} label="Game World" className="-left-24 top-8 h-28 w-40" delay="0.6s" duration="8s" />
          <Fragment src={ASSETS.workAi} label="Latent Study" className="-right-20 top-1/3 h-32 w-44" delay="1.4s" duration="9.5s" />
          <Fragment src={ASSETS.workAnimation} label="Short Frame" className="-left-16 bottom-10 h-24 w-36" delay="2.2s" duration="7s" />
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("#manifesto")}
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-fog transition-colors hover:text-bone"
        data-testid="hero-scroll-cue"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
