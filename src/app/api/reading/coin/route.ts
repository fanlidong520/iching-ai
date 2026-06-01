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

    // Build prompt
    const prompt = `A seeker asks: "${question}"

I cast three coins six times and received this oracle:

${formatCoinHexagramForPrompt(coinResult)}

Main Hexagram: #${coinResult.hexagramId} — ${mainHex?.nameEn || 'Unknown'} (${mainHex?.nameZh || ''})
${mainHex?.description || ''}

${changingHex ? `The changing lines reveal Hexagram #${coinResult.changingHexagramId} — ${changingHex.nameEn} (${changingHex.nameZh})
${changingHex.description}` : 'No changing lines — the hexagram is stable, meaning the situation is settled.'}

${lifeHexId ? `The seeker's Life Hexagram is #${lifeHexId}.` : ''}
${baziSummary ? `The seeker's elemental nature: ${baziSummary}` : ''}

Please provide guidance for this seeker. Address their question with the wisdom of the I Ching. What does the oracle reveal about their situation? What should they consider? Give them warmth, insight, and a gentle push toward clarity.`

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
