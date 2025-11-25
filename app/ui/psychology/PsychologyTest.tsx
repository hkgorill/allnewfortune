"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PsychologyTestType, 
  FOREST_QUESTIONS, 
  LOVE_QUESTIONS,
  ISLAND_ITEMS,
  calculateForest, 
  calculateLove,
  calculateIsland,
  PsychResultType 
} from "../../data/psychologyData";

interface PsychologyTestProps {
  testType: PsychologyTestType;
  onComplete: (result: PsychResultType) => void;
}

export default function PsychologyTest({ testType, onComplete }: PsychologyTestProps) {
  // 질문 기반 테스트 (숲속, 연애)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  
  // 무인도 테스트 (물건 선택)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const questions = testType === "forest" ? FOREST_QUESTIONS : testType === "love" ? LOVE_QUESTIONS : [];
  const question = questions[currentIndex];
  const progress = testType === "island" 
    ? (selectedItems.length / 3) * 100 
    : ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    setDirection(1);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      // Complete
      const result = testType === "forest" 
        ? calculateForest(newAnswers)
        : calculateLove(newAnswers);
      onComplete(result);
    }
  };

  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      // 이미 선택된 아이템이면 제거
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else if (selectedItems.length < 3) {
      // 3개 미만이면 추가
      const newSelected = [...selectedItems, itemId];
      setSelectedItems(newSelected);
      
      // 3개 선택 완료
      if (newSelected.length === 3) {
        setTimeout(() => {
          const result = calculateIsland(newSelected);
          onComplete(result);
        }, 500);
      }
    }
  };

  // 무인도 테스트 UI
  if (testType === "island") {
    return (
      <div className="w-full max-w-md mx-auto min-h-[60vh] flex flex-col">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex-1 relative">
          <div className="mb-8 text-center">
            <span className="text-blue-300 font-bold text-sm tracking-widest mb-2 block">
              무인도에 가져갈 물건 선택
            </span>
            <h3 className="text-2xl font-bold text-white leading-normal break-keep mb-2">
              물건 3가지를 선택하세요
            </h3>
            <p className="text-white/60 text-sm">
              {selectedItems.length}/3 선택됨
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {ISLAND_ITEMS.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemSelect(item.id)}
                  disabled={!isSelected && selectedItems.length >= 3}
                  whileHover={!isSelected && selectedItems.length < 3 ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-blue-500/30 border-blue-400 shadow-lg"
                      : selectedItems.length >= 3
                      ? "bg-white/5 border-white/10 opacity-50 cursor-not-allowed"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/50"
                  }`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className={`text-xs font-medium ${isSelected ? "text-blue-200" : "text-white/70"}`}>
                    {item.name}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 질문 기반 테스트 UI (숲속, 연애)
  const progressColor = testType === "forest" 
    ? "from-green-500 to-teal-500"
    : "from-pink-500 to-rose-500";
  const textColor = testType === "forest" 
    ? "text-green-300"
    : "text-pink-300";
  const hoverBorder = testType === "forest"
    ? "hover:border-green-400/50"
    : "hover:border-pink-400/50";
  const hoverText = testType === "forest"
    ? "group-hover:text-green-200"
    : "group-hover:text-pink-200";

  return (
    <div className="w-full max-w-md mx-auto min-h-[60vh] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className={`h-full bg-gradient-to-r ${progressColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: 50 * direction, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50 * direction, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="mb-8 text-center">
              <span className={`${textColor} font-bold text-sm tracking-widest mb-2 block`}>
                {testType === "forest" ? "SCENE" : "QUESTION"} {currentIndex + 1}
              </span>
              <h3 className="text-2xl font-bold text-white leading-normal break-keep">
                {question.text}
              </h3>
            </div>

            <div className="space-y-4">
              {question.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(option.type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 ${hoverBorder} transition-all text-left group`}
                >
                  <span className={`text-lg text-white font-medium ${hoverText} transition-colors`}>
                    {option.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

