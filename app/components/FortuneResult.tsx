"use client";

import ReactMarkdown from "react-markdown";
import {
  Share2,
  RefreshCw,
  Heart,
  Coins,
  Sparkles,
  Activity,
} from "lucide-react";

export interface FortuneResultData {
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
  const handleShare = async () => {
    const shareData = {
      title: '2026년 신년운세 - ALL NEW FORTUNE',
      text: `[2026년 신년운세 결과]\n\n"${data.advice}"\n\n🎨 행운의 색: ${data.lucky_color}\n🍀 행운템: ${data.lucky_item.name}\n\n당신의 2026년 운세도 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
        alert('운세 결과가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const Section = ({
    title,
    icon: Icon,
    content,
    color,
  }: {
    title: string;
    icon: any;
    content: string;
    color: string;
  }) => (
    <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50">
      <h3 className={`flex items-center gap-2 text-lg font-bold mb-3 ${color}`}>
        <Icon size={20} /> {title}
      </h3>
      <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Illustration / Header */}
      <div className="text-center mb-8 pt-8">
        <div className="w-32 h-32 mx-auto mb-4 bg-[var(--color-highlight)] rounded-full flex items-center justify-center shadow-inner animate-pulse">
          {/* Placeholder for illustration */}
          <Sparkles size={48} className="text-[var(--color-main)] opacity-80" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          2026년 신년운세
        </h2>
        <p className="text-[var(--color-text-secondary)] mt-1 text-sm">
          당신의 새해를 응원합니다
        </p>
      </div>

      {/* Advice Card - Main Highlight */}
      <div className="mx-4 mb-8 p-6 bg-gradient-to-br from-[var(--color-main)] to-[var(--color-highlight)] rounded-3xl shadow-lg text-[var(--color-text-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={100} />
        </div>
        <h3 className="text-sm font-bold opacity-60 mb-2 uppercase tracking-wider">
          올해의 한마디
        </h3>
        <p className="text-xl font-bold leading-snug text-center py-2">
          "{data.advice}"
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs font-medium opacity-90">
          <div className="flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-full shadow-sm border border-white/20">
            <span className="text-sm">🎨</span>
            <span className="opacity-60 mr-1">행운의 색:</span>
            <span>{data.lucky_color}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-full shadow-sm border border-white/20">
            <span className="text-sm">🍀</span>
            <span className="opacity-60 mr-1">행운템:</span>
            <span>{data.lucky_item.name}</span>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="px-4">
        <Section
          title="전체운"
          icon={Sparkles}
          content={data.overall}
          color="text-purple-500"
        />
        <Section
          title="금전운"
          icon={Coins}
          content={data.money}
          color="text-yellow-600"
        />
        <Section
          title="연애운"
          icon={Heart}
          content={data.love}
          color="text-pink-500"
        />
        <Section
          title="건강운"
          icon={Activity}
          content={data.health}
          color="text-green-500"
        />
      </div>

      {/* Recommended Item Card */}
      <div className="mx-4 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-yellow-500" /> 당신을 위한 추천 아이템
        </h3>
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4 rounded-2xl overflow-hidden shadow-md bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/gift-box.svg" 
              alt="행운의 선물" 
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
            />
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
            {data.lucky_item.name}
          </p>
          <p className="text-sm text-gray-500 text-center mb-4">
            2026년 당신에게 행운을 가져다 줄 아이템입니다.
          </p>
          <a 
            href={data.lucky_item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#00C73C] hover:bg-[#00b636] text-white font-bold rounded-xl shadow-sm text-center transition-colors flex items-center justify-center gap-2"
          >
             <span className="text-sm">🔍</span> 쿠팡에서 최저가 확인하기
          </a>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br/>이에 따른 일정액의 수수료를 제공받습니다.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3 z-50">
        <button
          onClick={onReset}
          className="flex-1 py-4 bg-white text-[var(--color-text-primary)] rounded-2xl font-bold shadow-lg border border-gray-100 hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
        >
          <RefreshCw size={18} /> 다시하기
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-4 bg-[var(--color-text-primary)] text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all"
        >
          <Share2 size={18} /> 공유하기
        </button>
      </div>

    </div>
  );
}
