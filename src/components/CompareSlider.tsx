'use client';

import Image, { type StaticImageData } from 'next/image';
import { useRef, type CSSProperties } from 'react';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';

/** Before/after drag slider. A native range input does the dragging, touch and keyboard work. */
export function CompareSlider({
  before,
  after,
  alt,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  eager = false,
}: {
  before: StaticImageData;
  after: StaticImageData;
  alt: string;
  sizes?: string;
  /** Set for a slider at the top of a page, where it is the largest thing on screen. */
  eager?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const hint = useRef<gsap.core.Tween | null>(null);

  const setPos = (v: number) => root.current?.style.setProperty('--pos', `${v}%`);

  // On first view the handle sweeps across once, so people see it can be dragged.
  useGSAP(
    () => {
      gsap.matchMedia().add(NO_REDUCE, () => {
        const o = { v: 92 };
        setPos(o.v);
        hint.current = gsap.to(o, {
          v: 50,
          duration: 1.8,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
          onUpdate: () => {
            setPos(o.v);
            if (input.current) input.current.value = String(o.v);
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="relative self-start overflow-hidden rounded-[1.75rem] border border-line select-none"
      style={{ '--pos': '50%' } as CSSProperties}
    >
      <Image src={after} alt={`Poslije: ${alt}`} sizes={sizes} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} className="block h-auto w-full" />
      <div className="absolute inset-0" style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}>
        <Image src={before} alt={`Prije: ${alt}`} fill sizes={sizes} loading={eager ? 'eager' : 'lazy'} className="object-cover" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--pos)] w-0.5 -translate-x-1/2 bg-ink">
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-lg font-bold text-bg shadow-[0_10px_40px_rgb(0_0_0/0.45)]">
          ‹ ›
        </span>
      </div>
      <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-bg/70 px-3 py-1 text-sm font-semibold backdrop-blur">
        Prije
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-gold px-3 py-1 text-sm font-semibold text-bg">
        Poslije
      </span>

      <input
        ref={input}
        type="range"
        min={0}
        max={100}
        step={0.5}
        defaultValue={50}
        aria-label="Klizač: lijevo prije, desno poslije"
        onInput={(e) => {
          hint.current?.kill();
          setPos(Number(e.currentTarget.value));
        }}
        className="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}
