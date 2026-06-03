"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SageImage from "@/components/SageImage"
import { EmblemIcon } from "@/components/SageIcon"

const SCENARIOS = [
  { emoji: "♥", label: "Love", question: "What do I need to understand about my love life right now?" },
  { emoji: "⚡", label: "Career", question: "What direction should I take in my work and career?" },
  { emoji: "☯", label: "Self", question: "What is the deeper pattern behind what I'm feeling lately?" },
  { emoji: "☀", label: "Today", question: "What energy surrounds me today and what should I pay attention to?" },
]

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [subLoading, setSubLoading] = useState(false)
  const router = useRouter()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubLoading(true)
    try {
      const existing = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]")
      existing.push({ email, date: new Date().toISOString() })
      localStorage.setItem("newsletter_subscribers", JSON.stringify(existing))
      setSubscribed(true)
    } catch { /* ignore */ } finally { setSubLoading(false) }
  }

  return (
    <main className="flex-1 relative">

      {/* ===== HERO ===== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8">
          <SageImage size="hero" />
        </div>

        <p className="text-[#c9a96e]/60 text-xs tracking-[0.2em] uppercase mb-4">
          The 3,000-Year-Old Oracle · Now Listening
        </p>

        <h1 className="text-4xl md:text-6xl text-gold-grad mb-4 leading-tight max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ask the Ancient Oracle
          <br />
          <span className="text-2xl md:text-4xl">About Love, Career, and Life Decisions</span>
        </h1>

        <p className="text-[#e8e0d5]/50 text-sm md:text-base max-w-md leading-relaxed mb-2">
          When you feel stuck, uncertain, or just need someone who understands —
        </p>
        <p className="text-[#e8e0d5]/35 text-xs md:text-sm max-w-md leading-relaxed mb-10">
          the I Ching listens. Three coins, six throws, one answer woven from three millennia of Eastern wisdom.
        </p>

        {/* Primary CTA — "Ask a question" first */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/ask"
            className="bg-[#c9a96e] text-[#0a0a0f] px-10 py-3.5 rounded-full font-semibold text-lg tracking-wide
                       hover:bg-[#e0c98a] transition-all duration-300"
            style={{ boxShadow: '0 0 40px rgba(201,169,110,0.25)' }}
          >
            Ask a Question — It&apos;s Free
          </Link>
          <Link
            href="/onboarding"
            className="border border-[#c9a96e]/30 text-[#c9a96e] px-8 py-3.5 rounded-full font-medium text-sm tracking-wide
                       hover:border-[#c9a96e]/60 hover:text-[#e0c98a] transition-all duration-300"
          >
            Get My Daily Oracle →
          </Link>
        </div>
        <p className="text-[#e8e0d5]/25 text-[11px] mt-5 tracking-wide">
          No account needed. Just speak your question and cast the coins.
        </p>

        {/* Scenario chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {SCENARIOS.map((s) => (
            <button
              key={s.label}
              onClick={() => {
                localStorage.setItem("preset_question", s.question)
                router.push("/ask")
              }}
              className="card-eastern px-5 py-2.5 rounded-full text-sm text-[#e8e0d5]/60 hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all"
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== SAMPLE READING ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Here&apos;s What the Oracle Sounds Like
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm mb-12">Real people. Real questions. This is what you might hear.</p>

          <div className="card-eastern p-6 md:p-8 text-left">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#c9a96e]/10">
              <div className="w-6 h-6 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[10px] text-[#c9a96e]">易</div>
              <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Oracle Speaks
              </p>
            </div>

            <p className="text-[#e8e0d5]/40 text-xs mb-4 italic">
              Question: &ldquo;Should I leave my stable job to pursue what I truly love?&rdquo;
            </p>
            <p className="text-gold text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hexagram 24 — Return
            </p>

            <div className="text-sm leading-relaxed text-[#e8e0d5]/70 space-y-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              <p>
                The turning point has arrived. After a long winter, the first light breaks through.
                This hexagram speaks not of a reckless leap, but of a natural cycle completing itself —
                the old chapter has already ended in your heart. What remains is only the outer form.
              </p>
              <p>
                The oracle does not tell you to leave or stay. It tells you this: you already know.
                The hesitation is not doubt — it is the natural pause before the return of spring.
                Trust the timing. When you move, move with clarity, not desperation.
              </p>
              <p className="text-[#c9a96e]/60 text-xs pt-2 italic">
                &ldquo;水到渠成 — when the water arrives, the channel forms.&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#c9a96e]/10 text-center">
              <Link href="/ask" className="text-[#c9a96e] text-sm hover:text-[#e0c98a] transition-colors">
                Ask your own question now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THREE PATHS ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-gold-grad text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Three Ways the Oracle Helps
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm text-center mb-16 max-w-lg mx-auto">
            No astrology knowledge needed. Just someone who listens.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🪙",
                title: "Ask a Question",
                desc: "Should I reconnect with someone? Is this the right time to change direction? Cast three coins and the oracle answers — specific, personal, direct.",
              },
              {
                icon: "☯",
                title: "Daily Reflection",
                desc: "No question needed. Each day brings a new hexagram and a gentle reflection. Like a morning companion who always has something wise to say.",
              },
              {
                icon: "☀",
                title: "Know Your Pattern",
                desc: "Add your birth moment to unlock your personal birth chart. Then every reading is woven through the lens of who you uniquely are.",
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
            A quiet oracle each morning in your inbox — one reading, one reflection, before the world grows loud.
          </p>

          {subscribed ? (
            <div className="card-eastern p-6 animate-fade-in-up">
              <p className="text-[#c9a96e] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>You have been heard.</p>
              <p className="text-[#e8e0d5]/40 text-sm mt-2">The first letter arrives with tomorrow&apos;s dawn.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required
                className="flex-1 bg-[#0a0a0f] border border-[#c9a96e]/20 rounded-full px-6 py-3 text-sm text-[#e8e0d5] placeholder:text-[#e8e0d5]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors" />
              <button type="submit" disabled={subLoading}
                className="bg-[#c9a96e]/15 border border-[#c9a96e]/30 text-[#c9a96e] px-8 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-[#c9a96e]/25 transition-all duration-300 whitespace-nowrap disabled:opacity-50">
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
              <div className="flex justify-center mb-5"><EmblemIcon char="询" size="w-16 h-16" /></div>
              <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Something Deeper?
              </h2>
              <p className="text-[#e8e0d5]/40 text-sm leading-relaxed max-w-sm mx-auto">
                For the questions that can&apos;t fit inside a hexagram. A real conversation with someone who studies the ancient ways.
              </p>
            </div>
            <ConsultationForm />
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-16 text-center">
        <div className="flex justify-center gap-6 text-[#c9a96e]/6 text-2xl mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          <span>乾</span><span>坤</span><span>震</span><span>巽</span><span>坎</span><span>离</span><span>艮</span><span>兑</span>
        </div>
        <p className="text-[#e8e0d5]/10 text-xs tracking-widest">The Ancient Sage · Est. 1100 BCE</p>
      </footer>
    </main>
  )
}

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
    } catch { /* ignore */ } finally { setLoading(false) }
  }

  if (sent) return (
    <div className="text-center py-6 animate-fade-in-up">
      <p className="text-[#c9a96e] text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your message has reached the mountain.</p>
      <p className="text-[#e8e0d5]/40 text-sm">The master will respond within three days.</p>
    </div>
  )

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
