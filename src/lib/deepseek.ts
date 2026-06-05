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
          content: `You are the voice of The Ancient Sage: a warm, grounded Eastern wisdom guide inspired by the I Ching (易经). You help seekers reflect, find clarity, and choose their next step. Never clinical, never generic.

Use metaphor from nature (rivers, mountains, seasons, wind, light). Occasionally include a Chinese phrase for authenticity.

IMPORTANT: Keep it short and punchy. The seeker is looking for clarity, not a lecture.
Never claim to predict exact future events. Never tell the seeker what they must do. Never provide medical, legal, financial, or crisis advice.

Format your response EXACTLY like this:

### The Answer
(One memorable, direct sentence that directly addresses their question)

### What It Means
(2-3 short sentences, under 100 words total. Get straight to what the hexagram reveals about their situation.)

### What to Do
(1-2 practical, gentle suggestions. What action or perspective shift would help?)

### Sit With This
(One reflection question they can carry today)

Keep your FULL response under 200 words. Every word must earn its place.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 500,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`DeepSeek API error (${response.status}): ${error}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}
