import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fortune.jungpyung.com';
  const routes = [
    '',
    '/fortune',
    '/saju',
    '/mbti',
    '/tarot',
    '/horoscope',
    '/psychology',
    '/finger',
    '/chemistry',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
