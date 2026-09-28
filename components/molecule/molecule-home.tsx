"use client";

import "./molecule-home.css";
import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";
import { ProjectDrawer } from "@/components/project-drawer";
import { projectsByRecent } from "@/data/profile";
import type { ProjectCategory, ProjectDetail } from "@/data/projects";
import { createMoleculeScene, type SceneHandle } from "./molecule-scene";
import {
  AboutStation,
  ContactStation,
  EducationStation,
  ExperienceStation,
  LaunchStation,
  PressStation,
  ProjectsStation,
  ResearchStation,
} from "./molecule-sections";
import { stations } from "./stations";

const emptySubscribe = () => () => {};
const pad = (n: number) => String(n).padStart(2, "0");

type Segment = { warp: boolean; index: number; top: number; height: number };

function ease(f: number): number {
  return f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
}

export function MoleculeHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const warpRef = useRef<HTMLDivElement>(null);
  const warpKRef = useRef<HTMLDivElement>(null);
  const warpNRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneHandle | null>(null);
  const measureRef = useRef<() => void>(() => {});

  const [current, setCurrent] = useState(0);
  const [filter, setFilter] = useState<ProjectCategory | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Làm sáng mọi phần tử HTML mang cùng khoá với nguyên tử đang được trỏ.
  const light = useCallback((key: string | null) => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll(".is-lit").forEach((el) => el.classList.remove("is-lit"));
    if (key) root.querySelectorAll(`[data-k="${CSS.escape(key)}"]`).forEach((el) => el.classList.add("is-lit"));
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const tag = tagRef.current;
    if (!root || !canvas || !tag) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Con trỏ đang ở vùng trống (không đè lên khung chữ) thì mới bắt nguyên tử.
    const isOpenSpace = (target: EventTarget | null) =>
      target === canvas ||
      target === root ||
      target === document.body ||
      target === document.documentElement ||
      (target instanceof HTMLElement && (target.dataset.seg !== undefined || target.tagName === "MAIN"));

    const scene = createMoleculeScene({
      canvas,
      tag,
      stations,
      reducedMotion: reduced,
      isOpenSpace,
      onHover: light,
      onPick: (item) => {
        if (item.slug) {
          const project = projectsByRecent.find((p) => p.slug === item.slug);
          if (project) setActiveProject(project);
          return;
        }
        root
          .querySelector(`[data-k="${CSS.escape(item.key)}"]`)
          ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      },
    });
    sceneRef.current = scene;

    let segments: Segment[] = [];
    const measure = () => {
      segments = Array.from(root.querySelectorAll<HTMLElement>("[data-seg]")).map((el) => ({
        warp: el.dataset.seg === "warp",
        index: Number(el.dataset.i),
        top: el.getBoundingClientRect().top + window.scrollY,
        height: el.offsetHeight,
      }));
    };
    measureRef.current = measure;

    let shown = -1;
    let warpTo = -1;
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.5;
      let s = stations.length - 1;
      let warp = 0;
      let to = s;
      for (const seg of segments) {
        if (y >= seg.top + seg.height) continue;
        if (seg.warp) {
          const f = Math.min(1, Math.max(0, (y - seg.top) / seg.height));
          s = seg.index - 1 + ease(f);
          warp = Math.sin(Math.PI * f);
          to = seg.index;
        } else {
          s = seg.index;
          to = seg.index;
        }
        break;
      }
      scene?.setProgress(s);

      const w = warpRef.current;
      if (w) {
        w.style.opacity = warp.toFixed(3);
        if (warp > 0.01 && to !== warpTo) {
          warpTo = to;
          if (warpKRef.current) warpKRef.current.textContent = `Trạm ${pad(to + 1)} / ${pad(stations.length)}`;
          if (warpNRef.current) warpNRef.current.textContent = stations[to].name;
          w.style.setProperty("--wc", stations[to].color);
        }
      }

      const c = Math.round(s);
      if (c !== shown) {
        shown = c;
        setCurrent(c);
        light(null);
        scene?.setHover(null);
      }
    };

    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    const first = requestAnimationFrame(() => {
      measure();
      onScroll();
    });

    return () => {
      cancelAnimationFrame(first);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [isClient, light]);

  useEffect(() => {
    sceneRef.current?.setFilter(filter);
    measureRef.current();
  }, [filter]);

  const hoverFrom = (target: EventTarget) => {
    const el = target instanceof Element ? target.closest<HTMLElement>("[data-k]") : null;
    const key = el?.dataset.k ?? null;
    light(key);
    sceneRef.current?.setHover(key);
  };

  const goTo = (i: number) => {
    const el = document.getElementById(stations[i].id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: i === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: reduced ? "auto" : "smooth" });
  };

  const content: ReactNode[] = [
    <LaunchStation key="0" />,
    <AboutStation key="1" />,
    <EducationStation key="2" />,
    <ExperienceStation key="3" />,
    <ProjectsStation key="4" filter={filter} onFilter={setFilter} onOpen={setActiveProject} />,
    <ResearchStation key="5" />,
    <PressStation key="6" />,
    <ContactStation key="7" />,
  ];

  return (
    <div
      ref={rootRef}
      className="mh-root"
      onPointerOver={(e) => hoverFrom(e.target)}
      onFocus={(e) => hoverFrom(e.target)}
    >
      {stations.map((st, i) => (
        <Fragment key={st.id}>
          {i > 0 && <div className="mh-gap" data-seg="warp" data-i={i} aria-hidden />}
          <section
            id={st.id}
            data-seg="station"
            data-i={i}
            aria-label={st.name}
            className={`mh-st${i === 0 ? " mh-st-hero" : ""}`}
            style={{ "--sc": st.color } as CSSProperties}
          >
            {content[i]}
          </section>
        </Fragment>
      ))}

      {isClient &&
        createPortal(
          <>
            <canvas ref={canvasRef} className="mh-canvas" aria-hidden />
            <div className="mh-vignette" aria-hidden />
            <div ref={warpRef} className="mh-warp" aria-hidden>
              <div ref={warpKRef} className="mh-warp-k" />
              <div ref={warpNRef} className="mh-warp-n" />
            </div>
            <div ref={tagRef} className="mh-tag" hidden />
            <nav className="mh-rail" aria-label="Các trạm trên trang chủ">
              {stations.map((st, i) => (
                <button
                  key={st.id}
                  type="button"
                  aria-current={i === current}
                  aria-label={`Trạm ${i + 1}: ${st.name}`}
                  style={{ "--c": st.color } as CSSProperties}
                  onClick={() => goTo(i)}
                >
                  <i />
                  <span>{st.name}</span>
                </button>
              ))}
            </nav>
          </>,
          document.body
        )}

      <ProjectDrawer project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
