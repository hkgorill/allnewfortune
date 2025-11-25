"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  RefreshCw,
  ScrollText,
  User,
  Briefcase,
  Heart,
  Coins,
  Home,
} from "lucide-react";
import { SajuResultType, SajuPillar } from "../../data/sajuData";
import KakaoAdFit from "../KakaoAdFit";
import GoogleAdSense from "../GoogleAdSense";

interface SajuResultProps {
  result: SajuResultType;
  onReset: () => void;
}

export default function SajuResult({ result, onReset }: SajuResultProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareData = {
      title: `${
        result.userName ? result.userName + "님의 " : ""
      }사주팔자 결과 - ALL NEW FORTUNE`,
      text: `[${
        result.userName ? result.userName + "님의 " : ""
      }사주 명식 결과]\n\n일주: ${result.mainCharacter}\n\n"${
        result.interpretation.personality
      }"\n\n당신의 사주도 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(
          `${shareData.text}\n\n${shareData.url}`
        );
        alert("결과가 클립보드에 복사되었습니다!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = `${shareData.text}\n\n${shareData.url}`;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          alert("결과가 클립보드에 복사되었습니다!");
        } catch (err) {
          alert("공유하기를 지원하지 않는 브라우저입니다.");
        }
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  // 사주 기둥(Pillar) 컴포넌트
  const PillarCard = ({
    title,
    pillar,
    delay,
  }: {
    title: string;
    pillar: SajuPillar;
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <span className="text-[10px] text-white/50 mb-2">{title}</span>
      <div className="bg-white/10 border border-white/20 rounded-xl p-2 w-full aspect-[2/3] flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
        {/* 천간 */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold bg-black/20 ${pillar.gan.color}`}
        >
          {pillar.gan.hanja}
        </div>
        {/* 지지 */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold bg-black/20 ${pillar.ji.color}`}
        >
          {pillar.ji.hanja}
        </div>
      </div>
      <div className="flex gap-1 mt-1 text-[10px] text-white/60">
        <span>{pillar.gan.korean}</span>
        <span>{pillar.ji.korean}</span>
      </div>
    </motion.div>
  );

  // 해석 카드 컴포넌트
  const InterpretationCard = ({
    icon: Icon,
    title,
    content,
    colorClass,
    delay,
  }: any) => (
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
        <h4
          className={`font-bold text-sm mb-1 ${colorClass.replace(
            "text-",
            ""
          )}`}
        >
          {title}
        </h4>
        <p className="text-white/80 text-sm leading-relaxed break-keep">
          {content}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-md mx-auto pb-20 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-emerald-200 text-sm font-bold mb-2">분석 완료</p>
        <h2 className="text-3xl font-bold text-white mb-2">
          {result.userName ? `${result.userName}님의 ` : "나의 "}사주 명식
        </h2>
        <p className="text-white/50 text-xs">타고난 기운과 운명의 흐름</p>
      </motion.div>

      {/* Manse-ryok (4 Pillars) Display */}
      <div className="mx-4 mb-8 p-6 bg-gradient-to-b from-gray-900 to-black rounded-[2rem] border border-white/20 shadow-2xl">
        <div className="grid grid-cols-4 gap-3">
          <PillarCard title="시주 (말년)" pillar={result.time} delay={0.1} />
          <PillarCard title="일주 (나)" pillar={result.day} delay={0.2} />
          <PillarCard title="월주 (청년)" pillar={result.month} delay={0.3} />
          <PillarCard title="년주 (초년)" pillar={result.year} delay={0.4} />
        </div>

        {/* Five Elements Analysis */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <span className="text-xs text-white/50 block text-center mb-3">
            오행 분포 (목화토금수)
          </span>
          <div className="flex justify-between px-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs border border-green-500/30">
                {result.fiveElements.wood}
              </div>
              <span className="text-[10px] text-green-400">목</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs border border-red-500/30">
                {result.fiveElements.fire}
              </div>
              <span className="text-[10px] text-red-400">화</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs border border-yellow-500/30">
                {result.fiveElements.earth}
              </div>
              <span className="text-[10px] text-yellow-400">토</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-gray-200/20 text-gray-200 flex items-center justify-center text-xs border border-gray-200/30">
                {result.fiveElements.metal}
              </div>
              <span className="text-[10px] text-gray-200">금</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs border border-blue-500/30">
                {result.fiveElements.water}
              </div>
              <span className="text-[10px] text-blue-400">수</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Interpretations */}
      <div className="mx-4 space-y-3 mb-8">
        <InterpretationCard
          icon={User}
          title="타고난 성향"
          content={result.interpretation.personality}
          colorClass="text-emerald-400"
          delay={0.5}
        />
        <InterpretationCard
          icon={Coins}
          title="재물운"
          content={result.interpretation.wealth}
          colorClass="text-yellow-400"
          delay={0.6}
        />
        <InterpretationCard
          icon={Briefcase}
          title="직업운"
          content={result.interpretation.career}
          colorClass="text-blue-400"
          delay={0.7}
        />
        <InterpretationCard
          icon={Heart}
          title="연애/애정운"
          content={result.interpretation.love}
          colorClass="text-pink-400"
          delay={0.8}
        />
      </div>

      {/* AdFit */}
      <div className="w-full mb-8 flex justify-center items-center min-h-[250px] px-4">
        <div className="w-full max-w-[250px] flex justify-center">
          <KakaoAdFit unit="DAN-oEqhVJwNYljTA78D" width="250" height="250" />
        </div>
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
          <RefreshCw size={18} /> <span className="text-sm">다시하기</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Share2 size={18} />
            )}
            <span>{isSharing ? "공유 중..." : "결과 공유"}</span>
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="py-4 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-bold shadow-lg hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} /> <span>홈으로</span>
          </button>
        </div>
      </div>
    </div>
  );
}
