"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MbtiIntro from "../ui/mbti/MbtiIntro";
import MbtiTest from "../ui/mbti/MbtiTest";
import MbtiResult from "../ui/mbti/MbtiResult";
import MbtiDescription from "../ui/mbti/MbtiDescription";
import FortuneLoading from "../ui/fortune/FortuneLoading";
import { MbtiResultType } from "../data/mbtiData";
import { useUrlShare } from "../hooks/useUrlShare";

type MbtiStep = "intro" | "test" | "loading" | "result";

function MbtiContent() {
  const router = useRouter();
  const [mbtiStep, setMbtiStep] = useState<MbtiStep>("intro");
  const [mbtiResult, setMbtiResult] = useState<MbtiResultType | null>(null);
  const { sharedData, isLoaded, shareData, clearShareUrl } = useUrlShare<MbtiResultType>();

  useEffect(() => {
    if (isLoaded && sharedData) {
      setMbtiResult(sharedData);
      setMbtiStep("result");
    }
  }, [isLoaded, sharedData]);

  const handleMbtiStart = () => {
    setMbtiStep("test");
  };

  const handleMbtiComplete = (result: MbtiResultType) => {
    setMbtiStep("loading");
    setTimeout(() => {
      setMbtiResult(result);
      setMbtiStep("result");
      shareData(result); // 결과가 나오면 URL 업데이트
    }, 2000);
  };

  const handleMbtiReset = () => {
    setMbtiResult(null);
    setMbtiStep("intro");
    clearShareUrl(); // 리셋 시 URL 초기화
  };

  return (
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
            {mbtiStep === "loading" && <FortuneLoading type="mbti" />}
            {mbtiStep === "result" && mbtiResult && <MbtiResult result={mbtiResult} onReset={handleMbtiReset} />}
            
            <MbtiDescription />
          </div>
        </div>
    </motion.div>
  );
}

export default function MbtiPage() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      <Suspense fallback={<FortuneLoading type="mbti" />}>
        <MbtiContent />
      </Suspense>
    </main>
  );
}
