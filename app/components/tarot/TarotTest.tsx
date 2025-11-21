"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomCard, TarotCard } from "../../lib/tarotData";

interface TarotTestProps {
  onComplete: (card: TarotCard) => void;
}

export default function TarotTest({ onComplete }: TarotTestProps) {
  const [step, setStep] = useState<"shuffle" | "spread" | "picking">("shuffle");
  const [isShuffling, setIsShuffling] = useState(false);
  
  // Shuffle Animation Effect
  useEffect(() => {
    if (step === "shuffle") {
      setIsShuffling(true);
      const timer = setTimeout(() => {
        setIsShuffling(false);
        setStep("spread");
      }, 2500); // 2.5초 동안 셔플
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleCardPick = () => {
    const selectedCard = getRandomCard();
    setStep("picking");
    setTimeout(() => {
        onComplete(selectedCard);
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[60vh] flex flex-col items-center justify-center relative">
      <AnimatePresence mode="wait">
        {/* Step 1: Shuffling */}
        {step === "shuffle" && (
          <motion.div
            key="shuffle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            className="text-center"
          >
             <h3 className="text-2xl font-bold text-white mb-8 animate-pulse">
               카드를 섞는 중입니다...
             </h3>
             
             <div className="relative w-32 h-48 mx-auto">
               {[...Array(5)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl border-2 border-white/20 shadow-xl"
                    animate={{
                        x: isShuffling ? [0, (i%2===0 ? 20 : -20), 0] : 0,
                        y: isShuffling ? [0, (i%2===0 ? -10 : 10), 0] : 0,
                        rotate: isShuffling ? [0, (i*5), 0] : i * 2,
                        scale: isShuffling ? [1, 1.05, 1] : 1
                    }}
                    transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        delay: i * 0.05
                    }}
                 >
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        <span className="text-4xl">🔮</span>
                    </div>
                 </motion.div>
               ))}
             </div>
             
             <p className="text-white/50 mt-8 text-sm">
               마음속으로 질문을 되뇌어보세요
             </p>
          </motion.div>
        )}

        {/* Step 2: Spread & Pick */}
        {step === "spread" && (
          <motion.div
            key="spread"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <h3 className="text-xl font-bold text-center text-white mb-6">
              운명의 카드를 선택하세요
            </h3>

            <div className="grid grid-cols-4 gap-2 perspective-1000 px-2">
              {[...Array(12)].map((_, i) => (
                <motion.button
                  key={i}
                  onClick={handleCardPick}
                  initial={{ rotateY: 180, opacity: 0, y: 50 }}
                  animate={{ rotateY: 0, opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  whileHover={{ y: -20, scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="aspect-[2/3] bg-gradient-to-br from-indigo-800 to-purple-900 rounded-lg border border-white/30 shadow-lg relative overflow-hidden group"
                >
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
                   <div className="w-full h-full flex items-center justify-center">
                     <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">✴️</span>
                   </div>
                </motion.button>
              ))}
            </div>
            
             <p className="text-white/40 text-center mt-8 text-xs">
               직관적으로 끌리는 카드를 한 장 터치하세요
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

