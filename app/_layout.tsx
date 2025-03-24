import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
// import { setupI18n } from '../utils/i18n';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../utils/supabase';
import { LanguageProvider } from '@/utils/i18n';

// setupI18n();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.replace('/(auth)');
      } else {
        const { data: profile, error } = await supabase
          .from('users')
          .select('first_name, last_name, birth_date, profile_completed')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (!profile?.profile_completed) {
          router.replace({
            pathname: '/complete-profile',
            params: { userId: session.user.id }
          });
        } else {
          router.replace('/(app)');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.replace('/(auth)');
    }
  };

  return (
    <LanguageProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
      }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="admin" />
        <Stack.Screen name="complete-profile" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </LanguageProvider>
  );
}