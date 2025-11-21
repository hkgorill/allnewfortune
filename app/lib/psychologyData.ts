export interface PsychQuestion {
  id: number;
  text: string;
  options: [
    { text: string; type: string },
    { text: string; type: string }
  ];
}

export interface PsychResultType {
  type: string;
  name: string; // 동물/캐릭터 이름
  tags: string[];
  description: string;
  advice: string;
  color: string;
  emoji: string;
}

export const PSYCH_QUESTIONS: PsychQuestion[] = [
  {
    id: 1,
    text: "낯선 숲속에 들어왔다. 눈앞에 보이는 길은?",
    options: [
      { text: "잘 닦여진 넓은 길 🛣️", type: "A" },
      { text: "사람의 흔적이 없는 오솔길 🌿", type: "B" }
    ]
  },
  {
    id: 2,
    text: "길을 걷다 열쇠 꾸러미를 발견했다. 당신의 행동은?",
    options: [
      { text: "주워서 주머니에 넣는다 🔑", type: "A" },
      { text: "그 자리에 그대로 둔다 ✋", type: "B" }
    ]
  },
  {
    id: 3,
    text: "갑자기 곰이 나타났다! 곰의 행동은?",
    options: [
      { text: "나를 무시하고 지나간다 🐻", type: "B" },
      { text: "나를 쳐다보며 다가온다 😱", type: "A" }
    ]
  },
  {
    id: 4,
    text: "숲속 깊은 곳에 집이 하나 있다. 어떤 집일까?",
    options: [
      { text: "화려하고 웅장한 저택 🏰", type: "A" },
      { text: "아늑하고 작은 오두막 🏠", type: "B" }
    ]
  },
  {
    id: 5,
    text: "집 안으로 들어갔더니 테이블 위에 컵이 있다. 컵의 재질은?",
    options: [
      { text: "투명한 유리 컵 🥛", type: "B" },
      { text: "단단한 금속/도자기 컵 ☕", type: "A" }
    ]
  },
  {
    id: 6,
    text: "집을 나와 걷다 보니 물가에 도착했다. 물의 형태는?",
    options: [
      { text: "잔잔한 호수나 연못 🌊", type: "B" },
      { text: "흐르는 강이나 계곡 💧", type: "A" }
    ]
  },
  {
    id: 7,
    text: "이제 숲을 빠져나가야 한다. 얼마나 걸릴까?",
    options: [
      { text: "금방 나갈 수 있을 것 같다 🏃", type: "A" },
      { text: "한참 걸릴 것 같다 🐢", type: "B" }
    ]
  }
];

export const PSYCH_RESULTS: Record<string, PsychResultType> = {
  Leader: {
    type: "Leader",
    name: "용감한 사자",
    tags: ["#야망", "#리더십", "#현실적"],
    description: "당신은 목표가 뚜렷하고 현실적인 감각이 뛰어난 사람입니다. 난관이 닥쳐도 피하지 않고 정면으로 돌파하는 용기를 가지고 있군요.",
    advice: "가끔은 주변을 돌아보며 쉼표를 찍는 여유도 필요합니다.",
    color: "text-orange-400",
    emoji: "🦁"
  },
  Artist: {
    type: "Artist",
    name: "자유로운 고양이",
    tags: ["#개성", "#독립적", "#예술적"],
    description: "당신은 자신만의 세계가 확고하고 독창적인 사람입니다. 남들의 시선보다는 자신의 만족과 감정을 더 중요하게 생각하는군요.",
    advice: "타인과의 소통을 조금만 더 늘린다면 당신의 매력이 더 빛날 거예요.",
    color: "text-purple-400",
    emoji: "🐱"
  },
  Healer: {
    type: "Healer",
    name: "따뜻한 강아지",
    tags: ["#공감", "#배려", "#평화"],
    description: "당신은 타인의 감정을 잘 이해하고 배려하는 따뜻한 마음씨를 가졌습니다. 갈등보다는 조화를 추구하는 평화주의자시네요.",
    advice: "남을 챙기는 만큼 자기 자신을 돌보는 시간도 꼭 가지세요.",
    color: "text-pink-400",
    emoji: "🐶"
  },
  Thinker: {
    type: "Thinker",
    name: "지혜로운 부엉이",
    tags: ["#신중", "#통찰력", "#분석"],
    description: "당신은 상황을 깊이 관찰하고 신중하게 판단하는 현명한 사람입니다. 겉으로 드러내지 않아도 속으로는 모든 것을 파악하고 있군요.",
    advice: "생각이 너무 많아지면 행동이 늦어질 수 있으니 주의하세요.",
    color: "text-blue-400",
    emoji: "🦉"
  }
};

// 간단한 분석 로직
export const calculatePsychology = (answers: Record<string, string>): PsychResultType => {
  let scoreA = 0;
  Object.values(answers).forEach(val => {
    if (val === 'A') scoreA++;
  });

  // A가 많으면 외향/주도형(사자), 적으면 내향/신중형(부엉이) 등등 단순 분류
  // 실제로는 더 복잡한 로직이 가능하지만 예시용으로 4분할
  // 문항 7개: A개수 0-1(부엉이), 2-3(고양이), 4-5(강아지), 6-7(사자) - 예시
  
  if (scoreA >= 6) return PSYCH_RESULTS['Leader'];
  if (scoreA >= 4) return PSYCH_RESULTS['Healer']; // A/B 섞임 (사회적)
  if (scoreA >= 2) return PSYCH_RESULTS['Artist']; // B가 좀 더 많음 (개인적)
  return PSYCH_RESULTS['Thinker']; // B가 압도적 (내면적)
};

