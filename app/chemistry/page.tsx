"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import ChemistryIntro from "../ui/chemistry/ChemistryIntro";
import ChemistryInput from "../ui/chemistry/ChemistryInput";
import ChemistryResult from "../ui/chemistry/ChemistryResult";
import ChemistryDescription from "../ui/chemistry/ChemistryDescription";
import FortuneLoading from "../ui/FortuneLoading";
import { ChemistryResultType, calculateChemistry } from "../data/chemistryData";

type ChemistryStep = "intro" | "input" | "loading" | "result";

export default function ChemistryPage() {
  const router = useRouter();
  const [chemistryStep, setChemistryStep] = useState<ChemistryStep>("intro");
  const [chemistryResult, setChemistryResult] = useState<ChemistryResultType | null>(null);

  const handleChemistryStart = () => {
    setChemistryStep("input");
  };

  const handleChemistrySubmit = (data: {
    me: { name: string; birthdate: string; gender: "M" | "F" };
    partner: { name: string; birthdate: string; gender: "M" | "F" };
  }) => {
    setChemistryStep("loading");
    
    setTimeout(() => {
      // 생년월일 문자열을 분해하여 계산 함수에 전달
      const [myYear, myMonth, myDay] = data.me.birthdate.split("-").map(Number);
      const [partnerYear, partnerMonth, partnerDay] = data.partner.birthdate.split("-").map(Number);

      const result = calculateChemistry(
        { year: myYear, month: myMonth, day: myDay },
        { year: partnerYear, month: partnerMonth, day: partnerDay }
      );
      
      setChemistryResult(result);
      setChemistryStep("result");
    }, 2000);
  };

  const handleChemistryReset = () => {
    setChemistryResult(null);
    setChemistryStep("intro");
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md z-10 min-h-screen flex flex-col"
        >
             <header className="sticky top-0 z-50 px-4 py-4 bg-black/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <button onClick={() => router.push('/')} className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-lg font-bold">궁합 테스트</h2>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
              <div className="w-full transition-all duration-500">
                {chemistryStep === "intro" && <ChemistryIntro onStart={handleChemistryStart} />}
                {chemistryStep === "input" && <ChemistryInput onSubmit={handleChemistrySubmit} />}
                {chemistryStep === "loading" && <FortuneLoading />}
                {chemistryStep === "result" && chemistryResult && <ChemistryResult resultData={chemistryResult} onReset={handleChemistryReset} />}
                
                <ChemistryDescription />
              </div>
            </div>
        </motion.div>
    </main>
  );
}

