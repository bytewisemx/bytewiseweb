import { useEffect, useRef, useState, type ReactNode } from 'react';
import logo from './assets/logonew.png';
import fondo from './assets/fond.png';
import escudoImg from './assets/escudo.png';
import misionImg from './assets/mision (2).png';
import visionImg from './assets/vidion.png';
import empresasImg from './assets/empresas.png';
import comoTrabajamosImg from './assets/comotrabajamos.png';
import escuelaImg from './assets/escuela.png';
import art1BancosImg from './assets/blog/art1bancos.webp';
import art2IdentidadImg from './assets/blog/2artidentidad.webp';
import art3IndustriaImg from './assets/blog/art3industria.webp';
import {
  FaBrain,
  FaChartLine,
  FaComments,
  FaDatabase,
  FaGear,
  FaMagnifyingGlassChart,
  FaShieldHalved,
  FaTriangleExclamation,
  FaUsersGear
} from 'react-icons/fa6';
import Carousel from './components/Carousel';
import MagicBento from './components/MagicBento';
import CardSwap, { Card } from './components/CardSwap';
import ScrollReveal from './components/ScrollReveal';
import TextType from './components/TextType';
import ElectricBorder from './components/ElectricBorder';
import StaggeredMenu from './components/StaggeredMenu';
import ChatBot from './components/ChatBot';
import './App.css';

// SECTION 2 - ABOUT
const values = [
  { title: 'Calidad', desc: 'Excelencia en cada solución, proceso y entregable para superar las expectativas de nuestros clientes.' },
  { title: 'Confiabilidad', desc: 'Cumplimiento puntual y transparente en cada compromiso adquirido.' },
  { title: 'Confidencialidad', desc: 'Resguardo y protección rigurosa de la información sensible de nuestros clientes.' },
  { title: 'Integridad', desc: 'Actuamos con honestidad y rectitud en cada decisión, interna o externa.' },
  { title: 'Responsabilidad', desc: 'Protección proactiva de los activos digitales y la información de nuestros clientes.' },
  { title: 'Vanguardia', desc: 'Cultura de innovación, exploración y adaptación constante al entorno tecnológico.' }
];

// SECTION 3 - SERVICES
const services = [
  {
    num: '01',
    id: 'ciberseguridad-cumplimiento',
    title: 'Consultoria en Ciberseguridad y Cumplimiento (ISO 27001 + Diagnostico Inicial)',
    copy: 'Disenamos e implementamos estrategias integrales de ciberseguridad alineadas a estandares internacionales como ISO/IEC 27001:2022, adaptadas al nivel de madurez de su organizacion.',
    sections: [
      {
        heading: 'Diagnostico inicial gratuito',
        text: 'Evaluamos el estado actual de su empresa en materia de seguridad de la informacion y le entregamos un analisis claro de brechas, riesgos y prioridades. (Ideal para organizaciones que inician desde cero o buscan formalizar su seguridad.)'
      },
      {
        heading: 'LO QUE INCLUYE:',
        bullets: [
          'Evaluacion de madurez y analisis de brechas',
          'Identificacion y clasificacion de activos criticos',
          'Plan de respuesta ante incidentes y ciberataques',
          'Implementacion de controles, politicas y procedimientos',
          'Capacitacion y concientizacion del personal',
          'Acompanamiento para certificacion ISO/IEC 27001'
        ]
      },
      {
        heading: 'NIVELES DE SERVICIO:',
        bullets: [
          'Basico - Diagnostico y plan de accion',
          'Intermedio - Implementacion de controles y gestion de riesgos',
          'Avanzado - Auditoria interna y preparacion para certificacion'
        ]
      }
    ],
    cta: 'Solicitar diagnostico gratuito',
    icon: 'pi-shield'
  },
  {
    num: '02',
    id: 'lfpdppp',
    title: 'Cumplimiento de la LFPDPPP (Proteccion de Datos Personales)',
    copy: 'Apoyamos a su organizacion en el cumplimiento de la Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares (LFPDPPP), reduciendo riesgos legales y fortaleciendo la confianza de sus clientes.',
    sections: [
      {
        heading: 'POR QUE ES IMPORTANTE?',
        text: 'El manejo inadecuado de datos personales puede derivar en sanciones economicas, danos reputacionales y perdida de clientes.'
      },
      {
        heading: 'LO QUE INCLUYE:',
        bullets: [
          'Diagnostico de cumplimiento actual',
          'Elaboracion de Avisos de Privacidad',
          'Implementacion de politicas de proteccion de datos',
          'Evaluacion de riesgos en el tratamiento de informacion',
          'Capacitacion al personal en manejo de datos personales',
          'Acompanamiento ante auditorias o requerimientos legales'
        ]
      }
    ],
    cta: 'Evaluar cumplimiento',
    icon: 'pi-verified'
  },
  {
    num: '03',
    id: 'admin-ti',
    title: 'Administracion de TI por Externalizacion',
    copy: 'Fortalezca su operacion tecnologica sin necesidad de crear un departamento interno. ByteWise actua como su aliado estrategico en TI.',
    sections: [
      {
        heading: 'BENEFICIOS CLAVE:',
        bullets: [
          'Reduccion de costos operativos',
          'Escalabilidad segun crecimiento del negocio',
          'Acceso a especialistas sin contratacion directa',
          'Continuidad operativa y soporte proactivo'
        ]
      }
    ],
    cta: 'Solicitar cotizacion',
    icon: 'pi-desktop'
  },
  {
    num: '04',
    id: 'consultoria-ia',
    title: 'Consultoria en Inteligencia Artificial',
    copy: 'Identificamos e implementamos soluciones de Inteligencia Artificial que generan valor real en su negocio.',
    sections: [
      {
        heading: '',
        text: 'Desde la creacion de asistentes virtuales y campanas digitales inteligentes, hasta la automatizacion de procesos operativos, ayudamos a su empresa a ser mas eficiente y competitiva.'
      },
      {
        heading: 'CASOS DE USO:',
        bullets: [
          'Chatbots y asistentes para atencion al cliente',
          'Automatizacion de procesos internos',
          'Analisis de datos para toma de decisiones',
          'Optimizacion de marketing digital'
        ]
      }
    ],
    cta: 'Ver mas sobre IA',
    icon: 'pi-sparkles'
  },
  {
    num: '05',
    id: 'pentesting',
    title: 'Pentesting y Analisis de Vulnerabilidades',
    copy: 'Evaluamos la seguridad de su organizacion desde la perspectiva de un atacante para detectar riesgos antes de que sean explotados.',
    sections: [
      {
        heading: 'SERVICIOS TECNICOS:',
        bullets: [
          'Pruebas de penetracion (Pentesting)',
          'Analisis de vulnerabilidades',
          'Evaluacion de ingenieria social',
          'Hardening de sistemas y configuraciones'
        ]
      }
    ],
    cta: 'Solicitar evaluacion tecnica',
    icon: 'pi-search'
  },
  {
    num: '06',
    id: 'forense',
    title: 'Forense Informatico',
    copy: 'Servicio especializado para la investigacion de incidentes de seguridad y analisis de evidencia digital, con enfoque tecnico y legal.',
    sections: [
      {
        heading: 'CAPACIDADES:',
        bullets: [
          'Recuperacion de informacion de dispositivos (discos duros, servidores y dispositivos moviles)',
          'Analisis forense de informacion digital',
          'Telefonia forense (analisis de dispositivos moviles)',
          'Video forense',
          'Preservacion de evidencia digital bajo estandares'
        ]
      },
      {
        heading: 'Dictamenes con validez legal',
        text: 'Se emiten informes tecnicos con sustento metodologico, utilizables en procesos legales o administrativos en caso de ser requeridos.'
      }
    ],
    note: '[ Servicio complementario - disponible bajo solicitud especifica ]',
    cta: 'Consultar disponibilidad',
    icon: 'pi-folder-open'
  },
  {
    num: '07',
    id: 'desarrollo-web-sistemas',
    title: 'Desarrollo de Sistemas y Paginas Web a la Medida',
    copy: 'Disenamos y desarrollamos soluciones tecnologicas personalizadas alineadas a los objetivos de su negocio.',
    sections: [
      {
        heading: '',
        text: 'Desde sitios web profesionales hasta sistemas internos, creamos herramientas que optimizan procesos y mejoran la experiencia del usuario.'
      },
      {
        heading: 'LO QUE INCLUYE:',
        bullets: [
          'Desarrollo de paginas web modernas y optimizadas',
          'Sistemas a la medida (ERP, CRM, automatizacion interna)',
          'Integracion con APIs y plataformas externas',
          'Diseno enfocado en experiencia de usuario (UX/UI)',
          'Optimizacion de rendimiento y seguridad'
        ]
      },
      {
        heading: 'ENFOQUE:',
        text: 'Soluciones escalables, seguras y preparadas para crecimiento.'
      }
    ],
    cta: 'Solicitar desarrollo',
    icon: 'pi-code'
  }
];

