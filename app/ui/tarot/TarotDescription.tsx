import GoogleAdSense from "../GoogleAdSense";

export default function TarotDescription() {
  return (
    <section className="w-full max-w-md mx-auto px-6 py-12 text-white/70 space-y-8 border-t border-white/10 mt-12">
      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          타로 카드, 무의식이 보내는 신호
        </h2>
        <p className="text-sm leading-relaxed mb-4">
          타로(Tarot)는 메이저 아르카나 22장의 카드를 통해 현재의 상황과 미래의 가능성을 점치는 도구입니다. 무작위로 뽑은 것 같지만, 심리학자 칼 융(Carl Jung)이 말한 <strong>'동시성 원리'</strong>에 의해 당신의 무의식이 현재 가장 필요한 메시지를 선택하게 됩니다. ALL NEW FORTUNE에서는 <strong>22장 중 3장을 선택</strong>하여 더욱 깊이 있는 해석을 제공합니다.
        </p>
      </article>

      <GoogleAdSense slot="1234567890" />

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          메이저 아르카나 22장
        </h2>
        <p className="text-sm leading-relaxed mb-4">
          <strong>메이저 아르카나 (22장):</strong> '바보(The Fool)'부터 '세계(The World)'까지, 인생의 큰 흐름과 영적 교훈을 상징합니다. 이 카드들이 나오면 인생의 중요한 전환점을 의미할 수 있습니다. 각 카드는 과거, 현재, 미래를 연결하는 운명의 실타래를 보여줍니다.
        </p>
        <p className="text-sm leading-relaxed">
          ALL NEW FORTUNE의 타로 서비스는 <strong>사업운, 애정운, 학업운, 취업운, 인간관계운</strong> 등 5가지 카테고리별로 맞춤 해석을 제공합니다. 궁금한 운세를 선택하고, 직관으로 끌리는 카드 3장을 뽑아보세요.
        </p>
      </article>

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          타로점 잘 보는 꿀팁
        </h2>
        <p className="text-sm leading-relaxed">
          타로는 질문이 구체적일수록 답변도 명확해집니다. 카테고리를 선택한 후, 마음속으로 구체적인 질문을 떠올리며 카드를 뽑아보세요. 예를 들어 "사업운"을 선택했다면 "이번 달 매출이 늘어날까요?"처럼 구체적으로 생각하면 더욱 정확한 해석을 받을 수 있습니다. 3장의 카드는 각각 과거의 영향, 현재의 상황, 미래의 가능성을 보여주며, 이를 종합하여 당신의 고민에 대한 명쾌한 해답을 드립니다.
        </p>
      </article>
    </section>
  );
}
