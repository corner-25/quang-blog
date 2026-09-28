import * as THREE from "three";
import type { AtomItem, Station } from "./stations";

// Cảnh 3D của trang chủ: mỗi trạm là một phân tử bi-que, giữa hai trạm là một
// chuỗi xoắn kép DNA. Camera bay theo tiến độ cuộn trang (setProgress).

export type SceneHandle = {
  setProgress: (stationFloat: number) => void;
  setHover: (key: string | null) => void;
  setFilter: (category: string | null) => void;
  dispose: () => void;
};

type Options = {
  canvas: HTMLCanvasElement;
  tag: HTMLElement;
  stations: Station[];
  reducedMotion: boolean;
  isOpenSpace: (target: EventTarget | null) => boolean;
  onHover: (key: string | null) => void;
  onPick: (item: AtomItem) => void;
};

const GAP = 95;
const BG = 0xf4f9fe;
const UP = new THREE.Vector3(0, 1, 0);
const HOVER_SCALE = 1.5;
const DIM_OPACITY = 0.12;
// Camera đuổi theo vị trí cuộn mỗi khung hình một phần; số càng nhỏ, cú bay càng chậm và mượt.
const CAMERA_FOLLOW = 0.03;
const BASE_COLORS = ["#5EEAD4", "#93C5FD", "#A5B4FC", "#FCD34D"];

type Atom = THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;

type BuiltStation = {
  R: number;
  atoms: Atom[];
  tick: (t: number) => void;
};

function fibonacciDirs(n: number): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = ga * i + 0.6;
    out.push(new THREE.Vector3(Math.cos(th) * r, y * 0.8, Math.sin(th) * r).normalize());
  }
  return out;
}

