/*
  # Create booking attempts tracking table

  1. New Tables
    - `booking_attempts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `provider_id` (text)
      - `provider_name` (text)
      - `booking_type` (text)
      - `search_data` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `booking_attempts` table
    - Add policy for users to read/write their own booking attempts
*/

CREATE TABLE IF NOT EXISTS booking_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id text NOT NULL,
  provider_name text NOT NULL,
  booking_type text NOT NULL CHECK (booking_type IN ('flight', 'hotel', 'tour')),
  search_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own booking attempts"
  ON booking_attempts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_booking_attempts_user_id ON booking_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_booking_attempts_provider_id ON booking_attempts(provider_id);
CREATE INDEX IF NOT EXISTS idx_booking_attempts_created_at ON booking_attempts(created_at);