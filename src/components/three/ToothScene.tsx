'use client';

import { useEffect, useRef } from 'react';
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  RingGeometry,
  Scene,
  WebGLRenderer,
} from 'three';
import { buildSmileGeometry } from './smile';

const SMILE_ARC = Math.PI * 0.62;
const SPIN_START = -0.35;
const GOLD = '#c9a35c';

type Panel = { color: string; intensity: number; at: [number, number, number]; size: [number, number]; ring?: number };

// White soft boxes plus a gold rim light, baked once into an environment map.
const PANELS: Panel[] = [
  { color: '#ffffff', intensity: 2.6, at: [0, 5, 2], size: [10, 3] },
  { color: '#ffffff', intensity: 1.4, at: [-6, 1, 3], size: [3, 8] },
  { color: GOLD, intensity: 7, at: [6, -1, -2], size: [3, 10] },
  { color: '#ffffff', intensity: 1.2, at: [0, 0, 9], size: [4, 4], ring: 0 },
  { color: GOLD, intensity: 3, at: [-3, -5, -4], size: [6, 6], ring: 0.5 },
];

function studioEnvironment(renderer: WebGLRenderer) {
  const scene = new Scene();
  for (const p of PANELS) {
    const panel = new Mesh(
      p.ring === undefined ? new PlaneGeometry(1, 1) : new RingGeometry(p.ring, 1, 48),
      new MeshBasicMaterial({ color: new Color(p.color).multiplyScalar(p.intensity), side: DoubleSide }),
    );
    panel.position.set(...p.at);
    panel.scale.set(p.size[0], p.size[1], 1);
    panel.lookAt(0, 0, 0);
    scene.add(panel);
  }
  const pmrem = new PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0.02);
  pmrem.dispose();
  scene.traverse((o) => {
    if (o instanceof Mesh) {
      o.geometry.dispose();
      (o.material as MeshBasicMaterial).dispose();
    }
  });
  return target;
}

/** Live porcelain tooth. Desktop only; phones get the pre-rendered poster of the same frame. */
export default function ToothScene({ className, onReady }: { className?: string; onReady: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const ready = useRef(onReady);

  useEffect(() => {
    const el = host.current!;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = NeutralToneMapping;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    el.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.z = 5.2;
    const env = studioEnvironment(renderer);
    scene.environment = env.texture;

    const group = new Group();
    group.rotation.y = SPIN_START;
    group.position.y = -0.08;
    scene.add(group);

    const tooth = new Mesh(
      new BufferGeometry(),
      new MeshPhysicalMaterial({
        color: '#f3eee4',
        roughness: 0.24,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.15,
      }),
    );
    tooth.scale.setScalar(1.22);
    tooth.rotation.z = -0.1;
    const smile = new Mesh(
      buildSmileGeometry(SMILE_ARC),
      new MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2, envMapIntensity: 1.6 }),
    );
    smile.position.set(0.04, -0.3, 0.62);
    smile.rotation.set(0.55, 0, -Math.PI / 2 - SMILE_ARC / 2);
    smile.scale.setScalar(0.92);
    group.add(tooth, smile);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let spin = SPIN_START;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
      spin += delta * 0.32;
      group.rotation.y = MathUtils.damp(group.rotation.y, spin + pointer.x * 0.5 + scroll * 1.6, 3.5, delta);
      group.rotation.x = MathUtils.damp(group.rotation.x, -pointer.y * 0.22 + scroll * 0.45, 3.5, delta);
      group.position.y = MathUtils.damp(group.position.y, -0.08 + scroll * 1.1, 5, delta);
      renderer.render(scene, camera);
    };

    // Draw only while the hero is on screen.
    let started = false;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (started) renderer.setAnimationLoop(visible ? tick : null);
    });
    io.observe(el);

    // Dev helper used to export the poster image: renders the starting pose and returns a PNG.
    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as { __toothPoster?: () => string }).__toothPoster = () => {
        renderer.setAnimationLoop(null);
        group.rotation.set(0, SPIN_START, 0);
        group.position.y = -0.08;
        renderer.render(scene, camera);
        return renderer.domElement.toDataURL('image/png');
      };
    }

    const worker = new Worker(new URL('./tooth.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = async ({ data }: MessageEvent<{ position: Float32Array; normal: Float32Array }>) => {
      worker.terminate();
      tooth.geometry.setAttribute('position', new BufferAttribute(data.position, 3));
      tooth.geometry.setAttribute('normal', new BufferAttribute(data.normal, 3));
      tooth.geometry.computeBoundingSphere();
      await renderer.compileAsync(scene, camera); // compiles shaders without freezing the page
      if (!host.current) return;
      renderer.render(scene, camera);
      started = true;
      last = performance.now();
      if (visible) renderer.setAnimationLoop(tick);
      ready.current();
    };
    worker.postMessage(84);

    return () => {
      worker.terminate();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      renderer.setAnimationLoop(null);
      tooth.geometry.dispose();
      tooth.material.dispose();
      smile.geometry.dispose();
      smile.material.dispose();
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={className} />;
}
