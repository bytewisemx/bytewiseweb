import { Component, OnInit, OnDestroy, ElementRef, HostListener, ViewChild, NgZone } from '@angular/core';
import { NgStyle } from '@angular/common';

interface ImpactoSlide {
  type: string;
  title: string;
  subtitle: string;
  content?: string;
  valuesList?: { name: string; desc: string }[];
  image: string;
}

interface Testimonial {
  initials: string;
  name: string;
  company: string;
  subtitle: string;
  quote: string;
  image: string;
}

interface TeamCard {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  bgColor: string;
  image: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {
  // Referencia directa al contenedor de contadores
  @ViewChild('statsContainer', { static: true }) statsContainerRef!: ElementRef;

  // Lógica de Contadores Numéricos
  currentCounts = [0, 0, 0];
  targets = [99, 15, 320];
  observer: IntersectionObserver | null = null;
  countersStarted = false;

  // Lógica de Slider de Impacto & Filosofía Corporativa
  activeSlide = 0;
  private autoSlideTimer: any = null;

  // Lógica de Slider de Testimonios Empresariales
  activeTestimonialSlide = 0;
  private autoTestimonialTimer: any = null;

  slides: ImpactoSlide[] = [
    {
      type: 'mision',
      title: 'MISIÓN',
      subtitle: 'Compromiso & Relaciones Seguras',
      content: 'Ofrecer servicios de calidad certificada a nuestros clientes, basados en el total entendimiento de sus necesidades y requerimientos apegados a nuestros valores estableciendo relaciones seguras.',
      image: 'img/impacto_mision.png'
    },
    {
      type: 'vision',
      title: 'VISIÓN',
      subtitle: 'Liderazgo en Entorno Digital',
      content: 'Ser reconocidos como empresa líder en soluciones de ciberseguridad mediante un servicio personalizado y customizado según las necesidades y demandas del entorno digital requerido.',
      image: 'img/impacto_vision.png'
    },
    {
      type: 'valores',
      title: 'VALORES',
      subtitle: 'Nuestros Principios Fundamentales',
      valuesList: [
        { name: 'CALIDAD', desc: 'Tener una excelencia en nuestras soluciones, servicios y procesos con el fin de satisfacer y superar las expectativas de nuestros clientes.' },
        { name: 'CONFIABILIDAD', desc: 'Entregar nuestros productos y servicios de manera puntual y transparente.' },
        { name: 'CONFIDENCIALIDAD', desc: 'Cumplir con la obligación del resguardo y protección de la información sensible de nuestros clientes.' },
        { name: 'INTEGRIDAD', desc: 'Actuar con honestidad, transparencia y rectitud en toda decisión interna o externa.' },
        { name: 'RESPONSABILIDAD', desc: 'Actuar de manera proactiva y consciente en la protección y resguardo de la información y activos digitales de nuestros clientes.' },
        { name: 'VANGUARDIA', desc: 'Ser una empresa que además de la innovación tecnológica tenga una cultura organizacional que promueva la exploración, experimentación y adaptación constante.' }
      ],
      image: 'img/impacto_valores.png'
    },
    {
      type: 'elegirnos',
      title: '¿POR QUÉ ELEGIRNOS?',
      subtitle: 'Seguridad de la Información & Continuidad de Negocio',
      content: 'Entendemos la imperativa necesidad de incorporar las organizaciones a los estándares de seguridad actual para promover la seguridad de la información y la continuidad del negocio en cualquier situación de riesgo, adaptando la solución según el requerimiento.',
      image: 'img/impacto_elegirnos.png'
    }
  ];

  testimonials: Testimonial[] = [
    {
      initials: 'AP',
      name: 'LM Alejandro Pedroza',
      company: 'Grupo Millenium',
      subtitle: 'Testimonio empresarial · Milenium',
      quote: '“Trabajar con ByteWise nos dio claridad total sobre nuestra seguridad. Detectaron riesgos que no teníamos en el radar y nos guiaron paso a paso para corregirlos. Hoy operamos con mucha más confianza y control.”',
      image: 'img/avatar_alejandro.png'
    },
    {
      initials: 'IL',
      name: 'Mtro Israel Llorot',
      company: 'E-Net-Corp',
      subtitle: 'Testimonio práctico · E-Net-Corp',
      quote: '“El equipo de ByteWise fue muy profesional y claro en todo momento. Nos ayudaron a ordenar nuestros procesos y mejorar la protección de la información sin complicarnos. Se nota que saben lo que hacen.”',
      image: 'img/avatar_israel.png'
    }
  ];

  // Lógica del Grid Interactivo Cover "El equipo detrás de ByteWise"
  teamCards: TeamCard[] = [
    {
      id: 0,
      title: 'Maestría en Seguridad de la Información',
      category: 'FORMACIÓN Y CERTIFICACIÓN',
      subtitle: 'Gestión de Riesgos & Gobierno de Seguridad',
      description: 'Formación avanzada en gestión de riesgos, protección de datos, gobierno de seguridad y estrategias para la continuidad del negocio.',
      bgColor: '#0f2b4a',
      image: 'img/team_master_security.png'
    },
    {
      id: 1,
      title: 'Auditor Interno ISO/IEC 27001:2022',
      category: 'FORMACIÓN Y CERTIFICACIÓN',
      subtitle: 'Evaluación de SGSI & Cumplimiento de Controles',
      description: 'Capacidad para evaluar sistemas de gestión de seguridad de la información (SGSI), identificar brechas y asegurar el cumplimiento de controles conforme a estándares internacionales.',
      bgColor: '#1e3a5f',
      image: 'img/team_iso_auditor.png'
    },
    {
      id: 2,
      title: 'Lead Implementer ISO/IEC 27001',
      category: 'FORMACIÓN Y CERTIFICACIÓN',
      subtitle: 'Diseño & Preparación para Certificación',
      description: 'Experiencia en diseño, implementación y mantenimiento de SGSI, desde el diagnóstico inicial hasta la preparación para auditoría de certificación.',
      bgColor: '#0d3349',
      image: 'img/team_iso_lead.png'
    },
    {
      id: 3,
      title: 'Pentesting y análisis de vulnerabilidades',
      category: 'ESPECIALIZACIÓN TÉCNICA',
      subtitle: 'Evaluación Ofensiva & Mitigación Pre-Explotación',
      description: 'Evaluación de sistemas, redes y aplicaciones desde la perspectiva de un atacante para identificar y mitigar riesgos antes de que sean explotados.',
      bgColor: '#2d1a47',
      image: 'img/team_pentesting.png'
    },
    {
      id: 4,
      title: 'Informática forense con validez legal',
      category: 'ESPECIALIZACIÓN TÉCNICA',
      subtitle: 'Recuperación de Evidencia Digital & Dictámenes',
      description: 'Recuperación y análisis de evidencia digital en dispositivos físicos y móviles, con generación de dictámenes técnicos utilizables en procesos legales.',
      bgColor: '#162842',
      image: 'img/hero_cybersecurity.png'
    },
    {
      id: 5,
      title: 'Inteligencia Artificial aplicada',
      category: 'ESPECIALIZACIÓN TÉCNICA',
      subtitle: 'Automatización & Asistentes Operativos',
      description: 'Desarrollo e implementación de soluciones de IA para automatización de procesos, asistentes virtuales y optimización de operaciones.',
      bgColor: '#311442',
      image: 'img/hero_ai.png'
    },
    {
      id: 6,
      title: 'Desarrollo de software a la medida',
      category: 'ESPECIALIZACIÓN TÉCNICA',
      subtitle: 'Sistemas a la Medida, Alta Seguridad & Escalabilidad',
      description: 'Creación de sistemas y plataformas adaptadas a necesidades específicas, integrando seguridad, escalabilidad y eficiencia operativa.',
      bgColor: '#0a2d3e',
      image: 'img/hero_infrastructure.png'
    }
  ];

  selectedTeamCardIndex: number | null = null;
  pageIsOpen = false;
  isCoverAnimating = false;

  coverStyle: any = {};
  openContentImage = '';
  openContentTitle = '';
  openContentCategory = '';
  openContentSubtitle = '';
  openContentDescription = '';

  constructor(private elRef: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.setupObserver();
    this.startAutoSlide();
    this.startAutoTestimonialSlide();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
    if (this.autoTestimonialTimer) {
      clearInterval(this.autoTestimonialTimer);
    }
  }

  setSlide(index: number) {
    this.activeSlide = index;
    this.restartAutoSlide();
  }

  setTestimonialSlide(index: number) {
    this.activeTestimonialSlide = index;
    this.restartAutoTestimonialSlide();
  }

  private startAutoSlide() {
    this.autoSlideTimer = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    }, 7000);
  }

  private restartAutoSlide() {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
    this.startAutoSlide();
  }

  private startAutoTestimonialSlide() {
    this.autoTestimonialTimer = setInterval(() => {
      this.activeTestimonialSlide = (this.activeTestimonialSlide + 1) % this.testimonials.length;
    }, 8000);
  }

  private restartAutoTestimonialSlide() {
    if (this.autoTestimonialTimer) {
      clearInterval(this.autoTestimonialTimer);
    }
    this.startAutoTestimonialSlide();
  }

  // Manejo del evento Click en las tarjetas interactivas de equipo
  onTeamCardClick(index: number, event: MouseEvent) {
    if (this.pageIsOpen || this.isCoverAnimating) return;

    const clickedCard = (event.currentTarget as HTMLElement).closest('.interactive-card') as HTMLElement;
    if (!clickedCard) return;

    this.selectedTeamCardIndex = index;
    this.isCoverAnimating = true;

    const cardPos = clickedCard.getBoundingClientRect();
    const cardData = this.teamCards[index];

    // Configurar color y posición inicial del cover
    this.coverStyle = {
      left: `${cardPos.left}px`,
      top: `${cardPos.top}px`,
      width: `${cardPos.width}px`,
      height: `${cardPos.height}px`,
      backgroundColor: cardData.bgColor,
      opacity: '1'
    };

    // Escalar cover al viewport
    setTimeout(() => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleX = windowWidth / cardPos.width;
      const scaleY = windowHeight / cardPos.height;
      const offsetX = (windowWidth / 2 - cardPos.width / 2 - cardPos.left) / scaleX;
      const offsetY = (windowHeight / 2 - cardPos.height / 2 - cardPos.top) / scaleY;

      this.coverStyle = {
        ...this.coverStyle,
        transform: `scaleX(${scaleX}) scaleY(${scaleY}) translate3d(${offsetX}px, ${offsetY}px, 0px)`
      };

      // Cargar contenidos desplegados
      this.openContentImage = cardData.image;
      this.openContentTitle = cardData.title;
      this.openContentCategory = cardData.category;
      this.openContentSubtitle = cardData.subtitle;
      this.openContentDescription = cardData.description;

      setTimeout(() => {
        this.pageIsOpen = true;
        this.isCoverAnimating = false;
      }, 500);
    }, 50);
  }

  onCloseContent(event?: Event) {
    if (event) event.preventDefault();
    if (!this.pageIsOpen || this.isCoverAnimating || this.selectedTeamCardIndex === null) return;

    this.pageIsOpen = false;
    this.isCoverAnimating = true;

    const currentCardEl = document.querySelector(`.team-card-index-${this.selectedTeamCardIndex}`) as HTMLElement;
    if (currentCardEl) {
      const cardPos = currentCardEl.getBoundingClientRect();

      this.coverStyle = {
        left: `${cardPos.left}px`,
        top: `${cardPos.top}px`,
        width: `${cardPos.width}px`,
        height: `${cardPos.height}px`,
        backgroundColor: this.teamCards[this.selectedTeamCardIndex].bgColor,
        transform: 'scaleX(1) scaleY(1) translate3d(0px, 0px, 0px)'
      };

      setTimeout(() => {
        this.coverStyle = { width: '0px', height: '0px', opacity: '0' };
        this.selectedTeamCardIndex = null;
        this.isCoverAnimating = false;
      }, 400);
    } else {
      this.coverStyle = { width: '0px', height: '0px', opacity: '0' };
      this.selectedTeamCardIndex = null;
      this.isCoverAnimating = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    if (this.pageIsOpen) {
      this.onCloseContent(event);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.pageIsOpen && this.selectedTeamCardIndex !== null) {
      const currentCardEl = document.querySelector(`.team-card-index-${this.selectedTeamCardIndex}`) as HTMLElement;
      if (currentCardEl) {
        const cardPos = currentCardEl.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const scaleX = windowWidth / cardPos.width;
        const scaleY = windowHeight / cardPos.height;
        const offsetX = (windowWidth / 2 - cardPos.width / 2 - cardPos.left) / scaleX;
        const offsetY = (windowHeight / 2 - cardPos.height / 2 - cardPos.top) / scaleY;

        this.coverStyle = {
          left: `${cardPos.left}px`,
          top: `${cardPos.top}px`,
          width: `${cardPos.width}px`,
          height: `${cardPos.height}px`,
          backgroundColor: this.teamCards[this.selectedTeamCardIndex].bgColor,
          transform: `scaleX(${scaleX}) scaleY(${scaleY}) translate3d(${offsetX}px, ${offsetY}px, 0px)`
        };
      }
    }
  }

  setupObserver() {
    const target = this.statsContainerRef?.nativeElement || this.elRef.nativeElement;
    const options = { threshold: 0.1 };
    this.observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !this.countersStarted) {
        this.countersStarted = true;
        this.ngZone.run(() => this.startCounters());
        if (this.observer) {
          this.observer.unobserve(target);
        }
      }
    }, options);
    this.observer.observe(target);
  }

  startCounters() {
    this.targets.forEach((target, index) => {
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        this.ngZone.run(() => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress * (2 - progress);
          this.currentCounts[index] = Math.floor(easeProgress * target);

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            this.currentCounts[index] = target;
          }
        });
      };

      requestAnimationFrame(updateCount);
    });
  }
}
