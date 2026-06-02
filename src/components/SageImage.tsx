"use client"

import { useState } from "react"
import Image from "next/image"
import SageIcon from "@/components/SageIcon"

interface SageImageProps {
  className?: string
  size?: "sm" | "md" | "lg" | "hero"
}

const sizeMap = {
  sm: { className: "w-24 h-28", scale: 1.2 },
  md: { className: "w-28 h-36", scale: 1.15 },
  lg: { className: "w-56 h-72", scale: 1.1 },
  hero: { className: "w-64 h-80 md:w-80 md:h-[380px]", scale: 1.08 },
}

export default function SageImage({ className = "", size = "hero" }: SageImageProps) {
  const s = sizeMap[size]
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <SageIcon className={`${s.className} text-[#c9a96e] ${className}`} opacity={0.85} />
  }

  return (
    <div className={`relative ${s.className} ${className} mx-auto`}>
      {/* Outer glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '130%',
          height: '130%',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Image with smooth oval fade mask */}
      <div
        className="relative w-full h-full overflow-hidden rounded-full"
        style={{
          WebkitMaskImage: `
            radial-gradient(ellipse 48% 45% at 50% 40%, black 40%, black 58%, transparent 85%)
          `,
          maskImage: `
            radial-gradient(ellipse 48% 45% at 50% 40%, black 40%, black 58%, transparent 85%)
          `,
        }}
      >
        <Image
          src="/images/sage-clean.png"
          alt="The Ancient Sage"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 320px, 600px"
          onError={() => setImgError(true)}
          style={{
            transform: `scale(${s.scale})`,
            objectPosition: 'center 30%',
          }}
        />
      </div>

      {/* Edge blend — fades outer edges into page background */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          boxShadow: 'inset 0 0 60px 30px #0a0a0f',
        }}
      />
    </div>
  )
}
