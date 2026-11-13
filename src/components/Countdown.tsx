import { useEffect, useState } from "react";
import { WEDDING, formatDate, formatTime } from "../config";
import { Reveal } from "../lib/reveal";
import { Divider } from "./Ornaments";

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function Tile({ value, label, animate }: { value: string; label: string; animate: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-[74px] w-full items-center justify-center border border-gold-500/30 bg-royal-900/60 shadow-[inset_0_1px_0_rgba(212,175,55,0.15)] sm:h-[92px]">
        <span className="pointer-events-none absolute left-2 top-1.5 h-1.5 w-1.5 border-l border-t border-gold-500/60" />
        <span className="pointer-events-none absolute right-2 top-1.5 h-1.5 w-1.5 border-r border-t border-gold-500/60" />
        <span className="pointer-events-none absolute bottom-1.5 left-2 h-1.5 w-1.5 border-b border-l border-gold-500/60" />
        <span className="pointer-events-none absolute bottom-1.5 right-2 h-1.5 w-1.5 border-b border-r border-gold-500/60" />
        <span
          key={animate ? value : "static"}
          className={`font-serif text-[38px] font-medium leading-none text-ivory-50 sm:text-[50px] ${
            animate ? "[animation:tickPop_0.5s_cubic-bezier(0.22,0.61,0.36,1)]" : ""
          }`}
        >
          {value}
        </span>
      </div>
      <span className="kicker text-gold-400/80">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const now = useNow();
  const target = WEDDING.dateISO ? new Date(WEDDING.dateISO).getTime() : null;
  const diff = target ? Math.max(0, target - now) : 0;

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="countdown" className="damask relative overflow-hidden py-16 sm:py-20">
      <div className="hairline-h absolute left-0 right-0 top-0" />
      <div className="hairline-h absolute left-0 right-0 bottom-0" />

      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <Reveal>
          <p className="kicker text-gold-400/90">The countdown begins</p>
          <h2 className="mt-3 font-script text-4xl text-ivory-50 sm:text-5xl">
            Until the <span className="gold-text">“I do”</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          {target ? (
            <>
              <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 gap-2 sm:gap-3">
                <Tile value={String(days)} label="Days" animate />
                <Tile value={pad(hours)} label="Hours" animate />
                <Tile value={pad(minutes)} label="Minutes" animate />
                <Tile value={pad(seconds)} label="Seconds" animate />
              </div>
              <p className="mt-8 font-serif text-lg italic text-ivory-200/85">
                {formatDate(WEDDING.dateISO)}
                {WEDDING.dateTentative && (
                  <span className="ml-2 align-middle font-sans text-[9px] not-italic tracking-[0.25em] text-gold-400/80 uppercase">
                    · to be confirmed
                  </span>
                )}
              </p>
              {formatTime(WEDDING.dateISO) && (
                <p className="mt-1 font-serif text-base text-gold-300/90">
                  {formatTime(WEDDING.dateISO)} · {WEDDING.venue}, {WEDDING.city}
                </p>
              )}
            </>
          ) : (
            <div className="mx-auto mt-10 max-w-md border border-gold-500/30 bg-royal-900/60 px-8 py-10">
              <Divider className="mx-auto h-6 w-48 text-gold-500" />
              <p className="mt-5 font-serif text-2xl italic text-ivory-100">
                The date is being written in the stars…
              </p>
              <p className="kicker mt-4 text-gold-400/80">To be announced soon</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
