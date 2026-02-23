import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  pt: {
    translation: {
      header: {
        inicio: "Início",
        sobre: "Sobre",
        comoFunciona: "Como Funciona",
        cases: "Cases",
        contato: "Contato",
        comunidade: "Comunidade",
      },

      hero: {
        tag: "Recrutamento Internacional",
        title: "Sua carreira internacional",
        titleAccent: "começa aqui",
        description: "Conectamos brasileiros a oportunidades de trabalho no Exterior. Sem promessas irreais, apenas caminhos viáveis.",
        cta: "Entrar na Comunidade",
        learnMore: "Saiba Mais",
        professionals: "Profissionais Conectados",
        destinations: "Países de Destino",
        positions: "Vagas Preenchidas",
        pillars: {
          security: {
            label: "Segurança Jurídica",
            sub: "Processos 100% dentro das leis migratórias",
          },
          support: {
            label: "Suporte Total",
            sub: "Te acompanhamos em todas as etapas do processo",
          },
          verified: {
            label: "Vagas Verificadas",
            sub: "Contratos diretos com empresas europeias",
          },
          people: {
            label: "+100 Pessoas",
            sub: "Já conectadas a oportunidades reais!",
          }
        }
      },

      about: {
        tag: "Sobre a GHC",
        title: "Não vendemos destinos...",
        titleAccent: "... construímos caminhos.",
        description1: "A GHC - Global Hiring & Careers, nasceu da necessidade de trazer clareza e organização para brasileiros que buscam o mercado internacional. Atuamos como ponte entre candidatos e empregadores, com foco em vagas operacionais e técnicas.",
        description2: "Nossa base é o propósito de conectar pessoas a oportunidades reais de trabalho fora do Brasil, oferecendo clareza sobre etapas, responsabilidades e limites legais, evitando promessas irreais ou atalhos inseguros.",
        mission: {
          title: "Nossa Missão",
          text: "Conectar pessoas a oportunidades reais de trabalho no exterior, por meio de processos claros, acompanhamento humano e parcerias confiáveis.",
        },
        vision: {
          title: "Nossa Visão",
          text: "Ser referência em recrutamento internacional para brasileiros e latino-americanos, reconhecida pela transparência, credibilidade e estrutura profissional.",
        },
        values: {
          transparency: {
            title: "Transparência",
            description: "Informações claras sobre vagas, processos e expectativas desde o primeiro contato.",
          },
          commitment: {
            title: "Compromisso",
            description: "Tratamos cada candidato como único, oferecendo suporte personalizado em toda a jornada.",
          },
          responsibility: {
            title: "Responsabilidade",
            description: "Trabalhamos apenas com empresas sérias e oportunidades reais verificadas.",
          },
          realism: {
            title: "Realismo",
            description: "Criamos uma rede de apoio entre brasileiros que já vivem no exterior.",
          }
        }
      },

      howItWorks: {
        tag: "Como Funciona",
        title: "Seu caminho para uma",
        titleAccent: "carreira internacional",
        description: "Nosso processo é simples e transparente. Acompanhe os passos abaixo e entenda como podemos ajudar você a conquistar sua vaga no exterior.",
        cta: "Comece Agora — Entre na Comunidade",
        steps: {
          step1: {
            title: "Captação do Candidato",
            description: "Acesso à nossa comunidade onde as vagas reais são divulgadas e explicadas.",
          },
          step2: {
            title: "Triagem de Perfil",
            description: "Análise técnica do seu perfil para entender habilidades e compatibilidade com as vagas.",
          },
          step3: {
            title: "Direcionamento",
            description: "Intermediação com empregadores parceiros e organização do fluxo documental.",
          },
          step4: {
            title: "Embarque",
            description: "Preparação final e orientações pré-embarque para sua nova jornada na Europa.",
          }
        }
      },

      testimonials: {
        tag: "Cases de Sucesso",
        title: "Histórias de quem",
        titleAccent: "já realizou o sonho",
        description: "Conheça alguns dos profissionais brasileiros que conquistaram suas vagas no exterior através da nossa comunidade.",
        list: {
          case1: { role: "Desenvolvedor Full Stack", location: "Polônia", quote: "Sempre sonhei em trabalhar na Europa, mas não sabia por onde começar. Através da comunidade, encontrei uma vaga perfeita e todo o suporte que precisava. Hoje vivo meu sonho!" },
          case2: { role: "Engenheiro de Software", location: "Áustria", quote: "O processo foi muito mais simples do que imaginei. As vagas são reais, verificadas, e a equipe me ajudou em cada etapa. Em 6 meses eu já estava realocado." },
          case3: { role: "Designer UX/UI", location: "Itália", quote: "Tentei por conta própria por anos sem sucesso. Quando entrei na comunidade, em 3 meses já tinha uma proposta firme. A diferença foi a orientação de quem entende." },
          case4: { role: "Analista de Dados", location: "Inglaterra", quote: "Além das vagas, o melhor é a rede de apoio. Conheci outros brasileiros que me ajudaram com dicas práticas sobre a mudança. Hoje faço o mesmo por quem está chegando." },
          case5: { role: "Product Manager", location: "Holanda", quote: "A transparência foi o que me conquistou. Nada de promessas vazias, apenas informações reais e suporte genuíno. Recomendo para qualquer um." },
          case6: { role: "DevOps Engineer", location: "Reino Unido", quote: "Recebi várias propostas que se encaixavam no meu perfil. A curadoria é excelente — não perdi tempo com oportunidades sem sentido." }
        }
      },

      contact: {
        tag: "Contato",
        title: "Pronto para dar o",
        titleAccent: "próximo passo?",
        description: "Entre em contato conosco ou junte-se à nossa comunidade no WhatsApp para receber as melhores oportunidades de trabalho no exterior diretamente no seu celular.",
        cta: "Entrar na Comunidade WhatsApp",
        whatsapp: "WhatsApp",
        email: "E-mail",
        hours: "Atendimento",
        location: "Localização",
        response: "Resposta em até 24h",
        partnerships: "Para parcerias e empresas",
        week: "Segunda a Sexta",
        schedule: "9h às 18h (horário de Brasília)",
        city: "São Paulo, Brasil",
        scope: "Atendemos todo o Brasil"
      },

      footer: {
        nav: "Navegação",
        legal: "Informações",
        privacy: "Política de Privacidade",
        terms: "Termos de Uso",
        rights: "Todos os direitos reservados.",
        description: "Conectando talentos brasileiros às melhores oportunidades de trabalho no exterior.",
        developed: "Desenvolvido por André Mantovani",
        labels: {
          home: "Início",
          about: "Sobre",
          works: "Como Funciona",
          cases: "Cases",
          contact: "Contato",
        }
      }
    },
  },

  en: {
    translation: {
      header: {
        inicio: "Home",
        sobre: "About",
        comoFunciona: "How it Works",
        cases: "Cases",
        contato: "Contact",
        comunidade: "Community",
      },

      hero: {
        tag: "International Recruitment",
        title: "Your international career",
        titleAccent: "starts here",
        description: "We connect Brazilians to real job opportunities abroad. No unrealistic promises, just viable paths.",
        cta: "Join Community",
        learnMore: "Learn More",
        professionals: "Conected Professionals",
        destinations: "Destination Countries",
        positions: "Positions Filled",
        pillars: {
          security: {
            label: "Legal Security",
            sub: "Processes 100% within immigration laws.",
          },
          support: {
            label: "Full Support",
            sub: "We accompany you in all stages of the process",
          },
          verified: {
            label: "Real Jobs",
            sub: "Direct contracts with European companies",
          },
          people: {
            label: "+100 People",
            sub: "Already connected to real opportunities!",
          }
        }
      },

      about: {
        tag: "About GHC",
        title: "We don't sell destinations...",
        titleAccent: "... we build paths.",
        description1: "GHC - Global Hiring & Careers, was born from the need to bring clarity and organization to Brazilians seeking the international market. We act as a bridge between candidates and employers, focusing on operational and technical positions.",
        description2: "Our foundation is the purpose of connecting people to real work opportunities outside Brazil, offering clarity on stages, responsibilities, and legal limits, avoiding unrealistic promises or unsafe shortcuts.",
        mission: {
          title: "Our Mission",
          text: "To connect people to real work opportunities abroad through clear processes, human support, and reliable partnerships.",
        },
        vision: {
          title: "Our Vision",
          text: "To be the benchmark in international recruitment for Brazilians and Latin Americans, recognized for transparency, credibility, and professional structure.",
        },
        values: {
          transparency: {
            title: "Transparency",
            description: "Clear information about vacancies, processes, and expectations from the first contact.",
          },
          commitment: {
            title: "Commitment",
            description: "We treat each candidate as unique, offering personalized support throughout the entire journey.",
          },
          responsibility: {
            title: "Responsibility",
            description: "We only work with serious companies and verified real opportunities.",
          },
          realism: {
            title: "Realism",
            description: "We create a support network among Brazilians already living abroad.",
          }
        }
      },

      howItWorks: {
        tag: "How it Works",
        title: "Your path to an",
        titleAccent: "international career",
        description: "Our process is simple and transparent. Follow the steps below to understand how we can help you conquer your job abroad.",
        cta: "Start Now — Join the Community",
        steps: {
          step1: { title: "Candidate Sourcing", description: "Access to our community where real vacancies are posted and explained." },
          step2: { title: "Profile Screening", description: "Technical analysis of your profile to understand skills and compatibility." },
          step3: { title: "Guidance", description: "Intermediation with partner employers and document flow organization." },
          step4: { title: "Boarding", description: "Final preparation and pre-departure guidance for your new journey in Europe." }
        }
      },

      testimonials: {
        tag: "Success Stories",
        title: "Stories from those",
        titleAccent: "who already achieved the dream",
        description: "Meet some of the professionals who secured their international jobs through our community.",
        list: {
          case1: { role: "Full Stack Developer", location: "Poland", quote: "I always dreamed of working in Europe. Through the community, I found the perfect job and all the support I needed." },
          case2: { role: "Software Engineer", location: "Austria", quote: "The process was simpler than I imagined. The jobs are real, verified, and the team helped me at every step." },
          case3: { role: "UX/UI Designer", location: "Italy", quote: "I tried on my own for years without success. When I joined, I had a firm proposal in 3 months. The guidance made the difference." },
          case4: { role: "Data Analyst", location: "England", quote: "Besides the jobs, the support network is the best part. I met other Brazilians who helped with practical move tips." },
          case5: { role: "Product Manager", location: "Netherlands", quote: "The transparency won me over. No empty promises, just real information and genuine support." },
          case6: { role: "DevOps Engineer", location: "UK", quote: "I received several proposals that fit my profile. The curation is excellent — no time wasted on irrelevant offers." }
        }
      },

      contact: {
        tag: "Contact",
        title: "Ready to take the",
        titleAccent: "next step?",
        description: "Get in touch with us or join our WhatsApp community to receive the best international job opportunities directly on your phone.",
        cta: "Join WhatsApp Community",
        whatsapp: "WhatsApp",
        email: "Email",
        hours: "Service",
        location: "Location",
        response: "Response within 24h",
        partnerships: "For partnerships and companies",
        week: "Monday to Friday",
        schedule: "9 AM to 6 PM (Brasília Time)",
        city: "São Paulo, Brazil",
        scope: "Serving all of Brazil"
      },

      footer: {
        nav: "Navigation",
        legal: "Legal",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        rights: "All rights reserved.",
        description: "Connecting Brazilian talent with the best job opportunities abroad.",
        developed: "Developed by André Mantovani",
        labels: {
          home: "Home",
          about: "About",
          works: "How It Works",
          cases: "Cases",
          contact: "Contact",
        }
      }
    },
  },

  es: {
    translation: {
      header: {
        inicio: "Inicio",
        sobre: "Sobre nosotros",
        comoFunciona: "Cómo funciona",
        cases: "Casos de éxito",
        contato: "Contacto",
        comunidade: "Comunidad",
      },

      hero: {
        tag: "Reclutamiento Internacional",
        title: "Tu carrera internacional",
        titleAccent: "comienza aquí",
        description: "Conectamos a brasileños con oportunidades reales de trabajo en el Exterior. Sin promesas irreais, solo caminos viables.",
        cta: "Unirse a la Comunidad",
        learnMore: "Saber más",
        professionals: "Profesionales Conectados",
        destinations: "Países de Destino",
        positions: "Posiciones Ocupadas",
        pillars: {
          security: {
            label: "Seguridad Jurídica",
            sub: "Procesos 100% dentro de las leyes migratorias",
          },
          support: {
            label: "Soporte Completo",
            sub: "Te acompañamos en todas las etapas del proceso",
          },
          verified: {
            label: "Trabajos Reales",
            sub: "Contratos directos con empresas europeas",
          },
          people: {
            label: "+100 Personas",
            sub: "¡Ya conectadas a oportunidades reales!",
          }
        }
      },

      about: {
        tag: "Sobre GHC",
        title: "No vendemos destinos...",
        titleAccent: "... construimos caminos.",
        description1: "GHC - Global Hiring & Careers, nació de la necesidad de traer claridad e organización a los brasileños que buscan el mercado internacional. Actuamos como puente entre candidatos y empleadores, con un enfoque en vacantes operativas y técnicas.",
        description2: "Nuestra base es el propósito de conectar personas con oportunidades reales de trabajo fuera de Brasil, ofreciendo claridad sobre las etapas, responsabilidades y límites legales, evitando promesas irreais o atajos inseguros.",
        mission: {
          title: "Nuestra Misión",
          text: "Conectar personas con oportunidades reales de trabajo en el extranjero, a través de procesos claros, acompañamiento humano y alianzas confiables.",
        },
        vision: {
          title: "Nuestra Visión",
          text: "Ser la referencia en reclutamiento internacional para brasileños y latinoamericanos, reconocida por su transparencia, credibilidad y estructura profesional.",
        },
        values: {
          transparency: {
            title: "Transparencia",
            description: "Información clara sobre vacantes, procesos y expectativas desde el primer contacto.",
          },
          commitment: {
            title: "Compromiso",
            description: "Tratamos a cada candidato como único, ofreciendo apoyo personalizado durante todo o trayecto.",
          },
          responsibility: {
            title: "Responsabilidad",
            description: "Solo trabajamos con empresas serias y oportunidades reales verificadas.",
          },
          realism: {
            title: "Realismo",
            description: "Creamos una red de apoyo entre los brasileños que ya viven en el extranjero.",
          }
        }
      },

      howItWorks: {
        tag: "Cómo Funciona",
        title: "Tu camino hacia una",
        titleAccent: "carrera internacional",
        description: "Nuestro proceso es simple y transparente. Sigue los pasos a continuación para entender cómo podemos ayudarte a conquistar tu vacante en el extranjero.",
        cta: "Comienza Ahora — Únete a la Comunidad",
        steps: {
          step1: { title: "Captación de Candidatos", description: "Acceso a nuestra comunidad donde las vacantes reales son publicadas y explicadas." },
          step2: { title: "Triaje de Perfil", description: "Análisis técnico de tu perfil para entender habilidades y compatibilidad con las vacantes." },
          step3: { title: "Direccionamiento", description: "Intermediación con empleadores socios y organización del flujo documental." },
          step4: { title: "Embarque", description: "Preparación final y orientaciones previas al viaje para tu nueva jornada en Europa." }
        }
      },

      testimonials: {
        tag: "Casos de Éxito",
        title: "Historias de quienes",
        titleAccent: "ya cumplieron el sueño",
        description: "Conoce a algunos de los profesionales que conquistaron sus vacantes internacionales a través de nuestra comunidad.",
        list: {
          case1: { role: "Desarrollador Full Stack", location: "Polonia", quote: "Siempre soñé con trabajar en Europa. A través de la comunidad, encontré la vacante perfecta y todo el apoyo que necesitaba." },
          case2: { role: "Ingeniero de Software", location: "Austria", quote: "El proceso fue más simple de lo que imaginé. Las vacantes son reales y el equipo me ayudó en cada etapa." },
          case3: { role: "Diseñador UX/UI", location: "Italia", quote: "Intenté por mi conta durante años sin éxito. Al unirme, tuve una propuesta firme en 3 meses. La orientación marcó la diferencia." },
          case4: { role: "Analista de Datos", location: "Inglaterra", quote: "Además de las vacantes, lo mejor es la red de apoyo. Conocí a otros brasileños que me ayudaron con consejos prácticos." },
          case5: { role: "Gerente de Producto", location: "Holanda", quote: "La transparencia me conquistó. Nada de promesas vacías, solo información real y apoyo genuino." },
          case6: { role: "Ingeniero DevOps", location: "Reino Unido", quote: "Recibí varias propuestas que encajaban con mi perfil. La curaduría es excelente — no perdí tiempo con ofertas irrelevantes." }
        }
      },

      contact: {
        tag: "Contacto",
        title: "¿Listo para dar el",
        titleAccent: "próximo paso?",
        description: "Ponte en contacto con nosotros o únete a nuestra comunidad de WhatsApp para recibir las mejores oportunidades de trabajo en el extranjero directamente en tu móvil.",
        cta: "Unirse a la Comunidad WhatsApp",
        whatsapp: "WhatsApp",
        email: "Correo",
        hours: "Atención",
        location: "Ubicación",
        response: "Respuesta en 24h",
        partnerships: "Para alianzas y empresas",
        week: "Lunes a Viernes",
        schedule: "9 AM a 6 PM (Hora de Brasilia)",
        city: "São Paulo, Brasil",
        scope: "Atendemos a todo Brasil"
      },

      footer: {
        nav: "Navegación",
        legal: "Legal",
        privacy: "Política de Privacidad",
        terms: "Términos de Uso",
        rights: "Todos los derechos reservados.",
        description: "Conectando el talento brasileño con las mejores oportunidades de trabajo en el exterior.",
        developed: "Desarrollado por André Mantovani",
        labels: {
          home: "Inicio",
          about: "Sobre nosotros",
          works: "Cómo Funciona",
          cases: "Casos de Éxito",
          contact: "Contacto",
        }
      }
    },
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;