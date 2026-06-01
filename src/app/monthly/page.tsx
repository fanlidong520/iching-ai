"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MonthlyPage() {
  const router = useRouter()
  const [reading, setReading] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("user_profile")) router.push("/onboarding")
  }, [router])

  const fetchMonthlyReading = async () => {
    setLoading(true)
    const profile = JSON.parse(localStorage.getItem("user_profile") || "{}")
    const elements = Object.entries(profile.bazi?.fiveElements || {})
      .map(([k, v]: [string, unknown]) => `${k}:${v}`)
      .join(", ")

    try {
      const res = await fetch(`/api/reading/daily?bazi=${encodeURIComponent(elements)}&lifeHex=${profile.lifeHexagram?.id}`)
      const data = await res.json()
      setReading(data.reading)
    } catch (err) {
      console.error("Monthly reading error:", err)
    } finally {
      setLoading(false)
    }
  }

  const now = new Date()
  const monthName = now.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <main className="flex-1 min-h-screen bg-ink-wash pb-24">
      <header className="px-6 py-8 text-center">
        <button onClick={() => router.push("/home")} className="text-[#c9a96e]/40 text-xs tracking-widest uppercase mb-4 hover:text-[#c9a96e]/70 transition-colors">
          ← Return
        </button>
        <div className="text-5xl mb-4 opacity-40">🌙</div>
        <h1 className="text-2xl text-gold-grad" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Month Ahead
        </h1>
        <p className="text-[#c9a96e]/40 text-sm mt-1 tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
          {monthName}
        </p>
      </header>

      <div className="max-w-lg mx-auto px-4">
        <div className="card-eastern p-6 text-center">
          {reading ? (
            <div className="animate-fade-in-up text-left">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#c9a96e]/10">
                <div className="w-6 h-6 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[10px] text-[#c9a96e]">易</div>
                <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Monthly Scroll
                </p>
              </div>
              <div className="text-sm leading-relaxed text-[#e8e0d5]/80 whitespace-pre-line"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {reading}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <p className="text-[#e8e0d5]/40 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                  The master gazes at the lunar cycle of {monthName},
                  <br />
                  reading the cosmic currents that will shape
                  <br />
                  the weeks ahead.
                </p>
              </div>
              <button
                onClick={fetchMonthlyReading}
                disabled={loading}
                className="bg-[#c9a96e] text-[#0a0a0f] px-8 py-3 rounded-full font-semibold tracking-wide
                           hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "The master contemplates the moon..." : `Unseal the ${monthName} Scroll`}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
