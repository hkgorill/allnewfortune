import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "2026년 신년운세 | 무료 사주 토정비결 - ALL NEW FORTUNE",
    template: "%s | ALL NEW FORTUNE",
  },
  description: "2026년 병오년 신년운세를 무료로 확인하세요. AI가 분석해주는 사주, 토정비결, 재물운, 연애운, 직업운. 생년월일만으로 알아보는 나의 운명과 행운의 아이템.",
  keywords: ["2026년 운세", "신년운세", "무료운세", "사주풀이", "토정비결", "병오년", "AI 점성술", "오늘의 운세", "띠별 운세"],
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
    title: "2026년 신년운세 | 무료 사주 토정비결 - ALL NEW FORTUNE",
    description: "2026년 병오년 나의 운세는? AI가 분석하는 정밀 사주풀이와 신년 운세. 지금 바로 무료로 확인해보세요.",
    url: "https://allnewfortune.vercel.app",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "2026년 신년운세 결과 예시",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026년 신년운세 | 무료 사주 토정비결",
    description: "AI가 알려주는 2026년 병오년 당신의 운세. 재물운, 연애운, 건강운을 지금 확인하세요.",
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
    google: "fcpLiUoCtqFZ4bzNC-x9TQ5Gv3iRLi3RJsAMq9dDy90",
    other: {
      "naver-site-verification": "93770c0244827914a2b09e4be1fa0b07e9339f4b",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
