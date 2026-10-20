'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Service } from '@/lib/site';

/** Services page: the photo on the left follows whichever service is in the middle of the screen. */
export function ScrollyServices({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blocks = list.current?.querySelectorAll<HTMLElement>('[data-index]') ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.getAttribute('data-index')));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="sticky top-28 hidden h-[calc(100svh-9rem)] overflow-hidden rounded-[1.75rem] border border-line lg:block">
        {services.map((s, i) => (
          <Image
            key={s.id}
            src={s.image}
            alt=""
            fill
            sizes="50vw"
            className={`object-cover transition-[opacity,scale] duration-1000 ease-expo ${
              i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />
        ))}
      </div>

      <div ref={list}>
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            data-index={i}
            className="flex flex-col justify-center border-t border-line py-12 first:border-t-0 lg:min-h-[72svh] lg:py-20"
          >
            <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line lg:hidden">
              <Image src={s.image} alt={s.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <span
              className={`font-semibold transition-colors duration-500 ${i === active ? 'text-gold' : 'text-muted'}`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="type-display mt-4 text-[clamp(1.6rem,3.6vw,3.6rem)]">{s.title}</h2>
            <p className="mt-6 max-w-[46ch] text-lg text-muted">{s.text}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-4 py-1.5 text-[0.95rem]">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
