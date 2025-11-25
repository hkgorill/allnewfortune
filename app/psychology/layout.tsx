import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 심리테스트 모음 | 소름 돋는 성격 분석 - ALL NEW FORTUNE",
  description:
    '"나도 몰랐던 내 마음." 간단한 질문으로 알아보는 나의 심리 상태와 무의식 분석. 친구와 함께 공유해보세요.',
  openGraph: {
    title: "무료 심리테스트 모음 | 소름 돋는 성격 분석 - ALL NEW FORTUNE",
    description:
      '"나도 몰랐던 내 마음." 간단한 질문으로 알아보는 나의 심리 상태와 무의식 분석. 친구와 함께 공유해보세요.',
    url: "https://fortune.jungpyung.com/psychology",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "https://fortune.jungpyung.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "심리테스트 결과",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "무료 심리테스트 모음 | 소름 돋는 성격 분석 - ALL NEW FORTUNE",
    description:
      '"나도 몰랐던 내 마음." 간단한 질문으로 알아보는 나의 심리 상태와 무의식 분석.',
    images: ["https://fortune.jungpyung.com/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






