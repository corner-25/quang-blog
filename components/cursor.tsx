"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]';

// Kích thước vòng khi rảnh (không hover) và padding khi ôm phần tử.
const RING_IDLE_SIZE = 40;
const SNAP_PADDING = 8;
const SNAP_RADIUS = 12;

type Snap = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
};

export function Cursor() {
  // Toạ độ con trỏ thật — chấm nhỏ bám theo tức thời.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Tâm vòng ngoài: mặc định theo con trỏ, khi hover thì kéo về tâm phần tử.
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.5 });

  // Kích thước/bo góc vòng ngoài — animate mượt khi snap vào phần tử.
  const width = useSpring(RING_IDLE_SIZE, { stiffness: 300, damping: 30 });
  const height = useSpring(RING_IDLE_SIZE, { stiffness: 300, damping: 30 });
  const radius = useSpring(RING_IDLE_SIZE / 2, { stiffness: 300, damping: 30 });

  const [enabled, setEnabled] = useState(false);
  const visibleRef = useRef(false);
  const snapRef = useRef<Snap | null>(null);

  useEffect(() => {
    // Chỉ bật trên thiết bị có chuột (pointer: fine), không bật cho cảm ứng.
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

    // Khi đang ôm một phần tử, giữ vòng dính vào tâm phần tử đó.
    const applySnap = (snap: Snap) => {
      ringX.set(snap.x);
      ringY.set(snap.y);
      width.set(snap.width);
      height.set(snap.height);
      radius.set(snap.radius);
    };

    const releaseSnap = () => {
      snapRef.current = null;
      width.set(RING_IDLE_SIZE);
      height.set(RING_IDLE_SIZE);
      radius.set(RING_IDLE_SIZE / 2);
    };

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      // Khi rảnh, vòng theo con trỏ. Khi đang snap, giữ vòng dính phần tử.
      if (snapRef.current) {
        applySnap(snapRef.current);
      } else {
        ringX.set(e.clientX);
        ringY.set(e.clientY);
      }

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
      const interactive = target?.closest(INTERACTIVE_SELECTOR) as
        | HTMLElement
        | null
        | undefined;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const snap: Snap = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width + SNAP_PADDING * 2,
          height: rect.height + SNAP_PADDING * 2,
          radius: SNAP_RADIUS,
        };
        snapRef.current = snap;
        applySnap(snap);
      } else if (snapRef.current) {
        releaseSnap();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseover", onOver);
    // Cuộn trang khi đang snap → phần tử dịch chuyển, thả snap cho an toàn.
    window.addEventListener("scroll", releaseSnap, { passive: true });

    return () => {
      root.classList.remove("cursor-none-on-fine");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", releaseSnap);
    };
  }, [enabled, x, y, ringX, ringY, width, height, radius]);

  if (!enabled) return null;

  return (
    <>
      {/* Chấm giữa — bám con trỏ thật, luôn cho biết vị trí click chính xác */}
      <motion.div
        aria-hidden
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] hidden h-[6px] w-[6px] rounded-full bg-foreground mix-blend-difference [body[data-cursor-visible='true']_&]:block"
      />
      {/* Vòng ngoài — spring theo con trỏ, hút & ôm lấy phần tử khi hover */}
      <motion.div
        aria-hidden
        style={{
          translateX: ringX,
          translateY: ringY,
          width,
          height,
          borderRadius: radius,
          x: "-50%",
          y: "-50%",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden border border-foreground/60 mix-blend-difference [body[data-cursor-visible='true']_&]:block"
      />
    </>
  );
}
