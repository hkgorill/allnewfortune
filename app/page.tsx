"use client";

import { useState } from "react";
import FortuneInput, { FortuneInputData } from "./components/FortuneInput";
import FortuneLoading from "./components/FortuneLoading";
import FortuneResult, { FortuneResultData } from "./components/FortuneResult";
import KakaoAdFit from "./components/KakaoAdFit";

export default function Home() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [resultData, setResultData] = useState<FortuneResultData | null>(null);

  const handleInputSubmit = async (data: FortuneInputData) => {
    setStep("loading");

    try {
      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch fortune");
      }

      const result = await response.json();
      setResultData(result);
      setStep("result");
    } catch (error) {
      console.error(error);
      alert("운세를 불러오는데 실패했습니다. 다시 시도해주세요.");
      setStep("input");
    }
  };

  const handleReset = () => {
    setResultData(null);
    setStep("input");
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[var(--color-main)] rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[var(--color-highlight)] rounded-full opacity-20 blur-3xl pointer-events-none" />

      {/* Header (Only show on Input step) */}
      {step === "input" && (
        <header className="mb-8 text-center z-10">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">
            ALL NEW FORTUNE
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            모두의 신년운세 2026
          </p>
        </header>
      )}

      {/* Content Area */}
      <div className="w-full max-w-md z-10 transition-all duration-500">
        {step === "input" && (
          <FortuneInput onSubmit={handleInputSubmit} isLoading={false} />
        )}

        {step === "loading" && <FortuneLoading />}

        {step === "result" && resultData && (
          <FortuneResult data={resultData} onReset={handleReset} />
        )}

        {/* AdFit Advertisement (Footer - Input/Result only) */}
        {step !== "loading" && (
          <div className="mt-8 mb-4 flex justify-center">
            <KakaoAdFit unit="DAN-zgZw9Q6wvZuU1nIl" width="250" height="250" />
          </div>
        )}
      </div>

      {/* SEO Content & FAQ (Visible mostly on Input step for SEO) */}
      {step === "input" && (
        <section className="w-full max-w-2xl z-10 mt-12 mb-8 px-6 text-[var(--color-text-secondary)] text-sm leading-relaxed">
           <div className="space-y-8">
             <article>
               <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">2026년 병오년 신년운세, AI로 미리 확인하세요</h2>
               <p className="mb-2">
                 2026년은 '붉은 말의 해'인 병오년(丙午年)입니다. 열정과 에너지가 넘치는 해로, 새로운 시작과 도전에 아주 좋은 기운을 가지고 있습니다.
                 ALL NEW FORTUNE은 전통 명리학 데이터와 최신 AI 기술을 결합하여, 당신의 사주팔자를 정밀하게 분석하고 2026년의 흐름을 읽어드립니다.
               </p>
               <p>
                 생년월일과 태어난 시간만 입력하면 재물운, 연애운, 직업운, 건강운 등 종합적인 운세 풀이와 함께, 
                 당신에게 행운을 가져다줄 맞춤형 아이템까지 추천해 드립니다.
               </p>
             </article>

             <article>
               <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">자주 묻는 질문 (FAQ)</h2>
               <div className="space-y-4">
                 <div>
                   <h3 className="font-semibold text-[var(--color-text-primary)]">Q. 운세 결과는 얼마나 정확한가요?</h3>
                   <p className="mt-1 opacity-80">A. 전통적인 사주 명리학 이론을 기반으로 AI가 방대한 데이터를 학습하여 분석합니다. 개인의 성향과 잠재력을 파악하는 데 높은 정확도를 보이지만, 운세는 길잡이일 뿐 운명은 본인의 의지로 만들어가는 것임을 잊지 마세요.</p>
                 </div>
                 <div>
                   <h3 className="font-semibold text-[var(--color-text-primary)]">Q. 이용 요금은 무료인가요?</h3>
                   <p className="mt-1 opacity-80">A. 네, ALL NEW FORTUNE의 모든 신년운세 서비스는 100% 무료로 제공됩니다. 회원가입 없이 바로 이용하실 수 있습니다.</p>
                 </div>
                 <div>
                   <h3 className="font-semibold text-[var(--color-text-primary)]">Q. 양력과 음력 중 무엇을 입력해야 하나요?</h3>
                   <p className="mt-1 opacity-80">A. 일반적으로 사용하시는 양력 생년월일을 입력해주시면 시스템이 자동으로 변환하여 사주를 계산합니다. 태어난 시간을 정확히 입력하시면 더 정밀한 결과를 얻으실 수 있습니다.</p>
                 </div>
               </div>
             </article>
           </div>
           
           {/* Structured Data for SEO */}
           <script
             type="application/ld+json"
             dangerouslySetInnerHTML={{
               __html: JSON.stringify({
                 "@context": "https://schema.org",
                 "@type": "FAQPage",
                 "mainEntity": [
                   {
                     "@type": "Question",
                     "name": "운세 결과는 얼마나 정확한가요?",
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": "전통적인 사주 명리학 이론을 기반으로 AI가 방대한 데이터를 학습하여 분석합니다. 개인의 성향과 잠재력을 파악하는 데 높은 정확도를 보이지만, 운세는 길잡이일 뿐 운명은 본인의 의지로 만들어가는 것임을 잊지 마세요."
                     }
                   },
                   {
                     "@type": "Question",
                     "name": "이용 요금은 무료인가요?",
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": "네, ALL NEW FORTUNE의 모든 신년운세 서비스는 100% 무료로 제공됩니다. 회원가입 없이 바로 이용하실 수 있습니다."
                     }
                   },
                   {
                     "@type": "Question",
                     "name": "양력과 음력 중 무엇을 입력해야 하나요?",
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": "일반적으로 사용하시는 양력 생년월일을 입력해주시면 시스템이 자동으로 변환하여 사주를 계산합니다. 태어난 시간을 정확히 입력하시면 더 정밀한 결과를 얻으실 수 있습니다."
                     }
                   }
                 ]
               })
             }}
           />
        </section>
      )}

      {/* Footer */}
      <footer className="mt-4 text-center text-xs text-[var(--color-text-secondary)] opacity-50 z-10 pb-4">
        © 2026 ALL NEW FORTUNE. All rights reserved.
      </footer>
    </main>
  );
}
