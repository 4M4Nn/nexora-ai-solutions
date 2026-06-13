"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { services } from "@/lib/data";

/* ─── Scene 01 — AI Website Development (Cyan) ─────── */

const S01_COUNT = 55;

function Scene01() {
  const screenRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(S01_COUNT * 3);
    for (let i = 0; i < S01_COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 4.5;
      p[i * 3 + 1] = Math.random() * 7;
      p[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return p;
  }, []);
  const speeds = useMemo(() => Array.from({ length: S01_COUNT }, () => Math.random() * 2 + 1), []);

  useFrame((_, d) => {
    if (screenRef.current) screenRef.current.rotation.y += d * 0.12;
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < S01_COUNT; i++) {
        positions[i * 3 + 1] -= speeds[i] * d;
        if (positions[i * 3 + 1] < -4) positions[i * 3 + 1] = 5;
        attr.setY(i, positions[i * 3 + 1]);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={screenRef} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[3.2, 2.0, 0.06]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0.06, 0, 0]} position={[0, 0, 0.031]}>
        <planeGeometry args={[3.0, 1.85]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.05} />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00D4FF" size={0.05} transparent opacity={0.75} sizeAttenuation />
      </points>
      <mesh position={[1.4, 1.3, 0.1]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#00FFB2" emissive="#00FFB2" emissiveIntensity={6} />
      </mesh>
    </group>
  );
}

/* ─── Scene 02 — AI Lead Nurturing (Green) ──────────── */

function Scene02() {
  const phoneRef = useRef<THREE.Mesh>(null);
  const bubbleGroup = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;
    if (phoneRef.current) phoneRef.current.rotation.y = Math.sin(t.current * 0.35) * 0.12;
    if (bubbleGroup.current) {
      bubbleGroup.current.children.forEach((child, i) => {
        child.position.y = [-1.4, -0.3, 0.8][i] + Math.sin(t.current * 0.9 + i * 1.1) * 0.12;
        child.scale.setScalar(0.85 + Math.sin(t.current * 1.4 + i * 0.9) * 0.12);
      });
    }
  });

  return (
    <group>
      <mesh ref={phoneRef}>
        <boxGeometry args={[0.95, 1.9, 0.1]} />
        <meshBasicMaterial color="#00FFB2" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[0.75, 1.65]} />
        <meshBasicMaterial color="#00FFB2" transparent opacity={0.04} />
      </mesh>
      <group ref={bubbleGroup} position={[1.3, 0, 0]}>
        {([-1.4, -0.3, 0.8] as number[]).map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <sphereGeometry args={[0.22 - i * 0.02, 14, 14]} />
            <meshStandardMaterial color="#00FFB2" emissive="#00FFB2" emissiveIntensity={2 + i * 0.5} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
      <mesh position={[1.3, 1.5, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#00FFB2" emissive="#00FFB2" emissiveIntensity={6} />
      </mesh>
    </group>
  );
}

/* ─── Scene 03 — SEO Automation (Purple) ─────────────── */

const S03_HEIGHTS = [0.55, 1.3, 0.9, 1.75, 1.1, 1.55, 0.75];

function Scene03() {
  const barsGroup = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;
    if (torusRef.current) torusRef.current.rotation.z += d * 0.3;
    if (barsGroup.current) {
      barsGroup.current.children.forEach((child, i) => {
        if (i >= S03_HEIGHTS.length) return;
        const target = S03_HEIGHTS[i] * (0.88 + Math.sin(t.current * 1.0 + i * 0.55) * 0.12);
        child.scale.y = THREE.MathUtils.lerp(child.scale.y, target, 0.05);
        child.position.y = -1.6 + (child.scale.y * S03_HEIGHTS[i] * 2) / 2;
      });
    }
  });

  return (
    <group>
      <group ref={barsGroup}>
        {S03_HEIGHTS.map((h, i) => (
          <mesh key={i} position={[(i - 3) * 0.52, -1.6, 0]} scale={[1, 0.01, 1]}>
            <boxGeometry args={[0.38, h * 2, 0.32]} />
            <meshStandardMaterial color="#6E44FF" emissive="#6E44FF" emissiveIntensity={1.8} />
          </mesh>
        ))}
      </group>
      <mesh ref={torusRef} position={[0, 2.1, 0]}>
        <torusGeometry args={[0.55, 0.055, 8, 40]} />
        <meshStandardMaterial color="#6E44FF" emissive="#6E44FF" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.7, 2.1, 0]}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshStandardMaterial color="#6E44FF" emissive="#6E44FF" emissiveIntensity={4} />
      </mesh>
      <mesh position={[0, 3.0, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={5} />
      </mesh>
    </group>
  );
}

