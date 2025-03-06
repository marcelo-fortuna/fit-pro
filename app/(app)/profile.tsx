import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';

export default function Profile() {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/');
    } catch (err) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'settings':
        Alert.alert('Coming Soon', 'Settings will be available in the next update');
        break;
      case 'payment':
        Alert.alert('Coming Soon', 'Payment methods will be available in the next update');
        break;
      case 'help':
        Alert.alert('Coming Soon', 'Help & Support will be available in the next update');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.email}>sarah@example.com</Text>
      </View>

      <View style={styles.subscription}>
        <Text style={styles.subscriptionTitle}>Current Plan</Text>
        <View style={styles.planCard}>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>Premium Monthly</Text>
            <Text style={styles.planPrice}>$19.99/month</Text>
          </View>
          <Text style={styles.planExpiry}>Expires on Feb 28, 2024</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <Pressable style={styles.menuItem} onPress={() => handleNavigation('settings')}>
          <Ionicons name="settings-outline" size={24} color="#0f172a" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#64748b" />
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => handleNavigation('payment')}>
          <Ionicons name="card-outline" size={24} color="#0f172a" />
          <Text style={styles.menuText}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={24} color="#64748b" />
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => handleNavigation('help')}>
          <Ionicons name="help-circle-outline" size={24} color="#0f172a" />
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#64748b" />
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  profile: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
  },
  subscription: {
    padding: 24,
    paddingTop: 0,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 16,
    color: '#0f172a',
  },
  planExpiry: {
    fontSize: 14,
    color: '#64748b',
  },
  menu: {
    padding: 24,
    paddingTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    margin: 24,
    padding: 16,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});