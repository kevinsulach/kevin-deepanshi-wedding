import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ------------------- prefers-reduced-motion ------------------- */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* --------------------- scroll reveal wrapper -------------------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  from?: "up" | "left" | "right" | "zoom";
};

export function Reveal({ children, className = "", delay = 0, from = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fromClass =
    from === "left" ? "reveal-left" : from === "right" ? "reveal-right" : from === "zoom" ? "reveal-zoom" : "";

  return (
    <div
      ref={ref}
      className={`reveal ${fromClass} ${className}`}
      style={{ "--rd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
