"use client";

import Link from "next/link";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, UserX, Zap, Send, Mail, Loader2 } from "lucide-react";

export default function Footer() {
  const [modalContent, setModalContent] = useState<"about" | "privacy" | "contact" | null>(null);

  // Contact State
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    email: "",
    category: "general",
    message: "",
  });

  const closeModal = () => {
    setModalContent(null);
    setIsSent(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        setIsSent(true);
        setContactForm({ email: "", category: "general", message: "" });
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
    <>
      <footer className="py-8 text-center text-xs text-white/40 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => setModalContent("about")} className="hover:text-white transition-colors">
            서비스 소개
          </button>
          <span className="w-[1px] h-3 bg-white/20 self-center"></span>
          <button onClick={() => setModalContent("privacy")} className="hover:text-white transition-colors">
            개인정보처리방침
          </button>
          <span className="w-[1px] h-3 bg-white/20 self-center"></span>
          <button onClick={() => setModalContent("contact")} className="hover:text-white transition-colors">
            문의하기
          </button>
        </div>
        <p>© 2025 ALL NEW FORTUNE. All rights reserved.</p>
      </footer>

      {/* 서비스 소개 모달 */}
      <Modal isOpen={modalContent === "about"} onClose={closeModal} title="서비스 소개">
        <div className="space-y-6">
          <section className="text-center">
            <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              ALL NEW FORTUNE
            </h2>
            <p className="text-white/80 leading-relaxed text-sm">
              복잡한 절차 없이, 오직 당신의 운세만을 생각했습니다.<br />
              AI 기술과 정통 명리학을 결합하여 가장 현대적이고 정확한 운세 서비스를 제공합니다.
            </p>
          </section>

          <div className="grid gap-3">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2 text-yellow-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-bold text-sm">100% 무료 서비스</h3>
              </div>
              <p className="text-xs text-white/60">
                모든 운세 콘텐츠는 무료로 제공됩니다. 결제 유도나 숨겨진 유료 서비스가 전혀 없습니다.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <UserX className="w-4 h-4" />
                <h3 className="font-bold text-sm">회원가입 없음</h3>
              </div>
              <p className="text-xs text-white/60">
                로그인, 회원가입, 본인인증 등 번거로운 절차 없이 접속하자마자 결과를 확인하세요.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2 text-purple-400">
                <Zap className="w-4 h-4" />
                <h3 className="font-bold text-sm">AI 기반 초정밀 분석</h3>
              </div>
              <p className="text-xs text-white/60">
                정통 사주 명리학 데이터를 학습한 AI가 당신의 생년월일을 분석하여 개인화된 운명을 알려드립니다.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* 개인정보처리방침 모달 */}
      <Modal isOpen={modalContent === "privacy"} onClose={closeModal} title="개인정보처리방침">
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <ShieldCheck className="w-10 h-10 text-green-500 mb-2" />
            <h2 className="text-lg font-bold mb-1 text-white">안심하세요!</h2>
            <p className="text-white/70 text-xs">
              ALL NEW FORTUNE은 귀하의 개인정보를<br/>
              <span className="text-green-400 font-bold">절대 서버에 저장하지 않습니다.</span>
            </p>
          </div>

          <section className="space-y-3 text-xs text-white/80 leading-relaxed">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">1. 개인정보의 수집 및 이용 목적</h3>
              <p>
                본 서비스는 별도의 회원가입 절차가 없으며, 사용자의 이름, 전화번호, 주민등록번호 등 민감한 개인정보를 서버에 수집하거나 저장하지 않습니다.
                운세 풀이를 위해 입력하시는 '생년월일', '태어난 시간', '성별' 정보는 결과 산출을 위한 일회성 데이터로만 사용되며, 결과 페이지를 벗어나는 즉시 휘발됩니다.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-1">2. 쿠키(Cookie) 및 데이터 저장</h3>
              <p>
                서비스 이용 편의를 위해 사용자의 브라우저(로컬 스토리지 등)에 일부 설정값이 저장될 수 있으나, 이는 전적으로 사용자 기기 내에만 존재하며 서버로 전송되지 않습니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-1">3. 제3자 제공 및 위탁</h3>
              <p>
                수집하는 개인정보가 없으므로, 제3자에게 제공하거나 위탁하는 정보 또한 존재하지 않습니다.
              </p>
            </div>
          </section>
        </div>
      </Modal>

      {/* 문의하기 모달 */}
      <Modal isOpen={modalContent === "contact"} onClose={closeModal} title="문의하기">
        {isSent ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
              <Send className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">전송 완료!</h2>
            <p className="text-white/60 text-sm">
              보내주신 소중한 의견,<br />
              빠르게 확인하고 답변 드리겠습니다.
            </p>
            <button 
              onClick={() => {
                setIsSent(false);
                setContactForm({ email: "", category: "general", message: "" });
              }}
              className="mt-4 text-xs text-white/40 underline hover:text-white transition-colors"
            >
              새로운 문의 보내기
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70">이메일 (답변 받으실 주소)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70">문의 유형</label>
              <div className="grid grid-cols-3 gap-2">
                {["general", "bug", "partnership"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setContactForm({ ...contactForm, category: type })}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${
                      contactForm.category === type
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

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70">내용</label>
              <textarea
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="궁금한 점이나 건의사항을 자유롭게 적어주세요."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  전송 중...
                </>
              ) : (
                "문의 보내기"
              )}
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}

