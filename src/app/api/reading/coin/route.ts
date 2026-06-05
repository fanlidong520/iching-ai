import { NextRequest, NextResponse } from 'next/server'
import { castCoinHexagram, formatCoinHexagramForPrompt } from '@/lib/coin-hexagram'
import { getAIReading } from '@/lib/deepseek'
import { getHexagramById } from '@/data/hexagrams'

export async function POST(request: NextRequest) {
  try {
    const { question, baziSummary, lifeHexId } = await request.json()

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a question for the oracle' },
        { status: 400 }
      )
    }

    // Cast the coins
    const coinResult = castCoinHexagram()
    const mainHex = getHexagramById(coinResult.hexagramId)
    const changingHex = coinResult.changingHexagramId
      ? getHexagramById(coinResult.changingHexagramId)
      : null

    // Only include birth chart context if user has provided it
    const hasBirthInfo = baziSummary && baziSummary.length > 0
    const personalityContext = hasBirthInfo
      ? `\n\nThe seeker's Life Hexagram is #${lifeHexId}.\nThe seeker's elemental nature: ${baziSummary}\nYou may subtly reference how their personal energy interacts with this hexagram.`
      : `\n\nIMPORTANT: The seeker has NOT shared their birth information. Do NOT mention birth charts, elemental charts, BaZi, five elements, personal celestial blueprints, or any reference to "your chart" or "your elements." Base your reading ONLY on the hexagram and their question.`

    const prompt = `A seeker asks: "${question}"

I cast three coins six times and received this oracle:

${formatCoinHexagramForPrompt(coinResult)}

Main Hexagram: #${coinResult.hexagramId} — ${mainHex?.nameEn || 'Unknown'} (${mainHex?.nameZh || ''})
${mainHex?.description || ''}

${changingHex ? `The changing lines reveal Hexagram #${coinResult.changingHexagramId} — ${changingHex.nameEn} (${changingHex.nameZh})
${changingHex.description}` : 'No changing lines — the hexagram is stable, meaning the situation is settled.'}
${personalityContext}

Write a concise, emotionally intelligent reading in 180-240 words.

Use this structure:
### The Core Message
Give a direct but non-predictive reflection on the seeker's question.

### What This Pattern Reveals
Explain the hexagram as a symbol for their present situation. Do not claim to know the future.

### One Clear Next Step
Offer one practical action or reflection prompt. Do not tell them what they must do.

Tone: warm, grounded, wise, and modern. Avoid sounding like a generic horoscope. Avoid medical, legal, or financial advice.`

    const aiResponse = await getAIReading(prompt)

    return NextResponse.json({
      coinCast: {
        lines: coinResult.lines,
        hexagramId: coinResult.hexagramId,
        changingHexagramId: coinResult.changingHexagramId,
        changingLines: coinResult.changingLines,
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
      question,
      reading: aiResponse,
    })
  } catch (error) {
    console.error('Coin reading API error:', error)
    return NextResponse.json(
      { error: 'Failed to cast oracle' },
      { status: 500 }
    )
  }
}
