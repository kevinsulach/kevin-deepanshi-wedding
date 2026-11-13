import { useEffect, useRef, useState } from "react";
import Countdown from "./components/Countdown";
import Envelope from "./components/Envelope";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import MusicToggle from "./components/MusicToggle";
import {
  CornerFlourish,
  Divider,
  MandalaRing,
  MapPinIcon,
  Monogram,
} from "./components/Ornaments";
import RsvpForm from "./components/RsvpForm";
import ScratchReveal from "./components/ScratchReveal";
import { WEDDING, formatDate, formatTime } from "./config";
import { MusicPlayer } from "./lib/music";
import { Reveal } from "./lib/reveal";

/* ------------------------------ scroll cue ------------------------------ */

function ScrollCue() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY < 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-700 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span className="font-sans text-[8px] font-semibold tracking-[0.5em] text-royal-700/60 uppercase">
        Scroll
      </span>
      <span className="cue-line" />
    </div>
  );
}

/* --------------------------------- hero --------------------------------- */

const HERO_PETALS = [
  { left: "6%", delay: 0, dur: 13, size: 12, sway: 60, c1: "#f2c6c9", c2: "#c98a8a", po: 0.4 },
  { left: "20%", delay: 4, dur: 16, size: 9, sway: -50, c1: "#f6e27a", c2: "#d4af37", po: 0.32 },
  { left: "47%", delay: 8, dur: 15, size: 11, sway: 42, c1: "#fffdf4", c2: "#e9dcb8", po: 0.3 },
  { left: "71%", delay: 2, dur: 14, size: 10, sway: -66, c1: "#f2c6c9", c2: "#c98a8a", po: 0.35 },
  { left: "90%", delay: 6, dur: 17, size: 12, sway: 55, c1: "#f6e27a", c2: "#d4af37", po: 0.28 },
];

