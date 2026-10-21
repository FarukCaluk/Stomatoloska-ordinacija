import type { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { routes, siteUrl } from '@/lib/url';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((path) => ({
      url: `${siteUrl}${path === '/' ? '' : path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...posts.map((p) => ({ url: `${siteUrl}/novosti/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
