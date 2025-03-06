/*
  # Add test user

  1. Changes
    - Add a test user for development purposes
*/

INSERT INTO users (email, subscription_status, subscription_end_date)
VALUES (
  'test@fitpro.com',
  'active',
  (CURRENT_TIMESTAMP + INTERVAL '30 days')
)
ON CONFLICT (email) DO NOTHING;