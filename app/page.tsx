"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "./components/IntroScreen";
import MenuScreen from "./components/MenuScreen";
import FortuneInput, { FortuneInputData } from "./components/FortuneInput";
import FortuneLoading from "./components/FortuneLoading";
import FortuneResult, { FortuneResultData } from "./components/FortuneResult";
import KakaoAdFit from "./components/KakaoAdFit";
import { ChevronLeft } from "lucide-react";

type ViewState = "intro" | "menu" | "fortune";
type FortuneStep = "input" | "loading" | "result";

export default function Home() {
  const [view, setView] = useState<ViewState>("intro");
  const [fortuneStep, setFortuneStep] = useState<FortuneStep>("input");
  const [resultData, setResultData] = useState<FortuneResultData | null>(null);

  // 인트로 -> 메뉴 이동
  const handleStart = () => {
    setView("menu");
  };

  // 메뉴 선택 핸들러
  const handleMenuSelect = (menuId: string) => {
    if (menuId === "new_year") {
      setFortuneStep("input");
      setView("fortune");
    } else {
      alert("준비 중인 서비스입니다. 2026년 신년운세 먼저 확인해보세요! 🔮");
    }
  };

  // 운세 입력 제출
  const handleInputSubmit = async (data: FortuneInputData) => {
    setFortuneStep("loading");

    try {
      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch fortune");
      }

      const result = await response.json();
      setResultData(result);
      setFortuneStep("result");
    } catch (error) {
      console.error(error);
      alert("운세를 불러오는데 실패했습니다. 다시 시도해주세요.");
      setFortuneStep("input");
    }
  };

  // 리셋
  const handleReset = () => {
    setResultData(null);
    setFortuneStep("input");
  };

  const handleBackToMenu = () => {
    setView("menu");
    setFortuneStep("input");
    setResultData(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      
      {/* Note: Animated Background is handled in globals.css via body styles */}
      
      <AnimatePresence mode="wait">
        {view === "intro" && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
            <IntroScreen onStart={handleStart} />
          </motion.div>
        )}

        {view === "menu" && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md z-10 min-h-screen"
          >
            <MenuScreen onSelectMenu={handleMenuSelect} />
          </motion.div>
        )}

        {view === "fortune" && (
          <motion.div 
            key="fortune"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button 
                onClick={handleBackToMenu}
                className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-lg font-bold">신년운세 2026</h2>
              <div className="w-10" /> {/* Spacer */}
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {fortuneStep === "input" && (
                  <FortuneInput onSubmit={handleInputSubmit} isLoading={false} />
                )}

                {fortuneStep === "loading" && <FortuneLoading />}

                {fortuneStep === "result" && resultData && (
                  <FortuneResult data={resultData} onReset={handleReset} />
                )}
              </div>

              {/* AdFit (Result Only) */}
              {fortuneStep === "result" && (
                <div className="mt-8 mb-4 flex justify-center items-center w-full h-[250px] overflow-hidden bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <KakaoAdFit unit="DAN-zgZw9Q6wvZuU1nIl" width="250" height="250" />
                </div>
              )}

              {/* SEO Content (Visible only on Input step) */}
              {fortuneStep === "input" && (
                <section className="mt-12 mb-8 px-2 text-white/60 text-sm leading-relaxed">
                   <article className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-lg">
                     <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🐎</span>
                        <h3 className="text-lg font-bold text-white">2026년 병오년 미리보기</h3>
                     </div>
                     <p className="mb-4 leading-7">
                       2026년은 '붉은 말의 해'인 병오년(丙午年)입니다. 태양처럼 뜨거운 열정과 에너지가 넘치는 해로, 새로운 시작과 과감한 도전에 아주 좋은 기운을 가지고 있습니다.
                     </p>
                     <p className="leading-7">
                       ALL NEW FORTUNE은 전통 명리학 데이터와 최신 AI 기술을 결합하여, 당신의 사주팔자를 정밀하게 분석하고 2026년의 흐름을 읽어드립니다.
                     </p>
                   </article>
                   
                   {/* Structured Data */}
                   <script
                     type="application/ld+json"
                     dangerouslySetInnerHTML={{
                       __html: JSON.stringify({
                         "@context": "https://schema.org",
                         "@type": "SoftwareApplication",
                         "name": "ALL NEW FORTUNE",
                         "applicationCategory": "LifestyleApplication",
                         "operatingSystem": "Any",
                         "description": "2026년 신년운세, 사주, 토정비결을 무료로 확인하세요.",
                         "offers": {
                           "@type": "Offer",
                           "price": "0",
                           "priceCurrency": "KRW"
                         }
                       })
                     }}
                   />
                </section>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
