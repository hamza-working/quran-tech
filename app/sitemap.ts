import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quran-techn.netlify.app';
  const locales = ['ar', 'fr', 'en'];
  const pages = ['', '/program', '/tajweed', '/english', '/french', '/technology', '/quiz', '/dashboard', '/contact'];

  const urls = locales.flatMap(locale =>
    pages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  return urls;
}