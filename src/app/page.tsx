import type { Metadata } from 'next';
import { getImageProps } from 'next/image';
import Link from 'next/link';
import pregled from '@/assets/img/dr-karic-pregled.webp';
import timPacijent from '@/assets/img/tim-pacijent.webp';
import poslije from '@/assets/img/rezultat-2-poslije.webp';
import prije from '@/assets/img/rezultat-2-prije.webp';
import { CompareSlider } from '@/components/CompareSlider';
import { Counter } from '@/components/Counter';
import { Lines } from '@/components/Lines';
import { Marquee } from '@/components/Marquee';
import { Parallax } from '@/components/Parallax';
import { Reveal } from '@/components/Reveal';
import { ScrubText } from '@/components/ScrubText';
import { AnatomySection } from '@/components/AnatomySection';
import { HeroTooth } from '@/components/three/HeroTooth';
import { PostCard } from '@/components/PostCard';
import { posts } from '@/lib/posts';
import { priceGroups } from '@/lib/prices';
import { reviews, site } from '@/lib/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const { props: pregledImg } = getImageProps({
  src: pregled,
  alt: 'Dr. Edina Karić pregleda pacijenticu u ordinaciji',
  fill: true,
  sizes: '(min-width: 640px) 36rem, calc(100vw - 2rem)',
  loading: 'eager',
  fetchPriority: 'high',
  placeholder: 'blur',
});

const credentials = [
  'Diplomirala na Stomatološkom fakultetu Univerziteta u Sarajevu 2014.',
  'Članica Zdravstvenog savjeta Općine Kakanj',
  'Autorica stručnog teksta u časopisu dentBiH',
  'Učesnica brojnih stomatoloških kongresa i kurseva',
];

// A few anchor prices for the teaser; the full list lives on /cijene.
const keyPrices = ['Prvi pregled i savjetovanje', 'Uklanjanje kamenca i poliranje', 'Kompozitna (bijela) plomba', 'Cirkonijska krunica']
  .map((name) => priceGroups.flatMap((g) => g.rows).find((r) => r.name === name)!)
  .filter(Boolean);

const facts = [
  { big: '5,0', small: 'Ocjena na Googleu' },
  { big: '0 KM', small: 'Prvi pregled i savjet' },
  { big: '09 - 17', small: 'Ponedjeljak do petak' },
  { big: 'Kakanj', small: 'Branilaca 3' },
];

