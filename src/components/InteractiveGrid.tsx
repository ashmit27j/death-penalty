import { useEffect, useRef } from "react";

/**
 * Full-viewport fixed graph-paper background with an interactive
 * mouse-follow radial glow that illuminates nearby grid lines.
 *
 * - Grid: subtle dark-gray lines (fixed to viewport, seamless).
 * - Glow: soft radial gradient in #FFB000, lerp-smoothed via rAF.
 * - Respects prefers-reduced-motion.
 */
export function InteractiveGrid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  // target (raw mouse) and current (lerped) positions
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const active = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (x: number, y: number) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (maskRef.current) {
        maskRef.current.style.setProperty("--mx", `${x}px`);
        maskRef.current.style.setProperty("--my", `${y}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!active.current) {
        current.current.x = e.clientX;
        current.current.y = e.clientY;
        active.current = true;
        if (glowRef.current) glowRef.current.style.opacity = "1";
        if (maskRef.current) maskRef.current.style.opacity = "1";
      }
      // Reduced motion: no lerp/rAF smoothing — snap directly to the cursor.
      if (prefersReduced) paint(e.clientX, e.clientY);
    };
    const onLeave = () => {
      active.current = false;
      if (glowRef.current) glowRef.current.style.opacity = "0";
      if (maskRef.current) maskRef.current.style.opacity = "0";
    };

    const tick = () => {
      const cx = current.current.x;
      const cy = current.current.y;
      const tx = target.current.x;
      const ty = target.current.y;
      // lerp for smoothing
      current.current.x = cx + (tx - cx) * 0.12;
      current.current.y = cy + (ty - cy) * 0.12;

      paint(current.current.x, current.current.y);
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseleave", onLeave);
    if (!prefersReduced) rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);


  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base subtle graph-paper grid */}
      <div className="absolute inset-0 bg-graph" />

      {/* Energized grid: same lines but in accent color, revealed only near cursor via a radial mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 bg-graph-accent opacity-0 transition-opacity duration-300"
        style={{
          WebkitMaskImage:
            "radial-gradient(220px 220px at var(--mx, -9999px) var(--my, -9999px), rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0) 75%)",
          maskImage:
            "radial-gradient(220px 220px at var(--mx, -9999px) var(--my, -9999px), rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Soft bloom halo that follows the cursor */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,176,0,0.18) 0%, rgba(255,176,0,0.08) 25%, rgba(255,176,0,0) 65%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}
