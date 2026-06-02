"use client"

import { useState } from "react"
import Image from "next/image"
import SageIcon from "@/components/SageIcon"

interface SageImageProps {
  className?: string
  size?: "sm" | "md" | "lg" | "hero"
}

const sizeMap = {
  sm: { w: 96, h: 120 },
  md: { w: 140, h: 176 },
  lg: { w: 280, h: 352 },
  hero: { w: 320, h: 400 },
}

export default function SageImage({ className = "", size = "hero" }: SageImageProps) {
  const s = sizeMap[size]
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <SageIcon className={`w-64 h-80 text-[#c9a96e] ${className}`} opacity={0.85} />
  }

  return (
    <div className={`relative mx-auto ${className}`} style={{ width: s.w, height: s.h }}>
      {/* Gentle golden glow far behind */}
      <div
        className="absolute"
        style={{
          top: '-10%', left: '-10%', width: '120%', height: '120%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
        }}
      />
      <Image
        src="/images/sage-clean.png"
        alt="The Ancient Sage"
        width={s.w}
        height={s.h}
        className="object-contain relative z-10"
        priority
        onError={() => setImgError(true)}
        style={{ filter: 'drop-shadow(0 0 20px rgba(201,169,110,0.15))' }}
      />
    </div>
  )
}
