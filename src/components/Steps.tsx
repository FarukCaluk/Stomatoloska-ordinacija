'use client';

import { useRef } from 'react';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';

/** Numbered steps with a gold rail that fills as you scroll past them. */
export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(NO_REDUCE, () => {
        gsap.fromTo(
          '.rail',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative pl-16 sm:pl-24">
      <span aria-hidden className="absolute bottom-2 left-5 top-2 w-px bg-line sm:left-8" />
      <span aria-hidden className="rail absolute bottom-2 left-5 top-2 w-px origin-top bg-gold sm:left-8" />
      <ol className="grid gap-14">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="type-display absolute -left-16 top-0 grid size-10 place-items-center rounded-full border border-gold bg-bg text-lg text-gold sm:-left-24 sm:size-16 sm:text-2xl">
              {i + 1}
            </span>
            <h3 className="type-display pt-1 text-[clamp(1.8rem,3.4vw,3rem)] sm:pt-3">{s.title}</h3>
            <p className="mt-4 max-w-[44ch] text-lg text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
