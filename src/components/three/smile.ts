import { CapsuleGeometry, Matrix4, TorusGeometry, Vector3 } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * A smiley's mouth (no eyes): an even U-shaped stroke, a little fuller at the bottom, with a
 * short dash across each end, perpendicular to the curve.
 */
export function buildSmileGeometry(arc = Math.PI * 0.8, tube = 0.09) {
  const mouth = new TorusGeometry(1, tube, 24, 200, arc);
  const pos = mouth.attributes.position;
  const p = new Vector3();
  const c = new Vector3();
  const cap = tube / arc; // round the ends over one tube radius
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos, i);
    const theta = Math.atan2(p.y, p.x);
    const u = Math.min(Math.max((theta < -0.01 ? theta + Math.PI * 2 : theta) / arc, 0), 1);
    const t = Math.min(1, Math.min(u, 1 - u) / cap);
    const scale = (0.75 + 0.25 * Math.sin(Math.PI * u)) * Math.max(Math.sqrt(1 - (1 - t) ** 2), 0.05);
    c.set(Math.cos(theta), Math.sin(theta), 0);
    p.sub(c).multiplyScalar(scale).add(c);
    pos.setXYZ(i, p.x, p.y, p.z);
  }
  mouth.computeVertexNormals();

  const dashes = [0.015, arc - 0.015].map((theta) => {
    const dash = new CapsuleGeometry(tube * 0.85, 0.32, 8, 16);
    // the capsule lies along y; turn it to point outward from the centre, then centre it on the end
    dash.applyMatrix4(new Matrix4().makeRotationZ(theta - Math.PI / 2));
    dash.applyMatrix4(new Matrix4().makeTranslation(Math.cos(theta), Math.sin(theta), 0));
    return dash;
  });

  const geometry = mergeGeometries([mouth, ...dashes])!;
  [mouth, ...dashes].forEach((g) => g.dispose());
  return geometry;
}
