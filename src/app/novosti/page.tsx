import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { PostCard } from '@/components/PostCard';
import { Reveal } from '@/components/Reveal';
import { posts } from '@/lib/posts';

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

      <section className="shell grid gap-4 pb-[clamp(5rem,12vw,10rem)] md:grid-cols-2 lg:grid-cols-3" aria-label="Svi članci">
        {posts.map((post, i) => (
          <Reveal key={post.slug} className="fade" delay={(i % 3) * 0.06}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </section>
    </main>
  );
}
