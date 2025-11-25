import { Metadata } from "next";

export const metadata: Metadata = {
  title: "뇌 구조 테스트 | 내 머릿속엔 뭐가 들었을까? - ALL NEW FORTUNE",
  description:
    "재미로 보는 뇌 구조 분석. 에겐남? 테토녀? 손가락 길이와 간단한 질문으로 알아보는 나의 숨겨진 본능과 성격.",
  openGraph: {
    title: "뇌 구조 테스트 | 내 머릿속엔 뭐가 들었을까? - ALL NEW FORTUNE",
    description:
      "재미로 보는 뇌 구조 분석. 에겐남? 테토녀? 손가락 길이와 간단한 질문으로 알아보는 나의 숨겨진 본능과 성격.",
    url: "https://fortune.jungpyung.com/finger",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "https://fortune.jungpyung.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "뇌 구조 테스트 결과",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "뇌 구조 테스트 | 내 머릿속엔 뭐가 들었을까? - ALL NEW FORTUNE",
    description:
      "재미로 보는 뇌 구조 분석. 에겐남? 테토녀? 손가락 길이와 간단한 질문으로 알아보는 나의 숨겨진 본능과 성격.",
    images: ["https://fortune.jungpyung.com/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






