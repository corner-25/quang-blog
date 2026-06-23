"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, BrainCircuit, Database, Sparkles } from "lucide-react";

const orbitTransition = (duration: number, reverse = false) => ({
  duration,
  ease: "linear" as const,
  repeat: Infinity,
  repeatType: "loop" as const,
  ...(reverse ? { repeatType: "loop" as const } : {}),
});

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.92, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.45 }}
      className="pointer-events-none relative mx-auto aspect-square w-full max-w-[430px]"
    >
      <div className="absolute inset-[9%] rounded-full bg-accent/8 blur-3xl" />

      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={orbitTransition(28)}
        className="absolute inset-[5%] rounded-full border border-dashed border-accent/25"
      >
        <OrbitIcon className="-right-4 top-1/2 -translate-y-1/2">
          <Database className="h-4 w-4" />
        </OrbitIcon>
        <OrbitIcon className="bottom-[8%] left-[12%]">
          <Activity className="h-4 w-4" />
        </OrbitIcon>
      </motion.div>

      <motion.div
        animate={reduce ? undefined : { rotate: -360 }}
        transition={orbitTransition(20, true)}
        className="absolute inset-[18%] rounded-full border border-border/80"
      >
        <OrbitIcon className="-left-4 top-[28%]">
          <BrainCircuit className="h-4 w-4" />
        </OrbitIcon>
        <span className="absolute bottom-[6%] right-[9%] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" />
      </motion.div>

      <div className="absolute inset-[28%] rounded-full border border-accent/30 bg-background/65 p-3 shadow-[0_22px_80px_-30px_rgba(56,189,248,0.65)] backdrop-blur-xl">
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  boxShadow: [
                    "0 0 0 0 rgba(56,189,248,0)",
                    "0 0 0 12px rgba(56,189,248,0.08)",
                    "0 0 0 0 rgba(56,189,248,0)",
                  ],
                }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-border bg-card"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--accent-soft),transparent_68%)]" />
          <motion.div
            animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-5 w-5 rounded-full border border-accent/40 bg-accent/15"
          >
            <span className="absolute inset-1 rounded-full bg-accent shadow-[0_0_20px_var(--accent)]" />
          </motion.div>
          <Sparkles className="absolute right-[22%] top-[22%] h-4 w-4 text-accent" />
        </motion.div>
      </div>

      <svg
        viewBox="0 0 430 430"
        className="absolute inset-0 h-full w-full text-accent"
      >
        <defs>
          <linearGradient id="hero-signal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="20%" stopColor="currentColor" stopOpacity=".45" />
            <stop offset="50%" stopColor="currentColor" stopOpacity=".9" />
            <stop offset="80%" stopColor="currentColor" stopOpacity=".45" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M35 215h72l12-18 17 45 18-84 20 111 18-54h34l14-24 18 46 17-22h120"
          fill="none"
          stroke="url(#hero-signal)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-[16%] top-[12%] rounded-full border border-border bg-background/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur"
      >
        AI · Clinical Data
      </motion.div>

      <motion.div
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -bottom-[1%] -left-[16%] flex items-center gap-2 rounded-full border border-border bg-background/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        Systems online
      </motion.div>
    </motion.div>
  );
}

function OrbitIcon({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`absolute flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-accent shadow-lg ${className}`}
    >
      {children}
    </span>
  );
}
