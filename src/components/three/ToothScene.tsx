'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MathUtils, NeutralToneMapping, type Group } from 'three';
import { buildSmileGeometry, buildToothGeometry } from './tooth-geometry';

const SMILE_ARC = Math.PI * 0.62;
const pointer = { x: 0, y: 0 };

function Tooth({ still, onReady }: { still: boolean; onReady: () => void }) {
  const group = useRef<Group>(null);
  const spin = useRef(0.6);
  // ponytail: built on the main thread (~150 ms desktop); move to a worker if it ever janks
  const tooth = useMemo(() => buildToothGeometry(window.innerWidth < 768 ? 64 : 88), []);
  const smile = useMemo(() => buildSmileGeometry(SMILE_ARC), []);

  useEffect(() => onReady(), [onReady]);
  useEffect(
    () => () => {
      tooth.dispose();
      smile.dispose();
    },
    [tooth, smile],
  );

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    if (!still) spin.current += delta * 0.32;
    g.rotation.y = MathUtils.damp(g.rotation.y, spin.current + pointer.x * 0.5 + scroll * 1.6, 3.5, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, -pointer.y * 0.22 + scroll * 0.45, 3.5, delta);
    g.position.y = MathUtils.damp(g.position.y, -0.08 + scroll * 1.1, 5, delta);
  });

  return (
    <group ref={group}>
      <mesh geometry={tooth} scale={1.22} rotation-z={-0.1}>
        <meshPhysicalMaterial
          color="#f3eee4"
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.05}
          sheen={0.6}
          sheenRoughness={0.45}
          sheenColor="#fff0d2"
          envMapIntensity={1.15}
        />
      </mesh>
      <mesh
        geometry={smile}
        position={[0.04, -0.34, 0.14]}
        rotation={[1.15, 0, -Math.PI / 2 - SMILE_ARC / 2]}
        scale={0.92}
      >
        <meshStandardMaterial color="#c9a35c" metalness={1} roughness={0.2} envMapIntensity={1.6} />
      </mesh>
    </group>
  );
}

export default function ToothScene({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [still] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className={className}
      style={{
        opacity: ready ? 1 : 0,
        scale: ready ? '1' : '0.94',
        transition: 'opacity 1.6s cubic-bezier(0.16,1,0.3,1) 0.6s, scale 2s cubic-bezier(0.16,1,0.3,1) 0.6s',
      }}
    >
      <Canvas
        frameloop={visible && !still ? 'always' : 'demand'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.2], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: NeutralToneMapping }}
      >
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.6} position={[0, 5, 2]} scale={[10, 3, 1]} target />
          <Lightformer form="rect" intensity={1.4} position={[-6, 1, 3]} scale={[3, 8, 1]} target />
          <Lightformer form="rect" color="#c9a35c" intensity={7} position={[6, -1, -2]} scale={[3, 10, 1]} target />
          <Lightformer form="circle" intensity={1.2} position={[0, 0, 9]} scale={4} target />
          <Lightformer form="ring" color="#c9a35c" intensity={3} position={[-3, -5, -4]} scale={6} target />
        </Environment>
        <Tooth still={still} onReady={onReady} />
      </Canvas>
    </div>
  );
}
