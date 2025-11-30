import { MetadataRoute } from 'next'
import { BLOG_POSTS } from './data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fortune.jungpyung.com';
  
  // 기본 라우트
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
    '/blog',
    '/glossary',
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 블로그 포스트 동적 생성
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
