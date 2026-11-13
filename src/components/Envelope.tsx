import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { WEDDING } from "../config";
import { usePrefersReducedMotion } from "../lib/reveal";
import { Monogram } from "./Ornaments";

type Phase = "sealed" | "opening" | "exiting" | "done";

type DustSpec = {
  id: number;
  left: number;
  size: number;
  dx: number;
  dy: number;
  dur: number;
  delay: number;
  o: number;
};

function makeDust(): DustSpec[] {
  return Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: 8 + Math.random() * 84,
    size: 2.5 + Math.random() * 4.5,
    dx: (Math.random() - 0.5) * 160,
    dy: -(140 + Math.random() * 260),
    dur: 1.9 + Math.random() * 1.5,
    delay: Math.random() * 0.9,
    o: 0.5 + Math.random() * 0.5,
  }));
}

export default function Envelope({
  onSealTap,
  onDone,
}: {
  /** called the instant the guest taps the wax seal (safe to start audio) */
  onSealTap: () => void;
  /** called when the overlay has fully exited */
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("sealed");
  const [dust, setDust] = useState<DustSpec[]>([]);
  const reduced = usePrefersReducedMotion();

  const open = useCallback(() => {
    if (phase !== "sealed") return;
    onSealTap();
    if (reduced) {
      setPhase("exiting");
      window.setTimeout(onDone, 650);
      return;
    }
    setPhase("opening");
    window.setTimeout(() => setDust(makeDust()), 900);
    window.setTimeout(() => setPhase("exiting"), 3450);
    window.setTimeout(onDone, 4450);
  }, [phase, reduced, onSealTap, onDone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") open();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isOpen = phase === "opening" || phase === "exiting" || phase === "done";

  return (
    <div
      className={`fixed inset-0 z-50 damask overflow-hidden ${phase === "done" ? "pointer-events-none" : ""}`}
      aria-label="Wedding invitation envelope"
    >
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, transparent 30%, rgba(5,12,8,0.75) 100%)",
        }}
      />

      <div
        className={`env-exit flex h-full w-full flex-col items-center justify-center gap-9 px-6 ${
          phase === "exiting" ? "done" : ""
        }`}
      >
        <Monogram className="w-12 h-12 text-gold-500/80" />

        <div className="env-stage flex flex-col items-center">
          <div className={`env ${isOpen ? "open" : ""}`}>
            <div className="env-back" />

            {/* invitation card (slides up out of the pocket) */}
            <div className="env-card">
              <Monogram className="w-10 h-10 text-gold-600" />
              <p className="font-script text-[22px] leading-none text-royal-800">You are invited</p>
              <p className="font-serif text-[13px] tracking-[0.14em] text-royal-700/90">
                {WEDDING.groom} &amp; {WEDDING.bride}
              </p>
            </div>

            <div className="env-pocket env-pocket-l" />
            <div className="env-pocket env-pocket-r" />
            <div className="env-pocket env-pocket-b" />
            <div className="env-flap" />

            <button
              type="button"
              onClick={open}
              className={`wax-seal ${isOpen ? "cracked" : ""}`}
              aria-label="Tap the wax seal to open your invitation"
            >
              {WEDDING.initials.replace(" & ", "&")}
            </button>
          </div>

          {/* gold dust */}
          {dust.map((d) => (
            <span
              key={d.id}
              className="dust"
              style={
                {
                  left: `${d.left}%`,
                  width: d.size,
                  height: d.size,
                  "--dx": `${d.dx}px`,
                  "--dy": `${d.dy}px`,
                  "--dur": `${d.dur}s`,
                  "--delay": `${d.delay}s`,
                  "--o": d.o,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="text-center">
          <p
            className="kicker text-gold-300/90"
            style={{ animation: phase === "sealed" ? "promptPulse 2.4s ease-in-out infinite" : undefined }}
          >
            Tap the wax seal to open your invitation
          </p>
          <p className="mt-3 font-serif italic text-[15px] text-ivory-200/60">
            {WEDDING.groom} &amp; {WEDDING.bride}
          </p>
        </div>
      </div>
    </div>
  );
}
