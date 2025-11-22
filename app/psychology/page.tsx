"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import PsychologyIntro from "../ui/psychology/PsychologyIntro";
import PsychologyTest from "../ui/psychology/PsychologyTest";
import PsychologyResult from "../ui/psychology/PsychologyResult";
import PsychologyDescription from "../ui/psychology/PsychologyDescription";
import FortuneLoading from "../ui/fortune/FortuneLoading";
import { PsychResultType } from "../data/psychologyData";
import { useUrlShare } from "../hooks/useUrlShare";

type PsychologyStep = "intro" | "test" | "loading" | "result";

function PsychologyContent() {
  const router = useRouter();
  const [psychologyStep, setPsychologyStep] = useState<PsychologyStep>("intro");
  const [psychologyResult, setPsychologyResult] = useState<PsychResultType | null>(null);
  const { sharedData, isLoaded, shareData, clearShareUrl } = useUrlShare<PsychResultType>();

  useEffect(() => {
    if (isLoaded && sharedData) {
      setPsychologyResult(sharedData);
      setPsychologyStep("result");
    }
  }, [isLoaded, sharedData]);

  const handlePsychologyStart = () => {
    setPsychologyStep("test");
  };

  const handlePsychologyComplete = (result: PsychResultType) => {
    setPsychologyStep("loading");
    setTimeout(() => {
      setPsychologyResult(result);
      setPsychologyStep("result");
      shareData(result);
    }, 2000);
  };

  const handlePsychologyReset = () => {
    setPsychologyResult(null);
    setPsychologyStep("intro");
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
          <h2 className="text-lg font-bold">심리테스트</h2>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
          <div className="w-full transition-all duration-500">
            {psychologyStep === "intro" && <PsychologyIntro onStart={handlePsychologyStart} />}
            {psychologyStep === "test" && <PsychologyTest onComplete={handlePsychologyComplete} />}
            {psychologyStep === "loading" && <FortuneLoading type="psychology" />}
            {psychologyStep === "result" && psychologyResult && <PsychologyResult result={psychologyResult} onReset={handlePsychologyReset} />}
            
            <PsychologyDescription />
          </div>
        </div>
    </motion.div>
  );
}

export default function PsychologyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      <Suspense fallback={<FortuneLoading type="psychology" />}>
        <PsychologyContent />
      </Suspense>
    </main>
  );
}
