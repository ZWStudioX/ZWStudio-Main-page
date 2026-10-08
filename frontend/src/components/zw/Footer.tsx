import { SiInstagram, SiTiktok, SiX, SiYoutube } from "@icons-pack/react-simple-icons";
import { LogoMark } from "./Logo";
import { scrollToSection } from "@/lib/scroll";
import { CONTACT_EMAIL } from "@/lib/assets";

const NAV = [
  { label: "Home", target: "#hero", testId: "footer-nav-home" },
  { label: "Games", target: "#disciplines", testId: "footer-nav-games" },
  { label: "AI", target: "#disciplines", testId: "footer-nav-ai" },
  { label: "Animation", target: "#disciplines", testId: "footer-nav-animation" },
  { label: "About", target: "#studio", testId: "footer-nav-about" },
  { label: "Contact", target: "#contact", testId: "footer-nav-contact" },
];

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@ZWxStudio", Icon: SiYoutube, testId: "social-youtube" },
  { label: "TikTok", href: "https://tiktok.com", Icon: SiTiktok, testId: "social-tiktok" },
  { label: "Instagram", href: "https://instagram.com", Icon: SiInstagram, testId: "social-instagram" },
  { label: "X", href: "https://x.com", Icon: SiX, testId: "social-x" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line" data-testid="footer-section">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-20 lg:px-12">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={38} />
              <div>
                <p className="font-heading text-base font-bold uppercase tracking-[0.2em] text-bone">ZWStudio</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Games • AI • Animation</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-fog">
              An independent creative studio building worlds worth watching, playing, and sharing.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block font-mono text-xs tracking-[0.14em] text-crimson transition-colors hover:text-crimson-bright"
              data-testid="footer-email"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex gap-20">
            <nav aria-label="Footer">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Index</p>
              <ul className="mt-5 space-y-3">
                {NAV.map((n) => (
                  <li key={n.testId}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(n.target)}
                      className="text-sm text-bone/80 transition-colors hover:text-crimson-bright"
                      data-testid={n.testId}
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Signals</p>
              <ul className="mt-5 space-y-3">
                {SOCIALS.map(({ label, href, Icon, testId }) => (
                  <li key={testId}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 text-sm text-bone/80 transition-colors hover:text-crimson-bright"
                      data-testid={testId}
                    >
                      <Icon size={15} className="text-fog transition-colors group-hover:text-crimson" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog" data-testid="footer-copyright">
            © 2026 ZWStudio. All worlds reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Zero Wings Studio — Est. 2026</p>
        </div>
      </div>

      <div className="pointer-events-none select-none px-6 lg:px-12" aria-hidden="true">
        <p className="text-outline-faint -mb-[0.23em] text-center font-heading text-[18.5vw] font-bold leading-none tracking-tighter">
          ZERO WINGS
        </p>
      </div>
    </footer>
  );
}
