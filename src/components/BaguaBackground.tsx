"use client"

// Full-page Tai Chi + Bagua background
export default function BaguaBackground() {
  const trigrams = ["☰", "☷", "☵", "☲", "☳", "☶", "☴", "☱"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Central Tai Chi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 'min(90vmin, 600px)',
          height: 'min(90vmin, 600px)',
        }}>
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0.18 }}>
          {/* Outer rings */}
          <circle cx="100" cy="100" r="98" fill="none" stroke="#c9a96e" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="92" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.5" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="#c9a96e" strokeWidth="0.2" opacity="0.3" />

          {/* Yin-Yang */}
          <path d="M100 2 A98 98 0 0 1 100 198 A49 49 0 0 1 100 100 A49 49 0 0 0 100 2" fill="#c9a96e" opacity="0.6" />
          <circle cx="100" cy="51" r="11" fill="#0a0a0f" />
          <circle cx="100" cy="149" r="11" fill="#c9a96e" opacity="0.6" />
        </svg>
      </div>

      {/* Trigrams — placed far out, near viewport edges */}
      {trigrams.map((tri, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180)
        const radius = 42 // % from center
        const x = 50 + radius * Math.cos(angle)
        const y = 50 + radius * Math.sin(angle)

        return (
          <div
            key={`tri-${i}`}
            className="absolute text-[#c9a96e]"
            style={{
              left: `${x}%`, top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: 'max(22px, 4.5vmin)',
              opacity: 0.16,
              textShadow: '0 0 30px rgba(201,169,110,0.3)',
            }}
          >
            {tri}
          </div>
        )
      })}

      {/* Outer decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a96e]"
        style={{
          width: 'min(105vmin, 700px)',
          height: 'min(105vmin, 700px)',
          opacity: 0.06,
        }}
      />
    </div>
  )
}
