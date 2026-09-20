"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(p)}
        className={cn(
          "group relative flex h-full flex-col cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300",
          "hover:border-accent/60 hover:shadow-[0_12px_44px_-10px_rgba(0,240,255,0.22)]",
          p.highlight && "ring-1 ring-accent/35 bg-gradient-to-b from-accent/[0.04] to-card"
        )}
      >
        {/* Dynamic Specular Light Glare following cursor */}
        {isHovered && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(0, 240, 255, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent font-mono">
              {p.year}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {p.category}
            </span>
            {p.highlight && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-500 dark:text-amber-400">
                <Sparkles className="h-3 w-3" /> Nổi bật
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-accent transition">
            <span className="hidden sm:inline text-[11px]">Chi tiết</span>
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3.5 font-heading text-lg font-bold leading-snug text-foreground group-hover:text-accent transition-colors">
          {p.title}
        </h3>

        {/* Org & Role */}
        <p className="mt-1 text-xs text-muted-foreground font-medium flex items-center gap-1.5">
          <span>{p.org}</span>
        </p>

        {/* Metrics Pill (if available) */}
        {p.metrics && p.metrics.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/5 px-2.5 py-1 text-xs font-semibold text-accent font-heading">
              {p.metrics[0].value}
            </span>
            <span className="text-[11px] text-muted-foreground truncate">
              {p.metrics[0].label}
            </span>
          </div>
        )}

        {/* Summary */}
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground leading-relaxed flex-1">
          {p.summary}
        </p>

        {/* Stack badges */}
        {p.stack && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-border/80 bg-muted/40 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                {s}
              </span>
            ))}
            {p.stack.length > 4 && (
              <span className="rounded-full border border-border/80 bg-muted/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                +{p.stack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Bottom Role bar */}
        <div className="mt-4 border-t border-border pt-3 text-[11px] uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span className="truncate">{p.role}</span>
          <span className="text-accent text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Bấm để xem →
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
