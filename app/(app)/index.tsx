import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'react-native';
import { useTranslation } from '../../utils/i18n';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

type UserData = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  subscription_status: string;
  subscription_end_date: string | null;
  profile_image_url: string | null;
};

// Função para determinar a saudação com base na hora
const getGreeting = (hour: number): string => {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
};

export default function Home() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState(() => {
    const currentHour = new Date().getHours();
    return getGreeting(currentHour);
  });

  useEffect(() => {
    fetchUserData();
    // Atualiza a saudação periodicamente
    const interval = setInterval(() => {
      const currentHour = new Date().getHours();
      setGreeting(prev => {
        const newGreeting = getGreeting(currentHour);
        return newGreeting !== prev ? newGreeting : prev;
      });
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserData(profile);
    } catch (err) {
      console.error('Error fetching User Data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{t(`screens.home.${greeting}`)}, {userData?.first_name}</Text>
        <Text style={styles.title}>{t('screens.home.practice')}</Text>
      </View>

      <View style={styles.todayWorkout}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800' }}
          style={styles.workoutImage}
        />
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutTitle}>Today's Workout</Text>
          <Text style={styles.workoutDuration}>45 min • Intermediate</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Programs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.programsList}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.programCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800' }}
                style={styles.programImage}
              />
              <Text style={styles.programTitle}>Core Strength</Text>
              <Text style={styles.programDuration}>8 weeks</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
  greeting: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  todayWorkout: {
    margin: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutImage: {
    width: '100%',
    height: 200,
  },
  workoutInfo: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  programsList: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  programCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  programImage: {
    width: '100%',
    height: 120,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    paddingBottom: 4,
  },
  programDuration: {
    fontSize: 14,
    color: '#64748b',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});