"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) { ref.current.rotation.x += delta * 0.12; ref.current.rotation.y += delta * 0.08; }
    if (ref2.current) { ref2.current.rotation.x -= delta * 0.09; ref2.current.rotation.z += delta * 0.11; }
  });
  return (
    <group>
      <mesh ref={ref}>
        <torusGeometry args={[3, 0.015, 8, 120]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ref2}>
        <torusGeometry args={[4, 0.012, 8, 100]} />
        <meshBasicMaterial color="#6E44FF" transparent opacity={0.2} />
      </mesh>
      <mesh>
        <torusGeometry args={[5, 0.01, 8, 80]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function Particles() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.04} transparent opacity={0.2} />
    </points>
  );
}

export default function CTATorus() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.1} />
      <Particles />
      <RotatingTorus />
    </Canvas>
  );
}
