import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DownloadCardProps {
  index: number;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon: ReactNode;
}

export function DownloadCard({ index, title, description, buttonLabel, href, icon }: DownloadCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-8 transition-shadow duration-300 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(255,176,0,0.35)] sm:p-10"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
      </div>

      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            0{index + 1} / Build
          </span>
          <div className="text-accent">{icon}</div>
        </div>
        <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>

      <a
        href={href}
        className="relative mt-10 inline-flex w-full items-center justify-between overflow-hidden rounded-md border border-border bg-[#0c0c0c] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <span>{buttonLabel}</span>
        <span aria-hidden className="ml-4 transition-transform group-hover:translate-x-1">→</span>
      </a>
    </motion.article>
  );
}
