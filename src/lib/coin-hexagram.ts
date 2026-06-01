// Coin Hexagram (铜钱起卦) — Three Coins Method
// Simulates throwing 3 coins 6 times to build a hexagram from bottom to top

export interface CoinLine {
  lineNumber: number  // 1-6 (bottom to top)
  value: 6 | 7 | 8 | 9  // 6=老阴, 7=少阳, 8=少阴, 9=老阳
  name: string
  changing: boolean  // 6 and 9 are changing lines
}

export interface CoinHexagramResult {
  lines: CoinLine[]
  hexagramId: number
  changingHexagramId: number | null
  changingLines: number[]
}

// Simulate throwing 3 coins → values 6, 7, 8, 9 with traditional probabilities
function throwThreeCoins(): { value: 6 | 7 | 8 | 9; name: string; changing: boolean } {
  // Three coins, each heads=3 (Yang), tails=2 (Yin)
  // Sum: 6 (all tails, old yin), 7 (one heads, young yang), 8 (two heads, young yin), 9 (all heads, old yang)
  const coins = [Math.random() < 0.5 ? 2 : 3, Math.random() < 0.5 ? 2 : 3, Math.random() < 0.5 ? 2 : 3]
  const sum = coins[0] + coins[1] + coins[2]

  switch (sum) {
    case 6: return { value: 6, name: 'Old Yin (老阴) —⚋→', changing: true }
    case 7: return { value: 7, name: 'Young Yang (少阳) ——', changing: false }
    case 8: return { value: 8, name: 'Young Yin (少阴) —⚋', changing: false }
    case 9: return { value: 9, name: 'Old Yang (老阳) —○→', changing: true }
    default: return { value: 7, name: 'Young Yang (少阳) ——', changing: false }
  }
}

// Yang lines: 7 (stable yang) and 9 (old yang)
// Yin lines: 6 (old yin) and 8 (stable yin)
function isYangLine(value: number): boolean {
  return value === 7 || value === 9
}

export function castCoinHexagram(): CoinHexagramResult {
  const lines: CoinLine[] = []

  // Build from bottom (line 1) to top (line 6)
  for (let i = 1; i <= 6; i++) {
    const result = throwThreeCoins()
    lines.push({
      lineNumber: i,
      value: result.value,
      name: result.name,
      changing: result.changing,
    })
  }

  // Calculate hexagram from lines (bottom to top)
  // Upper trigram = lines 4-6, Lower trigram = lines 1-3
  const trigramFromLines = (startLine: number): number => {
    let bits = 0
    for (let i = 0; i < 3; i++) {
      if (isYangLine(lines[startLine + i].value)) {
        bits |= (1 << i) // LSB = bottom line
      }
    }
    const trigramMap = [8, 7, 6, 4, 5, 3, 2, 1] // bits → trigram index
    return trigramMap[bits]
  }

  const upperIdx = trigramFromLines(3)  // lines 4, 5, 6
  const lowerIdx = trigramFromLines(0)  // lines 1, 2, 3

  const hexagramId = (upperIdx - 1) * 8 + lowerIdx

  // Calculate changing hexagram
  const changingLines = lines.filter(l => l.changing).map(l => l.lineNumber)
  let changingHexagramId: number | null = null

  if (changingLines.length > 0) {
    // Flip changing lines to get the transformed hexagram
    const stabilizedLines = lines.map(l => ({
      ...l,
      value: l.changing ? (l.value === 6 ? 7 : 8) as (6 | 7 | 8 | 9) : l.value,
    }))

    const changingUpperIdx = trigramFromLines(3)
    const changingLowerIdx = trigramFromLines(0)

    // Recalculate for stabilized
    let cUpper = 0, cLower = 0
    for (let i = 0; i < 3; i++) {
      const v = stabilizedLines[3 + i].value
      if (isYangLine(v)) cUpper |= (1 << i)
    }
    for (let i = 0; i < 3; i++) {
      const v = stabilizedLines[i].value
      if (isYangLine(v)) cLower |= (1 << i)
    }
    const trigramMap = [8, 7, 6, 4, 5, 3, 2, 1]
    changingHexagramId = (trigramMap[cUpper] - 1) * 8 + trigramMap[cLower]
  }

  return { lines, hexagramId, changingHexagramId, changingLines }
}

export function formatCoinHexagramForPrompt(result: CoinHexagramResult): string {
  const linesDesc = result.lines
    .map(l => `Line ${l.lineNumber}: ${l.name}${l.changing ? ' [CHANGING]' : ''}`)
    .join('\n')

  const changingDesc = result.changingLines.length > 0
    ? `Changing lines: ${result.changingLines.join(', ')} → Transforms to Hexagram #${result.changingHexagramId}`
    : 'No changing lines — hexagram is stable'

  return `Coin Cast Hexagram #${result.hexagramId}\n${linesDesc}\n${changingDesc}`
}
