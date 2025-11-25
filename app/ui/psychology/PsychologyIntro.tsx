"use client";

import { motion } from "framer-motion";
import {
  Activity,
  HelpCircle,
  ArrowRight,
  TreePine,
  Ship,
  Heart,
} from "lucide-react";
import { useState } from "react";

export type PsychologyTestType = "forest" | "island" | "love";

interface PsychologyIntroProps {
  onStart: (testType: PsychologyTestType) => void;
}

const PSYCHOLOGY_TESTS: {
  id: PsychologyTestType;
  name: string;
  subtitle: string;
  emoji: string;
  icon: typeof Activity;
  color: string;
  shadowColor: string;
  description: string;
}[] = [
  {
    id: "forest",
    name: "숲속 심리테스트",
    subtitle: "투사적 심리테스트",
    emoji: "🌲",
    icon: TreePine,
    color: "from-green-500 to-emerald-600",
    shadowColor: "rgba(34,197,94,0.4)",
    description: "상상 속의 숲을 거닐며 나의 무의식을 확인해보세요.",
  },
  {
    id: "island",
    name: "무인도 심리테스트",
    subtitle: "상황/선택 심리테스트",
    emoji: "🏝️",
    icon: Ship,
    color: "from-blue-500 to-cyan-600",
    shadowColor: "rgba(59,130,246,0.4)",
    description:
      "무인도에 가져갈 물건 3가지를 선택하여 나의 우선순위와 가치관을 확인합니다.",
  },
  {
    id: "love",
    name: "연애 MBTI 심리테스트",
    subtitle: "상황/선택 심리테스트",
    emoji: "💌",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    shadowColor: "rgba(236,72,153,0.4)",
    description:
      "데이트 중 예상치 못한 상황에 대한 반응을 통해 연애 스타일을 분석합니다.",
  },
];

const PSYCHOLOGY_FAQ = [
  {
    q: "어떤 방식으로 진행되나요?",
    a: "간단한 상황이 주어지면, 직관적으로 떠오르는 행동이나 선택지를 고르면 됩니다. 깊게 고민하지 말고 바로 선택하세요.",
  },
  {
    q: "결과는 무엇을 알려주나요?",
    a: "당신의 무의식 속에 숨겨진 성향, 인간관계를 맺는 방식, 현재의 심리 상태 등을 동물에 빗대어 재미있게 풀이해 드립니다.",
  },
  {
    q: "친구와 함께 해도 되나요?",
    a: "물론입니다! 서로의 결과가 어떻게 다른지 비교해보면 서로를 더 깊이 이해하는 계기가 될 수 있습니다.",
  },
];

export default function PsychologyIntro({ onStart }: PsychologyIntroProps) {
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
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float border border-white/10">
            <Activity size={40} className="text-green-300" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
            심리테스트
          </h2>
          <p className="text-green-100 mb-6 font-light text-center">
            나를 더 깊이 알아보는
            <br />
            3가지 심리테스트
          </p>

          <div className="w-full space-y-3 mb-4">
            {PSYCHOLOGY_TESTS.map((test, index) => {
              const Icon = test.icon;
              return (
                <motion.button
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => onStart(test.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-5 bg-gradient-to-r ${test.color} text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-between group`}
                  style={{
                    boxShadow: `0 0 20px ${test.shadowColor}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${test.shadowColor.replace(
                      "0.4",
                      "0.6"
                    )}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${test.shadowColor}`;
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{test.emoji}</span>
                    <div className="text-left">
                      <div className="text-xs opacity-90 mb-0.5">
                        {test.subtitle}
                      </div>
                      <div className="text-base">{test.name}</div>
                    </div>
                  </div>
                  <Icon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              );
            })}
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
          <HelpCircle className="w-5 h-5 text-green-400" />
          <span className="text-white">자주 묻는 질문</span>
        </h3>
        <div className="space-y-3">
          {PSYCHOLOGY_FAQ.map((faq, index) => (
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