function circle(r: number, seg: number): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export function createMoleculeScene(opts: Options): SceneHandle | null {
  const { canvas, tag, stations, reducedMotion } = opts;
  const N = stations.length;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(BG, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(BG, 26, 110);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 600);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe6f7, 2.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(-4, 8, 6);
  scene.add(sun);

  const byKey = new Map<string, Atom>();
  const sphereCache = new Map<number, THREE.SphereGeometry>();
  const sphere = (r: number) => {
    let g = sphereCache.get(r);
    if (!g) {
      g = new THREE.SphereGeometry(r, 28, 28);
      sphereCache.set(r, g);
    }
    return g;
  };

  function atom(item: AtomItem, radius: number): Atom {
    const m = new THREE.Mesh(
      sphere(radius),
      new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.25, metalness: 0.05, transparent: true })
    ) as Atom;
    m.userData.item = item;
    byKey.set(item.key, m);
    return m;
  }

  function bond(a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material): THREE.Mesh {
    const d = b.clone().sub(a);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, d.length(), 10), mat);
    m.position.copy(a).addScaledVector(d, 0.5);
    m.quaternion.setFromUnitVectors(UP, d.normalize());
    return m;
  }

  // ── Phân tử của từng trạm ──
  const centers = stations.map(
    (_, i) => new THREE.Vector3(i % 2 ? 5 : -4, Math.cos(i * 0.9) * 2, -i * GAP)
  );
  const bondMats = new Map<string, THREE.MeshStandardMaterial>();

  const built: BuiltStation[] = stations.map((st, i) => {
    const g = new THREE.Group();
    g.position.copy(centers[i]);
    scene.add(g);
    const origin = new THREE.Vector3();
    const atoms: Atom[] = [];

    const core = atom({ key: `core-${st.id}`, label: st.name, sub: `Trạm ${i + 1} / ${N}`, color: st.color }, 1.1);
    g.add(core);
    atoms.push(core);

    let R: number;
    if (st.flat) {
      const items = st.groups[0].items;
      const dirs = fibonacciDirs(items.length);
      const mat = new THREE.MeshStandardMaterial({ color: "#A6C8E4", roughness: 0.4, transparent: true });
      bondMats.set(st.groups[0].key, mat);
      items.forEach((it, j) => {
        const p = dirs[j].clone().multiplyScalar(3.4);
        g.add(bond(origin, p, 0.1, mat));
        const a = atom(it, it.big ? 0.55 : 0.4);
        a.position.copy(p);
        g.add(a);
        atoms.push(a);
      });
      R = 4.2;
    } else {
      const subDirs = fibonacciDirs(st.groups.length);
      let reach = 0;
      st.groups.forEach((gr, k) => {
        const mat = new THREE.MeshStandardMaterial({ color: "#A6C8E4", roughness: 0.4, transparent: true });
        bondMats.set(gr.key, mat);
        const sub = subDirs[k].clone().multiplyScalar(3.6);
        g.add(bond(origin, sub, 0.11, mat));
        const hub = atom({ key: gr.key, label: gr.label, sub: `${gr.items.length} mục`, color: gr.color }, 0.62);
        hub.material.opacity = 0.8;
        hub.position.copy(sub);
        g.add(hub);
        atoms.push(hub);
        const local = fibonacciDirs(gr.items.length);
        const armLen = 1.5 + gr.items.length * 0.07;
        reach = Math.max(reach, 3.6 + armLen);
        gr.items.forEach((it, j) => {
          const dir = subDirs[k].clone().multiplyScalar(1.1).add(local[j]).normalize();
          const p = sub.clone().addScaledVector(dir, armLen);
          g.add(bond(sub, p, 0.06, mat));
          const a = atom(it, it.big ? 0.42 : 0.3);
          a.position.copy(p);
          g.add(a);
          atoms.push(a);
        });
      });
      R = reach + 0.6;
    }

    // Hai electron chạy quỹ đạo quanh nhân
    const electrons = [0, 1].map((k) => {
      const og = new THREE.Group();
      og.rotation.set(k ? 1.1 : -0.6, k ? 0.4 : -0.9, 0);
      g.add(og);
      const r = 2.1 + k * 0.4;
      og.add(new THREE.Line(circle(r, 96), new THREE.LineBasicMaterial({ color: 0x7cc4f0, transparent: true, opacity: 0.7 })));
      const e = new THREE.Mesh(sphere(0.14), new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }));
      og.add(e);
      return { e, r, speed: k ? -1.6 : 2.1 };
    });

    return {
      R,
      atoms,
      tick: (t: number) => {
        g.rotation.y = t * 0.16 + i;
        g.rotation.x = Math.sin(t * 0.12 + i) * 0.3;
        electrons.forEach((o) => {
          const a = t * o.speed;
          o.e.position.set(Math.cos(a) * o.r, 0, Math.sin(a) * o.r);
        });
      },
    };
  });

  // ── Đường bay và chuỗi xoắn kép giữa hai trạm ──
  const spines: THREE.CatmullRomCurve3[] = [];
  for (let i = 0; i < N - 1; i++) {
    const Ra = built[i].R;
    const Rb = built[i + 1].R;
    const dzb = 6 + Rb * 2.1;
    const p0 = new THREE.Vector3(centers[i].x - Ra - 3, centers[i].y + 1, centers[i].z - Ra - 2);
    const p3 = new THREE.Vector3(centers[i + 1].x - Rb - 3, centers[i + 1].y + 1, centers[i + 1].z + dzb + 8);
    const p1 = p0.clone().lerp(p3, 0.33).add(new THREE.Vector3(3, 2, 0));
    const p2 = p0.clone().lerp(p3, 0.66).add(new THREE.Vector3(-3, -1.5, 0));
    spines.push(new THREE.CatmullRomCurve3([p0, p1, p2, p3]));
  }

  const helixOffset = new THREE.Vector3(5.5, -1.8, 0);
  const strandA = new THREE.Color("#38BDF8");
  const strandB = new THREE.Color("#1D4ED8");
  const bases = BASE_COLORS.map((c) => new THREE.Color(c));
  const ballGeo = new THREE.SphereGeometry(0.27, 14, 12);
  const rungGeo = new THREE.CylinderGeometry(0.08, 0.08, 1, 8);
  const helixMats: THREE.MeshStandardMaterial[] = [];
  const helixMeshes: THREE.InstancedMesh[][] = [];
  spines.forEach((sp) => {
    const helixMat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.35, transparent: true, opacity: 0 });
    helixMats.push(helixMat);
    const steps = Math.floor(sp.getLength() / 0.9);
    const frames = sp.computeFrenetFrames(steps, false);
    const balls = new THREE.InstancedMesh(ballGeo, helixMat, steps * 2);
    const rungs = new THREE.InstancedMesh(rungGeo, helixMat, steps);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const one = new THREE.Vector3(1, 1, 1);
    const zero = new THREE.Vector3();
    for (let k = 0; k < steps; k++) {
      const u = k / steps;
      const hidden = u < 0.06 || u > 0.94;
      const p = sp.getPointAt(u).add(helixOffset);
      const th = k * 0.5;
      const o = frames.normals[k]
        .clone()
        .multiplyScalar(Math.cos(th))
        .addScaledVector(frames.binormals[k], Math.sin(th))
        .multiplyScalar(2.2);
      const a = p.clone().add(o);
      const b = p.clone().sub(o);
      q.identity();
      balls.setMatrixAt(k * 2, m.compose(a, q, hidden ? zero : one));
      balls.setColorAt(k * 2, strandA);
      balls.setMatrixAt(k * 2 + 1, m.compose(b, q, hidden ? zero : one));
      balls.setColorAt(k * 2 + 1, strandB);
      const d = b.clone().sub(a);
      const len = d.length();
      q.setFromUnitVectors(UP, d.normalize());
      rungs.setMatrixAt(k, m.compose(p, q, hidden ? zero : new THREE.Vector3(1, len, 1)));
      rungs.setColorAt(k, bases[k % 4]);
    }
    balls.visible = false;
    rungs.visible = false;
    helixMeshes.push([balls, rungs]);
    scene.add(balls, rungs);
  });

  // ── Camera ──
  let narrow = false;
  type Anchor = { pos: THREE.Vector3; look: THREE.Vector3 };
  let anchors: Anchor[] = [];
  function anchor(i: number): Anchor {
    const R = built[i].R;
    let dz = 6 + R * 2.4;
    let ox = -(R * 0.8 + 2);
    let ly = 0;
    if (narrow) {
      dz *= 1.3;
      ox = 0;
      ly = -R * 0.8;
    }
    const c = centers[i];
    return {
      pos: new THREE.Vector3(c.x + ox, c.y + dz * 0.3, c.z + dz),
      look: new THREE.Vector3(c.x + ox, c.y + ly, c.z),
    };
  }

  let sTarget = 0;
  let sCam = 0;
  let t = reducedMotion ? 4 : 0;
  let hovered: Atom | null = null;
  let filter: string | null = null;
  const pointer = new THREE.Vector2(0, 0);
  let pointerInside = false;
  const ray = new THREE.Raycaster();
  const pos = new THREE.Vector3();
  const look = new THREE.Vector3();
  const spPos = new THREE.Vector3();
  const spLook = new THREE.Vector3();
  const lift = new THREE.Vector3(0, 1.2, 0);
  const tmp = new THREE.Vector3();

  function draw() {
    if (!anchors.length) return;
    const i0 = Math.min(Math.floor(sCam), N - 1);
    const f = i0 === N - 1 ? 0 : sCam - i0;
    const A = anchors[i0];
    const B = anchors[Math.min(i0 + 1, N - 1)];
    pos.lerpVectors(A.pos, B.pos, f);
    look.lerpVectors(A.look, B.look, f);
    if (i0 < N - 1) {
      const w = smoothstep(0, 0.3, f) * (1 - smoothstep(0.7, 1, f));
      spPos.copy(spines[i0].getPointAt(f)).add(lift);
      spLook.copy(spines[i0].getPointAt(Math.min(f + 0.08, 1))).add(lift);
      pos.lerp(spPos, w);
      look.lerp(spLook, w);
    }
    // Chuỗi DNA chỉ hiện trong lúc bay qua đoạn của nó; đứng ở trạm thì ẩn cho gọn.
    helixMats.forEach((mat, k) => {
      const vis = k === i0 ? smoothstep(0, 0.12, f) * (1 - smoothstep(0.88, 1, f)) : 0;
      mat.opacity = vis;
      helixMeshes[k].forEach((mesh) => (mesh.visible = vis > 0.01));
    });
    if (!narrow) {
      pos.x += pointer.x * 0.7;
      pos.y += pointer.y * 0.4;
    }
    camera.position.copy(pos);
    camera.lookAt(look);

    built.forEach((b) => {
      b.atoms.forEach((a) => a.scale.setScalar(1));
      b.tick(t);
    });
    if (hovered) {
      hovered.scale.setScalar(HOVER_SCALE);
      hovered.getWorldPosition(tmp).project(camera);
      if (tmp.z < 1) {
        tag.style.left = `${((tmp.x + 1) / 2) * window.innerWidth}px`;
        tag.style.top = `${((1 - tmp.y) / 2) * window.innerHeight}px`;
        tag.style.visibility = "visible";
      } else {
        tag.style.visibility = "hidden";
      }
    }
    renderer.render(scene, camera);
  }

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    narrow = w < 900 || camera.aspect < 0.95;
    anchors = built.map((_, i) => anchor(i));
    draw();
  }

  function showTag(atomMesh: Atom | null) {
    if (!atomMesh) {
      tag.hidden = true;
      return;
    }
    const it = atomMesh.userData.item as AtomItem;
    const small = document.createElement("small");
    small.textContent = it.sub;
    tag.replaceChildren(document.createTextNode(it.label), small);
    tag.hidden = false;
  }

  function setHovered(next: Atom | null) {
    if (next === hovered) return;
    hovered = next;
    showTag(next);
    if (reducedMotion) draw();
  }

  function onPointerMove(e: PointerEvent) {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    if (!opts.isOpenSpace(e.target)) {
      if (pointerInside) {
        pointerInside = false;
        document.body.style.cursor = "";
      }
      return;
    }
    pointerInside = true;
    ray.setFromCamera(pointer, camera);
    const current = built[Math.round(sCam)];
    const hit = ray.intersectObjects(current.atoms, false).find((h) => (h.object as Atom).material.opacity > 0.5);
    const next = hit ? (hit.object as Atom) : null;
    if (next !== hovered) {
      setHovered(next);
      opts.onHover(next ? (next.userData.item as AtomItem).key : null);
    }
    document.body.style.cursor = next ? "pointer" : "";
  }

  function onClick(e: MouseEvent) {
    if (!hovered || !opts.isOpenSpace(e.target)) return;
    opts.onPick(hovered.userData.item as AtomItem);
  }

  let raf = 0;
  let last = performance.now();
  function loop(now: number) {
    raf = requestAnimationFrame(loop);
    if (document.hidden) {
      last = now;
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    sCam += (sTarget - sCam) * CAMERA_FOLLOW;
    draw();
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("click", onClick);
  resize();
  if (!reducedMotion) raf = requestAnimationFrame(loop);

  return {
    setProgress(s) {
      sTarget = s;
      if (reducedMotion) {
        sCam = s;
        draw();
      }
    },
    setHover(key) {
      setHovered(key ? byKey.get(key) ?? null : null);
    },
    setFilter(category) {
      filter = category;
      const projects = stations.findIndex((s) => s.groups.some((g) => g.category));
      if (projects < 0) return;
      stations[projects].groups.forEach((gr) => {
        const on = !filter || gr.category === filter;
        const hub = byKey.get(gr.key);
        if (hub) hub.material.opacity = on ? 0.8 : DIM_OPACITY;
        gr.items.forEach((it) => {
          const a = byKey.get(it.key);
          if (a) a.material.opacity = on ? 1 : DIM_OPACITY;
        });
        const bm = bondMats.get(gr.key);
        if (bm) bm.opacity = on ? 1 : DIM_OPACITY;
      });
      if (reducedMotion) draw();
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      document.body.style.cursor = "";
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
    },
  };
}
