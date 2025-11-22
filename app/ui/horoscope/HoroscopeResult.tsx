"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, RefreshCw, Sparkles, Star, Heart, Coins, Briefcase, Home } from "lucide-react";
import { HoroscopeResultType } from "../data/horoscopeData";
import KakaoAdFit from "../KakaoAdFit";
import GoogleAdSense from "../GoogleAdSense";

interface HoroscopeResultProps {
  result: HoroscopeResultType;
  onReset: () => void;
}

export default function HoroscopeResult({ result, onReset }: HoroscopeResultProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareData = {
      title: '나의 별자리 운세 - ALL NEW FORTUNE',
      text: `[${result.sign.name} 오늘의 운세]\n\n"${result.overall}"\n\n🍀 행운의 색: ${result.lucky_color}\n🔢 행운의 숫자: ${result.lucky_number}\n\n당신의 별자리 운세도 확인해보세요!`,
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
    } finally {
      setIsSharing(false);
    }
  };

  const DetailCard = ({ icon: Icon, title, content, colorClass, delay }: any) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-start hover:bg-white/10 transition-colors"
    >
      <div className={`p-2 rounded-xl bg-white/5 ${colorClass}`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className={`font-bold text-sm mb-1 ${colorClass.replace("text-", "")}`}>{title}</h4>
        <p className="text-white/80 text-sm leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-md mx-auto pb-20 relative z-10">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-4 shadow-lg shadow-violet-500/30">
            <span className="text-5xl drop-shadow-md">{result.sign.icon}</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-1">
          {result.sign.name}
        </h2>
        <p className="text-violet-200 text-xs font-medium bg-white/10 px-3 py-1 rounded-full inline-block">
          {result.date} 오늘의 운세
        </p>
      </motion.div>

      {/* Main Overall Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-6 p-6 bg-gradient-to-br from-violet-900/80 to-fuchsia-900/80 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10" />
         
         <div className="relative z-10">
           <h3 className="flex items-center gap-2 text-violet-300 font-bold mb-3">
             <Sparkles size={18} /> 총운
           </h3>
           <p className="text-xl font-bold text-white leading-relaxed">
             "{result.overall}"
           </p>
         </div>
      </motion.div>

      {/* Lucky Items Row */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-4 mb-6 grid grid-cols-3 gap-2"
      >
        <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/10">
            <span className="text-xs text-white/40 block mb-1">Color</span>
            <span className="text-sm font-bold text-white">{result.lucky_color}</span>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/10">
            <span className="text-xs text-white/40 block mb-1">Number</span>
            <span className="text-lg font-bold text-yellow-300">{result.lucky_number}</span>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/10">
            <span className="text-xs text-white/40 block mb-1">Time</span>
            <span className="text-sm font-bold text-white">{result.lucky_time}</span>
        </div>
      </motion.div>

      {/* Details */}
      <div className="mx-4 space-y-3 mb-8">
        <DetailCard 
          icon={Heart} title="사랑운" content={result.love} 
          colorClass="text-pink-400" delay={0.4} 
        />
        <DetailCard 
          icon={Coins} title="금전운" content={result.money} 
          colorClass="text-yellow-400" delay={0.5} 
        />
        <DetailCard 
          icon={Briefcase} title="사업/직업운" content={result.work} 
          colorClass="text-blue-400" delay={0.6} 
        />
      </div>

      {/* AdFit */}
      <div className="mx-4 mb-8 flex justify-center items-center overflow-hidden">
        <KakaoAdFit unit="DAN-zgZw9Q6wvZuU1nIl" width="250" height="250" />
      </div>

      <div className="mx-4 mb-8">
        <GoogleAdSense slot="1234567890" />
      </div>

      {/* Actions */}
      <div className="px-4 space-y-3 sticky bottom-4 z-50 pb-4">
        <button
          onClick={onReset}
          className="w-full py-4 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-bold shadow-lg hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} /> <span className="text-sm">다른 별자리</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Share2 size={18} />
            )}
            <span>{isSharing ? '공유 중...' : '운세 공유'}</span>
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
