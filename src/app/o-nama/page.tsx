import type { Metadata } from 'next';
import aldijana from '@/assets/img/aldijana-1440.webp';
import edina from '@/assets/img/dr-edina-karic-1440.webp';
import hodnik from '@/assets/img/hodnik-1440.webp';
import ordinacija1 from '@/assets/img/ordinacija-1-1440.webp';
import ordinacija2 from '@/assets/img/ordinacija-2-1440.webp';
import recepcija from '@/assets/img/recepcija-1440.webp';
import timPacijent from '@/assets/img/tim-pacijent.webp';
import ulaz from '@/assets/img/ulaz-1440.webp';
import { HorizontalGallery } from '@/components/HorizontalGallery';
import { Lines } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { Parallax } from '@/components/Parallax';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  alternates: { canonical: '/o-nama' },
  title: 'O nama',
  description: 'Upoznajte Dr. Edinu Karić, sestru Aldijanu i prostor stomatološke ordinacije u Kaknju.',
};

const space = [
  { src: ulaz, alt: 'Ulaz u ordinaciju noću, osvijetljen natpis Dr. Karić', caption: 'Ulaz, Branilaca 3' },
  { src: recepcija, alt: 'Recepcija i čekaonica s foteljama', caption: 'Recepcija i čekaonica' },
  { src: hodnik, alt: 'Hodnik ordinacije sa staklenim vratima', caption: 'Hodnik' },
  { src: ordinacija1, alt: 'Ordinacija 1 sa stomatološkom stolicom i ekranima', caption: 'Ordinacija 1' },
  { src: ordinacija2, alt: 'Ordinacija 2 sa radnim pultom i ogledalima', caption: 'Ordinacija 2' },
];

export default function ONamaPage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['O nama']}
        lead="Pružamo sveobuhvatnu i profesionalnu dentalnu zaštitu s naglaskom na udobnost i zadovoljstvo pacijenata. Posvećeni smo individualnom pristupu i kvalitetnoj komunikaciji."
      />

      <section className="shell grid gap-x-16 gap-y-20 lg:grid-cols-12" aria-label="Tim">
        <div className="lg:col-span-7">
          <Parallax
            src={edina}
            alt="Dr. Edina Karić u ordinaciji"
            sizes="(min-width: 1024px) 55vw, 100vw"
            position="50% 15%"
            preload
            className="aspect-[4/5] rounded-[1.75rem] border border-line sm:aspect-[10/9]"
          />
          <Reveal>
            <h2 className="type-display mt-10 text-[clamp(1.75rem,5vw,5.2rem)]">
              <Lines lines={['Dr. Edina Karić']} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.1}>
            <p className="mt-4 font-semibold text-gold">Doktorica stomatologije</p>
            <p className="mt-6 max-w-[46ch] text-lg text-muted">
              Spoj stručnosti, predanosti i iskrene brige za pacijente. Svaki osmijeh i svaki detalj njenog rada
              govore o povjerenju koje gradi godinama.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-[clamp(8rem,22vw,22rem)]">
          <Parallax
            src={aldijana}
            alt="Aldijana na recepciji ordinacije"
            sizes="(min-width: 1024px) 40vw, 100vw"
            position="50% 25%"
            className="aspect-[4/5] rounded-[1.75rem] border border-line"
          />
          <Reveal>
            <h2 className="type-display mt-10 text-[clamp(1.75rem,5vw,5.2rem)]">
              <Lines lines={['Aldijana']} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.1}>
            <p className="mt-4 font-semibold text-gold">Stomatološka sestra</p>
            <p className="mt-6 max-w-[40ch] text-lg text-muted">
              Topao osmijeh, ljubazna riječ i osjećaj sigurnosti od prvog koraka u ordinaciju.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="shell mt-[clamp(6rem,14vw,12rem)] grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
        aria-labelledby="zajedno-title"
      >
        <Parallax
          src={timPacijent}
          alt="Dr. Edina Karić i sestra Aldijana uz nasmijanu pacijenticu u stomatološkoj stolici"
          sizes="(min-width: 1024px) 45vw, 100vw"
          position="50% 35%"
          className="aspect-[4/5] rounded-[1.75rem] border border-line lg:col-span-6"
        />
        <div className="lg:col-span-6">
          <Reveal>
            <h2 id="zajedno-title" className="type-display text-[clamp(1.75rem,5vw,5.2rem)]">
              <Lines lines={['Zajedno,', <span key="g" className="text-gold">uz vas.</span>]} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.1}>
            <p className="mt-6 max-w-[40ch] text-lg text-muted">
              Zajedno u još jednoj uspješnoj godini. Hvala pacijentima i saradnicima na povjerenju i podršci.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mt-[clamp(5rem,12vw,10rem)]">
        <HorizontalGallery
          items={space}
          intro={
            <>
              <p className="eyebrow">Ordinacija</p>
              <h2 className="type-display mt-6 text-[clamp(1.75rem,4.4vw,4.6rem)]">
                Prostor <span className="text-gold">za mir.</span>
              </h2>
              <p className="mt-6 max-w-[32ch] text-lg text-muted">
                Svijetle ordinacije i mirna čekaonica, uređeni da se kod nas osjećate opušteno.
              </p>
            </>
          }
        />
      </div>
    </main>
  );
}
