import type { Metadata } from 'next';
import Link from 'next/link';
import edina from '@/assets/img/dr-edina-karic-1440.webp';
import poslije from '@/assets/img/rezultat-2-poslije.webp';
import prije from '@/assets/img/rezultat-2-prije.webp';
import { CompareSlider } from '@/components/CompareSlider';
import { Counter } from '@/components/Counter';
import { Lines } from '@/components/Lines';
import { Marquee } from '@/components/Marquee';
import { Parallax } from '@/components/Parallax';
import { Reveal } from '@/components/Reveal';
import { ScrubText } from '@/components/ScrubText';
import { ServiceStack } from '@/components/ServiceStack';
import { HeroTooth } from '@/components/three/HeroTooth';
import { reviews, services, site } from '@/lib/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const facts = [
  { big: '5,0', small: 'Ocjena na Googleu' },
  { big: '0 KM', small: 'Prvi pregled i savjet' },
  { big: '09 - 17', small: 'Ponedjeljak do petak' },
  { big: 'Kakanj', small: 'Branilaca 3' },
];

export default function Home() {
  return (
    <main id="sadrzaj">
      <section className="relative isolate min-h-[100svh] overflow-clip" aria-labelledby="hero-title">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_66%_40%,rgb(201_163_92/0.18),transparent_70%)]"
        />
        <HeroTooth className="absolute inset-x-0 top-[7svh] h-[56svh] lg:inset-y-0 lg:left-[28%] lg:right-[-6%] lg:top-0 lg:h-auto" />

        <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32 lg:pb-14">
          <p className="eyebrow hero-fade max-sm:hidden">Stomatološka ordinacija, Kakanj</p>
          <h1
            id="hero-title"
            className="type-display lines-hero mt-6 text-[clamp(3.3rem,10.6vw,12rem)] mix-blend-difference"
          >
            <Lines lines={['Osmijeh', 'koji traje.']} />
          </h1>
          <div className="mt-10 flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="hero-fade max-w-[38ch] text-lg text-muted lg:text-xl" style={{ '--d': '0.1s' } as React.CSSProperties}>
              Pregledi, estetika i protetika uz individualan pristup i savremenu opremu. Prvi pregled je besplatan.
            </p>
            <div className="hero-fade flex flex-wrap gap-3" style={{ '--d': '0.2s' } as React.CSSProperties}>
              <Link href="/zakazivanje" className="btn btn-gold">
                Zakažite termin
              </Link>
              <Link href="/usluge" className="btn btn-ghost">
                Pogledajte usluge
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Ukratko" className="shell">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.small} className="flex flex-col-reverse bg-bg p-5 sm:p-8">
              <dt className="mt-2 text-muted">{f.small}</dt>
              <dd className="type-display text-[clamp(1.25rem,2.6vw,2.6rem)]">{f.big}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-[clamp(4rem,9vw,8rem)]">
        <Marquee items={['Pregledi', 'Estetika', 'Krunice', 'Mostovi', 'Fasete', 'Izbjeljivanje', 'Kanali']} />
      </div>

      <section className="shell py-[clamp(6rem,14vw,12rem)]" aria-label="O ordinaciji">
        <ScrubText
          className="max-w-[24ch] text-[clamp(2rem,4.6vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.03em]"
          text="Zdrav i lijep osmijeh počinje pravilnom brigom i redovnim pregledima. Naš cilj je da se kod nas osjećate sigurno i samopouzdano, pri svakom dolasku."
        />
      </section>

      <section className="shell" aria-labelledby="usluge-title">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 id="usluge-title" className="type-display text-[clamp(3rem,9.5vw,10rem)]">
              <Lines lines={['Šta', 'radimo']} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.15}>
            <p className="max-w-[34ch] text-lg text-muted">
              Od redovne kontrole do potpuno novog osmijeha. Plan liječenja pravimo tek nakon pregleda i razgovora s
              vama.
            </p>
            <Link href="/usluge" className="link-line mt-5 inline-block font-semibold">
              Sve usluge →
            </Link>
          </Reveal>
        </div>
        <ServiceStack services={services} />
      </section>

      <section className="shell mt-[clamp(6rem,14vw,12rem)] grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20" aria-labelledby="rezultati-title">
        <div>
          <p className="eyebrow">Prije i poslije</p>
          <Reveal>
            <h2 id="rezultati-title" className="type-display mt-6 text-[clamp(2.8rem,6.8vw,7rem)]">
              <Lines lines={['Razlika', <span key="g" className="text-gold">se vidi.</span>]} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.15}>
            <p className="mt-8 max-w-[40ch] text-lg text-muted">
              Povucite klizač preko fotografije. Stvarni pacijenti, stvarni radovi iz naše ordinacije, bez filtera.
            </p>
            <Link href="/rezultati" className="btn btn-ghost mt-8">
              Svi rezultati
            </Link>
          </Reveal>
        </div>
        <CompareSlider before={prije} after={poslije} alt="prednji zubi nakon estetskog rada" />
      </section>

      <section className="shell mt-[clamp(6rem,14vw,12rem)] grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20" aria-labelledby="tim-title">
        <Parallax
          src={edina}
          alt="Dr. Edina Karić u ordinaciji"
          sizes="(min-width: 1024px) 45vw, 100vw"
          position="50% 20%"
          className="aspect-[4/5] rounded-[1.75rem] border border-line"
        />
        <div>
          <Reveal>
            <h2 id="tim-title" className="type-display text-[clamp(2.6rem,5.6vw,6rem)]">
              <Lines lines={['Dr. Edina', 'Karić']} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.15}>
            <p className="mt-4 font-semibold text-gold">Doktorica stomatologije</p>
            <p className="mt-8 max-w-[30ch] text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-snug tracking-[-0.02em]">
              Spoj stručnosti, predanosti i iskrene brige za pacijente.
            </p>
            <p className="mt-6 max-w-[44ch] text-lg text-muted">
              Uz sestru Aldijanu brine o svakom pacijentu smireno, ljubazno i bez žurbe, od prvog pregleda do
              završnog rada.
            </p>
            <Link href="/o-nama" className="btn btn-ghost mt-10">
              Upoznajte tim
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="shell py-[clamp(6rem,14vw,12rem)]" aria-labelledby="recenzije-title">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 id="recenzije-title" className="sr-only">
              Recenzije pacijenata
            </h2>
            <Counter value={5} className="type-display block text-[clamp(7rem,19vw,17rem)] leading-[0.8] text-gold" />
            <p className="mt-6 text-2xl tracking-[0.2em] text-gold" aria-label="5 od 5 zvjezdica">
              ★★★★★
            </p>
            <p className="mt-3 text-lg text-muted">Ocjena na Googleu, na osnovu 9 recenzija.</p>
            <a href={site.reviewsUrl} target="_blank" rel="noopener" className="link-line mt-6 inline-block font-semibold">
              Pročitajte sve recenzije ↗
            </a>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line">
            {reviews.map((r, i) => (
              <Reveal key={r.name} className="fade bg-bg p-7 sm:p-10" delay={i * 0.08}>
                <figure>
                  <blockquote
                    className={
                      i === 0
                        ? 'text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium leading-snug tracking-[-0.02em]'
                        : 'text-xl leading-snug'
                    }
                  >
                    „{r.quote}“
                  </blockquote>
                  <figcaption className="mt-5 text-muted">{r.name}, Google recenzija</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
