import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 사주팔자 풀이 | 정확한 평생 총운 분석 - ALL NEW FORTUNE",
  description:
    "생년월일시로 보는 정통 사주풀이. 타고난 성향부터 초년, 중년, 말년운까지 내 인생의 흐름을 명리학으로 분석해 드립니다.",
  openGraph: {
    title: "무료 사주팔자 풀이 | 정확한 평생 총운 분석 - ALL NEW FORTUNE",
    description:
      "생년월일시로 보는 정통 사주풀이. 타고난 성향부터 초년, 중년, 말년운까지 내 인생의 흐름을 명리학으로 분석해 드립니다.",
    url: "https://fortune.jungpyung.com/saju",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "https://fortune.jungpyung.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "사주팔자 풀이 결과",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "무료 사주팔자 풀이 | 정확한 평생 총운 분석 - ALL NEW FORTUNE",
    description:
      "생년월일시로 보는 정통 사주풀이. 타고난 성향부터 초년, 중년, 말년운까지 내 인생의 흐름을 명리학으로 분석해 드립니다.",
    images: ["https://fortune.jungpyung.com/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






