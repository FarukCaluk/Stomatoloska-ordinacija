import type { MetadataRoute } from 'next';
import { routes, siteUrl } from '@/lib/url';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
