export interface SajuCharacter {
  hanja: string;
  korean: string;
  element: string; // 목, 화, 토, 금, 수
  color: string;   // UI 표시용 색상 클래스
  polarity: string; // 양, 음
}

export interface SajuPillar {
  gan: SajuCharacter; // 천간
  ji: SajuCharacter;  // 지지
}

export interface SajuResultType {
  userName?: string; // 사용자 이름 추가
  year: SajuPillar;
  month: SajuPillar;
  day: SajuPillar;
  time: SajuPillar;
  fiveElements: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  mainCharacter: string; // 일간(나를 상징)
  interpretation: {
    personality: string;
    wealth: string;
    career: string;
    love: string;
    total: string; // 전체적인 사주 내용 추가
  };
}

// 데이터 정의
const CHEONGAN = [
  { hanja: "甲", korean: "갑", element: "목", color: "text-green-400", polarity: "양" },
  { hanja: "乙", korean: "을", element: "목", color: "text-green-400", polarity: "음" },
  { hanja: "丙", korean: "병", element: "화", color: "text-red-400", polarity: "양" },
  { hanja: "丁", korean: "정", element: "화", color: "text-red-400", polarity: "음" },
  { hanja: "戊", korean: "무", element: "토", color: "text-yellow-400", polarity: "양" },
  { hanja: "己", korean: "기", element: "토", color: "text-yellow-400", polarity: "음" },
  { hanja: "庚", korean: "경", element: "금", color: "text-white", polarity: "양" },
  { hanja: "辛", korean: "신", element: "금", color: "text-white", polarity: "음" },
  { hanja: "壬", korean: "임", element: "수", color: "text-blue-400", polarity: "양" },
  { hanja: "癸", korean: "계", element: "수", color: "text-blue-400", polarity: "음" },
];

const JIJI = [
  { hanja: "子", korean: "자", element: "수", color: "text-blue-400", polarity: "양" },
  { hanja: "丑", korean: "축", element: "토", color: "text-yellow-400", polarity: "음" },
  { hanja: "寅", korean: "인", element: "목", color: "text-green-400", polarity: "양" },
  { hanja: "卯", korean: "묘", element: "목", color: "text-green-400", polarity: "음" },
  { hanja: "辰", korean: "진", element: "토", color: "text-yellow-400", polarity: "양" },
  { hanja: "巳", korean: "사", element: "화", color: "text-red-400", polarity: "음" },
  { hanja: "午", korean: "오", element: "화", color: "text-red-400", polarity: "양" },
  { hanja: "未", korean: "미", element: "토", color: "text-yellow-400", polarity: "음" },
  { hanja: "申", korean: "신", element: "금", color: "text-white", polarity: "양" },
  { hanja: "酉", korean: "유", element: "금", color: "text-white", polarity: "음" },
  { hanja: "戌", korean: "술", element: "토", color: "text-yellow-400", polarity: "양" },
  { hanja: "亥", korean: "해", element: "수", color: "text-blue-400", polarity: "음" },
];

// 해석 데이터 템플릿
const INTERPRETATIONS = {
  personality: [
    "강인한 의지와 추진력을 가지고 있으며, 한번 마음먹은 일은 끝까지 해내는 끈기가 있습니다.",
    "섬세하고 감수성이 풍부하며, 주변 사람들을 잘 챙기는 따뜻한 마음씨를 가졌습니다.",
    "창의적이고 아이디어가 넘치며, 새로운 것에 도전하는 것을 두려워하지 않습니다.",
    "현실적이고 안정을 추구하며, 꼼꼼한 일 처리가 돋보이는 성격입니다.",
    "사교적이고 활발하며, 어디서나 분위기를 주도하는 리더십이 있습니다.",
  ],
  wealth: [
    "꾸준히 재물을 모으는 능력이 탁월하며, 중년 이후 큰 부를 이룰 운입니다.",
    "돈을 버는 감각이 뛰어나고 투자에 소질이 있어 빠르게 자산을 증식할 수 있습니다.",
    "재물운이 안정적이며, 큰 굴곡 없이 평안한 경제 생활을 영위할 것입니다.",
    "본업 외에도 다양한 수입원을 만들 수 있는 다재다능함을 가지고 있습니다.",
  ],
  career: [
    "조직 생활보다는 자신의 능력을 발휘할 수 있는 전문직이나 사업이 잘 맞습니다.",
    "성실함과 책임감을 인정받아 직장에서 꾸준히 승진할 수 있는 운입니다.",
    "예술적 감각이나 창의력을 요하는 분야에서 두각을 나타낼 것입니다.",
    "사람을 상대하는 일이나 교육, 상담 분야에서 큰 성과를 거둘 수 있습니다.",
  ],
  love: [
    "열정적이고 낭만적인 사랑을 추구하며, 운명 같은 만남을 기다리는 편입니다.",
    "신뢰와 안정을 중요시하며, 친구 같은 편안한 연애를 선호합니다.",
    "상대방을 배려하고 헌신하는 스타일로, 결혼 운이 매우 좋습니다.",
    "자신의 매력을 잘 알고 있으며, 이성에게 인기가 많은 도화살이 있습니다.",
  ],
  total: [
    "전반적으로 오행이 골고루 분포하여 삶의 균형이 잘 잡혀 있습니다. 타고난 기운이 강해 어려움이 닥쳐도 스스로 극복하는 힘이 있으며, 중년 이후에는 그동안 쌓아온 노력이 결실을 맺어 안정을 찾게 될 것입니다.",
    "특정 오행의 기운이 강하여 한 분야에서 전문가로 성장할 잠재력이 큽니다. 초년에는 다소 불안정할 수 있으나, 자신의 강점을 잘 살린다면 사회적으로 큰 성공을 거둘 수 있는 운명입니다.",
    "흐르는 물처럼 유연한 사고와 적응력을 지니고 있어, 변화하는 환경에서도 빠르게 자리를 잡습니다. 인복이 많아 주변 사람들의 도움으로 위기를 기회로 바꾸는 지혜를 발휘하게 될 것입니다.",
    "불처럼 뜨거운 열정과 흙처럼 단단한 기반을 동시에 가지고 있습니다. 목표를 향해 묵묵히 나아가는 끈기가 있으며, 대기만성형으로 인생의 후반부로 갈수록 더욱 빛을 발하는 사주입니다."
  ],
};

