import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart } from "lucide-react";

interface ChemistryInputProps {
  onSubmit: (data: {
    me: { name: string; birthdate: string; gender: "M" | "F" };
    partner: { name: string; birthdate: string; gender: "M" | "F" };
  }) => void;
}

export default function ChemistryInput({ onSubmit }: ChemistryInputProps) {
  const [step, setStep] = useState<"me" | "partner">("me");
  const [formData, setFormData] = useState({
    me: { name: "", birthdate: "", gender: "M" as "M" | "F" },
    partner: { name: "", birthdate: "", gender: "F" as "M" | "F" },
  });

  const handleNext = () => {
    if (step === "me") {
      if (!formData.me.birthdate) return alert("생년월일을 입력해주세요.");
      setStep("partner");
    } else {
      if (!formData.partner.birthdate) return alert("상대방의 생년월일을 입력해주세요.");
      onSubmit(formData);
    }
  };

  const currentData = step === "me" ? formData.me : formData.partner;
  const updateCurrent = (field: string, value: string) => {
    setFormData({
      ...formData,
      [step]: { ...currentData, [field]: value },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-2">
        {step === "me" ? "내 정보 입력" : "상대방 정보 입력"}
      </h2>
      <p className="text-center text-white/60 mb-8 text-sm">
        {step === "me"
          ? "본인의 정보를 정확하게 입력해주세요"
          : "알아보고 싶은 상대의 정보를 입력해주세요"}
      </p>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className={`w-3 h-3 rounded-full ${step === "me" ? "bg-pink-500" : "bg-white/20"}`} />
        <div className="w-10 h-0.5 bg-white/10" />
        <div className={`w-3 h-3 rounded-full ${step === "partner" ? "bg-pink-500" : "bg-white/20"}`} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {/* Name Input (Optional) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/80 ml-1">이름 (선택)</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={currentData.name}
                onChange={(e) => updateCurrent("name", e.target.value)}
                placeholder={step === "me" ? "내 이름" : "상대방 이름"}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Birthdate Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/80 ml-1">생년월일</label>
            <input
              type="date"
              value={currentData.birthdate}
              onChange={(e) => updateCurrent("birthdate", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-colors"
            />
          </div>

          {/* Gender Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/80 ml-1">성별</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateCurrent("gender", "M")}
                className={`py-4 rounded-xl border transition-all font-bold ${
                  currentData.gender === "M"
                    ? "bg-blue-500/20 border-blue-500 text-blue-400"
                    : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                }`}
              >
                남성
              </button>
              <button
                onClick={() => updateCurrent("gender", "F")}
                className={`py-4 rounded-xl border transition-all font-bold ${
                  currentData.gender === "F"
                    ? "bg-pink-500/20 border-pink-500 text-pink-400"
                    : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                }`}
              >
                여성
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-8">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold text-lg shadow-lg shadow-pink-500/30 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {step === "me" ? "다음: 상대방 입력" : "궁합 결과 보기"}
          <Heart className={`w-5 h-5 ${step === "partner" ? "fill-white animate-pulse" : ""}`} />
        </button>
      </div>
    </div>
  );
}



