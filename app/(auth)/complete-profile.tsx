import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useTranslation } from '../../utils/i18n';

export default function CompleteProfile() {
  const { t } = useTranslation();
  const { userId } = useLocalSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !birthDate) {
      Alert.alert('Error', t('validations.fillAllFields'));
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          birth_date: birthDate,
          profile_completed: true
        })
        .eq('id', userId);

      if (error) throw error;

      router.replace('/(app)');
    } catch (error) {
      console.error('Profile completion error:', error);
      Alert.alert('Erro', error instanceof Error ? error.message : 'Falha ao completar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('completeProfile.title')}</Text>
        <Text style={styles.subtitle}>{t('completeProfile.subtitle')}</Text>

        <TextInput
          style={styles.input}
          placeholder={t('completeProfile.firstName')}
          placeholderTextColor="#94a3b8"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder={t('completeProfile.lastName')}
          placeholderTextColor="#94a3b8"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder={t('completeProfile.birthDate')}
          placeholderTextColor="#94a3b8"
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numeric"
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? t('completeProfile.savingCompleteRegister') : t('completeProfile.completeRegister')}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#0f766e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f766e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    color: '#0f172a',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  button: {
    backgroundColor: '#0f766e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});