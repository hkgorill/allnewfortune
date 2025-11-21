export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  options: [
    { text: string; value: string }, // value: 'E', 'I', etc.
    { text: string; value: string }
  ];
}

export interface MbtiResultType {
  type: string;
  title: string;
  description: string;
  traits: string[];
  bestMatch: string;
  worstMatch: string;
  color: string;
}

export const MBTI_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "주말이 다가왔다! 당신의 계획은?",
    dimension: "EI",
    options: [
      { text: "친구들과 만나서 신나게 놀아야지! 🎉", value: "E" },
      { text: "집에서 넷플릭스 보며 힐링할래 🏠", value: "I" },
    ],
  },
  {
    id: 2,
    text: "새로운 사람들을 만나는 자리에서 나는?",
    dimension: "EI",
    options: [
      { text: "먼저 말 걸고 분위기를 주도한다 😎", value: "E" },
      { text: "누가 말 걸어주길 기다리며 눈치 본다 😳", value: "I" },
    ],
  },
  {
    id: 3,
    text: "여행 계획을 짤 때 나는?",
    dimension: "JP",
    options: [
      { text: "분 단위로 엑셀 파일 정리 완료! 📅", value: "J" },
      { text: "일단 비행기 표만 끊자! 나머지는 가서 생각! ✈️", value: "P" },
    ],
  },
  {
    id: 4,
    text: "친구가 고민을 털어놓을 때 나는?",
    dimension: "TF",
    options: [
      { text: "해결책이 뭔지 분석해서 알려준다 💡", value: "T" },
      { text: "일단 친구의 감정에 공감하고 위로한다 ❤️", value: "F" },
    ],
  },
  {
    id: 5,
    text: "영화를 볼 때 더 중요하게 생각하는 것은?",
    dimension: "SN",
    options: [
      { text: "현실적인 스토리와 개연성 🎬", value: "S" },
      { text: "상상력을 자극하는 독특한 세계관 🦄", value: "N" },
    ],
  },
  {
    id: 6,
    text: "멍 때릴 때 주로 하는 생각은?",
    dimension: "SN",
    options: [
      { text: "오늘 저녁 뭐 먹지? (현실적) 🍕", value: "S" },
      { text: "좀비가 나타나면 어디로 도망가지? (상상) 🧟", value: "N" },
    ],
  },
  {
    id: 7,
    text: "화가 났을 때 나는?",
    dimension: "TF",
    options: [
      { text: "왜 화가 났는지 논리적으로 따진다 🗣️", value: "T" },
      { text: "눈물부터 나거나 말이 안 나온다 😢", value: "F" },
    ],
  },
  {
    id: 8,
    text: "일할 때 선호하는 방식은?",
    dimension: "JP",
    options: [
      { text: "미리미리 계획대로 착착! ✅", value: "J" },
      { text: "마감 직전에 초인적인 힘 발휘! 🔥", value: "P" },
    ],
  },
  {
    id: 9,
    text: "파티에서 나는?",
    dimension: "EI",
    options: [
      { text: "무대 중앙에서 춤추고 있다 💃", value: "E" },
      { text: "구석에서 고양이랑 놀고 있다 🐱", value: "I" },
    ],
  },
  {
    id: 10,
    text: "사과를 보면 드는 생각은?",
    dimension: "SN",
    options: [
      { text: "빨갛다, 맛잇겠다, 둥글다 🍎", value: "S" },
      { text: "백설공주? 뉴턴? 애플? 🍏", value: "N" },
    ],
  },
  {
    id: 11,
    text: "친구가 약속 시간에 늦었을 때?",
    dimension: "TF",
    options: [
      { text: "왜 늦었는지 이유를 묻는다 🤔", value: "T" },
      { text: "오느라 힘들었겠다고 걱정한다 😥", value: "F" },
    ],
  },
  {
    id: 12,
    text: "책상 정리 상태는?",
    dimension: "JP",
    options: [
      { text: "각 잡혀서 깔끔하게 정리됨 📚", value: "J" },
      { text: "어디에 뭐가 있는지는 나만 암 🌪️", value: "P" },
    ],
  },
];

