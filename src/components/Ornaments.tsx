/* Hand-drawn gold SVG ornaments & icons for the invitation. */

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="48" cy="48" r="38.5" stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      <path d="M48 3 L48 10 M48 86 L48 93 M3 48 L10 48 M86 48 L93 48" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <text
        x="48"
        y="56"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontStyle="italic"
        fontSize="24"
        fontWeight="600"
      >
        K·D
      </text>
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 24" className={className} fill="none" aria-hidden="true">
      <path d="M0 12 H86" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path d="M134 12 H220" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path d="M110 4 L118 12 L110 20 L102 12 Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M110 8.2 L113.8 12 L110 15.8 L106.2 12 Z" fill="currentColor" opacity="0.75" />
      <circle cx="94" cy="12" r="1.6" fill="currentColor" opacity="0.7" />
      <circle cx="126" cy="12" r="1.6" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
      <path d="M2 30 V2 H30" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 38 V10 H38" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <path d="M10 10 C 24 10, 30 14, 38 10 M10 10 C 10 24, 14 30, 10 38" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      <path d="M16 16 C 24 18, 26 24, 32 20" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <circle cx="10" cy="10" r="1.8" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function MandalaRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 6" />
      <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="0.5" />
      {Array.from({ length: 24 }).map((_, i) => (
        <path
          key={i}
          d="M100 14 C 104 24, 104 30, 100 36 C 96 30, 96 24, 100 14 Z"
          stroke="currentColor"
          strokeWidth="0.6"
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}
    </svg>
  );
}

/* ------------------------------ icons ------------------------------ */

type IconProps = { className?: string };

const base = "shrink-0";

export function MapPinIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function CalendarPlusIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18M12 13.5v5M9.5 16h5" />
    </svg>
  );
}

export function ClockIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

export function ChevronIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CloseIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function HeartIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5C7 16.5 3.5 13.3 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.8 4 2.1C12.9 5.8 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3.7-3.5 6.9-8.5 10.9Z" />
    </svg>
  );
}

export function NoteIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="15" r="2.5" />
    </svg>
  );
}