/* ─── Scene 04 — Custom AI Agents (Cyan+Purple) ─────── */

const S04_ORBITS = [
  { radius: 2.0, speed: 0.5,  y: 0.3,  color: "#00D4FF", offset: 0 },
  { radius: 2.5, speed: -0.4, y: -0.2, color: "#6E44FF", offset: 1.05 },
  { radius: 1.8, speed: 0.6,  y: 0.15, color: "#00FFB2", offset: 2.09 },
  { radius: 2.3, speed: -0.35,y: -0.3, color: "#00D4FF", offset: 3.14 },
  { radius: 2.0, speed: 0.45, y: 0.4,  color: "#6E44FF", offset: 4.18 },
  { radius: 2.2, speed: -0.55,y: -0.1, color: "#00FFB2", offset: 5.24 },
];

function Scene04() {
  const coreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const orbGroup = useRef<THREE.Group>(null);
  const angles = useRef(S04_ORBITS.map((o) => o.offset));
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;
    if (coreRef.current) coreRef.current.rotation.y += d * 0.45;
    if (cageRef.current) { cageRef.current.rotation.x += d * 0.12; cageRef.current.rotation.y -= d * 0.2; }
    if (orbGroup.current) {
      orbGroup.current.children.forEach((child, i) => {
        if (i >= S04_ORBITS.length) return;
        angles.current[i] += S04_ORBITS[i].speed * d;
        child.position.x = Math.cos(angles.current[i]) * S04_ORBITS[i].radius;
        child.position.z = Math.sin(angles.current[i]) * S04_ORBITS[i].radius * 0.5;
        child.position.y = S04_ORBITS[i].y + Math.sin(t.current + i * 0.8) * 0.1;
      });
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={3} />
      </mesh>
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[0.82, 1]} />
        <meshBasicMaterial color="#6E44FF" wireframe transparent opacity={0.22} />
      </mesh>
      <group ref={orbGroup}>
        {S04_ORBITS.map((o, i) => (
          <mesh key={i} position={[o.radius, o.y, 0]}>
            <sphereGeometry args={[0.17, 12, 12]} />
            <meshStandardMaterial color={o.color} emissive={o.color} emissiveIntensity={2.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── Scene 05 — AI Sales Agent (Orange) ─────────────── */

const S05_COUNT = 45;

function Scene05() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(S05_COUNT * 3);
    for (let i = 0; i < S05_COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 1.6;
      p[i * 3 + 1] = Math.random() * 3 + 1;
      p[i * 3 + 2] = 0;
    }
    return p;
  }, []);
  const speeds = useMemo(() => Array.from({ length: S05_COUNT }, () => Math.random() * 1.8 + 1), []);
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < S05_COUNT; i++) {
        positions[i * 3 + 1] -= speeds[i] * d;
        positions[i * 3] *= 0.985;
        if (positions[i * 3 + 1] < -2.5) {
          positions[i * 3] = (Math.random() - 0.5) * 1.6;
          positions[i * 3 + 1] = 3;
        }
        attr.setXYZ(i, positions[i * 3], positions[i * 3 + 1], 0);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.04, 8, 40]} />
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.85, 2.8, 6, 1, true]} />
        <meshBasicMaterial color="#FF6B35" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#00FFB2" emissive="#00FFB2" emissiveIntensity={5} />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FF6B35" size={0.07} transparent opacity={0.85} sizeAttenuation />
      </points>
    </group>
  );
}

/* ─── Scene 06 — AI Recruitment Agent (Pink) ─────────── */

const S06_CARD_POSITIONS: [number, number, number][] = [[-1.4, 0.6, -0.3], [0, 0.2, 0.3], [1.4, 0.6, -0.2]];

