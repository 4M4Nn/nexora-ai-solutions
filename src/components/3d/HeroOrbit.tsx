"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const NODE_CONFIGS = [
  { label: "Website", color: "#00D4FF", radius: 2.4, speed: 0.38, y: 0.3, offset: 0 },
  { label: "Leads", color: "#00FFB2", radius: 3.0, speed: 0.28, y: -0.2, offset: 1.05 },
  { label: "SEO", color: "#6E44FF", radius: 2.7, speed: 0.22, y: 0.5, offset: 2.09 },
  { label: "Sales", color: "#FF6B35", radius: 3.4, speed: 0.32, y: -0.4, offset: 3.14 },
  { label: "Recruit", color: "#FF44AA", radius: 2.5, speed: 0.26, y: 0.1, offset: 4.18 },
  { label: "Support", color: "#4488FF", radius: 3.1, speed: 0.35, y: -0.3, offset: 5.24 },
];

function Stars() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return pos;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.045} transparent opacity={0.35} />
    </points>
  );
}

function CoreOrb() {
  const coreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (coreRef.current) coreRef.current.rotation.y += d * 0.5;
    if (cageRef.current) { cageRef.current.rotation.y -= d * 0.2; cageRef.current.rotation.x += d * 0.15; }
  });
  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.85, 16, 16]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.07} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial color="#6E44FF" transparent opacity={0.04} />
      </mesh>
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function OrbitalNode({ config, index }: { config: typeof NODE_CONFIGS[0]; index: number }) {
  const nodeRef = useRef<THREE.Mesh>(null);
  const angle = useRef(config.offset);

  const lineObj = useMemo(() => {
    const pts = new Float32Array(6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    const mat = new THREE.LineBasicMaterial({ color: config.color, transparent: true, opacity: 0.15 });
    return new THREE.Line(geo, mat);
  }, [config.color]);

  useFrame((_, d) => {
    angle.current += d * config.speed;
    const x = Math.cos(angle.current) * config.radius;
    const z = Math.sin(angle.current) * config.radius;
    const y = config.y + Math.sin(angle.current * 0.5 + index) * 0.15;

    if (nodeRef.current) { nodeRef.current.position.set(x, y, z); }
    const pos = lineObj.geometry.attributes.position as THREE.BufferAttribute;
    pos.setXYZ(1, x, y, z);
    pos.needsUpdate = true;
  });

  return (
    <group>
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={config.color} emissive={config.color} emissiveIntensity={3} />
        <Html center distanceFactor={8}>
          <div style={{ color: config.color, fontSize: "10px", letterSpacing: "0.12em", whiteSpace: "nowrap", fontFamily: "var(--font-inter), sans-serif", opacity: 0.8 }}>
            {config.label}
          </div>
        </Html>
      </mesh>
      <primitive object={lineObj} />
    </group>
  );
}

function MouseTracker() {
  const { scene } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    scene.rotation.y += (target.current.x - scene.rotation.y) * 0.04;
    scene.rotation.x += (-target.current.y - scene.rotation.x) * 0.04;
  });
  return null;
}

export default function HeroOrbit() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} color="#00D4FF" intensity={5} distance={12} />
      <pointLight position={[0, 5, 5]} color="#6E44FF" intensity={2} distance={15} />
      <MouseTracker />
      <Stars />
      <CoreOrb />
      {NODE_CONFIGS.map((cfg, i) => (
        <OrbitalNode key={i} config={cfg} index={i} />
      ))}
    </Canvas>
  );
}
