import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  testId: string;
}

export function MagneticButton({ children, onClick, href, variant = "primary", testId }: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.34);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes =
    variant === "primary"
      ? "group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-crimson px-8 py-4 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-crimson-bright"
      : "group relative inline-flex items-center gap-3 rounded-full border border-line-bright bg-white/[0.03] px-8 py-4 font-heading text-sm font-bold uppercase tracking-[0.14em] text-bone backdrop-blur-sm transition-colors duration-300 hover:border-bone/40 hover:bg-white/[0.06]";

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  );

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={classes} data-testid={testId} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type="button" className={classes} data-testid={testId} onClick={onClick}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}
