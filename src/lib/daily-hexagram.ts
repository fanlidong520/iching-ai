// Daily Hexagram calculation based on current date
// Uses Plum Blossom I Ching date method

export function calculateDailyHexagram(
  year?: number,
  month?: number,
  day?: number
): {
  hexagramId: number
  changingLine: number
  changingHexagramId: number
} {
  const now = new Date()
  const y = year ?? now.getFullYear()
  const m = month ?? now.getMonth() + 1
  const d = day ?? now.getDate()

  // Upper trigram: (year + month) % 8
  // Lower trigram: (day) % 8
  // Changing line: (year + month + day) % 6

  const upperNum = (y + m) % 8
  const lowerNum = d % 8
  const movingLine = (y + m + d) % 6

  const upperIdx = upperNum === 0 ? 8 : upperNum
  const lowerIdx = lowerNum === 0 ? 8 : lowerNum
  const lineNum = movingLine === 0 ? 6 : movingLine

  const hexagramId = (upperIdx - 1) * 8 + lowerIdx

  // Calculate changing hexagram (变卦): flip the moving line's trigram
  // Determine which trigram the moving line belongs to (lines 1-3 = lower, 4-6 = upper)
  let changingUpperIdx = upperIdx
  let changingLowerIdx = lowerIdx

  if (lineNum <= 3) {
    // Changing line in lower trigram
    changingLowerIdx = flipTrigramLine(lowerIdx, lineNum)
  } else {
    // Changing line in upper trigram
    changingUpperIdx = flipTrigramLine(upperIdx, lineNum - 3)
  }

  const changingHexagramId = (changingUpperIdx - 1) * 8 + changingLowerIdx

  return {
    hexagramId,
    changingLine: lineNum,
    changingHexagramId,
  }
}

// Flip one line in a trigram (changes yin to yang or yang to yin at a specific position)
function flipTrigramLine(trigramIdx: number, linePos: number): number {
  // Trigram binary representation (bottom-up, line 1 = LSB)
  // 1=Qian(111), 2=Dui(110), 3=Li(101), 4=Zhen(100), 5=Xun(011), 6=Kan(010), 7=Gen(001), 8=Kun(000)
  const trigramBits = [0b111, 0b110, 0b101, 0b100, 0b011, 0b010, 0b001, 0b000]
  const bits = trigramBits[trigramIdx - 1]
  const mask = 1 << (linePos - 1)
  const flipped = bits ^ mask

  // Find the trigram index from flipped bits
  const newIdx = trigramBits.indexOf(flipped)
  return newIdx >= 0 ? newIdx + 1 : trigramIdx
}

export function formatDailyHexagram(): { hexagramId: number; changingLine: number; changingHexagramId: number; description: string } {
  const result = calculateDailyHexagram()
  return {
    ...result,
    description: `Daily Hexagram #${result.hexagramId} with moving line ${result.changingLine}, transforming to Hexagram #${result.changingHexagramId}`,
  }
}
