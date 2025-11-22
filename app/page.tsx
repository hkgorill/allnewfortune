"use client";

import { motion, AnimatePresence } from "framer-motion";
import MenuScreen from "./ui/MenuScreen";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      
      <AnimatePresence mode="wait">
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md z-10 min-h-screen"
          >
            <MenuScreen />
          </motion.div>
      </AnimatePresence>

      {/* Global Footer */}
      <footer className="absolute bottom-4 w-full text-center z-50 pb-4">
        <div className="flex justify-center gap-4 mb-2 text-[10px] text-white/50 font-light">
          <a href="/about" className="hover:text-white transition-colors">서비스 소개</a>
          <span className="text-white/20">|</span>
          <a href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</a>
          <span className="text-white/20">|</span>
          <a href="/contact" className="hover:text-white transition-colors">문의하기</a>
        </div>
        <p className="text-[10px] text-white/30 font-light tracking-widest">
          © 2026 ALL NEW FORTUNE. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