// SECTION 4 - AI
const aiUseCases = [
  {
    title: 'Chatbots y Asistentes Virtuales',
    desc: 'Implementamos asistentes inteligentes que atienden a sus clientes de forma inmediata, personalizada y disponible las 24 horas. Reducimos tiempos de respuesta y mejoramos la satisfacción del cliente.',
    icon: <FaComments />,
    iconColor: '#38bdf8'
  },
  {
    title: 'Automatización de Procesos',
    desc: 'Identificamos tareas repetitivas de su organización y las automatizamos con IA, liberando tiempo de su equipo para actividades estratégicas, desde gestión documental hasta flujos internos.',
    icon: <FaGear />,
    iconColor: '#60a5fa'
  },
  {
    title: 'Generación de Contenido Multimedia',
    desc: 'Producimos imágenes, videos y materiales visuales generados con inteligencia artificial, optimizados para comunicación corporativa. Mayor volumen de contenido, menor tiempo de producción.',
    icon: <FaBrain />,
    iconColor: '#a78bfa'
  },
  {
    title: 'Campañas Digitales Inteligentes',
    desc: 'Diseñamos estrategias de marketing potenciadas por IA: segmentación avanzada, generación de creatividades personalizadas y análisis predictivo de resultados.',
    icon: <FaChartLine />,
    iconColor: '#22d3ee'
  },
  {
    title: 'Análisis de Datos y Decisiones',
    desc: 'Transformamos los datos de su organización en inteligencia accionable. Mediante análisis predictivo identificamos patrones y apoyamos decisiones estratégicas con base en evidencia.',
    icon: <FaMagnifyingGlassChart />,
    iconColor: '#f59e0b'
  },
  {
    title: 'Asistentes para Tareas Internas',
    desc: 'Desarrollamos asistentes para optimizar operaciones internas: soporte en HR, documentos, coordinación y atención a colaboradores, haciendo su negocio más eficiente.',
    icon: <FaUsersGear />,
    iconColor: '#34d399'
  }
];

const aiRiskCards = [
  {
    title: '¿PODRIAS SEGUIR OPERANDO?',
    icon: <FaTriangleExclamation />,
    iconColor: '#fb7185',
    text: '¿Su área administrativa continuaría con normalidad? ¿Sus sistemas, expedientes o información crítica estarían disponibles? Sin datos, la operación se detiene.'
  },
  {
    title: '¿PODRIAS RECUPERARLA?',
    icon: <FaDatabase />,
    iconColor: '#f59e0b',
    text: '¿Cuenta con un plan de contingencia definido? En caso de incidente, ¿cuánto tardaría la recuperación: horas, días, semanas... o nunca?'
  },
  {
    title: '¿ESTAS REALMENTE PROTEGIDO?',
    icon: <FaShieldHalved />,
    iconColor: '#22d3ee',
    text: 'Muchas organizaciones creen estarlo, hasta que enfrentan un incidente real.'
  }
];

const workProcessCarouselItems = [
  {
    id: 'diag-profundo',
    title: '1. DIAGNÓSTICO PROFUNDO',
    description: '',
    icon: <FaMagnifyingGlassChart className="carousel-icon" style={{ color: '#0f172a' }} />,
    iconBg: 'linear-gradient(145deg, #bae6fd, #7dd3fc)'
  },
  {
    id: 'plan-estrategico',
    title: '2. PLAN ESTRATÉGICO',
    description: '',
    icon: <FaChartLine className="carousel-icon" style={{ color: '#0f172a' }} />,
    iconBg: 'linear-gradient(145deg, #bfdbfe, #93c5fd)'
  },
  {
    id: 'implementacion-fases',
    title: '3. IMPLEMENTACIÓN POR FASES',
    description: '',
    icon: <FaGear className="carousel-icon" style={{ color: '#0f172a' }} />,
    iconBg: 'linear-gradient(145deg, #a5f3fc, #67e8f9)'
  },
  {
    id: 'acompanamiento-continuo',
    title: '4. ACOMPAÑAMIENTO CONTINUO',
    description: '',
    icon: <FaUsersGear className="carousel-icon" style={{ color: '#0f172a' }} />,
    iconBg: 'linear-gradient(145deg, #cbd5e1, #94a3b8)'
  }
];

const certifications = [
  {
    title: 'Maestría en Seguridad de la Información',
    description:
      'Formación avanzada en gestión de riesgos, protección de datos, gobierno de seguridad y estrategias para la continuidad del negocio.'
  },
  {
    title: 'Auditor Interno ISO/IEC 27001:2022',
    description:
      'Capacidad para evaluar sistemas de gestión de seguridad de la información (SGSI), identificar brechas y asegurar el cumplimiento de controles conforme a estándares internacionales.'
  },
  {
    title: 'Lead Implementer ISO/IEC 27001',
    description:
      'Experiencia en diseño, implementación y mantenimiento de SGSI, desde el diagnóstico inicial hasta la preparación para auditoría de certificación.'
  }
];

const technicalSpecializations = [
  {
    title: 'Pentesting y análisis de vulnerabilidades',
    description:
      'Evaluación de sistemas, redes y aplicaciones desde la perspectiva de un atacante para identificar y mitigar riesgos antes de que sean explotados.'
  },
  {
    title: 'Informática forense con validez legal',
    description:
      'Recuperación y análisis de evidencia digital en dispositivos físicos y móviles, con generación de dictámenes técnicos utilizables en procesos legales.'
  },
  {
    title: 'Inteligencia Artificial aplicada',
    description:
      'Desarrollo e implementación de soluciones de IA para automatización de procesos, asistentes virtuales y optimización de operaciones.'
  },
  {
    title: 'Desarrollo de software a la medida',
    description:
      'Creación de sistemas y plataformas adaptadas a necesidades específicas, integrando seguridad, escalabilidad y eficiencia operativa.'
  }
];

