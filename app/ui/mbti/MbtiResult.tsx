"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, RefreshCw, Sparkles, Quote, Home, BookOpen } from "lucide-react";
import { MbtiResultType } from "../../data/mbtiData";
import KakaoAdFit from "../KakaoAdFit";
import GoogleAdSense from "../GoogleAdSense";

interface MbtiResultProps {
  result: MbtiResultType;
  onReset: () => void;
}

export default function MbtiResult({ result, onReset }: MbtiResultProps) {
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareData = {
      title: '나의 MBTI 성격 유형 - ALL NEW FORTUNE',
      text: `[나의 성격 유형 결과]\n\n"${result.title} (${result.type})"\n\n${result.description}\n\n당신의 MBTI도 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareData.text}\n\n ${shareData.url}`);
        alert('결과가 클립보드에 복사되었습니다!');
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = `${shareData.text}\n\n ${shareData.url}`;
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
    } finally {
      setIsSharing(false);
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
        <p className="text-purple-200 text-sm font-bold mb-2">분석 완료!</p>
        <h2 className="text-3xl font-bold text-white">
          당신의 성격 유형은?
        </h2>
      </motion.div>

      {/* Main Result Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mx-4 mb-8 relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-[2rem] blur opacity-75 animate-pulse"></div>
        <div className="relative bg-black/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
           
           {/* Type Header */}
           <div className="p-8 text-center border-b border-white/5 bg-white/5">
              <h3 className={`text-6xl font-extrabold ${result.color} mb-4 tracking-tighter drop-shadow-lg`}>
                {result.type}
              </h3>
              <h4 className="text-xl font-bold text-white mb-2">
                {result.title}
              </h4>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {result.traits.map((trait, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 border border-white/10">
                    {trait}
                  </span>
                ))}
              </div>
           </div>

           {/* Description */}
           <div className="p-8">
             <div className="relative mb-6">
               <Quote className="absolute -top-2 -left-2 w-6 h-6 text-white/20 rotate-180" />
               <p className="text-white/80 leading-relaxed text-center px-4">
                 {result.description}
               </p>
               <Quote className="absolute -bottom-2 -right-2 w-6 h-6 text-white/20" />
             </div>

             {/* Compatibility */}
             <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                 <span className="text-xs text-gray-400 block mb-1">환상의 케미 💕</span>
                 <span className="text-lg font-bold text-pink-300">{result.bestMatch}</span>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                 <span className="text-xs text-gray-400 block mb-1">아쉬운 케미 💔</span>
                 <span className="text-lg font-bold text-gray-300">{result.worstMatch}</span>
               </div>
             </div>
           </div>
        </div>
      </motion.div>

      {/* Methodology Section (Strategy B) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4 mb-8 p-5 bg-white/5 rounded-2xl border border-white/10 text-left"
      >
        <h3 className="text-sm font-bold text-white/90 mb-2 flex items-center gap-2">
          <BookOpen size={16} className="text-pink-400"/> 
          성격 유형 분석 원리
        </h3>
        <p className="text-xs text-white/60 leading-relaxed">
          본 검사는 카를 융(Carl Jung)의 심리 유형론을 바탕으로 개발된 MBTI(Myers-Briggs Type Indicator) 이론을 기반으로 합니다. 
          에너지의 방향(E/I), 인식 방식(S/N), 판단 근거(T/F), 생활 양식(J/P)의 4가지 지표를 조합하여 
          총 16가지 성격 유형 중 당신에게 가장 가까운 유형을 도출합니다.
        </p>
      </motion.div>

      {/* AdFit */}
      { <div className="w-full mb-8 flex justify-center items-center min-h-[250px] px-4">
        <div className="w-full max-w-[250px] flex justify-center">
          <KakaoAdFit unit="DAN-oEqhVJwNYljTA78D" width="250" height="250" />
        </div>
      </div> }

      <div className="mx-4 mb-8">
        <GoogleAdSense slot="1234567890" />
      </div>

      {/* Actions */}
      <div className="px-4 space-y-3 sticky bottom-4 z-50 pb-4">
        <button
          onClick={onReset}
          className="w-full py-4 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-bold shadow-lg hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} /> <span className="text-sm">처음으로</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Share2 size={18} />
            )}
            <span>{isSharing ? '공유 중...' : '결과 공유'}</span>
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className="py-4 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-bold shadow-lg hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} /> <span>홈으로</span>
          </button>
        </div>
      </div>
    </div>
  );
}
