import { NextRequest, NextResponse } from "next/server"
import { getStripe, STRIPE_PRICE_ID } from "@/lib/stripe"
import { getServiceSupabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: "Missing user info" },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    if (!stripe) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 })
    }

    const supabase = getServiceSupabase()
    let customerId: string | undefined

    if (supabase) {
      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", userId)
        .single()
      customerId = existingSub?.stripe_customer_id
    }

    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { userId },
      })
      customerId = customer.id
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: { userId },
      success_url: `${request.nextUrl.origin}/home?checkout=success`,
      cancel_url: `${request.nextUrl.origin}/profile?checkout=canceled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
