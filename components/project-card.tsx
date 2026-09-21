"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { ProjectDetail } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectDetail;
  index: number;
  onSelect: (project: ProjectDetail) => void;
};

export function ProjectCard({ project: p, index, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth cursor-following spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(p)}
        className={cn(
          "group relative flex h-full flex-col cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 transform-gpu backface-hidden",
          "hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_16px_40px_-12px_rgba(0,240,255,0.22)]",
          p.highlight && "ring-1 ring-accent/35 bg-gradient-to-b from-accent/[0.04] to-card"
        )}
      >
        {/* Dynamic Specular Light Spotlight following cursor */}
        {isHovered && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(420px circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%, rgba(0, 240, 255, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Top Header: Robust Badges Layout */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
            <span className="inline-flex shrink-0 items-center rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent font-mono whitespace-nowrap">
              {p.year}
            </span>
            <span className="inline-flex shrink-0 items-center rounded-full bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground whitespace-nowrap">
              {p.category}
            </span>
            {p.highlight && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-500 dark:text-amber-400 whitespace-nowrap">
                <Sparkles className="h-3 w-3" /> Nổi bật
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors pt-0.5">
            <span className="hidden sm:inline text-[11px] whitespace-nowrap">Chi tiết</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Title: Standardized height to prevent card height jumping */}
        <h3 className="mt-3.5 font-heading text-base sm:text-lg font-bold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2 min-h-[3rem]">
          {p.title}
        </h3>

        {/* Org */}
        <p className="mt-1 text-xs text-muted-foreground font-medium truncate">
          {p.org}
        </p>

        {/* Metrics Pill (Consistent vertical rhythm) */}
        <div className="mt-2.5 flex items-center gap-2 min-h-[26px]">
          {p.metrics && p.metrics.length > 0 ? (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/5 px-2.5 py-0.5 text-xs font-semibold text-accent font-heading whitespace-nowrap">
                {p.metrics[0].value}
              </span>
              <span className="text-[11px] text-muted-foreground truncate">
                {p.metrics[0].label}
              </span>
            </>
          ) : (
            <span className="text-[11px] text-muted-foreground/60 italic">
              Dự án thực tế
            </span>
          )}
        </div>

        {/* Summary */}
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground leading-relaxed flex-1">
          {p.summary}
        </p>

        {/* Stack badges */}
        <div className="mt-4 flex flex-wrap gap-1.5 min-h-[24px]">
          {p.stack?.slice(0, 4).map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-2 py-0.5 text-[10px] font-mono text-muted-foreground whitespace-nowrap"
            >
              {s}
            </span>
          ))}
          {p.stack && p.stack.length > 4 && (
            <span className="inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
              +{p.stack.length - 4}
            </span>
          )}
        </div>

        {/* Bottom Role bar: flex-1 on role prevents text truncate jumping */}
        <div className="mt-4 border-t border-border/80 pt-3 text-[11px] uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span className="truncate flex-1 min-w-0 pr-2 font-mono text-[10px]">
            {p.role}
          </span>
          <span className="shrink-0 text-accent text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Bấm để xem →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
