export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:text-left lg:px-10">
        <div className="flex items-center gap-2 font-display text-sm text-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Death Penalty
        </div>
        <p>Made with Unity</p>
        <p>© {new Date().getFullYear()} Death Penalty</p>
      </div>
    </footer>
  );
}
