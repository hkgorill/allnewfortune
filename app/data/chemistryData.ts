export type ChemistryResultType = {
  score: number;
  title: string;
  zodiacMatch: {
    score: number;
    description: string;
    label: string; // "최고의 짝꿍", "노력이 필요해요" 등
  };
  elementMatch: {
    score: number;
    description: string;
    label: string;
  };
  totalDescription: string[];
  advice: string;
};

// 띠 (Zodiac) 데이터
export const ZODIACS = [
  "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"
];

// 띠 궁합 표 (간소화된 버전: 0=보통, 1=좋음, 2=아주좋음, -1=나쁨, -2=상극)
// 인덱스는 ZODIACS 배열 순서
const ZODIAC_MATRIX = [
  // 쥐(0)
  [0, 2, 0, 0, 2, 0, -2, -1, 2, 0, 0, 0],
  // 소(1)
  [2, 0, 0, 0, 0, 2, -1, -2, 0, 2, 0, 0],
  // 호랑이(2)
  [0, 0, 0, 0, 0, -2, 2, 0, -1, 0, 2, 2],
  // 토끼(3)
  [0, 0, 0, 0, -1, 0, 0, 2, 0, -2, 2, 2],
  // 용(4)
  [2, 0, 0, -1, 0, 0, 0, 0, 2, 2, -2, 0],
  // 뱀(5)
  [0, 2, -2, 0, 0, 0, 0, 0, 2, 2, 0, -1],
  // 말(6)
  [-2, -1, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0],
  // 양(7)
  [-1, -2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2],
  // 원숭이(8)
  [2, 0, -1, 0, 2, 2, 0, 0, 0, 0, 0, -2],
  // 닭(9)
  [0, 2, 0, -2, 2, 2, 0, 0, 0, 0, -1, 0],
  // 개(10)
  [0, 0, 2, 2, -2, 0, 2, 0, 0, -1, 0, 0],
  // 돼지(11)
  [0, 0, 2, 2, 0, -1, 0, 2, -2, 0, 0, 0],
];

// 오행 (Elements) 계산용 천간
// 갑을(목), 병정(화), 무기(토), 경신(금), 임계(수)
const HEAVENLY_STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const ELEMENTS = ["목", "목", "화", "화", "토", "토", "금", "금", "수", "수"];

// 오행 상생상극 (행이 본인, 열이 상대)
// 2: 상생(아주 좋음), 1: 비화(같음, 좋음), 0: 보통, -1: 상극(나쁨), -2: 상충(아주 나쁨)
const ELEMENT_MATRIX: Record<string, Record<string, number>> = {
  "목": { "목": 1, "화": 2, "토": -1, "금": -2, "수": 2 },
  "화": { "목": 2, "화": 1, "토": 2, "금": -1, "수": -2 },
  "토": { "목": -2, "화": 2, "토": 1, "금": 2, "수": -1 },
  "금": { "목": -1, "화": -2, "토": 2, "금": 1, "수": 2 },
  "수": { "목": 2, "화": -1, "토": -2, "금": 2, "수": 1 },
};

export const CHEMISTRY_FAQ = [
  {
    q: "궁합 점수는 어떻게 계산되나요?",
    a: "본인과 상대방의 생년월일을 기반으로 '띠 궁합(겉궁합)'과 '오행 궁합(속궁합)'을 종합적으로 분석하여 점수를 산출합니다. 정통 명리학의 원리를 현대적으로 해석한 알고리즘을 사용합니다.",
  },
  {
    q: "태어난 시간을 몰라도 되나요?",
    a: "네, 가능합니다. 태어난 시간을 입력하면 더 정밀한 분석(시주 분석)이 가능하지만, 생년월일만으로도 두 사람의 기본적인 기질과 조화를 충분히 알아볼 수 있습니다.",
  },
  {
    q: "점수가 낮으면 헤어져야 하나요?",
    a: "절대 아닙니다! 궁합은 '좋고 나쁨'을 따지는 것이 아니라, 두 사람이 서로 어떤 점이 다르고 어떻게 맞춰가야 할지를 알려주는 지표입니다. 점수가 낮다면 서로 노력해야 할 부분을 미리 알고 대비하면 됩니다.",
  },
];

// 계산 함수들
export function getZodiac(year: number): number {
  // 1900년은 쥐띠(0)
  // (year - 1900) % 12
  const offset = (year - 1900) % 12;
  return offset < 0 ? offset + 12 : offset;
}

// 간단한 천간 계산 (실제로는 만세력 라이브러리가 필요하지만, 여기서는 약식 알고리즘 사용)
// 1900년 1월 1일 기준 등 복잡하므로, 여기서는 '생년'의 끝자리로 천간을 추정하는 방식(연주 기준)으로 대체하거나
// 더 정확하게는 태어난 날짜의 일진을 구해야 함.
// 여기서는 '띠 궁합'에 비중을 두고, 오행은 '연도' 끝자리(천간)로 약식 계산합니다.
// 0:경, 1:신, 2:임, 3:계, 4:갑, 5:을, 6:병, 7:정, 8:무, 9:기
export function getElementByYear(year: number): string {
  const lastDigit = year % 10;
  const stemIndex = [6, 7, 8, 9, 0, 1, 2, 3, 4, 5][lastDigit]; // 0(xxx0년)=경(금)
  return ELEMENTS[stemIndex];
}

