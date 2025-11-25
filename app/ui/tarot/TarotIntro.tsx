"use client";

import { motion } from "framer-motion";
import { Eye, HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

interface TarotIntroProps {
  onStart: () => void;
}

const TAROT_FAQ = [
  {
    q: "어떤 질문을 해야 하나요?",
    a: '"오늘의 운세는?" 같은 가벼운 질문부터 "이 선택이 맞을까?" 같은 구체적인 고민까지 무엇이든 좋습니다. 마음속으로 질문을 집중해서 떠올려주세요.',
  },
  {
    q: "결과가 나쁘게 나오면 어떡하죠?",
    a: "타로는 미래를 확정 짓는 것이 아니라 조언을 주는 도구입니다. 카드의 메시지를 참고하여 더 좋은 방향으로 나아가세요.",
  },
  {
    q: "하루에 여러 번 봐도 되나요?",
    a: "같은 질문으로 여러 번 보는 것은 추천하지 않습니다. 하지만 다른 고민이 있다면 언제든 다시 확인해보셔도 좋습니다.",
  },
];

export default function TarotIntro({ onStart }: TarotIntroProps) {
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
         <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
         <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

         <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float">
                <Eye size={40} className="text-blue-300" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
              오늘의 타로
            </h2>
            <p className="text-blue-200 mb-8">
              당신의 고민을 생각하며<br/>
              운명의 카드를 한 장 뽑아보세요
            </p>

            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
            >
              카드 섞기 🔮
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
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <span className="text-white">자주 묻는 질문</span>
        </h3>
        <div className="space-y-3">
          {TAROT_FAQ.map((faq, index) => (
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

