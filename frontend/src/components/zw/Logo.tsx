export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="25" cy="32" r="17" stroke="#E50914" strokeWidth="2.4" />
      <circle cx="25" cy="32" r="13.5" stroke="#E50914" strokeWidth="1" opacity="0.55" strokeDasharray="10 3" />
      <ellipse cx="25" cy="32" rx="4.2" ry="7.4" stroke="#E50914" strokeWidth="2.6" />
      <g fill="#3A3A4E">
        <path d="M39 24 L58 13 L53 24 Z" />
        <path d="M40 29 L60 22 L53 31 Z" />
        <path d="M40 34 L58 32 L51 38 Z" />
        <path d="M39 39 L54 41 L47 45 Z" />
      </g>
      <path d="M39 24 L58 13 L53 24 Z" stroke="#E50914" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

export function LogoWordmark({ size = 34 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3" data-testid="logo-wordmark">
      <LogoMark size={size} />
      <span className="font-heading text-sm font-bold tracking-[0.22em] text-bone uppercase">
        Zero Wings<span className="text-crimson">.</span>Studio
      </span>
    </span>
  );
}
