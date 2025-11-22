"use client";

import { motion } from "framer-motion";
import { Share2, RefreshCw, Sparkles, Quote } from "lucide-react";
import { TarotCard } from "../../data/tarotData";
import KakaoAdFit from "../KakaoAdFit";

interface TarotResultProps {
  card: TarotCard;
  onReset: () => void;
}

export default function TarotResult({ card, onReset }: TarotResultProps) {
  const handleShare = async () => {
    const shareData = {
      title: '나의 타로 카드 결과 - ALL NEW FORTUNE',
      text: `[타로 카드 결과]\n\n🔮 ${card.name_ko} (${card.name})\n\n"${card.advice}"\n\n당신의 운명도 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
        alert('결과가 클립보드에 복사되었습니다!');
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = `${shareData.text}\n\n${shareData.url}`;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('결과가 클립보드에 복사되었습니다!');
        } catch (err) {
          alert('공유하기를 지원하지 않는 브라우저입니다.');
        }
        document.body.removeChild(textArea);
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
        className="text-center mb-6"
      >
        <p className="text-blue-200 text-sm font-bold mb-2">당신이 뽑은 카드는</p>
        <h2 className={`text-3xl font-bold ${card.color} drop-shadow-md`}>
          {card.name_ko}
        </h2>
        <p className="text-white/50 text-xs uppercase tracking-widest mt-1">
          {card.name}
        </p>
      </motion.div>

      {/* Card Display */}
      <motion.div 
        initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex justify-center mb-8 perspective-1000"
      >
         <div className="relative w-48 h-72 bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
            
            {/* Card Image (Emoji) */}
            <span className="text-8xl drop-shadow-2xl filter group-hover:scale-110 transition-transform duration-500">
                {card.image_emoji}
            </span>
            
            {/* Decoration */}
            <div className="absolute bottom-4 left-0 w-full text-center">
                <Sparkles className="w-4 h-4 text-yellow-200 mx-auto opacity-50" />
            </div>
         </div>
      </motion.div>

      {/* Interpretation Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-4 mb-8 p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-xl"
      >
         {/* Keywords */}
         <div className="flex flex-wrap justify-center gap-2 mb-6">
            {card.keywords.map((keyword, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/10">
                    #{keyword}
                </span>
            ))}
         </div>

         {/* Description */}
         <div className="mb-6 text-center">
             <h3 className="text-lg font-bold text-white mb-2">카드의 의미</h3>
             <p className="text-white/80 text-sm leading-relaxed">
                 {card.description}
             </p>
         </div>

         {/* Advice (Highlighted) */}
         <div className="relative p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-white/10 text-center">
            <Quote className="absolute top-2 left-2 w-4 h-4 text-white/30 rotate-180" />
             <h3 className="text-sm font-bold text-indigo-300 mb-2 uppercase tracking-wider">Oracle's Advice</h3>
             <p className="text-lg font-bold text-white leading-snug">
                 "{card.advice}"
             </p>
            <Quote className="absolute bottom-2 right-2 w-4 h-4 text-white/30" />
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
          <RefreshCw size={18} /> <span className="text-sm">다른 카드</span>
        </button>
        <button
          onClick={handleShare}
          className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10"
        >
          <Share2 size={18} /> <span>결과 공유하기</span>
        </button>
      </div>
    </div>
  );
}


