import { useState, type CSSProperties } from "react";
import { WEDDING, formatDate } from "../config";
import { Reveal, usePrefersReducedMotion } from "../lib/reveal";
import { Divider, HeartIcon } from "./Ornaments";

type Status = "accept" | "decline" | null;

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [guests, setGuests] = useState("1");
  const [dietary, setDietary] = useState("");
  const [blessing, setBlessing] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const reduced = usePrefersReducedMotion();

  const celebrate = () => {
    if (WEDDING.rsvpFormEndpoint) {
      const data = new FormData();
      data.append("name", name);
      data.append("attending", status === "accept" ? "Joyfully accepts" : "Regretfully declines");
      data.append("guests", guests);
      data.append("dietary", dietary);
      data.append("blessing", blessing);
      void fetch(WEDDING.rsvpFormEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } }).catch(
        () => undefined,
      );
    }
    setSubmitted(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    if (!status) {
      setError("Please let us know if you can make it.");
      return;
    }
    setError("");
    celebrate();
  };

  const petalBurst = () => {
    if (reduced) return null;
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 26 }, (_, i) => {
          const angle = (i / 26) * Math.PI * 2;
          const dist = 100 + (i % 5) * 40;
          const colors: [string, string][] = [
            ["#f6e27a", "#d4af37"],
            ["#f2c6c9", "#c98a8a"],
            ["#fffdf4", "#e9dcb8"],
          ];
          const [c1, c2] = colors[i % 3];
          return (
            <span
              key={i}
              className="petal"
              style={
                {
                  left: "50%",
                  top: "30%",
                  width: 11 + (i % 4) * 3,
                  height: 11 + (i % 4) * 3,
                  "--tx": `${Math.cos(angle) * dist}px`,
                  "--ty": `${Math.abs(Math.sin(angle)) * dist + 120}px`,
                  "--rot": `${(i % 2 ? 1 : -1) * (240 + i * 17)}deg`,
                  "--dur": `${1.8 + (i % 4) * 0.4}s`,
                  "--delay": `${(i % 6) * 0.07}s`,
                  "--c1": c1,
                  "--c2": c2,
                } as CSSProperties
              }
            />
          );
        })}
      </div>
    );
  };

  return (
    <section id="rsvp" className="paper relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-xl px-6">
        <Reveal className="text-center">
          <p className="kicker text-gold-600">Répondez s'il vous plaît</p>
          <h2 className="mt-3 font-script text-4xl text-royal-800 sm:text-5xl">
            Will you <span className="gold-text">join us?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic text-royal-700/85">
            {formatDate(WEDDING.dateISO) ?? "Our celebration"} · {WEDDING.venue}, {WEDDING.city}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mt-10">
            {submitted && petalBurst()}

            {submitted ? (
              <div
                className="frame-double relative bg-ivory-50 px-8 py-12 text-center"
                style={{ animation: "popIn 0.8s cubic-bezier(0.22,0.61,0.36,1) both" }}
              >
                <HeartIcon className="mx-auto h-8 w-8 text-gold-500" />
                <p className="mt-4 font-script text-4xl text-royal-800 sm:text-5xl">
                  Thank you, <span className="gold-text">{name.trim().split(" ")[0]}</span>!
                </p>
                <p className="mx-auto mt-4 max-w-xs font-serif text-lg italic text-royal-700/90">
                  {status === "accept"
                    ? "Your blessings will make the night glow a little brighter. We can't wait to celebrate with you."
                    : "You will be missed dearly — know that our hearts, and a glass of something golden, will be raised in your honour."}
                </p>
                <Divider className="mx-auto mt-6 h-6 w-44 text-gold-600" />
                <button
                  type="button"
                  className="btn btn-outline mt-7 text-royal-800"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setStatus(null);
                    setGuests("1");
                    setDietary("");
                    setBlessing("");
                  }}
                >
                  Send another response
                </button>
              </div>
            ) : (
              <form className="frame-double relative bg-ivory-50 px-6 py-8 sm:px-10 sm:py-10" onSubmit={onSubmit}>
                <div className="space-y-7">
                  <div>
                    <label className="field-label" htmlFor="rsvp-name">Full name</label>
                    <input
                      id="rsvp-name"
                      className="field mt-1.5"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <span className="field-label">Will you attend?</span>
                    <div className="mt-2.5 grid grid-cols-2 gap-3">
                      {(
                        [
                          ["accept", "Joyfully accepts"],
                          ["decline", "Regretfully declines"],
                        ] as [Status, string][]
                      ).map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setStatus(val)}
                          aria-pressed={status === val}
                          className={`border px-3 py-3 font-sans text-[10px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
                            status === val
                              ? "border-gold-500 bg-gold-500 text-royal-950 shadow-[0_10px_20px_-10px_rgba(212,175,55,0.8)]"
                              : "border-gold-500/40 text-royal-700 hover:border-gold-500/80 hover:bg-gold-500/10"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div>
                      <label className="field-label" htmlFor="rsvp-guests">Number of guests</label>
                      <select
                        id="rsvp-guests"
                        className="field mt-1.5 cursor-pointer appearance-none"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        disabled={status === "decline"}
                      >
                        {["1", "2", "3", "4"].map((n) => (
                          <option key={n} value={n}>{n === "1" ? "Just me" : `${n} guests`}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="field-label" htmlFor="rsvp-dietary">Dietary preferences</label>
                      <input
                        id="rsvp-dietary"
                        className="field mt-1.5"
                        type="text"
                        placeholder="Vegetarian, Jain…"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="rsvp-blessing">A song request or blessing note</label>
                    <textarea
                      id="rsvp-blessing"
                      className="field mt-1.5 min-h-[74px] resize-none"
                      placeholder="The song that got you on the dance floor, or words from the heart…"
                      value={blessing}
                      onChange={(e) => setBlessing(e.target.value)}
                    />
                  </div>

                  {error && (
                    <p className="font-sans text-[11px] tracking-[0.14em] text-burgundy-700 uppercase" role="alert">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="btn btn-gold w-full">
                    <HeartIcon className="h-3.5 w-3.5" />
                    Seal my reply
                  </button>
                  <p className="text-center font-sans text-[10px] tracking-[0.14em] text-royal-700/50">
                    Kindly respond at your earliest convenience
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
