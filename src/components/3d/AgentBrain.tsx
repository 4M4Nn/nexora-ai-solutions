"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FlowParticle({ from, to, speed, color }: {
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
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function NodeSphere({ position, color, scale, label }: {
  position: [number, number, number];
  color: string;
  scale: number;
  label: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.06);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3 * scale, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
    </mesh>
  );
}

function ConnectionLine({ from, to, color }: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) {
  const pts = useMemo(() => {
    const arr = new Float32Array(6);
    arr[0] = from[0]; arr[1] = from[1]; arr[2] = from[2];
    arr[3] = to[0]; arr[4] = to[1]; arr[5] = to[2];
    return arr;
  }, [from, to]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

function DecisionNode({ position, color, index }: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const active = Math.floor(state.clock.elapsedTime * 0.8) % 3 === index;
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, active ? 1.4 : 0.85, 0.08));
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, active ? 4 : 0.8, 0.08);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

const INPUT_POS: [number, number, number] = [-3.5, 0, 0];
const CORE_POS: [number, number, number] = [0, 0, 0];
const OUTPUT_POS: [number, number, number] = [3.5, 0, 0];
const DECISION_POSITIONS: [number, number, number][] = [
  [1.8, 0.9, 0],
  [1.8, 0, 0],
  [1.8, -0.9, 0],
];
const DECISION_COLORS = ["#00FFB2", "#00D4FF", "#6E44FF"];

export default function AgentBrain() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={CORE_POS} color="#00D4FF" intensity={4} distance={12} />

      {/* Input → Core connection */}
      <ConnectionLine from={INPUT_POS} to={CORE_POS} color="#00FFB2" />
      {/* Core → Decisions */}
      {DECISION_POSITIONS.map((p, i) => (
        <ConnectionLine key={i} from={CORE_POS} to={p} color={DECISION_COLORS[i]} />
      ))}
      {/* Decisions → Output */}
      {DECISION_POSITIONS.map((p, i) => (
        <ConnectionLine key={i} from={p} to={OUTPUT_POS} color={DECISION_COLORS[i]} />
      ))}

      {/* Input node */}
      <NodeSphere position={INPUT_POS} color="#00FFB2" scale={1} label="Input" />

      {/* Core */}
      <NodeSphere position={CORE_POS} color="#00D4FF" scale={1.6} label="Core" />

      {/* Decision nodes */}
      {DECISION_POSITIONS.map((p, i) => (
        <DecisionNode key={i} position={p} color={DECISION_COLORS[i]} index={i} />
      ))}

      {/* Output node */}
      <NodeSphere position={OUTPUT_POS} color="#4488FF" scale={1} label="Output" />

      {/* Flow particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <FlowParticle key={i} from={INPUT_POS} to={CORE_POS} speed={0.4 + i * 0.08} color="#00FFB2" />
      ))}
      {DECISION_POSITIONS.map((p, i) =>
        Array.from({ length: 3 }).map((_, j) => (
          <FlowParticle key={`${i}-${j}`} from={p} to={OUTPUT_POS} speed={0.3 + j * 0.1} color={DECISION_COLORS[i]} />
        ))
      )}
    </Canvas>
  );
}
