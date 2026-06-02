"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SageImage from "@/components/SageImage"

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/bazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Failed to calculate")

      const data = await res.json()

      localStorage.setItem("user_profile", JSON.stringify({
        birth: form,
        bazi: data.bazi,
        lifeHexagram: data.lifeHexagram,
        reading: data.reading,
      }))

      router.push("/home")
    } catch (err) {
      console.error("Onboarding error:", err)
    } finally {
      setLoading(false)
    }
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-12 ">
      <div className="w-full max-w-md">
        {/* Sage greeting */}
        <div className="text-center mb-10">
          <SageImage size="md" />
          <h1 className="text-3xl md:text-4xl text-gold-grad mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Master Awaits
          </h1>
          <p className="text-[#e8e0d5]/50 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            The ancient sages knew: to understand the river&apos;s course,
            <br />
            one must know where it began.
            <br />
            <span className="text-[#e8e0d5]/30">
              Share the moment of your arrival, and the master
              <br />
              will reveal your celestial design.
            </span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-eastern p-6 space-y-5">
          {/* Trigram decoration */}
          <div className="flex justify-center gap-4 text-[#c9a96e]/15 text-lg mb-2">
            <span>☰</span><span>☷</span><span>☵</span><span>☲</span>
          </div>

          <div>
            <label className="block text-[#e8e0d5]/60 text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Year of Birth
            </label>
            <input
              type="number"
              value={form.year}
              onChange={e => setForm({ ...form, year: parseInt(e.target.value) || 1990 })}
              min={1900}
              max={2026}
              className="w-full bg-[#0a0a0f] border border-[#c9a96e33] rounded-lg px-4 py-3 text-[#e8e0d5] focus:outline-none focus:border-[#c9a96e] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#e8e0d5]/60 text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Month
              </label>
              <select
                value={form.month}
                onChange={e => setForm({ ...form, month: parseInt(e.target.value) })}
                className="w-full bg-[#0a0a0f] border border-[#c9a96e33] rounded-lg px-4 py-3 text-[#e8e0d5] focus:outline-none focus:border-[#c9a96e] transition-colors appearance-none"
              >
                {months.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#e8e0d5]/60 text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Day
              </label>
              <input
                type="number"
                value={form.day}
                onChange={e => setForm({ ...form, day: parseInt(e.target.value) || 1 })}
                min={1}
                max={31}
                className="w-full bg-[#0a0a0f] border border-[#c9a96e33] rounded-lg px-4 py-3 text-[#e8e0d5] focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#e8e0d5]/60 text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hour of Birth (时辰)
            </label>
            <select
              value={form.hour}
              onChange={e => setForm({ ...form, hour: parseInt(e.target.value) })}
              className="w-full bg-[#0a0a0f] border border-[#c9a96e33] rounded-lg px-4 py-3 text-[#e8e0d5] focus:outline-none focus:border-[#c9a96e] transition-colors appearance-none"
            >
              {Array.from({ length: 24 }, (_, i) => {
                const animals = ['Rat (子)', '', 'Ox (丑)', '', 'Tiger (寅)', '', 'Rabbit (卯)', '', 'Dragon (辰)', '', 'Snake (巳)', '', 'Horse (午)', '', 'Goat (未)', '', 'Monkey (申)', '', 'Rooster (酉)', '', 'Dog (戌)', '', 'Pig (亥)', '']
                return (
                  <option key={i} value={i}>{i}:00 {animals[i] ? `— ${animals[i]}` : ''}</option>
                )
              })}
            </select>
            <p className="text-[#e8e0d5]/20 text-[10px] mt-1.5 tracking-wider">
              Each two-hour gate is guarded by a different celestial animal
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a96e] text-[#0a0a0f] py-4 rounded-full font-semibold text-lg tracking-wide
                       hover:bg-[#e0c98a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 0 30px rgba(201, 169, 110, 0.15)' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
                The master studies the patterns...
              </span>
            ) : (
              "Present Yourself to the Master"
            )}
          </button>
        </form>

        <p className="text-[#e8e0d5]/20 text-[10px] text-center mt-6 tracking-wider leading-relaxed">
          Your birth moment unlocks the BaZi — the Four Pillars that map
          <br />
          the heavens at the instant of your first breath.
        </p>
      </div>
    </main>
  )
}
