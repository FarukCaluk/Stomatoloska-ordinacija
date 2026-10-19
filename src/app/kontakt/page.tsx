import type { Metadata } from 'next';
import Link from 'next/link';
import ulaz from '@/assets/img/ulaz-1440.webp';
import { OpenStatus } from '@/components/OpenStatus';
import { PageHero } from '@/components/PageHero';
import { Parallax } from '@/components/Parallax';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/kontakt' },
  title: 'Kontakt',
  description: 'Branilaca 3, 72240 Kakanj. Telefon 061 608 483. Radno vrijeme ponedjeljak do petak od 09:00 do 17:00.',
};

export default function KontaktPage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['Kontakt']}
        lead={
          <>
            Nazovite nas ili{' '}
            <Link href="/zakazivanje" className="text-ink underline decoration-gold underline-offset-4">
              pošaljite zahtjev za termin
            </Link>
            . Prvi pregled je besplatan.
          </>
        }
      />

      <section className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20" aria-label="Podaci za kontakt">
        <div>
          <a
            href={site.phone.href}
            className="type-display block whitespace-nowrap text-[clamp(2.1rem,4.2vw,5rem)] text-gold transition-colors hover:text-ink"
          >
            {site.phone.display}
          </a>
          <dl className="mt-12 grid gap-8 border-t border-line pt-10 text-lg sm:grid-cols-2">
            <div>
              <dt className="eyebrow mb-3">Adresa</dt>
              <dd>
                {site.address.street}, {site.address.zip} {site.address.city}
                <br />
                <a href={site.directions} target="_blank" rel="noopener" className="link-line text-muted hover:text-ink">
                  Upute do ordinacije ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-3">Radno vrijeme</dt>
              <dd>
                Ponedjeljak - petak, 09:00 - 17:00
                <br />
                <span className="text-muted">Subota i nedjelja zatvoreno</span>
                <OpenStatus className="mt-2 flex text-base text-muted" />
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-3">Pratite nas</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-1">
                <a href={site.instagram} target="_blank" rel="noopener" className="link-line">
                  Instagram
                </a>
                <a href={site.facebook} target="_blank" rel="noopener" className="link-line">
                  Facebook
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="min-h-[24rem] overflow-hidden rounded-[1.75rem] border border-line bg-panel">
          <iframe
            title="Lokacija ordinacije na karti"
            src={site.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full min-h-[24rem] [filter:invert(0.9)_hue-rotate(180deg)_grayscale(0.85)_contrast(0.9)]"
          />
        </div>
      </section>

      <section className="shell py-[clamp(5rem,12vw,10rem)]" aria-label="Ulaz u ordinaciju">
        <Parallax
          src={ulaz}
          alt="Ulaz u ordinaciju noću, osvijetljen natpis Dr. Karić"
          sizes="100vw"
          className="aspect-[4/3] rounded-[1.75rem] border border-line sm:aspect-[21/9]"
        />
        <p className="mt-5 text-muted">Ulaz u ordinaciju, Branilaca 3, Kakanj.</p>
      </section>
    </main>
  );
}
