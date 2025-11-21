"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PSYCH_QUESTIONS, calculatePsychology, PsychResultType } from "../../data/psychologyData";

interface PsychologyTestProps {
  onComplete: (result: PsychResultType) => void;
}

export default function PsychologyTest({ onComplete }: PsychologyTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);

  const question = PSYCH_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / PSYCH_QUESTIONS.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    setDirection(1);

    if (currentIndex < PSYCH_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      // Complete
      const result = calculatePsychology(newAnswers);
      onComplete(result);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[60vh] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-green-500 to-teal-500"
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
              <span className="text-green-300 font-bold text-sm tracking-widest mb-2 block">
                SCENE {currentIndex + 1}
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
                  className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-400/50 transition-all text-left group"
                >
                  <span className="text-lg text-white font-medium group-hover:text-green-200 transition-colors">
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

