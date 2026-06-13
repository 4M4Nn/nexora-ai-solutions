"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface MousePos {
  x: number;
  y: number;
}

function AIOrb({ mousePos }: { mousePos: MousePos }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    targetRot.current.y += (mousePos.x * 0.5 - targetRot.current.y) * 0.04;
    targetRot.current.x += (-mousePos.y * 0.3 - targetRot.current.x) * 0.04;
    groupRef.current.rotation.y = targetRot.current.y;
    groupRef.current.rotation.x = targetRot.current.x;
    if (wireRef.current) {
      wireRef.current.rotation.y += 0.005;
      wireRef.current.rotation.z += 0.003;
    }
    void t;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.7}
            distort={0.25}
            speed={2}
            roughness={0.05}
            metalness={0.95}
          />
        </mesh>
      </Float>

      <mesh ref={wireRef}>
        <sphereGeometry args={[1.3, 16, 16]} />
        <meshBasicMaterial
          color="#6E44FF"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#6E44FF"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function EnergyRing({
  radius,
  color,
  speed,
  rotX,
  rotZ,
}: {
  radius: number;
  color: string;
  speed: number;
  rotX: number;
  rotZ: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += speed * 0.007;
  });
  return (
    <mesh ref={ref} rotation={[rotX, 0, rotZ]}>
      <torusGeometry args={[radius, 0.014, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.65} />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 650;

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#00D4FF"),
      new THREE.Color("#6E44FF"),
      new THREE.Color("#00FFB2"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 3.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0008;
      ref.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.07;
    state.camera.position.x = Math.sin(t) * 6.5;
    state.camera.position.z = Math.cos(t) * 6.5;
    state.camera.position.y = Math.sin(t * 0.4) * 0.8;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function AIBrainScene({ mousePos }: { mousePos: MousePos }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={4} color="#00D4FF" />
      <pointLight position={[-5, -3, -3]} intensity={2.5} color="#6E44FF" />
      <pointLight position={[0, -5, 3]} intensity={1.5} color="#00FFB2" />

      <CameraRig />
      <AIOrb mousePos={mousePos} />

      <EnergyRing radius={2.0} color="#00D4FF" speed={1} rotX={Math.PI / 4} rotZ={0} />
      <EnergyRing radius={2.7} color="#6E44FF" speed={-0.65} rotX={Math.PI / 3} rotZ={Math.PI / 6} />
      <EnergyRing radius={3.4} color="#00FFB2" speed={0.45} rotX={-Math.PI / 5} rotZ={Math.PI / 4} />

      <ParticleField />
      <Stars radius={60} depth={50} count={2500} factor={3} saturation={0} fade speed={0.8} />
    </Canvas>
  );
}
