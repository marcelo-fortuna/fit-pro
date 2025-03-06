/*
  # Create users table with admin functionality

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `subscription_status` (text)
      - `subscription_end_date` (timestamp)
      - `quiz_completed` (boolean)
      - `is_admin` (boolean)

  2. Security
    - Enable RLS on users table
    - Add policies for admin access
    - Add policies for user access

  3. Initial Data
    - Create initial admin users
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  subscription_status text DEFAULT 'inactive',
  subscription_end_date timestamptz,
  quiz_completed boolean DEFAULT false,
  is_admin boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (is_admin = true);

CREATE POLICY "Admins can update all users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (is_admin = true);

-- Create policy for users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policy for users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Insert initial admin users
INSERT INTO users (email, is_admin, subscription_status)
VALUES 
  ('admin1@pilates.com', true, 'active'),
  ('admin2@pilates.com', true, 'active')
ON CONFLICT (email) DO UPDATE
SET is_admin = true;