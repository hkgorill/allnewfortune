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
      {/* Footer is now handled in app/layout.tsx */}
    </main>
  );
}
