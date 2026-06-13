"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface MousePos { x: number; y: number; }

/* ── Central Icosahedron orb ── */
function Orb() {
  const icoRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.12;
      icoRef.current.rotation.y = t * 0.18;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.06;
      coreRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      haloRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group>
      {/* Wireframe icosahedron lattice */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Solid glowing core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={2.5}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Purple secondary lattice */}
      <mesh ref={haloRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color="#6E44FF" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Outer glow shell */}
      <mesh>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ── Torus energy rings ── */
function Ring({
  radius, tube, color, rotX, rotZ, speed,
}: {
  radius: number; tube: number; color: string;
  rotX: number; rotZ: number; speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += speed;
  });
  return (
    <mesh ref={ref} rotation={[rotX, 0, rotZ]}>
      <torusGeometry args={[radius, tube, 12, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

/* ── 800-particle spherical field ── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#00D4FF"),
      new THREE.Color("#6E44FF"),
      new THREE.Color("#00FFB2"),
      new THREE.Color("#ffffff"),
    ];
    const weights = [0.45, 0.30, 0.15, 0.10];

    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // weighted color selection
      const rand = Math.random();
      let cumulative = 0;
      let c = palette[0];
      for (let j = 0; j < weights.length; j++) {
        cumulative += weights[j];
        if (rand < cumulative) { c = palette[j]; break; }
      }
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(colors,    3));
    return g;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0007;
      ref.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Mouse-parallax scene group ── */
function SceneGroup({ mousePos, children }: { mousePos: MousePos; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x += (mousePos.x * 0.6 - ref.current.position.x) * 0.035;
    ref.current.position.y += (mousePos.y * 0.35 - ref.current.position.y) * 0.035;
  });

  return <group ref={ref}>{children}</group>;
}

/* ── Slow camera drift ── */
function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.06;
    state.camera.position.x = Math.sin(t) * 0.8;
    state.camera.position.y = Math.sin(t * 0.7) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Main export ── */
export default function HeroScene({ mousePos }: { mousePos: MousePos }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 6, 6]}   intensity={5} color="#00D4FF" />
      <pointLight position={[-6, -4, -4]} intensity={3} color="#6E44FF" />
      <pointLight position={[0, -6, 2]}   intensity={2} color="#00FFB2" />

      <CameraDrift />

      <SceneGroup mousePos={mousePos}>
        <Orb />
        <Ring radius={2.3}  tube={0.012} color="#00D4FF" rotX={Math.PI / 4}  rotZ={0}           speed={0.008} />
        <Ring radius={2.9}  tube={0.010} color="#6E44FF" rotX={Math.PI / 3}  rotZ={Math.PI / 5} speed={-0.006} />
        <Ring radius={3.6}  tube={0.008} color="#00FFB2" rotX={-Math.PI / 5} rotZ={Math.PI / 3} speed={0.005} />
        <ParticleField />
      </SceneGroup>

      <Stars radius={70} depth={50} count={2000} factor={3} saturation={0} fade speed={0.6} />
    </Canvas>
  );
}
