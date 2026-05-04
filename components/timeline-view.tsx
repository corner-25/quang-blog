"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { TimelineItem } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function TimelineView({ items }: { items: TimelineItem[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* central line */}
      <div
        aria-hidden
        className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-accent/60 via-border to-transparent md:left-1/2 md:-translate-x-1/2"
      />

      <ol className="space-y-12">
        {items.map((item, i) => {
          const sideLeft = i % 2 === 0;
          return (
            <li
              key={item.slug}
              className="relative grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {/* dot */}
              <span
                aria-hidden
                className="absolute left-4 top-3 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background md:left-1/2"
              />

              {/* card */}
              <motion.div
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: sideLeft ? -24 : 24, y: 8 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={`pl-10 md:pl-0 ${
                  sideLeft
                    ? "md:pr-12 md:text-right md:col-start-1"
                    : "md:pl-12 md:col-start-2"
                }`}
              >
                <div className="group rounded-2xl border border-border bg-card p-6 transition hover:border-accent/60 hover:shadow-[0_8px_30px_-10px_rgba(56,189,248,0.3)]">
                  <time className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {formatDate(item.date)}
                  </time>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  {item.location && (
                    <div
                      className={`mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground ${
                        sideLeft ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <MapPin className="h-3 w-3" /> {item.location}
                    </div>
                  )}
                  {item.image && (
                    <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition group-hover:scale-105"
                      />
                    </div>
                  )}
                  {item.body && (
                    <p
                      className={`mt-4 whitespace-pre-line text-sm text-muted-foreground leading-relaxed ${
                        sideLeft ? "md:text-right" : ""
                      }`}
                    >
                      {item.body}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* spacer column */}
              <div
                aria-hidden
                className={`hidden md:block ${
                  sideLeft ? "md:col-start-2" : "md:col-start-1"
                }`}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
