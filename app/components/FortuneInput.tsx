"use client";

import { useState } from "react";
import { Calendar, Clock, User, Check } from "lucide-react";

export interface FortuneInputData {
  name: string;
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
  const [birthtime, setBirthtime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;
    onSubmit({ name, birthdate, gender, birthtime });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-[var(--color-secondary)]">
      <h2 className="text-2xl font-bold text-center mb-6 text-[var(--color-text-primary)]">
        2026년 나의 운세는?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <User size={16} /> 이름 (선택)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full p-4 rounded-2xl bg-[var(--color-secondary)] border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none transition-all"
          />
        </div>

        {/* Birthdate Input (Required) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]">
            <Calendar size={16} /> 생년월일 (필수)
          </label>
          <input
            type="date"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[var(--color-secondary)] border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none transition-all"
          />
        </div>

        {/* Time Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <Clock size={16} /> 태어난 시간 (선택)
          </label>
          <input
            type="time"
            value={birthtime}
            onChange={(e) => setBirthtime(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[var(--color-secondary)] border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none transition-all"
          />
        </div>

        {/* Gender Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            성별 (선택)
          </label>
          <div className="flex gap-2">
            {(["male", "female", "none"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                  gender === g
                    ? "bg-[var(--color-main)] border-[var(--color-main)] text-[var(--color-text-primary)] shadow-sm"
                    : "bg-white border-gray-200 text-gray-400 hover:bg-[var(--color-secondary)]"
                }`}
              >
                {g === "male" ? "남성" : g === "female" ? "여성" : "선택안함"}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !birthdate}
          className="w-full py-4 mt-4 bg-[var(--color-text-primary)] text-white rounded-2xl font-bold text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "운세를 읽고 있어요..." : "운세 확인하기"}
        </button>
      </form>
    </div>
  );
}
