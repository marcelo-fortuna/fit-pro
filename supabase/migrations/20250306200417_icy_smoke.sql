/*
  # Add user profile fields

  1. Changes
    - Add first_name, last_name, and birth_date columns to users table
    - Add profile_completed flag to track completion status
  
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS birth_date date,
ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false;