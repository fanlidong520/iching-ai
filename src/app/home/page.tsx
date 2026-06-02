"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SageImage from "@/components/SageImage"

interface UserProfile {
  birth: { year: number; month: number; day: number; hour: number }
  bazi: {
    yearPillar: { stem: string; branch: string; stemElement: string; animal: string }
    monthPillar: { stem: string; branch: string; stemElement: string; animal: string }
    dayPillar: { stem: string; branch: string; stemElement: string; animal: string }
    hourPillar: { stem: string; branch: string; stemElement: string; animal: string }
    fiveElements: Record<string, number>
  }
  lifeHexagram: { id: number; nameZh: string; nameEn: string; description: string; element: string }
  reading: string
}

export default function HomePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [dailyReading, setDailyReading] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("user_profile")
    if (!stored) {
      router.push("/onboarding")
      return
    }
    setProfile(JSON.parse(stored))
  }, [router])

  const fetchDailyReading = async () => {
    if (!profile) return
    setLoading(true)

    try {
      const elements = Object.entries(profile.bazi.fiveElements)
        .map(([k, v]) => `${k}:${v}`)
        .join(", ")

      const res = await fetch(
        `/api/reading/daily?bazi=${encodeURIComponent(elements)}&lifeHex=${profile.lifeHexagram.id}`
      )
      const data = await res.json()
      setDailyReading(data.reading)
    } catch (err) {
      console.error("Daily reading error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen ">
        <div className="w-8 h-8 border-2 border-[#c9a96e]/30 border-t-[#c9a96e] rounded-full animate-spin" />
      </main>
    )
  }

  const { bazi, lifeHexagram } = profile
  const topElements = Object.entries(bazi.fiveElements)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <main className="flex-1 min-h-screen  pb-24">
      {/* Header */}
      <header className="px-6 py-8 text-center">
        <SageImage size="sm" showMandala={false} />
        <p className="text-[#c9a96e]/40 text-[10px] tracking-widest uppercase mb-2">The master is present</p>
        <h1 className="text-2xl text-gold-grad" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Sacred Space
        </h1>
      </header>

      <div className="max-w-lg mx-auto px-4 space-y-6">
        {/* BaZi Summary Card */}
        <div className="card-eastern p-5">
          <h2 className="text-xs text-[#c9a96e]/50 tracking-wider uppercase mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Celestial Blueprint · 八字命盘
          </h2>
          <div className="grid grid-cols-4 gap-2 text-center mb-4">
            {[
              { label: "Year", p: bazi.yearPillar },
              { label: "Month", p: bazi.monthPillar },
              { label: "Day", p: bazi.dayPillar },
              { label: "Hour", p: bazi.hourPillar },
            ].map(({ label, p }) => (
              <div key={label} className="bg-[#0a0a0f] rounded-lg p-2 border border-[#c9a96e]/10">
                <p className="text-[#e8e0d5]/30 text-[10px] uppercase tracking-wider">{label}</p>
                <p className="text-gold text-lg" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  {p.stem}{p.branch}
                </p>
                <p className="text-[#e8e0d5]/40 text-[10px]">{p.animal}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#e8e0d5]/40 text-xs">Dominant energies:</span>
            {topElements.map(([el, count]) => (
              <span key={el} className="text-[#c9a96e] text-xs px-2 py-0.5 bg-[#c9a96e]/10 rounded-full">
                {el} {count}
              </span>
            ))}
          </div>
        </div>

        {/* Life Hexagram Card */}
        <div className="card-eastern p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#c9a96e]/8 flex items-center justify-center text-2xl border border-[#c9a96e]/20" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            <span className="text-gold">{lifeHexagram.nameZh[0]}</span>
          </div>
          <div className="flex-1">
            <p className="text-[#e8e0d5]/40 text-[10px] tracking-wider uppercase">Life Hexagram · 本命卦</p>
            <p className="text-gold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lifeHexagram.nameEn}
            </p>
            <p className="text-[#e8e0d5]/30 text-xs mt-0.5">{lifeHexagram.nameZh} · {lifeHexagram.element} essence</p>
          </div>
          <span className="text-[#e8e0d5]/10 text-4xl" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {lifeHexagram.nameZh}
          </span>
        </div>

        {/* Daily Oracle */}
        <div className="card-eastern p-6 text-center">
          {dailyReading ? (
            <div className="animate-fade-in-up text-left">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#c9a96e]/10">
                <div className="w-6 h-6 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[10px] text-[#c9a96e]">易</div>
                <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Master Speaks
                </p>
              </div>
              <div className="text-sm leading-relaxed text-[#e8e0d5]/80 whitespace-pre-line"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {dailyReading}
              </div>
              <div className="mt-6 pt-4 border-t border-[#c9a96e]/10 flex items-center gap-2">
                <div className="w-4 h-px bg-[#c9a96e]/20 flex-1" />
                <button
                  onClick={() => setDailyReading(null)}
                  className="text-[#c9a96e]/40 text-xs hover:text-[#c9a96e]/70 transition-colors tracking-wider"
                >
                  Fold the scroll
                </button>
                <div className="w-4 h-px bg-[#c9a96e]/20 flex-1" />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#c9a96e]/5 flex items-center justify-center mb-4 border border-[#c9a96e]/10">
                  <span className="text-3xl opacity-50 text-[#c9a96e]" style={{ fontFamily: "'Noto Serif SC', serif" }}>易</span>
                </div>
                <h3 className="text-xl text-gold-grad mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Master Has Prepared Your Oracle
                </h3>
                <p className="text-[#e8e0d5]/40 text-sm leading-relaxed max-w-xs mx-auto">
                  The scroll is sealed with your celestial mark.
                  <br />
                  Open it, and the ancient wisdom woven from
                  <br />
                  your BaZi and today&apos;s cosmic pattern shall be revealed.
                </p>
              </div>
              <button
                onClick={fetchDailyReading}
                disabled={loading}
                className="relative group bg-[#c9a96e] text-[#0a0a0f] px-8 py-3 rounded-full font-semibold tracking-wide
                           hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-50 overflow-hidden"
              >
                <span className="relative z-10">
                  {loading ? "The master unseals the scroll..." : "Open Today's Scroll"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </>
          )}
        </div>

        {/* Quick access */}
        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/ask"
            className="card-eastern p-4 text-center hover:border-[#c9a96e]/40 transition-all group"
          >
            <div className="text-2xl mb-2">🪙</div>
            <p className="text-[#e8e0d5]/60 text-xs group-hover:text-[#c9a96e] transition-colors tracking-wider uppercase">
              Cast the Coins
            </p>
            <p className="text-[#e8e0d5]/20 text-[10px] mt-0.5">Ask a question</p>
          </Link>
          <Link
            href="/monthly"
            className="card-eastern p-4 text-center hover:border-[#c9a96e]/40 transition-all group"
          >
            <div className="text-2xl mb-2">🌙</div>
            <p className="text-[#e8e0d5]/60 text-xs group-hover:text-[#c9a96e] transition-colors tracking-wider uppercase">
              Month Ahead
            </p>
            <p className="text-[#e8e0d5]/20 text-[10px] mt-0.5">Cosmic forecast</p>
          </Link>
          <Link
            href="/history"
            className="card-eastern p-4 text-center hover:border-[#c9a96e]/40 transition-all group"
          >
            <div className="text-2xl mb-2">📜</div>
            <p className="text-[#e8e0d5]/60 text-xs group-hover:text-[#c9a96e] transition-colors tracking-wider uppercase">
              Old Scrolls
            </p>
            <p className="text-[#e8e0d5]/20 text-[10px] mt-0.5">Past readings</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
