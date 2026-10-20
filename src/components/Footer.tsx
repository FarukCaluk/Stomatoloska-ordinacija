import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/img/logo-light.png';
import { nav, site } from '@/lib/site';
import { HideOn } from './HideOn';
import { Lines } from './Lines';
import { CurrentYear, OpenStatus } from './OpenStatus';
import { Reveal } from './Reveal';

export function Footer() {
  return (
    <footer className="relative overflow-clip border-t border-line bg-panel">
      <HideOn paths={['/zakazivanje']}>
        <section className="shell pb-20 pt-[clamp(5rem,12vw,10rem)]" aria-labelledby="footer-cta">
          <Reveal>
            <h2 id="footer-cta" className="type-display text-[clamp(2rem,9vw,10.5rem)]">
              <Lines lines={['Prvi pregled', <span key="g" className="text-gold">je besplatan.</span>]} />
            </h2>
          </Reveal>
          <Reveal className="fade mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" delay={0.2}>
            <p className="max-w-[38ch] text-lg text-muted">
              Pošaljite zahtjev ili nas nazovite. Javićemo vam se u toku radnog vremena da dogovorimo termin.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/zakazivanje" className="btn btn-gold">
                Zakažite termin
              </Link>
              <a href={site.phone.href} className="btn btn-ghost">
                {site.phone.display}
              </a>
            </div>
          </Reveal>
        </section>
      </HideOn>

      <div className="shell grid gap-10 border-t border-line py-14 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src={logo} alt="Dr. Karić stomatološka ordinacija" className="h-12 w-auto" sizes="160px" />
          <p className="mt-5 max-w-[30ch] text-muted">
            Stomatološka ordinacija u Kaknju. Individualan pristup i iskrena briga za svaki osmijeh.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Adresa</p>
          <p>
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>
          <a href={site.directions} target="_blank" rel="noopener" className="link-line mt-2 inline-block text-muted hover:text-ink">
            Upute do ordinacije ↗
          </a>
        </div>
        <div>
          <p className="eyebrow mb-4">Radno vrijeme</p>
          <p>
            Ponedjeljak - petak
            <br />
            09:00 - 17:00
          </p>
          <OpenStatus className="mt-2 text-muted" />
        </div>
        <div>
          <p className="eyebrow mb-4">Kontakt</p>
          <a href={site.phone.href} className="link-line">
            {site.phone.display}
          </a>
          <div className="mt-2 flex gap-5 text-muted">
            <a href={site.instagram} target="_blank" rel="noopener" className="link-line hover:text-ink">
              Instagram
            </a>
            <a href={site.facebook} target="_blank" rel="noopener" className="link-line hover:text-ink">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-line py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <nav aria-label="Podnožje" className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="link-line hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/zakazivanje" className="link-line hover:text-ink">
            Zakažite termin
          </Link>
        </nav>
      </div>

      <p
        aria-hidden
        className="type-display type-outline pointer-events-none select-none whitespace-nowrap pb-[2vw] text-center text-[14.6vw] leading-[0.8] [--stroke:rgb(201_163_92/0.35)]"
      >
        Dr. Karić
      </p>
    </footer>
  );
}
