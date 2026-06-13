"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COLORS = ["#00D4FF", "#00FFB2", "#6E44FF", "#FF6B35", "#FF44AA", "#4488FF"];
const NODE_LABELS = ["Website", "Leads", "SEO", "Sales", "Recruit", "Support"];

const NODE_POSITIONS: [number, number, number][] = [
  [3.2, 0.6, 0],
  [1.0, 2.8, 2.0],
  [-2.4, 0.8, 2.6],
  [-3.2, -0.4, 0],
  [-1.0, -2.8, -2.0],
  [2.4, 0.4, -2.6],
];

function Stars() {
  const count = 600;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    return pos;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.06} transparent opacity={0.5} />
    </points>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
    if (glowRef.current) {
      glowRef.current.rotation.x += delta * 0.15;
      glowRef.current.rotation.y -= delta * 0.2;
    }
  });
  return (
    <group>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* inner glow shell */}
      <mesh>
        <sphereGeometry args={[0.95, 16, 16]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function OrbitalNode({
  position,
  color,
  visible,
  index,
}: {
  position: [number, number, number];
  color: string;
  visible: boolean;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(Math.random() * Math.PI * 2);

  const lineObj = useMemo(() => {
    const arr = new Float32Array(6);
    arr[0] = 0; arr[1] = 0; arr[2] = 0;
    arr[3] = position[0]; arr[4] = position[1]; arr[5] = position[2];
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 });
    return new THREE.Line(geo, mat);
  }, [position, color]);

  useFrame((_, delta) => {
    if (!visible) return;
    t.current += delta * 0.4;
    if (ref.current) {
      const angle = t.current + index * ((Math.PI * 2) / 6);
      const radius = 3.4;
      ref.current.position.x = Math.cos(angle) * radius * 0.9 + position[0] * 0.1;
      ref.current.position.y = position[1] + Math.sin(t.current * 0.5) * 0.2;
      ref.current.position.z = Math.sin(angle) * radius * 0.7 + position[2] * 0.1;

      const pos = lineObj.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(1, ref.current.position.x, ref.current.position.y, ref.current.position.z);
      pos.needsUpdate = true;

      const scale = visible ? 1 : 0;
      ref.current.scale.setScalar(
        THREE.MathUtils.lerp(ref.current.scale.x, scale, 0.1)
      );
    }
  });

  return (
    <group visible={visible}>
      <mesh ref={ref} scale={0}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
      </mesh>
      <primitive object={lineObj} />
    </group>
  );
}

function SceneGroup({
  visibleNodes,
  cameraTargetZRef,
  exploding,
}: {
  visibleNodes: number;
  cameraTargetZRef: React.MutableRefObject<number>;
  exploding: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    camera.position.z += (cameraTargetZRef.current - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
    if (exploding && groupRef.current) {
      groupRef.current.scale.x += delta * 0.5;
      groupRef.current.scale.y += delta * 0.5;
      groupRef.current.scale.z += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars />
      <CoreSphere />
      {NODE_POSITIONS.map((pos, i) => (
        <OrbitalNode
          key={i}
          index={i}
          position={pos}
          color={NODE_COLORS[i]}
          visible={i < visibleNodes}
        />
      ))}
    </group>
  );
}

interface Props {
  visibleNodes: number;
  cameraTargetZRef: React.MutableRefObject<number>;
  exploding: boolean;
}

export default function CinematicScene({ visibleNodes, cameraTargetZRef, exploding }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} color="#00D4FF" intensity={4} distance={10} />
      <SceneGroup
        visibleNodes={visibleNodes}
        cameraTargetZRef={cameraTargetZRef}
        exploding={exploding}
      />
    </Canvas>
  );
}
