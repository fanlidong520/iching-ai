"use client"

// Two Tai Chi symbols on left and right sides, visible while scrolling
export default function BaguaBackground() {
  const trigrams = ["☰", "☷", "☵", "☲", "☳", "☶", "☴", "☱"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Left Tai Chi */}
      <div className="absolute top-1/2 -translate-y-1/2"
        style={{
          left: 'max(-8vw, -120px)',
          width: 'max(40vw, 350px)',
          height: 'max(40vw, 350px)',
        }}>
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0.13 }}>
          <circle cx="100" cy="100" r="96" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="#c9a96e" strokeWidth="0.4" opacity="0.5" />
          <path d="M100 4 A96 96 0 0 1 100 196 A48 48 0 0 1 100 100 A48 48 0 0 0 100 4" fill="#c9a96e" opacity="0.7" />
          <circle cx="100" cy="52" r="10" fill="#0a0a0f" />
          <circle cx="100" cy="148" r="10" fill="#c9a96e" opacity="0.7" />
        </svg>
      </div>

      {/* Right Tai Chi */}
      <div className="absolute top-1/2 -translate-y-1/2"
        style={{
          right: 'max(-8vw, -120px)',
          width: 'max(40vw, 350px)',
          height: 'max(40vw, 350px)',
        }}>
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0.13 }}>
          <circle cx="100" cy="100" r="96" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="#c9a96e" strokeWidth="0.4" opacity="0.5" />
          <path d="M100 4 A96 96 0 0 1 100 196 A48 48 0 0 1 100 100 A48 48 0 0 0 100 4" fill="#c9a96e" opacity="0.7" />
          <circle cx="100" cy="52" r="10" fill="#0a0a0f" />
          <circle cx="100" cy="148" r="10" fill="#c9a96e" opacity="0.7" />
        </svg>
      </div>

      {/* Trigrams on far edges */}
      {trigrams.map((tri, i) => {
        const isLeft = i < 4
        const pos = isLeft ? i : i - 4
        const topPercent = 20 + pos * 20

        return (
          <div
            key={`tri-${i}`}
            className="absolute text-[#c9a96e] hidden md:block"
            style={{
              [isLeft ? 'left' : 'right']: 'max(2vw, 10px)',
              top: `${topPercent}%`,
              fontSize: 'max(18px, 3vmin)',
              opacity: 0.12,
            }}
          >
            {tri}
          </div>
        )
      })}
    </div>
  )
}
