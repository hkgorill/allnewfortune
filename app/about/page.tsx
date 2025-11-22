import Link from "next/link";
import { ChevronLeft, Sparkles, Zap, UserX } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto flex flex-col">
      <header className="flex items-center mb-8">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold ml-2">서비스 소개</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ALL NEW FORTUNE
          </h2>
          <p className="text-white/80 leading-relaxed">
            복잡한 절차 없이, 오직 당신의 운세만을 생각했습니다.<br />
            AI 기술과 정통 명리학을 결합하여 가장 현대적이고 정확한 운세 서비스를 제공합니다.
          </p>
        </section>

        <div className="grid gap-4">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mb-3 text-yellow-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-1">100% 무료 서비스</h3>
            <p className="text-sm text-white/60">
              모든 운세 콘텐츠는 무료로 제공됩니다. 결제 유도나 숨겨진 유료 서비스가 전혀 없습니다.
            </p>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-3 text-blue-400">
              <UserX className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-1">회원가입 없음</h3>
            <p className="text-sm text-white/60">
              로그인, 회원가입, 본인인증... 귀찮은 절차는 모두 없앴습니다. 접속하자마자 바로 결과를 확인하세요.
            </p>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mb-3 text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-1">AI 기반 초정밀 분석</h3>
            <p className="text-sm text-white/60">
              정통 사주 명리학 데이터를 학습한 AI가 당신의 생년월일을 분석하여 개인화된 운명을 알려드립니다.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
           <Link href="/" className="inline-block w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
             운세 보러 가기
           </Link>
        </div>
      </div>
    </main>
  );
}


