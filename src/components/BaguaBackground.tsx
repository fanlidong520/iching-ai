"use client"

// Subtle scattered Bagua elements as page texture
export default function BaguaBackground() {
  const hexagramNames = [
    "乾","坤","屯","蒙","需","讼","师","比","小畜","履",
    "泰","否","同人","大有","谦","豫","随","蛊","临","观",
    "噬嗑","贲","剥","复","无妄","大畜","颐","大过","坎","离",
    "咸","恒","遁","大壮","晋","明夷","家人","睽","蹇","解",
    "损","益","夬","姤","萃","升","困","井","革","鼎",
    "震","艮","渐","归妹","丰","旅","巽","兑","涣","节",
    "中孚","小过","既济","未济"
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Scattered trigrams */}
      {["☰","☷","☵","☲","☳","☶","☴","☱","☰","☷","☵","☲","☳","☶","☴","☱","☰","☷","☵","☲"].map((tri, i) => {
        const left = ((i * 173 + 37) % 94) + 3
        const top = ((i * 251 + 53) % 92) + 4
        return (
          <div
            key={`tri-${i}`}
            className="absolute text-[#c9a96e]"
            style={{
              left: `${left}%`, top: `${top}%`,
              fontSize: `${14 + (i % 8)}px`,
              opacity: 0.04 + (i % 5) * 0.008,
            }}
          >{tri}</div>
        )
      })}

      {/* Scattered hexagram characters */}
      {hexagramNames.map((char, i) => {
        const left = ((i * 271 + 47) % 93) + 3
        const top = ((i * 359 + 59) % 91) + 5
        return (
          <div
            key={`hex-${i}`}
            className="absolute text-[#c9a96e]"
            style={{
              left: `${left}%`, top: `${top}%`,
              fontSize: `${9 + (i % 4)}px`,
              opacity: 0.02 + (i % 4) * 0.006,
              fontFamily: "'Noto Serif SC', serif",
            }}
          >{char}</div>
        )
      })}
    </div>
  )
}
