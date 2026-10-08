import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

export function initLenis(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ lerp: 0.09 });
  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(rafId);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.5 });
  else el.scrollIntoView({ behavior: "smooth" });
}
