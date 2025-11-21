"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
// import KakaoAdFit from "./KakaoAdFit";

export default function FortuneLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 relative z-10">
      
      {/* Main Mystic Orb Animation */}
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
           <Sparkles className="text-white w-10 h-10 animate-spin-slow" />
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-3 drop-shadow-sm">
          별들의 목소리를 듣고 있어요
        </h3>
        <p className="text-white/60 text-sm animate-pulse mb-12 font-light tracking-wide">
          당신의 2026년 운명을 분석하는 중...
        </p>
      </motion.div>

      {/* Loading Screen Ad - Glass Style */}
      {/* <div className="bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-sm">
        <KakaoAdFit
          unit="DAN-iUHbVHNHWKXzbEpq"
          width="250"
          height="250"
          className="animate-in fade-in duration-1000 delay-500 rounded-xl overflow-hidden"
        />
      </div> */}
    </div>
  );
}
