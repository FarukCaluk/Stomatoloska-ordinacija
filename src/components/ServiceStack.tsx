'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { gsap, NO_REDUCE, useGSAP } from '@/lib/gsap';
import type { Service } from '@/lib/site';

/** Sticky cards: each one pins under the header and sinks back as the next slides over it. */
export function ServiceStack({ services }: { services: Service[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(NO_REDUCE, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap
            .timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true } })
            .to(card.querySelector('.stack-inner'), { scale: 0.9, ease: 'none' }, 0)
            .to(card.querySelector('.stack-shade'), { opacity: 0.6, ease: 'none' }, 0);
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-14 grid gap-[8svh]">
      {services.map((s, i) => (
        <article
          key={s.id}
          className="stack-card sticky"
          style={{ top: `calc(6.5rem + ${i} * 1.1rem)` }}
          aria-labelledby={`stack-${s.id}`}
        >
          <div className="stack-inner relative grid min-h-[min(74svh,620px)] origin-top overflow-hidden rounded-[1.75rem] border border-line bg-raise lg:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-14">
              <span className="font-semibold text-gold">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 id={`stack-${s.id}`} className="type-display text-[clamp(1.5rem,3.4vw,3.6rem)]">
                  {s.title}
                </h3>
                <p className="mt-6 max-w-[42ch] text-lg text-muted">{s.text}</p>
                <Link href={`/usluge#${s.id}`} className="link-line mt-8 inline-block font-semibold">
                  Više o usluzi →
                </Link>
              </div>
            </div>
            <div className="relative min-h-64 max-lg:order-first">
              <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="stack-shade pointer-events-none absolute inset-0 bg-bg opacity-0" />
          </div>
        </article>
      ))}
    </div>
  );
}