function Hero() {
  const dateText = formatDate(WEDDING.dateISO);
  const timeText = formatTime(WEDDING.dateISO);

  return (
    <header className="paper relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-14 sm:px-6">
      {HERO_PETALS.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="hero-petal"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size,
              "--delay": `${p.delay}s`,
              "--dur": `${p.dur}s`,
              "--sway": `${p.sway}px`,
              "--po": p.po,
              "--c1": p.c1,
              "--c2": p.c2,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="frame-double relative w-full max-w-xl bg-ivory-50/70 px-6 py-10 backdrop-blur-[2px] sm:px-12 sm:py-14">
        <CornerFlourish className="absolute left-2 top-2 h-10 w-10 text-gold-500/80" />
        <CornerFlourish className="absolute right-2 top-2 h-10 w-10 rotate-90 text-gold-500/80" />
        <CornerFlourish className="absolute bottom-2 right-2 h-10 w-10 rotate-180 text-gold-500/80" />
        <CornerFlourish className="absolute bottom-2 left-2 h-10 w-10 -rotate-90 text-gold-500/80" />

        <div className="text-center">
          <Monogram className="mx-auto h-14 w-14 text-gold-600" />

          <p className="kicker mt-6 text-royal-700/80">{WEDDING.tagline}</p>

          <h1 className="mt-4">
            <span className="gold-text block pt-1 font-script text-[64px] leading-[1.05] sm:text-[84px]">
              {WEDDING.groom}
            </span>
            <span className="my-1 block font-serif text-xl italic text-gold-600">&amp;</span>
            <span className="gold-text block font-script text-[64px] leading-[1.05] sm:text-[84px]">
              {WEDDING.bride}
            </span>
          </h1>

          <Divider className="mx-auto mt-5 h-6 w-52 text-gold-600 sm:w-60" />

          <p className="mt-5 font-serif text-lg italic leading-relaxed text-royal-700">
            request the honour of your presence
            <br />
            at their royal wedding
          </p>

          <div className="mt-8">
            <p className="font-serif text-[22px] font-semibold text-royal-900 sm:text-2xl">
              {dateText ?? "Date to be announced"}
              {WEDDING.dateTentative && dateText && (
                <span className="ml-2 inline-block translate-y-[-2px] border border-dashed border-gold-600/60 px-2 py-0.5 align-middle font-sans text-[8px] font-semibold tracking-[0.24em] text-gold-700 uppercase">
                  to be confirmed
                </span>
              )}
            </p>
            {timeText && (
              <p className="mt-2 font-sans text-[10px] font-semibold tracking-[0.34em] text-royal-700/70 uppercase">
                {timeText}
              </p>
            )}
            <p className="kicker mt-4 text-gold-600">
              {WEDDING.venue} · {WEDDING.city}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- letter -------------------------------- */

function Letter() {
  return (
    <section id="letter" className="paper-100 relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-xl px-6 text-center">
        <Reveal>
          <p className="kicker text-gold-600">{WEDDING.invitationHeading}</p>
          <h2 className="mt-3 font-script text-4xl text-royal-800 sm:text-5xl">
            With all our <span className="gold-text">hearts</span>
          </h2>
        </Reveal>

        <Reveal delay={130}>
          <div className="mt-8 space-y-6 text-left">
            {WEDDING.invitationMessage.map((para, i) => (
              <p
                key={i}
                className={`font-serif text-[19px] leading-[1.8] text-royal-800/95 ${
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-script first-letter:text-[64px] first-letter:leading-[0.65] first-letter:text-gold-600"
                    : ""
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={210}>
          <p className="gold-text mt-10 font-script text-4xl">
            — {WEDDING.groom} &amp; {WEDDING.bride}
          </p>
          <p className="kicker mt-3 text-royal-700/60">With the blessings of both families</p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- couple -------------------------------- */

function Story() {
  const { him, her } = WEDDING.story;
  const tilts = [-3, 2.5, -1.5];

  const Profile = ({
    person,
    index,
    from,
  }: {
    person: typeof him;
    index: number;
    from: "left" | "right";
  }) => (
    <Reveal from={from} delay={index * 120}>
      <div className="text-center">
        <div className="frame-double mx-auto max-w-[230px] bg-ivory-50 p-2">
          <div className="overflow-hidden">
            <img
              src={person.photo}
              alt={person.name}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
        <h3 className="gold-text mt-6 font-script text-5xl">{person.name}</h3>
        <p className="kicker mt-2 text-royal-700/70">{person.title}</p>
        {person.parents && (
          <p className="mt-2 font-sans text-[10px] tracking-[0.14em] text-royal-700/55">{person.parents}</p>
        )}
        <p className="mx-auto mt-4 max-w-[270px] font-serif text-[16px] leading-relaxed text-royal-800/90">
          {person.blurb}
        </p>
      </div>
    </Reveal>
  );

  return (
    <section id="couple" className="paper relative overflow-hidden py-16 sm:py-24">
      <MandalaRing className="absolute -right-28 -top-28 h-80 w-80 text-gold-500/15 [animation:spinSlow_70s_linear_infinite]" />
      <MandalaRing className="absolute -bottom-32 -left-32 h-80 w-80 text-gold-500/10 [animation:spinSlow_90s_linear_infinite_reverse]" />

      <div className="mx-auto w-full max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="kicker text-gold-600">The couple</p>
          <h2 className="mt-3 font-script text-4xl text-royal-800 sm:text-5xl">
            Two hearts, one <span className="gold-text">promise</span>
          </h2>
        </Reveal>

        <Reveal delay={140} from="zoom">
          <figure className="mx-auto mt-12 max-w-sm">
            <div className="frame-double bg-ivory-50 p-2">
              <div className="overflow-hidden">
                <img
                  src={WEDDING.photos.hero}
                  alt={`${WEDDING.groom} and ${WEDDING.bride}`}
                  className="w-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-[1.04]"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center font-serif text-[15px] italic text-royal-700/80">
              Where every “always” begins
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-10">
          <Profile person={him} index={0} from="left" />
          <Profile person={her} index={1} from="right" />
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-16 max-w-lg text-center">
            <Divider className="mx-auto h-6 w-44 text-gold-600" />
            <p className="mt-6 font-serif text-lg italic leading-relaxed text-royal-800/90">
              {WEDDING.loveStory}
            </p>
          </div>
        </Reveal>

        <div className="no-scrollbar -mx-6 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-3">
          {WEDDING.photos.polaroids.map((p, i) => (
            <div
              key={i}
              className="polaroid w-[58vw] min-w-[230px] shrink-0 snap-center sm:min-w-[250px]"
              style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
            >
              <img src={p.src} alt={p.caption} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <p className="pt-3 pb-2.5 text-center font-script text-2xl text-royal-800">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- venue --------------------------------- */

function Venue() {
  return (
    <section id="venue">
      <div className="relative h-[72vh] min-h-[480px] overflow-hidden">
        <img
          src={WEDDING.venueImage}
          alt={`${WEDDING.venue} ballroom`}
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-950 via-royal-950/45 to-royal-950/25" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center sm:pb-14">
          <Reveal>
            <p className="kicker text-gold-300">The venue</p>
            <h2 className="gold-text mt-2 font-script text-5xl sm:text-6xl">{WEDDING.venue}</h2>
            <p className="mt-2 font-serif text-lg italic text-ivory-100/90">
              {WEDDING.city} · India
            </p>
            <p className="mx-auto mt-3 max-w-md font-sans text-[11px] tracking-[0.18em] text-ivory-200/70">
              {WEDDING.address}
            </p>
            <a className="btn btn-gold mt-6" href={WEDDING.mapUrl} target="_blank" rel="noreferrer">
              <MapPinIcon className="h-3.5 w-3.5" />
              View on Google Maps
            </a>
          </Reveal>
        </div>
      </div>

      <div className="paper py-14 sm:py-16">
        <div className="mx-auto w-full max-w-4xl px-6">
          <Reveal className="text-center">
            <p className="mx-auto max-w-xl font-serif text-lg italic leading-relaxed text-royal-800/90">
              {WEDDING.venueBlurb}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {WEDDING.venueTips.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 120}>
                <div className="h-full border border-gold-500/30 bg-ivory-50 px-6 py-7 text-center transition-colors duration-500 hover:border-gold-500/60">
                  <span className="mx-auto block h-2.5 w-2.5 rotate-45 border border-gold-500 bg-gold-500/20" />
                  <h3 className="mt-4 font-serif text-xl font-semibold text-royal-900">{tip.title}</h3>
                  <p className="mt-2.5 font-serif text-[15px] leading-relaxed text-royal-700/90">{tip.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- dress code ------------------------------ */

function DressCode() {
  return (
    <section className="damask relative py-16 sm:py-20">
      <div className="hairline-h absolute left-0 right-0 top-0" />
      <div className="hairline-h absolute left-0 right-0 bottom-0" />

      <div className="mx-auto w-full max-w-2xl px-6 text-center">
        <Reveal>
          <p className="kicker text-gold-400/90">Dress code</p>
          <h2 className="mt-3 font-script text-4xl text-ivory-50 sm:text-5xl">
            <span className="gold-text">{WEDDING.dressCode.title}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-serif text-lg italic leading-relaxed text-ivory-200/80">
            {WEDDING.dressCode.note}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-11 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6">
            {WEDDING.dressCode.swatches.map((s) => (
              <div key={s.hex} className="flex flex-col items-center gap-2.5">
                <span
                  className="h-12 w-12 rounded-full transition-transform duration-500 hover:scale-110"
                  style={{
                    backgroundColor: s.hex,
                    boxShadow:
                      "inset 0 2px 8px rgba(255,255,255,0.28), inset 0 -3px 8px rgba(0,0,0,0.35), 0 8px 18px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.45)",
                  }}
                />
                <span className="font-sans text-[9px] font-semibold tracking-[0.18em] text-ivory-200/85 uppercase">
                  {s.name}
                </span>
                <span className="-mt-1.5 font-sans text-[8px] tracking-[0.22em] text-gold-400/70">{s.hex}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- footer --------------------------------- */

function Footer() {
  const dateText = formatDate(WEDDING.dateISO);
  const links = [
    ["#date", "The Date"],
    ["#venue", "Venue"],
    ["#gallery", "Gallery"],
    ["#rsvp", "RSVP"],
  ];
  return (
    <footer className="damask relative overflow-hidden pb-12 pt-16 text-center">
      <div className="hairline-h absolute left-0 right-0 top-0" />
      <div className="px-6">
        <Monogram className="mx-auto h-14 w-14 text-gold-500" />
        <p className="gold-text mt-4 font-script text-4xl">
          {WEDDING.groom} &amp; {WEDDING.bride}
        </p>
        <p className="mt-3 font-serif text-base italic text-ivory-200/80">
          {dateText ?? "To be announced"} · {WEDDING.venue}, {WEDDING.city}
        </p>

        <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-sans text-[9px] font-semibold tracking-[0.3em] text-gold-400/85 uppercase transition-colors hover:text-gold-200"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="mt-9 font-sans text-[9px] tracking-[0.32em] text-ivory-200/40 uppercase">
          Crafted with love · {WEDDING.venue} · 2026
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------------- app ---------------------------------- */

export default function App() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const playerRef = useRef<MusicPlayer | null>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    if (opened) window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const getOrCreate = () => {
    if (!playerRef.current) playerRef.current = new MusicPlayer();
    return playerRef.current;
  };

  const startMusic = () => {
    getOrCreate().start(WEDDING.musicUrl);
    setMusicOn(true);
  };

  const toggleMusic = () => {
    const player = getOrCreate();
    if (player.playing) {
      player.stop();
      setMusicOn(false);
    } else {
      player.start(WEDDING.musicUrl);
      setMusicOn(true);
    }
  };

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Countdown />
        <Letter />
        <ScratchReveal />
        <Events />
        <Story />
        <Gallery />
        <Venue />
        <DressCode />
        <RsvpForm />
      </main>
      <Footer />

      <div className="grain" aria-hidden="true" />

      {!opened && <Envelope onSealTap={startMusic} onDone={() => setOpened(true)} />}
      {opened && <MusicToggle playing={musicOn} onToggle={toggleMusic} />}
      {opened && <ScrollCue />}
    </div>
  );
}
