export type PsychologyTestType = "forest" | "island" | "love";

export interface PsychQuestion {
  id: number;
  text: string;
  options: [
    { text: string; type: string },
    { text: string; type: string }
  ];
}

export interface PsychResultType {
  testType: PsychologyTestType;
  type: string;
  name: string; // 동물/캐릭터 이름 또는 유형
  tags: string[];
  description: string;
  advice: string;
  color: string;
  emoji: string;
}

// 숲속 심리테스트 질문
export const FOREST_QUESTIONS: PsychQuestion[] = [
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

// 숲속 심리테스트 결과
export const FOREST_RESULTS: Record<string, PsychResultType> = {
  Leader: {
    testType: "forest",
    type: "Leader",
    name: "용감한 사자",
    tags: ["#야망", "#리더십", "#현실적"],
    description: "당신은 목표가 뚜렷하고 현실적인 감각이 뛰어난 사람입니다. 난관이 닥쳐도 피하지 않고 정면으로 돌파하는 용기를 가지고 있군요.",
    advice: "가끔은 주변을 돌아보며 쉼표를 찍는 여유도 필요합니다.",
    color: "text-orange-400",
    emoji: "🦁"
  },
  Artist: {
    testType: "forest",
    type: "Artist",
    name: "자유로운 고양이",
    tags: ["#개성", "#독립적", "#예술적"],
    description: "당신은 자신만의 세계가 확고하고 독창적인 사람입니다. 남들의 시선보다는 자신의 만족과 감정을 더 중요하게 생각하는군요.",
    advice: "타인과의 소통을 조금만 더 늘린다면 당신의 매력이 더 빛날 거예요.",
    color: "text-purple-400",
    emoji: "🐱"
  },
  Healer: {
    testType: "forest",
    type: "Healer",
    name: "따뜻한 강아지",
    tags: ["#공감", "#배려", "#평화"],
    description: "당신은 타인의 감정을 잘 이해하고 배려하는 따뜻한 마음씨를 가졌습니다. 갈등보다는 조화를 추구하는 평화주의자시네요.",
    advice: "남을 챙기는 만큼 자기 자신을 돌보는 시간도 꼭 가지세요.",
    color: "text-pink-400",
    emoji: "🐶"
  },
  Thinker: {
    testType: "forest",
    type: "Thinker",
    name: "지혜로운 부엉이",
    tags: ["#신중", "#통찰력", "#분석"],
    description: "당신은 상황을 깊이 관찰하고 신중하게 판단하는 현명한 사람입니다. 겉으로 드러내지 않아도 속으로는 모든 것을 파악하고 있군요.",
    advice: "생각이 너무 많아지면 행동이 늦어질 수 있으니 주의하세요.",
    color: "text-blue-400",
    emoji: "🦉"
  }
};

// 무인도 심리테스트 질문 (물건 선택)
export const ISLAND_ITEMS = [
  { id: "water", name: "생수", emoji: "💧", category: "survival" },
  { id: "knife", name: "칼", emoji: "🔪", category: "tool" },
  { id: "rope", name: "로프", emoji: "🪢", category: "tool" },
  { id: "mirror", name: "거울", emoji: "🪞", category: "signal" },
  { id: "compass", name: "나침반", emoji: "🧭", category: "navigation" },
  { id: "flashlight", name: "손전등", emoji: "🔦", category: "tool" },
  { id: "book", name: "책", emoji: "📖", category: "mental" },
  { id: "radio", name: "무전기", emoji: "📻", category: "signal" },
  { id: "tent", name: "텐트", emoji: "⛺", category: "survival" },
  { id: "medicine", name: "구급약", emoji: "💊", category: "survival" },
  { id: "map", name: "지도", emoji: "🗺️", category: "navigation" },
  { id: "food", name: "식량", emoji: "🍖", category: "survival" },
];

// 무인도 심리테스트 결과
export const ISLAND_RESULTS: Record<string, PsychResultType> = {
  Survivalist: {
    testType: "island",
    type: "Survivalist",
    name: "생존 전문가",
    tags: ["#실용적", "#현실적", "#생존력"],
    description: "당신은 생존에 필수적인 물건들을 우선적으로 선택하는 현실적이고 실용적인 사람입니다. 위기 상황에서도 침착하게 대처할 수 있는 능력을 가지고 있습니다.",
    advice: "생존에 집중하는 것도 좋지만, 때로는 여유와 낙관도 필요합니다.",
    color: "text-orange-500",
    emoji: "🏕️"
  },
  Strategist: {
    testType: "island",
    type: "Strategist",
    name: "전략가",
    tags: ["#계획적", "#분석적", "#체계적"],
    description: "당신은 구조나 탈출을 위한 도구들을 선택하는 전략적 사고를 가진 사람입니다. 상황을 분석하고 체계적으로 해결책을 찾는 능력이 뛰어납니다.",
    advice: "계획이 완벽하지 않아도 일단 시작하는 용기가 필요할 때가 있습니다.",
    color: "text-blue-500",
    emoji: "🧭"
  },
  Optimist: {
    testType: "island",
    type: "Optimist",
    name: "낙천주의자",
    tags: ["#긍정적", "#여유", "#낙관적"],
    description: "당신은 정신적 위안이나 여가를 위한 물건들을 선택하는 낙천적인 사람입니다. 어려운 상황에서도 긍정적인 마인드를 유지할 수 있는 힘이 있습니다.",
    advice: "긍정적인 마인드는 좋지만, 현실적인 준비도 함께 하면 더 좋습니다.",
    color: "text-yellow-500",
    emoji: "☀️"
  },
  Balanced: {
    testType: "island",
    type: "Balanced",
    name: "균형잡힌 사람",
    tags: ["#균형", "#다양성", "#융통성"],
    description: "당신은 생존, 구조, 정신적 위안을 모두 고려하여 균형잡힌 선택을 하는 사람입니다. 다양한 상황에 유연하게 대응할 수 있는 능력을 가지고 있습니다.",
    advice: "균형은 좋지만, 때로는 한 가지에 집중하는 것도 필요합니다.",
    color: "text-green-500",
    emoji: "⚖️"
  }
};

// 연애 MBTI 심리테스트 질문
export const LOVE_QUESTIONS: PsychQuestion[] = [
  {
    id: 1,
    text: "첫 데이트 중 갑자기 비가 왔다. 당신의 반응은?",
    options: [
      { text: "우산을 사러 가거나 카페로 들어간다 ☂️", type: "P" },
      { text: "미리 확인한 실내 장소로 이동한다 📍", type: "J" }
    ]
  },
  {
    id: 2,
    text: "데이트 중 상대방이 늦었다. 30분 후 당신은?",
    options: [
      { text: "연락을 해서 상황을 확인한다 📱", type: "E" },
      { text: "조용히 기다리며 혼자 시간을 보낸다 ⏰", type: "I" }
    ]
  },
  {
    id: 3,
    text: "데이트 장소를 정할 때 당신은?",
    options: [
      { text: "새롭고 특별한 곳을 제안한다 ✨", type: "N" },
      { text: "검증된 맛집이나 안전한 곳을 선택한다 🍽️", type: "S" }
    ]
  },
  {
    id: 4,
    text: "데이트 중 대화가 끊겼을 때 당신은?",
    options: [
      { text: "새로운 주제를 찾아 대화를 이어간다 💬", type: "E" },
      { text: "편안한 침묵을 즐긴다 🤫", type: "I" }
    ]
  },
  {
    id: 5,
    text: "상대방이 예상치 못한 선물을 줬다. 당신은?",
    options: [
      { text: "즉시 기뻐하며 감사를 표현한다 🎁", type: "F" },
      { text: "선물의 의미를 생각해보며 반응한다 🤔", type: "T" }
    ]
  },
  {
    id: 6,
    text: "데이트 계획이 갑자기 바뀌었다. 당신은?",
    options: [
      { text: "즉흥적으로 새로운 계획을 세운다 🎲", type: "P" },
      { text: "약간 당황하지만 대안을 찾는다 📋", type: "J" }
    ]
  },
  {
    id: 7,
    text: "상대방과 의견이 다를 때 당신은?",
    options: [
      { text: "감정을 고려하며 부드럽게 설득한다 💕", type: "F" },
      { text: "논리적으로 이유를 설명한다 📊", type: "T" }
    ]
  },
  {
    id: 8,
    text: "이상적인 데이트는?",
    options: [
      { text: "계획된 완벽한 하루 📅", type: "J" },
      { text: "즉흥적이고 자유로운 하루 🎈", type: "P" }
    ]
  }
];

// 연애 MBTI 심리테스트 결과
export const LOVE_RESULTS: Record<string, PsychResultType> = {
  ENFP: {
    testType: "love",
    type: "ENFP",
    name: "열정적인 연애인",
    tags: ["#열정", "#즉흥", "#로맨틱"],
    description: "당신은 연애에서 자유롭고 열정적인 스타일입니다. 계획보다는 즉흥적인 데이트를 즐기며, 상대방과의 감정적 교감을 중시합니다.",
    advice: "때로는 계획된 데이트도 로맨틱할 수 있답니다. 균형을 찾아보세요.",
    color: "text-pink-500",
    emoji: "💖"
  },
  INTJ: {
    testType: "love",
    type: "INTJ",
    name: "전략적 연애인",
    tags: ["#계획적", "#신중", "#논리적"],
    description: "당신은 연애에서도 계획적이고 신중한 스타일입니다. 감정보다는 논리적으로 관계를 분석하며, 완벽한 데이트를 준비하는 것을 좋아합니다.",
    advice: "가끔은 계획을 버리고 순간의 감정에 맡겨보세요. 새로운 발견이 있을 거예요.",
    color: "text-indigo-500",
    emoji: "🎯"
  },
  ESFJ: {
    testType: "love",
    type: "ESFJ",
    name: "배려심 많은 연애인",
    tags: ["#배려", "#안정", "#소통"],
    description: "당신은 상대방을 배려하고 안정적인 관계를 추구하는 스타일입니다. 감정적 소통을 중시하며, 상대방의 기분을 잘 살핍니다.",
    advice: "상대방을 배려하는 것도 좋지만, 자신의 감정도 솔직하게 표현해보세요.",
    color: "text-rose-500",
    emoji: "🌹"
  },
  ISTP: {
    testType: "love",
    type: "ISTP",
    name: "자유로운 연애인",
    tags: ["#독립", "#실용", "#여유"],
    description: "당신은 연애에서도 독립적이고 실용적인 스타일입니다. 과한 계획보다는 자연스러운 흐름을 좋아하며, 상대방과의 여유로운 시간을 즐깁니다.",
    advice: "가끔은 상대방을 위한 작은 계획도 로맨틱할 수 있습니다.",
    color: "text-cyan-500",
    emoji: "🌊"
  }
};

// 숲속 심리테스트 분석
export const calculateForest = (answers: Record<string, string>): PsychResultType => {
  let scoreA = 0;
  Object.values(answers).forEach(val => {
    if (val === 'A') scoreA++;
  });
  
  if (scoreA >= 6) return FOREST_RESULTS['Leader'];
  if (scoreA >= 4) return FOREST_RESULTS['Healer'];
  if (scoreA >= 2) return FOREST_RESULTS['Artist'];
  return FOREST_RESULTS['Thinker'];
};

// 무인도 심리테스트 분석 (선택한 물건 3개 기반)
export const calculateIsland = (selectedItems: string[]): PsychResultType => {
  const categories = selectedItems.map(itemId => {
    const item = ISLAND_ITEMS.find(i => i.id === itemId);
    return item?.category || "unknown";
  });
  
  const survivalCount = categories.filter(c => c === "survival").length;
  const signalCount = categories.filter(c => c === "signal" || c === "navigation").length;
  const mentalCount = categories.filter(c => c === "mental").length;
  
  if (survivalCount >= 2) return ISLAND_RESULTS['Survivalist'];
  if (signalCount >= 2) return ISLAND_RESULTS['Strategist'];
  if (mentalCount >= 1 && survivalCount >= 1) return ISLAND_RESULTS['Optimist'];
  return ISLAND_RESULTS['Balanced'];
};

// 연애 MBTI 심리테스트 분석
export const calculateLove = (answers: Record<string, string>): PsychResultType => {
  let E = 0, I = 0, N = 0, S = 0, F = 0, T = 0, P = 0, J = 0;
  
  Object.values(answers).forEach(val => {
    if (val === 'E') E++;
    if (val === 'I') I++;
    if (val === 'N') N++;
    if (val === 'S') S++;
    if (val === 'F') F++;
    if (val === 'T') T++;
    if (val === 'P') P++;
    if (val === 'J') J++;
  });
  
  // 간단한 MBTI 조합 (실제로는 더 복잡한 로직 필요)
  const type = `${E >= I ? 'E' : 'I'}${N >= S ? 'N' : 'S'}${F >= T ? 'F' : 'T'}${P >= J ? 'P' : 'J'}`;
  
  // 4가지 타입만 반환 (실제로는 16가지 가능)
  if (type.startsWith('EN')) return LOVE_RESULTS['ENFP'];
  if (type.startsWith('IN') && type.includes('T')) return LOVE_RESULTS['INTJ'];
  if (type.startsWith('ES') && type.includes('F')) return LOVE_RESULTS['ESFJ'];
  return LOVE_RESULTS['ISTP'];
};

// 레거시 호환성 (기존 코드용)
export const PSYCH_QUESTIONS = FOREST_QUESTIONS;
export const PSYCH_RESULTS = FOREST_RESULTS;
export const calculatePsychology = calculateForest;

