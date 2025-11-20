'use client';

import { motion } from 'framer-motion';
import { Moon, Star } from 'lucide-react';
import KakaoAdFit from './KakaoAdFit';

export default function FortuneLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="relative w-32 h-32 mb-8">
        {/* Center Moon */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center text-[var(--color-main)]"
        >
          <Moon size={80} fill="currentColor" className="opacity-80" />
        </motion.div>

        {/* Orbiting Stars */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Star 
            size={24} 
            className="absolute top-0 left-1/2 -translate-x-1/2 text-[var(--color-highlight)] fill-current" 
          />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Star 
            size={16} 
            className="absolute bottom-2 right-2 text-[var(--color-highlight)] fill-current opacity-60" 
          />
        </motion.div>
      </div>

      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
        2026년의 기운을 모으고 있어요
      </h3>
      <p className="text-[var(--color-text-secondary)] text-sm animate-pulse mb-12">
        잠시만 기다려주세요...
      </p>
      
      {/* Loading Screen Ad */}
      <KakaoAdFit 
        unit="DAN-iUHbVHNHWKXzbEpq" 
        width="250" 
        height="250" 
        className="animate-in fade-in duration-1000 delay-500"
      />
    </div>
  );
}
