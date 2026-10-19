import { MeshBasicMaterial } from 'three';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';

// Signed distance helpers (Inigo Quilez). Negative inside, positive outside.
const len = (x: number, y: number, z: number) => Math.sqrt(x * x + y * y + z * z);

function ellipsoid(px: number, py: number, pz: number, rx: number, ry: number, rz: number) {
  const k0 = len(px / rx, py / ry, pz / rz);
  const k1 = len(px / (rx * rx), py / (ry * ry), pz / (rz * rz));
  return (k0 * (k0 - 1)) / k1;
}

function roundCone(
  px: number, py: number, pz: number,
  ax: number, ay: number, az: number,
  bx: number, by: number, bz: number,
  r1: number, r2: number,
) {
  const bax = bx - ax, bay = by - ay, baz = bz - az;
  const l2 = bax * bax + bay * bay + baz * baz;
  const rr = r1 - r2;
  const a2 = l2 - rr * rr;
  const il2 = 1 / l2;
  const pax = px - ax, pay = py - ay, paz = pz - az;
  const y = pax * bax + pay * bay + paz * baz;
  const z = y - l2;
  const qx = pax * l2 - bax * y, qy = pay * l2 - bay * y, qz = paz * l2 - baz * y;
  const x2 = qx * qx + qy * qy + qz * qz;
  const y2 = y * y * l2;
  const z2 = z * z * l2;
  const k = Math.sign(rr) * rr * rr * x2;
  if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
  if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
  return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}

const smin = (a: number, b: number, k: number) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
};
const smax = (a: number, b: number, k: number) => -smin(-a, -b, k);

const CUSPS: [number, number][] = [[-0.2, -0.16], [0.2, -0.16], [-0.2, 0.16], [0.2, 0.16]];

/** Lower molar, crown up, two roots down. Fits roughly in [-0.85, 0.8] on y. */
export function toothSDF(x: number, y: number, z: number) {
  let d = ellipsoid(x, y - 0.42, z, 0.48, 0.27, 0.42);
  for (const [cx, cz] of CUSPS) d = smin(d, len(x - cx, y - 0.58, z - cz) - 0.18, 0.14);
  // central fossa and the cross-shaped fissure between the cusps
  d = smax(d, -(len(x, y - 0.74, z) - 0.1), 0.06);
  d = smax(d, -ellipsoid(x, y - 0.76, z, 0.4, 0.07, 0.04), 0.04);
  d = smax(d, -ellipsoid(x, y - 0.76, z, 0.04, 0.07, 0.36), 0.04);
  // narrower root trunk, blended wide so the neck reads as one smooth waist
  d = smin(d, ellipsoid(x, y - 0.04, z, 0.34, 0.36, 0.3), 0.25);
  // roots, curving slightly toward the back
  const bx = y < 0 ? x - 0.08 * y * y : x;
  const roots = Math.min(
    roundCone(bx, y, z, -0.19, 0, 0, -0.25, -0.82, 0.03, 0.2, 0.075),
    roundCone(bx, y, z, 0.19, 0, 0, 0.29, -0.78, -0.03, 0.19, 0.075),
  );
  return smin(d, roots, 0.16);
}

/** Polygonizes the tooth SDF into flat position/normal arrays (runs in a Web Worker). */
export function buildToothArrays(resolution = 84) {
  const mc = new MarchingCubes(resolution, new MeshBasicMaterial(), false, false, 160000);
  mc.isolation = 0;
  const { size, size2, halfsize, field } = mc;
  for (let k = 0; k < size; k++) {
    const z = (k - halfsize) / halfsize;
    for (let j = 0; j < size; j++) {
      const y = (j - halfsize) / halfsize;
      for (let i = 0; i < size; i++) {
        field[k * size2 + j * size + i] = -toothSDF((i - halfsize) / halfsize, y, z);
      }
    }
  }
  mc.update();

  const n = mc.count * 3;
  const normals = mc.normalArray.slice(0, n);
  for (let i = 0; i < n; i += 3) {
    const l = Math.hypot(normals[i], normals[i + 1], normals[i + 2]) || 1;
    normals[i] /= l;
    normals[i + 1] /= l;
    normals[i + 2] /= l;
  }
  return { position: mc.positionArray.slice(0, n), normal: normals };
}
