import { Github, Linkedin } from "lucide-react";
import { Reveal } from "@/components/IndexLabel";
import type { Developer } from "@/config/site";

export type { Developer };

export function DeveloperCard({ dev, index }: { dev: Developer; index: number }) {
  const initials = dev.name.split(" ").map((s) => s[0]).join("").slice(0, 2);
  const links = [
    { href: dev.github, label: "GitHub", Icon: Github },
    { href: dev.linkedin, label: "LinkedIn", Icon: Linkedin },
  ].filter((l) => l.href);

  return (
    <Reveal delay={index * 0.05}>
      <article className="glass group flex h-full flex-col transition-colors duration-200 hover:border-border-strong">
        <div className="flex aspect-[4/3] items-center justify-center border-b border-border bg-surface/60">
          <span className="font-display text-5xl font-bold tracking-[-0.04em] text-muted-foreground" aria-hidden>{initials}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-200 group-hover:text-accent">0{index + 1}</span>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] text-foreground">{dev.name}</h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">{dev.role}</p>
          {links.length > 0 && (
            <div className="mt-6 flex gap-2">
              {links.map(({ href, label, Icon }) => (
                <a key={label} href={href} aria-label={`${dev.name} on ${label}`} className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
