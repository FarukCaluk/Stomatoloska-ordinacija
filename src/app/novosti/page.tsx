import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { formatDate, posts, readingTime } from '@/lib/posts';

export const metadata: Metadata = {
  alternates: { canonical: '/novosti' },
  title: 'Novosti i savjeti',
  description:
    'Savjeti stomatologa i odgovori na najčešća pitanja pacijenata: pregledi, liječenje kanala, fasete, krunice, izbjeljivanje i zdravlje desni.',
};

export default function NovostiPage() {
  return (
    <main id="sadrzaj">
      <PageHero
        title={['Novosti']}
        lead="Savjeti i odgovori na pitanja koja nam pacijenti najčešće postavljaju, kratko i bez stručnog žargona."
      />

      <section className="shell grid gap-5 pb-[clamp(5rem,12vw,10rem)] md:grid-cols-2 lg:grid-cols-3" aria-label="Svi članci">
        {posts.map((post, i) => (
          <Reveal key={post.slug} className={`fade ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`} delay={(i % 3) * 0.06}>
            <Link
              href={`/novosti/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-panel transition-colors duration-300 hover:border-gold/60"
            >
              {post.image && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? ''}
                    fill
                    preload={i === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 100vw, 100vw"
                    className="object-cover object-[50%_30%] transition-transform duration-700 ease-expo group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-sm text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden> / </span>
                {readingTime(post)} min čitanja
              </p>
              <h2
                className={`mt-5 font-semibold leading-tight tracking-[-0.02em] ${
                  i === 0 ? 'text-[clamp(1.5rem,2.4vw,2rem)]' : 'text-[clamp(1.25rem,1.8vw,1.6rem)]'
                }`}
              >
                {post.title}
              </h2>
              <p className="mt-4 text-muted">{post.excerpt}</p>
              <span className="mt-auto pt-8 font-semibold text-gold">
                Pročitajte više <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
