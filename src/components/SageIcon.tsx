// Ancient Eastern Sage — detailed SVG illustration
export default function SageIcon({ className = "w-64 h-80", opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 240 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <defs>
        {/* Glow filter */}
        <filter id="sageGlow" x="-30%" y="-10%" width="160%" height="130%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Soft ambient glow */}
        <filter id="ambientGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
          </feMerge>
        </filter>
        {/* Aura gradient */}
        <radialGradient id="sageAura" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.25" />
          <stop offset="40%" stopColor="#c9a96e" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
        {/* Robe gradient */}
        <linearGradient id="robeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#e0c98a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.2" />
        </linearGradient>
        {/* Gold gradient */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0c98a" />
          <stop offset="50%" stopColor="#f5e6c8" />
          <stop offset="100%" stopColor="#c9a96e" />
        </linearGradient>
      </defs>

      {/* Ambient glow behind sage */}
      <ellipse cx="120" cy="150" rx="100" ry="140" fill="url(#sageAura)" filter="url(#ambientGlow)" />

      {/* Mountain peaks — left */}
      <path d="M20 280 L40 190 L60 240 L75 180 L90 230 L100 170 L100 320 L20 320Z" fill="#c9a96e" opacity="0.06" />
      {/* Mountain peaks — right */}
      <path d="M230 280 L210 200 L195 250 L180 190 L160 235 L140 175 L140 320 L230 320Z" fill="#c9a96e" opacity="0.06" />

      {/* Back mountain mist */}
      <ellipse cx="120" cy="180" rx="80" ry="60" fill="#c9a96e" opacity="0.03" />
      <ellipse cx="120" cy="200" rx="60" ry="40" fill="#c9a96e" opacity="0.03" />

      {/* === SAGE BODY === */}

      {/* Wide robe — bottom flowing part */}
      <path
        d="M55 260 L30 315 L210 315 L185 260 Q175 285 150 290 Q120 295 90 290 Q65 285 55 260Z"
        fill="url(#robeGrad)"
        filter="url(#sageGlow)"
        stroke="#c9a96e"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />

      {/* Robe body */}
      <path
        d="M65 170 Q60 200 60 230 Q62 260 75 270"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M175 170 Q180 200 180 230 Q178 260 165 270"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Robe — main body shape */}
      <path
        d="M60 170 Q55 210 60 260 L180 260 Q185 210 180 170 Q160 178 120 180 Q80 178 60 170Z"
        fill="#c9a96e"
        opacity="0.12"
        filter="url(#sageGlow)"
      />

      {/* Robe collar / neckline */}
      <path
        d="M85 170 Q120 195 155 170"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        filter="url(#sageGlow)"
      />

      {/* Right arm / sleeve */}
      <path
        d="M175 170 Q200 180 210 210 Q215 230 205 250"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
        filter="url(#sageGlow)"
      />
      {/* Sleeve drape */}
      <path
        d="M175 168 Q195 175 208 205 Q202 220 195 230 Q188 240 195 250"
        fill="#c9a96e"
        opacity="0.1"
      />

      {/* Left arm / sleeve */}
      <path
        d="M65 170 Q45 185 38 215 Q35 240 45 260"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
        filter="url(#sageGlow)"
      />
      <path
        d="M67 168 Q48 182 42 212 Q48 228 43 252"
        fill="#c9a96e"
        opacity="0.1"
      />

      {/* Hands — meditation mudra */}
      <ellipse cx="118" cy="225" rx="22" ry="8" fill="#c9a96e" opacity="0.3" filter="url(#sageGlow)" />
      <ellipse cx="118" cy="223" rx="15" ry="5" fill="#c9a96e" opacity="0.2" />
      {/* Thumbs touching */}
      <line x1="108" y1="222" x2="128" y2="222" stroke="#e0c98a" strokeWidth="1.5" opacity="0.5" />

      {/* === HEAD === */}
      {/* Neck */}
      <rect x="109" y="140" width="22" height="18" rx="6" fill="#c9a96e" opacity="0.15" />

      {/* Face */}
      <ellipse cx="120" cy="118" rx="28" ry="32" fill="#c9a96e" opacity="0.25" filter="url(#sageGlow)" />

      {/* Hair — top bun (发髻) */}
      <ellipse cx="120" cy="78" rx="16" ry="12" fill="#c9a96e" opacity="0.35" filter="url(#sageGlow)" />
      <ellipse cx="120" cy="75" rx="8" ry="6" fill="#c9a96e" opacity="0.3" />
      {/* Hair pin */}
      <line x1="104" y1="76" x2="136" y2="78" stroke="#e0c98a" strokeWidth="1" opacity="0.5" />

      {/* Hair flowing down sides */}
      <path d="M94 100 Q88 115 90 135 Q92 145 95 148" fill="#c9a96e" opacity="0.15" />
      <path d="M146 100 Q152 115 150 135 Q148 145 145 148" fill="#c9a96e" opacity="0.15" />

      {/* Eyebrows — wise, long */}
      <path d="M100 108 Q110 104 118 106" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M140 108 Q130 104 122 106" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      {/* Eyes — closed, meditative */}
      <path d="M100 116 Q106 118 112 116" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M140 116 Q134 118 128 116" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* Nose */}
      <path d="M118 110 L116 122 Q115 126 117 128" stroke="#c9a96e" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Mustache */}
      <path d="M110 130 Q118 136 126 130" stroke="#c9a96e" strokeWidth="1.5" fill="none" opacity="0.35" />

      {/* Long beard */}
      <path
        d="M106 132 Q105 150 110 170 Q115 185 120 192 Q125 185 130 170 Q135 150 134 132"
        fill="#c9a96e"
        opacity="0.2"
        filter="url(#sageGlow)"
      />
      {/* Beard detail lines */}
      <path d="M112 140 Q114 155 115 170" stroke="#c9a96e" strokeWidth="0.8" opacity="0.25" fill="none" />
      <path d="M120 140 Q120 160 120 185" stroke="#c9a96e" strokeWidth="0.8" opacity="0.25" fill="none" />
      <path d="M128 140 Q126 155 125 170" stroke="#c9a96e" strokeWidth="0.8" opacity="0.25" fill="none" />

      {/* === INCENSE BURNER (front) === */}
      <ellipse cx="85" cy="270" rx="14" ry="5" fill="#c9a96e" opacity="0.15" />
      <rect x="76" y="262" width="18" height="8" rx="3" fill="#c9a96e" opacity="0.15" />
      <path d="M80 262 L75 252 L95 252 L90 262" fill="#c9a96e" opacity="0.1" />

      {/* Incense smoke rising */}
      <path
        d="M85 250 Q80 235 88 220 Q94 210 86 195 Q80 180 87 165"
        stroke="#c9a96e"
        strokeWidth="1.2"
        fill="none"
        opacity="0.2"
        filter="url(#sageGlow)"
      />
      <path
        d="M88 250 Q94 238 86 225 Q80 212 88 198"
        stroke="#c9a96e"
        strokeWidth="0.8"
        fill="none"
        opacity="0.15"
      />

      {/* === MOON behind sage === */}
      <circle cx="120" cy="130" r="55" fill="#c9a96e" opacity="0.04" filter="url(#ambientGlow)" />

      {/* === ORBIT RING around sage === */}
      <ellipse cx="120" cy="155" rx="85" ry="120" stroke="#c9a96e" strokeWidth="0.4" strokeDasharray="4 8" fill="none" opacity="0.15" />

      {/* Small stars/dots around */}
      <circle cx="40" cy="100" r="1" fill="#c9a96e" opacity="0.2" />
      <circle cx="200" cy="80" r="1.2" fill="#c9a96e" opacity="0.15" />
      <circle cx="30" cy="200" r="0.8" fill="#c9a96e" opacity="0.2" />
      <circle cx="210" cy="190" r="1" fill="#c9a96e" opacity="0.15" />
    </svg>
  )
}

// Gold circle emblem with Chinese character
export function EmblemIcon({ char = "易", size = "w-20 h-20" }: { char?: string; size?: string }) {
  return (
    <div
      className={`${size} rounded-full flex items-center justify-center`}
      style={{
        background: 'radial-gradient(circle at 40% 35%, rgba(201,169,110,0.2), rgba(201,169,110,0.05))',
        border: '1.5px solid rgba(201,169,110,0.3)',
        boxShadow: '0 0 30px rgba(201,169,110,0.15), inset 0 0 30px rgba(201,169,110,0.05)',
        fontFamily: "'Noto Serif SC', serif",
      }}
    >
      <span className="text-3xl text-gold-grad">{char}</span>
    </div>
  )
}
