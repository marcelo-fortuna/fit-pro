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
    profile: {
      title: 'Profile',
      currentPlan: 'Current Plan',
      premiumMonthly: 'Premium Monthly',
      expiresOn: 'Expires on',
      settings: 'Settings',
      paymentMethods: 'Payment Methods',
      helpSupport: 'Help & Support',
      logout: 'Log Out',
      yearsOld: 'years old',
      updatePhoto: 'Update Profile Photo',
      chooseFromGallery: 'Choose from Gallery',
      takePhoto: 'Take a Photo',
    },
    quiz: {
      questions: {
        1: {
          text: 'What is your main goal with Pilates?',
          options: ['Flexibility', 'Strength', 'Rehabilitation', 'Overall Fitness']
        },
        2: {
          text: 'How many times per week do you plan to practice?',
          options: ['1-2 times', '3-4 times', '5-6 times', 'Every day']
        },
        // Add all other questions here
      }
    }
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
    profile: {
      title: 'Perfil',
      currentPlan: 'Plano Atual',
      premiumMonthly: 'Premium Mensal',
      expiresOn: 'Expira em',
      settings: 'Configurações',
      paymentMethods: 'Métodos de Pagamento',
      helpSupport: 'Ajuda & Suporte',
      logout: 'Sair',
      yearsOld: 'anos',
      updatePhoto: 'Atualizar Foto de Perfil',
      chooseFromGallery: 'Escolher da Galeria',
      takePhoto: 'Tirar Foto',
    },
    quiz: {
      questions: {
        1: {
          text: 'Qual é o seu principal objetivo?',
          options: ['Perder Peso', 'Aumentar a força muscular', 'Desenvolver flexibilidade', 'Reduzir estresse e a ansiedade', 'Melhorar a postura']
        },
        2: {
          text: 'Como você descreveria o seu físico?',
          options: ['Magro', 'Médio porte', 'Peso ideal', 'Acima do peso']
        },
        3: {
          text: 'Qual é o "corpo dos seus sonhos"?',
          options: ['Magro', 'Tonificado', 'Curvilínea', 'Apenas um pouco mais magro']
        },
        4: {
          text: 'Quais são suas zonas-alvo?',
          options: ['Barriga', 'Peito', 'Bunda', 'Pernas']
        },
        5: {
          text: 'O que melhor descreve sua experiência com fitness?',
          options: ['Tenho dificuldade em ganhar músculos ou gordura corporal', 'Eu ganho e perco peso sem esforço', 'Eu ganho peso facilmente, mas tenho dificuldade em perdê-lo']
        },
        6: {
          text: 'Há quanto tempo você estava na melhor forma da sua vida?',
          options: ['Menos de um ano atrás', '1 a 2 anos atrás', 'Mais de 3 anos atrás', 'Nunca']
        },
        7: {
          text: 'Você já tentou exercícios de pilates na parede antes?',
          options: ['Sim, eu pratico regularmente', 'Sim, eu tentei', 'Não, eu nunca experimentei']
        },
        8: {
          text: 'Quão flexível você é?',
          options: ['Bastante flexível', 'Apenas começando', 'Não sou tanto assim', 'Não tenho certeza']
        },
        9: {
          text: 'Com que frequência você se exercita?',
          options: ['Quase todos os dias', 'Várias vezes por semana', 'Várias vezes por mês', 'Nunca']
        },
        10: {
          text: 'Você fica sem fôlego depois de subir um lance de escadas?',
          options: ['Fico tão sem fôlego que não consigo falar', 'Fico um pouco sem fôlego, mas consigo falar', 'Fico bem depois de um lance de escadas', 'Eu posso subir facilmente alguns lances de escada']
        },
        11: {
          text: 'Com que frequência você sai para caminhar?',
          options: ['Quase todos os dias', '3-4 vezes por semana', '1-2 vezes por semana', 'Mais de uma vez por mês', 'Não costumo sair para caminhar']
        },
      }
    }
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
      savingCompleteRegister: 'Guardando...',
    },
    profile: {
      title: 'Perfil',
      currentPlan: 'Plan Actual',
      premiumMonthly: 'Premium Mensual',
      expiresOn: 'Expira el',
      settings: 'Configuración',
      paymentMethods: 'Métodos de Pago',
      helpSupport: 'Ayuda y Soporte',
      logout: 'Cerrar Sesión',
      yearsOld: 'años',
      updatePhoto: 'Actualizar Foto de Perfil',
      chooseFromGallery: 'Elegir de la Galería',
      takePhoto: 'Tomar Foto',
    },
    quiz: {
      questions: {
        1: {
          text: '¿Cuál es tu objetivo principal con Pilates?',
          options: ['Flexibilidad', 'Fuerza', 'Rehabilitación', 'Acondicionamiento General']
        },
        2: {
          text: '¿Cuántas veces por semana planeas practicar?',
          options: ['1-2 veces', '3-4 veces', '5-6 veces', 'Todos los días']
        },
        // Add all other questions here
      }
    }
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