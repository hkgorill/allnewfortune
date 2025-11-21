"use client";

import { motion } from "framer-motion";
import { HOROSCOPE_SIGNS, HoroscopeSign } from "../data/horoscopeData";

interface HoroscopeSelectProps {
  onSelect: (signId: string) => void;
}

export default function HoroscopeSelect({ onSelect }: HoroscopeSelectProps) {
  return (
    <div className="w-full max-w-md mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          당신의 별자리는?
        </h3>
        <p className="text-white/50 text-sm">
          생일에 맞는 별자리를 선택해주세요
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {HOROSCOPE_SIGNS.map((sign, index) => (
          <motion.button
            key={sign.id}
            onClick={() => onSelect(sign.id)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-violet-400/50 transition-all group"
          >
            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 block filter drop-shadow-lg">
              {sign.icon}
            </span>
            <span className="text-white font-bold text-sm">{sign.name}</span>
            <span className="text-[10px] text-white/40 mt-1">{sign.dateRange}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

