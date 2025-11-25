"use client";

import { motion } from "framer-motion";
import { MoonStar, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface HoroscopeIntroProps {
  onStart: () => void;
}

const HOROSCOPE_FAQ = [
  {
    q: "제 별자리를 모르겠어요.",
    a: "생일 기준으로 정해집니다. 별자리 선택 화면에서 날짜를 확인하고 선택하시면 됩니다.",
  },
  {
    q: "운세는 매일 바뀌나요?",
    a: "네, 매일 자정을 기준으로 새로운 별들의 배치를 분석하여 오늘의 운세가 갱신됩니다.",
  },
  {
    q: "행운의 아이템은 무엇인가요?",
    a: "그날 당신의 기운을 북돋아 줄 색상, 숫자, 시간을 추천해 드립니다. 참고하여 하루를 계획해보세요.",
  },
];

export default function HoroscopeIntro({ onStart }: HoroscopeIntroProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col"
    >
      {/* Intro Card */}
      <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 relative overflow-hidden mb-8 text-center">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float">
            <MoonStar size={40} className="text-violet-300" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
            오늘의 운세 (별자리)
          </h2>
          <p className="text-violet-200 mb-8">
            오늘 밤 별들이 당신에게
            <br />
            어떤 속삭임을 전해줄까요?
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all"
          >
            별자리 선택하기 ✨
          </motion.button>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full mb-8 px-4"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-400" />
          <span className="text-white">자주 묻는 질문</span>
        </h3>
        <div className="space-y-3">
          {HOROSCOPE_FAQ.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-colors hover:bg-white/10"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-4 flex items-center justify-between text-left font-medium text-sm text-white"
              >
                <span className="pr-4">{faq.q}</span>
                <ArrowRight
                  className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                    openFaqIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>
              <div
                className={`px-4 text-sm text-white/60 bg-black/20 transition-all duration-300 ease-in-out ${
                  openFaqIndex === index
                    ? "max-h-40 py-4 opacity-100"
                    : "max-h-0 py-0 opacity-0"
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