function Scene06() {
  const cardsGroup = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;
    if (scanRef.current) scanRef.current.position.y = Math.sin(t.current * 0.75) * 1.8;
    if (ringRef.current) {
      ringRef.current.rotation.z += d * 0.6;
      const s = 0.9 + Math.sin(t.current * 2) * 0.08;
      ringRef.current.scale.setScalar(s);
    }
    if (cardsGroup.current) {
      cardsGroup.current.children.forEach((child, i) => {
        child.position.y = S06_CARD_POSITIONS[i][1] + Math.sin(t.current * 0.55 + i * 1.2) * 0.1;
        child.rotation.y = Math.sin(t.current * 0.28 + i * 0.6) * 0.08;
      });
    }
  });

  return (
    <group>
      <group ref={cardsGroup}>
        {S06_CARD_POSITIONS.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.88, 1.15, 0.045]} />
            <meshStandardMaterial
              color="#FF44AA"
              emissive="#FF44AA"
              emissiveIntensity={i === 1 ? 2.2 : 0.5}
              transparent
              opacity={i === 1 ? 0.9 : 0.35}
            />
          </mesh>
        ))}
      </group>
      <mesh ref={scanRef} position={[0, 0, 0.3]}>
        <planeGeometry args={[4.5, 0.035]} />
        <meshBasicMaterial color="#FF44AA" transparent opacity={0.65} />
      </mesh>
      <mesh ref={ringRef} position={[0, -2.0, 0]}>
        <ringGeometry args={[0.22, 0.32, 20]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

/* ─── Scene 07 — Customer Support AI (Blue) ──────────── */

const S07_POSITIONS: [number, number, number][] = [
  [2.0, 1.0, 0],
  [-1.8, 0.7, 0.4],
  [1.3, -1.5, 0.2],
  [-1.4, -0.9, -0.3],
  [0.4, 1.7, -0.4],
];

function Scene07() {
  const orbRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d * 0.38;
    const idx = Math.floor(t.current) % 5;
    const nxt = (idx + 1) % 5;
    const frac = t.current - Math.floor(t.current);
    const e = frac * frac * (3 - 2 * frac);
    if (orbRef.current) {
      orbRef.current.position.x = S07_POSITIONS[idx][0] + (S07_POSITIONS[nxt][0] - S07_POSITIONS[idx][0]) * e;
      orbRef.current.position.y = S07_POSITIONS[idx][1] + (S07_POSITIONS[nxt][1] - S07_POSITIONS[idx][1]) * e + Math.sin(t.current * 3) * 0.04;
      orbRef.current.position.z = S07_POSITIONS[idx][2] + (S07_POSITIONS[nxt][2] - S07_POSITIONS[idx][2]) * e;
    }
  });

  return (
    <group>
      {S07_POSITIONS.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.68, 0.44, 0.06]} />
          <meshStandardMaterial color="#4488FF" emissive="#4488FF" emissiveIntensity={0.8} transparent opacity={0.65} />
        </mesh>
      ))}
      <mesh ref={orbRef} position={S07_POSITIONS[0]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color="#4488FF" emissive="#4488FF" emissiveIntensity={4.5} />
      </mesh>
    </group>
  );
}

/* ─── Service Canvas ─────────────────────────────────── */

function ServiceCanvas({ activeIndex }: { activeIndex: number }) {
  const color = services[activeIndex]?.color ?? "#00D4FF";
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 48 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 4]} color={color} intensity={8} distance={14} />
      <pointLight position={[-3, 3, 2]} color="#6E44FF" intensity={2} distance={12} />
      {activeIndex === 0 && <Scene01 />}
      {activeIndex === 1 && <Scene02 />}
      {activeIndex === 2 && <Scene03 />}
      {activeIndex === 3 && <Scene04 />}
      {activeIndex === 4 && <Scene05 />}
      {activeIndex === 5 && <Scene06 />}
      {activeIndex === 6 && <Scene07 />}
    </Canvas>
  );
}

const DynServiceCanvas = dynamic(
  async () => {
    const C = ({ activeIndex }: { activeIndex: number }) => <ServiceCanvas activeIndex={activeIndex} />;
    C.displayName = "DynServiceCanvas";
    return C;
  },
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border border-[#00D4FF]/30 border-t-[#00D4FF] spin-ring" />
      </div>
    ),
  }
);

