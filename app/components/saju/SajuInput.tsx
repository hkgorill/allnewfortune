"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ChevronDown } from "lucide-react";
import { FortuneInputData } from "../FortuneInput";

interface SajuInputProps {
  onSubmit: (data: FortuneInputData) => void;
  isLoading: boolean;
}

export default function SajuInput({
  onSubmit,
  isLoading,
}: SajuInputProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "none">("none");
  
  // 시간 관련 상태
  const [ampm, setAmpm] = useState("AM");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;

    // 입력된 시간 조합
    let formattedTime = "";
    if (hour && minute) {
      formattedTime = `${ampm} ${hour}:${minute}`;
    }

    onSubmit({ name, birthdate, gender, birthtime: formattedTime });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-2xl font-bold text-center mb-8 text-white drop-shadow-sm relative z-10">
        사주 정보 입력
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Name Input */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-sm font-medium text-emerald-200/80 transition-colors group-focus-within:text-emerald-200">
            <User size={16} /> 이름 (선택)
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Birthdate Input (Required) */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-sm font-medium text-emerald-200/80 transition-colors group-focus-within:text-emerald-200">
            <Calendar size={16} /> 생년월일 (양력/필수)
          </label>
          <input
            type="date"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all duration-300 calendar-invert"
          />
        </div>

        {/* Time Input */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-sm font-medium text-emerald-200/80 transition-colors group-focus-within:text-emerald-200">
            <Clock size={16} /> 태어난 시간 (정확도 향상)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 outline-none transition-all text-center cursor-pointer"
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
              className="flex-1 p-4 rounded-2xl bg-black/20 border border-white/10 text-white text-center placeholder-white/30 focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 outline-none transition-all"
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
              className="flex-1 p-4 rounded-2xl bg-black/20 border border-white/10 text-white text-center placeholder-white/30 focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-emerald-200/80 mb-2">
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
          className="w-full py-4 mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                만세력 분석 중...
              </>
            ) : (
              "사주 풀이 보기 📜"
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>
      </form>
    </motion.div>
  );
}

