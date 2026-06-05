import { NextRequest, NextResponse } from 'next/server'
import { calculateDailyHexagram } from '@/lib/daily-hexagram'
import { getAIReading } from '@/lib/deepseek'
import { getHexagramById } from '@/data/hexagrams'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const baziSummary = searchParams.get('bazi') || ''
    const lifeHexId = searchParams.get('lifeHex') || ''

    // Calculate today's hexagram
    const daily = calculateDailyHexagram()
    const mainHex = getHexagramById(daily.hexagramId)
    const changingHex = getHexagramById(daily.changingHexagramId)

    // Build prompt
    const prompt = `Today's I Ching Reading:

Daily Hexagram: #${daily.hexagramId} — ${mainHex?.nameEn || 'Unknown'} (${mainHex?.nameZh || ''})
${mainHex?.description || ''}
Changing Line: ${daily.changingLine}
→ Transforms to Hexagram #${daily.changingHexagramId} — ${changingHex?.nameEn || 'Unknown'} (${changingHex?.nameZh || ''})
${changingHex?.description || ''}

${lifeHexId ? `My Life Hexagram: #${lifeHexId}` : ''}
${baziSummary ? `My BaZi essence: ${baziSummary}` : ''}

Write a short daily reflection in 250-350 words.

Use this structure:
### Today's Pattern
Describe the tone of the day through the hexagram.

### What to Notice
Name one inner pattern, tension, or opportunity for reflection.

### One Clear Step
Give one small action the seeker can take today.

Tone: warm, grounded, and practical. Do not predict exact events. Do not sound like a generic horoscope.`

    const aiResponse = await getAIReading(prompt)

    return NextResponse.json({
      daily: {
        hexagramId: daily.hexagramId,
        changingLine: daily.changingLine,
        changingHexagramId: daily.changingHexagramId,
        mainHexagram: {
          id: mainHex?.id,
          nameZh: mainHex?.nameZh,
          nameEn: mainHex?.nameEn,
          description: mainHex?.description,
          element: mainHex?.element,
          keywords: mainHex?.keywords,
        },
        changingHexagram: changingHex ? {
          id: changingHex.id,
          nameZh: changingHex.nameZh,
          nameEn: changingHex.nameEn,
          description: changingHex.description,
          element: changingHex.element,
        } : null,
      },
      reading: aiResponse,
    })
  } catch (error) {
    console.error('Daily reading API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate daily reading' },
      { status: 500 }
    )
  }
}
