"use client"

import { useState } from "react"
import Link from "next/link"
import SageImage from "@/components/SageImage"
import { EmblemIcon } from "@/components/SageIcon"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [subLoading, setSubLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubLoading(true)

    try {
      // For now store locally; Supabase integration will persist this
      const existing = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]")
      existing.push({ email, date: new Date().toISOString() })
      localStorage.setItem("newsletter_subscribers", JSON.stringify(existing))
      setSubscribed(true)
    } catch (err) {
      console.error("Subscribe error:", err)
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <main className="flex-1 bg-ink-wash">
      {/* ===== HERO SECTION ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#c9a96e]/20 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 rounded-full bg-[#c9a96e]/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#c9a96e]/15 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-0.8 h-0.8 rounded-full bg-[#c9a96e]/25 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* === THE SAGE — large, visible, central === */}
        <div className="mb-2 relative">
          {/* Outer glow ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
              animation: 'pulseGlow 4s ease-in-out infinite',
            }}
          />
          <div className="relative z-10">
            <SageImage size="hero" />
          </div>
        </div>

        {/* Title below sage */}
        <div className="relative z-10 -mt-4">
          <h1 className="text-5xl md:text-7xl mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gold-grad">The Ancient Sage</span>
          </h1>
          <p className="text-xl md:text-2xl text-gold-grad mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Speaks Through the I Ching
          </p>
          <div className="w-16 h-px mx-auto my-4 bg-gradient-to-r from-transparent via-[#c9a96e]/60 to-transparent" />
          <p className="text-sm md:text-base max-w-md mx-auto leading-relaxed text-[#e8e0d5]/50" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Three millennia of wisdom, offered to you each day.
            <br />
            Not a machine. A presence. A voice from the mountain.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/onboarding"
            className="bg-[#c9a96e] text-[#0a0a0f] px-10 py-3.5 rounded-full font-semibold text-lg tracking-wide
                       hover:bg-[#e0c98a] transition-all duration-300"
            style={{ boxShadow: '0 0 40px rgba(201,169,110,0.25)' }}
          >
            Enter the Temple
          </Link>
          <a
            href="#consultation"
            className="border border-[#c9a96e]/30 text-[#c9a96e] px-10 py-3.5 rounded-full font-semibold text-lg tracking-wide
                       hover:border-[#c9a96e]/60 hover:text-[#e0c98a] transition-all duration-300"
          >
            Seek the Master
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
          <span className="text-[10px] text-[#c9a96e]/50 tracking-widest uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v8M4 8l4 4 4-4" stroke="#c9a96e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </svg>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <EmblemIcon char="信" size="w-16 h-16" />
          </div>
          <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Letters from the Mountain
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm mb-8 leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Each morning, a whisper of ancient wisdom arrives in your inbox — your daily hexagram, a reflection, and a quiet moment of clarity before the world grows loud.
          </p>

          {subscribed ? (
            <div className="card-eastern p-6 animate-fade-in-up">
              <p className="text-[#c9a96e] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>You have been heard.</p>
              <p className="text-[#e8e0d5]/40 text-sm mt-2">The first letter will arrive with tomorrow&apos;s dawn.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-full px-6 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
              <button
                type="submit"
                disabled={subLoading}
                className="bg-[#c9a96e]/15 border border-[#c9a96e]/30 text-[#c9a96e] px-8 py-3 rounded-full text-sm font-semibold tracking-wide
                           hover:bg-[#c9a96e]/25 transition-all duration-300 whitespace-nowrap disabled:opacity-50"
              >
                {subLoading ? "..." : "Receive the Letters"}
              </button>
            </form>
          )}
          <p className="text-[#e8e0d5]/15 text-[10px] mt-4 tracking-wider">
            One letter each morning. No noise. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ===== DEEP CONSULTATION SECTION ===== */}
      <section id="consultation" className="py-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="card-eastern p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-5">
                <EmblemIcon char="询" size="w-16 h-16" />
              </div>
              <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Seek Deeper Counsel
              </h2>
              <p className="text-[#e8e0d5]/40 text-sm leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                There are questions too heavy for the daily scroll.
                <br />
                Matters of the heart, the path, the soul.
                <br />
                The master sets aside time for those who truly seek.
              </p>
            </div>

            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* ===== BOTTOM ===== */}
      <footer className="py-16 text-center">
        <div className="flex justify-center gap-6 text-[#c9a96e]/10 text-2xl mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          <span>乾</span><span>坤</span><span>震</span><span>巽</span>
          <span>坎</span><span>离</span><span>艮</span><span>兑</span>
        </div>
        <div className="flex justify-center gap-3 text-[#c9a96e]/10 text-lg mb-4">
          <span>☰</span><span>☷</span><span>☵</span><span>☲</span><span>☳</span><span>☴</span><span>☶</span><span>☱</span>
        </div>
        <p className="text-[#e8e0d5]/10 text-xs tracking-widest">
          The Ancient Sage · Est. 3000 Years Ago
        </p>
      </footer>
    </main>
  )
}

// Consultation form component
function ConsultationForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setLoading(true)

    try {
      // Store locally for now; will be persisted to Supabase
      const existing = JSON.parse(localStorage.getItem("consultation_requests") || "[]")
      existing.push({ ...form, date: new Date().toISOString() })
      localStorage.setItem("consultation_requests", JSON.stringify(existing))
      setSent(true)
    } catch (err) {
      console.error("Consultation error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-6 animate-fade-in-up">
        <p className="text-[#c9a96e] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your message has reached the mountain.
        </p>
        <p className="text-[#e8e0d5]/40 text-sm">
          The master will respond within three days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        placeholder="Your name"
        required
        className="w-full bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-lg px-4 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
      />
      <input
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        placeholder="Your email"
        required
        className="w-full bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-lg px-4 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
      />
      <textarea
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        placeholder="What weighs on your spirit? Tell the master what you seek..."
        rows={3}
        required
        className="w-full bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-lg px-4 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c9a96e] text-[#0a0a0f] py-3 rounded-full font-semibold text-sm tracking-wide
                   hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Sending to the mountain..." : "Send Your Inquiry"}
      </button>
      <p className="text-[#e8e0d5]/12 text-[10px] text-center tracking-wider">
        Your words are held in confidence. No request is too small.
      </p>
    </form>
  )
}
