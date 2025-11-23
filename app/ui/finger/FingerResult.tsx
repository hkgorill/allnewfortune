"use client";

import { motion } from "framer-motion";
import { RotateCcw, Share2, Home } from "lucide-react";
import { FINGER_RESULTS } from "../../data/fingerData";
import KakaoAdFit from "../KakaoAdFit";
import GoogleAdSense from "../GoogleAdSense";

interface FingerResultProps {
  resultData: {
    gender: "M" | "F";
    finger: "Index" | "Ring" | "Same";
    scoreE: number;
    scoreT: number;
  };
  onReset: () => void;
}

export default function FingerResult({ resultData, onReset }: FingerResultProps) {
  let finalE = resultData.scoreE;
  let finalT = resultData.scoreT;

  if (resultData.finger === "Index") finalE += 3;
  if (resultData.finger === "Ring") finalT += 3;

  const type = finalE >= finalT ? "E" : "T"; // E: 에겐, T: 테토
  const resultKey = `${resultData.gender}-${type}`;
  
  const result = FINGER_RESULTS[resultKey];

  const handleShare = async () => {
    const shareData = {
      title: '뇌 구조 테스트 결과',
      text: `[ALL NEW FORTUNE] 나의 뇌 구조는 ${result.name}!\n\n"${result.subtitle}"\n\n당신의 뇌 구조도 확인해보세요!`,
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
    <div className="w-full max-w-md mx-auto px-6 py-12 pb-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full text-center mb-8"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm mb-4">
          나의 뇌 구조 타입은?
        </span>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">
          {result.name}
        </h1>
        <p className="text-white/70 text-lg">{result.subtitle}</p>
      </motion.div>

      {/* Tags */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {result.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full bg-white/5 text-sm text-pink-300 border border-pink-500/20">
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Description Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-md text-left"
      >
        <h3 className="font-bold text-lg mb-4 border-b border-white/10 pb-2">
          상세 분석
        </h3>
        <ul className="space-y-3 text-white/80 leading-relaxed list-disc list-outside pl-4">
          {result.description.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>
      </motion.div>

      {/* Ad */}
      <div className="w-full flex justify-center mb-8 overflow-hidden rounded-xl bg-white/5">
         <KakaoAdFit unit="DAN-oEqhVJwNYljTA78D" width="300" height="250" />
      </div>

      <div className="w-full mb-8">
        <GoogleAdSense slot="1234567890" />
      </div>

      {/* Match Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full grid grid-cols-2 gap-4 mb-12"
      >
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-center">
          <span className="block text-blue-400 text-xs font-bold mb-1">GOOD MATCH</span>
          <p className="font-bold text-sm">{result.match.good}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
          <span className="block text-red-400 text-xs font-bold mb-1">BAD MATCH</span>
          <p className="font-bold text-sm">{result.match.bad}</p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full space-y-3"
      >
        <button
          onClick={onReset}
          className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          다시 테스트하기
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleShare}
            className="py-4 rounded-xl bg-white/10 border border-white/10 font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
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
