import GoogleAdSense from "../GoogleAdSense";

export default function FingerDescription() {
  return (
    <section className="w-full max-w-md mx-auto px-6 py-12 text-white/70 space-y-8 border-t border-white/10 mt-12">
      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          손가락 길이와 뇌 구조의 비밀
        </h2>
        <p className="text-sm leading-relaxed mb-4">
          검지(둘째 손가락)와 약지(넷째 손가락)의 길이 비율은 태아 시절 엄마 뱃속에서 <strong>테스토스테론(남성 호르몬)</strong>에 얼마나 노출되었는지를 나타내는 지표라는 연구 결과가 있습니다. 이를 통해 타고난 성향과 뇌 구조를 유추해볼 수 있습니다.
        </p>
      </article>

      <GoogleAdSense slot="1234567890" />

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          당신은 어떤 타입인가요?
        </h2>
        <ul className="list-disc pl-5 text-sm space-y-4">
          <li>
            <strong>약지가 긴 유형 (테토형):</strong> 남성 호르몬의 영향을 많이 받은 타입입니다. 공간 지각 능력이 뛰어나고, 적극적이며 모험을 즐기는 경향이 있습니다. 논리적이고 결단력이 빠릅니다.
          </li>
          <li>
            <strong>검지가 긴 유형 (에겐형):</strong> 여성 호르몬의 영향을 더 받은 타입입니다. 언어 능력이 뛰어나고, 공감 능력이 높으며 섬세합니다. 평화주의적이고 감성이 풍부합니다.
          </li>
        </ul>
      </article>

      <article>
        <h2 className="text-xl font-bold text-white mb-4">
          재미로 보는 본능 테스트
        </h2>
        <p className="text-sm leading-relaxed">
          나도 몰랐던 나의 숨겨진 본능! 간단한 손가락 길이 비교만으로 나의 성격, 연애 스타일, 그리고 잠재된 능력까지 확인해보세요. 과학적 통계와 재미있는 해석을 결합한 ALL NEW FORTUNE만의 뇌 구조 테스트입니다.
        </p>
      </article>
    </section>
  );
}
