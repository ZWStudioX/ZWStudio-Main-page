const ITEMS = ["Games", "AI Creative", "Animation", "Roblox", "3D Shorts", "Original IP", "Worldbuilding", "Experiments"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line bg-panel/40 py-5" data-testid="marquee" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-heading text-xl font-bold uppercase tracking-tight text-bone/70 lg:text-2xl">{item}</span>
                <span className="mx-8 text-crimson">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
