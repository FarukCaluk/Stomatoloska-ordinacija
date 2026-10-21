'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import caklina from '@/assets/img/anatomija-caklina.webp';
import dentin from '@/assets/img/anatomija-dentin.webp';
import krunica from '@/assets/img/anatomija-krunica.webp';
import pulpa from '@/assets/img/anatomija-pulpa.webp';
import { CHAPTER_COUNT } from '@/components/three/anatomy-timeline';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const AnatomyScene = dynamic(() => import('./three/AnatomyScene'), { ssr: false });

const LIVE = '(min-width: 1024px) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)';

// Each still is rendered from the live scene in the same pose, so the layers line up exactly.
const chapters = [
  {
    title: 'Caklina',
    text: 'Najtvrđe tkivo u tijelu, ali se troši i puca. Redovni pregledi i uklanjanje kamenca je čuvaju, a fasete i izbjeljivanje joj vraćaju sjaj.',
    href: '/usluge#preventiva',
    link: 'Pregledi i preventiva',
    image: caklina,
  },
  {
    title: 'Dentin',
    text: 'Kad karijes probije caklinu, kroz mekši dentin širi se brže. Otkriven na vrijeme, rješava se jednom bijelom ispunom.',
    href: '/usluge#lijecenje',
    link: 'Liječenje karijesa',
    image: dentin,
  },
  {
    title: 'Pulpa',
    text: 'Živac i krvni sudovi zuba. Kad se upali, liječenjem kanala spašavamo zub, uz anesteziju i bez žurbe.',
    href: '/usluge#lijecenje',
    link: 'Liječenje kanala',
    image: pulpa,
  },
  {
    title: 'Krunica',
    text: 'Kad je zub previše oštećen, krunica po mjeri vraća mu oblik, snagu i boju, da opet grizete bez razmišljanja.',
    href: '/usluge#protetika',
    link: 'Krunice i mostovi',
    image: krunica,
  },
];

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Desktop: a live 3D tooth scrubbed by the scroll.
 * Phones: no scroll-jacking; tap a layer (or the tooth) and its still is scanned in from below.
 */
export function AnatomySection() {
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const current = useRef(0);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [near, setNear] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);
  const [liveReady, setLiveReady] = useState(false);
  const onReady = useCallback(() => setLiveReady(true), []);

  const show = (next: number) => {
    if (next === current.current) return;
    setPrev(current.current);
    current.current = next;
    setActive(next);
  };

  // Nothing extra loads until the visitor scrolls, and then only once the section is about a screen away.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setLive(window.matchMedia(LIVE).matches);
        setNear(true);
        io.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    const start = () => io.observe(el);
    if (window.scrollY > 0) start();
    else window.addEventListener('scroll', start, { once: true, passive: true });
    return () => {
      window.removeEventListener('scroll', start);
      io.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      gsap.matchMedia().add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const p = self.progress;
            progress.current = p;
            bar.current?.style.setProperty('scale', `${p} 1`);
            show(Math.min(CHAPTER_COUNT - 1, Math.floor(p * CHAPTER_COUNT)));
          },
        });
      });
    },
    { scope: section },
  );

  const stills = live === false;

  return (
    <section ref={section} aria-labelledby="anatomija-title" className="relative overflow-x-clip lg:h-[460svh]">
      <div className="shell flex flex-col lg:sticky lg:top-0 lg:grid lg:h-[100svh] lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-12 lg:py-6">
        <div className="relative order-3 mt-2 aspect-square w-full max-lg:[container-type:size] lg:order-2 lg:mt-0 lg:aspect-auto">
          {/* phones: sized so the tooth itself fills the space; desktop: the live scene's square */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(190cqw,122cqh)] -translate-1/2 lg:relative lg:left-auto lg:top-auto lg:mx-auto lg:w-full lg:max-w-[min(100%,80svh)] lg:translate-none">
            {chapters.map((c, i) =>
              i === 0 || stills ? (
                <div
                  key={c.title}
                  className={`absolute inset-0 ${
                    !stills
                      ? `transition-opacity duration-500 ${live && liveReady ? 'opacity-0' : ''}`
                      : i === active
                        ? `z-10 ${prev >= 0 ? 'scan-in' : ''}`
                        : i === prev
                          ? 'scan-out'
                          : 'invisible'
                  }`}
                >
                  <Image src={c.image} alt="" aria-hidden fill sizes="(min-width: 1024px) 50vw, 150vw" className="object-contain" />
                </div>
              ) : null,
            )}
            {stills && prev >= 0 && (
              <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                <span key={active} className="scan-line" />
              </div>
            )}
            {near && live && (
              <div className={`absolute inset-0 transition-opacity duration-700 ${liveReady ? 'opacity-100' : 'opacity-0'}`}>
                <WebGLBoundary>
                  <AnatomyScene progress={progress} onReady={onReady} className="size-full" />
                </WebGLBoundary>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => show((active + 1) % CHAPTER_COUNT)}
            aria-label="Sljedeći sloj zuba"
            className="absolute inset-0 z-30 lg:hidden"
          >
            <span aria-hidden className="absolute inset-x-0 -bottom-6 text-center text-xs text-muted">
              Dodirnite zub za sljedeći sloj
            </span>
          </button>
        </div>

        <div className="contents lg:order-1 lg:block">
          <div className="order-1">
            <p className="eyebrow">Anatomija zuba</p>
            <h2 id="anatomija-title" className="type-display mt-2 text-[clamp(2rem,5.4vw,5.6rem)] lg:mt-3">
              Sloj po sloj.
            </h2>

            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <span className="font-semibold tabular-nums text-gold">{String(active + 1).padStart(2, '0')}</span>
              <span className="relative h-px flex-1 bg-line">
                <span ref={bar} className="absolute inset-0 origin-left bg-gold" style={{ scale: '0 1' }} />
              </span>
              <span className="tabular-nums text-muted">{String(CHAPTER_COUNT).padStart(2, '0')}</span>
            </div>
          </div>

          {/* phones: pick a layer directly */}
          <div className="relative z-40 order-2 mt-6 grid grid-cols-4 gap-1.5 lg:hidden">
            {chapters.map((c, i) => (
              <button
                key={c.title}
                type="button"
                aria-pressed={i === active}
                onClick={() => show(i)}
                className={`h-11 rounded-full border text-sm font-semibold transition-colors duration-300 ${
                  i === active ? 'border-gold bg-gold text-bg' : 'border-line text-muted'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="relative order-4 mt-12 min-h-[10.5rem] sm:min-h-[9rem] lg:mt-8 lg:min-h-[13rem]">
            {chapters.map((c, i) => (
              <article
                key={c.title}
                aria-hidden={i !== active}
                className={`absolute inset-x-0 top-0 transition-[opacity,translate] duration-500 ease-expo ${
                  i === active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                }`}
              >
                <h3 className="type-display text-[clamp(1.5rem,2.8vw,2.6rem)]">{c.title}</h3>
                <p className="mt-3 max-w-[44ch] text-muted lg:text-lg">{c.text}</p>
                <Link href={c.href} tabIndex={i === active ? 0 : -1} className="link-line mt-4 inline-block font-semibold text-gold">
                  {c.link} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
