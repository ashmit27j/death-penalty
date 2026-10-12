import { ArrowLink, Reveal } from "@/components/IndexLabel";

interface DownloadCardProps {
  index: number;
  category: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  meta: { label: string; value: string }[];
  ctaLabel: string;
  href: string;
}

export function DownloadCard({ index, category, title, description, status, tags, meta, ctaLabel, href }: DownloadCardProps) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="glass group flex h-full flex-col p-6 transition-colors duration-200 hover:border-border-strong sm:p-8">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em]">
          <span className="text-muted-foreground transition-colors duration-200 group-hover:text-accent">0{index + 1}</span>
          <span className="text-muted-foreground">{category}</span>
        </div>
        <h3 className="mt-10 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">{title}</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-[2px] border border-border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
            <span className="h-1.5 w-1.5 bg-accent" />
            {status}
          </span>
          {tags.map((t) => (
            <span key={t} className="rounded-[2px] border border-border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">{t}</span>
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-3 border-t border-border pt-4 font-mono text-[11px] uppercase tracking-[0.06em]">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-muted-foreground">{m.label}</dt>
              <dd className="mt-1 text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto border-t border-border pt-4">
          <ArrowLink href={href}>{ctaLabel}</ArrowLink>
        </div>
      </article>
    </Reveal>
  );
}
