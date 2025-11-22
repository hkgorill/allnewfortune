"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import PsychologyIntro from "../ui/psychology/PsychologyIntro";
import PsychologyTest from "../ui/psychology/PsychologyTest";
import PsychologyResult from "../ui/psychology/PsychologyResult";
import FortuneLoading from "../ui/FortuneLoading";
import { PsychResultType } from "../data/psychologyData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 심리테스트 모음 | 소름 돋는 성격 분석 - ALL NEW FORTUNE",
  description:
    '"나도 몰랐던 내 마음." 간단한 질문으로 알아보는 나의 심리 상태와 무의식 분석. 친구와 함께 공유해보세요.',
};

type PsychologyStep = "intro" | "test" | "loading" | "result";

export default function PsychologyPage() {
  const router = useRouter();
  const [psychologyStep, setPsychologyStep] = useState<PsychologyStep>("intro");
  const [psychologyResult, setPsychologyResult] = useState<PsychResultType | null>(null);

  const handlePsychologyStart = () => {
    setPsychologyStep("test");
  };

  const handlePsychologyComplete = (result: PsychResultType) => {
    setPsychologyStep("loading");
    setTimeout(() => {
      setPsychologyResult(result);
      setPsychologyStep("result");
    }, 2000);
  };

  const handlePsychologyReset = () => {
    setPsychologyResult(null);
    setPsychologyStep("intro");
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
              <h2 className="text-lg font-bold">심리테스트</h2>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {psychologyStep === "intro" && <PsychologyIntro onStart={handlePsychologyStart} />}
                {psychologyStep === "test" && <PsychologyTest onComplete={handlePsychologyComplete} />}
                {psychologyStep === "loading" && <FortuneLoading />}
                {psychologyStep === "result" && psychologyResult && <PsychologyResult result={psychologyResult} onReset={handlePsychologyReset} />}
              </div>
            </div>
        </motion.div>
    </main>
  );
}

