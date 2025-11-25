import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 운세 (별자리) | 매일 확인하는 행운의 가이드 - ALL NEW FORTUNE",
  description:
    "물병자리부터 염소자리까지, 별들이 알려주는 당신의 하루. 금전운, 연애운, 행운의 컬러와 아이템까지 확인하세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






