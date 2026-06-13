"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type NodePos = [number, number, number];

const NODES: { id: number; pos: NodePos; color: string; label: string }[] = [
  { id: 0, pos: [-4, 1.5, 0.4], color: "#00D4FF", label: "Input" },
  { id: 1, pos: [-4, 0, -0.3], color: "#00D4FF", label: "Data" },
  { id: 2, pos: [-4, -1.5, 0.2], color: "#00D4FF", label: "Signal" },
  { id: 3, pos: [-1.5, 2.2, 0.6], color: "#6E44FF", label: "NLP" },
  { id: 4, pos: [-1.5, 0.8, -0.6], color: "#6E44FF", label: "Vision" },
  { id: 5, pos: [-1.5, -0.8, 0.8], color: "#6E44FF", label: "Logic" },
  { id: 6, pos: [-1.5, -2.2, -0.4], color: "#6E44FF", label: "Memory" },
  { id: 7, pos: [1.5, 2.2, -0.5], color: "#00FFB2", label: "Sales AI" },
  { id: 8, pos: [1.5, 0.8, 0.5], color: "#00FFB2", label: "Support AI" },
  { id: 9, pos: [1.5, -0.8, -0.7], color: "#00FFB2", label: "SEO AI" },
  { id: 10, pos: [1.5, -2.2, 0.6], color: "#00FFB2", label: "Lead AI" },
  { id: 11, pos: [4, 1.2, 0.3], color: "#00D4FF", label: "Output" },
  { id: 12, pos: [4, 0, -0.4], color: "#00D4FF", label: "Action" },
  { id: 13, pos: [4, -1.2, 0.2], color: "#00D4FF", label: "Result" },
];

const CONNECTIONS: [number, number][] = [
  [0, 3], [0, 4], [0, 5],
  [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 4], [2, 5], [2, 6],
  [3, 7], [3, 8],
  [4, 7], [4, 8], [4, 9],
  [5, 8], [5, 9], [5, 10],
  [6, 9], [6, 10],
  [7, 11], [7, 12],
  [8, 11], [8, 12], [8, 13],
  [9, 12], [9, 13],
  [10, 12], [10, 13],
];

function Node({
  pos, color, delay,
}: {
  pos: NodePos; color: string; delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    const s = 1 + Math.sin(t * 1.8) * 0.18;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.8}
        roughness={0}
        metalness={0.4}
      />
    </mesh>
  );
}

function ConnectionLines({
  nodes,
  connections,
}: {
  nodes: NodePos[];
  connections: [number, number][];
}) {
  const geo = useMemo(() => {
    const pts: number[] = [];
    connections.forEach(([a, b]) => {
      pts.push(...nodes[a], ...nodes[b]);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, [nodes, connections]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#00D4FF" transparent opacity={0.18} />
    </lineSegments>
  );
}

function DataPulse({
  from,
  to,
  color,
  speed,
  offset,
}: {
  from: NodePos;
  to: NodePos;
  color: string;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const fromVec = useMemo(() => new THREE.Vector3(...from), [from]);
  const toVec = useMemo(() => new THREE.Vector3(...to), [to]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed + offset) % 1);
    ref.current.position.lerpVectors(fromVec, toVec, t);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const positions = NODES.map((n) => n.pos);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * 0.12;
    groupRef.current.rotation.y = Math.sin(t) * 0.25;
    groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <ConnectionLines nodes={positions} connections={CONNECTIONS} />
      {NODES.map((node, i) => (
        <Node key={node.id} pos={node.pos} color={node.color} delay={i * 0.4} />
      ))}
      {CONNECTIONS.map(([a, b], i) => (
        <DataPulse
          key={`pulse-${a}-${b}`}
          from={NODES[a].pos}
          to={NODES[b].pos}
          color={NODES[b].color}
          speed={0.4 + (i % 4) * 0.1}
          offset={i * 0.17}
        />
      ))}
    </group>
  );
}

export default function NeuralNetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 5]} intensity={3} color="#00D4FF" />
      <pointLight position={[0, -5, -5]} intensity={2} color="#6E44FF" />
      <Scene />
    </Canvas>
  );
}
