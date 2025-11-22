import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 심리테스트 모음 | 소름 돋는 성격 분석 - ALL NEW FORTUNE",
  description:
    '"나도 몰랐던 내 마음." 간단한 질문으로 알아보는 나의 심리 상태와 무의식 분석. 친구와 함께 공유해보세요.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



