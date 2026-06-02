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

      {/* Sage image — tight mask, object-contain to avoid edge stretching */}
      <div className="relative w-full h-full overflow-hidden rounded-full">
        <div
          className="w-full h-full"
          style={{
            maskImage: 'radial-gradient(ellipse 40% 38% at 50% 42%, black 25%, black 42%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(ellipse 40% 38% at 50% 42%, black 25%, black 42%, transparent 68%)',
          }}
        >
          <Image
            src="/images/sage-clean.png"
            alt="The Ancient Sage"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 320px, 400px"
            onError={() => setImgError(true)}
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
      </div>

      {/* Multiple edge blend layers for complete border removal */}
      <div className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          boxShadow: `
            inset 0 0 80px 50px #0a0a0f,
            inset 0 0 40px 20px #0a0a0f,
            inset 0 0 15px 10px #0a0a0f
          `,
        }}
      />
      {/* Extra dark ring at the very edge */}
      <div className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          border: '15px solid #0a0a0f',
          opacity: 0.9,
        }}
      />
    </div>
  )
}
