"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, RefreshCw, Sparkles, Quote, Home } from "lucide-react";
import { TarotCard } from "../../data/tarotData";
import KakaoAdFit from "../KakaoAdFit";
import GoogleAdSense from "../GoogleAdSense";

import { TarotCategory } from "./TarotIntro";

interface TarotResultProps {
  cards: TarotCard[];
  category: TarotCategory;
  onReset: () => void;
}

export default function TarotResult({
  cards,
  category,
  onReset,
}: TarotResultProps) {
  const [isSharing, setIsSharing] = useState(false);

  const getCategoryName = (cat: TarotCategory): string => {
    const names: Record<TarotCategory, string> = {
      business: "사업운",
      love: "애정운",
      study: "학업운",
      career: "취업운",
      relationship: "인간관계운",
    };
    return names[cat];
  };

  // 3장 카드 조합 점괘 생성
  const getCombinedReading = (): { description: string; advice: string } => {
    const descriptions = cards.map((c) => c.description);
    const advices = cards.map((c) => c.advice);
    const keywords = cards.flatMap((c) => c.keywords);

    // 카테고리별 맞춤 해석
    const categoryContext: Record<TarotCategory, string> = {
      business: "사업과 재물에 관한",
      love: "사랑과 연애에 관한",
      study: "학업과 공부에 관한",
      career: "취업과 진로에 관한",
      relationship: "인간관계에 관한",
    };

    return {
      description: `${categoryContext[category]} 운명의 흐름을 보면, ${descriptions[0]} ${descriptions[1]} 그리고 ${descriptions[2]}`,
      advice: `세 카드가 전하는 조언은 다음과 같습니다. 첫째, ${
        advices[0]
      } 둘째, ${advices[1]} 셋째, ${
        advices[2]
      } 이 세 가지를 종합하면, ${getCategoryName(
        category
      )}에 있어 균형과 조화가 중요합니다.`,
    };
  };

  const combinedReading = getCombinedReading();

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const cardsText = cards
      .map((c, i) => `${i + 1}. ${c.name_ko} (${c.name})`)
      .join("\n");
    const shareData = {
      title: `나의 ${getCategoryName(category)} 타로 결과 - ALL NEW FORTUNE`,
      text: `[${getCategoryName(
        category
      )} 타로 카드 결과]\n\n${cardsText}\n\n"${
        combinedReading.advice
      }"\n\n당신의 운명도 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(
          `${shareData.text}\n\n ${shareData.url}`
        );
        alert("결과가 클립보드에 복사되었습니다!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = `${shareData.text}\n\n ${shareData.url}`;
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

  return (
    <div className="w-full max-w-md mx-auto pb-20 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-blue-200 text-sm font-bold mb-2">
          {getCategoryName(category)}
        </p>
        <h2 className="text-2xl font-bold text-white drop-shadow-md mb-1">
          당신이 뽑은 3장의 카드
        </h2>
        <p className="text-white/50 text-xs">메이저 아르카나 22장 중 선택</p>
      </motion.div>

      {/* 3 Cards Display */}
      <motion.div
        initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex justify-center gap-3 mb-8 perspective-1000 px-4"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            className="flex flex-col items-center"
          >
            <div
              className={`relative w-32 h-48 bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center overflow-hidden group ${card.color.replace(
                "text-",
                ""
              )}`}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />

              {/* Card Image (Emoji) */}
              <span className="text-5xl drop-shadow-2xl filter group-hover:scale-110 transition-transform duration-500">
                {card.image_emoji}
              </span>

              {/* Decoration */}
              <div className="absolute bottom-2 left-0 w-full text-center">
                <Sparkles className="w-3 h-3 text-yellow-200 mx-auto opacity-50" />
              </div>
            </div>
            <p className={`text-xs font-bold mt-2 ${card.color} text-center`}>
              {card.name_ko}
            </p>
            <p className="text-white/40 text-[10px] uppercase tracking-wider text-center">
              {card.name}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Individual Cards Interpretation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-4 mb-6 space-y-4"
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400 font-bold text-sm">
                {index + 1}번째 카드
              </span>
              <span className={`text-sm font-bold ${card.color}`}>
                {card.name_ko}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {card.keywords.slice(0, 3).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/70 border border-white/10"
                >
                  #{keyword}
                </span>
              ))}
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Combined Interpretation Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-4 mb-8 p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-xl"
      >
        {/* Combined Description */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-bold text-white mb-3">
            세 카드의 종합 해석
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            {combinedReading.description}
          </p>
        </div>

        {/* Combined Advice (Highlighted) */}
        <div className="relative p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-white/10 text-center">
          <Quote className="absolute top-2 left-2 w-4 h-4 text-white/30 rotate-180" />
          <h3 className="text-sm font-bold text-indigo-300 mb-2 uppercase tracking-wider">
            Oracle's Advice
          </h3>
          <p className="text-base font-bold text-white leading-relaxed">
            "{combinedReading.advice}"
          </p>
          <Quote className="absolute bottom-2 right-2 w-4 h-4 text-white/30" />
        </div>
      </motion.div>

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
          <RefreshCw size={18} /> <span className="text-sm">다른 카드</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
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
