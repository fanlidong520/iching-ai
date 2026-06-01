// BaZi (八字) - Four Pillars of Destiny calculation
// Converts birth date/time into Year/Month/Day/Hour pillars
// Each pillar = Heavenly Stem + Earthly Branch

// 10 Heavenly Stems (天干)
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const STEMS_EN = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui']
const STEMS_ELEMENTS = ['Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth', 'Metal', 'Metal', 'Water', 'Water']

// 12 Earthly Branches (地支)
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const BRANCHES_EN = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai']
const BRANCHES_ELEMENTS = ['Water', 'Earth', 'Wood', 'Wood', 'Earth', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal', 'Earth', 'Water']
const BRANCHES_ANIMALS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']

// Solar terms (节气) — approximate dates for month pillar boundaries
// Month pillar changes at these solar terms, NOT at lunar month boundaries
const SOLAR_TERM_DAYS = [
  0,   // (before Feb 4 = previous year's 12th month)
  4,   // Feb 4  — 立春 (Start of Spring) → Month 1 (寅)
  6,   // Mar 6  — 惊蛰 (Awakening of Insects) → Month 2 (卯)
  5,   // Apr 5  — 清明 (Clear and Bright) → Month 3 (辰)
  6,   // May 6  — 立夏 (Start of Summer) → Month 4 (巳)
  6,   // Jun 6  — 芒种 (Grain in Ear) → Month 5 (午)
  7,   // Jul 7  — 小暑 (Minor Heat) → Month 6 (未)
  8,   // Aug 8  — 立秋 (Start of Autumn) → Month 7 (申)
  8,   // Sep 8  — 白露 (White Dew) → Month 8 (酉)
  8,   // Oct 8  — 寒露 (Cold Dew) → Month 9 (戌)
  8,   // Nov 8  — 立冬 (Start of Winter) → Month 10 (亥)
  7,   // Dec 7  — 大雪 (Major Snow) → Month 11 (子)
  6,   // Jan 6  — 小寒 (Minor Cold) → Month 12 (丑)
]

export interface Pillar {
  stem: string
  stemEn: string
  stemElement: string
  branch: string
  branchEn: string
  branchElement: string
  animal: string
}

export interface BaZiChart {
  yearPillar: Pillar
  monthPillar: Pillar
  dayPillar: Pillar
  hourPillar: Pillar
  fiveElements: Record<string, number>
}

// Calculate stem index from year
function yearStemIndex(year: number): number {
  return (year - 4) % 10
}

// Calculate branch index from year
function yearBranchIndex(year: number): number {
  return (year - 4) % 12
}

// Get month stem based on year stem (五虎遁 month stem rule)
function monthStemIndex(yearStemIdx: number, monthBranchIdx: number): number {
  // Month stem follows: yearStem determines the first month's stem
  // 甲己之年丙作首, 乙庚之年戊为头, 丙辛之年庚上起, 丁壬之年壬上起, 戊癸之年甲上起
  const firstMonthStemMap = [2, 4, 6, 8, 0] // map yearStemIdx to firstMonthStemIdx
  const base = firstMonthStemMap[Math.floor(yearStemIdx / 2)]
  return (base + monthBranchIdx - 2 + 10) % 10
}

// Determine month branch index from date (based on solar terms)
function monthBranchIndexFromDate(month: number, day: number): number {
  // month: 1-12 (January = 1)
  const thresholdDay = SOLAR_TERM_DAYS[month]
  if (day < thresholdDay) {
    // Before the solar term → previous month's branch
    const prevMonth = month - 1
    if (prevMonth === 0) return 12 // 丑 (previous year's 12th month)
    return prevMonth // The branch for the month before
  }
  // On or after the solar term → current month's branch
  // Month 1 (Feb 4+) = 寅 (branch index 2)
  return ((month + 1) % 12) || 12
}

// Julian Day Number calculation
function julianDay(year: number, month: number, day: number): number {
  let y = year, m = month
  if (m <= 2) { y -= 1; m += 12 }
  const a = Math.floor(y / 100)
  const b = 2 - a + Math.floor(a / 4)
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524
}

// Day stem and branch from Julian Day
function dayStemBranch(jd: number): { stemIdx: number; branchIdx: number } {
  // The sexagenary cycle for day pillar
  // Known reference: Jan 1, 1900 (JD 2415020) = 甲戌 (stem 0, branch 10)
  const refJd = 2415020
  const refStem = 0  // 甲
  const refBranch = 10 // 戌
  const diff = jd - refJd
  const stemIdx = ((diff % 10) + refStem + 10) % 10
  const branchIdx = ((diff % 12) + refBranch + 12) % 12
  return { stemIdx, branchIdx }
}

// Hour stem based on day stem (五鼠遁 hour stem rule)
function hourStemIndex(dayStemIdx: number, hourBranchIdx: number): number {
  // 甲己还加甲, 乙庚丙作初, 丙辛从戊起, 丁壬庚子居, 戊癸何方发, 壬子是真途
  const firstHourStemMap = [0, 2, 4, 6, 8] // map dayStemIdx to firstHourStemIdx
  const base = firstHourStemMap[Math.floor(dayStemIdx / 2)]
  return (base + hourBranchIdx) % 10
}

// Hour branch from hour (0-23)
function hourBranchIndex(hour: number): number {
  // 子时: 23:00-01:00, 丑时: 01:00-03:00, etc.
  return Math.floor(((hour + 1) % 24) / 2)
}

// Build a Pillar object
function makePillar(stemIdx: number, branchIdx: number): Pillar {
  return {
    stem: STEMS[stemIdx],
    stemEn: STEMS_EN[stemIdx],
    stemElement: STEMS_ELEMENTS[stemIdx],
    branch: BRANCHES[branchIdx],
    branchEn: BRANCHES_EN[branchIdx],
    branchElement: BRANCHES_ELEMENTS[branchIdx],
    animal: BRANCHES_ANIMALS[branchIdx],
  }
}

// Calculate five elements distribution
function calculateFiveElements(chart: Omit<BaZiChart, 'fiveElements'>): Record<string, number> {
  const elements: Record<string, number> = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 }
  const pillars = [chart.yearPillar, chart.monthPillar, chart.dayPillar, chart.hourPillar]
  for (const p of pillars) {
    elements[p.stemElement] = (elements[p.stemElement] || 0) + 1
    elements[p.branchElement] = (elements[p.branchElement] || 0) + 1
  }
  return elements
}

