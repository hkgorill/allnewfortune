"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Heart, Star, Moon, Search, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";

export type LoadingType = 
  | "fortune"   // 신년운세
  | "saju"      // 사주
  | "tarot"     // 타로
  | "chemistry" // 궁합
  | "mbti"      // MBTI
  | "finger"    // 뇌구조
  | "psychology" // 심리테스트
  | "horoscope" // 별자리
  | "default";

interface FortuneLoadingProps {
  type?: LoadingType;
}

const LOADING_MESSAGES: Record<LoadingType, { title: string; desc: string; icon: any }> = {
  fortune: {
    title: "별들의 목소리를 듣고 있어요",
    desc: "당신의 2026년 운명을 분석하는 중...",
    icon: Sparkles
  },
  saju: {
    title: "만세력을 펼치고 있습니다",
    desc: "태어난 시각에 담긴 우주의 기운을 읽는 중...",
    icon: Moon
  },
  tarot: {
    title: "카드의 에너지를 읽는 중",
    desc: "당신의 무의식이 선택한 운명을 해석하고 있어요...",
    icon: Wand2
  },
  chemistry: {
    title: "두 분의 인연을 확인 중입니다",
    desc: "운명의 붉은 실이 어디까지 이어져 있을까요? 💕",
    icon: Heart
  },
  mbti: {
    title: "성격 유형 데이터를 분석 중",
    desc: "당신의 내면 깊은 곳을 탐험하고 있어요 🔍",
    icon: Search
  },
  finger: {
    title: "머리 속을 꼼꼼히 살피는 중이에요",
    desc: "좌뇌? 우뇌? 어느 쪽이 더 활발할까요? 🧠",
    icon: Brain
  },
  psychology: {
    title: "심리 상태를 분석하고 있습니다",
    desc: "당신도 몰랐던 당신의 마음을 발견하는 중...",
    icon: Search
  },
  horoscope: {
    title: "밤하늘의 별자리를 관측 중",
    desc: "행운의 별이 당신을 비추고 있을까요? ✨",
    icon: Star
  },
  default: {
    title: "데이터를 분석하고 있습니다",
    desc: "잠시만 기다려주세요...",
    icon: Sparkles
  }
};

export default function FortuneLoading({ type = "default" }: FortuneLoadingProps) {
  const config = LOADING_MESSAGES[type] || LOADING_MESSAGES.default;
  const Icon = config.icon;

  // 로딩 중 문구 변경 효과를 위해 (선택 사항)
  // const [dots, setDots] = useState("");
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDots(prev => prev.length >= 3 ? "" : prev + ".");
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 relative z-10">
      
      {/* Main Animation */}
      <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
        {/* Outer Pulse */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Rotating Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-purple-300/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-dotted border-pink-300/30 rounded-full"
        />
        
        {/* Center Glowing Core */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full shadow-[0_0_50px_rgba(167,139,250,0.6)] flex items-center justify-center backdrop-blur-sm"
        >
           <Icon className="text-white w-10 h-10 animate-spin-slow" />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Text Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={type} // 타입이 바뀌면 애니메이션 다시 시작
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-3 drop-shadow-sm">
            {config.title}
          </h3>
          <p className="text-white/60 text-sm animate-pulse mb-12 font-light tracking-wide">
            {config.desc}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
