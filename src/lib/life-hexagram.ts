// Life Hexagram (本命卦) calculation based on birth date
// Uses Plum Blossom I Ching (梅花易数) method

export function calculateLifeHexagram(
  year: number,
  month: number,
  day: number
): { hexagramId: number; upperTrigramIndex: number; lowerTrigramIndex: number } {
  // Method: sum of year + month + day determines upper and lower trigrams
  // Upper trigram: (year + month) % 8
  // Lower trigram: (year + month + day) % 8

  const upperNum = (year + month) % 8
  const lowerNum = (year + month + day) % 8

  // Convert to 1-indexed trigrams (1=Qian, 2=Dui, 3=Li, 4=Zhen, 5=Xun, 6=Kan, 7=Gen, 8=Kun)
  const upperIdx = upperNum === 0 ? 8 : upperNum
  const lowerIdx = lowerNum === 0 ? 8 : lowerNum

  // Hexagram ID = (upper - 1) * 8 + lower
  const hexagramId = (upperIdx - 1) * 8 + lowerIdx

  return { hexagramId, upperTrigramIndex: upperIdx - 1, lowerTrigramIndex: lowerIdx - 1 }
}

// String description of life hexagram for AI prompt
export function formatLifeHexagram(
  year: number,
  month: number,
  day: number
): { hexagramId: number; description: string } {
  const { hexagramId, upperTrigramIndex, lowerTrigramIndex } = calculateLifeHexagram(year, month, day)

  const trigramNames = ['Qian (Heaven)', 'Dui (Lake)', 'Li (Fire)', 'Zhen (Thunder)', 'Xun (Wind)', 'Kan (Water)', 'Gen (Mountain)', 'Kun (Earth)']

  return {
    hexagramId,
    description: `Life Hexagram #${hexagramId} — Upper: ${trigramNames[upperTrigramIndex]}, Lower: ${trigramNames[lowerTrigramIndex]} (calculated from birth date ${year}-${month}-${day})`,
  }
}
