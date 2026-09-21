"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]';

const IDLE_RADIUS = 460;
const HOVER_RADIUS = 620;

/**
 * Option 1: Spotlight Ambient Glow (Linear / Vercel style)
 * - Giữ nguyên chuột OS mặc định (100% nhạy, 0ms lag, nguyên bản con trỏ hệ điều hành)
 * - Tạo một luồng sáng ambient glow (radial gradient) mềm mại, trôi êm ái theo con trỏ
 * - Nhẹ nhàng chiếu sáng các khối thẻ (card), viền (border) và nền khi lướt qua
 * - Tự động mở rộng bán kính khi hover vào liên kết/nút bấm (interactive element)
 * - Tự động ẩn nhẹ nhàng khi chuột rời màn hình
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Toạ độ thực của chuột
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Lò xo vật lý tạo độ trôi êm ái, hữu cơ cho quầng sáng
  const springX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.25 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.25 });

  // Bán kính quầng sáng: co giãn mượt khi rê qua phần tử tương tác
  const radius = useSpring(IDLE_RADIUS, { damping: 25, stiffness: 200 });

  useEffect(() => {
    // Chỉ kích hoạt trên thiết bị có chuột (pointer: fine) và không bật prefers-reduced-motion
    const fineMq = window.matchMedia("(pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkSupport = () => {
      setEnabled(fineMq.matches && !motionMq.matches);
    };

    checkSupport();
    fineMq.addEventListener("change", checkSupport);
    motionMq.addEventListener("change", checkSupport);

    return () => {
      fineMq.removeEventListener("change", checkSupport);
      motionMq.removeEventListener("change", checkSupport);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      radius.set(isInteractive ? HOVER_RADIUS : IDLE_RADIUS);
    };

    const onMouseLeave = (e: MouseEvent) => {
      // Chuột thực sự rời khỏi cửa sổ trình duyệt
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [enabled, isVisible, mouseX, mouseY, radius]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: useMotionTemplate`radial-gradient(${radius}px circle at ${springX}px ${springY}px, var(--cursor-spotlight-inner) 0%, var(--cursor-spotlight-outer) 45%, transparent 75%)`,
      }}
    />
  );
}
