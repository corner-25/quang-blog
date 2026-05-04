"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]';

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse), not touch
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("cursor-none-on-fine");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        document.body.dataset.cursorVisible = "true";
      }
    };
    const onLeave = () => {
      visibleRef.current = false;
      document.body.dataset.cursorVisible = "false";
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseover", onOver);

    return () => {
      root.classList.remove("cursor-none-on-fine");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot — instant, follows cursor exactly */}
      <motion.div
        aria-hidden
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] hidden h-[6px] w-[6px] rounded-full bg-foreground mix-blend-difference [body[data-cursor-visible='true']_&]:block"
      />
      {/* Outer ring — springy follow + grows on hover */}
      <motion.div
        aria-hidden
        style={{ translateX: ringX, translateY: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden -ml-5 -mt-5 h-10 w-10 rounded-full border border-foreground/60 mix-blend-difference transition-[width,height,margin,border-radius,opacity] duration-200 ease-out [body[data-cursor-visible='true']_&]:block"
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: hovering ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
    </>
  );
}
