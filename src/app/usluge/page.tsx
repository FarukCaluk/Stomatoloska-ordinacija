import type { Metadata } from 'next';
import Link from 'next/link';
import detalj from '@/assets/img/ordinacija-detalj-1440.webp';
import { Lines } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { Parallax } from '@/components/Parallax';
import { Reveal } from '@/components/Reveal';
import { ScrollyServices } from '@/components/ScrollyServices';
import { Steps } from '@/components/Steps';
import { services } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/usluge' },
  title: 'Usluge',
  description:
    'Pregledi i preventiva, estetska stomatologija, krunice i mostovi, liječenje zuba i kanala te izbjeljivanje u ordinaciji Dr. Karić u Kaknju.',
};

const steps = [
  { title: 'Razgovor', text: 'Kažete nam šta vas muči ili šta biste željeli promijeniti na svom osmijehu.' },
  { title: 'Pregled', text: 'Detaljno pregledamo zube i desni i pokažemo vam sve što smo uočili.' },
  {
    title: 'Plan liječenja',
    text: 'Dobijete jasan prijedlog terapije i troškova prije nego što bilo šta počne. Pregled je besplatan.',
  },
];

export default function UslugePage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['Usluge']}
        lead="Od redovne kontrole do potpuno novog osmijeha. Svaki plan liječenja pravimo tek nakon pregleda i razgovora s vama."
      />

      <div className="shell">
        <Parallax
          src={detalj}
          alt="Stomatološka stolica i radna površina u ordinaciji"
          sizes="100vw"
          preload
          className="aspect-[4/3] rounded-[1.75rem] border border-line sm:aspect-[21/9]"
        />
      </div>

      <section className="shell mt-[clamp(4rem,10vw,9rem)]" aria-label="Pregled usluga">
        <ScrollyServices services={services} />
      </section>

      <section
        className="shell grid gap-14 py-[clamp(6rem,14vw,12rem)] lg:grid-cols-[1fr_1.1fr] lg:gap-20"
        aria-labelledby="prvi-title"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <h2 id="prvi-title" className="type-display text-[clamp(2rem,6vw,6.4rem)]">
              <Lines lines={['Prvi', 'pregled', <span key="g" className="text-gold">je besplatan.</span>]} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.15}>
            <p className="mt-8 max-w-[38ch] text-lg text-muted">
              Bez obaveze i bez iznenađenja. Ovako izgleda prvi dolazak u ordinaciju.
            </p>
            <Link href="/zakazivanje" className="btn btn-gold mt-8">
              Zakažite termin
            </Link>
          </Reveal>
        </div>
        <Steps steps={steps} />
      </section>
    </main>
  );
}
