import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DownloadCard } from "@/components/DownloadCard";
import { DeveloperCard } from "@/components/DeveloperCard";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { InteractiveGrid } from "@/components/InteractiveGrid";
import { IndexLabel, Reveal } from "@/components/IndexLabel";
import {
  DEVELOPERS,
  PRINCIPLES,
  EXE_DOWNLOAD_URL,
  UNITY_CLOUD_URL,
  GAME_VERSION,
  BUILD_FILE_SIZE,
  BUILD_LAST_UPDATED,
  PROJECT_LAST_UPDATED,
} from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Death Penalty — Fast-Paced Parkour FPS" },
      { name: "description", content: "Death Penalty — a fast-paced first-person parkour shooter built in Unity. Download the game and explore the Unity Cloud project." },
      { property: "og:title", content: "Death Penalty — Fast-Paced Parkour FPS" },
      { property: "og:description", content: "Run. Shoot. Don't stop. A first-person parkour shooter built in Unity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Death Penalty" },
      { name: "twitter:description", content: "Fast-paced first-person parkour shooter built in Unity." },
    ],
  }),
  component: LandingPage,
});

function SectionHead({ n, label, title, intro }: { n: string; label: string; title: string; intro?: string }) {
  return (
    <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-12"><IndexLabel n={n} label={label} /></Reveal>
      <Reveal className="lg:col-span-7">
        <h2 className="font-display text-4xl font-bold leading-none tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-[15px] leading-relaxed text-muted-foreground">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

function LandingPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <InteractiveGrid />
      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />
        <Hero />

        <section id="downloads" className="border-b border-border py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHead n="02" label="Downloads" title="Get the build." intro="A playable Windows build and the full Unity project. Pick your way in." />
            <div className="grid gap-4 md:grid-cols-2">
              <DownloadCard
                index={0}
                category="Windows build"
                title="Death Penalty for Windows"
                description="The latest playable executable. Unzip and run."
                status="Playable build"
                tags={["Windows"]}
                meta={[{ label: "Version", value: GAME_VERSION }, { label: "Size", value: BUILD_FILE_SIZE }, { label: "Updated", value: BUILD_LAST_UPDATED }]}
                ctaLabel="Download .exe"
                href={EXE_DOWNLOAD_URL}
              />
              <DownloadCard
                index={1}
                category="Source project"
                title="Unity Cloud project"
                description="Browse the source, scenes and assets on Unity Cloud."
                status="In development"
                tags={["Unity"]}
                meta={[{ label: "Version", value: GAME_VERSION }, { label: "Engine", value: "Unity" }, { label: "Updated", value: PROJECT_LAST_UPDATED }]}
                ctaLabel="Open Unity Cloud"
                href={UNITY_CLOUD_URL}
              />
            </div>
          </div>
        </section>

        <section id="developers" className="border-b border-border py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHead n="03" label="Developers" title="Three people. One game." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEVELOPERS.map((dev, i) => <DeveloperCard key={dev.name} dev={dev} index={i} />)}
            </div>
          </div>
        </section>

        <section id="principles" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHead n="04" label="Principles" title="Built the hard way." />
            <ol className="border-t border-border">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.03}>
                  <li className="group grid gap-2 border-b border-border py-6 transition-colors duration-200 hover:border-border-strong sm:grid-cols-12 sm:gap-8">
                    <span className="font-mono text-xs text-muted-foreground transition-colors duration-200 group-hover:text-accent sm:col-span-1">0{i + 1}</span>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground sm:col-span-5">{p.title}</h3>
                    <p className="text-[15px] leading-relaxed text-muted-foreground sm:col-span-6">{p.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
