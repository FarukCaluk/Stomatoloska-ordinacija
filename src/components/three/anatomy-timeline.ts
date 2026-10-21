// One scroll progress value (0..1) drives the whole anatomy story. The live desktop scene
// and the pre-rendered phone frames both read this, so they always show the same thing.
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (a: number, b: number, p: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export const CHAPTER_COUNT = 4;

export function anatomyPose(p: number) {
  return {
    rotY: -0.35 + p * Math.PI * 2, // one full turn, ending where it started
    tilt: 0.14 * Math.sin(p * Math.PI),
    scale: 1 + 0.08 * ease(0.42, 0.55, p) * (1 - ease(0.7, 0.8, p)),
    // 01 enamel, 02 enamel turns to glass, 03 dentin too and the pulp glows, 04 crown drops on
    enamel: (1 - 0.86 * ease(0.18, 0.3, p)) * (1 - ease(0.68, 0.76, p)),
    dentin: 1 - 0.82 * ease(0.43, 0.55, p) + 0.82 * ease(0.68, 0.78, p),
    pulp: ease(0.43, 0.55, p) * (1 - ease(0.68, 0.76, p)),
    crownIn: ease(0.74, 0.8, p),
    crownDrop: ease(0.74, 0.92, p),
  };
}
