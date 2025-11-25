"use client";

import { motion } from "framer-motion";
import { MoonStar, HelpCircle } from "lucide-react";

interface HoroscopeIntroProps {
  onStart: () => void;
}

export default function HoroscopeIntro({ onStart }: HoroscopeIntroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col"
    >
      {/* Intro Card */}
      <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 relative overflow-hidden mb-8 text-center">
         <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/30 rounded-full blur-3xl pointer-events-none" />
         <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

         <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-float">
                <MoonStar size={40} className="text-violet-300" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">
              오늘의 운세 (별자리)
            </h2>
            <p className="text-violet-200 mb-8">
              오늘 밤 별들이 당신에게<br/>
              어떤 속삭임을 전해줄까요?
            </p>

            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all"
            >
              별자리 선택하기 ✨
            </motion.button>
         </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 text-white/60 text-sm leading-relaxed">
         <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-lg">
           <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="text-violet-400" />
              <h3 className="text-lg font-bold text-white">별자리 FAQ</h3>
           </div>
           
           <div className="space-y-6">
             <div>
               <h4 className="font-bold text-white mb-1">Q. 제 별자리를 모르겠어요.</h4>
               <p>A. 생일 기준으로 정해집니다. 별자리 선택 화면에서 날짜를 확인하고 선택하시면 됩니다.</p>
             </div>
             <div>
               <h4 className="font-bold text-white mb-1">Q. 운세는 매일 바뀌나요?</h4>
               <p>A. 네, 매일 자정을 기준으로 새로운 별들의 배치를 분석하여 오늘의 운세가 갱신됩니다.</p>
             </div>
             <div>
               <h4 className="font-bold text-white mb-1">Q. 행운의 아이템은 무엇인가요?</h4>
               <p>A. 그날 당신의 기운을 북돋아 줄 색상, 숫자, 시간을 추천해 드립니다. 참고하여 하루를 계획해보세요.</p>
             </div>
           </div>
         </div>
      </div>
    </motion.div>
  );
}

