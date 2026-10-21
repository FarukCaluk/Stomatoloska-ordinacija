import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PlaneGeometry,
  PMREMGenerator,
  RingGeometry,
  Scene,
  WebGLRenderer,
} from 'three';
import type { Layer } from './tooth-sdf';
import type { LayerMeshes } from './tooth.worker';

export const GOLD = '#c9a35c';

type Panel = { color: string; intensity: number; at: [number, number, number]; size: [number, number]; ring?: number };

// White soft boxes plus a gold rim light, baked once into an environment map.
const PANELS: Panel[] = [
  { color: '#ffffff', intensity: 2.6, at: [0, 5, 2], size: [10, 3] },
  { color: '#ffffff', intensity: 1.4, at: [-6, 1, 3], size: [3, 8] },
  { color: GOLD, intensity: 7, at: [6, -1, -2], size: [3, 10] },
  { color: '#ffffff', intensity: 1.2, at: [0, 0, 9], size: [4, 4], ring: 0 },
  { color: GOLD, intensity: 3, at: [-3, -5, -4], size: [6, 6], ring: 0.5 },
];

export function studioEnvironment(renderer: WebGLRenderer) {
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

export function createRenderer(host: HTMLElement) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = NeutralToneMapping;
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  host.appendChild(renderer.domElement);
  return renderer;
}

export const porcelain = () =>
  new MeshPhysicalMaterial({ color: '#f3eee4', roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.15 });

export const goldMetal = () =>
  new MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2, envMapIntensity: 1.6 });

/** Builds the requested tooth layers in a Web Worker and resolves with ready geometries. */
export function loadLayers(layers: Layer[], resolution: number) {
  const worker = new Worker(new URL('./tooth.worker.ts', import.meta.url), { type: 'module' });
  const done = new Promise<Partial<Record<Layer, BufferGeometry>>>((resolve, reject) => {
    worker.onerror = reject;
    worker.onmessage = ({ data }: MessageEvent<LayerMeshes>) => {
      worker.terminate();
      const out: Partial<Record<Layer, BufferGeometry>> = {};
      for (const layer of layers) {
        const mesh = data[layer];
        if (!mesh) continue;
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(mesh.position, 3));
        geometry.setAttribute('normal', new BufferAttribute(mesh.normal, 3));
        geometry.computeBoundingSphere();
        out[layer] = geometry;
      }
      resolve(out);
    };
  });
  worker.postMessage({ layers, resolution });
  return { done, cancel: () => worker.terminate() };
}
