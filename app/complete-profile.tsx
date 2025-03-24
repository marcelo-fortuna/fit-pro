import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useTranslation } from '../utils/i18n';
import { format, isValid, parse } from 'date-fns';
import { enUS, ptBR, es } from 'date-fns/locale';
import { MaskedTextInput } from "react-native-mask-text";

const localeFormats = {
  en: {
    display: 'MM/dd/yyyy',
    locale: enUS,
  },
  pt: {
    display: 'dd/MM/yyyy',
    locale: ptBR,
  },
  es: {
    display: 'dd/MM/yyyy',
    locale: es,
  },
};

export default function CompleteProfile() {
  const { t, locale } = useTranslation();
  const { userId } = useLocalSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    birthDate?: string;
  }>({});

  const currentLocale = locale in localeFormats ? locale : 'en';
  const dateFormat = localeFormats[currentLocale as keyof typeof localeFormats].display;

  const validateDate = (dateStr: string): Date | null => {
    const parsedDate = parse(dateStr, dateFormat, new Date(), {
      locale: localeFormats[currentLocale as keyof typeof localeFormats].locale,
    });

    if (!isValid(parsedDate)) return null;

    // Check if the date is not in the future and not too far in the past (e.g., 120 years ago)
    const now = new Date();
    const minDate = new Date();
    minDate.setFullYear(now.getFullYear() - 120);

    if (parsedDate > now || parsedDate < minDate) return null;

    return parsedDate;
  };

  const formatDateForDB = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = t('validations.required');
    }

    if (!lastName.trim()) {
      newErrors.lastName = t('validations.required');
    }

    if (!birthDate.trim()) {
      newErrors.birthDate = t('validations.required');
    } else {
      const validDate = validateDate(birthDate);
      if (!validDate) {
        newErrors.birthDate = t('validations.invalidDate');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const validDate = validateDate(birthDate);
      if (!validDate) {
        setErrors({ ...errors, birthDate: t('validations.invalidDate') });
        return;
      }

      const formattedDate = formatDateForDB(validDate);

      const { error } = await supabase
        .from('users')
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          birth_date: formattedDate,
          profile_completed: true
        })
        .eq('id', userId);

      if (error) throw error;

      router.replace('/(app)');
    } catch (error) {
      console.error('Profile completion error:', error);
      Alert.alert(
        t('errors.title'),
        t('errors.profileUpdate')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('completeProfile.title')}</Text>
        <Text style={styles.subtitle}>{t('completeProfile.subtitle')}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder={t('completeProfile.firstName')}
            placeholderTextColor="#94a3b8"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setErrors({ ...errors, firstName: undefined });
            }}
            autoCapitalize="words"
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder={t('completeProfile.lastName')}
            placeholderTextColor="#94a3b8"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setErrors({ ...errors, lastName: undefined });
            }}
            autoCapitalize="words"
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <MaskedTextInput
            mask="99/99/9999"
            style={[styles.input, errors.birthDate && styles.inputError]}
            placeholder={`${t('completeProfile.birthDate')} (${dateFormat})`}
            placeholderTextColor="#94a3b8"
            value={birthDate}
            onChangeText={(text) => {
              setBirthDate(text);
              setErrors({ ...errors, birthDate: undefined });
            }}
            keyboardType="numeric"
          />
          {errors.birthDate && (
            <Text style={styles.errorText}>{errors.birthDate}</Text>
          )}
        </View>

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
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    color: '#0f172a',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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