export const MBTI_RESULTS: Record<string, MbtiResultType> = {
  ISTJ: {
    type: "ISTJ",
    title: "청렴결백한 논리주의자",
    description: "한 번 시작한 일은 끝까지 해내는 책임감의 제왕이에요. 현실적이고 진지하며, 약속 어기는 걸 정말 싫어해요.",
    traits: ["#철두철미", "#계획형", "#현실주의"],
    bestMatch: "ESFP",
    worstMatch: "ENFP",
    color: "text-blue-300",
  },
  ISFJ: {
    type: "ISFJ",
    title: "용감한 수호자",
    description: "조용하고 차분하지만 내 사람에게는 따뜻한 헌신적인 스타일! 섬세하고 인내심이 강해요.",
    traits: ["#배려왕", "#인내심", "#가정적"],
    bestMatch: "ESFP",
    worstMatch: "ENTP",
    color: "text-cyan-300",
  },
  INFJ: {
    type: "INFJ",
    title: "선의의 옹호자",
    description: "사람에 대한 통찰력이 뛰어나고 영감이 넘쳐요. 조용해 보이지만 속엔 뜨거운 열정이 있어요.",
    traits: ["#통찰력", "#신비주의", "#이상주의"],
    bestMatch: "ENFP",
    worstMatch: "ESTP",
    color: "text-green-300",
  },
  INTJ: {
    type: "INTJ",
    title: "용의주도한 전략가",
    description: "전체적인 판을 읽는 능력이 뛰어나요. 상상력이 풍부하고 철두철미한 계획을 세우는 완벽주의자!",
    traits: ["#전략가", "#독립적", "#논리왕"],
    bestMatch: "ENFP",
    worstMatch: "ESFP",
    color: "text-purple-300",
  },
  ISTP: {
    type: "ISTP",
    title: "만능 재주꾼",
    description: "과묵하지만 호기심이 많고 손재주가 좋아요. 상황 적응력이 뛰어나고 쿨한 매력의 소유자!",
    traits: ["#마이웨이", "#손재주", "#효율성"],
    bestMatch: "ESFJ",
    worstMatch: "ENFJ",
    color: "text-yellow-300",
  },
  ISFP: {
    type: "ISFP",
    title: "호기심 많은 예술가",
    description: "다정하고 온화하며 예술적인 감각이 있어요. 규칙보다는 자유를 사랑하는 평화주의자.",
    traits: ["#예술가", "#감성적", "#집돌이"],
    bestMatch: "ESTJ",
    worstMatch: "ENTJ",
    color: "text-amber-300",
  },
  INFP: {
    type: "INFP",
    title: "열정적인 중재자",
    description: "마음이 따뜻하고 낭만적이에요. 자신만의 세계가 확고하고 진정성을 중요하게 생각해요.",
    traits: ["#몽상가", "#감수성", "#평화"],
    bestMatch: "ENFJ",
    worstMatch: "ESTJ",
    color: "text-green-200",
  },
  INTP: {
    type: "INTP",
    title: "논리적인 사색가",
    description: "지적 호기심이 넘치고 분석적이에요. 남들이 생각하지 못한 기발한 아이디어를 잘 내요.",
    traits: ["#아이디어", "#분석적", "#개인주의"],
    bestMatch: "ENTJ",
    worstMatch: "ESFJ",
    color: "text-violet-300",
  },
  ESTP: {
    type: "ESTP",
    title: "모험을 즐기는 사업가",
    description: "에너지가 넘치고 직관적이에요. 스릴을 즐기며 문제 해결 능력이 뛰어난 행동파!",
    traits: ["#활동가", "#직설적", "#인싸"],
    bestMatch: "ISFJ",
    worstMatch: "INFJ",
    color: "text-orange-300",
  },
  ESFP: {
    type: "ESFP",
    title: "자유로운 영혼의 연예인",
    description: "어디서나 분위기 메이커! 사람들과 어울리는 것을 좋아하고 인생을 즐길 줄 알아요.",
    traits: ["#핵인싸", "#낙천적", "#사교왕"],
    bestMatch: "ISFJ",
    worstMatch: "INTJ",
    color: "text-rose-300",
  },
  ENFP: {
    type: "ENFP",
    title: "재기발랄한 활동가",
    description: "열정적이고 창의적이며 상상력이 풍부해요. 사람들을 기분 좋게 만드는 해피 바이러스!",
    traits: ["#스파크", "#열정", "#분위기메이커"],
    bestMatch: "INFJ",
    worstMatch: "ISTJ",
    color: "text-green-400",
  },
  ENTP: {
    type: "ENTP",
    title: "뜨거운 논쟁을 즐기는 변론가",
    description: "지적인 도전을 즐기고 똑똑해요. 새로운 아이디어가 끊임없이 샘솟는 발명가 타입.",
    traits: ["#토론왕", "#아이디어뱅크", "#자신감"],
    bestMatch: "INFJ",
    worstMatch: "ISFJ",
    color: "text-red-300",
  },
  ESTJ: {
    type: "ESTJ",
    title: "엄격한 관리자",
    description: "현실적이고 추진력이 강해요. 규칙과 질서를 중요시하며 리더십이 뛰어난 사업가 스타일.",
    traits: ["#리더십", "#책임감", "#현실적"],
    bestMatch: "ISFP",
    worstMatch: "INFP",
    color: "text-blue-400",
  },
  ESFJ: {
    type: "ESFJ",
    title: "사교적인 외교관",
    description: "동정심이 많고 사람들을 잘 챙겨요. 조화를 중요시하며 인기가 많은 스타일!",
    traits: ["#친목도모", "#공감왕", "#봉사"],
    bestMatch: "ISFP",
    worstMatch: "INTP",
    color: "text-cyan-400",
  },
  ENFJ: {
    type: "ENFJ",
    title: "정의로운 사회운동가",
    description: "카리스마와 충성심을 겸비한 리더! 사람들의 성장을 돕는 것을 보람으로 느껴요.",
    traits: ["#언변술사", "#이타적", "#리더"],
    bestMatch: "INFP",
    worstMatch: "ISTP",
    color: "text-emerald-400",
  },
  ENTJ: {
    type: "ENTJ",
    title: "대담한 통솔자",
    description: "철저한 준비와 결단력으로 목표를 달성해요. 비전을 제시하고 이끌어가는 타고난 리더.",
    traits: ["#야망", "#결단력", "#통솔력"],
    bestMatch: "INTP",
    worstMatch: "ISFP",
    color: "text-purple-400",
  },
};

export const calculateMbti = (answers: Record<string, string>): MbtiResultType => {
  let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;

  Object.values(answers).forEach((val) => {
    if (val === 'E') e++;
    if (val === 'I') i++;
    if (val === 'S') s++;
    if (val === 'N') n++;
    if (val === 'T') t++;
    if (val === 'F') f++;
    if (val === 'J') j++;
    if (val === 'P') p++;
  });

  const type = [
    e >= i ? 'E' : 'I',
    s >= n ? 'S' : 'N',
    t >= f ? 'T' : 'F',
    j >= p ? 'J' : 'P',
  ].join('');

  return MBTI_RESULTS[type] || MBTI_RESULTS['ISTJ'];
};

