"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HistoryPage() {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("user_profile")) router.push("/onboarding")
  }, [router])

  return (
    <main className="flex-1 min-h-screen  pb-24">
      <header className="px-6 py-8 text-center">
        <button onClick={() => router.push("/home")} className="text-[#c9a96e]/40 text-xs tracking-widest uppercase mb-4 hover:text-[#c9a96e]/70 transition-colors">
          ← Return
        </button>
        <h1 className="text-2xl text-gold-grad" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Scroll Library
        </h1>
        <p className="text-[#e8e0d5]/30 text-sm mt-2">Past Oracles</p>
      </header>

      <div className="max-w-lg mx-auto px-4">
        <div className="card-eastern p-8 text-center">
          <div className="text-5xl mb-5">📜</div>
          <p className="text-[#e8e0d5]/40 text-sm leading-relaxed mb-2">
            Your scrolls are carefully stored in the temple archive.
          </p>
          <p className="text-[#e8e0d5]/20 text-xs">
            Past readings will appear here once you begin your journey.
          </p>
        </div>
      </div>
    </main>
  )
}
