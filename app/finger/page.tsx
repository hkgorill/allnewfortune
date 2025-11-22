"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import FingerIntro from "../ui/finger/FingerIntro";
import FingerTest from "../ui/finger/FingerTest";
import FingerResult from "../ui/finger/FingerResult";
import FingerDescription from "../ui/finger/FingerDescription";
import FortuneLoading from "../ui/FortuneLoading";
import { useUrlShare } from "../hooks/useUrlShare";

type FingerStep = "intro" | "test" | "loading" | "result";

function FingerContent() {
  const router = useRouter();
  const [fingerStep, setFingerStep] = useState<FingerStep>("intro");
  const [fingerResult, setFingerResult] = useState<any | null>(null);
  const { sharedData, isLoaded, shareData, clearShareUrl } = useUrlShare<any>();

  useEffect(() => {
    if (isLoaded && sharedData) {
      setFingerResult(sharedData);
      setFingerStep("result");
    }
  }, [isLoaded, sharedData]);

  const handleFingerStart = () => {
    setFingerStep("test");
  };

  const handleFingerComplete = (result: any) => {
    setFingerStep("loading");
    setTimeout(() => {
      setFingerResult(result);
      setFingerStep("result");
      shareData(result);
    }, 2000);
  };

  const handleFingerReset = () => {
    setFingerResult(null);
    setFingerStep("intro");
    clearShareUrl();
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
          <h2 className="text-lg font-bold">뇌 구조 테스트</h2>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
          <div className="w-full transition-all duration-500">
            {fingerStep === "intro" && <FingerIntro onStart={handleFingerStart} />}
            {fingerStep === "test" && <FingerTest onComplete={handleFingerComplete} />}
            {fingerStep === "loading" && <FortuneLoading />}
            {fingerStep === "result" && fingerResult && <FingerResult resultData={fingerResult} onReset={handleFingerReset} />}

            <FingerDescription />
          </div>
        </div>
    </motion.div>
  );
}

export default function FingerPage() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      <Suspense fallback={<FortuneLoading />}>
        <FingerContent />
      </Suspense>
    </main>
  );
}
