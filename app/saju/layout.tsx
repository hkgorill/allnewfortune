import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 사주팔자 풀이 | 정확한 평생 총운 분석 - ALL NEW FORTUNE",
  description:
    "생년월일시로 보는 정통 사주풀이. 타고난 성향부터 초년, 중년, 말년운까지 내 인생의 흐름을 명리학으로 분석해 드립니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



