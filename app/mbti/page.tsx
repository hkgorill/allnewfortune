"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MbtiIntro from "../ui/mbti/MbtiIntro";
import MbtiTest from "../ui/mbti/MbtiTest";
import MbtiResult from "../ui/mbti/MbtiResult";
import FortuneLoading from "../ui/FortuneLoading";
import { MbtiResultType } from "../data/mbtiData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI 성격 유형 검사 | 정확하고 빠른 무료 테스트 - ALL NEW FORTUNE",
  description:
    "아직도 내 진짜 MBTI를 모르시나요? 16가지 성격 유형으로 알아보는 나의 성향과 추천 직업, 연애 스타일.",
};

type MbtiStep = "intro" | "test" | "loading" | "result";

export default function MbtiPage() {
  const router = useRouter();
  const [mbtiStep, setMbtiStep] = useState<MbtiStep>("intro");
  const [mbtiResult, setMbtiResult] = useState<MbtiResultType | null>(null);

  const handleMbtiStart = () => {
    setMbtiStep("test");
  };

  const handleMbtiComplete = (result: MbtiResultType) => {
    setMbtiStep("loading");
    setTimeout(() => {
      setMbtiResult(result);
      setMbtiStep("result");
    }, 2000);
  };

  const handleMbtiReset = () => {
    setMbtiResult(null);
    setMbtiStep("intro");
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
        >
             <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={() => router.push('/')} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-lg font-bold">성격 유형 테스트</h2>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {mbtiStep === "intro" && <MbtiIntro onStart={handleMbtiStart} />}
                {mbtiStep === "test" && <MbtiTest onComplete={handleMbtiComplete} />}
                {mbtiStep === "loading" && <FortuneLoading />}
                {mbtiStep === "result" && mbtiResult && <MbtiResult result={mbtiResult} onReset={handleMbtiReset} />}
              </div>
            </div>
        </motion.div>
    </main>
  );
}