export function calculateBaZi(
  year: number,
  month: number,
  day: number,
  hour: number
): BaZiChart {
  // Year pillar
  const yStem = yearStemIndex(year)
  const yBranch = yearBranchIndex(year)

  // Month pillar
  const mBranch = monthBranchIndexFromDate(month, day)
  const mStem = monthStemIndex(yStem, mBranch)

  // Day pillar
  const jd = julianDay(year, month, day)
  const { stemIdx: dStem, branchIdx: dBranch } = dayStemBranch(jd)

  // Hour pillar
  const hBranch = hourBranchIndex(hour)
  const hStem = hourStemIndex(dStem, hBranch)

  const chart = {
    yearPillar: makePillar(yStem, yBranch),
    monthPillar: makePillar(mStem, mBranch - 1 >= 0 ? mBranch - 1 : 11),
    dayPillar: makePillar(dStem, dBranch),
    hourPillar: makePillar(hStem, hBranch),
  }

  return {
    ...chart,
    fiveElements: calculateFiveElements(chart),
  }
}

// Format chart to readable strings for AI prompt
export function formatBaZiForPrompt(chart: BaZiChart): string {
  const format = (p: Pillar) =>
    `${p.stem}${p.branch} (${p.stemEn} ${p.branchEn}, ${p.stemElement} over ${p.branchElement}, ${p.animal})`

  return [
    `Year Pillar (年柱): ${format(chart.yearPillar)}`,
    `Month Pillar (月柱): ${format(chart.monthPillar)}`,
    `Day Pillar (日柱): ${format(chart.dayPillar)}`,
    `Hour Pillar (时柱): ${format(chart.hourPillar)}`,
    `Five Elements: ${Object.entries(chart.fiveElements).map(([k, v]) => `${k}:${v}`).join(', ')}`,
  ].join('\n')
}

export { STEMS, BRANCHES, STEMS_EN, BRANCHES_EN, STEMS_ELEMENTS, BRANCHES_ELEMENTS, BRANCHES_ANIMALS }
