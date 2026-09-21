"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]';

const IDLE_RADIUS = 460;
const HOVER_RADIUS = 620;

const emptySubscribe = () => () => {};

/**
 * Option 1: Spotlight Ambient Glow (Linear / Vercel style)
 * - Giữ nguyên 100% con trỏ mặc định hệ điều hành (nhanh, nhạy, 0ms lag).
 * - Quầng sáng ambient radial gradient trôi êm ái theo con trỏ chuột bằng lò xo vật lý (spring).
 * - Cập nhật trực tiếp qua CSS variables (--x, --y, --r) trên DOM element:
 *   -> 60-120 FPS mượt mà
 *   -> Không gây React re-render
 *   -> Tuyệt đối an toàn về SSR / Hydration / Rules of Hooks
 * - Tự động nở rộng nhẹ khi hover vào nút/link và ẩn mượt khi rời khỏi cửa sổ.
 */
export function Cursor() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Toạ độ thực của chuột
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Lò xo vật lý tạo độ trôi êm ái, hữu cơ cho quầng sáng
  const springX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.25 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.25 });

  // Bán kính quầng sáng: co giãn mượt khi rê qua phần tử tương tác
  const radius = useSpring(IDLE_RADIUS, { damping: 25, stiffness: 200 });

  // Kiểm tra thiết bị có hỗ trợ con trỏ chuột và không bật prefers-reduced-motion
  useEffect(() => {
    const fineMq = window.matchMedia("(pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkSupport = () => {
      setIsSupported(fineMq.matches && !motionMq.matches);
    };

    checkSupport();
    fineMq.addEventListener("change", checkSupport);
    motionMq.addEventListener("change", checkSupport);

    return () => {
      fineMq.removeEventListener("change", checkSupport);
      motionMq.removeEventListener("change", checkSupport);
    };
  }, []);

  // Lắng nghe thay đổi từ spring để cập nhật CSS variables trực tiếp trên DOM
  useEffect(() => {
    if (!isSupported) return;

    const unX = springX.on("change", (v) => {
      containerRef.current?.style.setProperty("--spotlight-x", `${Math.round(v)}px`);
    });
    const unY = springY.on("change", (v) => {
      containerRef.current?.style.setProperty("--spotlight-y", `${Math.round(v)}px`);
    });
    const unR = radius.on("change", (v) => {
      containerRef.current?.style.setProperty("--spotlight-r", `${Math.round(v)}px`);
    });

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      radius.set(isInteractive ? HOVER_RADIUS : IDLE_RADIUS);
    };

    const onMouseLeave = (e: MouseEvent) => {
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
      unX();
      unY();
      unR();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isSupported, mouseX, mouseY, springX, springY, radius]);

  // Không gọi hook nào sau điều kiện này
  if (!isMounted || !isSupported) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "radial-gradient(var(--spotlight-r, 460px) circle at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), var(--cursor-spotlight-inner) 0%, var(--cursor-spotlight-outer) 45%, transparent 75%)",
      }}
    />
  );
}
