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

      {/* Footer */}
      <footer className="mt-4 text-center text-xs text-[var(--color-text-secondary)] opacity-50 z-10 pb-4">
        © 2026 ALL NEW FORTUNE. All rights reserved.
      </footer>
    </main>
  );
}
