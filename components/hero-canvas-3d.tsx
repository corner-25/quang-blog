"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold everything and rotate with mouse
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // 1. Create Neural Nodes (Points)
    const particleCount = 75;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const nodeVelocities: THREE.Vector3[] = [];

    const cyanColor = new THREE.Color("#00F0FF");
    const emeraldColor = new THREE.Color("#10B981");
    const whiteColor = new THREE.Color("#FFFFFF");

    for (let i = 0; i < particleCount; i++) {
      // Distribute points in a 3D sphere / ellipsoid
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 6.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation: mix of cyan and emerald
      const mixRatio = Math.random();
      const nodeColor = mixRatio > 0.6 ? emeraldColor : mixRatio > 0.2 ? cyanColor : whiteColor;
      colors[i * 3] = nodeColor.r;
      colors[i * 3 + 1] = nodeColor.g;
      colors[i * 3 + 2] = nodeColor.b;

      // Small gentle drifting velocity
      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        )
      );
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    // Canvas circular point texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.3, "rgba(0,240,255,0.8)");
      gradient.addColorStop(0.7, "rgba(0,240,255,0.2)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    graphGroup.add(particleSystem);

    // 2. Dynamic Connection Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    // 3. Central Pulsing Torus / Core (Representing Clinical Intelligence)
    const ringGeom = new THREE.TorusGeometry(3.5, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      wireframe: false,
    });
    const ringMesh1 = new THREE.Mesh(ringGeom, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    graphGroup.add(ringMesh1);

    const ringGeom2 = new THREE.TorusGeometry(4.2, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    graphGroup.add(ringMesh2);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Rotate cluster
        graphGroup.rotation.y = elapsedTime * 0.08 + mouseX;
        graphGroup.rotation.x = mouseY * 0.5 + Math.sin(elapsedTime * 0.05) * 0.05;

        // Rings gentle counter-rotations
        ringMesh1.rotation.z += delta * 0.15;
        ringMesh2.rotation.x -= delta * 0.12;

        // Pulse core scale
        const pulse = 1 + Math.sin(elapsedTime * 1.8) * 0.04;
        ringMesh1.scale.set(pulse, pulse, pulse);
      }

      // Update particle positions slightly
      const posAttr = particlesGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const vel = nodeVelocities[i];
        posArray[i * 3] += vel.x;
        posArray[i * 3 + 1] += vel.y;
        posArray[i * 3 + 2] += vel.z;

        // Boundary rebound
        const distSq =
          posArray[i * 3] ** 2 +
          posArray[i * 3 + 1] ** 2 +
          posArray[i * 3 + 2] ** 2;
        if (distSq > 50) {
          vel.negate();
        }
      }
      posAttr.needsUpdate = true;

      // Dynamically rebuild line connections between close nodes
      const linePositions: number[] = [];
      const threshold = 3.2;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < threshold) {
            linePositions.push(
              posArray[i * 3],
              posArray[i * 3 + 1],
              posArray[i * 3 + 2],
              posArray[j * 3],
              posArray[j * 3 + 1],
              posArray[j * 3 + 2]
            );
          }
        }
      }

      // Re-assign line geometry
      if (scene.getObjectByName("dynamicLines")) {
        const oldLines = scene.getObjectByName("dynamicLines") as THREE.LineSegments;
        graphGroup.remove(oldLines);
        oldLines.geometry.dispose();
      }

      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      const lines = new THREE.LineSegments(lineGeom, lineMaterial);
      lines.name = "dynamicLines";
      graphGroup.add(lines);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Cleanup WebGL resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      particleTexture.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 h-full w-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
