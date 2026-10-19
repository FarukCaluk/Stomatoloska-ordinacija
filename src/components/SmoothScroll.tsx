'use client';

import 'lenis/dist/lenis.css';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function SmoothScroll() {
  const ref = useRef<LenisRef>(null);
  const pathname = usePathname();
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // One clock for Lenis and GSAP, so pinned/scrubbed sections never lag the scroll.
  useEffect(() => {
    const update = (time: number) => ref.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  useLenis(ScrollTrigger.update);

  // New page: jump to the top (or to the #anchor), then let ScrollTrigger re-measure.
  useEffect(() => {
    const lenis = ref.current?.lenis;
    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) lenis?.scrollTo(hash, { immediate: true, offset: -96 });
    else lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <ReactLenis root ref={ref} options={{ autoRaf: false, lerp: 0.11, smoothWheel: !reduce, anchors: true }} />;
}
