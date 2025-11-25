"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart, ChevronDown } from "lucide-react";

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
  
  // 생년월일 드롭다운 상태 (본인/상대방 각각)
  const [dateDropdowns, setDateDropdowns] = useState({
    me: { year: "", month: "", day: "" },
    partner: { year: "", month: "", day: "" },
  });

  // 생년월일 드롭다운에서 날짜 문자열 생성
  useEffect(() => {
    const updateBirthdate = (person: "me" | "partner") => {
      const { year, month, day } = dateDropdowns[person];
      if (year && month && day) {
        const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        setFormData(prev => ({
          ...prev,
          [person]: { ...prev[person], birthdate: formattedDate }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [person]: { ...prev[person], birthdate: "" }
        }));
      }
    };
    
    updateBirthdate("me");
    updateBirthdate("partner");
  }, [dateDropdowns]);

  // 기존 birthdate에서 드롭다운 값 추출
  useEffect(() => {
    ["me", "partner"].forEach((person) => {
      const birthdate = formData[person as "me" | "partner"].birthdate;
      const currentDropdowns = dateDropdowns[person as "me" | "partner"];
      if (birthdate && !currentDropdowns.year && !currentDropdowns.month && !currentDropdowns.day) {
        const [y, m, d] = birthdate.split("-");
        if (y && m && d) {
          setDateDropdowns(prev => ({
            ...prev,
            [person]: { year: y, month: m, day: d }
          }));
        }
      }
    });
  }, [formData.me.birthdate, formData.partner.birthdate]);

  // 로컬 스토리지에서 내 정보 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("fortuneUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.birthdate) {
          const [y, m, d] = parsed.birthdate.split("-");
          if (y && m && d) {
            setDateDropdowns(prev => ({
              ...prev,
              me: { year: y, month: m, day: d }
            }));
          }
        }
        setFormData(prev => ({
          ...prev,
          me: {
            ...prev.me,
            name: parsed.username || prev.me.name,
            birthdate: parsed.birthdate || prev.me.birthdate,
            gender: parsed.gender === "male" ? "M" : parsed.gender === "female" ? "F" : prev.me.gender
          }
        }));
      } catch (e) {
        console.error("Failed to parse saved user data", e);
      }
    }
  }, []);

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
  const currentDropdowns = dateDropdowns[step];
  
  const updateCurrent = (field: string, value: string) => {
    setFormData({
      ...formData,
      [step]: { ...currentData, [field]: value },
    });
  };
  
  const updateDateDropdown = (field: "year" | "month" | "day", value: string) => {
    setDateDropdowns(prev => {
      const newDropdowns = {
        ...prev[step],
        [field]: value
      };
      
      // 월이 변경되면 일 초기화
      if (field === "month") {
        newDropdowns.day = "";
      }
      
      return {
        ...prev,
        [step]: newDropdowns
      };
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

          {/* Birthdate Input - 드롭다운 3단 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/80 ml-1">생년월일</label>
            <div className="flex gap-2">
              {/* 연도 드롭다운 */}
              <div className="relative flex-1">
                <select
                  required
                  value={currentDropdowns.year}
                  onChange={(e) => updateDateDropdown("year", e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:border-pink-500/50 transition-colors text-center cursor-pointer"
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
                  value={currentDropdowns.month}
                  onChange={(e) => updateDateDropdown("month", e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:border-pink-500/50 transition-colors text-center cursor-pointer"
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
                  value={currentDropdowns.day}
                  onChange={(e) => updateDateDropdown("day", e.target.value)}
                  disabled={!currentDropdowns.month || !currentDropdowns.year}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:border-pink-500/50 transition-colors text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" className="bg-gray-800">일</option>
                  {(() => {
                    if (!currentDropdowns.month || !currentDropdowns.year) return [];
                    const daysInMonth = new Date(parseInt(currentDropdowns.year), parseInt(currentDropdowns.month), 0).getDate();
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
