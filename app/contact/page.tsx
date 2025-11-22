"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Send, Mail, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    category: "general", // general, bug, partnership
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ email: "", category: "general", message: "" });
      } else {
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto flex flex-col">
      <header className="flex items-center mb-8">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold ml-2">문의하기</h1>
      </header>

      {isSent ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 fade-in">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
            <Send className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">전송 완료!</h2>
          <p className="text-white/60">
            보내주신 소중한 의견,<br />
            빠르게 확인하고 답변 드리겠습니다.
          </p>
          <button 
            onClick={() => setIsSent(false)}
            className="mt-6 text-sm text-white/40 underline hover:text-white transition-colors"
          >
            새로운 문의 보내기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">이메일 (답변 받으실 주소)</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">문의 유형</label>
            <div className="grid grid-cols-3 gap-2">
              {["general", "bug", "partnership"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: type })}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.category === type
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {type === "general" && "일반문의"}
                  {type === "bug" && "오류신고"}
                  {type === "partnership" && "제휴제안"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">내용</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="궁금한 점이나 건의사항을 자유롭게 적어주세요."
              className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                전송 중...
              </>
            ) : (
              "문의 보내기"
            )}
          </button>
        </form>
      )}
    </main>
  );
}


