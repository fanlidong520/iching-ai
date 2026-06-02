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
      const existing = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]")
      existing.push({ email, date: new Date().toISOString() })
      localStorage.setItem("newsletter_subscribers", JSON.stringify(existing))
      setSubscribed(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <main className="flex-1 bg-ink-wash relative">

      {/* ===== HERO ===== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Sage */}
        <div className="mb-6">
          <SageImage size="hero" />
        </div>

        {/* What it is — clear, immediate */}
        <p className="text-[#c9a96e]/60 text-xs tracking-[0.2em] uppercase mb-3">
          Ancient Eastern Wisdom · Daily Guidance
        </p>
        <h1 className="text-4xl md:text-6xl text-gold-grad mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          The I Ching,
          <br />
          <span className="text-2xl md:text-4xl">Speaking to You Each Morning</span>
        </h1>
        <p className="text-[#e8e0d5]/50 text-sm md:text-base max-w-lg leading-relaxed mb-2">
          A 3,000-year-old oracle. Your birth chart. One daily scroll.
        </p>
        <p className="text-[#e8e0d5]/30 text-xs md:text-sm max-w-md leading-relaxed mb-8">
          Discover what the ancient sages see in your stars today —
          a personal reading based on your BaZi celestial blueprint
          and the I Ching hexagram of the day.
        </p>

        {/* CTA — now clear what happens next */}
        <Link
          href="/onboarding"
          className="bg-[#c9a96e] text-[#0a0a0f] px-10 py-3.5 rounded-full font-semibold text-lg tracking-wide
                     hover:bg-[#e0c98a] transition-all duration-300"
          style={{ boxShadow: '0 0 40px rgba(201,169,110,0.25)' }}
        >
          Reveal My Daily Oracle →
        </Link>
        <p className="text-[#e8e0d5]/25 text-[11px] mt-4 tracking-wide">
          Free. No account needed. Just your birth moment.
        </p>
      </section>

      {/* ===== WHAT YOU GET ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-gold-grad text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Three Ancient Practices, One Daily Companion
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm text-center mb-16 max-w-lg mx-auto">
            Each rooted in millennia of Eastern wisdom. Each made personal for you.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "☯",
                title: "Daily Oracle",
                desc: "Every morning, a new I Ching hexagram appears — matched to your birth chart. The master interprets what today's cosmic energy means for your path.",
              },
              {
                icon: "🪙",
                title: "Coin Casting",
                desc: "Have a specific question? Cast three bronze coins six times. The pattern they form has guided kings and scholars for three thousand years.",
              },
              {
                icon: "🌙",
                title: "Monthly Forecast",
                desc: "See the month ahead through the lens of your BaZi chart. Understand the broader currents shaping your journey before they arrive.",
              },
            ].map((item, i) => (
              <div key={i} className="card-eastern p-6 text-center group hover:border-[#c9a96e]/30 transition-all">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-gold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h3>
                <p className="text-[#e8e0d5]/45 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl text-gold-grad mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Three Breaths. That&apos;s All.
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm mb-16">No signup required. No app to install. Just you and the oracle.</p>

          <div className="space-y-8">
            {[
              { step: "1", title: "Share your birth moment", desc: "Year, month, day, hour — the heavens at your first breath unlock your BaZi chart and Life Hexagram." },
              { step: "2", title: "Receive your daily oracle", desc: "Each morning, the I Ching speaks. A new hexagram, interpreted through the lens of your unique celestial blueprint." },
              { step: "3", title: "Cast the coins when you need more", desc: "For questions too heavy for the daily scroll — love, career, a choice — throw the coins and listen." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 text-left">
                <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{item.step}</span>
                </div>
                <div>
                  <h4 className="text-[#e8e0d5]/80 text-base mb-1">{item.title}</h4>
                  <p className="text-[#e8e0d5]/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/onboarding"
            className="inline-block mt-12 bg-[#c9a96e] text-[#0a0a0f] px-10 py-3.5 rounded-full font-semibold text-lg tracking-wide
                       hover:bg-[#e0c98a] transition-all duration-300"
            style={{ boxShadow: '0 0 40px rgba(201,169,110,0.25)' }}
          >
            Begin — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <EmblemIcon char="信" size="w-16 h-16" />
          </div>
          <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Letters from the Mountain
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            Each morning, your oracle arrives by email — a quiet moment of ancient wisdom before the world grows loud.
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
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== DEEP CONSULTATION ===== */}
      <section id="consultation" className="relative z-10 py-24 px-6">
        <div className="max-w-lg mx-auto">
          <div className="card-eastern p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-5">
                <EmblemIcon char="询" size="w-16 h-16" />
              </div>
              <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Seek Deeper Counsel
              </h2>
              <p className="text-[#e8e0d5]/40 text-sm leading-relaxed max-w-sm mx-auto">
                There are questions too heavy for the daily scroll. Matters of the heart, the path, the soul. The master sets aside time for those who truly seek.
              </p>
            </div>
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 py-16 text-center">
        <div className="flex justify-center gap-6 text-[#c9a96e]/6 text-2xl mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          <span>乾</span><span>坤</span><span>震</span><span>巽</span><span>坎</span><span>离</span><span>艮</span><span>兑</span>
        </div>
        <p className="text-[#e8e0d5]/10 text-xs tracking-widest">The Ancient Sage · Est. 1100 BCE</p>
      </footer>
    </main>
  )
}

// Consultation form
function ConsultationForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setLoading(true)
    try {
      const existing = JSON.parse(localStorage.getItem("consultation_requests") || "[]")
      existing.push({ ...form, date: new Date().toISOString() })
      localStorage.setItem("consultation_requests", JSON.stringify(existing))
      setSent(true)
    } catch (err) {
      console.error(err)
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
        <p className="text-[#e8e0d5]/40 text-sm">The master will respond within three days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required
        className="w-full bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-lg px-4 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors" />
      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your email" required
        className="w-full bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-lg px-4 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors" />
      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="What weighs on your spirit?" rows={3} required
        className="w-full bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-lg px-4 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors resize-none" />
      <button type="submit" disabled={loading}
        className="w-full bg-[#c9a96e] text-[#0a0a0f] py-3 rounded-full font-semibold text-sm tracking-wide hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-50">
        {loading ? "Sending to the mountain..." : "Send Your Inquiry"}
      </button>
    </form>
  )
}
