import type { Metadata } from 'next';
import Image from 'next/image';
import aldijana from '@/assets/img/aldijana.jpg';
import edina from '@/assets/img/dr-edina-karic.jpg';
import hodnik from '@/assets/img/hodnik.jpg';
import ordinacija1 from '@/assets/img/ordinacija-1.jpg';
import ordinacija1i2 from '@/assets/img/ordinacija-1-i-2.jpg';
import ordinacija2 from '@/assets/img/ordinacija-2.jpg';
import ordinacija2Pult from '@/assets/img/ordinacija-2-pult.jpg';
import rendgen from '@/assets/img/rendgen.jpg';
import timZajedno from '@/assets/img/tim-zajedno.jpg';
import ulaz from '@/assets/img/ulaz.jpg';
import { HorizontalGallery } from '@/components/HorizontalGallery';
import { Lines } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  alternates: { canonical: '/o-nama' },
  title: 'O nama',
  description: 'Upoznajte Dr. Edinu Karić, sestru Aldijanu i prostor stomatološke ordinacije u Kaknju.',
};

const space = [
  { src: ulaz, alt: 'Ulaz u ordinaciju sa natpisom Dr. Karić, Branilaca 3', caption: 'Ulaz, Branilaca 3' },
  { src: hodnik, alt: 'Hodnik ordinacije sa staklenim vratima i recepcijom', caption: 'Hodnik i recepcija' },
  { src: ordinacija1, alt: 'Ordinacija 1 sa stomatološkom stolicom i dugim radnim pultom', caption: 'Ordinacija 1' },
  { src: ordinacija2, alt: 'Ordinacija 2 sa stomatološkom stolicom ispred mramornog zida', caption: 'Ordinacija 2' },
  { src: ordinacija2Pult, alt: 'Ordinacija 2, stolica i radni pult sa slikama zuba na zidu', caption: 'Ordinacija 2, radni pult' },
  { src: ordinacija1i2, alt: 'Ordinacija 1 i ordinacija 2, odvojene staklenom pregradom', caption: 'Ordinacija 1 i 2' },
  { src: rendgen, alt: 'Pacijentica na snimanju digitalnim panoramskim rendgenom', caption: 'Digitalni rendgen' },
];

export default function ONamaPage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['O nama']}
        lead="Pružamo sveobuhvatnu i profesionalnu dentalnu zaštitu s naglaskom na udobnost i zadovoljstvo pacijenata. Posvećeni smo individualnom pristupu i kvalitetnoj komunikaciji."
      />

      <section className="shell grid gap-x-16 gap-y-20 lg:grid-cols-12" aria-label="Tim">
        <div className="lg:col-span-6">
          <Image
            src={edina}
            alt="Dr. Edina Karić u ordinaciji"
            sizes="(min-width: 1024px) 45vw, 100vw"
            preload
            placeholder="blur"
            className="h-auto w-full rounded-[1.75rem] border border-line"
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

        <div className="lg:col-span-6 lg:pt-[clamp(6rem,14vw,14rem)]">
          <Image
            src={aldijana}
            alt="Aldijana na recepciji ordinacije"
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            className="h-auto w-full rounded-[1.75rem] border border-line"
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
        <Image
          src={timZajedno}
          alt="Dr. Edina Karić i sestra Aldijana nasmijane u hodniku ordinacije"
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          className="h-auto w-full rounded-[1.75rem] border border-line lg:col-span-6"
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
