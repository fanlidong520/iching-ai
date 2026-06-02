"use client"

import { useState } from "react"
import Image from "next/image"
import SageIcon from "@/components/SageIcon"

interface SageImageProps {
  className?: string
  size?: "sm" | "md" | "lg" | "hero"
  showMandala?: boolean
}

const sizeMap = {
  sm: { container: "w-[140px] h-[170px]", mandala: 200 },
  md: { container: "w-[180px] h-[220px]", mandala: 260 },
  lg: { container: "w-[280px] h-[340px]", mandala: 420 },
  hero: { container: "w-[320px] md:w-[380px] h-[400px] md:h-[460px]", mandala: 560 },
}

export default function SageImage({ className = "", size = "hero", showMandala = true }: SageImageProps) {
  const s = sizeMap[size]
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <SageIcon className={`${s.container} text-[#c9a96e] ${className}`} opacity={0.85} />
  }

  return (
    <div className={`relative flex items-center justify-center ${s.container} ${className} mx-auto`}>
      {/* Tai Chi mandala — integrated behind the sage */}
      {showMandala && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', opacity: 0.12 }}>
            <circle cx="100" cy="100" r="96" fill="none" stroke="#c9a96e" strokeWidth="1" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="#c9a96e" strokeWidth="0.4" opacity="0.5" />
            <path d="M100 4 A96 96 0 0 1 100 196 A48 48 0 0 1 100 100 A48 48 0 0 0 100 4" fill="#c9a96e" />
            <circle cx="100" cy="52" r="10" fill="#0a0a0f" />
            <circle cx="100" cy="148" r="10" fill="#c9a96e" />
          </svg>
        </div>
      )}

      {/* Trigrams on outer ring — only for hero */}
      {showMandala && size === "hero" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {["☰","☷","☵","☲","☳","☶","☴","☱"].map((tri, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180)
            const r = 94
            const cx = 100 + r * Math.cos(angle)
            const cy = 100 + r * Math.sin(angle)
            return (
              <div
                key={i}
                className="absolute text-[#c9a96e]"
                style={{
                  left: `${cx / 2}%`, top: `${cy / 2}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: 'max(12px, 2.5vmin)',
                  opacity: 0.2,
                }}
              >{tri}</div>
            )
          })}
        </div>
      )}

      {/* Golden halo glow */}
      <div className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse 50% 45% at 50% 40%, rgba(201,169,110,0.08) 0%, transparent 70%)',
          filter: 'blur(3px)',
        }}
      />

      {/* Sage image with circular mask */}
      <div className="relative w-3/4 h-4/5 z-10">
        <div
          className="w-full h-full"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 48% 46% at 50% 42%, black 35%, black 55%, transparent 85%)',
            maskImage: 'radial-gradient(ellipse 48% 46% at 50% 42%, black 35%, black 55%, transparent 85%)',
          }}
        >
          <Image
            src="/images/sage-clean.png"
            alt="The Ancient Sage"
            fill
            className="object-contain"
            priority
            sizes="320px"
            onError={() => setImgError(true)}
          />
        </div>
      </div>

      {/* Inner shadow to blend edges */}
      <div className="absolute inset-0 rounded-full pointer-events-none z-20"
        style={{
          boxShadow: 'inset 0 0 40px 25px #0a0a0f',
        }}
      />
    </div>
  )
}
