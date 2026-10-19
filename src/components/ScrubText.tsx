'use client';

import { useRef } from 'react';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(NO_REDUCE, () => {
        gsap.fromTo(
          '.w',
          { opacity: 0.13 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 48%', scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="w">
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
