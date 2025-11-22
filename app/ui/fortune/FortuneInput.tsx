"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ChevronDown } from "lucide-react";

export interface FortuneInputData {
  username: string;
  birthdate: string;
  gender: "male" | "female" | "none";
  birthtime: string;
}

interface FortuneInputProps {
  onSubmit: (data: FortuneInputData) => void;
  isLoading: boolean;
}

export default function FortuneInput({
  onSubmit,
  isLoading,
}: FortuneInputProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "none">("none");
  
  // 시간 관련 상태
  const [ampm, setAmpm] = useState("AM");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  // 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("fortuneUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.username) setName(parsed.username);
        if (parsed.birthdate) setBirthdate(parsed.birthdate);
        if (parsed.gender) setGender(parsed.gender);
        if (parsed.birthtime) {
          const [pAmpm, pTime] = parsed.birthtime.split(" ");
          if (pAmpm && pTime) {
            setAmpm(pAmpm);
            const [pH, pM] = pTime.split(":");
            setHour(pH);
            setMinute(pM);
          }
        }
      } catch (e) {
        console.error("Failed to parse saved user data", e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;

    // 입력된 시간 조합
    let formattedTime = "";
    if (hour && minute) {
      formattedTime = `${ampm} ${hour}:${minute}`;
    }

    const submitData = { username: name, birthdate, gender, birthtime: formattedTime };
    
    // 로컬 스토리지에 저장
    localStorage.setItem("fortuneUser", JSON.stringify(submitData));

    onSubmit(submitData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 relative overflow-hidden"
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-2xl font-bold text-center mb-8 text-white drop-shadow-sm relative z-10">
        <span className="block text-sm font-normal text-white/60 mb-2">2026년 병오년</span>
        나의 운명 확인하기
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Name Input */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-sm font-medium text-purple-200/80 transition-colors group-focus-within:text-purple-200">
            <User size={16} /> 이름 (선택)
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Birthdate Input (Required) */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-sm font-medium text-purple-200/80 transition-colors group-focus-within:text-purple-200">
            <Calendar size={16} /> 생년월일 (필수)
          </label>
          <input
            type="date"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all duration-300 calendar-invert"
          />
        </div>

        {/* Time Input */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-sm font-medium text-purple-200/80 transition-colors group-focus-within:text-purple-200">
            <Clock size={16} /> 태어난 시간 (선택)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 outline-none transition-all text-center cursor-pointer"
              >
                <option value="AM" className="bg-gray-800">오전</option>
                <option value="PM" className="bg-gray-800">오후</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>
            <input
              type="number"
              min="1"
              max="12"
              placeholder="시"
              value={hour}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!e.target.value || (val >= 1 && val <= 12)) setHour(e.target.value);
              }}
              className="flex-1 p-4 rounded-2xl bg-black/20 border border-white/10 text-white text-center placeholder-white/30 focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 outline-none transition-all"
            />
            <span className="self-center font-bold text-white/50">:</span>
            <input
              type="number"
              min="0"
              max="59"
              placeholder="분"
              value={minute}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!e.target.value || (val >= 0 && val <= 59)) setMinute(e.target.value);
              }}
              className="flex-1 p-4 rounded-2xl bg-black/20 border border-white/10 text-white text-center placeholder-white/30 focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-purple-200/80 mb-2">
            성별 (선택)
          </label>
          <div className="flex gap-2 p-1 bg-black/20 rounded-2xl border border-white/10">
            {(["male", "female", "none"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  gender === g
                    ? "bg-white/20 text-white shadow-lg ring-1 ring-white/30"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {g === "male" ? "남성" : g === "female" ? "여성" : "선택안함"}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || !birthdate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 mt-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(167,139,250,0.4)] hover:shadow-[0_0_30px_rgba(167,139,250,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                분석 중...
              </>
            ) : (
              "운세 확인하기 ✨"
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>
      </form>
    </motion.div>
  );
}
