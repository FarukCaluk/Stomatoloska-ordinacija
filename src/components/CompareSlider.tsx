'use client';

import Image from 'next/image';
import { useRef, type CSSProperties } from 'react';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';
import type { BeforeAfter } from '@/lib/results';

/**
 * Before/after drag slider over one untouched PRIJE/POSLIJE photo: both layers show the same file,
 * shifted so the frame holds the top half or the bottom half. A native range input does the
 * dragging, touch and keyboard work.
 */
export function CompareSlider({
  result,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  eager = false,
}: {
  result: BeforeAfter;
  sizes?: string;
  /** Set for a slider at the top of a page, where it is the largest thing on screen. */
  eager?: boolean;
}) {
  const { image, afterTop, frame, alt } = result;
  const loading = eager ? 'eager' : 'lazy';
  const half = (top: number, label: string) => (
    <Image
      src={image}
      alt={label}
      sizes={sizes}
      loading={loading}
      fetchPriority={eager && top ? 'high' : 'auto'}
      className="absolute left-0 h-auto w-full max-w-none"
      style={{ top: `${(-top / frame) * 100}%` }}
    />
  );
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
      style={{ '--pos': '50%', aspectRatio: `${image.width} / ${frame}` } as CSSProperties}
    >
      {half(afterTop, `Prije i poslije: ${alt}`)}
      <div className="absolute inset-0" style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}>
        {half(0, '')}
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
