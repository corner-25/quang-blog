"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { useRef } from "react";
import { HeroVisual } from "./hero-visual";

const roles = profile.roles;

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, reduce ? 1 : 0.35]
  );
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 45]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Background grid + blobs */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="absolute inset-0 -z-10 bg-grid opacity-60"
      />
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

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-24 pb-28 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)] lg:gap-4 lg:pt-28 lg:pb-32"
      >
        <div className="min-w-0">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Xin chào, tôi là Quang.
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[76px] xl:text-[84px]">
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
            className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
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
        </div>

        {/* Quick stats */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-2 lg:mt-4"
        >
          {[
            { k: "GPA", v: "3.8/4.0" },
            { k: "Khoá luận", v: "9.5/10" },
            { k: "Xếp loại", v: "Xuất sắc" },
            { k: "Dự án solo", v: "10+" },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
              whileHover={reduce ? undefined : { y: -5, scale: 1.015 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent/60 hover:shadow-[0_14px_40px_-20px_rgba(56,189,248,0.55)]"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.k}
              </div>
              <div className="mt-1 font-display text-2xl font-bold">
                {s.v}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="hidden lg:col-start-2 lg:row-start-1 lg:block lg:-translate-y-10">
          <HeroVisual />
        </div>
      </motion.div>
    </section>
  );
}
