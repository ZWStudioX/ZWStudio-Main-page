import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LogoMark } from "./Logo";
import { scrollToSection } from "@/lib/scroll";
import { CONTACT_EMAIL } from "@/lib/assets";

const LINKS = [
  { label: "Games", target: "#disciplines", testId: "nav-games" },
  { label: "AI", target: "#disciplines", testId: "nav-ai" },
  { label: "Animation", target: "#disciplines", testId: "nav-animation" },
  { label: "Work", target: "#work", testId: "nav-work" },
  { label: "Studio", target: "#studio", testId: "nav-studio" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: string) => {
    setOpen(false);
    if (document.querySelector(target)) scrollToSection(target);
    else window.location.assign(`/${target}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-obsidian/80 backdrop-blur-xl" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12" aria-label="Main">
        <button
          type="button"
          onClick={() => go("#hero")}
          className="flex items-center gap-3"
          data-testid="nav-logo"
          aria-label="ZWStudio home"
        >
          <LogoMark size={30} />
          <span className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-bone">
            ZW<span className="text-crimson">/</span>Studio
          </span>
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <button
              key={link.testId}
              type="button"
              onClick={() => go(link.target)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-fog transition-colors duration-300 hover:text-bone"
              data-testid={link.testId}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 rounded-full border border-crimson/60 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-crimson hover:text-white"
            data-testid="nav-contact-cta"
          >
            Contact <ArrowUpRight size={13} />
          </a>
        </div>

        <button
          type="button"
          className="text-bone lg:hidden"
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-obsidian/95 backdrop-blur-xl lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((link) => (
                <button
                  key={link.testId + "-mobile"}
                  type="button"
                  onClick={() => go(link.target)}
                  className="py-3 text-left font-heading text-2xl font-bold uppercase tracking-tight text-bone"
                  data-testid={link.testId + "-mobile"}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 flex w-fit items-center gap-2 rounded-full bg-crimson px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white"
                data-testid="nav-contact-cta-mobile"
              >
                Contact <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
