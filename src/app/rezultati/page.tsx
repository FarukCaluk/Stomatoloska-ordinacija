import type { Metadata } from 'next';
import { CompareSlider } from '@/components/CompareSlider';
import { Lines } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { results } from '@/lib/results';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/rezultati' },
  title: 'Rezultati',
  description: 'Prije i poslije: stvarni radovi iz stomatološke ordinacije Dr. Karić u Kaknju.',
};

export default function RezultatiPage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['Rezultati']}
        lead="Stvarni pacijenti i radovi iz naše ordinacije, bez filtera i retuša. Povucite klizač i pogledajte razliku."
      />

      <div className="shell grid gap-[clamp(5rem,10vw,9rem)] pb-[clamp(6rem,14vw,12rem)]">
        {results.map((r, i) => (
          <section
            key={r.title}
            className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
            aria-labelledby={`rezultat-${i}`}
          >
            <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
              <CompareSlider result={r} eager={i === 0} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={`rezultat-${i}`} className="type-display mt-4 text-[clamp(1.75rem,3.6vw,3.6rem)]">
                  <Lines lines={[r.title]} />
                </h2>
              </Reveal>
              <Reveal className="fade" delay={0.1}>
                <p className="mt-6 max-w-[40ch] text-lg text-muted">{r.text}</p>
                {i === results.length - 1 && (
                  <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-ghost mt-8">
                    Više radova na Instagramu ↗
                  </a>
                )}
              </Reveal>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
