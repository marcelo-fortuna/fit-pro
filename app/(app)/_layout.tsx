import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { View } from 'react-native';
import { useTranslation } from '@/utils/i18n';

export default function AppLayout() {
  const { t } = useTranslation();
  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/(auth)');
      }
    });
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <View style={{ marginRight: 16 }}>
            <LanguageSwitcher />
          </View>
        ),
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t(`tabs.home`),
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: t(`tabs.exercises`),
          tabBarIcon: ({ size, color }) => (
            <Icon name="fitness" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t(`tabs.profile`),
          tabBarIcon: ({ size, color }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}