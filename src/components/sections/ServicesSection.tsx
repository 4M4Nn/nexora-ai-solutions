"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { services } from "@/lib/data";

/* ── Service mini scenes ─────────────────────────────── */

function ServiceGeometry01() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += d * 0.4; ref.current.rotation.x += d * 0.15; } });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2.2, 1.4, 0.08]} />
      <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function ServiceGeometry02() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.3; });
  return (
    <group>
      <mesh ref={ref}>
        <torusGeometry args={[1.4, 0.02, 8, 80]} />
        <meshBasicMaterial color="#00FFB2" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial color="#00FFB2" emissive="#00FFB2" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function ServiceGeometry03() {
  const bars = useMemo(() => [0.3, 0.6, 0.4, 0.9, 0.7, 1.0, 0.5], []);
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const s = bars[i] * (0.9 + Math.sin(state.clock.elapsedTime * 1.2 + i * 0.5) * 0.1);
      mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, s, 0.06);
      mesh.position.y = (mesh.scale.y * bars[i] * 1.5) / 2 - 0.8;
    });
  });
  return (
    <group ref={groupRef}>
      {bars.map((h, i) => (
        <mesh key={i} position={[(i - 3) * 0.48, -0.8, 0]} scale={[1, 0.01, 1]}>
          <boxGeometry args={[0.35, h * 1.5, 0.35]} />
          <meshStandardMaterial color="#6E44FF" emissive="#6E44FF" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  );
}

function ServiceGeometry04() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.x += d * 0.25; ref.current.rotation.y += d * 0.35; } });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.7} />
    </mesh>
  );
}

function ServiceGeometry05() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.25; });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[1.4, 2.2, 6, 1, true]} />
        <meshBasicMaterial color="#FF6B35" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

function ServiceGeometry06() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.x += d * 0.3; ref.current.rotation.z += d * 0.2; } });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.3, 0]} />
      <meshBasicMaterial color="#FF44AA" wireframe transparent opacity={0.7} />
    </mesh>
  );
}

function ServiceGeometry07() {
  const positions: [number, number, number][] = [
    [0, 0, 0], [1.4, 0.5, 0], [-1.4, 0.5, 0], [0, 1.4, 0], [0, -1.0, 0],
  ];
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.scale.setScalar(0.85 + Math.sin(state.clock.elapsedTime * 1.5 + i * 1.2) * 0.12);
    });
  });
  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.4 : 0.22, 16, 16]} />
          <meshStandardMaterial color="#4488FF" emissive="#4488FF" emissiveIntensity={i === 0 ? 3 : 2} />
        </mesh>
      ))}
    </group>
  );
}

const GEOMETRIES = [
  ServiceGeometry01, ServiceGeometry02, ServiceGeometry03, ServiceGeometry04,
  ServiceGeometry05, ServiceGeometry06, ServiceGeometry07,
];

function ServiceCanvas({ activeIndex }: { activeIndex: number }) {
  const color = services[activeIndex]?.color ?? "#00D4FF";
  const Geo = GEOMETRIES[activeIndex] ?? ServiceGeometry01;
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3]} color={color} intensity={4} distance={12} />
      <Geo />
    </Canvas>
  );
}

const DynServiceCanvas = dynamic(async () => {
  const Component = ({ activeIndex }: { activeIndex: number }) => <ServiceCanvas activeIndex={activeIndex} />;
  Component.displayName = "DynServiceCanvas";
  return Component;
}, { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 rounded-full border border-white/20 border-t-white/60 spin-ring" /></div> });

/* ── Main section ─────────────────────────────────────── */

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.4, rootMargin: "-28% 0px -28% 0px" }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="services" className="bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center py-24 lg:py-0 lg:pr-16 border-b lg:border-b-0 lg:border-r border-white/8">
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-6">
              Our Services
            </p>
            <h2
              className="font-bold text-white leading-none mb-10"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(36px, 5vw, 68px)" }}
            >
              What NOVA
              <br />
              can do for you.
            </h2>

            {/* 3D preview */}
            <div className="h-[260px] w-full hidden lg:block">
              <DynServiceCanvas activeIndex={active} />
            </div>

            {/* Progress dots */}
            <div className="hidden lg:flex items-center gap-2 mt-6">
              {services.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300"
                  style={{
                    width: active === i ? 24 : 8,
                    height: 2,
                    backgroundColor: active === i ? "#00D4FF" : "rgba(255,255,255,0.2)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right scrollable */}
          <div>
            {services.map((svc, i) => (
              <div
                key={svc.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="px-0 lg:px-12 py-14 border-b border-white/8 transition-all duration-400"
                style={{ borderLeftColor: active === i ? svc.color : "transparent", borderLeftWidth: "2px" }}
              >
                <span
                  className="text-xs tracking-widest block mb-3"
                  style={{ color: active === i ? svc.color : "rgba(255,255,255,0.2)" }}
                >
                  {svc.id}
                </span>

                <h3
                  className="font-bold leading-none mb-3 transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: "clamp(22px, 3vw, 40px)",
                    color: active === i ? "#ffffff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {svc.title}
                </h3>

                <p
                  className="text-sm font-semibold mb-4 transition-colors duration-300"
                  style={{ color: active === i ? svc.color : "rgba(255,255,255,0.15)", fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {svc.tagline}
                </p>

                <p
                  className="text-sm leading-relaxed mb-6 transition-colors duration-300"
                  style={{ color: active === i ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)" }}
                >
                  {svc.description}
                </p>

                {active === i && (
                  <ul className="space-y-2">
                    {svc.outcomes.map((o, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <span style={{ color: svc.color, marginTop: 2 }}>→</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
