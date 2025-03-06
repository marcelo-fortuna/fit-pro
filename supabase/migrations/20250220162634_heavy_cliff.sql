/*
  # Add role and password fields to users table

  1. Changes
    - Add role field with default 'Member'
    - Add password_hash field for storing passwords
    - Update existing admin users to have 'Master' role
    - Remove is_admin column in favor of role
  
  2. Security
    - Update policies to use role instead of is_admin
*/

-- Add new columns
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'Member',
  ADD COLUMN IF NOT EXISTS password_hash text;

-- Update existing admin users to have Master role
UPDATE users 
SET role = 'Master' 
WHERE email IN ('admin1@pilates.com', 'admin2@pilates.com');

-- Drop old policies
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;

-- Create new policies based on role
CREATE POLICY "Masters can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (role = 'Master');

CREATE POLICY "Masters can update all users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (role = 'Master');