import { createClient, SupabaseClient } from "@supabase/supabase-js"

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  if (!url || url.includes("your_supabase_url")) {
    return ""
  }
  return url
}

function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
}

// Client-side Supabase client (lazy, only if configured)
let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()
  if (!url || !key) return null
  _client = createClient(url, key)
  return _client
}

// Server-side Supabase client (for API routes)
export function getServiceSupabase(): SupabaseClient | null {
  const url = getSupabaseUrl()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  if (!url || !serviceKey || serviceKey.includes("your_")) return null
  return createClient(url, serviceKey)
}
