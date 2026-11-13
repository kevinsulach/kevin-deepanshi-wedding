/* =====================================================================
   ⭐  EDIT THIS FILE — everything about the wedding lives here.
   Change names, dates, venue, text, links and photos below.
   ===================================================================== */

import heroCouple from "./assets/images/hero-couple.jpg";
import kevin from "./assets/images/kevin.jpg";
import deepanshi from "./assets/images/deepanshi.jpg";
import haldi from "./assets/images/haldi.jpg";
import mehendi from "./assets/images/mehendi.jpg";
import rings from "./assets/images/rings.jpg";
import silhouette from "./assets/images/silhouette.jpg";
import venueImg from "./assets/images/venue.jpg";

/* ----------------------------- couple ----------------------------- */

export const WEDDING = {
  groom: "Kevin",
  bride: "Deepanshi",
  initials: "K & D",

  /* ⭐ WEDDING DATE & TIME
     Edit to the final ceremony date — format "YYYY-MM-DDTHH:MM:SS"
     (24-hour clock, guests' local time). This drives the countdown,
     the hero, the scratch card and "Add to Calendar".
     While it is still "To Be Announced", keep dateTentative: true —
     a small "to be confirmed" note will appear beside the date. */
  dateISO: "2026-12-06T19:00:00",
  dateTentative: true,

  /* ⭐ VENUE */
  venue: "Majestic Crown",
  city: "Delhi",
  address: "Majestic Crown, Delhi, India", // full address shown on the venue card
  mapUrl: "https://maps.app.goo.gl/V2hjGqtgiF5oF9TY6",

  /* ⭐ BACKGROUND MUSIC — YES, you can change it!
     Option 1 (default): leave as null to use the built-in soft
       instrumental (plays instantly, no file needed).
     Option 2 (your own song):
       1. Drop your mp3 into `public/music/` (e.g. `public/music/wedding.mp3`)
       2. Set the line below to: musicUrl: "./music/wedding.mp3"
       (Keep the ./ at the start — it makes the song work on GitHub Pages.) */
  musicUrl: null as string | null,

  /* --------------------------- copy --------------------------- */

  tagline: "Together with their families",
  invitationHeading: "An Invitation",
  invitationMessage: [
    "From the first hello to this forever, every moment with you has felt like home. As we take this step — to stand as one, with our families beside us — our hearts are fullest when you are there.",
    "Your blessings are the only luxury we seek, your presence the only gift we hope for. Join us as we say “I do” beneath the chandeliers of Delhi, and let the evening unfold in gold, music and memory.",
  ],
  loveStory:
    "It began with a message that never stopped replying. Two worlds, one playlist, a thousand late-night calls — and a love that grew quieter, deeper and braver with every passing day. Now, with the blessings of both families, they are ready to make it forever.",

  /* --------------------------- people --------------------------- */

  story: {
    him: {
      name: "Kevin",
      title: "The Groom",
      photo: kevin,
      blurb:
        "Plans trips like missions and remembers every song you have ever loved. Engineer by profession, one-pan chef by passion, heart fully Deepanshi's.",
      parents: "", // e.g. "Son of Sh. Rajesh & Smt. Sunita" — hidden when empty
    },
    her: {
      name: "Deepanshi",
      title: "The Bride",
      photo: deepanshi,
      blurb:
        "A designer's eye and a poet's heart. She turns ordinary evenings into gold — and has already promised to out-sing everyone at the sangeet.",
      parents: "", // e.g. "Daughter of Sh. Anil & Smt. Meera" — hidden when empty
    },
  },

  /* ------------------------- events (TBA) ------------------------- */

  /* Fill dateISO/time for each event once confirmed (same format as
     dateISO above). Null shows an elegant "To Be Announced" chip and
     hides the calendar button automatically. */
  events: [
    {
      id: "mehendi",
      name: "Mehendi & Haldi",
      subtitle: "Green hands & golden hues",
      dateISO: null as string | null,
      time: null as string | null,
      venue: "Majestic Crown, Delhi",
    },
    {
      id: "sangeet",
      name: "Sangeet Night",
      subtitle: "Dhol, lights & family songs",
      dateISO: null as string | null,
      time: null as string | null,
      venue: "Majestic Crown, Delhi",
    },
    {
      id: "wedding",
      name: "The Royal Wedding",
      subtitle: "The big fat promise",
      dateISO: "2026-12-06T19:00:00",
      time: "7:00 PM",
      venue: "Majestic Crown, Delhi",
    },
  ],

  /* --------------------------- venue --------------------------- */

  venueBlurb:
    "A regal address in the heart of Delhi — crystal chandeliers, emerald drapery and ballroom floors made for dancing until the night gives in.",
  venueTips: [
    {
      title: "Getting There",
      text: "Majestic Crown is well connected by metro and road. Cabs and app rides reach the doorstep — arrive 30 minutes early for the grandeur.",
    },
    {
      title: "Stay Close",
      text: "A curated list of partner hotels around Delhi will be shared with confirmed guests — several steps or a short drive from the venue.",
    },
    {
      title: "Plan Together",
      text: "Traveling from far away? Reach out to the family group and coordinate cabs and rooms — no guest should celebrate alone.",
    },
  ],

  /* ------------------------- dress code ------------------------- */

  dressCode: {
    title: "Royal Elegance",
    note: "An opulent palette inspired by the venue — jewel tones, fine silks and a touch of gold. Traditional and black-tie are both welcome.",
    swatches: [
      { name: "Royal Emerald", hex: "#1B3B2B" },
      { name: "Deep Burgundy", hex: "#4A0E17" },
      { name: "Champagne", hex: "#D4AF37" },
      { name: "Warm Ivory", hex: "#FAF6F0" },
      { name: "Midnight", hex: "#131A24" },
      { name: "Dusty Rose", hex: "#C98A8A" },
    ],
  },

  /* --------------------------- photos --------------------------- */
  /* ⭐ YES — you can change ALL photos!
     EASIEST WAY: open the folder `src/assets/images/` and replace the
     .jpg files with your own photos, KEEPING THE SAME FILE NAMES:
       hero-couple.jpg  → main couple photo (hero + gallery)
       kevin.jpg        → groom portrait
       deepanshi.jpg    → bride portrait
       haldi.jpg        → candid / haldi moment
       mehendi.jpg      → mehendi / details
       rings.jpg        → rings / details
       silhouette.jpg   → romantic candid
       venue.jpg        → venue / ballroom shot
     Then push to GitHub — the site rebuilds with your photos.
     (Tip: landscape photos look best for hero/venue; portrait for profiles.) */

  photos: {
    hero: heroCouple,
    gallery: [
      { src: heroCouple, caption: "The two of them", place: "Majestic Crown" },
      { src: haldi, caption: "Haldi morning", place: "Delhi" },
      { src: rings, caption: "The promise", place: "Forever" },
      { src: silhouette, caption: "Golden hour", place: "Palace corridor" },
      { src: mehendi, caption: "Mehendi nights", place: "Home" },
      { src: deepanshi, caption: "Her moment", place: "Portrait" },
    ],
    polaroids: [
      { src: haldi, caption: "haldi day" },
      { src: rings, caption: "the promise" },
      { src: silhouette, caption: "golden hour" },
    ],
  },

  venueImage: venueImg,

  /* --------------------------- rsvp --------------------------- */

  /* Optional: to receive RSVPs, create a free form at formspree.io,
     paste its endpoint below (e.g. "https://formspree.io/f/xxxx") and
     the form will submit there. Leave null for on-screen
     confirmation only. */
  rsvpFormEndpoint: null as string | null,
};

/* --------------------------- helpers --------------------------- */

export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
