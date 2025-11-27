import { motion } from "framer-motion";
import { Heart, Users, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { CHEMISTRY_FAQ } from "../../data/chemistryData";

interface ChemistryIntroProps {
  onStart: () => void;
}

export default function ChemistryIntro({ onStart }: ChemistryIntroProps) {
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
        <div className="inline-block p-3 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 mb-4 border border-white/10">
          <Heart className="w-10 h-10 text-pink-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400">
          운명의 궁합 테스트
        </h1>
        <p className="text-white/60 text-lg">
          그 사람과 나는 천생연분일까? <br />
          사주로 풀어보는 우리의 인연
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-pink-400" />
          <h3 className="font-bold text-lg">검사 안내</h3>
        </div>
        <ul className="space-y-3 text-white/70 text-sm">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            <span>두 사람의 생년월일을 기반으로 분석합니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
            <span>겉궁합(띠)과 속궁합(오행)을 모두 봅니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
            <span>상대방의 생일 정보가 필요합니다.</span>
          </li>
        </ul>

        {/* Description Text (Strategy C) */}
        <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-xs text-pink-200/70 leading-relaxed break-keep">
              궁합(宮合)은 두 사람의 사주가 서로 상생(相生)하는지 상극(相剋)하는지를 판단하는 전통적인 방법입니다. 
              서로 부족한 오행을 채워주는 관계인지, 혹은 부딪히는 기운이 강한지를 미리 파악하여 
              더욱 조화로운 관계를 만들어가는 지혜를 얻으세요.
            </p>
        </div>
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
          {CHEMISTRY_FAQ.map((faq, index) => (
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
        className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold text-lg shadow-lg shadow-pink-500/30 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        궁합 보러가기
      </motion.button>
    </div>
  );
}






