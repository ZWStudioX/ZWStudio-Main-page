import { ArrowRight, Mail } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";
import { scrollToSection } from "@/lib/scroll";
import { CONTACT_EMAIL } from "@/lib/assets";

export function CTA() {
  return (
    <section id="contact" className="noise-overlay relative overflow-hidden py-32 lg:py-52" data-testid="cta-section">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 100%, rgba(229,9,20,0.16) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 85% 10%, rgba(0,112,243,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-crimson">08 / Converge</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 max-w-5xl font-heading text-5xl font-bold leading-[0.92] tracking-tighter text-bone sm:text-6xl lg:text-8xl" data-testid="cta-headline">
            Let's build
            <br />
            something <span className="text-outline-crimson">weird.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-fog lg:text-lg">
            Games, animation, AI experiments — or something we haven't imagined yet.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton testId="cta-start-conversation" href={`mailto:${CONTACT_EMAIL}?subject=Let%27s%20build%20something%20weird`}>
              <Mail size={16} /> Start a Conversation
            </MagneticButton>
            <MagneticButton testId="cta-see-work" variant="ghost" onClick={() => scrollToSection("#work")}>
              See Our Work <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-fog" data-testid="cta-email">
            {CONTACT_EMAIL}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
