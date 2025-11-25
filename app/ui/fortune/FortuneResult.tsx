"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import {
  Share2,
  RefreshCw,
  Heart,
  Coins,
  Sparkles,
  Activity,
  ExternalLink,
  Gift,
  Home
} from "lucide-react";
import GoogleAdSense from "../GoogleAdSense";

export interface FortuneResultData {
  userName?: string;
  overall: string;
  money: string;
  love: string;
  health: string;
  advice: string;
  lucky_color: string;
  lucky_item: {
    name: string;
    image: string;
    link: string;
  };
  illustration?: string;
}

interface FortuneResultProps {
  data: FortuneResultData;
  onReset: () => void;
}

export default function FortuneResult({ data, onReset }: FortuneResultProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareData = {
      title: `${data.userName ? data.userName + '님의 ' : ''}2026년 신년운세 - ALL NEW FORTUNE`,
      text: `[${data.userName ? data.userName + '님의 ' : ''}2026년 신년운세 결과]\n\n"${data.advice}"\n\n🎨 행운의 색: ${data.lucky_color}\n🍀 행운템: ${data.lucky_item.name}\n\n당신의 2026년 운세도 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareData.text}\n\n ${shareData.url}`);
        alert('운세 결과가 클립보드에 복사되었습니다!');
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = `${shareData.text}\n\n ${shareData.url}`;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('운세 결과가 클립보드에 복사되었습니다!');
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

  const Section = ({
    title,
    icon: Icon,
    content,
    colorClass,
    delay
  }: {
    title: string;
    icon: any;
    content: string;
    colorClass: string;
    delay: number;
  }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`mb-4 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300 group`}
    >
      <h3 className={`flex items-center gap-3 text-lg font-bold mb-4 ${colorClass}`}>
        <div className="p-2 rounded-xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
          <Icon size={20} />
        </div> 
        {title}
      </h3>
      <div className="prose prose-invert prose-sm max-w-none text-gray-200 leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-md mx-auto pb-10 relative z-10">
      
      {/* Header Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center mb-8 pt-4"
      >
        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-4">
          <div className="w-24 h-24 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md">
             <Sparkles size={40} className="text-yellow-300 animate-pulse" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          운명의 해답
        </h2>
        <p className="text-purple-200 text-sm">
          {data.userName ? `${data.userName}님의 ` : ''}2026년, 당신에게 펼쳐질 이야기
        </p>
      </motion.div>

      {/* Main Advice Card - Glassmorphism & Gradient Border */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-8 relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <div className="relative px-8 py-10 bg-black/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Sparkles size={80} className="text-white" />
          </div>
          
          <h3 className="text-xs font-bold text-purple-300 mb-4 uppercase tracking-widest border-b border-white/10 pb-2 inline-block">
            Key Message
          </h3>
          
          <p className="text-2xl font-bold leading-relaxed text-white text-center mb-8 drop-shadow-md">
            "{data.advice}"
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-lg">🎨</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 uppercase">Lucky Color</span>
                <span className="text-sm font-bold text-white">{data.lucky_color}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-lg">🍀</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 uppercase">Lucky Item</span>
                <span className="text-sm font-bold text-white">{data.lucky_item.name}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Sections Grid */}
      <div className="px-4 space-y-4">
        <Section
          title="전체운"
          icon={Sparkles}
          content={data.overall}
          colorClass="text-violet-400"
          delay={0.3}
        />
        <Section
          title="금전운"
          icon={Coins}
          content={data.money}
          colorClass="text-amber-400"
          delay={0.4}
        />
        <Section
          title="연애운"
          icon={Heart}
          content={data.love}
          colorClass="text-pink-400"
          delay={0.5}
        />
        <Section
          title="건강운"
          icon={Activity}
          content={data.health}
          colorClass="text-emerald-400"
          delay={0.6}
        />
      </div>

      {/* Lucky Item Recommendation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-4 my-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-1 border border-white/20 shadow-lg overflow-hidden"
      >
        <div className="p-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6 text-yellow-300 font-bold text-lg">
            <Gift className="animate-bounce" /> 행운의 아이템 추천
          </div>
          
          <div className="relative w-full aspect-square max-w-[200px] mb-6 bg-white rounded-2xl p-4 shadow-inner overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/gift-box.svg" 
              alt={data.lucky_item.name} 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          </div>
          
          <h4 className="text-xl font-bold text-white mb-2">
            {data.lucky_item.name}
          </h4>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            2026년, 이 아이템이 당신의 운을 상승시켜줄 거예요.<br/>
            작은 변화가 큰 행운을 불러옵니다.
          </p>
          
          <a 
            href={data.lucky_item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#00C73C] hover:bg-[#00b636] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
          >
             <span>지금 바로 확인하기</span> <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-[10px] text-white/30 mt-3">
            쿠팡 파트너스 활동으로 수수료를 받을 수 있습니다.
          </p>
        </div>
      </motion.div>

      <div className="mx-4 mb-8">
        <GoogleAdSense slot="1234567890" />
      </div>

      {/* Floating Action Buttons */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="px-4 space-y-3 sticky bottom-4 z-50 pb-4"
      >
        <button
          onClick={onReset}
          className="w-full py-4 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-bold shadow-lg hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} /> <span className="text-sm">다시하기</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-indigo-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
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
      </motion.div>
    </div>
  );
}
