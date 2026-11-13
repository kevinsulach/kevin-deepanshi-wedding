import { NoteIcon } from "./Ornaments";

export default function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause background music" : "Play background music"}
      className={`fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
        playing
          ? "border-gold-400/80 bg-royal-900/85 shadow-[0_0_24px_rgba(212,175,55,0.35)]"
          : "border-gold-500/40 bg-royal-900/70"
      }`}
      style={{ width: 52, height: 52 }}
    >
      {playing ? (
        <span className="flex h-4.5 items-end gap-[3px]" style={{ height: 18 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="eq-bar w-[3px] bg-gold-400"
              style={{ height: 18, animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </span>
      ) : (
        <span className="relative text-gold-400">
          <NoteIcon className="h-5 w-5" />
          <span className="absolute -right-1.5 -top-1.5 h-2 w-2 rotate-45 bg-royal-200" style={{ backgroundColor: "#eadfc9" }} />
        </span>
      )}
    </button>
  );
}
