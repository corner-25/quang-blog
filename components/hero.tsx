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
import { HeroCanvas3D } from "./hero-canvas-3d";

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
      {/* 3D WebGL Neural / Clinical Constellation */}
      <HeroCanvas3D />

      {/* Background grid + ambient glow */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="absolute inset-0 -z-10 bg-grid opacity-40"
      />
      <div
        className="blob animate-float bg-cyan-500/20 dark:bg-cyan-500/25"
        style={{ top: "-120px", left: "-80px", width: 420, height: 420 }}
      />
      <div
        className="blob animate-float bg-emerald-500/15 dark:bg-emerald-500/20"
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
        <div className="min-w-0 z-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Xin chào, tôi là Quang.
          </motion.div>

          <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-[76px] xl:text-[84px] text-foreground">
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
                <span className="shimmer-text relative z-10 font-semibold [backface-visibility:hidden] [transform:translateZ(0)]">
                  {r}
                </span>
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
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-2 lg:mt-4 z-10"
        >
          {[
            { k: "Danh hiệu", v: "Thủ khoa", sub: "ĐH Bách Khoa" },
            { k: "Tốt nghiệp", v: "GPA 3.8", sub: "Loại Xuất sắc" },
            { k: "Khóa luận AI CDS", v: "9.5 / 10", sub: "Điểm cao nhất khoa" },
            { k: "Hệ thống y tế", v: "10+ Dự án", sub: "Thực tế tại BV ĐHYD" },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
              whileHover={reduce ? undefined : { y: -5, scale: 1.015 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-4 transition-all hover:border-accent/60 hover:shadow-[0_14px_40px_-20px_rgba(0,240,255,0.35)]"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.k}
              </div>
              <div className="mt-1 font-heading text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                {s.v}
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {s.sub}
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
