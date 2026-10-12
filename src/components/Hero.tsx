import heroBg from "@/assets/hero-bg.jpg";
import { Reveal } from "@/components/IndexLabel";
import {
  EXE_DOWNLOAD_URL,
  UNITY_CLOUD_URL,
  GAMEPLAY_VIDEO_URL,
  GAMEPLAY_VIDEO_DURATION,
  META_ROW,
} from "@/config/site";
import { IndexLabel } from "@/components/IndexLabel";

export function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" aria-hidden="true" decoding="async" fetchPriority="high" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-36 pb-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-44">
        <Reveal className="lg:col-span-12">
          <IndexLabel n="01" label="Game" />
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">A Unity Parkour FPS</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.92] tracking-[-0.04em] text-foreground sm:text-7xl lg:text-8xl">
              Death
              <br />
              Penalty<span className="text-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-2xl font-display font-semibold tracking-[-0.02em] text-foreground">Run. Shoot. Don't stop.</p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              A fast-paced first-person parkour shooter built in Unity.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={EXE_DOWNLOAD_URL || "#downloads"}
              className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors duration-200 hover:bg-accent/90"
            >
              Download for Windows
            </a>
            <a
              href={UNITY_CLOUD_URL || "#downloads"}
              className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-border px-6 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-border-strong"
            >
              Unity Cloud Project
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {META_ROW.join(" · ")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:self-end">
          <figure className="glass">
            <div className="aspect-video w-full bg-surface">
              {GAMEPLAY_VIDEO_URL ? (
                <video className="h-full w-full object-cover" src={GAMEPLAY_VIDEO_URL} controls preload="none" playsInline poster={heroBg} />
              ) : (
                <img src={heroBg} alt="Death Penalty gameplay placeholder" className="h-full w-full object-cover opacity-70" />
              )}
            </div>
            <figcaption className="flex items-center justify-between border-t border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              <span>Gameplay — {GAMEPLAY_VIDEO_DURATION}</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-accent" />{GAMEPLAY_VIDEO_URL ? "Footage" : "Placeholder"}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
