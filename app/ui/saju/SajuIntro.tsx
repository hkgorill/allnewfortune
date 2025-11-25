"use client";

import { motion } from "framer-motion";
import { Compass, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface SajuIntroProps {
  onStart: () => void;
}

const SAJU_FAQ = [
  {
    q: "사주팔자란 무엇인가요?",
    a: "사람이 태어난 연, 월, 일, 시의 네 기둥(사주)과 그에 해당하는 여덟 글자(팔자)를 통해 타고난 운명을 분석하는 동양의 전통 학문입니다.",
  },
  {
    q: "양력/음력 중 무엇을 입력하나요?",
    a: "일반적으로 사용하는 양력 생일을 입력해주시면 시스템 내부에서 변환하여 분석합니다.",
  },
  {
    q: "태어난 시간을 모르면 어떻게 하나요?",
    a: "시간을 모를 경우 '시주' 분석을 제외한 년, 월, 일주를 중심으로 분석해 드립니다. (시간 입력 시 12:00으로 가정하거나 생략 가능)",
  },
];

export default function SajuIntro({ onStart }: SajuIntroProps) {
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
        {/* Decor: Yin Yang colors */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-900/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-900/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float border border-white/10">
            <Compass size={40} className="text-emerald-300" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
            정통 사주팔자
          </h2>
          <p className="text-emerald-100 mb-8 font-light">
            태어난 연월일시에 담긴
            <br />
            당신의 타고난 운명을 풀어드립니다.
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all"
          >
            내 사주 확인하기 📜
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
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-white">자주 묻는 질문</span>
        </h3>
        <div className="space-y-3">
          {SAJU_FAQ.map((faq, index) => (
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
