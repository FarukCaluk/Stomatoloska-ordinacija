import type { Metadata } from 'next';
import Image from 'next/image';
import rezultat1 from '@/assets/img/rezultat-1-800.webp';
import poslije2 from '@/assets/img/rezultat-2-poslije.webp';
import prije2 from '@/assets/img/rezultat-2-prije.webp';
import poslije3 from '@/assets/img/rezultat-3-poslije.webp';
import prije3 from '@/assets/img/rezultat-3-prije.webp';
import { CompareSlider } from '@/components/CompareSlider';
import { Lines } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
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

      <section className="shell grid items-start gap-6 lg:grid-cols-2" aria-label="Prije i poslije, klizači">
        <CompareSlider before={prije2} after={poslije2} alt="požutjeli prednji zubi nakon estetske rekonstrukcije" />
        <div className="lg:mt-[clamp(4rem,10vw,9rem)]">
          <CompareSlider before={prije3} after={poslije3} alt="neujednačeni prednji zubi nakon izrade novih krunica" />
        </div>
      </section>

      <section
        className="shell grid items-center gap-12 py-[clamp(6rem,14vw,12rem)] lg:grid-cols-[1.1fr_1fr] lg:gap-20"
        aria-labelledby="protetika-title"
      >
        <Reveal className="fade">
          <Image
            src={rezultat1}
            alt="Prije i poslije: istrošeni gornji zubi zamijenjeni nizom novih, ujednačenih krunica"
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
            className="h-auto w-full rounded-[1.75rem] border border-line"
          />
        </Reveal>
        <div>
          <Reveal>
            <h2 id="protetika-title" className="type-display text-[clamp(2.6rem,6vw,6.4rem)]">
              <Lines lines={['Novi', <span key="g" className="text-gold">osmijeh.</span>]} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.15}>
            <p className="mt-8 max-w-[40ch] text-lg text-muted">
              Krunice i mostovi rađeni po mjeri vraćaju i funkciju i izgled zuba. Gore je stanje na prvom pregledu,
              dolje završen rad.
            </p>
            <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-ghost mt-10">
              Više radova na Instagramu ↗
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
