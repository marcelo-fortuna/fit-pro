import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

const i18n = new I18n({
  en: {
    err: {
      loginFailed: 'Failed to login',
      registerFailed: 'Failed to Create Account.',
    },
    validations: {
      fillAllFields: 'Please fill all fields.',
      emailValid: 'Please enter a valid email.',
      notExpectedCharPassword: 'Password must be at least 6 characters.',
    },
    welcome: {
      title: 'Transform Your Body\nWith Pilates',
      subtitle: 'Join our community and start your journey to a stronger, more flexible you',
      existingUser: 'I already have an account',
      newUser: 'Start my journey',
    },
    login: {
      title: 'Welcome Back!',
      subtitle: 'Sign in to continue your journey.',
      enter: 'Enter',
      entering: 'Loading...',
      email: 'Email',
      password: 'Password',
      registerText: 'Don\'t have an account yet? Sign up',
    },
    register: {
      title: 'Create your account',
      subtitle: 'Complete your registration to get started.',
      email: 'Your E-mail',
      password: 'Create a password',
      loginText: 'Already have an account? Sign in',
      createAccount: 'Create Account',
      creatingAccount: 'Creating Account...',
    },
    completeProfile: {
      title: 'Complete your profile',
      subtitle: 'We need some more information to personalize your experience on the app.',
      firstName: 'First Name',
      lastName: 'Last Name',
      birthDate: 'Date of Birth (DD/MM/YYYY)',
      completeRegister: 'Complete registration',
      savingCompleteRegister: 'Saving...',
    },
  },
  pt: {
    err: {
      loginFailed: 'Falha ao fazer login.',
      registerFailed: 'Falha ao criar conta.',
    },
    validations: {
      fillAllFields: 'Por favor, preencha todos os campos.',
      emailValid: 'Por favor, insira um e-mail válido.',
      notExpectedCharPassword: 'A senha deve ter pelo menos 6 caracteres.',
    },
    welcome: {
      title: 'Transforme Seu Corpo\nCom Pilates',
      subtitle: 'Junte-se à nossa comunidade e comece sua jornada para um corpo mais forte e flexível',
      existingUser: 'Já tenho uma conta',
      newUser: 'Começar minha jornada',
    },
    login: {
      title: 'Bem-vindo de volta!',
      subtitle: 'Entre para continuar sua jornada.',
      enter: 'Entrar',
      entering: 'Entrando...',
      email: 'Email',
      password: 'Senha',
      registerText: 'Ainda não tem uma conta? Cadastre-se',
    },
    register: {
      title: 'Crie sua conta',
      subtitle: 'Complete seu cadastro para começar.',
      email: 'Seu Email',
      password: 'Crie uma senha',
      loginText: 'Já tem uma conta? Faça login',
      createAccount: 'Criar conta',
      creatingAccount: 'Criando conta...',
    },
    completeProfile: {
      title: 'Complete seu perfil',
      subtitle: 'Precisamos de mais algumas informações para personalizar sua experiência no aplicativo.',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      birthDate: 'Data de Nascimento (DD/MM/AAAA)',
      completeRegister: 'Concluir cadastro',
      savingCompleteRegister: 'Salvando...',
    },
  },
  es: {
    err: {
      loginFailed: 'Error al iniciar sesión',
      registerFailed: 'Error al Crear la cuenta.',
    },
    validations: {
      fillAllFields: 'Por favor, rellene todos los campos.',
      emailValid: 'Por favor, introduzca un correo electrónico válido.',
      notExpectedCharPassword: 'La contraseña debe tener al menos 6 caracteres.',
    },
    welcome: {
      title: 'Transforma Tu Cuerpo\nCon Pilates',
      subtitle: 'Únete a nuestra comunidad y comienza tu viaje hacia un cuerpo más fuerte y flexible',
      existingUser: 'Ya tengo una cuenta',
      newUser: 'Comenzar mi viaje',
    },
    login: {
      title: '¡Bienvenido de Nuevo!',
      subtitle: 'Inicie sesión para continuar su viaje.',
      enter: 'Entrar',
      entering: 'Cargando...',
      email: 'Correo electrónico',
      password: 'Contraseña',
      registerText: '¿Aún no tiene una cuenta? Regístrate',
    },
    register: {
      title: 'Crea tu cuenta',
      subtitle: 'Complete su registro para comenzar.',
      email: 'Su correo electrónico',
      password: 'Crear una contraseña',
      loginText: '¿Ya tiene una cuenta? Iniciar sesión',
      createAccount: 'Crear cuenta',
      creatingAccount: 'Creando cuenta...',
    },
    completeProfile: {
      title: 'Completa tu perfil',
      subtitle: 'Necesitamos más información para personalizar su experiencia en la aplicación.',
      firstName: 'Nombre',
      lastName: 'Apellido',
      birthDate: 'Fecha de Nacimiento (DD/MM/AAAA)',
      completeRegister: 'Completar registro',
      savingCompleteRegister: 'Ahorrando...',
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