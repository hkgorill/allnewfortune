import { Metadata } from "next";

export const metadata: Metadata = {
  title: "뇌 구조 테스트 | 내 머릿속엔 뭐가 들었을까? - ALL NEW FORTUNE",
  description:
    "재미로 보는 뇌 구조 분석. 에겐남? 테토녀? 손가락 길이와 간단한 질문으로 알아보는 나의 숨겨진 본능과 성격.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






