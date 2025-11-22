"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import FortuneIntro from "../ui/FortuneIntro";
import FortuneInput, { FortuneInputData } from "../ui/FortuneInput";
import FortuneLoading from "../ui/FortuneLoading";
import FortuneResult, { FortuneResultData } from "../ui/FortuneResult";
import KakaoAdFit from "../ui/KakaoAdFit";
import FortuneDescription from "../ui/FortuneDescription";

type FortuneStep = "intro" | "input" | "loading" | "result";

export default function FortunePage() {
  const router = useRouter();
  const [fortuneStep, setFortuneStep] = useState<FortuneStep>("intro");
  const [resultData, setResultData] = useState<FortuneResultData | null>(null);

  const handleFortuneStart = () => {
    setFortuneStep("input");
  };

  const handleInputSubmit = async (data: FortuneInputData) => {
    setFortuneStep("loading");
    try {
      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to fetch fortune");
      const result = await response.json();
      setResultData(result);
      setFortuneStep("result");
    } catch (error) {
      console.error(error);
      alert("운세를 불러오는데 실패했습니다. 다시 시도해주세요.");
      setFortuneStep("input");
    }
  };

  const handleResetFortune = () => {
    setResultData(null);
    setFortuneStep("intro");
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
                <h2 className="text-lg font-bold">신년운세 2026</h2>
                <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
                <div className="w-full transition-all duration-500">
                    {fortuneStep === "intro" && <FortuneIntro onStart={handleFortuneStart} />}
                    {fortuneStep === "input" && <FortuneInput onSubmit={handleInputSubmit} isLoading={false} />}
                    {fortuneStep === "loading" && <FortuneLoading />}
                    {fortuneStep === "result" && resultData && <FortuneResult data={resultData} onReset={handleResetFortune} />}
                </div>

                {fortuneStep === "result" && (
                    <div className="mt-8 mb-4 flex justify-center items-center w-full h-[250px] overflow-hidden">
                        <KakaoAdFit unit="DAN-zgZw9Q6wvZuU1nIl" width="250" height="250" />
                    </div>
                )}

                <FortuneDescription />
            </div>
        </motion.div>
    </main>
  );
}

