"use client";

import { motion } from "framer-motion";
import { Activity, HelpCircle } from "lucide-react";

interface PsychologyIntroProps {
  onStart: () => void;
}

export default function PsychologyIntro({ onStart }: PsychologyIntroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col"
    >
      {/* Intro Card */}
      <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 relative overflow-hidden mb-8 text-center">
         <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-500/30 rounded-full blur-3xl pointer-events-none" />
         <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

         <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float border border-white/10">
                <Activity size={40} className="text-green-300" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
              숲속 심리테스트
            </h2>
            <p className="text-green-100 mb-8 font-light">
              상상 속의 숲을 거닐며<br/>
              나의 무의식을 확인해보세요.
            </p>

            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all"
            >
              숲으로 떠나기 🌲
            </motion.button>
         </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 text-white/60 text-sm leading-relaxed">
         <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-lg">
           <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="text-green-400" />
              <h3 className="text-lg font-bold text-white">심리테스트 FAQ</h3>
           </div>
           
           <div className="space-y-6">
             <div>
               <h4 className="font-bold text-white mb-1">Q. 어떤 방식으로 진행되나요?</h4>
               <p>A. 간단한 상황이 주어지면, 직관적으로 떠오르는 행동이나 선택지를 고르면 됩니다. 깊게 고민하지 말고 바로 선택하세요.</p>
             </div>
             <div>
               <h4 className="font-bold text-white mb-1">Q. 결과는 무엇을 알려주나요?</h4>
               <p>A. 당신의 무의식 속에 숨겨진 성향, 인간관계를 맺는 방식, 현재의 심리 상태 등을 동물에 빗대어 재미있게 풀이해 드립니다.</p>
             </div>
             <div>
               <h4 className="font-bold text-white mb-1">Q. 친구와 함께 해도 되나요?</h4>
               <p>A. 물론입니다! 서로의 결과가 어떻게 다른지 비교해보면 서로를 더 깊이 이해하는 계기가 될 수 있습니다.</p>
             </div>
           </div>
         </div>
      </div>
    </motion.div>
  );
}

