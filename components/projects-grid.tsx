"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
          whileHover={{ y: -4 }}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-accent/60 hover:shadow-[0_10px_40px_-12px_rgba(56,189,248,0.3)]",
            p.highlight && "ring-1 ring-accent/30"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {p.year}
              </span>
              {p.highlight && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
                  <Sparkles className="h-3 w-3" /> Nổi bật
                </span>
              )}
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>

          <h3 className="mt-3 font-display text-lg font-bold leading-snug">
            {p.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{p.org}</p>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
            {p.summary}
          </p>

          {p.stack && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-2 py-0.5 text-[10.5px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 border-t border-border pt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            {p.role}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
