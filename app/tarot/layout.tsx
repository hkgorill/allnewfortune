import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 타로점 | 고민 해결 & 속마음 읽기 - ALL NEW FORTUNE",
  description:
    '"그 사람은 나를 좋아할까?" 연애운, 재회운, 금전운. 타로 카드가 들려주는 당신의 오늘 하루 조언.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