// SECTION 8 - NEWS (BLOG FORMAT)
const newsArticles = [
  {
    title: 'Crisis sistémica en el sector mexicano: filtraciones masivas y accesos no autorizados',
    category: 'Ciberseguridad Nacional',
    date: 'Mar 08, 2026',
    image: '/News/mexico-asedio-digital.png'
  },
  {
    title: 'Alerta para escuelas en México: exposición de datos personales en instituciones educativas',
    category: 'Sector Educativo',
    date: 'Mar 05, 2026',
    image: '/News/school.png'
  },
  {
    title: 'CURP y actas oficiales en el mercado negro: fallas críticas en control y protección de datos',
    category: 'Protección de Datos',
    date: 'Feb 16, 2026',
    image: '/News/curp-mercado-negro.png'
  },
  {
    title: 'Sin TI, el riesgo es mayor en 2026: por qué externalizar ciberseguridad ya no es opcional',
    category: 'Gestión de Riesgos',
    date: 'Feb 03, 2026',
    image: '/News/sin-ti-riesgo-2026.png'
  },
  {
    title: 'Cómo preparar a su equipo ante un incidente de seguridad',
    category: 'Gestión de Riesgos',
    date: 'Nov 30, 2025',
    image: '/News/instituciones-exentas.png'
  }
];

const moreBlogArticles = [
  {
    title: 'IA detecta miles de vulnerabilidades en bancos globales',
    category: 'Ciberseguridad / IA',
    date: 'Abril 2026',
    image: art1BancosImg,
    summary:
      'Un modelo avanzado de IA identificó miles de vulnerabilidades críticas en sistemas financieros globales, generando preocupación entre reguladores.',
    content:
      'Una inteligencia artificial desarrollada por Anthropic reveló fallas graves en infraestructuras bancarias a nivel mundial. Estas vulnerabilidades incluyen sistemas operativos, navegadores y software crítico. Reguladores internacionales han reconocido que actualmente no cuentan con herramientas suficientes para gestionar este tipo de riesgos, lo que posiciona a la IA como un arma de doble filo: puede proteger, pero también exponer debilidades a gran escala.',
    source:
      'https://www.huffingtonpost.es/tecnologia/los-grandes-bancos-mundo-expuestos-nueva-iaanthropicencuentra-miles-vulnerabilidades-graves-reguladores-europeos-admiten-herramientas-frenarla-f202604.html'
  },
  {
    title: 'Ciberataques evolucionan con IA y robo de identidad',
    category: 'Ciberseguridad / Tendencias',
    date: 'Abril 2026',
    image: art2IdentidadImg,
    summary:
      'Expertos advierten que los ataques seran mas sofisticados con IA, incluyendo deepfakes y fraude personalizado.',
    content:
      'Las tendencias de ciberseguridad para 2026 apuntan a un aumento en ataques impulsados por inteligencia artificial, como phishing avanzado, deepfakes y robo de identidad masivo. Estas amenazas permiten a los atacantes crear fraudes altamente personalizados, aumentando significativamente su efectividad y dificultad de deteccion.',
    source:
      'https://udgtv.com/noticias/ciberseguridad-2026-predicciones-de-gen-y-amenazas-ia/311599'
  },
  {
    title: 'IA integrada en todas las industrias: la nueva infraestructura empresarial',
    category: 'Transformacion digital',
    date: 'Abril 2026',
    image: art3IndustriaImg,
    summary:
      'La inteligencia artificial deja de ser opcional y se convierte en la base operativa de las empresas.',
    content:
      'La IA se esta integrando en sectores como salud, finanzas, manufactura y retail para automatizar procesos, mejorar la toma de decisiones y reducir costos. Su adopcion, impulsada por inversiones globales, la posiciona como un componente clave para la competitividad empresarial.',
    source:
      'https://www.gartner.com/en/articles/top-technology-trends-2026'
  }
];

const trustBadgeItems = [
  'Ciberseguridad · Cumplimiento · IA · Desarrollo Tecnológico',
  'ISO 27001 · LFPDPPP · Pentesting · Forense · TI · Desarrollo Web',
  '📍 Aguascalientes, México | Cobertura nacional'
];

const blogSidebarAds = [
  {
    eyebrow: 'Diagnóstico gratuito',
    title: 'Evalúe riesgos antes de que se conviertan en incidentes',
    copy: 'Agenda una revisión inicial para detectar brechas de ciberseguridad, cumplimiento e IA.',
    cta: 'Agendar ahora'
  },
  {
    eyebrow: 'IA empresarial',
    title: 'Automatice procesos críticos con inteligencia artificial',
    copy: 'Diseñamos flujos de IA para reducir tareas manuales, errores operativos y tiempos de respuesta.',
    cta: 'Conocer IA'
  },
  {
    eyebrow: 'Ciberseguridad',
    title: 'Pentesting, forense digital y protección de datos',
    copy: 'Fortalezca su operación con pruebas controladas, respuesta a incidentes y cumplimiento LFPDPPP.',
    cta: 'Ver servicios'
  }
];

const heroAnnouncements = [
  'Diagnostico inicial gratuito para empresas',
  'Ciberseguridad, cumplimiento e IA en una sola estrategia',
  'Automatizacion con IA para procesos criticos',
  'ISO 27001, LFPDPPP, pentesting y forense digital',
  'Outsourcing de TI y soporte tecnologico continuo',
  'Cobertura nacional desde Aguascalientes'
];

const HERO_SLOGANS = ['Protegemos su información.', 'Aseguramos su futuro.'];

const CRITICAL_PRELOAD_IMAGES = [logo, fondo];

const DEFERRED_PRELOAD_IMAGES = [
  misionImg,
  visionImg,
  empresasImg,
  escuelaImg,
  comoTrabajamosImg,
  ...newsArticles.map((article) => article.image).filter((image): image is string => Boolean(image))
];

const clientTestimonials = [
  {
    quote:
      '“Trabajar con ByteWise nos dio claridad total sobre nuestra seguridad. Detectaron riesgos que no teníamos en el radar y nos guiaron paso a paso para corregirlos. Hoy operamos con mucha más confianza y control.”',
    author: 'LM Alejandro Pedroza',
    company: 'Milenium',
    tag: 'Testimonio empresarial',
    avatar: 'AP'
  },
  {
    quote:
      '“El equipo de ByteWise fue muy profesional y claro en todo momento. Nos ayudaron a ordenar nuestros procesos y mejorar la protección de la información sin complicarnos. Se nota que saben lo que hacen.”',
    author: 'Mtro Israel Llorot',
    company: 'E-Net-Corp',
    tag: 'Testimonio práctico',
    avatar: 'IL'
  }
];

const topMenuItems = [
  { label: 'INICIO', ariaLabel: 'Ir al inicio', link: '#inicio' },
  { label: 'NOSOTROS', ariaLabel: 'Ir a nosotros', link: '#sobre-bytewise' },
  { label: 'METODOLOGIA', ariaLabel: 'Ir a como trabajamos', link: '#como-trabajamos' },
  { label: 'SERVICIOS', ariaLabel: 'Ir a servicios', link: '#servicios' },
  { label: 'IA', ariaLabel: 'Ir a inteligencia artificial', link: '#ia' },
  { label: 'CONTINUIDAD', ariaLabel: 'Ir a continuidad operativa', link: '#continuidad-datos' },
  { label: 'INCIDENTES', ariaLabel: 'Ir a respuesta ante incidentes', link: '#alerta-incidente' },
  { label: 'EQUIPO', ariaLabel: 'Ir al equipo', link: '#equipo' },
  { label: 'BLOG', ariaLabel: 'Ir al blog', link: '#noticias' },
  { label: 'CONTACTO', ariaLabel: 'Ir a contacto', link: '#contacto' }
];

