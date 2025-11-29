"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ChevronDown } from "lucide-react";
import { FortuneInputData } from "../fortune/FortuneInput";

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
  
  // 생년월일 드롭다운 상태
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  
  // 시간 관련 상태 (드롭다운용)
  const [hour, setHour] = useState(""); // "" = 모름, "0" ~ "23"
  const [minute, setMinute] = useState("00");
  
    // 양력/음력 선택 상태
    const [calendarType, setCalendarType] = useState<"solar" | "lunar" | "leap">("solar");
    
    // 생년월일 드롭다운에서 날짜 문자열 생성
  useEffect(() => {
    if (year && month && day) {
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      setBirthdate(formattedDate);
    } else {
      setBirthdate("");
    }
  }, [year, month, day]);

  // 기존 birthdate에서 드롭다운 값 추출
  useEffect(() => {
    if (birthdate && !year && !month && !day) {
      const [y, m, d] = birthdate.split("-");
      if (y && m && d) {
        setYear(y);
        setMonth(m);
        setDay(d);
      }
    }
  }, [birthdate]);

  // 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("fortuneUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.username) setName(parsed.username);
        if (parsed.birthdate) {
          const [y, m, d] = parsed.birthdate.split("-");
          if (y && m && d) {
            setYear(y);
            setMonth(m);
            setDay(d);
          }
          setBirthdate(parsed.birthdate);
        }
        if (parsed.gender) setGender(parsed.gender);
        
        // 시간 파싱 (AM/PM 포맷과 24시간제 포맷 모두 지원)
        if (parsed.birthtime) {
          if (parsed.birthtime.includes("M")) { // "AM 10:30" or "PM 02:00"
            const [pAmpm, pTime] = parsed.birthtime.split(" ");
            if (pAmpm && pTime) {
               const [pH, pM] = pTime.split(":");
               let h = parseInt(pH);
               if (pAmpm === "PM" && h < 12) h += 12;
               if (pAmpm === "AM" && h === 12) h = 0;
               setHour(h.toString());
               setMinute(pM);
            }
          } else if (parsed.birthtime.includes(":")) { // "14:30"
             const [pH, pM] = parsed.birthtime.split(":");
             setHour(parseInt(pH).toString());
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

    // 입력된 시간 조합 (24시간제 HH:mm)
    let formattedTime = "";
    if (hour !== "") {
      formattedTime = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    }

    // calendarType 포함 전송
    const submitData: FortuneInputData = { 
      username: name, 
      birthdate, 
      gender, 
      birthtime: formattedTime,
      calendarType 
    };
    
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

        {/* Birthdate Input (Required) - 드롭다운 3단 */}
        <div className="space-y-2 group">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-emerald-200/80 transition-colors group-focus-within:text-emerald-200">
              <Calendar size={16} /> 생년월일 (필수)
            </label>

             {/* 양력/음력 선택 버튼 (사주 테마 색상 적용) */}
             <div className="flex bg-black/40 rounded-lg p-1 gap-1">
                {(["solar", "lunar", "leap"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCalendarType(type)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      calendarType === type
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "text-emerald-200/50 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {type === "solar" ? "양력" : type === "lunar" ? "음력" : "윤달"}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="flex gap-2">
            {/* 연도 드롭다운 */}
            <div className="relative flex-1">
              <select
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all text-center cursor-pointer"
              >
                <option value="" className="bg-gray-800">연도</option>
                {Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 2025 - i).map((y) => (
                  <option key={y} value={y} className="bg-gray-800">
                    {y}년
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>
            
            {/* 월 드롭다운 */}
            <div className="relative flex-1">
              <select
                required
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setDay(""); // 월이 변경되면 일 초기화
                }}
                className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all text-center cursor-pointer"
              >
                <option value="" className="bg-gray-800">월</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m} className="bg-gray-800">
                    {m}월
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>
            
            {/* 일 드롭다운 */}
            <div className="relative flex-1">
              <select
                required
                value={day}
                onChange={(e) => setDay(e.target.value)}
                disabled={!month || !year}
                className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-gray-800">일</option>
                {(() => {
                  if (!month || !year) return [];
                  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
                  return Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d} className="bg-gray-800">
                      {d}일
                    </option>
                  ));
                })()}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Time Input (Dropdown) */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-sm font-medium text-emerald-200/80 transition-colors group-focus-within:text-emerald-200">
            <Clock size={16} /> 태어난 시간 (정확도 향상)
          </label>
          <div className="flex gap-2">
            {/* 시 선택 */}
            <div className="relative flex-1">
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all text-center cursor-pointer"
              >
                <option value="" className="bg-gray-800">시간 모름</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i} className="bg-gray-800">
                    {i}시
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>

            {/* 분 선택 */}
            <div className="relative flex-1">
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                disabled={hour === ""}
                className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/10 focus:border-white/30 outline-none transition-all text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")} className="bg-gray-800">
                    {i}분
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>
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
