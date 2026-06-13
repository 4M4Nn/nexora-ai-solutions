"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type V3 = [number, number, number];

const NODES: { id: number; pos: V3; finalPos: V3; color: string }[] = [
  { id: 0,  pos: [-6, 2, 1],   finalPos: [-4, 1.8, 0.4],   color: "#00D4FF" },
  { id: 1,  pos: [6, -3, -1],  finalPos: [-4, 0, -0.3],    color: "#00D4FF" },
  { id: 2,  pos: [-5, -4, 2],  finalPos: [-4, -1.8, 0.2],  color: "#00D4FF" },
  { id: 3,  pos: [7, 3, -2],   finalPos: [-1.4, 2.4, 0.6], color: "#6E44FF" },
  { id: 4,  pos: [-7, 1, -1],  finalPos: [-1.4, 0.9, -0.6],color: "#6E44FF" },
  { id: 5,  pos: [5, -2, 3],   finalPos: [-1.4, -0.9, 0.8],color: "#6E44FF" },
  { id: 6,  pos: [-4, -5, -2], finalPos: [-1.4, -2.4, -0.4],color:"#6E44FF" },
  { id: 7,  pos: [6, 4, 1],    finalPos: [1.4, 2.4, -0.5], color: "#00FFB2" },
  { id: 8,  pos: [-6, 2, 3],   finalPos: [1.4, 0.8, 0.5],  color: "#00FFB2" },
  { id: 9,  pos: [4, -4, -3],  finalPos: [1.4, -0.8, -0.7],color: "#00FFB2" },
  { id: 10, pos: [-5, -3, 2],  finalPos: [1.4, -2.4, 0.6], color: "#00FFB2" },
  { id: 11, pos: [7, 1, -1],   finalPos: [4, 1.4, 0.3],    color: "#00D4FF" },
  { id: 12, pos: [-6, -1, -3], finalPos: [4, 0, -0.4],     color: "#00D4FF" },
  { id: 13, pos: [5, -5, 2],   finalPos: [4, -1.4, 0.2],   color: "#00D4FF" },
];

const EDGES: [number, number][] = [
  [0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[1,6],[2,4],[2,5],[2,6],
  [3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[5,10],[6,9],[6,10],
  [7,11],[7,12],[8,11],[8,12],[8,13],[9,12],[9,13],[10,12],[10,13],
];

function Node({ node, assembled }: { node: typeof NODES[0]; assembled: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const startVec = useMemo(() => new THREE.Vector3(...node.pos), [node.pos]);
  const endVec   = useMemo(() => new THREE.Vector3(...node.finalPos), [node.finalPos]);
  const tmpVec   = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!ref.current) return;
    tmpVec.copy(assembled ? endVec : startVec);
    ref.current.position.lerp(tmpVec, assembled ? 0.06 : 0.03);
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.6 + node.id * 0.8) * 0.18;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={node.pos as V3}>
      <sphereGeometry args={[0.13, 16, 16]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={1.8}
        roughness={0}
        metalness={0.3}
      />
    </mesh>
  );
}

function Connections({ assembled }: { assembled: boolean }) {
  const ref = useRef<THREE.LineSegments>(null);

  const { startPositions, endPositions } = useMemo(() => {
    const startPositions = new Float32Array(EDGES.length * 2 * 3);
    const endPositions   = new Float32Array(EDGES.length * 2 * 3);
    EDGES.forEach(([a, b], i) => {
      const sA = NODES[a].pos, sB = NODES[b].pos;
      const eA = NODES[a].finalPos, eB = NODES[b].finalPos;
      startPositions.set([...sA, ...sB], i * 6);
      endPositions.set([...eA, ...eB], i * 6);
    });
    return { startPositions, endPositions };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr  = attr.array as Float32Array;
    const target = assembled ? endPositions : startPositions;
    for (let i = 0; i < arr.length; i++) {
      arr[i] += (target[i] - arr[i]) * (assembled ? 0.06 : 0.03);
    }
    attr.needsUpdate = true;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const init = new Float32Array(startPositions);
    g.setAttribute("position", new THREE.BufferAttribute(init, 3));
    return g;
  }, [startPositions]);

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#00D4FF" transparent opacity={0.2} />
    </lineSegments>
  );
}

function DataPulse({ from, to, color, speed, offset }: {
  from: V3; to: V3; color: string; speed: number; offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const fv  = useMemo(() => new THREE.Vector3(...from), [from]);
  const tv  = useMemo(() => new THREE.Vector3(...to),   [to]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed + offset) % 1);
    ref.current.position.lerpVectors(fv, tv, t);
    ref.current.visible = t > 0.02 && t < 0.98;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function SceneGroup({ assembled }: { assembled: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = Math.sin(t) * 0.22;
    ref.current.rotation.x = Math.sin(t * 0.65) * 0.07;
  });

  return (
    <group ref={ref}>
      <Connections assembled={assembled} />
      {NODES.map((n) => (
        <Node key={n.id} node={n} assembled={assembled} />
      ))}
      {EDGES.map(([a, b], i) => (
        <DataPulse
          key={`p-${a}-${b}`}
          from={NODES[a].finalPos}
          to={NODES[b].finalPos}
          color={NODES[b].color}
          speed={0.38 + (i % 5) * 0.07}
          offset={i * 0.19}
        />
      ))}
    </group>
  );
}

export default function NeuralNetworkScene() {
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAssembled(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 54 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 6, 6]}   intensity={4} color="#00D4FF" />
      <pointLight position={[0, -6, -6]} intensity={3} color="#6E44FF" />
      <SceneGroup assembled={assembled} />
    </Canvas>
  );
}
