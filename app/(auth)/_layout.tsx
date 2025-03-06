import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';

export default function AuthLayout() {
  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(app)');
      }
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="set-password" />
    </Stack>
  );
}