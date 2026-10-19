'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { useEffect, useState, type CSSProperties } from 'react';
import logo from '@/assets/img/logo-light.png';
import { nav, site } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lenis = useLenis(({ scroll, direction }) => {
    setSolid(scroll > 40);
    setHidden(direction === 1 && scroll > 240);
  });

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <a
        href="#sadrzaj"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-ink px-4 py-2 text-bg focus:translate-y-0"
      >
        Preskoči na sadržaj
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color] duration-700 ease-expo ${
          solid && !open ? 'border-line bg-bg/95 lg:bg-bg/75 lg:backdrop-blur-xl' : 'border-transparent'
        } ${hidden && !open ? '-translate-y-full' : ''}`}
      >
        <div className="shell flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="Dr. Karić, početna" onClick={close} className="shrink-0">
            <Image src={logo} alt="Dr. Karić stomatološka ordinacija" className="h-10 w-auto sm:h-11" sizes="140px" loading="eager" />
          </Link>

          <nav aria-label="Glavna navigacija" className="hidden items-center gap-9 text-[0.95rem] lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`link-line pb-0.5 transition-colors ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/zakazivanje" className="btn btn-gold btn-sm">
              Zakažite termin
            </Link>
          </nav>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="meni"
            onClick={() => setOpen((o) => !o)}
            className="h-11 rounded-full border border-line px-5 text-[0.95rem] lg:hidden"
          >
            {open ? 'Zatvori' : 'Meni'}
          </button>
        </div>
      </header>

      {/* Outside the header: its backdrop-filter would trap a fixed overlay inside 80px. */}
      <div
        id="meni"
        className={`fixed inset-0 z-40 flex flex-col bg-bg px-[clamp(1rem,3.5vw,3rem)] pb-8 pt-28 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobilna navigacija" className="flex flex-col">
          {[{ href: '/', label: 'Početna' }, ...nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={pathname === item.href ? 'page' : undefined}
              style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' } as CSSProperties}
              className={`type-display border-b border-line py-4 text-[clamp(2.2rem,11vw,4rem)] transition-[translate,opacity] duration-700 ease-expo ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } ${pathname === item.href ? 'text-gold' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto grid gap-3">
          <Link href="/zakazivanje" onClick={close} className="btn btn-gold w-full">
            Zakažite termin
          </Link>
          <a href={site.phone.href} className="btn btn-ghost w-full">
            Pozovite {site.phone.display}
          </a>
        </div>
      </div>
    </>
  );
}
