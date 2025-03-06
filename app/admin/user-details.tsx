import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '../../utils/supabase';

type User = {
  id: string;
  email: string;
  subscription_status: string;
  subscription_end_date: string | null;
  created_at: string;
};

export default function UserDetails() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const extendSubscription = async (months: number) => {
    try {
      const newEndDate = user?.subscription_end_date
        ? new Date(user.subscription_end_date)
        : new Date();
      
      newEndDate.setMonth(newEndDate.getMonth() + months);

      const { error } = await supabase
        .from('users')
        .update({
          subscription_status: 'active',
          subscription_end_date: newEndDate.toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;

      Alert.alert('Success', 'Subscription extended successfully');
      fetchUserDetails();
    } catch (err) {
      Alert.alert('Error', 'Failed to extend subscription');
    }
  };

  const cancelSubscription = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          subscription_status: 'cancelled',
        })
        .eq('id', userId);

      if (error) throw error;

      Alert.alert('Success', 'Subscription cancelled successfully');
      fetchUserDetails();
    } catch (err) {
      Alert.alert('Error', 'Failed to cancel subscription');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error || 'User not found'}</Text>
        <Pressable 
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={[
          styles.status,
          user.subscription_status === 'active' ? styles.activeStatus : styles.inactiveStatus
        ]}>
          {user.subscription_status}
        </Text>

        <Text style={styles.label}>Subscription End Date</Text>
        <Text style={styles.value}>
          {user.subscription_end_date || 'No active subscription'}
        </Text>

        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>
          {new Date(user.created_at).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <Text style={styles.sectionTitle}>Subscription Management</Text>
        
        <View style={styles.buttonGroup}>
          <Pressable 
            style={[styles.button, styles.extendButton]}
            onPress={() => extendSubscription(1)}
          >
            <Text style={styles.buttonText}>Extend 1 Month</Text>
          </Pressable>

          <Pressable 
            style={[styles.button, styles.extendButton]}
            onPress={() => extendSubscription(3)}
          >
            <Text style={styles.buttonText}>Extend 3 Months</Text>
          </Pressable>

          <Pressable 
            style={[styles.button, styles.extendButton]}
            onPress={() => extendSubscription(6)}
          >
            <Text style={styles.buttonText}>Extend 6 Months</Text>
          </Pressable>

          <Pressable 
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              Alert.alert(
                'Cancel Subscription',
                'Are you sure you want to cancel this subscription?',
                [
                  { text: 'No', style: 'cancel' },
                  { text: 'Yes', style: 'destructive', onPress: cancelSubscription }
                ]
              );
            }}
          >
            <Text style={styles.buttonText}>Cancel Subscription</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  activeStatus: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  inactiveStatus: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  actions: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  extendButton: {
    backgroundColor: '#0f172a',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
});