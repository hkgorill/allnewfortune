import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI 성격 유형 검사 | 정확하고 빠른 무료 테스트 - ALL NEW FORTUNE",
  description:
    "아직도 내 진짜 MBTI를 모르시나요? 16가지 성격 유형으로 알아보는 나의 성향과 추천 직업, 연애 스타일.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