function App() {
  const currentYear = new Date().getFullYear();
  const [activeTrustBadge, setActiveTrustBadge] = useState(0);
  const [selectedNewsImage, setSelectedNewsImage] = useState<{ src: string; title: string } | null>(null);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [expandedBlogPostId, setExpandedBlogPostId] = useState<string | null>(null);
  const [isBlogLoaderVisible, setIsBlogLoaderVisible] = useState(() => window.location.pathname === '/blog');
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isTinyMobileViewport, setIsTinyMobileViewport] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [isContactSending, setIsContactSending] = useState(false);
  const [showSubmitShield, setShowSubmitShield] = useState(false);
  const successOverlayTimeoutRef = useRef<number | null>(null);
  const [contactStatus, setContactStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  useEffect(() => {
    let isMounted = true;

    const loadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = src;
        image.onload = () => resolve();
        image.onerror = () => resolve();
      });

    const minLoaderDuration = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 650);
    });

    const maxWaitTimeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 4500);
    });

    Promise.race([
      Promise.allSettled(CRITICAL_PRELOAD_IMAGES.map((source) => loadImage(source))).then(() => minLoaderDuration),
      maxWaitTimeout
    ]).finally(() => {
      if (isMounted) setIsPageReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isPageReady) return;

    const warmupTimeout = window.setTimeout(() => {
      DEFERRED_PRELOAD_IMAGES.forEach((src) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = src;
      });
    }, 250);

    return () => window.clearTimeout(warmupTimeout);
  }, [isPageReady]);

  useEffect(() => {
    document.body.classList.toggle('app-is-loading', !isPageReady);
    return () => {
      document.body.classList.remove('app-is-loading');
    };
  }, [isPageReady]);

  useEffect(() => {
    return () => {
      if (successOverlayTimeoutRef.current) {
        window.clearTimeout(successOverlayTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (currentPath !== '/blog') {
      setIsBlogLoaderVisible(false);
      return;
    }

    let isCancelled = false;
    const timeoutIds: number[] = [];
    setIsBlogLoaderVisible(true);

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutIds.push(window.setTimeout(resolve, ms));
      });

    const loadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = src;
        image.onload = () => resolve();
        image.onerror = () => resolve();
      });

    const blogImages = moreBlogArticles
      .map((post) => ('image' in post ? post.image : undefined))
      .filter((image): image is string => Boolean(image))
      .slice(0, 3);

    Promise.all([
      wait(1100),
      Promise.race([Promise.allSettled(blogImages.map((image) => loadImage(image))), wait(2400)])
    ]).finally(() => {
      if (!isCancelled) setIsBlogLoaderVisible(false);
    });

    return () => {
      isCancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [currentPath]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveTrustBadge(prev => (prev + 1) % trustBadgeItems.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isPageReady) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const timeout = window.setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [isPageReady]);

  useEffect(() => {
    if (!selectedNewsImage) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedNewsImage(null);
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [selectedNewsImage]);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileViewport(window.innerWidth <= 768);
      setIsTinyMobileViewport(window.innerWidth <= 420);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const navigateToBlogPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState(null, '', '/blog');
    setCurrentPath('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('_subject', 'Nuevo contacto desde bytewise.mx');
    formData.append('_cc', 'contact@bytewise.mx');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    setIsContactSending(true);
    setContactStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/b82159a0730c6b856904deab14c19acf', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario');
      }

      form.reset();
      setContactStatus({
        type: 'success',
        message: 'Mensaje enviado correctamente. Te responderemos en menos de 24 horas hábiles.'
      });
      setShowSubmitShield(true);
      if (successOverlayTimeoutRef.current) {
        window.clearTimeout(successOverlayTimeoutRef.current);
      }
      successOverlayTimeoutRef.current = window.setTimeout(() => {
        setShowSubmitShield(false);
      }, 1900);
    } catch {
      setContactStatus({
        type: 'error',
        message: 'No pudimos enviar el mensaje. Intenta nuevamente o contáctanos por WhatsApp.'
      });
    } finally {
      setIsContactSending(false);
    }
  };

  const valueCarouselItems = values.map((value, index) => {
    const iconList = [
      {
        icon: <i className="pi pi-check-circle carousel-icon" style={{ color: '#f8fafc' }} />,
        bg: 'linear-gradient(145deg, #2563eb, #0f172a)'
      },
      {
        icon: <i className="pi pi-check-circle carousel-icon" style={{ color: '#f8fafc' }} />,
        bg: 'linear-gradient(145deg, #0f766e, #0f172a)'
      },
      {
        icon: <i className="pi pi-lock carousel-icon" style={{ color: '#f8fafc' }} />,
        bg: 'linear-gradient(145deg, #7c3aed, #0f172a)'
      },
      {
        icon: <i className="pi pi-shield carousel-icon" style={{ color: '#f8fafc' }} />,
        bg: 'linear-gradient(145deg, #1d4ed8, #111827)'
      },
      {
        icon: <i className="pi pi-bolt carousel-icon" style={{ color: '#f8fafc' }} />,
        bg: 'linear-gradient(145deg, #0ea5e9, #0f172a)'
      },
      {
        icon: <i className="pi pi-star carousel-icon" style={{ color: '#f8fafc' }} />,
        bg: 'linear-gradient(145deg, #0891b2, #172554)'
      }
    ];

    return {
      id: value.title,
      title: value.title,
      description: value.desc,
      icon: iconList[index % iconList.length].icon,
      iconBg: iconList[index % iconList.length].bg
    };
  });

  const pageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.55)), url(${fondo})`,
  };

  const getServiceIcon = (serviceId: string, serviceIcon: string) => {
    if (serviceIcon === 'pi-shield') {
      return (
        <img
          src={escudoImg}
          alt="Escudo"
          style={{ width: '42px', height: '42px', objectFit: 'contain' }}
        />
      );
    }

    const iconByService: Record<string, ReactNode> = {
      lfpdppp: <FaShieldHalved style={{ color: '#7dd3fc' }} />,
      'admin-ti': <FaUsersGear style={{ color: '#c4b5fd' }} />,
      'consultoria-ia': <FaBrain style={{ color: '#67e8f9' }} />,
      pentesting: <FaMagnifyingGlassChart style={{ color: '#93c5fd' }} />,
      forense: <FaDatabase style={{ color: '#f9a8d4' }} />,
      'desarrollo-sistemas': <FaGear style={{ color: '#fcd34d' }} />
    };

    return iconByService[serviceId] ?? <i className={`pi ${serviceIcon}`} />;
  };

  const serviceBentoItems = services.map((service) => ({
    id: service.id,
    anchorId: service.id,
    color: '#0f172a',
    label: `Servicio ${service.num}`,
    title: service.title,
    description: service.copy,
    sections: service.sections,
    note: service.note,
    ctaText: service.cta,
    ctaHref: '#contacto',
    icon: getServiceIcon(service.id, service.icon)
  }));

  const isBlogPage = currentPath === '/blog';
  const blogMenuItems = [
    { label: 'INICIO', ariaLabel: 'Volver al inicio', link: '/' },
    { label: 'BLOG', ariaLabel: 'Ver blog', link: '/blog' },
    { label: 'CONTACTO', ariaLabel: 'Ir a contacto', link: '/#contacto' }
  ];

  if (isBlogPage) {
    return (
      <div className="page blog-page">
        <div className={`page-loader ${isPageReady ? 'is-hidden' : ''}`} aria-hidden={isPageReady}>
          <div className="page-loader-inner">
            <img src={logo} alt="ByteWise" className="page-loader-logo" decoding="async" fetchPriority="high" />
            <p>Cargando experiencia segura...</p>
            <span className="page-loader-bar" />
          </div>
        </div>

        <div className={`blog-entry-loader ${isBlogLoaderVisible ? '' : 'is-hidden'}`} aria-hidden={!isBlogLoaderVisible}>
          <div className="blog-entry-loader-panel">
            <span className="blog-entry-loader-kicker">ByteWise Blog</span>
            <div className="blog-entry-loader-emblem" aria-hidden="true">
              <img src={escudoImg} alt="" decoding="async" />
            </div>
            <p className="blog-entry-loader-title">Compilando señales</p>
            <div className="blog-entry-loader-code" aria-hidden="true">
              <span>SCAN_NEWS: OK</span>
              <span>CYBER_FEED: READY</span>
              <span>AI_ANALYSIS: LOADING</span>
            </div>
            <span className="blog-entry-loader-bar" aria-hidden="true"></span>
          </div>
        </div>

        <div className="blog-bw-bg" style={{ '--blog-shield-texture': `url(${escudoImg})` } as React.CSSProperties} aria-hidden="true">
          <span className="blog-code-rain rain-1">01001011<br />root@bytewise<br />SCAN_PORTS<br />0x7F IA<br />ISO27001<br />ACCESS_OK</span>
          <span className="blog-code-rain rain-2">defense.log<br />CVE_TRACE<br />10110100<br />LFPDPPP<br />AI_MODEL<br />PATCH_NOW</span>
          <span className="blog-code-rain rain-3">risk_score<br />443/tcp<br />0101_IA<br />FORENSE<br />HASH:9AF<br />SECURE</span>
          <span className="blog-code-rain rain-4">nmap -sV<br />BANK_SYS<br />00011101<br />AUTH_DENY<br />CYBER_OPS<br />TRACE</span>
          <span className="blog-code-rain rain-5">encrypt()<br />SOC_ALERT<br />11001010<br />WEB_APP<br />ZERO_TRUST<br />MONITOR</span>
        </div>

        <div className="bg-geometry" aria-hidden="true">
          <div className="glow top-left"></div>
          <div className="glow bottom-right"></div>
        </div>

        <StaggeredMenu
          position="right"
          items={blogMenuItems}
          socialItems={[]}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#0f172a"
          changeMenuColorOnOpen={true}
          colors={['#0f172a', '#1d4ed8']}
          logoUrl={logo}
          logoHref="/"
          accentColor="#2563eb"
          isFixed={true}
        />

        <main className="blog-page-main">
          <section className="blog-page-hero">
            <div className="container">
              <div className="blog-page-heading">
                <h1 className="comic-blog-title">Mas noticias, recursos y publicaciones</h1>
                <p className="comic-blog-subtitle">
                  Consulte mas avisos, recursos educativos y analisis de ciberseguridad, IA y tecnologia.
                </p>
              </div>
            </div>
          </section>

          <section className="blog-publish-section">
            <div className="container">
              <div className="published-blog-list">
                <div className="published-blog-head">
                  <h3>Mas publicaciones</h3>
                  <span>{moreBlogArticles.length} publicacion{moreBlogArticles.length === 1 ? '' : 'es'}</span>
                </div>

                <div className="blog-content-layout">
                  <div className="published-blog-grid">
                    {moreBlogArticles.map((post) => {
                      const postId = `${post.title}-${post.date}`;
                      const isExpanded = expandedBlogPostId === postId;

                      return (
                        <article className="published-blog-card" key={postId}>
                          {'image' in post && post.image && (
                            <img src={post.image} alt={post.title} className="published-blog-image" loading="lazy" decoding="async" />
                          )}
                          <div className="blog-meta">
                            <span className="blog-tag">{post.category}</span>
                            <span className="blog-date">{post.date}</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p className="published-blog-summary">{post.summary}</p>
                          {isExpanded && (
                            <div className="published-blog-expanded">
                              <p className="published-blog-content">{post.content}</p>
                              {'source' in post && post.source && (
                                <a href={post.source} className="published-blog-source" target="_blank" rel="noreferrer">
                                  Fuente
                                </a>
                              )}
                            </div>
                          )}
                          <button
                            type="button"
                            className="published-blog-more"
                            onClick={() => setExpandedBlogPostId(isExpanded ? null : postId)}
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? 'Ver menos' : 'Ver mas'}
                          </button>
                        </article>
                      );
                    })}
                  </div>

                  <aside className="blog-ad-sidebar" aria-label="Anuncios de ByteWise">
                    <div className="blog-ad-sidebar-inner">
                      <span className="blog-ad-label">Anuncios ByteWise</span>
                      {blogSidebarAds.map((ad, index) => (
                        <a
                          href={index === 1 ? '/#ia' : index === 2 ? '/#servicios' : '/#contacto'}
                          className="blog-ad-card"
                          key={ad.title}
                        >
                          <span className="blog-ad-kicker">{ad.eyebrow}</span>
                          <strong>{ad.title}</strong>
                          <span>{ad.copy}</span>
                          <em>{ad.cta}</em>
                        </a>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>        </main>

        <footer className="footer-main footer-main--minimal">
          <div className="container">
            <div className="footer-bottom footer-bottom--minimal">
              <p>© {currentYear} ByteWise: Data & Cybersecurity. Todos los derechos reservados.</p>
              <div className="legal-links legal-links--minimal">
                <a href="/">Política de Privacidad</a>
              </div>
            </div>
          </div>
        </footer>
        <ChatBot />
      </div>
    );
  }

  return (
    <div className="page">
      <div className={`page-loader ${isPageReady ? 'is-hidden' : ''}`} aria-hidden={isPageReady}>
        <div className="page-loader-inner">
          <img src={logo} alt="ByteWise" className="page-loader-logo" decoding="async" fetchPriority="high" />
          <p>Cargando experiencia segura...</p>
          <span className="page-loader-bar" />
        </div>
      </div>

      <div className={`submit-shield-overlay ${showSubmitShield ? 'is-visible' : ''}`} aria-hidden={!showSubmitShield}>
        <div className="submit-shield-inner">
          <img src={escudoImg} alt="Mensaje enviado" className="submit-shield-image" decoding="async" />
          <p>Mensaje enviado correctamente</p>
        </div>
      </div>

      {/* FULLSCREEN ANIMATED BACKGROUND */}
      <div className="animated-bg" style={pageStyle}></div>

      {/* BACKGROUND ELEMENTS */}
      <div className="bg-geometry" aria-hidden="true">
        <div className="glow top-left"></div>
        <div className="glow bottom-right"></div>
      </div>

      <StaggeredMenu
        position="right"
        items={topMenuItems}
        socialItems={[]}
        displaySocials={false}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#0f172a"
        changeMenuColorOnOpen={true}
        colors={['#0f172a', '#1d4ed8']}
        logoUrl={logo}
        accentColor="#2563eb"
        isFixed={true}
      />

      <main>
        {/* SECTION 1 ??" HERO */}
        <section className="hero-section text-center" id="inicio">
          <div className="hero-content">
            <h1 className="hero-typing">
              <TextType
                as="span"
                className="hero-typing-text"
                text={HERO_SLOGANS}
                typingSpeed={75}
                deletingSpeed={50}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                variableSpeed={null}
                revealEffect="none"
              />
            </h1>
            <p className="lede fade-in">
              ByteWise es una firma especializada en ciberseguridad, cumplimiento normativo, inteligencia artificial y desarrollo tecnológico, que acompaña a su organización desde el diagnóstico inicial hasta la implementación de soluciones estratégicas que impulsan su crecimiento y protegen sus activos.
            </p>
            <div className="cta-group animated-fade">
              <ElectricBorder
                color="#EAF4FF"
                speed={1.05}
                chaos={0.14}
                thickness={2.4}
                borderRadius={10}
                disabled={isMobileViewport}
                className="hero-electric-button"
              >
                <a href="#contacto" className="primary shadow-pulse">Solicitar diagnóstico gratuito</a>
              </ElectricBorder>
              <ElectricBorder
                color="#22D3EE"
                speed={1}
                chaos={0.13}
                thickness={2.2}
                borderRadius={10}
                disabled={isMobileViewport}
                className="hero-electric-button"
              >
                <a href="#servicios" className="ghost">Conocer nuestros servicios</a>
              </ElectricBorder>
            </div>
            <div className="announcement-slidebar" aria-label="Anuncios de ByteWise">
              <div className="announcement-track">
                {[...heroAnnouncements, ...heroAnnouncements].map((announcement, index) => (
                  <span className="announcement-item" key={`${announcement}-${index}`}>
                    {announcement}
                  </span>
                ))}
              </div>
            </div>
            <div className="trust-badges mt-6" aria-live="polite">
              <span key={activeTrustBadge} className="trust-badge-item">
                {trustBadgeItems[activeTrustBadge]}
              </span>
              <div className="trust-badge-indicators" aria-hidden="true">
                {trustBadgeItems.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`trust-badge-dot ${index === activeTrustBadge ? 'is-active' : ''}`}
                    onClick={() => setActiveTrustBadge(index)}
                  />
                ))}
              </div>
            </div>
            <div className="hero-world" aria-hidden="true">
              <div className="hero-world-orbit hero-world-orbit--outer"></div>
              <div className="hero-world-orbit hero-world-orbit--inner"></div>
              <div className="hero-world-globe">
                <span className="hero-world-grid hero-world-grid--vertical"></span>
                <span className="hero-world-grid hero-world-grid--horizontal"></span>
                <span className="hero-world-shine"></span>
                <img src={escudoImg} alt="" className="hero-world-shield" loading="lazy" decoding="async" />
              </div>
              <span className="hero-world-signal hero-world-signal--one"></span>
              <span className="hero-world-signal hero-world-signal--two"></span>
            </div>
          </div>
        </section>

        {/* SECTION 2 ??" SOBRE BYTEWISE */}
        <section className="about-section" id="sobre-bytewise">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">¿Por qué ByteWise?</span>
              <h2>Lo que nos diferencia</h2>
            </div>
            <div className="about-diff-panel mb-5">
              <div className="about-diff-title">Lo que nos diferencia</div>
              <ul className="about-diff-list">
                <li>Diagnóstico inicial claro y accionable (sin costo)</li>
                <li>Enfoque integral: seguridad, cumplimiento, IA y desarrollo</li>
                <li>Implementación práctica, no solo consultoría teórica</li>
                <li>Soluciones adaptadas al tamaño y madurez de cada organización</li>
                <li>Acompañamiento continuo, no proyectos aislados</li>
              </ul>
            </div>

            <div className="mission-vision-grid mt-4">
              <div className="card glass-card">
                <h3><img src={misionImg} alt="Misión" loading="lazy" decoding="async" />NUESTRA MISIÓN</h3>
                <p>Ofrecer servicios de ciberseguridad de calidad certificada, basados en el entendimiento profundo de las necesidades de cada cliente, estableciendo relaciones de confianza a largo plazo.</p>
              </div>
              <div className="card glass-card">
                <h3><img src={visionImg} alt="Visión" loading="lazy" decoding="async" />NUESTRA VISIÓN</h3>
                <p>Ser reconocidos como la firma líder en soluciones de ciberseguridad e inteligencia artificial en Aguascalientes y México, distinguidos por un servicio personalizado y a la vanguardia del entorno digital.</p>
              </div>
            </div>

            <h3 className="values-title text-center mt-5 mb-4">Nuestros Valores</h3>
            <div className="values-carousel-host">
              <div className="values-carousel-wrapper">
                <Carousel
                  items={valueCarouselItems}
                  baseWidth={isMobileViewport ? 300 : 460}
                  autoplay
                  performanceMode={isMobileViewport}
                  autoplayDelay={3000}
                  pauseOnHover={false}
                  loop
                  round={false}
                />
              </div>
            </div>

            <div className="differentiator animate-on-scroll">
              <div className="diff-icon-box">
                <img src={escudoImg} alt="Escudo ByteWise" className="diff-logo" loading="lazy" decoding="async" />
              </div>
              <div className="diff-content">
                <p><strong>La combinación de experiencia en ISO 27001:2022 e Inteligencia Artificial</strong> nos permite ofrecer una solución integral única en el mercado: seguridad robusta y procesos optimizados, bajo un mismo equipo consultor.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="workflow-section mt-5" id="como-trabajamos">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Metodología</span>
              <h2>Cómo trabajamos</h2>
            </div>
            <div className="workflow-carousel-stage animate-on-scroll">
              <Carousel
                items={workProcessCarouselItems}
                baseWidth={isTinyMobileViewport ? 288 : isMobileViewport ? 320 : 360}
                autoplay
                performanceMode={isMobileViewport}
                autoplayDelay={2000}
                pauseOnHover={false}
                loop
                round
              />
            </div>
          </div>
        </section>

        {/* SECTION 3 ??" SERVICIOS */}
        <section className="services-section" id="servicios">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Soluciones Integrales</span>
              <h2>Nuestros Servicios</h2>
              <p className="lede">Soluciones integrales de ciberseguridad, tecnología e inteligencia artificial diseñadas a la medida de su organización.</p>
            </div>

            <div className="services-grid mt-5 animate-on-scroll">
              <MagicBento
                items={serviceBentoItems}
                textAutoHide={true}
                enableStars={!isMobileViewport}
                enableSpotlight={!isMobileViewport}
                enableBorderGlow={!isMobileViewport}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect={!isMobileViewport}
                spotlightRadius={400}
                particleCount={isMobileViewport ? 0 : 12}
                glowColor="132, 0, 255"
                disableAnimations={isMobileViewport}
              />
            </div>
          </div>
        </section>

        {/* SECTION 4 ??" CONSULTORÍA IA */}
        <section className="ai-section mt-5" id="ia">
          <div className="container p-relative">
            <div className="ai-backdrop"></div>
            <div className="section-heading text-center">
              <span className="eyebrow">Inteligencia Artificial</span>
              <h2>IA aplicada a su negocio</h2>

            </div>
            <p className="section-p text-center mb-5 ai-intro-text">
              Un consultor de IA es el puente entre la tecnología disponible y los objetivos reales de su organización. En ByteWise analizamos sus procesos, diseñamos soluciones a la medida e implementamos herramientas que generan valor desde el primer día.
            </p>

            <div className="ai-grid">
              <div className="ai-card-swap-stage">
                <div className="ai-card-swap-frame">
                  <CardSwap
                    width={isTinyMobileViewport ? 300 : isMobileViewport ? 360 : 560}
                    height={isTinyMobileViewport ? 350 : isMobileViewport ? 390 : 420}
                    cardDistance={92}
                    verticalDistance={92}
                    delay={5200}
                    pauseOnHover={false}
                    easing={isMobileViewport ? 'smooth' : 'elastic'}
                  >
                    {aiUseCases.map((ai) => (
                      <Card key={ai.title} customClass="ai-swap-card">
                        <div className="ai-swap-card-content">
                          <span className="ai-icon" style={{ color: ai.iconColor }}>{ai.icon}</span>
                          <h4>{ai.title}</h4>
                          <p>{ai.desc}</p>
                        </div>
                      </Card>
                    ))}
                  </CardSwap>
                </div>
              </div>
            </div>

            <div className="ai-cta-block text-center">
              <a href="#contacto" className="primary large ai-electric-cta">
                &rarr; Agendar diagnóstico de IA gratuito
              </a>
              <a
                href="https://api.whatsapp.com/message/XNBDNNUK7TYSF1?autoload=1&app_absent=0"
                className="ai-chatbot-cta"
                target="_blank"
                rel="noreferrer"
              >
                <i className="pi pi-comments"></i>
                Probar nuestros chatbots para empresas e instituciones
              </a>
              <p className="support-text">En 30 minutos identificamos las oportunidades de IA con mayor impacto para su organización.</p>
            </div>
          </div>
        </section>

        {/* SECTION 5 ??" CONTINUIDAD OPERATIVA */}
        <section className="risk-data-section mt-5" id="continuidad-datos">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Continuidad Operativa</span>
              <h2>Riesgo por pérdida de información</h2>
            </div>
            <div className="ai-risk-swap-stage">
              <div className="ai-risk-intro">¿Qué pasaría si hoy pierde su información?</div>
              <p className="ai-risk-subtitle">La operación de su empresa depende completamente de sus datos.</p>
              <div className="ai-risk-swap-frame">
                <CardSwap
                  width={isTinyMobileViewport ? 285 : isMobileViewport ? 340 : 520}
                  height={isTinyMobileViewport ? 240 : isMobileViewport ? 270 : 300}
                  cardDistance={72}
                  verticalDistance={65}
                  delay={5600}
                  pauseOnHover={false}
                  easing={isMobileViewport ? 'smooth' : 'elastic'}
                >
                  {aiRiskCards.map((item) => (
                    <Card key={item.title} customClass="ai-swap-card ai-risk-card">
                      <div className="ai-swap-card-content">
                        <span className="ai-icon" style={{ color: item.iconColor }}>{item.icon}</span>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 ??" ALERTA DE INCIDENTE */}
        <section className="incident-alert-section mt-5" id="alerta-incidente">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Respuesta ante Incidentes</span>
              <h2>IMAGINA QUE HOY SUFRES UN ROBO O ATAQUE</h2>
            </div>

            <div className="incident-alert-card">
              <ScrollReveal
                baseOpacity={0.28}
                enableBlur
                baseRotation={1.2}
                blurStrength={2.2}
                highlightWords={['Pentesting', 'Forense']}
                rotationEnd="top 78%"
                wordAnimationEnd="top 70%"
                containerClassName="incident-reveal incident-reveal-block"
                textClassName="incident-reveal-text incident-reveal-titleline"
              >
                {'¿Sabrías qué te robaron?\n¿Tendrías evidencia para actuar?\n¿O solo descubrirías el problema cuando ya es demasiado tarde?'}
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.3}
                enableBlur
                baseRotation={1}
                blurStrength={2}
                highlightWords={['Pentesting', 'Forense']}
                rotationEnd="top 80%"
                wordAnimationEnd="top 72%"
                containerClassName="incident-reveal incident-reveal-block"
                textClassName="incident-reveal-text"
              >
                {'La mayoría de las empresas no detecta un ataque...\nhasta que el daño está hecho.'}
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.32}
                enableBlur
                baseRotation={1}
                blurStrength={2}
                highlightWords={['Pentesting', 'Forense']}
                rotationEnd="top 80%"
                wordAnimationEnd="top 72%"
                containerClassName="incident-reveal incident-reveal-block incident-reveal-emphasis"
                textClassName="incident-reveal-text"
              >
                {'Lo que no pruebas (Pentesting), no lo puedes prevenir.\nLo que no analizas (Forense), no lo puedes resolver.'}
              </ScrollReveal>

              <div className="incident-actions">
                <p>&rarr; Evalúa tus vulnerabilidades antes de que alguien más lo haga</p>
                <p>&rarr; Actúa con evidencia, no con suposiciones.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="education-highlight-section mt-5" id="instituciones-educativas">
          <div className="container">
            <div className="education-highlight-card">
              <div className="education-highlight-media">
                <img
                  src={escuelaImg}
                  alt="Instituciones educativas protegidas por ByteWise"
                  className="education-highlight-image"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 900px) 96vw, 460px"
                />
              </div>
              <div className="education-highlight-content">
                <span className="eyebrow">Instituciones educativas</span>
                <h2>Protección integral para el entorno académico</h2>
                <p>
                  Trabajamos también con instituciones educativas donde la seguridad de la información es clave,
                  gestionando el flujo constante de datos confidenciales y blindando su infraestructura contra las
                  vulnerabilidades que hoy afectan a universidades públicas a nivel nacional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 - NUESTRO EQUIPO */}
        <section className="team-section mt-5" id="equipo">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">El equipo detrás de ByteWise</span>
              <h2>Certificaciones y formación</h2>
              <p className="lede">Capacidades estratégicas y técnicas para proteger, optimizar y escalar su organización.</p>
            </div>

            <div className="certs-grid mt-5">
              {certifications.map((item) => (
                <div className="cert-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>

            <div className="team-specialization-title mt-5">
              <span>Especialización técnica</span>
            </div>

            <div className="specialization-grid mt-4">
              {technicalSpecializations.map((item) => (
                <article className="specialization-card" key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7, 8, 9 ??" CLIENTES, NOTICIAS, DESCARGAS */}
        <section className="grid-3-sections mt-5">
          <div className="container">
            <div className="complex-grid">

              {/* Clientes */}
              <div className="panel clientes-panel" id="clientes">
                <h3>Organizaciones que confían en ByteWise</h3>
                <p className="mb-3 text-muted">
                  Trabajamos con organizaciones de distintos sectores en Aguascalientes y México, acompañándolas en el fortalecimiento de su seguridad, cumplimiento y madurez tecnológica.
                </p>

                <div className="client-trust-block">
                  <p className="client-trust-title">Empresas que ya confían en nosotros:</p>
                  <div className="client-pill-list">
                    <span className="client-pill">E-Net-Corp</span>
                    <span className="client-pill">Grupo Millenium</span>
                  </div>
                  <figure className="client-companies-figure">
                    <img
                      src={empresasImg}
                      alt="Empresas que confían en ByteWise"
                      className="client-companies-image"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1024px) 96vw, 560px"
                    />
                  </figure>
                </div>

                <div className="client-note-box">
                  <p>
                    Seguimos colaborando con más organizaciones en distintos proyectos de ciberseguridad, cumplimiento e implementación tecnológica.
                  </p>
                </div>

                <div className="client-testimonials mt-4">
                  {clientTestimonials.map((item) => (
                    <article className="client-message-card" key={item.author}>
                      <header className="client-message-head">
                        <div className="client-avatar" aria-hidden="true">{item.avatar}</div>
                        <div className="client-meta">
                          <strong>{item.author}</strong>
                          <span>{item.tag} · {item.company}</span>
                        </div>
                        <i className="pi pi-comment client-message-icon" aria-hidden="true"></i>
                      </header>
                      <p>{item.quote}</p>
                    </article>
                  ))}
                </div>

                <a href="#contacto" className="mock-link mt-3 d-inline-block">&rarr; Conviértase en nuestro próximo caso de éxito</a>
              </div>

              {/* Descargas */}
              <div className="panel descargas-panel" id="descargas">
                <h3>Recursos Descargables</h3>
                <p className="text-muted mb-4">Acceda a nuestra documentación comercial para conocer en detalle nuestros servicios, metodología y propuesta de valor.</p>

                <div className="download-item">
                  <h4><i className="pi pi-file-pdf text-red-500 mr-2"></i> Presentación Ejecutiva ByteWise</h4>
                  <p className="small-text">Descripción completa de servicios, metodología de trabajo, equipo y casos de referencia.</p>
                  <span className="doc-meta">Formato: PDF · Archivo disponible</span>
                  <a href="/downloads/BYTEWISE-INFO.pdf" className="download-link text-blue" target="_blank" rel="noreferrer" download>
                    &rarr; Descargar presentación
                  </a>
                </div>

                <div className="download-item mt-4">
                  <h4><i className="pi pi-file-pdf text-red-500 mr-2"></i> ByteWise Institucional</h4>
                  <p className="small-text">Documento institucional con información general, propuesta de valor y capacidades de ByteWise.</p>
                  <span className="doc-meta">Formato: PDF · Archivo disponible</span>
                  <a href="/downloads/bytewise_institucional.pdf" className="download-link text-blue" target="_blank" rel="noreferrer" download>
                    &rarr; Descargar documento institucional
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 ??" NOTICIAS Y RECURSOS (BLOG) */}
        <section className="blog-section mt-5" id="noticias">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Nuestro Blog</span>
              <h2>Noticias y Recursos</h2>
              <p className="lede">Manténgase informado sobre las últimas amenazas, tendencias en seguridad e inteligencia artificial.</p>
            </div>

            <div className="blog-social-header">
              <span>Síguenos en nuestras redes sociales:</span>
              <a href="https://instagram.com/bytewise_mx" target="_blank" rel="noreferrer"><i className="pi pi-instagram"></i> @bytewise_mx</a>
              <a href="https://facebook.com/Bytewise.mx" target="_blank" rel="noreferrer"><i className="pi pi-facebook"></i> Bytewise.mx</a>
            </div>

            <div className="blog-grid mt-4">
              {newsArticles.map((article, i) => (
                <article className={`blog-card ${i === 0 ? 'featured' : ''}`} key={i}>
                  {article.image ? (
                    <button
                      type="button"
                      className="blog-image-button"
                      onClick={() => setSelectedNewsImage({ src: article.image!, title: article.title })}
                      aria-label={`Ver imagen completa de: ${article.title}`}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="blog-image"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 92vw, 460px"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </button>
                  ) : (
                    <div className="blog-image-placeholder">
                      <i className="pi pi-image mr-2"></i> Insertar Imagen
                    </div>
                  )}
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-tag">{article.category}</span>
                      <span className="blog-date">{article.date}</span>
                    </div>
                    <h3>
                      {article.image ? (
                        <button
                          type="button"
                          className="blog-title-button"
                          onClick={() => setSelectedNewsImage({ src: article.image!, title: article.title })}
                        >
                          {article.title}
                        </button>
                      ) : (
                        <span>{article.title}</span>
                      )}
                    </h3>
                  </div>
                </article>
              ))}
              <a href="/blog" className="blog-card blog-more-card" onClick={navigateToBlogPage} aria-label="Ver mas publicaciones del blog">
                <span className="blog-more-card-orbit" aria-hidden="true"></span>
                <span className="blog-more-card-kicker">Explorar recursos</span>
                <strong>Ver mas</strong>
                <span>Acceda a mas publicaciones, guias y analisis preparados por ByteWise.</span>
                <i className="pi pi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </section>

        {selectedNewsImage && (
          <div className="news-lightbox" role="dialog" aria-modal="true" aria-label={selectedNewsImage.title} onClick={() => setSelectedNewsImage(null)}>
            <div className="news-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="news-lightbox-close"
                onClick={() => setSelectedNewsImage(null)}
                aria-label="Cerrar imagen"
              >
                ×
              </button>
              <img src={selectedNewsImage.src} alt={selectedNewsImage.title} className="news-lightbox-image" decoding="async" />
              <p className="news-lightbox-caption">{selectedNewsImage.title}</p>
            </div>
          </div>
        )}

        {/* SECTION 10 ??" CONTACTO */}
        <section className="contact-section mt-5" id="contacto">
          <div className="container">
            <div className="contact-card animate-on-scroll">
              <div className="contact-info">
                <h2>Hablemos sobre su organización</h2>
                <p className="mb-4">Estamos disponibles para resolver sus dudas, presentar una propuesta o agendar un diagnóstico inicial sin costo.</p>

                <ul className="contact-list">
                  <li><i className="pi pi-envelope"></i> <strong>General:</strong> contact@bytewise.mx</li>
                  <li><i className="pi pi-shopping-cart"></i> <strong>Ventas:</strong> ventas@bytewise.mx</li>
                  <li><i className="pi pi-briefcase"></i> <strong>Estrategia:</strong> f.covarrubias@bytewise.mx</li>
                  <li><i className="pi pi-phone"></i> <strong>Tel/WhatsApp:</strong> 4493639220</li>
                  <li><i className="pi pi-globe"></i> <strong>Web:</strong> www.bytewise.mx</li>
                  <li><i className="pi pi-map-marker"></i> <strong>Ubicación:</strong> Aguascalientes, México</li>
                </ul>

                <a href="https://api.whatsapp.com/message/XNBDNNUK7TYSF1?autoload=1&app_absent=0" className="whatsapp-btn mt-4 inline-flex items-center" target="_blank" rel="noreferrer">
                  <i className="pi pi-whatsapp mr-2 text-xl"></i>
                  ¿Consulta urgente? Escríbanos por WhatsApp
                </a>
              </div>

              <div className="contact-form">
                <h3>Envíenos un mensaje</h3>
                <p className="small-text mb-3">Le contactaremos en menos de 24 horas hábiles.</p>
                <form onSubmit={handleContactSubmit}>
                  <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <div className="input-group">
                    <div className="field-control">
                      <label htmlFor="contact-nombre">Nombre completo *</label>
                      <input id="contact-nombre" type="text" name="nombre" placeholder="Nombre completo" required />
                    </div>
                    <div className="field-control">
                      <label htmlFor="contact-empresa">Empresa / Organización *</label>
                      <input id="contact-empresa" type="text" name="empresa" placeholder="Empresa / Organización" required />
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="field-control">
                      <label htmlFor="contact-correo">Correo electrónico *</label>
                      <input id="contact-correo" type="email" name="correo" placeholder="correo@empresa.com" required />
                    </div>
                    <div className="field-control">
                      <label htmlFor="contact-telefono">Teléfono (opcional)</label>
                      <input id="contact-telefono" type="tel" name="telefono" placeholder="4493639220" />
                    </div>
                  </div>
                  <div className="field-control field-control--full">
                    <label htmlFor="contact-servicio">Servicio de interés *</label>
                    <select id="contact-servicio" name="servicio" defaultValue="" required>
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="ciberseguridad">Ciberseguridad</option>
                      <option value="iso">ISO 27001</option>
                      <option value="admin-ti">Administración TI</option>
                      <option value="ia">Consultoría IA</option>
                      <option value="software">Desarrollo de Software</option>
                      <option value="pentesting">Pentesting</option>
                      <option value="forense">Forense</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="field-control field-control--full">
                    <label htmlFor="contact-mensaje">Mensaje *</label>
                    <textarea id="contact-mensaje" name="mensaje" placeholder="Cuéntenos brevemente cómo podemos ayudarle" rows={4} required></textarea>
                  </div>
                  <div className="w-full mt-3 electric-submit-wrapper">
                    <ElectricBorder
                      color="#38bdf8"
                      speed={1.5}
                      chaos={0.2}
                      thickness={2}
                      borderRadius={8}
                      disabled={isMobileViewport}
                      className="w-full block"
                    >
                      <button 
                        type="submit" 
                        className="primary btn-submit" 
                        disabled={isContactSending}
                        style={{ margin: 0 }}
                      >
                        {isContactSending ? 'Enviando...' : 'Enviar mensaje'}
                      </button>
                    </ElectricBorder>
                  </div>
                  {contactStatus.type !== 'idle' && (
                    <p className={`contact-form-status ${contactStatus.type === 'success' ? 'ok' : 'error'}`}>
                      {contactStatus.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* SECTION 11 ??" FOOTER */}
      <footer className="footer-main footer-main--minimal">
        <div className="container">
          <div className="footer-bottom footer-bottom--minimal">
            <p>© {currentYear} ByteWise: Data & Cybersecurity. Todos los derechos reservados.</p>
            <div className="legal-links legal-links--minimal">
              <a href="#">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}

export default App;

