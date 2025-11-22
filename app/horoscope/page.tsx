"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import HoroscopeIntro from "../ui/HoroscopeIntro";
import HoroscopeSelect from "../ui/HoroscopeSelect";
import HoroscopeResult from "../ui/HoroscopeResult";
import FortuneLoading from "../ui/FortuneLoading";
import { getDailyHoroscope, HoroscopeResultType } from "../data/horoscopeData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 별자리 운세 | 매일 확인하는 행운의 가이드 - ALL NEW FORTUNE",
  description:
    "물병자리부터 염소자리까지, 별들이 알려주는 당신의 하루. 금전운, 연애운, 행운의 컬러와 아이템까지 확인하세요.",
};

type HoroscopeStep = "intro" | "select" | "loading" | "result";

export default function HoroscopePage() {
  const router = useRouter();
  const [horoscopeStep, setHoroscopeStep] = useState<HoroscopeStep>("intro");
  const [horoscopeResult, setHoroscopeResult] = useState<HoroscopeResultType | null>(null);

  const handleHoroscopeStart = () => {
    setHoroscopeStep("select");
  };

  const handleHoroscopeSelect = (signId: string) => {
    setHoroscopeStep("loading");
    setTimeout(() => {
      const result = getDailyHoroscope(signId);
      setHoroscopeResult(result);
      setHoroscopeStep("result");
    }, 1500);
  };

  const handleHoroscopeReset = () => {
    setHoroscopeResult(null);
    setHoroscopeStep("intro");
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
              <h2 className="text-lg font-bold">별자리 운세</h2>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {horoscopeStep === "intro" && <HoroscopeIntro onStart={handleHoroscopeStart} />}
                {horoscopeStep === "select" && <HoroscopeSelect onSelect={handleHoroscopeSelect} />}
                {horoscopeStep === "loading" && <FortuneLoading />}
                {horoscopeStep === "result" && horoscopeResult && <HoroscopeResult result={horoscopeResult} onReset={handleHoroscopeReset} />}
              </div>
            </div>
        </motion.div>
    </main>
  );
}

