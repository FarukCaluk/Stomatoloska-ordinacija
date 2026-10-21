'use client';

import { useEffect, useRef } from 'react';
import { Group, MathUtils, Mesh, PerspectiveCamera, Scene, Vector3 } from 'three';
import { buildSmileGeometry } from './smile';
import { createRenderer, goldMetal, loadLayers, porcelain, studioEnvironment } from './studio';

const SMILE_ARC = Math.PI * 0.8;
const SPIN_START = -0.35;

/** Live porcelain tooth. Desktop only; phones get the pre-rendered poster of the same frame. */
export default function ToothScene({ className, onReady }: { className?: string; onReady: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const ready = useRef(onReady);

  useEffect(() => {
    const el = host.current!;
    const renderer = createRenderer(el);

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.z = 5.2;
    const env = studioEnvironment(renderer);
    scene.environment = env.texture;

    const group = new Group();
    group.rotation.y = SPIN_START;
    group.position.y = -0.08;
    scene.add(group);

    const tooth = new Mesh(undefined, porcelain());
    tooth.scale.setScalar(1.22);
    tooth.rotation.z = -0.1;
    // Across the middle of the tooth, floating just in front of it and face-on in the opening
    // pose (it turns with the tooth, so undo the starting spin), so it reads like the logo.
    const smile = new Mesh(buildSmileGeometry(SMILE_ARC), goldMetal());
    smile.position.set(0.04, 0.45, 0.86).applyAxisAngle(new Vector3(0, 1, 0), -SPIN_START);
    smile.rotation.set(0.15, -SPIN_START, -Math.PI / 2 - SMILE_ARC / 2, 'YXZ');
    smile.scale.setScalar(0.55);
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

    const build = loadLayers(['enamel'], 84);
    let disposed = false;
    build.done.then(async ({ enamel }) => {
      if (disposed || !enamel) return;
      tooth.geometry = enamel;
      await renderer.compileAsync(scene, camera); // compiles shaders without freezing the page
      if (disposed) return;
      renderer.render(scene, camera);
      started = true;
      last = performance.now();
      if (visible) renderer.setAnimationLoop(tick);
      ready.current();
    });

    return () => {
      disposed = true;
      build.cancel();
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
