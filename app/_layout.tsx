import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { setupI18n } from '../utils/i18n';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../utils/supabase';

setupI18n();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Check auth state and redirect accordingly
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // If no session, redirect to auth
        router.replace('/(auth)');
      }
    });

    // Subscribe to auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/(auth)');
      }
    });
  }, []);

  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
      }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}