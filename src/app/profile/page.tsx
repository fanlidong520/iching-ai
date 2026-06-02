"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UserProfile {
  birth: { year: number; month: number; day: number; hour: number }
  bazi: any
  lifeHexagram: { id: number; nameZh: string; nameEn: string; description: string; element: string }
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<"free" | "pro">("free")

  useEffect(() => {
    const stored = localStorage.getItem("user_profile")
    if (!stored) {
      router.push("/onboarding")
      return
    }
    setProfile(JSON.parse(stored))
    // Check for stored subscription
    const subStatus = localStorage.getItem("subscription_status")
    if (subStatus === "pro") setPlan("pro")
  }, [router])

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      // Use a temp user ID stored in localStorage (real auth will use Supabase)
      let userId = localStorage.getItem("temp_user_id")
      if (!userId) {
        userId = "user_" + Math.random().toString(36).slice(2, 11)
        localStorage.setItem("temp_user_id", userId)
      }

      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email: "seeker@iching.app",
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error("Checkout error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (confirm("This will clear all your data and return you to the temple gate. Are you certain?")) {
      localStorage.clear()
      router.push("/onboarding")
    }
  }

  if (!profile) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen ">
        <div className="w-8 h-8 border-2 border-[#c9a96e]/30 border-t-[#c9a96e] rounded-full animate-spin" />
      </main>
    )
  }

  const { birth, lifeHexagram } = profile

  return (
    <main className="flex-1 min-h-screen  pb-24">
      <header className="px-6 py-8 text-center">
        <button onClick={() => router.push("/home")} className="text-[#c9a96e]/40 text-xs tracking-widest uppercase mb-4 hover:text-[#c9a96e]/70 transition-colors">
          ← Return
        </button>
        <h1 className="text-2xl text-gold-grad" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Seeker&apos;s Record
        </h1>
      </header>

      <div className="max-w-lg mx-auto px-4 space-y-6">
        {/* Birth Info */}
        <div className="card-eastern p-5">
          <h2 className="text-xs text-[#c9a96e]/50 tracking-wider uppercase mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Birth Record
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#c9a96e]/10">
              <p className="text-[#e8e0d5]/30 text-[10px]">Year</p>
              <p className="text-[#e8e0d5]/80">{birth.year}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#c9a96e]/10">
              <p className="text-[#e8e0d5]/30 text-[10px]">Month</p>
              <p className="text-[#e8e0d5]/80">{birth.month}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#c9a96e]/10">
              <p className="text-[#e8e0d5]/30 text-[10px]">Day</p>
              <p className="text-[#e8e0d5]/80">{birth.day}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-lg p-3 border border-[#c9a96e]/10">
              <p className="text-[#e8e0d5]/30 text-[10px]">Hour</p>
              <p className="text-[#e8e0d5]/80">{birth.hour}:00</p>
            </div>
          </div>
        </div>

        {/* Life Hexagram */}
        <div className="card-eastern p-5">
          <h2 className="text-xs text-[#c9a96e]/50 tracking-wider uppercase mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Life Hexagram · 本命卦
          </h2>
          <p className="text-gold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            #{lifeHexagram.id} — {lifeHexagram.nameEn}
          </p>
          <p className="text-[#e8e0d5]/30 text-sm mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {lifeHexagram.nameZh} · {lifeHexagram.element} essence
          </p>
          <p className="text-[#e8e0d5]/50 text-xs leading-relaxed">{lifeHexagram.description}</p>
        </div>

        {/* Subscription */}
        <div className="card-eastern p-6">
          <h2 className="text-xs text-[#c9a96e]/50 tracking-wider uppercase mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Temple Offering
          </h2>

          {plan === "pro" ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-3 border border-[#c9a96e]/30">
                <span className="text-xl text-gold">易</span>
              </div>
              <p className="text-gold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Pro Seeker
              </p>
              <p className="text-[#e8e0d5]/40 text-xs">Unlimited readings · Monthly scrolls · Full archive</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[#e8e0d5]/40 text-sm mb-2">Free Seeker — One scroll per day</p>

              <div className="bg-[#0a0a0f] rounded-lg p-4 mb-5 border border-[#c9a96e]/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Pro</span>
                  <span className="text-[#e8e0d5]/60 text-sm">$6.99<span className="text-[#e8e0d5]/30">/month</span></span>
                </div>
                <ul className="text-[#e8e0d5]/40 text-xs space-y-1.5 text-left">
                  <li>· Unlimited daily oracles</li>
                  <li>· Ask the coins any question, anytime</li>
                  <li>· Monthly celestial forecast</li>
                  <li>· Full scroll archive — never lose a reading</li>
                  <li>· Export and share your oracles</li>
                </ul>
              </div>

              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-[#c9a96e] text-[#0a0a0f] py-3 rounded-full font-semibold tracking-wide
                           hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Preparing the offering..." : "Become a Pro Seeker · $6.99/mo"}
              </button>
              <p className="text-[#e8e0d5]/15 text-[10px] mt-3">
                Secured by Stripe · Cancel anytime from this page
              </p>
            </div>
          )}
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full text-center text-[#e8e0d5]/15 text-xs py-3 hover:text-red-400/40 transition-colors tracking-wider"
        >
          Leave the Temple · Start Anew
        </button>

        <p className="text-center text-[#e8e0d5]/10 text-[10px] pb-8">
          The Ancient Sage · v0.1.0
        </p>
      </div>
    </main>
  )
}
