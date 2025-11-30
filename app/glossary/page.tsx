import { GLOSSARY_TERMS, GlossaryTerm } from "@/app/data/glossaryData";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Book, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "운세 용어 사전 | ALL NEW FORTUNE",
  description: "사주, 타로, 관상 등 운세 관련 전문 용어를 알기 쉽게 풀이한 대백과사전입니다. 비견, 도화살, 역마살 등 궁금한 용어를 찾아보세요.",
};

export default function GlossaryPage() {
  // 카테고리별로 그룹화
  const categories = Array.from(new Set(GLOSSARY_TERMS.map((t) => t.category)));
  
  const groupedTerms: Record<string, GlossaryTerm[]> = {};
  categories.forEach(cat => {
    groupedTerms[cat] = GLOSSARY_TERMS.filter(t => t.category === cat);
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <div className="flex justify-start mb-6">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" /> 메인으로
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Book className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
            운세 용어 사전
          </h1>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            "도화살이 뭐예요?", "대운이 들어온다는 게 무슨 뜻인가요?"<br />
            어렵게만 느껴졌던 운세 용어, 여기서 쉽고 명쾌하게 확인하세요.
            <br />
            <span className="text-emerald-400 text-sm mt-2 block font-bold">
              전문성(E-E-A-T)을 갖춘 정확한 해설을 제공합니다.
            </span>
          </p>
        </header>

        {/* 검색바 (UI만 존재) */}
        <div className="relative mb-12 max-w-md mx-auto opacity-70">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/40" />
          </div>
          <div className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-full bg-white/5 text-white/50 text-sm">
            Ctrl+F로 궁금한 용어를 검색해보세요
          </div>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 border-b border-white/10 pb-2 inline-block">
                {category}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {groupedTerms[category].map((item) => (
                  <article 
                    key={item.id}
                    id={item.id} // ID 추가
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors hover:border-emerald-500/30 scroll-mt-24 target:ring-2 target:ring-emerald-500 target:bg-emerald-900/20"
                  >
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {item.term}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.definition}
                    </p>
                    {item.example && (
                      <div className="mt-3 pt-3 border-t border-white/5 text-xs text-white/50">
                        <span className="font-bold text-emerald-400/70 mr-1">예시:</span> 
                        {item.example}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gradient-to-br from-emerald-900/30 to-black border border-emerald-500/20 rounded-2xl text-center">
          <h3 className="text-xl font-bold mb-2 text-white">내 사주에 '도화살'이 있을까?</h3>
          <p className="text-white/60 mb-6 text-sm">AI가 분석하는 정밀 사주풀이로 내 운명의 비밀을 확인해보세요.</p>
          <Link 
            href="/saju"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg shadow-emerald-900/50"
          >
            무료 사주풀이 하러 가기
          </Link>
        </div>
      </div>
    </main>
  );
}
