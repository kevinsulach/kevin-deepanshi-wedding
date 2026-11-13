import { WEDDING, formatDate } from "../config";
import { Reveal } from "../lib/reveal";
import { CalendarIcon, CalendarPlusIcon, ClockIcon, MapPinIcon } from "./Ornaments";

type WeddingEvent = (typeof WEDDING.events)[number];

function icsStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadICS(ev: WeddingEvent) {
  if (!ev.dateISO) return;
  const start = new Date(ev.dateISO);
  const end = new Date(start.getTime() + 5 * 3_600_000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kevin and Deepanshi//Royal Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${ev.id}@kevanddeepanshi.wedding`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${ev.name} — Kevin & Deepanshi`,
    `LOCATION:${ev.venue}`,
    `DESCRIPTION:${ev.subtitle ?? ""}`,
    `URL:${WEDDING.mapUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `kevin-deepanshi-${ev.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function EventCard({ ev, index }: { ev: WeddingEvent; index: number }) {
  const date = formatDate(ev.dateISO);

  return (
    <Reveal delay={index * 120}>
      {/* timeline node */}
      <div className="relative pl-9 sm:pl-11">
        <span className="absolute left-[7px] top-9 h-3 w-3 rotate-45 border border-gold-400 bg-royal-900" />

        <article className="group border border-gold-500/30 bg-royal-950/60 p-6 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)] transition-colors duration-500 hover:border-gold-500/60 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-serif text-2xl font-semibold text-ivory-50 sm:text-[28px]">{ev.name}</h3>
            <span className="font-serif text-sm italic text-gold-300/85">{ev.subtitle}</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-gold-500/20 pt-5 font-serif text-[15px] text-ivory-100/90">
            <span className="inline-flex items-center gap-2.5">
              <CalendarIcon className="h-4 w-4 text-gold-400" />
              {date ?? (
                <span className="border border-dashed border-gold-500/50 px-2.5 py-0.5 font-sans text-[9px] tracking-[0.22em] text-gold-300 uppercase">
                  To be announced
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <ClockIcon className="h-4 w-4 text-gold-400" />
              {ev.time ?? "Time to be announced"}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <MapPinIcon className="h-4 w-4 text-gold-400" />
              {ev.venue}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-gold" href={WEDDING.mapUrl} target="_blank" rel="noreferrer">
              <MapPinIcon className="h-3.5 w-3.5" />
              View on Map
            </a>
            {ev.dateISO && (
              <button type="button" className="btn btn-outline text-gold-200" onClick={() => downloadICS(ev)}>
                <CalendarPlusIcon className="h-3.5 w-3.5" />
                Add to Calendar
              </button>
            )}
          </div>
        </article>
      </div>
    </Reveal>
  );
}

export default function Events() {
  return (
    <section id="events" className="damask relative py-16 sm:py-24">
      <div className="hairline-h absolute left-0 right-0 top-0" />
      <div className="mx-auto w-full max-w-2xl px-6">
        <Reveal className="text-center">
          <p className="kicker text-gold-400/90">The celebrations</p>
          <h2 className="mt-3 font-script text-4xl text-ivory-50 sm:text-5xl">
            An evening of <span className="gold-text">three</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-serif text-lg italic text-ivory-200/80">
            Each event sealed with its own blessing — the dates will follow, like starlight after dark.
          </p>
        </Reveal>

        <div className="relative mt-12">
          {/* timeline spine */}
          <span className="absolute bottom-4 left-[12px] top-2 w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent" />
          <div className="flex flex-col gap-8">
            {WEDDING.events.map((ev, i) => (
              <EventCard key={ev.id} ev={ev} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
