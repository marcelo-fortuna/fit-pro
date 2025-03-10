import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/i18n';
import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function Quiz() {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions = Object.keys(t('quiz.questions', { returnObjects: true })); // Obtém todas as chaves das perguntas
  const totalQuestions = questions.length;

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion]]: answer,
    }));

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', t('validations.emailValid'));
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Error', t('validations.notExpectedCharPassword'));
      return;
    }

    try {
      setLoading(true);

      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
        }
      );

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('No user data returned');

      // Salvar perfil do usuário
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email,
          quiz_completed: true,
        },
      ]);
      if (profileError) throw profileError;

      // Salvar respostas do quiz
      const { error: quizError } = await supabase
        .from('quiz_responses')
        .insert([
          {
            user_id: authData.user.id,
            responses: answers,
          },
        ]);
      if (quizError) throw quizError;

      // Redirecionar para completar perfil
      router.replace({
        pathname: '/complete-profile',
        params: { userId: authData.user.id },
      });
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : t('err.registerFailed')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {!quizCompleted ? (
        <View style={styles.quizContainer}>
          <Text style={styles.progressText}>
            {currentQuestion + 1} de {totalQuestions}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.questionText}>
            {t(`quiz.questions.${questions[currentQuestion]}.text`)}
          </Text>

          <View style={styles.optionsContainer}>
            {t(`quiz.questions.${questions[currentQuestion]}.options`, {
              returnObjects: true,
            }).map((option: string) => (
              <Pressable
                key={option}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>{t('register.title')}</Text>
          <Text style={styles.subtitle}>{t('register.subtitle')}</Text>

          <TextInput
            style={styles.input}
            placeholder={t('register.email')}
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder={t('register.password')}
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? t('register.creatingAccount') : t('register.createAccount')}
            </Text>
          </Pressable>

          <Pressable
            style={styles.loginLink}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginLinkText}>
              {t('register.loginText')}
            </Text>
          </Pressable>
        </View>
      )}
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
  quizContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#0f766e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0f766e',
    borderRadius: 2,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0f766e',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  optionText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '500',
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
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#0f766e',
    fontSize: 14,
    fontWeight: '500',
  },
});
