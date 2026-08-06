import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

interface ServiceDeliverable {
  title: string;
  desc: string;
}

interface ServiceCard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  ctaHref: string;
  deliverables: ServiceDeliverable[];
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'consultoria-ciberseguridad',
    category: 'SECURITY & COMPLIANCE',
    title: 'Consultoría Ciberseguridad',
    subtitle: 'ISO 27001 · SGSI · BACKUPS',
    description: 'Garantice la continuidad de su negocio: estructuramos su SGSI bajo normas internacionales y blindamos su información crítica con respaldos seguros e inmutables.',
    gradientFrom: '#1a3a6b',
    gradientTo: '#2d6aad',
    ctaHref: '#contact',
    deliverables: [
      { title: 'Diagnóstico de Riesgos & Gap Analysis', desc: 'Identificación de brechas de seguridad y clasificación de activos críticos.' },
      { title: 'Diseño SGSI ISO 27001', desc: 'Estructuración de políticas, controles y procedimientos normativos.' },
      { title: 'Auditoría Interna & Cumplimiento', desc: 'Validación de controles de acceso y preparación para certificación.' },
      { title: 'Planes de Continuidad BCP/DRP', desc: 'Respuesta ante incidentes y respaldos automatizados de alta disponibilidad.' }
    ]
  },
  {
    id: 'cumplimiento-lfpdppp',
    category: 'LEGAL & COMPLIANCE',
    title: 'Cumplimiento LFPDPPP',
    subtitle: 'PRIVACIDAD · GOBERNANZA · CONTROL',
    description: 'Diseñamos políticas, avisos de privacidad y controles de gobernanza de datos para operar con orden legal, trazabilidad y total confianza ante reguladores.',
    gradientFrom: '#0f2b4a',
    gradientTo: '#1e5080',
    ctaHref: '#contact',
    deliverables: [
      { title: 'Inventario & Registro de Datos ARCO', desc: 'Mapeo de datos personales y flujos de tratamiento.' },
      { title: 'Avisos de Privacidad Integrales', desc: 'Redacción de avisos integrales, simplificados y cláusulas legales.' },
      { title: 'Medidas de Seguridad ARCO', desc: 'Implementación de controles físicos, técnicos y administrativos.' },
      { title: 'Capacitación al Personal', desc: 'Formación de colaboradores en protección de datos personales.' }
    ]
  },
  {
    id: 'administracion-ti',
    category: 'INFRASTRUCTURE & OPS',
    title: 'Administración de TI',
    subtitle: 'OPERACIONES · SOPORTE · CONTINUIDAD',
    description: 'Gestionamos soporte técnico, infraestructura de servidores, continuidad y estándares operativos para que su entorno tecnológico rinda al máximo rendimiento.',
    gradientFrom: '#0d3349',
    gradientTo: '#1a6080',
    ctaHref: '#contact',
    deliverables: [
      { title: 'Auditoría de Infraestructura', desc: 'Evaluación de servidores, redes y sistemas operativos.' },
      { title: 'Hardening & Optimización', desc: 'Blindaje de puertos, parches de seguridad y balanceo de carga.' },
      { title: 'Mesa de Ayuda 24/7', desc: 'Soporte preventivo y correctivo para usuarios finales.' },
      { title: 'Monitoreo de Redes', desc: 'Supervisión en tiempo real de ancho de banda y latencia.' }
    ]
  },
  {
    id: 'consultoria-ia',
    category: 'ARTIFICIAL INTELLIGENCE',
    title: 'Consultoría en IA',
    subtitle: 'AUTOMATIZACIÓN · AGENTES · ANÁLISIS',
    description: 'Convertimos procesos manuales en flujos inteligentes impulsados por modelos de lenguaje, asistentes virtuales y análisis predictivo con impacto directo en productividad.',
    gradientFrom: '#00c8ff',
    gradientTo: '#0055cc',
    ctaHref: '#contact',
    deliverables: [
      { title: 'Descubrimiento de Procesos', desc: 'Identificación de tareas repetitivas automatizables con IA.' },
      { title: 'Entrenamiento de Modelos', desc: 'Ajuste fino de LLMs con la base de conocimiento corporativa.' },
      { title: 'Despliegue de Agentes', desc: 'Integración de chatbots inteligentes y pipelines de automatización.' },
      { title: 'Medición de ROI', desc: 'Optimización de tiempos de respuesta y métricas de eficiencia.' }
    ]
  },
  {
    id: 'pentesting-analisis',
    category: 'OFFENSIVE SECURITY',
    title: 'Pentesting y Análisis',
    subtitle: 'PRUEBAS · EXPOSICIÓN · REMEDIACIÓN',
    description: 'Detectamos vectores de ataque mediante hackeo ético ofensivo, validamos superficies expuestas en aplicaciones web/móviles y priorizamos remediaciones.',
    gradientFrom: '#073b4c',
    gradientTo: '#3c7c8c',
    ctaHref: '#contact',
    deliverables: [
      { title: 'Reconocimiento & OSINT', desc: 'Recopilación de información sobre superficies de ataque expuestas.' },
      { title: 'Explotación Controlada', desc: 'Pruebas de penetración en redes, APIs y aplicaciones web.' },
      { title: 'Informe Ejecutivo & Técnico', desc: 'Documentación detallada de vulnerabilidades y severidad CVSS.' },
      { title: 'Re-Testing de Remediación', desc: 'Verificación del parcheo y cierre de agujeros de seguridad.' }
    ]
  },
  {
    id: 'forense-informatico',
    category: 'DIGITAL FORENSICS',
    title: 'Forense Informático',
    subtitle: 'EVIDENCIA · ANÁLISIS · RECUPERACIÓN',
    description: 'Analizamos evidencias digitales con rigor técnico y cadena de custodia para reconstruir incidentes de seguridad, fugas de datos y respaldar dictámenes legales.',
    gradientFrom: '#1a1a2e',
    gradientTo: '#16213e',
    ctaHref: '#contact',
    deliverables: [
      { title: 'Adquisición de Evidencias', desc: 'Extracción forense de discos, memorias RAM y dispositivos móviles.' },
      { title: 'Preservación & Hashing', desc: 'Garantía de la cadena de custodia con hashes criptográficos.' },
      { title: 'Análisis de Artifacts', desc: 'Reconstrucción de líneas de tiempo de intrusión y archivos borrados.' },
      { title: 'Dictamen Pericial', desc: 'Elaboración de reporte técnico con validez en litigios y auditorías.' }
    ]
  },
  {
    id: 'desarrollo-sistemas',
    category: 'CUSTOM SOFTWARE',
    title: 'Desarrollo de Sistemas',
    subtitle: 'PRODUCTO · INTEGRACIÓN · ENTREGA',
    description: 'Creamos plataformas web, móviles y herramientas a medida para escalar operaciones complejas, integrando arquitectura segura, APIs y alta disponibilidad.',
    gradientFrom: '#0f3460',
    gradientTo: '#533483',
    ctaHref: '#contact',
    deliverables: [
      { title: 'Levantamiento de Requerimientos', desc: 'Definición de arquitectura, stack tecnológico y UX/UI.' },
      { title: 'Desarrollo Ágil por Sprints', desc: 'Codificación con integración continua y buenas prácticas Clean Code.' },
      { title: 'Pruebas de Calidad & Seguridad', desc: 'QA automatizado, pruebas unitarias y revisión de código.' },
      { title: 'Despliegue & Mantenimiento', desc: 'Puesta en producción en la nube con monitoreo de rendimiento.' }
    ]
  }
];

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, AfterViewInit, OnDestroy {
  serviceCards = SERVICE_CARDS;
  cardGap = 40;
  
  currentIndex = 0;
  randomGlowIndex = 0;
  viewportWidth = 0;
  cardWidth = 300;
  
  touchStartX = 0;

  // Estado del Modal de Servicio (Recuadro Contorno Limpio)
  activeServiceModal: string | null = null;
  activeModalCard: ServiceCard | null = null;

  animating = false;

  private glowIntervalId: any = null;
  private wheelHandler: any = null;
  private touchStartHandler: any = null;
  private touchMoveHandler: any = null;
  private touchStartY = 0;

  cardVariables: Record<string, string>[] = [];

  private resizeObserver: ResizeObserver | null = null;
  private measureFn: () => void = () => {};

  @ViewChild('viewportRef') viewportRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.initializeCardStyles();
    if (isPlatformBrowser(this.platformId)) {
      this.startRandomGlowTimer();
    }
  }

  initializeCardStyles() {
    this.cardVariables = this.serviceCards.map(() => ({
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--card-scale': '1',
      '--parallax-x': '0px',
      '--parallax-y': '0px',
      '--wave-1-x': '0px',
      '--wave-1-y': '0px',
      '--wave-2-x': '0px',
      '--wave-2-y': '0px',
      '--wave-3-x': '0px',
      '--wave-3-y': '0px'
    }));
  }

  startRandomGlowTimer() {
    this.randomGlowIndex = Math.floor(Math.random() * this.serviceCards.length);
    this.glowIntervalId = setInterval(() => {
      let nextIndex = Math.floor(Math.random() * this.serviceCards.length);
      if (nextIndex === this.randomGlowIndex) {
        nextIndex = (nextIndex + 1) % this.serviceCards.length;
      }
      this.randomGlowIndex = nextIndex;
    }, 2400);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.measureFn = () => {
      this.viewportWidth = this.viewportRef?.nativeElement?.clientWidth ?? 0;
      const firstCardEl = document.querySelector('.service-deconstructed-card') as HTMLElement;
      this.cardWidth = firstCardEl?.offsetWidth ?? 300;
    };

    setTimeout(() => {
      this.measureFn();
    }, 100);

    if (typeof ResizeObserver !== 'undefined' && this.viewportRef) {
      this.resizeObserver = new ResizeObserver(() => {
        this.measureFn();
      });
      this.resizeObserver.observe(this.viewportRef.nativeElement);
    }

    window.addEventListener('resize', this.measureFn);
    this.setupScrollInterceptor();
  }

  ngOnDestroy() {
    if (this.glowIntervalId) {
      clearInterval(this.glowIntervalId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.measureFn);
      this.removeScrollLockListeners();
    }
  }

  private setupScrollInterceptor() {
    this.wheelHandler = (e: WheelEvent) => {
      const sectionEl = document.getElementById('features');
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.4;
      if (!inView) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown) {
        if (this.currentIndex < this.serviceCards.length - 1) {
          e.preventDefault();
          e.stopPropagation();
          if (!this.animating) {
            this.animating = true;
            this.nextCard();
            setTimeout(() => { this.animating = false; }, 220);
          }
        }
      } else if (isScrollingUp) {
        if (this.currentIndex > 0 && rect.top >= -50) {
          e.preventDefault();
          e.stopPropagation();
          if (!this.animating) {
            this.animating = true;
            this.prevCard();
            setTimeout(() => { this.animating = false; }, 220);
          }
        }
      }
    };

    this.touchStartHandler = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        this.touchStartY = e.touches[0].clientY;
      }
    };

    this.touchMoveHandler = (e: TouchEvent) => {
      const sectionEl = document.getElementById('features');
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.4;
      if (!inView) return;

      if (!e.touches || e.touches.length === 0) return;
      const touchY = e.touches[0].clientY;
      const deltaY = this.touchStartY - touchY;

      if (Math.abs(deltaY) < 18) return;

      if (deltaY > 0) {
        if (this.currentIndex < this.serviceCards.length - 1) {
          e.preventDefault();
          if (!this.animating) {
            this.animating = true;
            this.nextCard();
            this.touchStartY = touchY;
            setTimeout(() => { this.animating = false; }, 220);
          }
        }
      } else if (deltaY < 0) {
        if (this.currentIndex > 0 && rect.top >= -50) {
          e.preventDefault();
          if (!this.animating) {
            this.animating = true;
            this.prevCard();
            this.touchStartY = touchY;
            setTimeout(() => { this.animating = false; }, 220);
          }
        }
      }
    };

    window.addEventListener('wheel', this.wheelHandler, { passive: false });
    window.addEventListener('touchstart', this.touchStartHandler, { passive: true });
    window.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
  }

  private removeScrollLockListeners() {
    if (this.wheelHandler) {
      window.removeEventListener('wheel', this.wheelHandler);
    }
    if (this.touchStartHandler) {
      window.removeEventListener('touchstart', this.touchStartHandler);
    }
    if (this.touchMoveHandler) {
      window.removeEventListener('touchmove', this.touchMoveHandler);
    }
  }

  handlePointerMove(event: PointerEvent, index: number) {
    const cardEl = event.currentTarget as HTMLElement;
    const rect = cardEl.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    const rotateX = ((0.5 - y) * 16).toFixed(2);
    const rotateY = ((x - 0.5) * 16).toFixed(2);
    const parallaxX = `${((x - 0.5) * 40).toFixed(2)}px`;
    const parallaxY = `${((y - 0.5) * 40).toFixed(2)}px`;

    this.cardVariables[index] = {
      '--rotate-x': `${rotateX}deg`,
      '--rotate-y': `${rotateY}deg`,
      '--card-scale': '1.02',
      '--parallax-x': parallaxX,
      '--parallax-y': parallaxY,
      '--wave-1-x': `${((x - 0.5) * -14).toFixed(2)}px`,
      '--wave-1-y': `${((y - 0.5) * -8).toFixed(2)}px`,
      '--wave-2-x': `${((x - 0.5) * -20).toFixed(2)}px`,
      '--wave-2-y': `${((y - 0.5) * -12).toFixed(2)}px`,
      '--wave-3-x': `${((x - 0.5) * -26).toFixed(2)}px`,
      '--wave-3-y': `${((y - 0.5) * -16).toFixed(2)}px`
    };
  }

  resetMotion(index: number) {
    this.cardVariables[index] = {
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--card-scale': '1',
      '--parallax-x': '0px',
      '--parallax-y': '0px',
      '--wave-1-x': '0px',
      '--wave-1-y': '0px',
      '--wave-2-x': '0px',
      '--wave-2-y': '0px',
      '--wave-3-x': '0px',
      '--wave-3-y': '0px'
    };
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const delta = this.touchStartX - touchEndX;

    if (delta > 50) {
      this.nextCard();
    } else if (delta < -50) {
      this.prevCard();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable)
    ) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevCard();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextCard();
    } else if (event.key === 'Escape' && this.activeServiceModal) {
      this.closeModal();
    }
  }

  goToCard(index: number) {
    this.currentIndex = Math.max(0, Math.min(index, this.serviceCards.length - 1));
  }

  nextCard() {
    this.goToCard(this.currentIndex + 1);
  }

  prevCard() {
    this.goToCard(this.currentIndex - 1);
  }

  getTrackTransform() {
    const translateX = this.viewportWidth
      ? this.viewportWidth / 2 - this.cardWidth / 2 - this.currentIndex * (this.cardWidth + this.cardGap)
      : 0;
    return `translate3d(${translateX}px, 0, 0)`;
  }

  openModal(id: string) {
    this.activeServiceModal = id;
    this.activeModalCard = this.serviceCards.find(c => c.id === id) || null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.activeServiceModal = null;
    this.activeModalCard = null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  onContactClick() {
    this.closeModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
