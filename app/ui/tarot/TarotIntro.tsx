"use client";

import { motion } from "framer-motion";
import { Eye, HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export type TarotCategory =
  | "business"
  | "love"
  | "study"
  | "career"
  | "relationship";

interface TarotIntroProps {
  onStart: (category: TarotCategory) => void;
}

const TAROT_CATEGORIES: {
  id: TarotCategory;
  name: string;
  emoji: string;
  color: string;
  shadowColor: string;
}[] = [
  {
    id: "business",
    name: "사업운",
    emoji: "💼",
    color: "from-green-500 to-emerald-500",
    shadowColor: "rgba(34,197,94,0.4)",
  },
  {
    id: "love",
    name: "애정운",
    emoji: "💕",
    color: "from-pink-500 to-rose-500",
    shadowColor: "rgba(236,72,153,0.4)",
  },
  {
    id: "study",
    name: "학업운",
    emoji: "📚",
    color: "from-blue-500 to-cyan-500",
    shadowColor: "rgba(59,130,246,0.4)",
  },
  {
    id: "career",
    name: "취업운",
    emoji: "🎯",
    color: "from-purple-500 to-indigo-500",
    shadowColor: "rgba(168,85,247,0.4)",
  },
  {
    id: "relationship",
    name: "인간관계운",
    emoji: "🤝",
    color: "from-orange-500 to-amber-500",
    shadowColor: "rgba(249,115,22,0.4)",
  },
];

const TAROT_FAQ = [
  {
    q: "왜 3장을 뽑나요?",
    a: "메이저 아르카나 22장 중 3장을 선택하면, 각 카드가 과거의 영향, 현재의 상황, 미래의 가능성을 보여줍니다. 3장을 종합하여 더욱 깊이 있고 정확한 해석을 제공할 수 있습니다.",
  },
  {
    q: "카테고리별로 다른 점괘가 나오나요?",
    a: "네, 사업운, 애정운, 학업운, 취업운, 인간관계운 각 카테고리에 맞춰 카드의 의미를 해석합니다. 같은 카드라도 선택한 운세 카테고리에 따라 조언이 달라집니다.",
  },
  {
    q: "메이저 아르카나만 사용하나요?",
    a: "네, ALL NEW FORTUNE의 타로 서비스는 메이저 아르카나 22장만 사용합니다. 메이저 아르카나는 인생의 큰 흐름과 중요한 전환점을 상징하므로, 운세 점괘에 가장 적합합니다.",
  },
  {
    q: "결과가 나쁘게 나오면 어떡하죠?",
    a: "타로는 미래를 확정 짓는 것이 아니라 조언을 주는 도구입니다. 나쁜 카드가 나왔다면 그것은 경고나 주의사항일 수 있습니다. 카드의 메시지를 참고하여 더 좋은 방향으로 나아가세요.",
  },
  {
    q: "하루에 여러 번 봐도 되나요?",
    a: "같은 카테고리로 여러 번 보는 것은 추천하지 않습니다. 하지만 다른 운세 카테고리(예: 사업운과 애정운)를 선택한다면 언제든 다시 확인해보셔도 좋습니다.",
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
          <p className="text-white/60 text-xs mb-4">
            메이저 아르카나 22장 중 3장을 뽑아보세요
          </p>
          <p className="text-blue-200 mb-6">
            알고 싶은 운세를 선택하고
            <br />
            운명의 카드를 뽑아보세요
          </p>

          <div className="w-full space-y-2 mb-4">
            {TAROT_CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => onStart(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 bg-gradient-to-r ${category.color} text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2`}
                style={{
                  boxShadow: `0 0 20px ${category.shadowColor}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px ${category.shadowColor.replace(
                    "0.4",
                    "0.6"
                  )}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${category.shadowColor}`;
                }}
              >
                <span className="text-lg">{category.emoji}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
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
