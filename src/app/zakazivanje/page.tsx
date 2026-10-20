import type { Metadata } from 'next';
import { AppointmentForm } from '@/components/AppointmentForm';
import { OpenStatus } from '@/components/OpenStatus';
import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/zakazivanje' },
  title: 'Zakažite termin',
  description: 'Pošaljite zahtjev za termin u stomatološkoj ordinaciji Dr. Karić u Kaknju. Prvi pregled je besplatan.',
};

export default function ZakazivanjePage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['Zakažite', <span key="g" className="text-gold">termin</span>]}
        lead="Prvi pregled je besplatan. Ostavite podatke i javićemo vam se u toku radnog vremena da potvrdimo termin."
      />

      <section className="shell grid items-start gap-10 pb-[clamp(5rem,12vw,10rem)] lg:grid-cols-[1.6fr_1fr] lg:gap-16" aria-label="Zahtjev za termin">
        <AppointmentForm />
        <aside className="grid gap-8 lg:sticky lg:top-28">
          <div>
            <p className="eyebrow mb-3">Hitno?</p>
            <a href={site.phone.href} className="type-display text-[clamp(1.75rem,3.6vw,3.4rem)] text-gold transition-colors hover:text-ink">
              {site.phone.display}
            </a>
          </div>
          <div className="border-t border-line pt-8 text-lg">
            <p className="eyebrow mb-3">Radno vrijeme</p>
            <p>Ponedjeljak - petak, 09:00 - 17:00</p>
            <OpenStatus className="mt-2 text-base text-muted" />
          </div>
          <div className="border-t border-line pt-8 text-lg">
            <p className="eyebrow mb-3">Adresa</p>
            <p>
              {site.address.street}, {site.address.zip} {site.address.city}
            </p>
            <a href={site.directions} target="_blank" rel="noopener" className="link-line mt-1 inline-block text-muted hover:text-ink">
              Upute do ordinacije ↗
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
