"use client";

import { motion } from "framer-motion";
import { Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface FortuneIntroProps {
  onStart: () => void;
}

const FORTUNE_FAQ = [
  {
    q: "어떤 정보를 입력해야 하나요?",
    a: "정확한 사주 분석을 위해 생년월일, 태어난 시간, 그리고 성별이 필요합니다. 태어난 시간을 모를 경우 '시간 모름'을 선택할 수 있지만, 정확도가 다소 떨어질 수 있습니다.",
  },
  {
    q: "양력/음력 중 무엇을 입력하나요?",
    a: "양력, 음력, 윤달 중 선택하여 입력하실 수 있습니다. 음력이나 윤달을 선택하시면 자동으로 양력으로 변환하여 정확하게 분석해 드립니다.",
  },
  {
    q: "2026년은 어떤 해인가요?",
    a: "2026년은 병오년(丙午年)으로, '붉은 말의 해'입니다. 태양과 같은 뜨거운 열정과 활기찬 에너지가 넘치는 해로, 새로운 도전과 변화에 유리한 기운이 강합니다.",
  },
  {
    q: "결과는 얼마나 믿을 수 있나요?",
    a: "이 운세는 명리학적 데이터를 기반으로 분석된 결과입니다. 미래를 확정하는 것이 아니라, 흐름을 미리 읽고 더 좋은 방향으로 나아가기 위한 조언으로 활용해보세요.",
  },
];

export default function FortuneIntro({ onStart }: FortuneIntroProps) {
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
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float">
            <Sparkles size={40} className="text-purple-300" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
            2026 신년운세
          </h2>
          <p className="text-purple-200 mb-8">
            2026년 병오년 (丙午年)
            <br />
            당신의 한 해를 미리 확인해보세요
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all"
          >
            운세 보기 🔮
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
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <span className="text-white">자주 묻는 질문</span>
        </h3>
        <div className="space-y-3">
          {FORTUNE_FAQ.map((faq, index) => (
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
