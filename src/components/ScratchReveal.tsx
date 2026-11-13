import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { WEDDING, formatDate } from "../config";
import { Reveal, usePrefersReducedMotion } from "../lib/reveal";
import { Divider } from "./Ornaments";

type Petal = {
  id: number;
  tx: number;
  ty: number;
  rot: number;
  dur: number;
  delay: number;
  size: number;
  c1: string;
  c2: string;
};

const PETAL_COLORS: [string, string][] = [
  ["#f6e27a", "#d4af37"],
  ["#f2c6c9", "#c98a8a"],
  ["#fffdf4", "#e9dcb8"],
  ["#f0b7a8", "#c96f5e"],
];

function makePetals(): Petal[] {
  return Array.from({ length: 34 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 190;
    const [c1, c2] = PETAL_COLORS[i % PETAL_COLORS.length];
    return {
      id: i,
      tx: Math.cos(angle) * dist,
      ty: Math.abs(Math.sin(angle)) * dist + 60 + Math.random() * 120,
      rot: (Math.random() - 0.5) * 640,
      dur: 1.7 + Math.random() * 1.4,
      delay: Math.random() * 0.35,
      size: 10 + Math.random() * 10,
      c1,
      c2,
    };
  });
}

function drawFoil(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const dpr = window.devicePixelRatio || 1;

  const grad = ctx.createLinearGradient(0, 0, w, h * 0.7);
  grad.addColorStop(0, "#eed895");
  grad.addColorStop(0.32, "#d4af37");
  grad.addColorStop(0.58, "#b08a24");
  grad.addColorStop(0.82, "#d9b94c");
  grad.addColorStop(1, "#f0dc9a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // diagonal sheen bands
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#fffbe8";
  for (let i = -2; i < 6; i++) {
    ctx.save();
    ctx.translate(i * 130 * dpr, 0);
    ctx.rotate(-0.5);
    ctx.fillRect(0, -h, 26 * dpr, h * 3);
    ctx.restore();
  }
  ctx.restore();

  // speckle texture
  const speckles = Math.floor((w * h) / (900 * dpr * dpr));
  for (let i = 0; i < speckles; i++) {
    const light = Math.random() > 0.5;
    ctx.fillStyle = light
      ? `rgba(255,250,225,${0.05 + Math.random() * 0.09})`
      : `rgba(90,60,8,${0.04 + Math.random() * 0.08})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, dpr, dpr);
  }

  // inner border
  ctx.strokeStyle = "rgba(74,50,8,0.4)";
  ctx.lineWidth = 1.4 * dpr;
  ctx.strokeRect(10 * dpr, 10 * dpr, w - 20 * dpr, h - 20 * dpr);

  // embossed monogram
  const monoSize = Math.min(w, h) * 0.34;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `italic 700 ${monoSize}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillStyle = "rgba(255,250,220,0.55)";
  ctx.fillText(WEDDING.initials, w / 2, h / 2 + 2 * dpr);
  ctx.fillStyle = "rgba(80,52,6,0.35)";
  ctx.fillText(WEDDING.initials, w / 2, h / 2);

  ctx.font = `500 ${9 * dpr}px "Montserrat", sans-serif`;
  ctx.fillStyle = "rgba(74,50,8,0.55)";
  ctx.fillText("S C R A T C H   T O   R E V E A L", w / 2, h / 2 + monoSize * 0.72);
}

export default function ScratchReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const petalsRef = useRef<Petal[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);
  const scratching = useRef(false);
  const lastCheck = useRef(0);
  const revealedRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  const dateText = formatDate(WEDDING.dateISO);

  const sizeCanvas = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrap.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    drawFoil(canvas);
  }, []);

  useEffect(() => {
    sizeCanvas();
    const onResize = () => {
      if (!revealedRef.current) sizeCanvas();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sizeCanvas]);

  const last = useRef<{ x: number; y: number } | null>(null);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const now = performance.now();
    if (now - lastCheck.current < 320) return;
    lastCheck.current = now;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const sample = 6; // downsample factor
    const sw = Math.max(1, Math.floor(canvas.width / sample));
    const sh = Math.max(1, Math.floor(canvas.height / sample));
    const off = document.createElement("canvas");
    off.width = sw;
    off.height = sh;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.drawImage(canvas, 0, 0, sw, sh);
    const data = octx.getImageData(0, 0, sw, sh).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 110) cleared++;
    }
    const pct = cleared / (sw * sh);
    setProgress(pct);
    if (pct >= 0.5 && !revealedRef.current) {
      revealedRef.current = true;
      setRevealed(true);
      if (!reduced) {
        const made = makePetals();
        petalsRef.current = made;
        setPetals(made);
      }
    }
  }, [reduced]);

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const brush = (from: { x: number; y: number } | null, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const radius = (26 + canvas.width / 90) * 1;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = radius * 2;
    ctx.beginPath();
    if (from) {
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
    } else {
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x + 0.1, to.y + 0.1);
    }
    ctx.stroke();
    checkProgress();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    e.preventDefault();
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    scratching.current = true;
    const p = pointFromEvent(e);
    brush(null, p);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!scratching.current || revealed) return;
    const p = pointFromEvent(e);
    brush(last.current, p);
    last.current = p;
  };

  const onPointerUp = () => {
    scratching.current = false;
    last.current = null;
    checkProgress();
  };

  return (
    <section id="date" className="paper relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto w-full max-w-xl px-6 text-center">
        <Reveal>
          <p className="kicker text-gold-600">Save the date</p>
          <h2 className="mt-3 font-script text-4xl text-royal-800 sm:text-5xl">
            Scratch the <span className="gold-text">gold leaf</span>
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic text-royal-700/85">
            The most important day of our lives is hidden beneath the foil. Take your time.
          </p>
        </Reveal>

        <Reveal delay={150} from="zoom">
          <div className="relative mt-10">
            {/* petal burst layer */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
              {petals.map((p) => (
                <span
                  key={p.id}
                  className="petal"
                  style={
                    {
                      left: "50%",
                      top: "46%",
                      width: p.size,
                      height: p.size,
                      "--tx": `${p.tx}px`,
                      "--ty": `${p.ty}px`,
                      "--rot": `${p.rot}deg`,
                      "--dur": `${p.dur}s`,
                      "--delay": `${p.delay}s`,
                      "--c1": p.c1,
                      "--c2": p.c2,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            <div
              ref={wrapRef}
              className="frame-double relative mx-auto h-64 w-full max-w-md select-none overflow-hidden sm:h-72"
              aria-label="Scratch the gold leaf to reveal the wedding date"
            >
              {revealed ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ivory-50 px-6">
                  <div style={{ animation: "popIn 0.9s cubic-bezier(0.22,0.61,0.36,1) both" }} className="flex flex-col items-center gap-3">
                    <Divider className="h-6 w-44 text-gold-600" />
                    <p className="font-script text-4xl leading-tight sm:text-5xl">
                      <span className="gold-text">{dateText ?? "To Be Announced"}</span>
                    </p>
                    {WEDDING.dateTentative && dateText && (
                      <span className="kicker text-gold-600/80">· to be confirmed ·</span>
                    )}
                    <p className="font-serif text-base italic text-royal-700">
                      {WEDDING.venue} · {WEDDING.city}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-ivory-100">
                    <p className="font-script text-3xl text-royal-800">The big day</p>
                  </div>
                  <canvas
                    ref={canvasRef}
                    className="scratch-canvas"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                  />
                </>
              )}
            </div>

            <p
              className={`kicker mt-5 text-royal-700/60 transition-opacity duration-700 ${
                revealed ? "opacity-0" : "opacity-100"
              }`}
            >
              {progress > 0.2
                ? "The date is emerging — keep going"
                : "Run a finger across the foil to reveal the date"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