/* ─── Main Section ───────────────────────────────────── */

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState(false);
  const [titleDisplay, setTitleDisplay] = useState(services[0].title);
  const prevIdx = useRef(0);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const triggerSwitch = useCallback((idx: number) => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
    if (titleTimer.current) clearInterval(titleTimer.current);

    setFlash(true);
    setActive(idx);

    const title = services[idx].title;
    setTitleDisplay("");
    let i = 0;
    titleTimer.current = setInterval(() => {
      i++;
      setTitleDisplay(title.slice(0, i));
      if (i >= title.length) {
        if (titleTimer.current) clearInterval(titleTimer.current);
      }
    }, 32);

    flashTimer.current = setTimeout(() => setFlash(false), 220);
  }, []);

  useEffect(() => {
    setTitleDisplay(services[0].title);
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
      if (titleTimer.current) clearInterval(titleTimer.current);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * 7), 6);
    if (idx !== prevIdx.current) {
      prevIdx.current = idx;
      triggerSwitch(idx);
    }
  });

  const svc = services[active];
  const progress = (active / 6) * 100;

  return (
    <section id="services">
      <div ref={containerRef} style={{ height: "700vh" }} className="relative">
        <div
          className="sticky top-0 h-screen overflow-hidden flex"
          style={{ background: "linear-gradient(135deg, #0A0F1E 0%, #0F1628 100%)" }}
        >
          {/* Flash overlay */}
          <AnimatePresence>
            {flash && (
              <motion.div
                className="absolute inset-0 z-50 pointer-events-none bg-white"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Left panel */}
          <div className="w-full lg:w-[44%] flex flex-col justify-center px-8 md:px-14 lg:px-16 relative z-10 border-r border-white/8">
            {/* Section label */}
            <p className="section-label mb-5">/ Services</p>

            {/* Service number (huge ghost) */}
            <div className="relative mb-2">
              <span
                className="text-[clamp(80px,14vw,160px)] font-bold leading-none select-none"
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  color: svc.color,
                  opacity: 0.08,
                  lineHeight: 0.9,
                }}
              >
                {svc.id}
              </span>
            </div>

            {/* Title (letter-by-letter reveal) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2
                  className="font-bold leading-none mb-3"
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontSize: "clamp(28px, 4vw, 56px)",
                    color: "#ffffff",
                    lineHeight: 1.05,
                    minHeight: "1.1em",
                  }}
                >
                  {titleDisplay}
                  <span className="opacity-40 animate-pulse">|</span>
                </h2>

                <p
                  className="text-sm font-semibold mb-5 tracking-wide"
                  style={{ color: svc.color, fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {svc.tagline}
                </p>

                <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed mb-7 max-w-sm">
                  {svc.description}
                </p>

                <ul className="space-y-2.5">
                  {svc.outcomes.map((o, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-2.5 text-sm text-[#CBD5E1]"
                    >
                      <span className="mt-0.5 shrink-0" style={{ color: svc.color }}>→</span>
                      {o}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Service dots */}
            <div className="flex items-center gap-2 mt-10">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="transition-all duration-400"
                  style={{
                    height: 2,
                    width: i === active ? 28 : 8,
                    borderRadius: 1,
                    backgroundColor: i === active ? svc.color : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right panel — 3D canvas */}
          <div className="hidden lg:flex flex-1 relative">
            <DynServiceCanvas activeIndex={active} />

            {/* Subtle radial glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${svc.color}08 0%, transparent 70%)`,
                transition: "background 0.4s ease",
              }}
            />
          </div>

          {/* Vertical progress bar — right edge */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
            {services.map((s, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  width: 2,
                  height: i === active ? 28 : 10,
                  borderRadius: 2,
                  backgroundColor: i === active ? svc.color : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
            <div className="mt-1 text-[9px] tracking-widest uppercase" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(255,255,255,0.2)", writingMode: "vertical-rl" }}>
              {String(active + 1).padStart(2, "0")}/{services.length}
            </div>
          </div>

          {/* Bottom progress line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/6">
            <motion.div
              className="h-full"
              style={{ width: `${progress}%`, backgroundColor: svc.color, transition: "width 0.4s ease, background-color 0.3s ease" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
