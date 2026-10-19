import { TorusGeometry, Vector3 } from 'three';

/** The gold "smile" from the logo: a torus arc that tapers to points at both ends. */
export function buildSmileGeometry(arc = Math.PI * 0.62, radius = 1, tube = 0.06) {
  const geometry = new TorusGeometry(radius, tube, 24, 220, arc);
  const pos = geometry.attributes.position;
  const p = new Vector3();
  const c = new Vector3();
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos, i);
    const theta = Math.atan2(p.y, p.x);
    const u = Math.min(Math.max((theta < -0.01 ? theta + Math.PI * 2 : theta) / arc, 0), 1);
    const taper = Math.max(Math.pow(Math.sin(Math.PI * u), 0.65), 0.04);
    c.set(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
    p.sub(c).multiplyScalar(taper).add(c);
    pos.setXYZ(i, p.x, p.y, p.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}
