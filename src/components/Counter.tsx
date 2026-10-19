'use client';

import { useRef } from 'react';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';

/** Counts up to a decimal value (shown with a Bosnian decimal comma) when it scrolls in. */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (v: number) => v.toFixed(1).replace('.', ',');

  useGSAP(
    () => {
      gsap.matchMedia().add(NO_REDUCE, () => {
        const o = { v: 0 };
        gsap.to(o, {
          v: value,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
          onUpdate: () => {
            if (ref.current) ref.current.textContent = format(o.v);
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
