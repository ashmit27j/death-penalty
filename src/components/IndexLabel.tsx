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

export function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`fade-up ${className}`}>{children}</div>;
}
