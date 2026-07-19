import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Cloud } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DownloadCard } from "@/components/DownloadCard";
import { DeveloperCard, type Developer } from "@/components/DeveloperCard";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { InteractiveGrid } from "@/components/InteractiveGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Death Penalty — Fast-Paced Parkour FPS" },
      {
        name: "description",
        content:
          "Death Penalty — a fast-paced first-person parkour shooter built in Unity. Download the game and explore the Unity Cloud project.",
      },
      { name: "theme-color", content: "#070707" },
      { property: "og:title", content: "Death Penalty — Fast-Paced Parkour FPS" },
      {
        property: "og:description",
        content: "A fast-paced first-person parkour shooter built in Unity.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Death Penalty" },
      { name: "twitter:description", content: "Fast-paced first-person parkour shooter built in Unity." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

const EXE_DOWNLOAD = "#";
const UNITY_CLOUD = "#";

const developers: Developer[] = [
  { name: "Ashmit Jain", role: "Gameplay Programming • Systems • UI", github: "#", linkedin: "#" },
  { name: "Sukhada Gulhane", role: "Game Design • Programming", github: "#", linkedin: "#" },
  { name: "Neerav Reddy", role: "Programming", github: "#", linkedin: "#" },
];

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
        <span className="h-px w-6 bg-accent" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
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

      {/* Downloads */}
      <section id="downloads" className="relative border-t border-border py-28 sm:py-36">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeader eyebrow="Get the Build" title="Downloads" />
          <div className="grid gap-6 md:grid-cols-2">
            <DownloadCard
              index={0}
              title="Windows Build"
              description="Download the latest Windows executable of Death Penalty."
              buttonLabel="Download .exe"
              href={EXE_DOWNLOAD}
              icon={<Download size={20} />}
            />
            <DownloadCard
              index={1}
              title="Unity Project"
              description="Access the Unity Cloud project."
              buttonLabel="Open Unity Cloud"
              href={UNITY_CLOUD}
              icon={<Cloud size={20} />}
            />
          </div>
        </div>
      </section>

        {/* Developers */}
        <section id="developers" className="relative border-t border-border py-28 sm:py-36">
          <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
            <SectionHeader eyebrow="The Team" title="Developers" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {developers.map((dev, i) => (
                <DeveloperCard key={dev.name} dev={dev} index={i} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
