"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TAROT_CARDS, TarotCard } from "../../data/tarotData";
import { TarotCategory } from "./TarotIntro";

interface TarotTestProps {
  category: TarotCategory;
  onComplete: (cards: TarotCard[]) => void;
}

export default function TarotTest({ category, onComplete }: TarotTestProps) {
  const [step, setStep] = useState<"shuffle" | "spread" | "picking">("shuffle");
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  
  // 카드 섞기 및 22장 준비
  useEffect(() => {
    if (step === "shuffle") {
      setIsShuffling(true);
      // 22장 카드를 랜덤하게 섞기
      const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      
      const timer = setTimeout(() => {
        setIsShuffling(false);
        setStep("spread");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleCardPick = (card: TarotCard) => {
    if (selectedCards.find(c => c.id === card.id)) return; // 이미 선택된 카드는 무시
    
    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);
    
    if (newSelected.length === 3) {
      setStep("picking");
      setTimeout(() => {
        onComplete(newSelected);
      }, 800);
    }
  };
  
  const getCategoryName = (cat: TarotCategory): string => {
    const names: Record<TarotCategory, string> = {
      business: "사업운",
      love: "애정운",
      study: "학업운",
      career: "취업운",
      relationship: "인간관계운",
    };
    return names[cat];
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
            <h3 className="text-xl font-bold text-center text-white mb-2">
              {getCategoryName(category)} 운명의 카드
            </h3>
            <p className="text-white/60 text-center text-sm mb-6">
              직관적으로 끌리는 카드를 3장 선택하세요 ({selectedCards.length}/3)
            </p>

            <div className="grid grid-cols-4 gap-2 perspective-1000 px-2 mb-4">
              {shuffledCards.map((card, i) => {
                const isSelected = selectedCards.find(c => c.id === card.id) !== undefined;
                return (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardPick(card)}
                    initial={{ rotateY: 180, opacity: 0, y: 50 }}
                    animate={{ 
                      rotateY: 0, 
                      opacity: 1, 
                      y: 0,
                      scale: isSelected ? 0.9 : 1,
                      borderColor: isSelected ? "rgba(59, 130, 246, 0.8)" : "rgba(255, 255, 255, 0.3)"
                    }}
                    transition={{ delay: i * 0.02, type: "spring" }}
                    whileHover={!isSelected ? { y: -20, scale: 1.1, zIndex: 10 } : {}}
                    whileTap={{ scale: 0.9 }}
                    disabled={isSelected || selectedCards.length >= 3}
                    className={`aspect-[2/3] bg-gradient-to-br from-indigo-800 to-purple-900 rounded-lg border-2 shadow-lg relative overflow-hidden group ${
                      isSelected ? "ring-2 ring-blue-400" : ""
                    } ${selectedCards.length >= 3 && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center z-10">
                        <span className="text-3xl">✓</span>
                      </div>
                    )}
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">✴️</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {selectedCards.length > 0 && (
              <div className="text-center mb-4">
                <p className="text-blue-300 text-sm font-medium">
                  선택된 카드: {selectedCards.length}/3
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

