import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ALL NEW FORTUNE - 2026년 신년운세 & AI 종합 운세',
    short_name: 'ALL NEW FORTUNE',
    description: '2026년 신년운세, 사주, 타로, MBTI, 심리테스트를 AI가 무료로 분석해드립니다.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#8B5CF6',
    icons: [
      {
        src: '/images/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

