import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, OnInit } from '@angular/core';

interface ServiceCard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  ctaHref: string;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'consultoria-ciberseguridad',
    category: 'SECURITY',
    title: 'Consultoría en Ciberseguridad',
    subtitle: 'ISO 27001 · SGSI · BACKUPS',
    description: 'Garantice la continuidad de su negocio: estructuramos su SGSI bajo normas internacionales y blindamos su información crítica con respaldos seguros.',
    gradientFrom: '#1a3a6b',
    gradientTo: '#2d6aad',
    ctaHref: '#contact'
  },
  {
    id: 'cumplimiento-lfpdppp',
    category: 'COMPLIANCE',
    title: 'Cumplimiento LFPDPPP',
    subtitle: 'PRIVACIDAD · GOBERNANZA · CONTROL',
    description: 'Diseñamos políticas, avisos y controles para operar con orden legal, trazabilidad y confianza.',
    gradientFrom: '#0f2b4a',
    gradientTo: '#1e5080',
    ctaHref: '#contact'
  },
  {
    id: 'administracion-ti',
    category: 'INFRASTRUCTURE',
    title: 'Administración de TI',
    subtitle: 'OPERACIONES · SOPORTE · CONTINUIDAD',
    description: 'Gestionamos soporte, continuidad y estándares operativos para que su entorno tecnológico rinda al máximo.',
    gradientFrom: '#0d3349',
    gradientTo: '#1a6080',
    ctaHref: '#contact'
  },
  {
    id: 'consultoria-ia',
    category: 'AI',
    title: 'Consultoría en IA',
    subtitle: 'AUTOMATIZACIÓN · AGENTES · ANÁLISIS',
    description: 'Convertimos procesos manuales en flujos inteligentes con impacto medible en productividad y velocidad.',
    gradientFrom: '#00c8ff',
    gradientTo: '#0055cc',
    ctaHref: '#contact'
  },
  {
    id: 'pentesting-analisis',
    category: 'SECURITY',
    title: 'Pentesting y Análisis',
    subtitle: 'PRUEBAS · EXPOSICIÓN · REMEDIACIÓN',
    description: 'Detectamos vectores de ataque, validamos superficies expuestas y priorizamos acciones de remediación.',
    gradientFrom: '#073b4c',
    gradientTo: '#3c7c8c',
    ctaHref: '#contact'
  },
  {
    id: 'forense-informatico',
    category: 'FORENSICS',
    title: 'Forense Informático',
    subtitle: 'EVIDENCIA · ANÁLISIS · RECUPERACIÓN',
    description: 'Analizamos evidencias digitales con rigor técnico para reconstruir incidentes y respaldar decisiones.',
    gradientFrom: '#1a1a2e',
    gradientTo: '#16213e',
    ctaHref: '#contact'
  },
  {
    id: 'desarrollo-sistemas',
    category: 'DEV',
    title: 'Desarrollo de Sistemas',
    subtitle: 'PRODUCTO · INTEGRACIÓN · ENTREGA',
    description: 'Creamos plataformas y herramientas a medida para escalar operaciones y conectar procesos críticos.',
    gradientFrom: '#0f3460',
    gradientTo: '#533483',
    ctaHref: '#contact'
  }
];

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, AfterViewInit, OnDestroy {
  serviceCards = SERVICE_CARDS;
  cardGap = 40;
  
  currentIndex = 0;
  viewportWidth = 0;
  cardWidth = 300;
  
  touchStartX = 0;
  activeServiceModal: string | null = null;

  // Guarda las variables CSS de estilo para las 7 tarjetas
  cardVariables: Record<string, string>[] = [];

  private resizeObserver: ResizeObserver | null = null;
  private measureFn: () => void = () => {};

  @ViewChild('viewportRef') viewportRef!: ElementRef;

  ngOnInit() {
    this.initializeCardStyles();
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

  ngAfterViewInit() {
    this.measureFn = () => {
      this.viewportWidth = this.viewportRef?.nativeElement?.clientWidth ?? 0;
      // Obtener el ancho de la tarjeta física
      const firstCardEl = document.querySelector('.service-deconstructed-card') as HTMLElement;
      this.cardWidth = firstCardEl?.offsetWidth ?? 300;
    };

    // Medición inicial rápida
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
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.measureFn);
  }

  // Pointer move / Paralaje 3D
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

  // Toque deslizante móvil (Swipe)
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

  // Navegación de teclado
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
    }
  }

  // Métodos de control
  goToCard(index: number) {
    this.currentIndex = Math.max(0, Math.min(index, this.serviceCards.length - 1));
  }

  nextCard() {
    this.goToCard(this.currentIndex + 1);
  }

  prevCard() {
    this.goToCard(this.currentIndex - 1);
  }

  // Calcula el transform3d dinámico para centrar la tarjeta activa en pantalla
  getTrackTransform() {
    const translateX = this.viewportWidth
      ? this.viewportWidth / 2 - this.cardWidth / 2 - this.currentIndex * (this.cardWidth + this.cardGap)
      : 0;
    return `translate3d(${translateX}px, 0, 0)`;
  }

  // Diálogo Modal
  openModal(id: string) {
    this.activeServiceModal = id;
  }

  closeModal() {
    this.activeServiceModal = null;
  }

  onContactClick() {
    this.closeModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
