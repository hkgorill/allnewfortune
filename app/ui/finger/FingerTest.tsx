import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Hand } from "lucide-react";
import { FINGER_QUESTIONS } from "../../data/fingerData";

interface FingerTestProps {
  onComplete: (result: {
    gender: "M" | "F";
    finger: "Index" | "Ring" | "Same";
    scoreE: number;
    scoreT: number;
  }) => void;
}

export default function FingerTest({ onComplete }: FingerTestProps) {
  // step 0: 성별, step 1: 손가락, step 2~8: 질문
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState<"M" | "F" | null>(null);
  const [finger, setFinger] = useState<"Index" | "Ring" | "Same" | null>(null);
  const [scores, setScores] = useState({ E: 0, T: 0 });

  const handleGenderSelect = (selectedGender: "M" | "F") => {
    setGender(selectedGender);
    setTimeout(() => setStep(1), 300);
  };

  const handleFingerSelect = (selectedFinger: "Index" | "Ring" | "Same") => {
    setFinger(selectedFinger);
    setTimeout(() => setStep(2), 300);
  };

  const handleAnswer = (value: "E" | "T") => {
    const newScores = { ...scores, [value]: scores[value] + 1 };
    setScores(newScores);

    if (step < FINGER_QUESTIONS.length + 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // 완료 처리
      onComplete({
        gender: gender!,
        finger: finger!,
        scoreE: newScores.E,
        scoreT: newScores.T,
      });
    }
  };

  // Progress calculation
  const totalSteps = FINGER_QUESTIONS.length + 2;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto min-h-screen px-4 pt-12 pb-8">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-12 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: 성별 선택 */}
        {step === 0 && (
          <motion.div
            key="gender"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              성별을 알려주세요
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleGenderSelect("M")}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all flex flex-col items-center gap-4 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">👨</span>
                <span className="font-bold text-lg">남성</span>
              </button>
              <button
                onClick={() => handleGenderSelect("F")}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-pink-500/20 hover:border-pink-500/50 transition-all flex flex-col items-center gap-4 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">👩</span>
                <span className="font-bold text-lg">여성</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 1: 손가락 선택 */}
        {step === 1 && (
          <motion.div
            key="finger"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold text-center mb-2">
              어느 손가락이 더 긴가요?
            </h2>
            <p className="text-center text-white/60 mb-8 text-sm">
              오른손을 펴고 검지와 약지 길이를 비교해주세요
            </p>
            
            <div className="flex justify-center mb-8">
               <Hand className="w-32 h-32 text-white/20" />
               {/* 실제로는 여기에 손가락 비교 이미지를 넣으면 더 좋습니다 */}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleFingerSelect("Index")}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-left transition-all flex items-center justify-between group"
              >
                <span>검지(집게손가락)가 더 길다</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleFingerSelect("Ring")}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-left transition-all flex items-center justify-between group"
              >
                <span>약지(반지손가락)가 더 길다</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleFingerSelect("Same")}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-left transition-all flex items-center justify-between group"
              >
                <span>비슷하다</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2~: 심리 질문 */}
        {step >= 2 && (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <span className="block text-center text-pink-400 font-bold text-sm mb-4">
              Q{step - 1}
            </span>
            <h2 className="text-xl font-bold text-center mb-12 break-keep">
              {FINGER_QUESTIONS[step - 2].question}
            </h2>
            
            <div className="space-y-4">
              {FINGER_QUESTIONS[step - 2].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-blue-500/20 hover:border-white/30 text-left transition-all active:scale-98"
                >
                  <span className="text-lg">{option.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

