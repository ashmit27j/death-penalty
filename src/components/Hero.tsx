import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const EXE_DOWNLOAD = "#";
const UNITY_CLOUD = "#";
const PLACEHOLDER_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-dvh w-full overflow-hidden bg-noise"
    >
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/60 via-[#070707]/85 to-[#070707]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070707_75%)]" />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex min-h-dvh max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center lg:px-10"
      >
        <motion.div variants={item} className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-8 bg-accent" />
          A Unity Parkour FPS
          <span className="h-px w-8 bg-accent" />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-6xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.9]"
        >
          DEATH
          <span className="block text-accent">PENALTY</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Fast-paced first-person parkour shooter built in Unity.
        </motion.p>

        {/* Video */}
        <motion.div
          variants={item}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_120px_-30px_rgba(255,176,0,0.25)]">
            <div className="aspect-video w-full">
              <video
                className="h-full w-full object-cover"
                src={PLACEHOLDER_VIDEO}
                controls
                preload="none"
                playsInline
                poster={heroBg}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-12 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={EXE_DOWNLOAD}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-md bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-foreground transition-transform hover:scale-[1.02] active:scale-100 sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Download Game
          </a>
          <a
            href={UNITY_CLOUD}
            className="inline-flex w-full items-center justify-center rounded-md border border-border bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent/60 hover:text-accent sm:w-auto"
          >
            Unity Cloud Project
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll
      </motion.div>
    </section>
  );
}
