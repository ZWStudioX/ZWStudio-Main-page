import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { RotateCw } from "lucide-react";

interface TurntableProps {
  frames: string[];
  alt: string;
  testId: string;
}

export function Turntable({ frames, alt, testId }: TurntableProps) {
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const dragging = useRef(false);
  const interacted = useRef(false);
  const startX = useRef(0);
  const startFrame = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let loaded = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      const done = () => {
        loaded += 1;
        if (loaded === frames.length) setReady(true);
      };
      img.onload = done;
      img.onerror = done;
    });
  }, [frames]);

  useEffect(() => {
    if (reduce || !ready) return;
    const t = window.setInterval(() => {
      if (!interacted.current && !dragging.current) {
        setFrame((f) => (f + 1) % frames.length);
      }
    }, 320);
    return () => window.clearInterval(t);
  }, [ready, reduce, frames.length]);

  const handleDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    interacted.current = true;
    startX.current = e.clientX;
    startFrame.current = frame;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const n = frames.length;
    const steps = Math.round((e.clientX - startX.current) / 22);
    setFrame(((startFrame.current + steps) % n + n) % n);
  };

  const handleUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className="relative aspect-[4/5] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      role="img"
      aria-label={alt}
      data-testid={testId}
    >
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover ${i === frame ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <span className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
        <RotateCw size={11} /> Drag to rotate
      </span>
    </div>
  );
}
