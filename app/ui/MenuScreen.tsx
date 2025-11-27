import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Fingerprint,
  Activity,
  Compass,
  Eye,
  MoonStar,
  ArrowRight,
  Brain,
  Heart,
  Download,
  BookOpen
} from "lucide-react";
import KakaoAdFit from "./KakaoAdFit";

const MENU_TEXTS = {
  new_year: [
    "[단독] 2026 '운발' 스위치 ON 하는 법 🚀",
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
  finger: [
    "손가락으로 보는 내 '본능' 테스트 👇",
    "에겐남 vs 테토녀? 1분 만에 확인!",
  ],
  chemistry: [
    "우리... 진짜 인연일까? 💕",
    "소름 돋는 궁합 점수 확인하기 (무료)",
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
  "[필수] 2026 당신의 '갓생', 여기서 좌표 찍으세요.",
  "🚨 [속보] 지금 당장 알아야 할 당신의 '운발' 상태 확인.",
  "오늘의 고민? 내일의 운명? 일단 '하나씩' 눌러 보세요.",
  "내 인생 스위치? ⚡️ 가장 힙한 해답을 여기서 찾으세요.",
];

export default function MenuScreen() {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const [subtitle, setSubtitle] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    setSubtitle(SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => prev + 1);
    }, 60000); // 30초마다 텍스트 변경
    return () => clearInterval(timer);
  }, []);

  // PWA Install Prompt Event Listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full pb-8">
      <div className="w-full max-w-md px-4 py-6">
      <h1 className="sr-only">
        ALL NEW FORTUNE - 2026년 신년운세, 무료 사주, 타로, MBTI, 심리테스트
      </h1>
      <p className="sr-only">
        AI가 분석해주는 정확한 신년운세와 사주풀이. 오늘의 운세부터 궁합, 재물운, 연애운까지 무료로 확인하세요.
      </p>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">ALL NEW FORTUNE</h2>
          <p className="text-white/60 text-sm">{subtitle}</p>
        </div>
        
        {/* Install Button / Icon */}
        <div 
          onClick={handleInstallClick}
          className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 transition-all ${
            deferredPrompt 
              ? "cursor-pointer hover:bg-white/20 animate-pulse ring-2 ring-emerald-400/50 bg-emerald-500/10" 
              : ""
          }`}
          title={deferredPrompt ? "앱으로 설치하기" : "ALL NEW FORTUNE"}
        >
          {deferredPrompt ? (
            <Download className="w-5 h-5 text-emerald-400" />
          ) : (
            <span className="text-lg">🔮</span>
          )}
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
          onClick={() => handleMenuClick("/fortune")}
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
          onClick={() => handleMenuClick("/mbti")}
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
          onClick={() => handleMenuClick("/psychology")}
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

        {/* 3.5. Finger Test (Square) */}
        <motion.div
          variants={itemVariant}
          onClick={() => handleMenuClick("/finger")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center justify-between text-center hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
            <Brain className="w-7 h-7" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h4 className="font-bold text-lg mb-2">뇌 구조</h4>
            <FadeText
              text={MENU_TEXTS.finger[textIndex % MENU_TEXTS.finger.length]}
              className="text-xs text-white/60 h-[4.5em] justify-center"
            />
          </div>
        </motion.div>

        {/* 3.6. Chemistry (Square) */}
        <motion.div
          variants={itemVariant}
          onClick={() => handleMenuClick("/chemistry")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center justify-between text-center hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
            <Heart className="w-7 h-7" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h4 className="font-bold text-lg mb-2">궁합</h4>
            <FadeText
              text={MENU_TEXTS.chemistry[textIndex % MENU_TEXTS.chemistry.length]}
              className="text-xs text-white/60 h-[4.5em] justify-center"
            />
          </div>
        </motion.div>

        {/* 4. Saju (Square) */}
        <motion.div
          variants={itemVariant}
          onClick={() => handleMenuClick("/saju")}
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
          onClick={() => handleMenuClick("/tarot")}
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
          onClick={() => handleMenuClick("/horoscope")}
          className="col-span-2 row-span-1 h-[140px] bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-[2rem] p-7 flex items-center justify-between hover:border-white/30 transition-colors cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

          <div className="z-10 flex-1 mr-6 w-full">
            <h4 className="font-bold text-xl mb-2">오늘의 운세 (별자리)</h4>
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

      {/* Strategy A: Fortune Knowledge Columns */}
      <section className="mt-16 w-full text-left text-white/70 space-y-12">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">알아두면 쓸모있는 운세 지식</h3>
        </div>

        <article className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h4 className="text-lg font-bold text-white mb-3">🔥 2026년 병오년(丙午年), 붉은 말의 해</h4>
          <p className="leading-relaxed text-sm mb-4">
            2026년은 육십갑자 중 43번째 해인 병오년입니다. 천간인 '병(丙)'은 붉은색(불)을 의미하고, 
            지지인 '오(午)'는 말(동물)을 의미하여 '적토마' 또는 '붉은 말'의 해라고 불립니다. 
            붉은 말은 강인한 생명력과 뜨거운 열정을 상징하며, 역사적으로 병오년에는 강력한 변화와 혁신의 기운이 감돌았습니다.
          </p>
          <p className="leading-relaxed text-sm">
            이 해에 태어난 사람들은 활동적이고 사교적이며, 목표를 향해 거침없이 달려가는 추진력을 가지고 있다고 알려져 있습니다.
            새로운 도전을 시작하거나 리더십을 발휘하기에 더할 나위 없이 좋은 시기가 될 것입니다.
          </p>
        </article>

        <article className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h4 className="text-lg font-bold text-white mb-3">⚖️ 사주와 MBTI, 무엇이 다를까?</h4>
          <p className="leading-relaxed text-sm mb-4">
            사주팔자(Four Pillars of Destiny)는 동양의 통계학적 명리학을 기반으로 태어난 시점의 우주적 기운을 분석합니다. 
            반면 MBTI는 카를 융의 심리 유형론을 바탕으로 개인의 선호 경향을 파악하는 심리 검사입니다.
          </p>
          <p className="leading-relaxed text-sm">
            사주는 '타고난 운명과 기질'을, MBTI는 '현재의 심리 상태와 성격 유형'을 보여줍니다. 
            두 가지를 함께 참고하면 나 자신을 입체적으로 이해하는 데 큰 도움이 됩니다.
          </p>
        </article>

        <article className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h4 className="text-lg font-bold text-white mb-3">🃏 타로 카드의 신비로운 기원</h4>
          <p className="leading-relaxed text-sm mb-4">
            타로 카드는 15세기 이탈리아에서 시작된 것으로 알려져 있습니다. 
            총 78장의 카드로 구성되며, 인간의 중대사를 다루는 22장의 '메이저 아르카나'와 세부적인 사건을 묘사하는 56장의 '마이너 아르카나'로 나뉩니다.
          </p>
          <p className="leading-relaxed text-sm">
            단순한 점술 도구를 넘어, 무의식을 투영하고 내면의 목소리를 듣는 심리 상담 도구로도 널리 활용되고 있습니다. 
            우연히 뽑은 카드가 현재의 상황과 놀랍도록 맞아떨어지는 경험, 이것이 바로 타로의 묘미입니다.
          </p>
        </article>
      </section>
      </div>

      <div className="mt-6 flex justify-center w-full">
        {/* Mobile Ad (320x50) */}
        <div className="block md:hidden">
          <KakaoAdFit unit="DAN-MSEM8ye2XnTJRB4u" width="320" height="50" />
        </div>
        {/* PC Ad (728x90) */}
        <div className="hidden md:block">
          <KakaoAdFit unit="DAN-HSHMP9erAHFO6IQx" width="728" height="90" />
        </div>
      </div>
    </div>
  );
}
