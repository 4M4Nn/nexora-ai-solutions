"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { networkNodes } from "@/lib/data";

function goldenPoint(i: number, total: number, radius: number): [number, number, number] {
  const y = 1 - (i / (total - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = Math.PI * (3 - Math.sqrt(5)) * i;
  return [r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius];
}

const POSITIONS = networkNodes.map((_, i) => goldenPoint(i, networkNodes.length, 3.5));

const CONNECTIONS: [number, number][] = [
  [0,1],[0,3],[0,6],[1,2],[1,4],[2,5],[2,7],[3,4],[3,8],
  [4,9],[5,6],[5,10],[6,11],[7,8],[7,9],[8,10],[9,11],[10,0],[11,1],[3,9],[6,8],[2,11],
];

const NODE_COLORS = [
  "#00D4FF","#00FFB2","#6E44FF","#FF6B35","#FF44AA","#4488FF",
  "#00D4FF","#00FFB2","#6E44FF","#FF6B35","#FF44AA","#4488FF",
];

function ConnectionLines() {
  const pts = useMemo(() => {
    const arr = new Float32Array(CONNECTIONS.length * 6);
    CONNECTIONS.forEach(([a, b], i) => {
      const pa = POSITIONS[a], pb = POSITIONS[b];
      arr[i * 6] = pa[0]; arr[i * 6 + 1] = pa[1]; arr[i * 6 + 2] = pa[2];
      arr[i * 6 + 3] = pb[0]; arr[i * 6 + 4] = pb[1]; arr[i * 6 + 5] = pb[2];
    });
    return arr;
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#00D4FF" transparent opacity={0.12} />
    </lineSegments>
  );
}

function DataPulse({ from, to, speed, color }: {
  from: [number, number, number];
  to: [number, number, number];
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(Math.random());
  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1;
    if (ref.current) {
      ref.current.position.lerpVectors(
        new THREE.Vector3(...from),
        new THREE.Vector3(...to),
        t.current
      );
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Node({ index, clicked, onClick }: {
  index: number;
  clicked: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = POSITIONS[index];
  const color = NODE_COLORS[index];

  useFrame((state) => {
    if (!ref.current) return;
    const float = Math.sin(state.clock.elapsedTime * 0.6 + index * 0.8) * 0.08;
    ref.current.position.y = pos[1] + float;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, clicked ? 1.5 : 1, 0.08));
  });

  return (
    <mesh
      ref={ref}
      position={pos}
      onPointerDown={(e) => { e.stopPropagation(); onClick(); }}
    >
      <sphereGeometry args={[0.22, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={clicked ? 5 : 2} />
      {clicked && (
        <Html center distanceFactor={6}>
          <div style={{
            background: "rgba(0,0,0,0.85)",
            border: `1px solid ${color}`,
            color: "#fff",
            fontSize: "11px",
            padding: "6px 10px",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            letterSpacing: "0.1em",
          }}>
            {networkNodes[index]}
          </div>
        </Html>
      )}
    </mesh>
  );
}

function NetworkGroup({ clickedNode, setClickedNode }: {
  clickedNode: number | null;
  setClickedNode: (n: number | null) => void;
}) {
  return (
    <>
      <ConnectionLines />
      {networkNodes.map((_, i) => (
        <Node
          key={i}
          index={i}
          clicked={clickedNode === i}
          onClick={() => setClickedNode(clickedNode === i ? null : i)}
        />
      ))}
      {CONNECTIONS.slice(0, 14).map(([a, b], i) => (
        <DataPulse
          key={i}
          from={POSITIONS[a]}
          to={POSITIONS[b]}
          speed={0.2 + (i % 5) * 0.06}
          color={NODE_COLORS[a]}
        />
      ))}
    </>
  );
}

export default function NeuralNetworkScene() {
  const [clickedNode, setClickedNode] = useState<number | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} color="#00D4FF" intensity={3} distance={20} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} enablePan={false} />
      <NetworkGroup clickedNode={clickedNode} setClickedNode={setClickedNode} />
    </Canvas>
  );
}
