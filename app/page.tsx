"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "./components/IntroScreen";
import MenuScreen from "./components/MenuScreen";
import FortuneInput, { FortuneInputData } from "./components/FortuneInput";
import FortuneLoading from "./components/FortuneLoading";
import FortuneResult, { FortuneResultData } from "./components/FortuneResult";
import MbtiIntro from "./components/mbti/MbtiIntro";
import MbtiTest from "./components/mbti/MbtiTest";
import MbtiResult from "./components/mbti/MbtiResult";
import { MbtiResultType } from "./lib/mbtiData";
import TarotIntro from "./components/tarot/TarotIntro";
import TarotTest from "./components/tarot/TarotTest";
import TarotResult from "./components/tarot/TarotResult";
import { TarotCard } from "./lib/tarotData";
import HoroscopeIntro from "./components/horoscope/HoroscopeIntro";
import HoroscopeSelect from "./components/horoscope/HoroscopeSelect";
import HoroscopeResult from "./components/horoscope/HoroscopeResult";
import { getDailyHoroscope, HoroscopeResultType } from "./lib/horoscopeData";
import SajuIntro from "./components/saju/SajuIntro";
import SajuInput from "./components/saju/SajuInput";
import SajuResult from "./components/saju/SajuResult";
import { calculateSaju, SajuResultType } from "./lib/sajuData";
import PsychologyIntro from "./components/psychology/PsychologyIntro";
import PsychologyTest from "./components/psychology/PsychologyTest";
import PsychologyResult from "./components/psychology/PsychologyResult";
import { PsychResultType } from "./lib/psychologyData";
import KakaoAdFit from "./components/KakaoAdFit";
import { ChevronLeft } from "lucide-react";

type ViewState = "intro" | "menu" | "fortune" | "mbti" | "tarot" | "horoscope" | "saju" | "psychology";
type FortuneStep = "input" | "loading" | "result";
type MbtiStep = "intro" | "test" | "loading" | "result";
type TarotStep = "intro" | "test" | "loading" | "result";
type HoroscopeStep = "intro" | "select" | "loading" | "result";
type SajuStep = "intro" | "input" | "loading" | "result";
type PsychologyStep = "intro" | "test" | "loading" | "result";

