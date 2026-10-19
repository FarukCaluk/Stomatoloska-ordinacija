'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import poster from '@/assets/img/tooth-poster.webp';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';

const ToothScene = dynamic(() => import('./ToothScene'), { ssr: false });

// No WebGL (old device, blocked GPU): the poster simply stays.
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// The live 3D (follows the mouse) runs on laptops and desktops.
// Phones keep the pre-rendered poster of the very same frame, so they stay fast and smooth.
const LIVE = '(min-width: 1024px) and (any-pointer: fine)';

export function HeroTooth({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [live, setLive] = useState(false);
  const onReady = useCallback(() => setLive(true), []);

  // Start the 3D on the first mouse move or key press, never during the initial load.
  // Until then the poster shows the identical frame, so the swap is invisible.
  useEffect(() => {
    if (!window.matchMedia(LIVE).matches) return;
    const events = ['pointermove', 'pointerdown', 'keydown'] as const;
    const go = () => {
      setLoad(true);
      events.forEach((e) => window.removeEventListener(e, go));
    };
    events.forEach((e) => window.addEventListener(e, go, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, go));
  }, []);

  // On large screens the poster drifts up with the scroll like the live tooth; on phones it stays put.
  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 1024px) and ${NO_REDUCE}`, () => {
        gsap.to('.tooth-poster', {
          yPercent: -20,
          scale: 0.92,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className={className}>
      <div className="tooth-poster absolute inset-0 transition-opacity duration-700" style={{ opacity: live ? 0 : 1 }}>
        <Image src={poster} alt="" fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" />
      </div>
      {load && (
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: live ? 1 : 0 }}>
          <WebGLBoundary>
            <ToothScene onReady={onReady} className="size-full" />
          </WebGLBoundary>
        </div>
      )}
    </div>
  );
}
