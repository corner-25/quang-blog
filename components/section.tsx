"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-flex items-center gap-2"
          >
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent font-mono">
              {eyebrow}
            </span>
          </motion.div>
        )}
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-heading text-3xl font-bold tracking-tight md:text-4xl text-foreground"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 text-base text-muted-foreground md:text-lg leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
      {action && (
        <div className="shrink-0 pb-1">
          {action}
        </div>
      )}
    </div>
  );
}
