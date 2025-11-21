export interface HoroscopeSign {
  id: string;
  name: string;
  dateRange: string;
  icon: string;
  element: string;
}

export interface HoroscopeResultType {
  sign: HoroscopeSign;
  date: string;
  overall: string;
  love: string;
  money: string;
  work: string;
  lucky_color: string;
  lucky_number: number;
  lucky_time: string;
}

export const HOROSCOPE_SIGNS: HoroscopeSign[] = [
  { id: "aries", name: "양자리", dateRange: "3.21 ~ 4.19", icon: "♈", element: "불" },
  { id: "taurus", name: "황소자리", dateRange: "4.20 ~ 5.20", icon: "♉", element: "땅" },
  { id: "gemini", name: "쌍둥이자리", dateRange: "5.21 ~ 6.21", icon: "♊", element: "공기" },
  { id: "cancer", name: "게자리", dateRange: "6.22 ~ 7.22", icon: "♋", element: "물" },
  { id: "leo", name: "사자자리", dateRange: "7.23 ~ 8.22", icon: "♌", element: "불" },
  { id: "virgo", name: "처녀자리", dateRange: "8.23 ~ 9.23", icon: "♍", element: "땅" },
  { id: "libra", name: "천칭자리", dateRange: "9.24 ~ 10.22", icon: "♎", element: "공기" },
  { id: "scorpio", name: "전갈자리", dateRange: "10.23 ~ 11.22", icon: "♏", element: "물" },
  { id: "sagittarius", name: "사수자리", dateRange: "11.23 ~ 12.24", icon: "♐", element: "불" },
  { id: "capricorn", name: "염소자리", dateRange: "12.25 ~ 1.19", icon: "♑", element: "땅" },
  { id: "aquarius", name: "물병자리", dateRange: "1.20 ~ 2.18", icon: "♒", element: "공기" },
  { id: "pisces", name: "물고기자리", dateRange: "2.19 ~ 3.20", icon: "♓", element: "물" },
];

const FORTUNE_TEXTS = {
  overall: [
    "오늘은 평소보다 에너지가 넘치는 날입니다. 새로운 일을 시작하기에 좋습니다.",
    "잠시 멈춰서 숨을 고르는 시간이 필요합니다. 무리하지 말고 휴식을 취하세요.",
    "예상치 못한 행운이 찾아올 수 있습니다. 주변을 잘 살펴보세요.",
    "작은 실수가 큰 문제로 이어질 수 있으니 꼼꼼하게 확인하는 것이 좋습니다.",
    "당신의 직관력이 빛을 발하는 날입니다. 느낌대로 행동해보세요.",
    "주변 사람들과의 협력이 중요한 날입니다. 혼자 해결하려 하지 마세요.",
  ],
  love: [
    "새로운 만남의 기회가 있습니다. 열린 마음으로 사람들을 대하세요.",
    "연인과의 사소한 다툼이 있을 수 있으니 말조심이 필요합니다.",
    "사랑하는 사람에게 진심을 전하기 좋은 날입니다. 용기를 내보세요.",
    "매력이 상승하는 날입니다. 자신감을 가지고 어필해보세요.",
    "오해로 인한 갈등이 생길 수 있습니다. 대화로 풀어가세요.",
  ],
  money: [
    "지출 관리에 신경 써야 할 때입니다. 충동구매를 자제하세요.",
    "뜻밖의 수입이 생길 수 있는 행운의 날입니다.",
    "투자에 신중해야 합니다. 전문가의 조언을 참고하세요.",
    "빌려줬던 돈을 받거나 잊고 있던 돈을 찾을 수 있습니다.",
    "미래를 위한 저축을 시작하기에 좋은 시기입니다.",
  ],
  work: [
    "업무 효율이 높아지는 날입니다. 미뤄뒀던 일을 처리하세요.",
    "동료와의 의견 차이가 있을 수 있습니다. 경청하는 태도가 필요합니다.",
    "새로운 아이디어가 떠오를 것입니다. 메모하는 습관을 가지세요.",
    "상사나 선배로부터 칭찬을 받을 수 있는 기회가 옵니다.",
    "집중력이 흐트러질 수 있으니 틈틈이 휴식을 취하세요.",
  ],
  colors: ["레드", "블루", "옐로우", "그린", "퍼플", "화이트", "블랙", "오렌지", "핑크", "네이비"],
  times: ["오전 9시", "오후 2시", "오후 7시", "밤 10시", "점심시간", "퇴근길"],
};

// 날짜 기반 난수 생성기 (Simple Linear Congruential Generator)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const getDailyHoroscope = (signId: string): HoroscopeResultType => {
  const sign = HOROSCOPE_SIGNS.find((s) => s.id === signId)!;
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
  
  // 시드 생성: 날짜 + 별자리 ID 문자열 합
  const seedStr = dateStr + signId;
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed += seedStr.charCodeAt(i);
  }

  const getRandomItem = (arr: any[], offset: number) => {
    const index = Math.floor(seededRandom(seed + offset) * arr.length);
    return arr[index];
  };

  return {
    sign,
    date: dateStr,
    overall: getRandomItem(FORTUNE_TEXTS.overall, 1),
    love: getRandomItem(FORTUNE_TEXTS.love, 2),
    money: getRandomItem(FORTUNE_TEXTS.money, 3),
    work: getRandomItem(FORTUNE_TEXTS.work, 4),
    lucky_color: getRandomItem(FORTUNE_TEXTS.colors, 5),
    lucky_number: Math.floor(seededRandom(seed + 6) * 99) + 1,
    lucky_time: getRandomItem(FORTUNE_TEXTS.times, 7),
  };
};

