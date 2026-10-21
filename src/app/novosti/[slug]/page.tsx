import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, posts, readingTime } from '@/lib/posts';
import { site } from '@/lib/site';
import { siteUrl } from '@/lib/url';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/novosti/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/novosti/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

/** Body lines: "## " is a sub-heading, consecutive "- " lines form a list, the rest are paragraphs. */
function Body({ lines }: { lines: string[] }) {
  const blocks: (string | string[])[] = [];
  for (const line of lines) {
    if (line.startsWith('- ')) {
      const last = blocks.at(-1);
      if (Array.isArray(last)) last.push(line.slice(2));
      else blocks.push([line.slice(2)]);
    } else blocks.push(line);
  }
  return blocks.map((b, i) =>
    Array.isArray(b) ? (
      <ul key={i} className="mt-5 grid gap-2.5">
        {b.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    ) : b.startsWith('## ') ? (
      <h2 key={i} className="mt-12 text-[clamp(1.375rem,2.2vw,1.875rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
        {b.slice(3)}
      </h2>
    ) : (
      <p key={i} className="mt-5">
        {b}
      </p>
    ),
  );
}

export default async function NovostPage({ params }: PageProps<'/novosti/[slug]'>) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${siteUrl}/novosti/${post.slug}`,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <main id="sadrzaj">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="shell pb-[clamp(4rem,10vw,8rem)] pt-[clamp(7rem,14vw,11rem)]">
        <div className="mx-auto max-w-[44rem]">
          <Link href="/novosti" className="link-line text-sm font-semibold text-gold">
            ← Sve novosti
          </Link>
          <p className="hero-fade mt-8 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden> / </span>
            {readingTime(post)} min čitanja
          </p>
          <h1 className="hero-fade mt-4 text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {post.title}
          </h1>
          <p className="hero-fade mt-6 border-b border-line pb-8 text-lg text-muted sm:text-xl">{post.excerpt}</p>
          {post.image && (
            <Image
              src={post.image}
              alt={post.imageAlt ?? ''}
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 44rem, 100vw"
              className="mt-10 h-auto w-full rounded-[1.75rem] border border-line"
            />
          )}

          <div className="text-[1.0625rem] leading-relaxed text-ink/85 sm:text-lg">
            <Body lines={post.body} />
          </div>

          <aside className="mt-14 rounded-[1.75rem] border border-gold/40 p-6 sm:p-8">
            <p className="text-xl font-semibold tracking-[-0.02em]">Imate pitanje o svojim zubima?</p>
            <p className="mt-2 text-muted">
              Prvi pregled je besplatan. Ovaj tekst je informativan i ne zamjenjuje pregled kod stomatologa.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Link href="/zakazivanje" className="btn btn-gold">
                Zakažite termin
              </Link>
              <a href={site.phone.href} className="btn btn-ghost">
                {site.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </article>

      <section className="shell pb-[clamp(5rem,12vw,10rem)]" aria-labelledby="jos-title">
        <h2 id="jos-title" className="type-display text-[clamp(1.5rem,3vw,2.6rem)]">
          Pročitajte još
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/novosti/${p.slug}`}
              className="group rounded-[1.75rem] border border-line bg-panel p-6 transition-colors duration-300 hover:border-gold/60 sm:p-8"
            >
              <p className="text-sm text-muted">{formatDate(p.date)}</p>
              <p className="mt-3 text-xl font-semibold leading-tight tracking-[-0.02em]">{p.title}</p>
              <span className="mt-6 block font-semibold text-gold">
                Pročitajte više <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
