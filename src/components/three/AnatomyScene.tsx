'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { Group, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene } from 'three';
import { anatomyPose } from './anatomy-timeline';
import { createRenderer, GOLD, loadLayers, porcelain, studioEnvironment } from './studio';

/** Live X-ray tooth for the "Sloj po sloj" section. Desktop only; phones play pre-rendered frames. */
export default function AnatomyScene({
  progress,
  onReady,
  className,
}: {
  progress: RefObject<number>;
  onReady: () => void;
  className?: string;
}) {
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
    scene.add(group);
    const tooth = new Group();
    tooth.scale.setScalar(1.22);
    tooth.rotation.z = -0.1;
    group.add(tooth);

    // Draw order inside out, so the glassy layers blend over what they cover.
    const enamelMat = Object.assign(porcelain(), { transparent: true });
    const dentinMat = new MeshStandardMaterial({ color: '#efe0c2', roughness: 0.5, transparent: true, envMapIntensity: 0.9 });
    const pulpMat = new MeshStandardMaterial({ color: GOLD, emissive: GOLD, metalness: 0.6, roughness: 0.3 });
    const crownMat = Object.assign(porcelain(), { transparent: true });

    const pulp = new Mesh(undefined, pulpMat);
    const dentin = new Mesh(undefined, dentinMat);
    const enamel = new Mesh(undefined, enamelMat);
    const crown = new Mesh(undefined, crownMat);
    pulp.renderOrder = 0;
    dentin.renderOrder = 1;
    enamel.renderOrder = 2;
    crown.renderOrder = 3;
    tooth.add(pulp, dentin, enamel, crown);

    const apply = (p: number, tiltX = 0, tiltY = 0) => {
      const pose = anatomyPose(p);
      group.rotation.set(pose.tilt + tiltX, pose.rotY + tiltY, 0);
      group.scale.setScalar(pose.scale);
      enamelMat.opacity = pose.enamel;
      enamelMat.depthWrite = pose.enamel > 0.97;
      enamel.visible = pose.enamel > 0.01;
      dentinMat.opacity = Math.min(pose.dentin, 1);
      dentinMat.depthWrite = pose.dentin > 0.97;
      pulpMat.emissiveIntensity = 1.4 * pose.pulp;
      pulp.visible = pose.pulp > 0.01;
      crownMat.opacity = pose.crownIn;
      crown.visible = pose.crownIn > 0.01;
      // short drop, faded in, so the crown never leaves the square frame
      crown.position.y = (1 - pose.crownDrop) * 0.3;
    };

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

    let shown = progress.current ?? 0;
    const tilt = { x: 0, y: 0 };
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      shown = MathUtils.damp(shown, progress.current ?? 0, 7, delta);
      tilt.x = MathUtils.damp(tilt.x, -pointer.y * 0.12, 4, delta);
      tilt.y = MathUtils.damp(tilt.y, pointer.x * 0.25, 4, delta);
      apply(shown, tilt.x, tilt.y);
      renderer.render(scene, camera);
    };

    let started = false;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (started) renderer.setAnimationLoop(visible ? tick : null);
    });
    io.observe(el);

    // Dev helper for exporting the phone stills: the layers of pose p, held in the opening
    // angle and size so every still lines up with the others (and with the live first frame).
    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as { __anatomyStill?: (p: number) => string }).__anatomyStill = (p) => {
        renderer.setAnimationLoop(null);
        apply(p);
        const start = anatomyPose(0);
        group.rotation.set(start.tilt, start.rotY, 0);
        group.scale.setScalar(start.scale);
        renderer.render(scene, camera);
        return renderer.domElement.toDataURL('image/png');
      };
    }

    const build = loadLayers(['enamel', 'dentin', 'pulp', 'crown'], 80);
    let disposed = false;
    build.done.then(async (layers) => {
      if (disposed) return;
      enamel.geometry = layers.enamel!;
      dentin.geometry = layers.dentin!;
      pulp.geometry = layers.pulp!;
      crown.geometry = layers.crown!;
      apply(shown);
      // compile with every layer switched on, so no shader compiles mid-scroll
      [enamel, dentin, pulp, crown].forEach((m) => (m.visible = true));
      await renderer.compileAsync(scene, camera);
      if (disposed) return;
      apply(shown);
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
      for (const m of [enamel, dentin, pulp, crown]) {
        m.geometry.dispose();
        m.material.dispose();
      }
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress]);

  return <div ref={host} className={className} />;
}
