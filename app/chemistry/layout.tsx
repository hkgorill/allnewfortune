import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 궁합 테스트 | 우리 둘의 연애/결혼 점수는? - ALL NEW FORTUNE",
  description:
    "그 사람과 나, 진짜 인연일까? 생년월일로 보는 정확한 속궁합, 겉궁합. 썸남썸녀, 커플 필독 궁합 분석.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

