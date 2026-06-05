"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SageImage from "@/components/SageImage"
import { EmblemIcon } from "@/components/SageIcon"

const SCENARIOS = [
  { emoji: "♥", label: "Love", question: "Should I let go, or should I hold on?", primary: true },
  { emoji: "⚡", label: "Career", question: "Is this the right time to change direction in my work?", primary: true },
  { emoji: "🍂", label: "Letting Go", question: "How do I release what no longer serves me and move forward?" },
  { emoji: "☀", label: "Today", question: "What energy surrounds me today? What should I pay attention to?" },
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
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-6">
          <SageImage size="hero" />
        </div>

        <p className="text-[#c9a96e]/60 text-xs tracking-[0.2em] uppercase mb-4">
          A Private Clarity Oracle for Love, Career &amp; Life Decisions
        </p>

        <h1 className="text-4xl md:text-6xl text-gold-grad mb-4 leading-tight max-w-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          Clarity for the Question
          <br />
          <span className="text-2xl md:text-4xl">You Can&apos;t Stop Thinking About</span>
        </h1>

        <p className="text-[#e8e0d5]/65 text-sm md:text-base max-w-md leading-relaxed mb-2">
          When your heart already knows, but your mind still needs to hear it —
        </p>
        <p className="text-[#e8e0d5]/45 text-xs md:text-sm max-w-md leading-relaxed mb-8">
          A reflective ritual guided by three millennia of Eastern wisdom.
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
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                (s as any).primary
                  ? 'bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e]/20'
                  : 'card-eastern text-[#e8e0d5]/60 hover:text-[#c9a96e] hover:border-[#c9a96e]/40'
              }`}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== APP PREVIEW ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            How It Works
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm mb-16">Three moments. That&apos;s all it takes.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Ask Your Question",
                desc: "Name the decision or feeling that keeps returning — love, career, letting go, or today.",
                icon: "✧",
              },
              {
                step: "2",
                title: "Cast the Coins",
                desc: "Three bronze coins fall six times. Watch the ancient hexagram form, line by line.",
                icon: "🪙",
              },
              {
                step: "3",
                title: "Receive Your Reading",
                desc: "Receive a warm, specific reflection with one clear next step — not a generic horoscope.",
                icon: "易",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Phone mockup */}
                <div className="w-48 h-80 rounded-[2rem] border-2 border-[#c9a96e]/15 bg-[#111118] p-3 mb-6 relative overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(201,169,110,0.06)' }}>
                  {/* Phone notch */}
                  <div className="w-20 h-1.5 rounded-full bg-[#c9a96e]/10 mx-auto mb-3" />
                  {/* Screen content */}
                  <div className="w-full h-full rounded-2xl bg-[#0a0a0f] border border-[#c9a96e]/5 flex flex-col items-center justify-center p-4">
                    <div className="text-3xl mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.icon}</div>
                    <div className="w-3/4 h-2 rounded-full bg-[#c9a96e]/8 mb-2" />
                    <div className="w-1/2 h-2 rounded-full bg-[#c9a96e]/5 mb-5" />
                    {i === 0 && (
                      <div className="w-4/5 space-y-2">
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/15 w-full" />
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/10 w-3/4" />
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/8 w-1/2" />
                      </div>
                    )}
                    {i === 1 && (
                      <div className="flex flex-col-reverse gap-1.5 items-center w-full">
                        {[1,1,0,1,0,1].map((yang, j) =>
                          yang ? <div key={j} className="w-2/3 h-0.5 rounded-full bg-[#c9a96e]/25" />
                               : <div key={j} className="flex gap-2 w-2/3"><div className="flex-1 h-0.5 rounded-full bg-[#c9a96e]/15" /><div className="flex-1 h-0.5 rounded-full bg-[#c9a96e]/15" /></div>
                        )}
                      </div>
                    )}
                    {i === 2 && (
                      <div className="w-4/5 space-y-2">
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/20 w-full" />
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/15 w-5/6" />
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/12 w-4/6" />
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/8 w-3/6" />
                        <div className="h-1.5 rounded-full bg-[#c9a96e]/5 w-5/6" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase mb-1">Step {item.step}</p>
                <h3 className="text-gold text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                <p className="text-[#e8e0d5]/40 text-xs leading-relaxed max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SAMPLE READING ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Here&apos;s What the Oracle Sounds Like
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm mb-12">Questions people bring to the oracle — and what they hear back.</p>

          <div className="card-eastern p-6 md:p-8 text-left">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#c9a96e]/10">
              <div className="w-6 h-6 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[10px] text-[#c9a96e]">易</div>
              <p className="text-[#c9a96e]/50 text-xs tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Oracle Speaks
              </p>
            </div>

            <p className="text-[#e8e0d5]/40 text-xs mb-4 italic">
              Question: &ldquo;Should I let go of this relationship, or give it one more chance?&rdquo;
            </p>
            <p className="text-gold text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hexagram 64 — Before Completion
            </p>

            <div className="text-sm leading-relaxed text-[#e8e0d5]/70 space-y-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              <p>
                The little fox is nearly across the river, but her tail is still wet.
                This hexagram does not say &ldquo;stay&rdquo; or &ldquo;leave.&rdquo; It says this: the story is not yet finished.
                There is still something incomplete between you — a word unspoken, a truth unfelt.
                Before you decide, ask yourself: have I truly been myself in this connection?
              </p>
              <p>
                If the answer is yes — and it has not been received — then the river is behind you.
                If the answer is no — then speak your truth first. Then decide.
                The oracle does not choose for you. It only shows you where you stand.
              </p>
              <p className="text-[#c9a96e]/60 text-xs pt-2 italic">
                &ldquo;未济 — nothing is finished. Every ending is also a beginning.&rdquo;
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
            Three Ways to Find Clarity
          </h2>
          <p className="text-[#e8e0d5]/40 text-sm text-center mb-16 max-w-lg mx-auto">
            No astrology knowledge needed. Just a quiet ritual for reflection, patterns, and the next step.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🪙",
                title: "Ask a Question",
                desc: "Should I reconnect with someone? Is this the right time to change direction? Cast three coins and receive a specific reflection.",
              },
              {
                icon: "☯",
                title: "Daily Reflection",
                desc: "A 3-minute daily practice: notice what weighs on you, see the pattern, and choose one clear action.",
              },
              {
                icon: "☀",
                title: "Know Your Pattern",
                desc: "Add your birth moment to unlock your Eastern birth pattern, so future readings can reflect your recurring themes.",
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
                For questions that need more depth, nuance, and care. Request a longer, more personal reading.
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
        <p className="text-[#e8e0d5]/40 text-sm">A longer reading request has been saved for review.</p>
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