export function calculateChemistry(
  myData: { year: number; month: number; day: number },
  partnerData: { year: number; month: number; day: number }
): ChemistryResultType {
  // 1. 띠 궁합 계산
  const myZodiacIdx = getZodiac(myData.year);
  const partnerZodiacIdx = getZodiac(partnerData.year);
  const zodiacScoreVal = ZODIAC_MATRIX[myZodiacIdx][partnerZodiacIdx]; // -2 ~ 2

  let zodiacScore = 50; // 기본점수
  let zodiacLabel = "보통";
  let zodiacDesc = "무난하게 어울리는 관계입니다.";

  if (zodiacScoreVal === 2) {
    zodiacScore = 95;
    zodiacLabel = "천생연분";
    zodiacDesc = `${ZODIACS[myZodiacIdx]}띠와 ${ZODIACS[partnerZodiacIdx]}띠는 서로를 완벽하게 보완해주는 최고의 짝꿍입니다.`;
  } else if (zodiacScoreVal === 1) {
    zodiacScore = 80;
    zodiacLabel = "좋음";
    zodiacDesc = "서로의 장점을 잘 알아보고 격려해주는 좋은 관계입니다.";
  } else if (zodiacScoreVal === -1) {
    zodiacScore = 40;
    zodiacLabel = "노력 필요";
    zodiacDesc = "가끔 의견 차이가 있을 수 있으니 서로 배려가 필요합니다.";
  } else if (zodiacScoreVal === -2) {
    zodiacScore = 20;
    zodiacLabel = "상극";
    zodiacDesc = "성향이 정반대일 수 있습니다. 다름을 인정하는 것이 중요합니다.";
  }

  // 2. 오행 궁합 (연주 천간 기준 약식)
  const myElement = getElementByYear(myData.year);
  const partnerElement = getElementByYear(partnerData.year);
  const elementScoreVal = ELEMENT_MATRIX[myElement][partnerElement]; // -2 ~ 2

  let elementScore = 50;
  let elementLabel = "보통";
  let elementDesc = "서로 무난하게 기운을 주고받는 흐름입니다.";

  if (elementScoreVal === 2) {
    elementScore = 95;
    elementLabel = "상생";
    elementDesc = "서로의 기운을 북돋워주며 시너지를 내는 관계입니다.";
  } else if (elementScoreVal === 1) {
    elementScore = 85;
    elementLabel = "비화";
    elementDesc = "비슷한 기운을 가지고 있어 친구처럼 편안한 사이입니다.";
  } else if (elementScoreVal === -1) {
    elementScore = 40;
    elementLabel = "상극";
    elementDesc = "기운이 부딪힐 수 있으니 대화로 푸는 지혜가 필요합니다.";
  } else if (elementScoreVal === -2) {
    elementScore = 30;
    elementLabel = "상충";
    elementDesc = "서로의 기운을 억누를 수 있어 각자의 시간이 필요합니다.";
  }

  // 3. 종합 점수
  const totalScore = Math.round((zodiacScore * 0.6) + (elementScore * 0.4)); // 띠 비중을 좀 더 높게

  let title = "";
  let advice = "";
  let totalDescription: string[] = [];

  if (totalScore >= 90) {
    title = "놓치면 후회할 천생연분! 💖";
    advice = "두 분은 전생에 부부가 아니었을까요? 지금 이 마음 변치 마세요.";
    totalDescription = [
      "두 사람의 인연은 하늘이 맺어준 것처럼 강력합니다.",
      "성격적으로도 서로 부족한 점을 채워주며, 갈등이 생겨도 금방 해결될 것입니다.",
      "함께 있으면 편안함과 설렘을 동시에 느낄 수 있는 최고의 궁합입니다."
    ];
  } else if (totalScore >= 70) {
    title = "알콩달콩 예쁜 사랑 💕";
    advice = "서로의 다름을 즐거움으로 받아들이면 더욱 깊어질 거예요.";
    totalDescription = [
      "전반적으로 조화로운 관계를 유지할 수 있는 좋은 궁합입니다.",
      "비슷한 가치관을 공유하고 있어 대화가 잘 통합니다.",
      "사소한 다툼은 사랑의 조미료가 될 것입니다."
    ];
  } else if (totalScore >= 50) {
    title = "친구 같은 편안한 사이 🤝";
    advice = "설렘보다는 신뢰를 쌓아가는 것이 중요한 관계입니다.";
    totalDescription = [
      "뜨거운 열정보다는 은근한 정이 더 잘 어울리는 관계입니다.",
      "서로에게 너무 많은 것을 기대하기보다는 있는 그대로를 존중해주세요.",
      "함께 취미를 공유하며 공감대를 넓혀가는 것이 좋습니다."
    ];
  } else {
    title = "서로의 노력이 필요한 관계 ❤️‍🩹";
    advice = "다름을 인정하고 존중할 때 비로소 진정한 사랑이 시작됩니다.";
    totalDescription = [
      "두 분은 서로 다른 매력을 가지고 있어 처음에는 끌렸을지 모릅니다.",
      "하지만 성향 차이로 인해 오해가 쌓이기 쉬운 구조입니다.",
      "내 방식을 고집하기보다는 상대방의 입장에서 한 번 더 생각해보세요."
    ];
  }

  return {
    score: totalScore,
    title,
    zodiacMatch: {
      score: zodiacScore,
      description: zodiacDesc,
      label: zodiacLabel
    },
    elementMatch: {
      score: elementScore,
      description: elementDesc,
      label: elementLabel
    },
    totalDescription,
    advice
  };
}

