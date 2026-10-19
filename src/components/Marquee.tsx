'use client';

import Image from 'next/image';
import { useRef } from 'react';
import tooth from '@/assets/img/tooth-gold.png';
import { gsap, NO_REDUCE, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** Endless band of service names; scrolling the page pushes it faster. */
export function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(NO_REDUCE, () => {
        const loop = gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 42, repeat: -1 });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
            gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.4, delay: 0.25 });
          },
        });
      });
    },
    { scope: root },
  );

  const row = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {items.map((word, i) => (
        <span key={`${copy}-${word}`} className="flex items-center">
          <span className={`type-display px-[0.35em] ${i % 2 ? 'type-outline' : ''}`}>{word}</span>
          <Image src={tooth} alt="" className="h-[0.62em] w-auto" sizes="60px" />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className="overflow-clip border-y border-line py-[clamp(1.25rem,3vw,2.5rem)]">
      <p className="sr-only">{items.join(', ')}</p>
      <div aria-hidden className="marquee-track flex w-max text-[clamp(2.5rem,7.5vw,7.5rem)] leading-none">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
