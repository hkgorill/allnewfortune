import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 타로점 | 고민 해결 & 속마음 읽기 - ALL NEW FORTUNE",
  description:
    '"그 사람은 나를 좋아할까?" 연애운, 재회운, 금전운. 타로 카드가 들려주는 당신의 오늘 하루 조언.',
  openGraph: {
    title: "오늘의 타로점 | 고민 해결 & 속마음 읽기 - ALL NEW FORTUNE",
    description:
      '"그 사람은 나를 좋아할까?" 연애운, 재회운, 금전운. 타로 카드가 들려주는 당신의 오늘 하루 조언.',
    url: "https://fortune.jungpyung.com/tarot",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "https://fortune.jungpyung.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "타로 카드 결과",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘의 타로점 | 고민 해결 & 속마음 읽기 - ALL NEW FORTUNE",
    description:
      '"그 사람은 나를 좋아할까?" 연애운, 재회운, 금전운. 타로 카드가 들려주는 당신의 오늘 하루 조언.',
    images: ["https://fortune.jungpyung.com/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






