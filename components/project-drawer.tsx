"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Server,
  Layers,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { ProjectDetail } from "@/data/projects";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

type ProjectDrawerProps = {
  project: ProjectDetail | null;
  onClose: () => void;
};

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-border bg-card shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/85 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                  {project.category}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {project.year}
                </span>
                {project.highlight && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-500 dark:text-amber-400">
                    <Sparkles className="h-3 w-3" /> Nổi bật
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
              {/* Title & Meta */}
              <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-accent font-medium">
                  {project.subtitle}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-md border border-border bg-muted/60 px-2.5 py-1">
                    🏢 {project.org}
                  </span>
                  <span className="rounded-md border border-border bg-muted/60 px-2.5 py-1">
                    👤 {project.role}
                  </span>
                </div>
              </div>

              {/* Metrics highlight */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-accent/20 bg-accent/5 p-3.5 text-center"
                    >
                      <div className="font-heading text-lg font-bold text-accent md:text-xl">
                        {m.value}
                      </div>
                      <div className="mt-1 text-[11px] text-muted-foreground font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground/90">
                {project.summary}
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    Bài toán thực tế
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Giải pháp kỹ thuật
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Architecture breakdown */}
              {project.architecture && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Kiến trúc & Hạ tầng
                  </h3>
                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    {project.architecture.frontend && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
                        <Layers className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <div className="font-semibold text-foreground">Frontend</div>
                          <div className="mt-0.5 text-muted-foreground">
                            {project.architecture.frontend}
                          </div>
                        </div>
                      </div>
                    )}
                    {project.architecture.backend && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
                        <Server className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <div className="font-semibold text-foreground">Backend</div>
                          <div className="mt-0.5 text-muted-foreground">
                            {project.architecture.backend}
                          </div>
                        </div>
                      </div>
                    )}
                    {project.architecture.aiEngine && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
                        <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <div className="font-semibold text-foreground">AI Pipeline</div>
                          <div className="mt-0.5 text-muted-foreground">
                            {project.architecture.aiEngine}
                          </div>
                        </div>
                      </div>
                    )}
                    {project.architecture.database && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
                        <Database className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                          <div className="font-semibold text-foreground">Database</div>
                          <div className="mt-0.5 text-muted-foreground">
                            {project.architecture.database}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Tính năng nổi bật
                  </h3>
                  <ul className="space-y-2 text-xs md:text-sm">
                    {project.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-muted-foreground leading-relaxed">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stack tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Công nghệ sử dụng
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="sticky bottom-0 border-t border-border bg-card/90 p-4 backdrop-blur-md flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> Repository
                  </a>
                ) : project.isPrivate ? (
                  <span className="text-[11px] text-muted-foreground italic">
                    🔒 Dự án nội bộ (Private Repository)
                  </span>
                ) : null}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition"
              >
                Xem Case Study đầy đủ
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
