"use client"

import { useState } from "react"
import Image from "next/image"
import SageIcon from "@/components/SageIcon"

interface SageImageProps {
  className?: string
  size?: "sm" | "md" | "lg" | "hero"
}

const sizeMap = {
  sm: 120,
  md: 160,
  lg: 320,
  hero: 380,
}

export default function SageImage({ className = "", size = "hero" }: SageImageProps) {
  const d = sizeMap[size]
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <SageIcon className={`text-[#c9a96e] ${className}`} opacity={0.85} />
  }

  return (
    <div className={`relative mx-auto ${className}`} style={{ width: d, height: d }}>
      {/* Outer glow ring */}
      <div className="absolute -inset-[15%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 55%, rgba(201,169,110,0.02) 75%, transparent 100%)',
        }}
      />

      {/* Thin golden frame ring — the "inlaid cameo" border */}
      <div className="absolute -inset-[2%] rounded-full border border-[#c9a96e]/15"
        style={{ boxShadow: '0 0 30px rgba(201,169,110,0.08), inset 0 0 15px rgba(201,169,110,0.04)' }}
      />

      {/* Inner shadow — fades image edges into the frame */}
      <div className="absolute inset-0 rounded-full overflow-hidden"
        style={{ boxShadow: 'inset 0 0 60px 25px #0a0a0f' }}>
        <Image
          src="/images/sage-clean.png"
          alt="The Ancient Sage"
          width={d}
          height={d}
          className="object-cover relative"
          priority
          onError={() => setImgError(true)}
          style={{ objectPosition: 'center 25%' }}
        />
      </div>

      {/* Inner glow on top for depth */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, transparent 55%, rgba(10,10,15,0.3) 75%, rgba(10,10,15,0.7) 95%)',
        }}
      />
    </div>
  )
}
