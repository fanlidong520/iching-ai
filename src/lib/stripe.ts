import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || "price_xxx"
export const PRO_MONTHLY_PRICE = 699 // $6.99 in cents
