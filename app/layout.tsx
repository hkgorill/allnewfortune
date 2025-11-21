import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "2026년 신년운세 & AI 종합 운세 | 사주·타로·MBTI - ALL NEW FORTUNE",
    template: "%s | ALL NEW FORTUNE",
  },
  description: "2026년 병오년 신년운세부터 사주, 타로, MBTI, 심리테스트, 별자리 운세까지! AI가 정밀 분석해주는 나만의 운명 가이드. 생년월일만으로 알아보는 무료 종합 운세 서비스.",
  keywords: [
    "2026년 운세",
    "신년운세",
    "무료운세",
    "사주팔자",
    "토정비결",
    "병오년",
    "AI 점성술",
    "오늘의 운세",
    "띠별 운세",
    "MBTI 테스트",
    "무료 타로",
    "타로점",
    "심리테스트",
    "성격 유형 검사",
    "별자리 운세",
    "정통 사주"
  ],
  authors: [{ name: "ALL NEW FORTUNE" }],
  creator: "ALL NEW FORTUNE",
  publisher: "ALL NEW FORTUNE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://allnewfortune.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "2026년 신년운세 & AI 종합 운세 | 사주·타로·MBTI",
    description: "2026년 병오년 나의 운세는? AI가 분석하는 정밀 사주풀이와 신년 운세. MBTI, 타로, 심리테스트까지 지금 바로 무료로 확인해보세요.",
    url: "https://allnewfortune.vercel.app",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ALL NEW FORTUNE 서비스 예시 이미지",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026년 신년운세 & AI 종합 운세",
    description: "AI가 알려주는 2026년 병오년 당신의 운세. 재물운, 연애운, MBTI, 타로까지 한 번에 확인하세요.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION!,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ALL NEW FORTUNE",
    "url": "https://allnewfortune.vercel.app",
    "description": "AI 기반 2026년 신년운세, 사주, 타로, MBTI, 심리테스트 무료 서비스",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://allnewfortune.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
