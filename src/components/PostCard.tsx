import Link from 'next/link';
import { formatDate, readingTime, type Post } from '@/lib/posts';

/** The same compact card everywhere an article is listed. */
export function PostCard({ post, heading: Heading = 'h2' }: { post: Post; heading?: 'h2' | 'h3' }) {
  return (
    <Link
      href={`/novosti/${post.slug}`}
      className="group flex h-full flex-col rounded-[1.5rem] border border-line bg-panel p-6 transition-colors duration-300 hover:border-gold/60"
    >
      <p className="text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden> / </span>
        {readingTime(post)} min čitanja
      </p>
      <Heading className="mt-3 text-[1.25rem] font-semibold leading-tight tracking-[-0.02em]">{post.title}</Heading>
      <p className="mt-3 line-clamp-2 text-muted">{post.excerpt}</p>
      <span className="mt-auto pt-5 font-semibold text-gold">
        Pročitajte više <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
