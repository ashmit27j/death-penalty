import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function IndexLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
      <span>
        {n} / {label}
      </span>
      <span className="h-px w-12 bg-border-strong" />
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.25, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  if (!href) {
    return (
      <span className={`inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-muted-foreground/60 ${className}`} title="Link coming soon">
        {children} <span aria-hidden>→</span>
      </span>
    );
  }
  return (
    <a href={href} className={`group/arrow inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-foreground transition-colors duration-200 hover:text-accent ${className}`}>
      {children}
      <span aria-hidden className="transition-transform duration-200 ease-out group-hover/arrow:translate-x-1 group-hover:translate-x-1">→</span>
    </a>
  );
}
