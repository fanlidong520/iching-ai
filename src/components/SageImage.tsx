"use client"

import { useState } from "react"
import Image from "next/image"
import SageIcon from "@/components/SageIcon"

interface SageImageProps {
  className?: string
  size?: "sm" | "md" | "lg" | "hero"
}

const sizeMap = {
  sm: "w-24 h-28",
  md: "w-28 h-36",
  lg: "w-56 h-72",
  hero: "w-64 h-80 md:w-80 md:h-96",
}

export default function SageImage({ className = "", size = "hero" }: SageImageProps) {
  const s = sizeMap[size]
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <SageIcon className={`${s} text-[#c9a96e] ${className}`} opacity={0.85} />
  }

  return (
    <div className={`relative ${s} ${className} mx-auto`}>
      {/* Golden glow behind sage */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '140%',
          height: '140%',
          background: 'radial-gradient(ellipse 50% 45% at 50% 42%, rgba(201,169,110,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Sage image with smooth edge fade */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            maskImage: 'radial-gradient(ellipse 48% 46% at 50% 42%, black 30%, black 52%, transparent 82%)',
            WebkitMaskImage: 'radial-gradient(ellipse 48% 46% at 50% 42%, black 30%, black 52%, transparent 82%)',
          }}
        >
          <Image
            src="/images/sage-clean.png"
            alt="The Ancient Sage"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 320px, 400px"
            onError={() => setImgError(true)}
            style={{ objectPosition: 'center 28%' }}
          />
        </div>
      </div>

      {/* Edge blend — inset shadow to merge with background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 50px 30px #0a0a0f',
        }}
      />
    </div>
  )
}
