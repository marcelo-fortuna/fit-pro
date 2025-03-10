import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { View } from 'react-native';

export default function AppLayout() {
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
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: ({ size, color }) => (
            <Icon name="fitness" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}