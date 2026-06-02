"use client"

export default function BaguaBackground() {
  // 64 hexagram names as subtle background text
  const hexagramChars = ["乾","坤","屯","蒙","需","讼","师","比","小畜","履","泰","否","同人","大有","谦","豫","随","蛊","临","观","噬嗑","贲","剥","复","无妄","大畜","颐","大过","坎","离","咸","恒","遁","大壮","晋","明夷","家人","睽","蹇","解","损","益","夬","姤","萃","升","困","井","革","鼎","震","艮","渐","归妹","丰","旅","巽","兑","涣","节","中孚","小过","既济","未济"]
  const trigrams = ["☰", "☷", "☵", "☲", "☳", "☶", "☴", "☱"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Large central Tai Chi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 'min(85vmin, 640px)',
          height: 'min(85vmin, 640px)',
        }}>
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0.13 }}>
          <circle cx="100" cy="100" r="98" fill="none" stroke="#c9a96e" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5" />
          <path d="M100 2 A98 98 0 0 1 100 198 A49 49 0 0 1 100 100 A49 49 0 0 0 100 2" fill="#c9a96e" />
          <circle cx="100" cy="51" r="12" fill="#0a0a0f" />
          <circle cx="100" cy="149" r="12" fill="#c9a96e" />
        </svg>
      </div>

      {/* Trigrams — arranged in a larger, more visible ring */}
      {trigrams.map((tri, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180)
        const radius = 'min(50vmin, 420px)'
        const x = `calc(50% + ${radius} * ${Math.cos(angle)})`
        const y = `calc(50% + ${radius} * ${Math.sin(angle)})`

        return (
          <div
            key={`tri-${i}`}
            className="absolute text-[#c9a96e]"
            style={{
              left: x, top: y,
              transform: 'translate(-50%, -50%)',
              fontSize: 'min(5vmin, 34px)',
              opacity: 0.15,
              textShadow: '0 0 20px rgba(201,169,110,0.3)',
            }}
          >
            {tri}
          </div>
        )
      })}

      {/* Decorative circles */}
      {[0.92, 0.82, 0.72].map((scale, i) => (
        <div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a96e]"
          style={{
            width: `calc(min(85vmin, 640px) * ${scale})`,
            height: `calc(min(85vmin, 640px) * ${scale})`,
            opacity: 0.06 + i * 0.02,
          }}
        />
      ))}

      {/* Scattered hexagram names across the background */}
      {hexagramChars.map((char, i) => {
        // Deterministic but scattered positions
        const seed = (i * 137 + 53) % hexagramChars.length
        const left = 5 + (seed * 37) % 90 // 5% to 95%
        const top = 5 + (seed * 73) % 90

        return (
          <div
            key={`hex-${i}`}
            className="absolute text-[#c9a96e]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${10 + (i % 6)}px`,
              opacity: 0.03 + (i % 3) * 0.01,
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            {char}
          </div>
        )
      })}

      {/* Corner glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '40%',
        background: 'radial-gradient(circle at 0% 0%, rgba(201,169,110,0.08) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '40%',
        background: 'radial-gradient(circle at 100% 100%, rgba(201,169,110,0.08) 0%, transparent 70%)' }} />
    </div>
  )
}
