import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { priceGroups } from '@/lib/prices';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/cijene' },
  title: 'Cijene',
  description:
    'Okvirne cijene stomatoloških usluga u ordinaciji Dr. Karić u Kaknju: pregledi, plombe, liječenje kanala, krunice, fasete i izbjeljivanje. Prvi pregled je besplatan.',
};

export default function CijenePage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['Cijene']}
        lead="Okvirne cijene naših usluga. Tačnu cijenu i plan liječenja dobijete nakon pregleda, prije nego što bilo šta počne."
      />

      <section className="shell grid gap-6 lg:grid-cols-2 lg:gap-8" aria-label="Cjenovnik">
        {priceGroups.map((group, gi) => (
          <Reveal key={group.id} className="fade" delay={gi % 2 ? 0.08 : 0}>
            <section
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="h-full rounded-[1.75rem] border border-line bg-panel p-6 sm:p-8 lg:p-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-semibold text-gold">{String(gi + 1).padStart(2, '0')}</span>
                <h2 id={`${group.id}-title`} className="type-display text-[clamp(1.5rem,2.6vw,2.4rem)]">
                  {group.title}
                </h2>
              </div>
              <dl className="mt-6 divide-y divide-line">
                {group.rows.map((row) => (
                  <div key={row.name} className="flex items-baseline justify-between gap-6 py-4">
                    <dt>
                      {row.name}
                      {row.note && <span className="mt-0.5 block text-sm text-muted">{row.note}</span>}
                    </dt>
                    <dd className={`shrink-0 text-right font-semibold tabular-nums ${row.price === 'Besplatno' ? 'text-gold' : ''}`}>
                      {row.price}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>
        ))}
      </section>

      <section className="shell py-[clamp(4rem,10vw,8rem)]" aria-label="Napomena o cijenama">
        <div className="grid gap-8 rounded-[1.75rem] border border-gold/40 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="text-[clamp(1.375rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em]">
              Cijena zavisi od stanja zuba, zato prvo pregled.
            </h2>
            <p className="mt-4 max-w-[52ch] text-muted">
              Navedene cijene su okvirne. Na besplatnom prvom pregledu dobijete tačan plan liječenja i cijenu za svaki
              korak, bez iznenađenja na kraju.
            </p>
          </div>
          <div className="grid gap-3 sm:flex sm:flex-wrap lg:justify-end">
            <Link href="/zakazivanje" className="btn btn-gold">
              Zakažite termin
            </Link>
            <a href={site.phone.href} className="btn btn-ghost">
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
