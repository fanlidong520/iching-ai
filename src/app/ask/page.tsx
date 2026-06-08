"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { renderMarkdown } from "@/lib/markdown"

interface CoinLine {
  lineNumber: number
  value: number
  name: string
  changing: boolean
}

const CATEGORIES = [
  { emoji: "♥", label: "Love" },
  { emoji: "⚡", label: "Career" },
  { emoji: "🍂", label: "Letting Go" },
  { emoji: "☀", label: "Today" },
]

const QUESTIONS = {
  "♥": ["Should I let go, or should I hold on?", "Is this connection real? What do they feel?", "How do I know if this is the right person?"],
  "⚡": ["Is this the right time to change direction?", "Should I stay in this job, or look for something new?", "What is my next career move?"],
  "🍂": ["How do I release what no longer serves me?", "Why can't I stop thinking about the past?", "What do I need to forgive?"],
  "☀": ["What energy surrounds me today?", "What should I focus on right now?", "What is the universe trying to tell me?"],
}

const RITUAL_STEPS = [
  "Casting the coins...",
  "Reading the changing lines...",
  "Listening for the answer...",
]

export default function AskPage() {
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("♥")
  const [phase, setPhase] = useState<"input" | "casting" | "result">("input")
  const [castLines, setCastLines] = useState<CoinLine[]>([])
  const [currentCast, setCurrentCast] = useState(0)
  const [ritualStep, setRitualStep] = useState(0)
  const [reading, setReading] = useState<string | null>(null)
  const [hexData, setHexData] = useState<any>(null)
  const [hasProfile, setHasProfile] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deepInterest, setDeepInterest] = useState(false)

  useEffect(() => {
    const preset = localStorage.getItem("preset_question")
    if (preset) { setQuestion(preset); localStorage.removeItem("preset_question") }
    if (localStorage.getItem("user_profile")) setHasProfile(true)
  }, [])

  const startCasting = () => {
    if (!question.trim()) return
    setPhase("casting")
    setCastLines([])
    setCurrentCast(1)
    setRitualStep(0)

    let cast = 1
    const interval = setInterval(() => {
      if (cast > 6) {
        clearInterval(interval)
        // Start ritual steps
        let step = 0
        setRitualStep(0)
        const ritual = setInterval(() => {
          step++
          if (step >= RITUAL_STEPS.length) { clearInterval(ritual); fetchReading(); return }
          setRitualStep(step)
        }, 1200)
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
        body: JSON.stringify({ question, category, baziSummary: elements, lifeHexId: profile.lifeHexagram?.id }),
      })
      const data = await res.json()
      setReading(data.reading)
      setHexData(data.coinCast)
      setPhase("result")
      setSaved(false)
      setDeepInterest(false)
    } catch (err) { console.error("Coin reading error:", err) }
  }

  const saveReading = () => {
    const existing = JSON.parse(localStorage.getItem("saved_readings") || "[]")
    existing.unshift({ question, hexData, reading, date: new Date().toISOString() })
    localStorage.setItem("saved_readings", JSON.stringify(existing.slice(0, 20)))
    setSaved(true)
  }

  const registerDeepInterest = () => {
    const existing = JSON.parse(localStorage.getItem("deep_reading_interest") || "[]")
    existing.unshift({
      question,
      category,
      hexagramId: hexData?.hexagramId,
      date: new Date().toISOString(),
      price: "$2.99",
    })
    localStorage.setItem("deep_reading_interest", JSON.stringify(existing.slice(0, 50)))
    setDeepInterest(true)
  }

  const getLineDisplay = (line: CoinLine) => {
    const isYang = line.value === 7 || line.value === 9
    if (isYang) return <div className="hex-line-yang" />
    return <div className="hex-line-yin"><span /><span /></div>
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
          Three bronze coins. Six throws. One answer.
        </p>
      </header>

      <div className="max-w-lg mx-auto px-4 space-y-6">
        {phase === "input" && (
          <div className="card-eastern p-6">
            {/* Category chips */}
            <div className="flex justify-center gap-2 mb-5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setCategory(c.emoji)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all ${
                    category === c.emoji
                      ? 'bg-[#c9a96e]/15 border border-[#c9a96e]/40 text-[#c9a96e]'
                      : 'border border-[#c9a96e]/10 text-[#e8e0d5]/40 hover:border-[#c9a96e]/30 hover:text-[#e8e0d5]/60'
                  }`}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>

            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder='e.g. "Should I let go, or should I hold on?"'
              rows={4}
              className="w-full bg-[#0a0a0f] border border-[#c9a96e33] rounded-lg px-4 py-3 text-[#e8e0d5] focus:outline-none focus:border-[#c9a96e] transition-colors resize-none placeholder:text-[#e8e0d5]/15"
            />

            {/* Category-specific question templates */}
            {category && QUESTIONS[category as keyof typeof QUESTIONS] && (
              <div className="mt-4 space-y-2">
                {QUESTIONS[category as keyof typeof QUESTIONS].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuestion(q)}
                    className="w-full text-left px-4 py-2 rounded-lg border border-[#c9a96e]/8 text-[#e8e0d5]/35 text-xs hover:border-[#c9a96e]/25 hover:text-[#e8e0d5]/60 transition-all"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            )}

            <button onClick={startCasting} disabled={!question.trim()}
              className="w-full mt-5 bg-[#c9a96e] text-[#0a0a0f] py-3.5 rounded-full font-semibold tracking-wide hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed">
              Cast the Three Coins
            </button>
          </div>
        )}

        {phase === "casting" && (
          <div className="card-eastern p-8 text-center">
            {/* Coin casting or ritual waiting */}
            {currentCast <= 6 ? (
              <>
                <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Line {Math.min(currentCast, 6)} of 6
                </p>
                <div className="flex justify-center gap-4 mb-8">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-gold text-lg coin-flip"
                      style={{ animationDelay: `${i * 0.15}s`, background: 'radial-gradient(circle at 30% 30%, rgba(201,169,110,0.15), transparent)', fontFamily: "'Noto Serif SC', serif" }}>
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
                            {existingLine.changing && <span className="text-[#c9a96e]/50 text-[9px] tracking-wider">transforming</span>}
                          </div>
                        ) : (
                          <div className="text-[#e8e0d5]/5 text-xs tracking-widest">{lineNum <= currentCast ? "···" : "—"}</div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={n} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${n <= currentCast ? 'bg-[#c9a96e]' : 'bg-[#c9a96e]/10'}`} />
                  ))}
                </div>
              </>
            ) : (
              /* Ritual waiting step */
              <div className="py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-6">
                  <span className="text-2xl text-gold animate-pulse">易</span>
                </div>
                <p className="text-[#c9a96e]/60 text-sm animate-fade-in-up" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {RITUAL_STEPS[ritualStep]}
                </p>
                <div className="flex justify-center gap-2 mt-6">
                  {RITUAL_STEPS.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i <= ritualStep ? 'bg-[#c9a96e]' : 'bg-[#c9a96e]/15'}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "result" && reading && hexData && (
          <div className="space-y-6">
            {/* Hexagram card */}
            <div className="card-eastern p-6 text-center">
              <p className="text-[#c9a96e]/40 text-[10px] tracking-widest uppercase mb-4">Your Hexagram</p>
              <div className="flex flex-col-reverse items-center gap-1.5 mb-5">
                {castLines.map(line => (
                  <div key={line.lineNumber} className="w-full max-w-[200px]">
                    {getLineDisplay(line)}
                    {line.changing && <p className="text-[#c9a96e]/40 text-[9px] text-center mt-0.5 tracking-wider">transformation line</p>}
                  </div>
                ))}
              </div>
              <p className="text-gold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{hexData.mainHexagram?.nameEn}</p>
              <p className="text-[#e8e0d5]/30 text-sm mt-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>{hexData.mainHexagram?.nameZh}</p>
              {hexData.mainHexagram?.judgment && (
                <div className="mt-4 pt-4 border-t border-[#c9a96e]/10">
                  <p className="text-[#c9a96e]/40 text-[10px] tracking-widest uppercase mb-2">Source Text</p>
                  <p className="text-[#e8e0d5]/45 text-xs leading-relaxed italic">
                    &ldquo;{hexData.mainHexagram.judgment}&rdquo;
                  </p>
                </div>
              )}
              {hexData.changingHexagram && (
                <p className="text-[#e8e0d5]/35 text-xs mt-3">Evolving toward: {hexData.changingHexagram.nameEn} ({hexData.changingHexagram.nameZh})</p>
              )}
            </div>

            {/* Reading with markdown rendering */}
            <div className="card-eastern p-6 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#c9a96e]/10">
                <div className="w-6 h-6 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[10px] text-[#c9a96e]">易</div>
                <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>The Oracle Speaks</p>
              </div>
              <div className="text-sm leading-relaxed text-[#e8e0d5]/80" style={{ fontFamily: "'Playfair Display', serif" }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(reading) }} />
              <p className="mt-5 pt-4 border-t border-[#c9a96e]/10 text-[#e8e0d5]/30 text-[11px] leading-relaxed">
                Inspired by the I Ching for reflection only. This reading does not predict your future or make decisions for you.
              </p>
            </div>

            {/* Action row: Save + Follow-up */}
            <div className="flex gap-3">
              <button onClick={saveReading}
                className={`flex-1 card-eastern p-3 text-center text-sm transition-all tracking-wider ${
                  saved ? 'text-[#c9a96e] border-[#c9a96e]/30' : 'text-[#e8e0d5]/50 hover:text-[#c9a96e] hover:border-[#c9a96e]/40'
                }`}>
                {saved ? "Saved" : "Save This Reading"}
              </button>
              <button onClick={() => { setPhase("input"); setReading(null); setHexData(null); setCastLines([]) }}
                className="flex-1 card-eastern p-3 text-center text-[#e8e0d5]/50 text-sm hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all tracking-wider">
                Ask a Follow-up
              </button>
            </div>

            {/* Deep reading interest test */}
            <div className="card-eastern p-5 text-center animate-fade-in-up border-[#c9a96e]/25">
              {deepInterest ? (
                <>
                  <p className="text-[#c9a96e] text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Your deeper reading request has been noted.
                  </p>
                  <p className="text-[#e8e0d5]/40 text-xs">
                    Deeper readings are opening soon. For now, save this reading and return when the next question becomes clear.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[#c9a96e]/80 text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Want to go deeper into this question?
                  </p>
                  <p className="text-[#e8e0d5]/40 text-xs mb-4">
                    Unlock changing lines, hidden pattern, and one practical next step.
                  </p>
                  <button
                    onClick={registerDeepInterest}
                    className="inline-block bg-[#c9a96e] text-[#0a0a0f] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-[#e0c98a] transition-all duration-300"
                  >
                    Unlock Deeper Reading — $2.99
                  </button>
                </>
              )}
            </div>

            {/* Birth info prompt */}
            {!hasProfile && (
              <div className="card-eastern p-5 text-center animate-fade-in-up border-[#c9a96e]/25">
                <p className="text-[#c9a96e]/70 text-sm mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Readings become deeply personal with your birth chart
                </p>
                <p className="text-[#e8e0d5]/40 text-xs mb-4">
                  Add your birth moment — then every oracle speaks directly to who you uniquely are.
                </p>
                <Link href="/onboarding"
                  className="inline-block bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#c9a96e] px-6 py-2 rounded-full text-sm font-semibold tracking-wide hover:bg-[#c9a96e]/20 transition-all duration-300">
                  Personalize My Readings
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
