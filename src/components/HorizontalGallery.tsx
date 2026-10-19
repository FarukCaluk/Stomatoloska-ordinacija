'use client';

import Image, { type StaticImageData } from 'next/image';
import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Desktop: the section pins and vertical scrolling pans the photos sideways.
 * Phones and reduced motion: a plain swipeable row with scroll snapping.
 */
export function HorizontalGallery({
  intro,
  items,
}: {
  intro: ReactNode;
  items: { src: StaticImageData; alt: string; caption: string }[];
}) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} className="relative overflow-hidden lg:h-[100svh]" aria-label="Galerija prostora">
      <div
        ref={track}
        className="flex h-full w-max items-center gap-5 px-[clamp(1rem,3.5vw,3rem)] py-16 max-lg:w-auto max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto lg:gap-8 lg:py-0"
      >
        <div className="w-[min(82vw,30rem)] shrink-0 snap-start pr-6">{intro}</div>
        {items.map((it) => (
          <figure key={it.caption} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[44vw]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line">
              <Image src={it.src} alt={it.alt} fill sizes="(min-width: 1024px) 44vw, 82vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 text-muted">{it.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
