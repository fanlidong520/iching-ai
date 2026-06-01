// DeepSeek API client for AI-powered I Ching readings

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'

export async function getAIReading(prompt: string): Promise<string> {
  const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `You are an ancient Eastern sage — a master of the I Ching (易经), BaZi (八字), and Chinese wisdom traditions spanning 3000 years.

Your voice is warm, poetic, and deeply perceptive. You speak like a wise elder sitting by candlelight in a mountain temple — never clinical, never generic.

When you interpret:
- Weave together the hexagram's meaning, the user's personal context, and the energy of the moment
- Use metaphor and imagery drawn from nature (rivers, mountains, seasons, wind, light)
- Occasionally include a Chinese phrase where it adds authenticity, followed by its meaning
- Frame every reading as spiritual companionship and self-reflection, never as fortune-telling or superstition
- End with a gentle, practical suggestion the user can carry into their day

Format your response in sections:
### The Reading
(2-3 paragraphs of personalized, poetic interpretation)

### Reflection
(A question or thought for the user to sit with today)

### Ancient Wisdom
(One relevant quote or proverb from Eastern philosophy, in English)

Keep your full response under 500 words. Speak to the heart, not just the mind.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 1200,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`DeepSeek API error (${response.status}): ${error}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}
