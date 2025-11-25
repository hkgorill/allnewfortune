"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import HoroscopeIntro from "../ui/horoscope/HoroscopeIntro";
import HoroscopeSelect from "../ui/horoscope/HoroscopeSelect";
import HoroscopeResult from "../ui/horoscope/HoroscopeResult";
import HoroscopeDescription from "../ui/horoscope/HoroscopeDescription";
import FortuneLoading from "../ui/fortune/FortuneLoading";
import { getDailyHoroscope, HoroscopeResultType } from "../data/horoscopeData";
import { useUrlShare } from "../hooks/useUrlShare";

type HoroscopeStep = "intro" | "select" | "loading" | "result";

function HoroscopeContent() {
  const router = useRouter();
  const [horoscopeStep, setHoroscopeStep] = useState<HoroscopeStep>("intro");
  const [horoscopeResult, setHoroscopeResult] = useState<HoroscopeResultType | null>(null);
  const { sharedData, isLoaded, shareData, clearShareUrl } = useUrlShare<HoroscopeResultType>();

  useEffect(() => {
    if (isLoaded && sharedData) {
      setHoroscopeResult(sharedData);
      setHoroscopeStep("result");
    }
  }, [isLoaded, sharedData]);

  const handleHoroscopeStart = () => {
    setHoroscopeStep("select");
  };

  const handleHoroscopeSelect = (signId: string) => {
    setHoroscopeStep("loading");
    setTimeout(() => {
      const result = getDailyHoroscope(signId);
      setHoroscopeResult(result);
      setHoroscopeStep("result");
      shareData(result);
    }, 1500);
  };

  const handleHoroscopeReset = () => {
    setHoroscopeResult(null);
    setHoroscopeStep("intro");
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
          <h2 className="text-lg font-bold">오늘의 운세 (별자리)</h2>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
          <div className="w-full transition-all duration-500">
            {horoscopeStep === "intro" && <HoroscopeIntro onStart={handleHoroscopeStart} />}
            {horoscopeStep === "select" && <HoroscopeSelect onSelect={handleHoroscopeSelect} />}
            {horoscopeStep === "loading" && <FortuneLoading type="horoscope" />}
            {horoscopeStep === "result" && horoscopeResult && <HoroscopeResult result={horoscopeResult} onReset={handleHoroscopeReset} />}

            <HoroscopeDescription />
          </div>
        </div>
    </motion.div>
  );
}

export default function HoroscopePage() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      <Suspense fallback={<FortuneLoading type="horoscope" />}>
        <HoroscopeContent />
      </Suspense>
    </main>
  );
}