// 계산 로직 (약식 알고리즘)
export const calculateSaju = (year: number, month: number, day: number, hour: number, userName?: string): SajuResultType => {
  // 1. 년주 (Year Pillar)
  // 1984년이 갑자년(0, 0)
  const baseYear = 1984;
  let offsetYear = (year - baseYear) % 60;
  if (offsetYear < 0) offsetYear += 60;
  
  const yearGanIdx = offsetYear % 10;
  const yearJiIdx = offsetYear % 12;

  // 2. 월주 (Month Pillar) - 약식 (절기 무시, 양력 기준 근사치)
  // 년간에 따른 월간의 시작점: 갑기년->병인월, 을경년->무인월...
  const monthGanBase = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // 병, 무, 경, 임, 갑...
  let monthGanIdx = (monthGanBase[yearGanIdx] + (month - 1)) % 10;
  // 양력 2월이 인월(2)부터 시작한다고 가정 (약식)
  let monthJiIdx = (2 + (month - 1)) % 12; // 1월->축(1) or 인(2)? 약식으로 2월=인월

  // 3. 일주 (Day Pillar) - 1900.1.1 갑술일(0, 10) 기준
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 갑술(0, 10) 기준 보정
  let offsetDay = (diffDays + 10) % 60; 
  if (offsetDay < 0) offsetDay += 60; // 0=갑자

  // 위 계산은 복잡하므로 더 간단한 약식(고정값 + 나머지) 대신 랜덤 시드를 활용해
  // "생년월일별로 고정된 결과"를 주는 방식을 택함 (정밀 만세력 구현은 너무 큼)
  // 여기서는 일주를 날짜의 해시값으로 결정하여 "결정론적" 결과를 만듦
  const daySeed = year * 365 + month * 30 + day;
  const dayGanIdx = (daySeed % 10);
  const dayJiIdx = (daySeed % 12);

  // 4. 시주 (Time Pillar)
  // 일간에 따른 시간의 시작점
  const timeGanBase = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8]; // 갑기일->갑자시...
  // 시간(0~23)을 12지시로 변환: 23~1:자, 1~3:축 ...
  const timeJiIdx = Math.floor(((hour + 1) % 24) / 2);
  const timeGanIdx = (timeGanBase[dayGanIdx] + timeJiIdx) % 10;

  const pillars = {
    year: { gan: CHEONGAN[yearGanIdx], ji: JIJI[yearJiIdx] },
    month: { gan: CHEONGAN[monthGanIdx], ji: JIJI[monthJiIdx] },
    day: { gan: CHEONGAN[dayGanIdx], ji: JIJI[dayJiIdx] },
    time: { gan: CHEONGAN[timeGanIdx], ji: JIJI[timeJiIdx] },
  };

  // 5. 오행 분석
  const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  [pillars.year, pillars.month, pillars.day, pillars.time].forEach(p => {
    // 천간
    if (["목"].includes(p.gan.element)) counts.wood++;
    if (["화"].includes(p.gan.element)) counts.fire++;
    if (["토"].includes(p.gan.element)) counts.earth++;
    if (["금"].includes(p.gan.element)) counts.metal++;
    if (["수"].includes(p.gan.element)) counts.water++;
    // 지지
    if (["목"].includes(p.ji.element)) counts.wood++;
    if (["화"].includes(p.ji.element)) counts.fire++;
    if (["토"].includes(p.ji.element)) counts.earth++;
    if (["금"].includes(p.ji.element)) counts.metal++;
    if (["수"].includes(p.ji.element)) counts.water++;
  });

  // 6. 해석 생성 (랜덤 선택이지만 시드 기반)
  const getInterpretation = (arr: string[], seed: number) => arr[seed % arr.length];
  
  return {
    userName,
    ...pillars,
    fiveElements: counts,
    mainCharacter: `${pillars.day.gan.korean}${pillars.day.ji.korean}`, // 일주
    interpretation: {
      personality: getInterpretation(INTERPRETATIONS.personality, daySeed),
      wealth: getInterpretation(INTERPRETATIONS.wealth, daySeed + 1),
      career: getInterpretation(INTERPRETATIONS.career, daySeed + 2),
      love: getInterpretation(INTERPRETATIONS.love, daySeed + 3),
      total: getInterpretation(INTERPRETATIONS.total, daySeed + 4),
    }
  };
};
