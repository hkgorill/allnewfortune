"use client";

import { motion } from "framer-motion";
import { Fingerprint, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface MbtiIntroProps {
  onStart: () => void;
}

const MBTI_FAQ = [
  {
    q: "검사 시간은 얼마나 걸리나요?",
    a: "총 12문항으로 구성되어 있어 1분 내외로 빠르고 간단하게 확인하실 수 있습니다.",
  },
  {
    q: "결과는 저장되나요?",
    a: "별도의 회원가입이나 서버 저장 없이, 현재 브라우저에서만 즉시 분석 결과를 보여드립니다.",
  },
  {
    q: "신년운세와 어떤 관련이 있나요?",
    a: "운세가 미래의 흐름을 본다면, MBTI는 현재 나의 성향을 파악하여 더 나은 선택을 돕는 도구입니다.",
  },
];

export default function MbtiIntro({ onStart }: MbtiIntroProps) {
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
         <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />
         <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

         <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float">
                <Fingerprint size={40} className="text-pink-300" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
              나의 성격 유형 찾기
            </h2>
            <p className="text-purple-200 mb-8">
              12가지 질문으로 알아보는<br/>
              나의 진짜 모습과 숨겨진 성향
            </p>

            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all"
            >
              테스트 시작하기 ✨
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
          <HelpCircle className="w-5 h-5 text-pink-400" />
          <span className="text-white">자주 묻는 질문</span>
        </h3>
        <div className="space-y-3">
          {MBTI_FAQ.map((faq, index) => (
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

