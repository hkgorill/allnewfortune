import GoogleAdSense from "../GoogleAdSense";

export default function HoroscopeDescription() {
  return (
    <section className="w-full max-w-md mx-auto px-6 py-12 text-white/70 space-y-8 border-t border-white/10 mt-12">
      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          별자리가 들려주는 운명의 이야기
        </h2>
        <p className="text-sm leading-relaxed mb-4">
          당신이 태어난 날, 태양은 어느 별자리에 머물고 있었나요? 서양 점성술(Horoscope)은 하늘의 별들이 우리 삶에 미치는 영향을 해석합니다. 12개의 황도 12궁은 저마다 고유한 성격과 운명을 지니고 있습니다.
        </p>
      </article>

      <GoogleAdSense slot="1234567890" />

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          12별자리 특징 요약
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>양자리:</strong> 열정, 도전, 리더십</li>
            <li><strong>황소자리:</strong> 신중, 안정을 추구</li>
            <li><strong>쌍둥이자리:</strong> 호기심, 다재다능</li>
            <li><strong>게자리:</strong> 감수성, 모성애</li>
            <li><strong>사자자리:</strong> 자신감, 창조성</li>
            <li><strong>처녀자리:</strong> 분석, 완벽주의</li>
          </ul>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>천칭자리:</strong> 조화, 사교성</li>
            <li><strong>전갈자리:</strong> 통찰력, 신비주의</li>
            <li><strong>사수자리:</strong> 자유, 낙천주의</li>
            <li><strong>염소자리:</strong> 성실, 야망</li>
            <li><strong>물병자리:</strong> 독창성, 박애주의</li>
            <li><strong>물고기자리:</strong> 공감, 예술성</li>
          </ul>
        </div>
      </article>

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          오늘의 행운 포인트
        </h2>
        <p className="text-sm leading-relaxed">
          매일 변하는 별들의 배치에 따라 당신의 운세도 달라집니다. 오늘 당신에게 행운을 가져다줄 색상(Color), 숫자(Number), 그리고 아이템은 무엇일까요? 아침에 확인하고 하루를 기분 좋게 시작하세요.
        </p>
      </article>
    </section>
  );
}
