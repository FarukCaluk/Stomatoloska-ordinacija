'use client';

import Image, { type StaticImageData } from 'next/image';
import { useRef } from 'react';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';

/** Image that drifts slower than the page inside its frame. */
export function Parallax({
  src,
  alt,
  sizes,
  className = '',
  position = 'center',
  preload = false,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  preload?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(NO_REDUCE, () => {
        gsap.fromTo(
          '.px',
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative overflow-hidden ${className}`}>
      <div className="px absolute inset-x-0 -inset-y-[9%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