export default function Home() {
  return (
    <main id="sadrzaj">
      <section className="relative isolate overflow-clip lg:min-h-[100svh]" aria-labelledby="hero-title">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-[radial-gradient(55%_50%_at_66%_40%,rgb(201_163_92/0.18),transparent_70%)] lg:block"
        />
        <HeroTooth className="hidden lg:absolute lg:inset-y-0 lg:left-[28%] lg:right-[-6%] lg:top-0 lg:block" />

        {/* Phones: plain document flow with fixed sizes, so nothing jumps when the browser bar hides */}
        <div className="shell relative flex flex-col pb-14 pt-24 lg:min-h-[100svh] lg:justify-end lg:pb-14 lg:pt-32">
          <p className="eyebrow hero-fade text-center lg:text-left">Stomatološka ordinacija, Kakanj</p>
          <h1
            id="hero-title"
            className="type-display lines-hero mt-4 text-center text-[clamp(2.5rem,10.6vw,12rem)] lg:mt-6 lg:text-left lg:mix-blend-difference"
          >
            <Lines lines={['Osmijeh', 'koji traje.']} />
          </h1>
          {/* Phones: a real treatment photo with the Google rating instead of the 3D tooth.
              The empty <source> keeps large screens from downloading it at all. */}
          <figure
            className="hero-fade relative mx-auto mt-7 aspect-square w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-line lg:hidden"
            style={{ '--d': '0.05s' } as React.CSSProperties}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet={BLANK} />
              <img {...pregledImg} alt={pregledImg.alt} className="object-cover object-[50%_52%]" />
            </picture>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgb(0_0_0/0.55),transparent)]" />
            <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-sm text-ink backdrop-blur-md">
              <span className="font-semibold text-gold">★ 5,0</span> na Googleu
            </figcaption>
          </figure>
          <div className="relative mt-7 flex flex-col gap-7 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:border-t lg:border-line lg:pt-8">
            <p className="hero-fade mx-auto max-w-[38ch] text-center text-base text-muted sm:text-lg lg:mx-0 lg:text-left lg:text-xl" style={{ '--d': '0.1s' } as React.CSSProperties}>
              Pregledi, estetika i protetika uz individualan pristup i savremenu opremu. Prvi pregled je besplatan.
            </p>
            <div className="hero-fade grid gap-3 sm:flex sm:flex-wrap" style={{ '--d': '0.2s' } as React.CSSProperties}>
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
          className="max-w-[24ch] text-[clamp(1.5rem,4.6vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.03em]"
          text="Zdrav i lijep osmijeh počinje pravilnom brigom i redovnim pregledima. Naš cilj je da se kod nas osjećate sigurno i samopouzdano, pri svakom dolasku."
        />
      </section>

      <AnatomySection />
      <div className="shell flex justify-end pt-4">
        <Link href="/usluge" className="link-line font-semibold">
          Sve usluge →
        </Link>
      </div>

      <section className="shell mt-[clamp(6rem,14vw,12rem)] grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20" aria-labelledby="rezultati-title">
        <div>
          <p className="eyebrow">Prije i poslije</p>
          <Reveal>
            <h2 id="rezultati-title" className="type-display mt-6 text-[clamp(2rem,6.8vw,7rem)]">
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
          src={timPacijent}
          alt="Dr. Edina Karić i sestra Aldijana uz nasmijanu pacijenticu u stomatološkoj stolici"
          sizes="(min-width: 1024px) 45vw, 100vw"
          position="50% 35%"
          className="aspect-[4/5] rounded-[1.75rem] border border-line"
        />
        <div>
          <Reveal>
            <h2 id="tim-title" className="type-display text-[clamp(2rem,5.6vw,6rem)]">
              <Lines lines={['Dr. Edina', 'Karić']} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.15}>
            <p className="mt-4 font-semibold text-gold">Doktorica stomatologije</p>
            <p className="mt-8 max-w-[30ch] text-[clamp(1.25rem,2.2vw,2rem)] font-medium leading-snug tracking-[-0.02em]">
              Spoj stručnosti, predanosti i iskrene brige za pacijente.
            </p>
            <p className="mt-6 max-w-[44ch] text-lg text-muted">
              Uz sestru Aldijanu brine o svakom pacijentu smireno, ljubazno i bez žurbe, od prvog pregleda do
              završnog rada.
            </p>
            <ul className="mt-8 grid gap-3 border-t border-line pt-8">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
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
            <Counter value={5} className="type-display block text-[clamp(4.5rem,19vw,17rem)] leading-[0.8] text-gold" />
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
                        ? 'text-[clamp(1.25rem,2.4vw,2.1rem)] font-medium leading-snug tracking-[-0.02em]'
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

      <section className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20" aria-labelledby="cijene-title">
        <div>
          <Reveal>
            <h2 id="cijene-title" className="type-display text-[clamp(2rem,5.6vw,6rem)]">
              <Lines lines={['Bez', <span key="g" className="text-gold">iznenađenja.</span>]} />
            </h2>
          </Reveal>
          <Reveal className="fade" delay={0.15}>
            <p className="mt-6 max-w-[40ch] text-lg text-muted">
              Okvirne cijene su javne, a tačnu cijenu svakog koraka dobijete na besplatnom prvom pregledu, prije nego
              što bilo šta počne.
            </p>
            <Link href="/cijene" className="btn btn-ghost mt-8">
              Cijeli cjenovnik
            </Link>
          </Reveal>
        </div>
        <Reveal className="fade">
          <dl className="divide-y divide-line rounded-[1.75rem] border border-line bg-panel px-6 py-2 sm:px-8">
            {keyPrices.map((row) => (
              <div key={row.name} className="flex items-baseline justify-between gap-6 py-5">
                <dt>
                  {row.name}
                  {row.note && <span className="mt-0.5 block text-sm text-muted">{row.note}</span>}
                </dt>
                <dd className={`shrink-0 font-semibold tabular-nums ${row.price === 'Besplatno' ? 'text-gold' : ''}`}>
                  {row.price}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="shell py-[clamp(6rem,14vw,12rem)]" aria-labelledby="savjeti-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 id="savjeti-title" className="type-display text-[clamp(2rem,5.6vw,6rem)]">
              <Lines lines={['Savjeti']} />
            </h2>
          </Reveal>
          <Link href="/novosti" className="link-line font-semibold">
            Sve novosti →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} className="fade" delay={i * 0.06}>
              <PostCard post={p} heading="h3" />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
