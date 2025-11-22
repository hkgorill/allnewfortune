"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import SajuIntro from "../ui/saju/SajuIntro";
import SajuInput from "../ui/saju/SajuInput";
import SajuResult from "../ui/saju/SajuResult";
import FortuneLoading from "../ui/FortuneLoading";
import { calculateSaju, SajuResultType } from "../data/sajuData";
import { FortuneInputData } from "../ui/FortuneInput";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 사주팔자 풀이 | 정확한 평생 총운 분석 - ALL NEW FORTUNE",
  description:
    "생년월일시로 보는 정통 사주풀이. 타고난 성향부터 초년, 중년, 말년운까지 내 인생의 흐름을 명리학으로 분석해 드립니다.",
};

type SajuStep = "intro" | "input" | "loading" | "result";

export default function SajuPage() {
  const router = useRouter();
  const [sajuStep, setSajuStep] = useState<SajuStep>("intro");
  const [sajuResult, setSajuResult] = useState<SajuResultType | null>(null);

  const handleSajuStart = () => {
    setSajuStep("input");
  };

  const handleSajuSubmit = (data: FortuneInputData) => {
    setSajuStep("loading");
    
    const [year, month, day] = data.birthdate.split("-").map(Number);
    let hour = 12;
    if (data.birthtime) {
      const [ampm, timeStr] = data.birthtime.split(" ");
      const [h, m] = timeStr.split(":").map(Number);
      hour = ampm === "PM" && h !== 12 ? h + 12 : (ampm === "AM" && h === 12 ? 0 : h);
    }

    setTimeout(() => {
      const result = calculateSaju(year, month, day, hour);
      setSajuResult(result);
      setSajuStep("result");
    }, 2000);
  };

  const handleSajuReset = () => {
    setSajuResult(null);
    setSajuStep("intro");
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
              <h2 className="text-lg font-bold">정통 사주팔자</h2>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {sajuStep === "intro" && <SajuIntro onStart={handleSajuStart} />}
                {sajuStep === "input" && <SajuInput onSubmit={handleSajuSubmit} isLoading={false} />}
                {sajuStep === "loading" && <FortuneLoading />}
                {sajuStep === "result" && sajuResult && <SajuResult result={sajuResult} onReset={handleSajuReset} />}
              </div>
            </div>
        </motion.div>
    </main>
  );
}

