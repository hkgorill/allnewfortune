import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Fingerprint,
  Activity,
  Compass,
  Eye,
  MoonStar,
  ArrowRight,
} from "lucide-react";

interface MenuScreenProps {
  onSelectMenu: (menuId: string) => void;
}

const MENU_TEXTS = {
  new_year: [
    "[단독] 2025 '운발' 스위치 ON 하는 법 🚀",
    '"내년엔 무조건 잘 될 사람" 선착순 확인!',
  ],
  mbti: [
    "내 MBTI, 숨겨진 흑역사까지 털어드립니다 🤫",
    '"F가 킹 받는 순간" (feat. 팩폭주의)',
  ],
  egogram: [
    "이거 풀고 연애/재물/성공력 100% 예측 완료 📈",
    "오늘 당신의 심리 상태는? (feat. 소름 주의)",
  ],
  saju: [
    "🚨 올해 '이것' 놓치면 2026년에 후회합니다",
    "사주로 풀어보는 '나만의 벼락부자' 되는 길",
  ],
  tarot: [
    "'그 사람'의 속마음? 타로가 다 알려줌 (ft. 킹 받네) 💔",
    "당장 필요한 현실 조언 한 줄!",
  ],
  horoscope: [
    "[1분 확인] 오늘의 운세, 쿨하게 '손절각' 재는 법 🔪",
    "오늘 나에게 딱 맞는 🔥별자리 꿀팁",
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const FadeText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => (
  <div className={`relative flex items-center ${className}`}>
    <AnimatePresence mode="wait">
      <motion.p
        key={text}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full break-keep leading-snug"
      >
        {text}
      </motion.p>
    </AnimatePresence>
  </div>
);

const SUBTITLES = [
  "[필수] 2025 당신의 '갓생', 여기서 좌표 찍으세요.",
  "🚨 [속보] 지금 당장 알아야 할 당신의 '운발' 상태 확인.",
  "오늘의 고민? 내일의 운명? 일단 '하나씩' 눌러 보세요.",
  "내 인생 스위치? ⚡️ 가장 힙한 해답을 여기서 찾으세요.",
];

export default function MenuScreen({ onSelectMenu }: MenuScreenProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    setSubtitle(SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => prev + 1);
    }, 60000); // 30초마다 텍스트 변경
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md px-4 py-6 pb-20">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">ALL NEW FORTUNE</h2>
          <p className="text-white/60 text-sm">{subtitle}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
          <span className="text-lg">🔮</span>
        </div>
      </motion.header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 auto-rows-[200px]"
      >
        {/* 1. Featured: 신년운세 (Large Card, Spans 2 Columns) */}
        <motion.div
          variants={itemVariant}
          onClick={() => onSelectMenu("new_year")}
          className="col-span-2 row-span-1 relative overflow-hidden rounded-[2rem] cursor-pointer group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 opacity-90 transition-opacity group-hover:opacity-100" />
          <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

          <div className="relative h-full p-7 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-white/20 rounded-full border border-white/10 backdrop-blur-md">
                BEST
              </span>
            </div>

            <div className="w-full">
              <h3 className="text-2xl font-bold text-white mb-2">
                2026 신년운세
              </h3>
              <div className="text-white/90 text-sm flex items-start gap-2 group-hover:text-white transition-colors w-full h-[3.5em]">
                <div className="flex-1">
                  <FadeText
                    text={
                      MENU_TEXTS.new_year[
                        textIndex % MENU_TEXTS.new_year.length
                      ]
                    }
                  />
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 mt-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. MBTI (Square) */}
        <motion.div
          variants={itemVariant}
          onClick={() => onSelectMenu("mbti")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center justify-between text-center hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
            <Fingerprint className="w-7 h-7" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h4 className="font-bold text-lg mb-2">MBTI</h4>
            <FadeText
              text={MENU_TEXTS.mbti[textIndex % MENU_TEXTS.mbti.length]}
              className="text-xs text-white/60 h-[4.5em] justify-center"
            />
          </div>
        </motion.div>

        {/* 3. Egogram (Square) */}
        <motion.div
          variants={itemVariant}
          onClick={() => onSelectMenu("egogram")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center justify-between text-center hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <Activity className="w-7 h-7" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h4 className="font-bold text-lg mb-2">심리테스트</h4>
            <FadeText
              text={MENU_TEXTS.egogram[textIndex % MENU_TEXTS.egogram.length]}
              className="text-xs text-white/60 h-[4.5em] justify-center"
            />
          </div>
        </motion.div>

        {/* 4. Saju (Square) */}
        <motion.div
          variants={itemVariant}
          onClick={() => onSelectMenu("saju")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center justify-between text-center hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Compass className="w-7 h-7" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h4 className="font-bold text-lg mb-2">사주팔자</h4>
            <FadeText
              text={MENU_TEXTS.saju[textIndex % MENU_TEXTS.saju.length]}
              className="text-xs text-white/60 h-[4.5em] justify-center"
            />
          </div>
        </motion.div>

        {/* 5. Tarot (Square) */}
        <motion.div
          variants={itemVariant}
          onClick={() => onSelectMenu("tarot")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center justify-between text-center hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Eye className="w-7 h-7" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h4 className="font-bold text-lg mb-2">타로</h4>
            <FadeText
              text={MENU_TEXTS.tarot[textIndex % MENU_TEXTS.tarot.length]}
              className="text-xs text-white/60 h-[4.5em] justify-center"
            />
          </div>
        </motion.div>

        {/* 6. Horoscope (Full Width Bottom) */}
        <motion.div
          variants={itemVariant}
          onClick={() => onSelectMenu("horoscope")}
          className="col-span-2 row-span-1 h-[140px] bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-[2rem] p-7 flex items-center justify-between hover:border-white/30 transition-colors cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

          <div className="z-10 flex-1 mr-6 w-full">
            <h4 className="font-bold text-xl mb-2">별자리 운세</h4>
            <FadeText
              text={
                MENU_TEXTS.horoscope[textIndex % MENU_TEXTS.horoscope.length]
              }
              className="text-sm text-white/60"
            />
          </div>

          <div className="z-10 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
            <MoonStar className="w-8 h-8 text-yellow-300" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
