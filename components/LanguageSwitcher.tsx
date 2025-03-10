import { useState } from 'react';
import { View, Pressable, Image, StyleSheet, Modal, Text } from 'react-native';
import { useTranslation } from '../utils/i18n';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

const flags = {
  en: {
    flag: 'https://flagcdn.com/w160/us.png',
    label: 'English',
  },
  pt: {
    flag: 'https://flagcdn.com/w160/br.png',
    label: 'Português',
  },
  es: {
    flag: 'https://flagcdn.com/w160/es.png',
    label: 'Español',
  },
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.currentLanguage}
      >
        <Image
          source={{ uri: flags[locale as keyof typeof flags].flag }}
          style={styles.flagImage}
        />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {Object.entries(flags).map(([lang, { flag, label }]) => (
              <Pressable
                key={lang}
                style={[
                  styles.languageOption,
                  locale === lang && styles.activeOption,
                ]}
                onPress={() => {
                  setLocale(lang);
                  setModalVisible(false);
                }}
              >
                <Image source={{ uri: flag }} style={styles.flagImage} />
                <Text style={styles.languageLabel}>{label}</Text>
                {locale === lang && (
                  <FA5Icon name="check-circle" size={20} color="#78b13f" />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  currentLanguage: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '80%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#0f172a',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeOption: {
    backgroundColor: '#f1f5f9',
  },
  flagImage: {
    width: 32,
    height: 24,
    borderRadius: 4,
  },
  languageLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
    flex: 1,
  },
});