"use client";

import { motion } from "framer-motion";
import { Share2, RefreshCw, Quote } from "lucide-react";
import { PsychResultType } from "../../lib/psychologyData";
import KakaoAdFit from "../KakaoAdFit";

interface PsychologyResultProps {
  result: PsychResultType;
  onReset: () => void;
}

export default function PsychologyResult({ result, onReset }: PsychologyResultProps) {
  const handleShare = async () => {
    const shareData = {
      title: '나의 심리테스트 결과 - ALL NEW FORTUNE',
      text: `[숲속 심리테스트 결과]\n\n당신은 "${result.name}" 타입입니다!\n\n${result.description}\n\n나의 무의식 성향도 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
        alert('결과가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto pb-20 relative z-10">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-green-200 text-sm font-bold mb-2">당신의 내면은...</p>
        <h2 className="text-3xl font-bold text-white">
          {result.name}
        </h2>
      </motion.div>

      {/* Main Result Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mx-4 mb-8 relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500 to-teal-600 rounded-[2rem] blur opacity-75 animate-pulse"></div>
        <div className="relative bg-black/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
           
           {/* Type Header */}
           <div className="p-8 text-center border-b border-white/5 bg-white/5">
              <div className="text-8xl mb-4 drop-shadow-lg animate-bounce-slow">
                {result.emoji}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {result.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
           </div>

           {/* Description */}
           <div className="p-8">
             <div className="relative mb-6">
               <p className="text-white/90 leading-relaxed text-center px-2 font-medium">
                 {result.description}
               </p>
             </div>

             {/* Advice Box */}
             <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                 <Quote className="w-4 h-4 text-green-400 mx-auto mb-2" />
                 <p className="text-sm text-green-100 italic">
                   "{result.advice}"
                 </p>
             </div>
           </div>
        </div>
      </motion.div>

      {/* AdFit */}
      <div className="mx-4 mb-8 flex justify-center items-center overflow-hidden">
        <KakaoAdFit unit="DAN-zgZw9Q6wvZuU1nIl" width="250" height="250" />
      </div>

      {/* Actions */}
      <div className="px-4 flex gap-3 sticky bottom-4 z-50">
        <button
          onClick={onReset}
          className="flex-1 py-4 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-bold shadow-lg hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} /> <span className="text-sm">처음으로</span>
        </button>
        <button
          onClick={handleShare}
          className="flex-[2] py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10"
        >
          <Share2 size={18} /> <span>결과 공유하기</span>
        </button>
      </div>
    </div>
  );
}