export default function Home() {
  const [view, setView] = useState<ViewState>("intro");
  
  // Fortune State
  const [fortuneStep, setFortuneStep] = useState<FortuneStep>("input");
  const [resultData, setResultData] = useState<FortuneResultData | null>(null);

  // MBTI State
  const [mbtiStep, setMbtiStep] = useState<MbtiStep>("intro");
  const [mbtiResult, setMbtiResult] = useState<MbtiResultType | null>(null);

  // Tarot State
  const [tarotStep, setTarotStep] = useState<TarotStep>("intro");
  const [tarotResult, setTarotResult] = useState<TarotCard | null>(null);

  // Horoscope State
  const [horoscopeStep, setHoroscopeStep] = useState<HoroscopeStep>("intro");
  const [horoscopeResult, setHoroscopeResult] = useState<HoroscopeResultType | null>(null);

  // Saju State
  const [sajuStep, setSajuStep] = useState<SajuStep>("intro");
  const [sajuResult, setSajuResult] = useState<SajuResultType | null>(null);

  // Psychology State
  const [psychologyStep, setPsychologyStep] = useState<PsychologyStep>("intro");
  const [psychologyResult, setPsychologyResult] = useState<PsychResultType | null>(null);

  // 인트로 -> 메뉴 이동
  const handleStart = () => {
    setView("menu");
  };

  // 메뉴 선택 핸들러
  const handleMenuSelect = (menuId: string) => {
    if (menuId === "new_year") {
      setFortuneStep("input");
      setView("fortune");
    } else if (menuId === "mbti") {
      setMbtiStep("intro");
      setView("mbti");
    } else if (menuId === "tarot") {
      setTarotStep("intro");
      setView("tarot");
    } else if (menuId === "horoscope") {
      setHoroscopeStep("intro");
      setView("horoscope");
    } else if (menuId === "saju") {
      setSajuStep("intro");
      setView("saju");
    } else if (menuId === "egogram") {
      setPsychologyStep("intro");
      setView("psychology");
    } else {
      alert("준비 중인 서비스입니다. 2026년 신년운세 먼저 확인해보세요! 🔮");
    }
  };

  const handleBackToMenu = () => {
    setView("menu");
    // Reset States
    setFortuneStep("input");
    setResultData(null);
    setMbtiStep("intro");
    setMbtiResult(null);
    setTarotStep("intro");
    setTarotResult(null);
    setHoroscopeStep("intro");
    setHoroscopeResult(null);
    setSajuStep("intro");
    setSajuResult(null);
    setPsychologyStep("intro");
    setPsychologyResult(null);
  };

  // --- Fortune Logic ---
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
    setFortuneStep("input");
  };

  // --- MBTI Logic ---
  const handleMbtiStart = () => {
    setMbtiStep("test");
  };

  const handleMbtiComplete = (result: MbtiResultType) => {
    setMbtiStep("loading");
    setTimeout(() => {
      setMbtiResult(result);
      setMbtiStep("result");
    }, 2000);
  };

  const handleMbtiReset = () => {
    setMbtiResult(null);
    setMbtiStep("intro");
  };

  // --- Tarot Logic ---
  const handleTarotStart = () => {
    setTarotStep("test");
  };

  const handleTarotComplete = (card: TarotCard) => {
    setTarotStep("loading");
    setTimeout(() => {
      setTarotResult(card);
      setTarotStep("result");
    }, 2000);
  };

  const handleTarotReset = () => {
    setTarotResult(null);
    setTarotStep("intro");
  };

  // --- Horoscope Logic ---
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

  // --- Saju Logic ---
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

  // --- Psychology Logic ---
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

        {/* --- Fortune View --- */}
        {view === "fortune" && (
          <motion.div 
            key="fortune"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
            <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={handleBackToMenu} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-lg font-bold">신년운세 2026</h2>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {fortuneStep === "input" && <FortuneInput onSubmit={handleInputSubmit} isLoading={false} />}
                {fortuneStep === "loading" && <FortuneLoading />}
                {fortuneStep === "result" && resultData && <FortuneResult data={resultData} onReset={handleResetFortune} />}
              </div>

              {fortuneStep === "result" && (
                <div className="mt-8 mb-4 flex justify-center items-center w-full h-[250px] overflow-hidden">
                  <KakaoAdFit unit="DAN-zgZw9Q6wvZuU1nIl" width="250" height="250" />
                </div>
              )}

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
                   </article>
                </section>
              )}
            </div>
          </motion.div>
        )}

        {/* --- MBTI View --- */}
        {view === "mbti" && (
          <motion.div 
            key="mbti"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
             <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={handleBackToMenu} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-lg font-bold">성격 유형 테스트</h2>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {mbtiStep === "intro" && <MbtiIntro onStart={handleMbtiStart} />}
                {mbtiStep === "test" && <MbtiTest onComplete={handleMbtiComplete} />}
                {mbtiStep === "loading" && <FortuneLoading />}
                {mbtiStep === "result" && mbtiResult && <MbtiResult result={mbtiResult} onReset={handleMbtiReset} />}
              </div>
            </div>
          </motion.div>
        )}

        {/* --- Tarot View --- */}
        {view === "tarot" && (
          <motion.div 
            key="tarot"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
             <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={handleBackToMenu} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
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
              </div>
            </div>
          </motion.div>
        )}

        {/* --- Horoscope View --- */}
        {view === "horoscope" && (
          <motion.div 
            key="horoscope"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
             <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={handleBackToMenu} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
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
        )}

        {/* --- Saju View --- */}
        {view === "saju" && (
          <motion.div 
            key="saju"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
             <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={handleBackToMenu} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
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
        )}

        {/* --- Psychology View --- */}
        {view === "psychology" && (
          <motion.div 
            key="psychology"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
          >
             <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={handleBackToMenu} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
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
        )}

      </AnimatePresence>

      {/* Global Footer */}
      <footer className="absolute bottom-4 w-full text-center pointer-events-none z-50">
        <p className="text-[10px] text-white/30 font-light tracking-widest">
          © 2026 ALL NEW FORTUNE. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
