import { useCallback, useEffect, useState } from "react";
import { WEDDING } from "../config";
import { Reveal } from "../lib/reveal";
import { ChevronIcon, CloseIcon } from "./Ornaments";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const items = WEDDING.photos.gallery;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((cur) => (cur === null ? cur : (cur + dir + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="paper-100 relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="kicker text-gold-600">Gallery</p>
          <h2 className="mt-3 font-script text-4xl text-royal-800 sm:text-5xl">
            Moments &amp; <span className="gold-text">memories</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-serif text-lg italic text-royal-700/85">
            A few glimpses from our journey — tap any frame to see it up close.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="masonry mt-12">
            {items.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full cursor-pointer focus:outline-none"
                aria-label={`View photo: ${img.caption}`}
              >
                <div className="overflow-hidden border border-gold-500/30 bg-ivory-200/40 p-1.5">
                  <div className="overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading="lazy"
                      className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                    />
                  </div>
                </div>
                <p className="mt-2.5 text-center font-serif text-[15px] italic text-royal-800">
                  {img.caption}
                  <span className="ml-2 not-italic font-sans text-[9px] tracking-[0.28em] text-gold-600 uppercase">
                    {img.place}
                  </span>
                </p>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-royal-950/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          style={{ animation: "popIn 0.35s ease both" }}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition hover:bg-gold-500/10"
            aria-label="Close photo viewer"
          >
            <CloseIcon />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition hover:bg-gold-500/10 sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronIcon className="h-5 w-5 rotate-90" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition hover:bg-gold-500/10 sm:right-6"
            aria-label="Next photo"
          >
            <ChevronIcon className="h-5 w-5 -rotate-90" />
          </button>

          <figure className="max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[open].src}
              alt={items[open].caption}
              className="mx-auto max-h-[76vh] w-auto border border-gold-500/40 bg-ivory-50 p-2 shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <span className="font-script text-2xl text-gold-300">{items[open].caption}</span>
              <span className="ml-3 font-sans text-[9px] tracking-[0.3em] text-ivory-200/60 uppercase">
                {items[open].place} · {open + 1}/{items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
