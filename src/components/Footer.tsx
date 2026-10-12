import { DEVELOPERS, EXE_DOWNLOAD_URL, UNITY_CLOUD_URL, PROJECT_GITHUB_URL, ITCH_IO_URL } from "@/config/site";

function Col({ title, items }: { title: string; items: { label: string; href?: string }[] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            {i.href ? (
              <a href={i.href} className="text-foreground/80 transition-colors duration-200 hover:text-foreground">{i.label}</a>
            ) : (
              <span className="text-muted-foreground">{i.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6">
            <div className="flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
              <span className="h-2 w-2 bg-accent" /> Death Penalty
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Run. Shoot. Don't stop.</p>
          </div>
          <div className="md:col-span-2">
            <Col title="Game" items={[{ label: "Download", href: EXE_DOWNLOAD_URL || "#downloads" }, { label: "Unity Cloud", href: UNITY_CLOUD_URL || "#downloads" }]} />
          </div>
          <div className="md:col-span-2">
            <Col title="Team" items={DEVELOPERS.map((d) => ({ label: d.name, href: "#developers" }))} />
          </div>
          <div className="md:col-span-2">
            <Col title="Links" items={[{ label: "GitHub", href: PROJECT_GITHUB_URL || undefined }, { label: "itch.io", href: ITCH_IO_URL || undefined }]} />
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground sm:flex-row sm:justify-between">
          <span>Made with Unity</span>
          <span>© 2026 Death Penalty</span>
        </div>
      </div>
    </footer>
  );
}
