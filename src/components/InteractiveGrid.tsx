import { useEffect, useRef } from "react";

/**
 * Full-viewport fixed graph-paper background with an interactive
 * mouse-follow radial glow that illuminates nearby grid lines.
 *
 * Perf notes:
 * - The "energized" accent grid is a small 440x440 masked layer that is
 *   translated to the cursor, with an inner counter-translated grid so the
 *   lines stay locked to the viewport. Everything moves via `transform`
 *   only (GPU compositing) — no per-frame full-viewport mask repaint.
 * - The rAF loop parks itself when the glow has settled and restarts on
 *   pointer movement, so an idle page schedules zero frames.
 * - Respects prefers-reduced-motion (snaps instead of lerping).
 */
const R = 220; // glow radius, matches the original mask
const SIZE = R * 2;

export function InteractiveGrid() {
  const glowRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const active = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (x: number, y: number) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (maskRef.current) {
        maskRef.current.style.transform = `translate3d(${x - R}px, ${y - R}px, 0)`;
      }
      if (gridRef.current) {
        // counter-translate so the accent grid stays aligned to the viewport grid
        gridRef.current.style.transform = `translate3d(${R - x}px, ${R - y}px, 0)`;
      }
    };

    const stop = () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    const tick = () => {
      const cx = current.current.x;
      const cy = current.current.y;
      const dx = target.current.x - cx;
      const dy = target.current.y - cy;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        current.current.x = target.current.x;
        current.current.y = target.current.y;
        paint(current.current.x, current.current.y);
        rafId.current = null; // settled: park the loop
        return;
      }

      current.current.x = cx + dx * 0.12;
      current.current.y = cy + dy * 0.12;
      paint(current.current.x, current.current.y);
      rafId.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId.current === null && !document.hidden) {
        rafId.current = requestAnimationFrame(tick);
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
      if (prefersReduced) {
        current.current.x = e.clientX;
        current.current.y = e.clientY;
        paint(e.clientX, e.clientY);
      } else {
        start();
      }
    };

    const onLeave = () => {
      active.current = false;
      stop();
      if (glowRef.current) glowRef.current.style.opacity = "0";
      if (maskRef.current) maskRef.current.style.opacity = "0";
    };

    const onVisibility = () => {
      if (document.hidden) stop();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base subtle graph-paper grid */}
      <div className="absolute inset-0 bg-graph" />

      {/* Energized grid: small masked window that follows the cursor.
          The inner grid counter-translates so lines stay viewport-locked. */}
      <div
        ref={maskRef}
        className="absolute left-0 top-0 overflow-hidden opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          width: SIZE,
          height: SIZE,
          transform: `translate3d(-9999px, -9999px, 0)`,
          WebkitMaskImage:
            "radial-gradient(220px 220px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0) 75%)",
          maskImage:
            "radial-gradient(220px 220px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0) 75%)",
        }}
      >
        <div
          ref={gridRef}
          className="bg-graph-accent absolute left-0 top-0 h-[100vh] w-[100vw] will-change-transform"
        />
      </div>

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
