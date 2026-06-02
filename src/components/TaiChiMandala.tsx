// Tai Chi mandala — designed to sit behind the Sage as a halo
export default function TaiChiMandala() {
  const trigrams = ["☰", "☷", "☵", "☲", "☳", "☶", "☴", "☱"]

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: 'min(85vmin, 550px)', height: 'min(85vmin, 550px)' }}>
      {/* Glow aura */}
      <div className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)' }} />

      {/* Tai Chi SVG */}
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0.18 }}>
        {/* Outer ring */}
        <circle cx="100" cy="100" r="96" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.6" />

        {/* Yin-Yang halves */}
        <path d="M100 4 A96 96 0 0 1 100 196 A48 48 0 0 1 100 100 A48 48 0 0 0 100 4" fill="#c9a96e" opacity="0.8" />
        {/* Light dot in dark (top) */}
        <circle cx="100" cy="52" r="10" fill="#0a0a0f" />
        {/* Dark dot in light (bottom) */}
        <circle cx="100" cy="148" r="10" fill="#c9a96e" opacity="0.8" />
      </svg>

      {/* Trigrams ring */}
      {trigrams.map((tri, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180)
        const cx = 50 + 42 * Math.cos(angle)
        const cy = 50 + 42 * Math.sin(angle)

        return (
          <div
            key={i}
            className="absolute text-[#c9a96e]"
            style={{
              left: `${cx}%`, top: `${cy}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: 'min(3vmin, 22px)',
              opacity: 0.22,
              textShadow: '0 0 15px rgba(201,169,110,0.3)',
            }}
          >
            {tri}
          </div>
        )
      })}

      {/* Outer dotted ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        <circle cx="100" cy="100" r="86" fill="none" stroke="#c9a96e" strokeWidth="0.4" strokeDasharray="3 6" />
      </svg>
    </div>
  )
}
