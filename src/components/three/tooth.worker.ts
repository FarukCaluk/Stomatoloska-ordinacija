import { LAYERS, polygonize, type Layer } from './tooth-sdf';

export type LayerRequest = { layers: Layer[]; resolution: number };
export type LayerMeshes = Partial<Record<Layer, { position: Float32Array; normal: Float32Array }>>;

// Builds the tooth meshes off the main thread, so scrolling never stutters while they load.
const ctx = self as unknown as {
  onmessage: ((e: MessageEvent<LayerRequest>) => void) | null;
  postMessage: (message: LayerMeshes, transfer: Transferable[]) => void;
};

ctx.onmessage = ({ data }) => {
  const out: LayerMeshes = {};
  const transfer: Transferable[] = [];
  for (const layer of data.layers) {
    // the thin pulp canals need a finer grid to survive
    const mesh = polygonize(LAYERS[layer], layer === 'pulp' ? Math.max(data.resolution, 96) : data.resolution);
    out[layer] = mesh;
    transfer.push(mesh.position.buffer, mesh.normal.buffer);
  }
  ctx.postMessage(out, transfer);
};
