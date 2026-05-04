"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

const roles = profile.roles;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background grid + blobs */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div
        className="blob animate-float bg-sky-300/50 dark:bg-sky-500/30"
        style={{ top: "-120px", left: "-80px", width: 420, height: 420 }}
      />
      <div
        className="blob animate-float bg-blue-200/50 dark:bg-blue-700/20"
        style={{
          top: "10%",
          right: "-100px",
          width: 360,
          height: 360,
          animationDelay: "2s",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Xin chào, tôi là Quang.
        </motion.div>

        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[88px]">
          {profile.name.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="mr-3 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-base md:text-lg"
        >
          {roles.map((r, i) => (
            <span key={r} className="flex items-center gap-3">
              {i > 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
              )}
              <span className="shimmer-text font-semibold">{r}</span>
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Về tôi
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-3 text-sm font-medium hover:bg-muted transition"
          >
            Đọc Nhân sinh quan
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Xem dự án →
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { k: "GPA", v: "3.8/4.0" },
            { k: "Khoá luận", v: "9.5/10" },
            { k: "Xếp loại", v: "Xuất sắc" },
            { k: "Dự án solo", v: "6+" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-border bg-card p-4 transition hover:border-accent/60"
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.k}
              </div>
              <div className="mt-1 font-display text-2xl font-bold">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
