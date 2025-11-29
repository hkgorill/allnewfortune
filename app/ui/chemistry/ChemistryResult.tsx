"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Share2, Home, Heart, Star, Flame, BookOpen } from "lucide-react";
import KakaoAdFit from "../KakaoAdFit";
import GoogleAdSense from "../GoogleAdSense";
import { ChemistryResultType } from "../../data/chemistryData";

interface ChemistryResultProps {
  resultData: ChemistryResultType;
  onReset: () => void;
}

export default function ChemistryResult({ resultData, onReset }: ChemistryResultProps) {
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareData = {
      title: '궁합 테스트 결과',
      text: `[ALL NEW FORTUNE] ${resultData.myName && resultData.partnerName ? `${resultData.myName}님과 ${resultData.partnerName}님의` : '우리의'} 궁합 점수는 ${resultData.score}점! 💕\n\n"${resultData.title}"\n\n당신의 운명적 궁합도 확인해보세요!`,
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
    <div className="w-full max-w-md mx-auto px-6 py-12 pb-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full text-center mb-8"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm mb-4 text-pink-300">
          {resultData.myName && resultData.partnerName ? `${resultData.myName}님 ❤️ ${resultData.partnerName}님의` : '우리의'} 궁합 점수는?
        </span>
        
        {/* Score Circle */}
        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
           <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
             <circle
               cx="50"
               cy="50"
               r="45"
               fill="none"
               stroke="#ffffff20"
               strokeWidth="8"
             />
             <motion.circle
               cx="50"
               cy="50"
               r="45"
               fill="none"
               stroke="url(#gradient)"
               strokeWidth="8"
               strokeDasharray="283"
               strokeDashoffset="283"
               animate={{ strokeDashoffset: 283 - (283 * resultData.score) / 100 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               strokeLinecap="round"
             />
             <defs>
               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#ef4444" />
                 <stop offset="100%" stopColor="#ec4899" />
               </linearGradient>
             </defs>
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-4xl font-bold text-white">{resultData.score}</span>
             <span className="text-xs text-white/60">점</span>
           </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-white">
          {resultData.title}
        </h1>
        <p className="text-white/70 text-sm px-4 break-keep">{resultData.advice}</p>
      </motion.div>

      {/* Detail Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full grid grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <div className="flex justify-center mb-2 text-yellow-400">
            <Star className="w-6 h-6" />
          </div>
          <span className="block text-white/60 text-xs mb-1">띠 궁합 (겉궁합)</span>
          <p className="font-bold text-lg text-white">{resultData.zodiacMatch.label}</p>
          <span className="text-xs text-white/40">{resultData.zodiacMatch.score}점</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <div className="flex justify-center mb-2 text-red-400">
            <Flame className="w-6 h-6" />
          </div>
          <span className="block text-white/60 text-xs mb-1">오행 궁합 (속궁합)</span>
          <p className="font-bold text-lg text-white">{resultData.elementMatch.label}</p>
          <span className="text-xs text-white/40">{resultData.elementMatch.score}점</span>
        </div>
      </motion.div>

      {/* Description Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-md text-left space-y-6"
      >
        <div>
          <h3 className="font-bold text-lg mb-3 text-pink-400 flex items-center gap-2">
            <Heart className="w-5 h-5" /> 상세 분석
          </h3>
          <ul className="space-y-2 text-white/80 text-sm leading-relaxed list-disc list-outside pl-4">
            {resultData.totalDescription.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-white/60 mb-1">띠 궁합 코멘트</p>
          <p className="text-white/90 font-medium">{resultData.zodiacMatch.description}</p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-white/60 mb-1">오행 궁합 코멘트</p>
          <p className="text-white/90 font-medium">{resultData.elementMatch.description}</p>
        </div>
      </motion.div>

      {/* Methodology Section (Strategy B) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left"
      >
        <h3 className="text-sm font-bold text-white/90 mb-2 flex items-center gap-2">
          <BookOpen size={16} className="text-pink-400"/> 
          궁합 분석 원리
        </h3>
        <p className="text-xs text-white/60 leading-relaxed">
          이 궁합 분석은 두 가지 차원에서 이루어집니다. <br/>
          첫째, <strong>띠 궁합(Zodiac Harmony)</strong>은 태어난 해의 12지신 관계(합/충/원진 등)를 통해 사회적 관계와 성격의 조화를 봅니다. <br/>
          둘째, <strong>오행 궁합(Five Elements)</strong>은 각자의 생년 천간(天干)이 가진 에너지(목, 화, 토, 금, 수)의 상생상극을 분석하여 내면적 에너지의 흐름을 파악합니다.
        </p>
      </motion.div>

      {/* Ad */}
      {/* <div className="w-full mb-8 flex justify-center items-center min-h-[250px] px-4">
        <div className="w-full max-w-[300px] flex justify-center rounded-xl bg-white/5 p-2">
          <KakaoAdFit unit="DAN-oEqhVJwNYljTA78D" width="300" height="250" />
        </div>
      </div> */}

      <div className="w-full mb-8">
        <GoogleAdSense slot="1234567890" />
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full space-y-3"
      >
        <button
          onClick={onReset}
          className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          다른 사람과 다시보기
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleShare}
            disabled={isSharing}
            className="py-4 rounded-xl bg-white/10 border border-white/10 font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
            결과 공유
          </button>
          <button 
            onClick={() => window.location.href = "/"}
            className="py-4 rounded-xl bg-white/10 border border-white/10 font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            홈으로
          </button>
        </div>
      </motion.div>
    </div>
  );
}
