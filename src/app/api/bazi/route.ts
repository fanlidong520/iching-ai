import { NextRequest, NextResponse } from 'next/server'
import { calculateBaZi, formatBaZiForPrompt, BaZiChart } from '@/lib/bazi'
import { formatLifeHexagram } from '@/lib/life-hexagram'
import { getAIReading } from '@/lib/deepseek'
import { getHexagramById } from '@/data/hexagrams'

export async function POST(request: NextRequest) {
  try {
    const { year, month, day, hour } = await request.json()

    if (!year || !month || !day || hour === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: year, month, day, hour' },
        { status: 400 }
      )
    }

    // 1. Calculate BaZi chart
    const baziChart: BaZiChart = calculateBaZi(year, month, day, hour)

    // 2. Calculate life hexagram
    const lifeHex = formatLifeHexagram(year, month, day)
    const lifeHexData = getHexagramById(lifeHex.hexagramId)

    // 3. Generate AI reading for life destiny overview
    const prompt = `I was born on ${year}-${month}-${day} at ${hour}:00.

My BaZi (Eight Characters / Four Pillars of Destiny):

${formatBaZiForPrompt(baziChart)}

My Life Hexagram (本命卦): ${lifeHex.description}
${lifeHexData ? `— "${lifeHexData.nameEn}" (${lifeHexData.nameZh}): ${lifeHexData.description}` : ''}

Please give me a warm, insightful overview of my innate tendencies, strengths, and life path based on my BaZi chart and Life Hexagram. Help me understand who I am at my core and what the universe whispers about my journey.`

    const aiResponse = await getAIReading(prompt)

    return NextResponse.json({
      bazi: {
        yearPillar: baziChart.yearPillar,
        monthPillar: baziChart.monthPillar,
        dayPillar: baziChart.dayPillar,
        hourPillar: baziChart.hourPillar,
        fiveElements: baziChart.fiveElements,
      },
      lifeHexagram: {
        id: lifeHex.hexagramId,
        nameZh: lifeHexData?.nameZh,
        nameEn: lifeHexData?.nameEn,
        description: lifeHexData?.description,
        element: lifeHexData?.element,
      },
      reading: aiResponse,
    })
  } catch (error) {
    console.error('BaZi API error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate BaZi chart' },
      { status: 500 }
    )
  }
}
