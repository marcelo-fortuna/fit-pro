import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

const i18n = new I18n({
  en: {
    welcome: {
      title: 'Transform Your Body\nWith Pilates',
      subtitle: 'Join our community and start your journey to a stronger, more flexible you',
      existingUser: 'I already have an account',
      newUser: 'Start my journey',
    },
  },
  pt: {
    welcome: {
      title: 'Transforme Seu Corpo\nCom Pilates',
      subtitle: 'Junte-se à nossa comunidade e comece sua jornada para um corpo mais forte e flexível',
      existingUser: 'Já tenho uma conta',
      newUser: 'Começar minha jornada',
    },
  },
  es: {
    welcome: {
      title: 'Transforma Tu Cuerpo\nCon Pilates',
      subtitle: 'Únete a nuestra comunidad y comienza tu viaje hacia un cuerpo más fuerte y flexible',
      existingUser: 'Ya tengo una cuenta',
      newUser: 'Comenzar mi viaje',
    },
  },
});

export function setupI18n() {
  const locales = getLocales();
  i18n.locale = locales[0].languageCode;
  i18n.enableFallback = true;
  i18n.defaultLocale = 'en';
}

export function useTranslation() {
  return {
    t: (key: string, params?: Record<string, string>) => i18n.t(key, params),
    locale: i18n.locale,
    setLocale: (locale: string) => {
      i18n.locale = locale;
    },
  };
}