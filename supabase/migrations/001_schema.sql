-- I Ching App Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles (extends Supabase auth.users)
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  birth_year INT NOT NULL,
  birth_month INT NOT NULL,
  birth_day INT NOT NULL,
  birth_hour INT NOT NULL,
  bazi_year_pillar TEXT NOT NULL,
  bazi_month_pillar TEXT NOT NULL,
  bazi_day_pillar TEXT NOT NULL,
  bazi_hour_pillar TEXT NOT NULL,
  five_elements JSONB NOT NULL DEFAULT '{}',
  life_hexagram_id INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Readings history
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('daily', 'coin', 'monthly')),
  hexagram_id INT NOT NULL,
  changing_hexagram_id INT,
  question TEXT,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Daily free reading count
CREATE TABLE daily_free_count (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INT NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, date)
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'past_due', 'canceled')),
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_readings_user_id ON readings(user_id);
CREATE INDEX idx_readings_created_at ON readings(created_at DESC);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_free_count ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only read/write their own data
CREATE POLICY "Users read own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users read own readings" ON readings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own readings" ON readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own daily count" ON daily_free_count
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own daily count" ON daily_free_count
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own daily count" ON daily_free_count
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users read own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Function to check if user can read today
CREATE OR REPLACE FUNCTION can_read_today(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  is_pro BOOLEAN;
  free_count INT;
BEGIN
  -- Check if user has active pro subscription
  SELECT EXISTS (
    SELECT 1 FROM subscriptions
    WHERE user_id = user_uuid
      AND status = 'active'
      AND plan = 'pro'
      AND (current_period_end IS NULL OR current_period_end > NOW())
  ) INTO is_pro;

  IF is_pro THEN
    RETURN TRUE;
  END IF;

  -- Check free daily count
  SELECT count INTO free_count FROM daily_free_count
  WHERE user_id = user_uuid AND date = CURRENT_DATE;

  RETURN COALESCE(free_count, 0) < 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
