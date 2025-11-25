import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 궁합 테스트 | 우리 둘의 연애/결혼 점수는? - ALL NEW FORTUNE",
  description:
    "그 사람과 나, 진짜 인연일까? 생년월일로 보는 정확한 속궁합, 겉궁합. 썸남썸녀, 커플 필독 궁합 분석.",
  openGraph: {
    title: "무료 궁합 테스트 | 우리 둘의 연애/결혼 점수는? - ALL NEW FORTUNE",
    description:
      "그 사람과 나, 진짜 인연일까? 생년월일로 보는 정확한 속궁합, 겉궁합. 썸남썸녀, 커플 필독 궁합 분석.",
    url: "https://fortune.jungpyung.com/chemistry",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "https://fortune.jungpyung.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "궁합 테스트 결과",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "무료 궁합 테스트 | 우리 둘의 연애/결혼 점수는? - ALL NEW FORTUNE",
    description:
      "그 사람과 나, 진짜 인연일까? 생년월일로 보는 정확한 속궁합, 겉궁합. 썸남썸녀, 커플 필독 궁합 분석.",
    images: ["https://fortune.jungpyung.com/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






