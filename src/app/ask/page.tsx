"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface CoinLine {
  lineNumber: number
  value: number
  name: string
  changing: boolean
}

export default function AskPage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [phase, setPhase] = useState<"input" | "casting" | "result">("input")
  const [castLines, setCastLines] = useState<CoinLine[]>([])
  const [currentCast, setCurrentCast] = useState(0)
  const [reading, setReading] = useState<string | null>(null)
  const [hexData, setHexData] = useState<any>(null)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    // Check for preset question from scenario chips
    const preset = localStorage.getItem("preset_question")
    if (preset) {
      setQuestion(preset)
      localStorage.removeItem("preset_question")
    }
    // Check if user has a profile
    if (localStorage.getItem("user_profile")) {
      setHasProfile(true)
    }
  }, [])

  const startCasting = () => {
    if (!question.trim()) return
    setPhase("casting")
    setCastLines([])
    setCurrentCast(1)

    let cast = 1
    const interval = setInterval(() => {
      if (cast > 6) {
        clearInterval(interval)
        fetchReading()
        return
      }

      const coins = [Math.random() < 0.5 ? 2 : 3, Math.random() < 0.5 ? 2 : 3, Math.random() < 0.5 ? 2 : 3]
      const sum = coins[0] + coins[1] + coins[2]
      const valueMap: Record<number, { value: 6 | 7 | 8 | 9; name: string; changing: boolean }> = {
        6: { value: 6, name: "Old Yin (老阴)", changing: true },
        7: { value: 7, name: "Young Yang (少阳)", changing: false },
        8: { value: 8, name: "Young Yin (少阴)", changing: false },
        9: { value: 9, name: "Old Yang (老阳)", changing: true },
      }

      setCastLines(prev => [...prev, { lineNumber: cast, ...valueMap[sum] }])
      setCurrentCast(cast)
      cast++
    }, 800)
  }

  const fetchReading = async () => {
    const profile = JSON.parse(localStorage.getItem("user_profile") || "{}")
    const elements = Object.entries(profile.bazi?.fiveElements || {})
      .map(([k, v]: [string, unknown]) => `${k}:${v}`)
      .join(", ")

    try {
      const res = await fetch("/api/reading/coin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          baziSummary: elements,
          lifeHexId: profile.lifeHexagram?.id,
        }),
      })
      const data = await res.json()
      setReading(data.reading)
      setHexData(data.coinCast)
      setPhase("result")
    } catch (err) {
      console.error("Coin reading error:", err)
    }
  }

  const getLineDisplay = (line: CoinLine) => {
    const isYang = line.value === 7 || line.value === 9
    if (isYang) return <div className="hex-line-yang" />
    return (
      <div className="hex-line-yin">
        <span /><span />
      </div>
    )
  }

  return (
    <main className="flex-1 min-h-screen pb-24">
      <header className="px-6 py-8 text-center">
        <Link href="/" className="text-[#c9a96e]/40 text-xs tracking-widest uppercase mb-4 inline-block hover:text-[#c9a96e]/70 transition-colors">
          ← The Ancient Sage
        </Link>
        <h1 className="text-2xl text-gold-grad" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ask the Oracle
        </h1>
        <p className="text-[#e8e0d5]/40 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
          Three bronze coins. Six throws.
          <br />
          One answer from three thousand years of wisdom.
        </p>
      </header>

      <div className="max-w-lg mx-auto px-4 space-y-6">
        {phase === "input" && (
          <div className="card-eastern p-6">
            <div className="flex justify-center gap-4 text-[#c9a96e]/10 text-xl mb-5">
              <span>☰</span><span>☷</span><span>☵</span><span>☲</span><span>☳</span><span>☴</span>
            </div>
            <label className="block text-[#e8e0d5]/60 text-xs tracking-wider uppercase mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              What do you want to ask?
            </label>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder='e.g. "Should I move on from this relationship?" or "Is now the right time to change careers?"'
              rows={4}
              className="w-full bg-[#0a0a0f] border border-[#c9a96e33] rounded-lg px-4 py-3 text-[#e8e0d5] focus:outline-none focus:border-[#c9a96e] transition-colors resize-none placeholder:text-[#e8e0d5]/15"
            />
            <button
              onClick={startCasting}
              disabled={!question.trim()}
              className="w-full mt-5 bg-[#c9a96e] text-[#0a0a0f] py-3.5 rounded-full font-semibold tracking-wide
                         hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Cast the Three Coins
            </button>
          </div>
        )}

        {phase === "casting" && (
          <div className="card-eastern p-8 text-center">
            <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              The coins fall... Line {Math.min(currentCast, 6)} of 6
            </p>

            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-gold text-lg
                    ${currentCast <= 6 ? 'coin-flip' : ''}`}
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    background: 'radial-gradient(circle at 30% 30%, rgba(201,169,110,0.15), transparent)',
                    fontFamily: "'Noto Serif SC', serif",
                  }}
                >
                  币
                </div>
              ))}
            </div>

            <div className="flex flex-col-reverse items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6].map(lineNum => {
                const existingLine = castLines.find(l => l.lineNumber === lineNum)
                return (
                  <div key={lineNum} className="w-full max-w-[200px] h-7 flex items-center justify-center">
                    {existingLine ? (
                      <div className="flex flex-col items-center gap-1 w-full animate-fade-in-up">
                        {getLineDisplay(existingLine)}
                        {existingLine.changing && (
                          <span className="text-[#c9a96e]/50 text-[9px] tracking-wider">transforming</span>
                        )}
                      </div>
                    ) : (
                      <div className="text-[#e8e0d5]/5 text-xs tracking-widest">
                        {lineNum <= currentCast ? "···" : "—"}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  n <= currentCast ? 'bg-[#c9a96e]' : 'bg-[#c9a96e]/10'
                }`} />
              ))}
            </div>
          </div>
        )}

        {phase === "result" && reading && hexData && (
          <div className="space-y-6">
            <div className="card-eastern p-6 text-center">
              <div className="flex justify-center gap-6 text-[#c9a96e]/15 text-xl mb-4">
                <span>☯</span>
              </div>
              <p className="text-[#c9a96e]/40 text-[10px] tracking-widest uppercase mb-4">Your Hexagram</p>
              <div className="flex flex-col-reverse items-center gap-1.5 mb-5">
                {castLines.map(line => (
                  <div key={line.lineNumber} className="w-full max-w-[200px]">
                    {getLineDisplay(line)}
                    {line.changing && (
                      <p className="text-[#c9a96e]/40 text-[9px] text-center mt-0.5 tracking-wider">→ transformation line</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-gold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {hexData.mainHexagram?.nameEn}
              </p>
              <p className="text-[#e8e0d5]/30 text-sm mt-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {hexData.mainHexagram?.nameZh}
              </p>
              {hexData.changingHexagram && (
                <p className="text-[#e8e0d5]/35 text-xs mt-3">
                  Evolving toward: {hexData.changingHexagram.nameEn} ({hexData.changingHexagram.nameZh})
                </p>
              )}
            </div>

            <div className="card-eastern p-6 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#c9a96e]/10">
                <div className="w-6 h-6 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[10px] text-[#c9a96e]">易</div>
                <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Oracle Replies
                </p>
              </div>
              <div className="text-sm leading-relaxed text-[#e8e0d5]/80 whitespace-pre-line"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {reading}
              </div>
            </div>

            {/* Prompt to add birth info for better readings */}
            {!hasProfile && (
              <div className="card-eastern p-5 text-center animate-fade-in-up border-[#c9a96e]/25">
                <p className="text-[#c9a96e]/70 text-sm mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Want readings that know you personally?
                </p>
                <p className="text-[#e8e0d5]/40 text-xs mb-4">
                  Add your birth moment and every oracle will be woven through your unique celestial chart.
                </p>
                <Link
                  href="/onboarding"
                  className="inline-block bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#c9a96e] px-6 py-2 rounded-full text-sm font-semibold tracking-wide
                             hover:bg-[#c9a96e]/20 transition-all duration-300"
                >
                  Add My Birth Chart →
                </Link>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setPhase("input"); setReading(null); setHexData(null); setCastLines([]) }}
                className="flex-1 card-eastern p-3 text-center text-[#e8e0d5]/50 text-sm hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all tracking-wider"
              >
                Ask Another
              </button>
              <Link
                href="/"
                className="flex-1 card-eastern p-3 text-center text-[#e8e0d5]/50 text-sm hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all tracking-wider"
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
