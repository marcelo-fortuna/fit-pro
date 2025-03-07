/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `subscription_status` (text)
      - `subscription_end_date` (timestamp)
      - `quiz_completed` (boolean)
    - `quiz_responses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `responses` (jsonb)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create users table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT auth.uid(),
    email text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    subscription_status text DEFAULT 'inactive',
    subscription_end_date timestamptz,
    quiz_completed boolean DEFAULT false,
    CONSTRAINT users_auth_fk FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS for users if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create quiz_responses table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS quiz_responses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    responses jsonb NOT NULL
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS for quiz_responses if not already enabled
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own data" ON users;
  DROP POLICY IF EXISTS "Users can update own data" ON users;
  DROP POLICY IF EXISTS "Users can insert own quiz responses" ON quiz_responses;
  DROP POLICY IF EXISTS "Users can read own quiz responses" ON quiz_responses;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for quiz_responses table
CREATE POLICY "Users can insert own quiz responses"
  ON quiz_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own quiz responses"
  ON quiz_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);