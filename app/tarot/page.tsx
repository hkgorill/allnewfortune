"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import TarotIntro from "../ui/tarot/TarotIntro";
import TarotTest from "../ui/tarot/TarotTest";
import TarotResult from "../ui/tarot/TarotResult";
import TarotDescription from "../ui/tarot/TarotDescription";
import FortuneLoading from "../ui/FortuneLoading";
import { TarotCard } from "../data/tarotData";
import { useUrlShare } from "../hooks/useUrlShare";

type TarotStep = "intro" | "test" | "loading" | "result";

function TarotContent() {
  const router = useRouter();
  const [tarotStep, setTarotStep] = useState<TarotStep>("intro");
  const [tarotResult, setTarotResult] = useState<TarotCard | null>(null);
  const { sharedData, isLoaded, shareData, clearShareUrl } = useUrlShare<TarotCard>();

  useEffect(() => {
    if (isLoaded && sharedData) {
      setTarotResult(sharedData);
      setTarotStep("result");
    }
  }, [isLoaded, sharedData]);

  const handleTarotStart = () => {
    setTarotStep("test");
  };

  const handleTarotComplete = (card: TarotCard) => {
    setTarotStep("loading");
    setTimeout(() => {
      setTarotResult(card);
      setTarotStep("result");
      shareData(card);
    }, 2000);
  };

  const handleTarotReset = () => {
    setTarotResult(null);
    setTarotStep("intro");
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
          <h2 className="text-lg font-bold">오늘의 타로</h2>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
          <div className="w-full transition-all duration-500">
            {tarotStep === "intro" && <TarotIntro onStart={handleTarotStart} />}
            {tarotStep === "test" && <TarotTest onComplete={handleTarotComplete} />}
            {tarotStep === "loading" && <FortuneLoading />}
            {tarotStep === "result" && tarotResult && <TarotResult card={tarotResult} onReset={handleTarotReset} />}
            
            <TarotDescription />
          </div>
        </div>
    </motion.div>
  );
}

export default function TarotPage() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      <Suspense fallback={<FortuneLoading />}>
        <TarotContent />
      </Suspense>
    </main>
  );
}
