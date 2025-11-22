export default function MbtiDescription() {
  return (
    <section className="w-full max-w-md mx-auto px-6 py-12 text-white/70 space-y-8 border-t border-white/10 mt-12">
      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          MBTI 16가지 성격 유형의 이해
        </h2>
        <p className="text-sm leading-relaxed mb-4">
          MBTI(Myers-Briggs Type Indicator)는 사람의 성격을 4가지 척도에 따라 16가지 유형으로 분류하는 심리 검사입니다. 자신의 타고난 선호 경향을 이해하면, 대인 관계에서의 갈등을 줄이고 진로를 선택하는 데 큰 도움이 됩니다.
        </p>
      </article>

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          4가지 선호 지표 (알파벳의 의미)
        </h2>
        <ul className="list-disc pl-5 text-sm space-y-4">
          <li><strong>E(외향) vs I(내향):</strong> 에너지를 밖에서 얻는지(사람, 활동), 안에서 얻는지(혼자만의 시간, 생각)의 차이입니다.</li>
          <li><strong>S(감각) vs N(직관):</strong> 정보를 받아들일 때 실제 경험과 오감에 의존하는지, 영감과 가능성에 주목하는지의 차이입니다.</li>
          <li><strong>T(사고) vs F(감정):</strong> 의사결정 시 논리와 사실을 중시하는지, 사람 관계와 가치를 중시하는지의 차이입니다.</li>
          <li><strong>J(판단) vs P(인식):</strong> 생활 양식이 계획적이고 체계적인지, 자율적이고 융통성 있는지의 차이입니다.</li>
        </ul>
      </article>

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          나의 '진짜' 모습 찾기
        </h2>
        <p className="text-sm leading-relaxed">
          간단하지만 정확한 질문을 통해 당신의 MBTI를 진단해 드립니다. "난 E일까 I일까?" 헷갈렸던 당신의 성격, 이제 명확하게 정의해 드립니다. 유형별 추천 직업과 연애 궁합까지 확인해 보세요.
        </p>
      </article>
    </section>
  );
}

