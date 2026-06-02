import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe | null {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key.includes("placeholder") || key.includes("your_")) return null
  _stripe = new Stripe(key)
  return _stripe
}

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || "price_xxx"
export const PRO_MONTHLY_PRICE = 699
