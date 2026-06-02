"use client"

// Tai Chi + Bagua background — visible, atmospheric, covers the entire page
export default function BaguaBackground() {
  const trigrams = ["☰", "☷", "☵", "☲", "☳", "☶", "☴", "☱"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Central Tai Chi (yin-yang) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 'min(70vmin, 500px)', height: 'min(70vmin, 500px)' }}>
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0.1 }}>
          {/* Outer circle */}
          <circle cx="100" cy="100" r="98" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
          {/* Yang half */}
          <path d="M100 2 A98 98 0 0 1 100 198 A49 49 0 0 1 100 100 A49 49 0 0 0 100 2" fill="#c9a96e" />
          {/* Yang dot (dark) */}
          <circle cx="100" cy="51" r="10" fill="#0a0a0f" />
          {/* Yin dot (gold) */}
          <circle cx="100" cy="149" r="10" fill="#c9a96e" />
        </svg>
      </div>

      {/* Bagua trigrams arranged around the circle */}
      {trigrams.map((tri, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180)
        const radius = 'min(45vmin, 320px)'
        const x = `calc(50% + ${radius} * ${Math.cos(angle)})`
        const y = `calc(50% + ${radius} * ${Math.sin(angle)})`

        return (
          <div
            key={i}
            className="absolute text-[#c9a96e]"
            style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
              fontSize: 'min(4vmin, 28px)',
              opacity: 0.12,
            }}
          >
            {tri}
          </div>
        )
      })}

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a96e]"
        style={{ width: 'min(90vmin, 650px)', height: 'min(90vmin, 650px)', opacity: 0.06 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a96e]"
        style={{ width: 'min(80vmin, 580px)', height: 'min(80vmin, 580px)', opacity: 0.08 }} />

      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-2/5 h-2/5"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-2/5 h-2/5"
        style={{ background: 'radial-gradient(circle at 100% 100%, rgba(201,169,110,0.06) 0%, transparent 70%)' }} />
    </div>
  )
}
