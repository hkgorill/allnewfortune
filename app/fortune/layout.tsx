import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026년 신년운세 무료보기 | 병오년 말띠 토정비결 - ALL NEW FORTUNE",
  description:
    "2026년 병오년(말띠) 당신의 대박운은? AI가 분석하는 소름 돋는 신년운세. 재물운, 연애운, 직장운까지 무료로 확인하세요.",
  openGraph: {
    title: "2026년 신년운세 무료보기 | 병오년 말띠 토정비결 - ALL NEW FORTUNE",
    description:
      "2026년 병오년(말띠) 당신의 대박운은? AI가 분석하는 소름 돋는 신년운세. 재물운, 연애운, 직장운까지 무료로 확인하세요.",
    url: "https://fortune.jungpyung.com/fortune",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "https://fortune.jungpyung.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "2026년 신년운세",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026년 신년운세 무료보기 | 병오년 말띠 토정비결 - ALL NEW FORTUNE",
    description:
      "2026년 병오년(말띠) 당신의 대박운은? AI가 분석하는 소름 돋는 신년운세. 재물운, 연애운, 직장운까지 무료로 확인하세요.",
    images: ["https://fortune.jungpyung.com/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






