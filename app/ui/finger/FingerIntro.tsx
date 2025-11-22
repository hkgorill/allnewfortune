import { motion } from "framer-motion";
import { Brain, Fingerprint, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { FINGER_FAQ } from "../../data/fingerData";

interface FingerIntroProps {
  onStart: () => void;
}

export default function FingerIntro({ onStart }: FingerIntroProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 pb-24 w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-block p-3 rounded-full bg-gradient-to-br from-pink-500/20 to-blue-500/20 mb-4 border border-white/10">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">
          뇌 구조 테스트
        </h1>
        <p className="text-white/60 text-lg">
          에겐남? 테토녀? <br />
          내 손가락에 숨겨진 본능 찾기
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Fingerprint className="w-6 h-6 text-pink-400" />
          <h3 className="font-bold text-lg">검사 안내</h3>
        </div>
        <ul className="space-y-3 text-white/70 text-sm">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
            <span>손가락 길이와 심리 질문을 통해 분석합니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
            <span>총 7개의 질문으로 구성되어 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
            <span>소요 시간은 약 1분입니다.</span>
          </li>
        </ul>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full mb-8"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-white/60" />
          자주 묻는 질문
        </h3>
        <div className="space-y-3">
          {FINGER_FAQ.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-colors hover:bg-white/10"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-4 flex items-center justify-between text-left font-medium text-sm"
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

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        onClick={onStart}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:opacity-90 active:scale-95 transition-all"
      >
        테스트 시작하기
      </motion.button>
    </div>
  );
}

