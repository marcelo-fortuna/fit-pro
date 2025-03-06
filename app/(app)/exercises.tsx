import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Image } from 'react-native';
import { useState } from 'react';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const CATEGORIES = ['All', 'Core', 'Arms', 'Legs', 'Back', 'Full Body'];

export default function Exercises() {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleExercisePress = () => {
    Alert.alert('Coming Soon', 'Exercise details will be available in the next update');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercises Library</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filters}
      >
        {LEVELS.map((level) => (
          <Pressable
            key={level}
            style={[
              styles.filterChip,
              selectedLevel === level && styles.filterChipActive,
            ]}
            onPress={() => setSelectedLevel(level)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedLevel === level && styles.filterChipTextActive,
              ]}
            >
              {level}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filters}
      >
        {CATEGORIES.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.filterChip,
              selectedCategory === category && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedCategory === category && styles.filterChipTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.exercisesList}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Pressable 
            key={item} 
            style={styles.exerciseCard}
            onPress={handleExercisePress}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800' }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>The Hundred</Text>
              <Text style={styles.exerciseLevel}>Beginner</Text>
            </View>
          </Pressable>
        ))}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  filters: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#0f172a',
  },
  filterChipText: {
    fontSize: 14,
    color: '#64748b',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  exercisesList: {
    padding: 24,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exerciseImage: {
    width: 100,
    height: 100,
  },
  exerciseInfo: {
    flex: 1,
    padding: 16,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseLevel: {
    fontSize: 14,
    color: '#64748b',
  },
});