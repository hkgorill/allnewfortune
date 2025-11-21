import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

const ROLLING_TEXTS = [
  "2026 당신의 '갓생' 설계도: 세치 혀를 대신할 운명 가이드",
  "[속보] 2026년 대박 기류 포착! 당신만 모르는 내년 운세",
  "혹시 '내년의 나'를 스포 당해 본 적 있으세요?"
];

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROLLING_TEXTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] w-full overflow-hidden">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        {/* Floating Badge */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-xs font-medium tracking-wider uppercase text-white/90">2026 Premium Horoscope</span>
        </motion.div>

        {/* Main Title with Gradient Text */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            운명의 흐름을
          </span>
          <span className="block text-white drop-shadow-2xl">
            미리 읽다
          </span>
        </h1>

        {/* Rolling Text */}
        <div className="h-20 mb-12 relative flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed absolute px-4 break-keep"
            >
              {ROLLING_TEXTS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-white/10 border border-white/20 rounded-full backdrop-blur-md hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          <span>시작하기</span>
          <div className="ml-2 p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
