import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/i18n';
import React, { useState } from 'react';

const questions = [
  { id: 1, text: "Qual é o seu objetivo com o Pilates?" },
  { id: 2, text: "Quanto tempo por semana você pretende treinar?" },
  { id: 3, text: "Você já praticou Pilates antes?" },
  { id: 4, text: "Você tem alguma lesão ou condição médica?" },
  { id: 5, text: "Prefere exercícios de baixo ou alto impacto?" },
  { id: 6, text: "Qual o seu nível de experiência com exercícios físicos?" },
  { id: 7, text: "Você prefere treinar pela manhã, tarde ou noite?" },
  { id: 8, text: "Tem interesse em exercícios com equipamentos?" },
  { id: 9, text: "Qual sua maior dificuldade ao praticar exercícios?" },
  { id: 10, text: "Você já participou de aulas de grupo?" },
  { id: 11, text: "Quais áreas do corpo deseja fortalecer?" },
  { id: 12, text: "Como você avalia sua flexibilidade atual?" },
  { id: 13, text: "Tem interesse em treinos de reabilitação?" },
  { id: 14, text: "Quantos minutos por dia pretende dedicar?" },
  { id: 15, text: "Já seguiu algum programa de treinos online?" },
  { id: 16, text: "Tem alguma restrição alimentar que impacte no treino?" },
  { id: 17, text: "Prefere exercícios mais dinâmicos ou relaxantes?" },
  { id: 18, text: "Gostaria de acompanhamento profissional?" },
  { id: 19, text: "Você busca melhora na postura?" },
  { id: 20, text: "Tem dores frequentes nas costas ou articulações?" },
  { id: 21, text: "Você costuma se alongar antes ou depois do treino?" },
  { id: 22, text: "Está disposto a testar diferentes tipos de Pilates?" },
  { id: 23, text: "Costuma treinar sozinho ou prefere companhia?" },
  { id: 24, text: "Você deseja monitorar seu progresso no app?" },
  { id: 25, text: "Tem preferência por treinos rápidos ou longos?" },
  { id: 26, text: "Está buscando treinos para melhorar a respiração?" },
  { id: 27, text: "Qual seu nível de motivação para treinar atualmente?" },
  { id: 28, text: "Como gostaria de receber recomendações de treino?" },
  { id: 29, text: "Qual é a sua principal motivação para iniciar o Pilates?" },
];

export default function Quiz() {
  const { t } = useTranslation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSubmitEmail = () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    router.push({ pathname: '/(app)', params: { email, answers: JSON.stringify(answers) } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!quizCompleted ? (
        <View style={styles.quizContainer}>
          <Text style={styles.questionCounter}>
            Pergunta {currentQuestion + 1} de {questions.length}
          </Text>
          <Text style={styles.questionText}>{questions[currentQuestion].text}</Text>

          <View style={styles.optionsContainer}>
            {["Opção A", "Opção B", "Opção C", "Opção D"].map((option) => (
              <Pressable key={option} style={styles.optionButton} onPress={() => handleAnswer(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.emailContainer}>
          <Text >Parabéns por concluir o quiz!</Text>
          <Text >Informe seu e-mail para continuar:</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Pressable style={styles.button} onPress={handleSubmitEmail}>
            <Text style={styles.buttonText}>Enviar e continuar</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  quizContainer: { flex: 1, alignItems: 'center' },
  questionCounter: { fontSize: 16, marginBottom: 8, color: '#555' },
  questionText: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  optionsContainer: { width: '100%', gap: 12 },
  optionButton: { backgroundColor: '#1DB954', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  optionText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  emailContainer: { alignItems: 'center' },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 12, fontSize: 16, width: '100%', marginBottom: 16 },
  button: { backgroundColor: '#000', padding: 16, borderRadius: 8, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});