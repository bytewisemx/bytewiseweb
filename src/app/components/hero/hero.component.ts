import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface FloatingSymbol {
  id: number;
  text: string;
  style: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  activeIndex = 0;
  animating = false;
  
  // Pasos de scroll (0: Slide 0, 1: Slide 1, 2: Slide 2, 3: Retención Slide 2, 4: Liberado a Servicios)
  private stepIndex = 0;

  // Handlers para bloqueo de scroll no-pasivo ({ passive: false })
  private wheelHandler: any = null;
  private touchStartHandler: any = null;
  private touchMoveHandler: any = null;
  private touchStartY = 0;

  // Gradientes y orbes luminosos dinámicos para los 2 recuadros divididos del fondo
  bgLeftGradients = [
    'radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.18) 0%, #06070d 75%)',  // Slide 0: Dorado
    'radial-gradient(circle at 30% 40%, rgba(6, 182, 212, 0.22) 0%, #040810 75%)',   // Slide 1: Cian
    'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.20) 0%, #06050e 75%)'   // Slide 2: Violeta
  ];

  bgRightGradients = [
    'linear-gradient(135deg, hsl(38, 85%, 26%) 0%, #06070d 100%)',   // Slide 0: Dorado ocre
    'linear-gradient(135deg, #040810 0%, hsl(188, 85%, 16%) 100%)',   // Slide 1: Cian profundo
    'linear-gradient(135deg, hsl(263, 70%, 18%) 0%, #06050e 100%)'   // Slide 2: Violeta profundo
  ];

  bgLeftOrbs = [
    'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, transparent 70%)'
  ];

  bgRightOrbs = [
    'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)'
  ];

  accentColors = [
    '#f59e0b', // Slide 0: Dorado
    '#06b6d4', // Slide 1: Cian
    '#a78bfa'  // Slide 2: Violeta
  ];

  // Lógica de Símbolos Flotantes
  floatingSymbols: FloatingSymbol[] = [];
  symbolIdCounter = 0;
  symbolIntervalId: any = null;
  symbolsList = [
    '0', '1', '01', '10', '001', '110', '101', '010', '111', 
    '0001', '1010', '011', '100', '0x1', '0xF', '</>', '{}', 
    '⚡', '✦', '◇', '▲', '◈', '❖', '⌬', '⎔', '⌘', '⚙'
  ];
  symbolColors = ['#f59e0b', '#06b6d4', '#a78bfa'];

  private splitCharsMap: Map<number, HTMLElement[]> = new Map();

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Autoplay desactivado: la animación responde ÚNICAMENTE a los impulsos de scroll del usuario
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initHeroState();
      this.setupUnbreakableScrollLock();
    }
  }

  ngOnDestroy() {
    this.stopSymbolGeneration();
    this.removeScrollLockListeners();
  }

  private initHeroState() {
    const host = this.el.nativeElement;
    this.prepareSplitHeadings();

    // Visualización inicial limpia de la Slide 0
    const slide0Left = host.querySelector('.slide-text-left:nth-child(1)');
    const slide0Right = host.querySelector('.slide-text-right:nth-child(1)');
    const slide0Screen = host.querySelector('.slide-screen-content:nth-child(1)');

    if (slide0Left && slide0Right && slide0Screen) {
      const outers = Array.from(slide0Left.querySelectorAll('.outer'))
        .concat(Array.from(slide0Right.querySelectorAll('.outer')))
        .concat(Array.from(slide0Screen.querySelectorAll('.outer')));
      const inners = Array.from(slide0Left.querySelectorAll('.inner'))
        .concat(Array.from(slide0Right.querySelectorAll('.inner')))
        .concat(Array.from(slide0Screen.querySelectorAll('.inner')));
      const images = Array.from(slide0Screen.querySelectorAll('.bg'));
      const chars = this.splitCharsMap.get(0) || [];

      gsap.set(outers, { yPercent: 0, opacity: 1 });
      gsap.set(inners, { yPercent: 0 });
      gsap.set(images, { yPercent: 0 });
      if (chars.length > 0) {
        gsap.set(chars, { autoAlpha: 1, yPercent: 0 });
      }
    }
  }

  private setupUnbreakableScrollLock() {
    const heroEl = this.el.nativeElement.querySelector('#hero');
    if (!heroEl) return;

    // Manejador Rueda de Ratón (Wheel) con 4 impulsos exactos
    this.wheelHandler = (e: WheelEvent) => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown) {
        if (this.stepIndex < 3) {
          e.preventDefault();
          e.stopPropagation();
          if (!this.animating) {
            this.stepIndex++;
            const targetSlide = Math.min(2, this.stepIndex);
            if (targetSlide !== this.activeIndex) {
              this.goToSlideWithGSAP(targetSlide, 1);
            } else {
              this.animating = true;
              setTimeout(() => { this.animating = false; }, 200);
            }
          }
        } else {
          this.stepIndex = 4;
        }
      } else if (isScrollingUp) {
        if (this.stepIndex > 0) {
          e.preventDefault();
          e.stopPropagation();
          if (!this.animating) {
            this.stepIndex = Math.min(3, this.stepIndex - 1);
            const targetSlide = Math.min(2, Math.max(0, this.stepIndex));
            if (targetSlide !== this.activeIndex) {
              this.goToSlideWithGSAP(targetSlide, -1);
            } else {
              this.animating = true;
              setTimeout(() => { this.animating = false; }, 200);
            }
          }
        }
      }
    };

    // Manejador Gestos Táctiles (Touch Move)
    this.touchStartHandler = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        this.touchStartY = e.touches[0].clientY;
      }
    };

    this.touchMoveHandler = (e: TouchEvent) => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) return;

      if (!e.touches || e.touches.length === 0) return;
      const touchY = e.touches[0].clientY;
      const deltaY = this.touchStartY - touchY;

      if (Math.abs(deltaY) < 15) return;

      if (deltaY > 0) {
        if (this.stepIndex < 3) {
          e.preventDefault();
          if (!this.animating) {
            this.stepIndex++;
            const targetSlide = Math.min(2, this.stepIndex);
            this.goToSlideWithGSAP(targetSlide, 1);
            this.touchStartY = touchY;
          }
        } else {
          this.stepIndex = 4;
        }
      } else if (deltaY < 0) {
        if (this.stepIndex > 0) {
          e.preventDefault();
          if (!this.animating) {
            this.stepIndex = Math.min(3, this.stepIndex - 1);
            const targetSlide = Math.min(2, Math.max(0, this.stepIndex));
            this.goToSlideWithGSAP(targetSlide, -1);
            this.touchStartY = touchY;
          }
        }
      }
    };

    window.addEventListener('wheel', this.wheelHandler, { passive: false });
    window.addEventListener('touchstart', this.touchStartHandler, { passive: true });
    window.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
  }

  private removeScrollLockListeners() {
    if (!isPlatformBrowser(this.platformId)) return;
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

  private prepareSplitHeadings() {
    const headings = Array.from(this.el.nativeElement.querySelectorAll('.hero-title')) as HTMLElement[];
    headings.forEach((heading, slideIdx) => {
      const chars = this.splitHeadingIntoSpans(heading);
      this.splitCharsMap.set(slideIdx, chars);
    });
  }

  private splitHeadingIntoSpans(heading: HTMLElement): HTMLElement[] {
    const chars: HTMLElement[] = [];
    const walk = (node: Node, parent: HTMLElement) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        const frag = document.createDocumentFragment();
        for (const char of text) {
          if (char === ' ' || char === '\n' || char === '\r') {
            frag.appendChild(document.createTextNode(char));
          } else {
            const span = document.createElement('span');
            span.className = 'clip-text-char';
            span.style.display = 'inline-block';
            span.textContent = char;
            frag.appendChild(span);
            chars.push(span);
          }
        }
        parent.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        Array.from(element.childNodes).forEach(child => walk(child, element));
      }
    };

    Array.from(heading.childNodes).forEach(child => walk(child, heading));
    return chars;
  }

  goToSlide(index: number) {
    this.stepIndex = index;
    const direction = index > this.activeIndex ? 1 : -1;
    this.goToSlideWithGSAP(index, direction);
  }

  goToSlideWithGSAP(targetIndex: number, direction: number) {
    const total = this.bgLeftGradients.length;
    const nextIndex = Math.max(0, Math.min(total - 1, targetIndex));
    if (nextIndex === this.activeIndex && this.animating) return;

    const currentIndex = this.activeIndex;
    this.animating = true;
    const dFactor = direction === -1 ? -1 : 1;

    if (!isPlatformBrowser(this.platformId)) {
      this.activeIndex = nextIndex;
      this.animating = false;
      return;
    }

    const host = this.el.nativeElement;
    const leftSlides = Array.from(host.querySelectorAll('.slide-text-left')) as HTMLElement[];
    const rightSlides = Array.from(host.querySelectorAll('.slide-text-right')) as HTMLElement[];
    const screenSlides = Array.from(host.querySelectorAll('.slide-screen-content')) as HTMLElement[];

    const currentLeft = leftSlides[currentIndex];
    const currentRight = rightSlides[currentIndex];
    const currentScreen = screenSlides[currentIndex];

    const nextLeft = leftSlides[nextIndex];
    const nextRight = rightSlides[nextIndex];
    const nextScreen = screenSlides[nextIndex];

    const tl = gsap.timeline({
      defaults: { duration: 0.85, ease: "power2.inOut" },
      onComplete: () => {
        this.activeIndex = nextIndex;
        setTimeout(() => {
          this.animating = false;
        }, 200);
      }
    });

    // 1. Animación del Fondo de 2 Recuadros Divididos, Orbes Luminosos y Giro 380° de la Laptop
    const leftBgBox = host.querySelector('.bg-box-left');
    const rightBgBox = host.querySelector('.bg-box-right');
    const leftOrb = host.querySelector('.left-orb');
    const rightOrb = host.querySelector('.right-orb');
    const laptopContainer = host.querySelector('.laptop-container');

    if (laptopContainer) {
      tl.fromTo(laptopContainer,
        { rotateX: 5, rotateY: 0, scale: 0.92 },
        { rotateX: 5, rotateY: direction === 1 ? 360 : -360, scale: 1, duration: 0.85, ease: "power2.inOut" },
        0
      );
    }

    if (leftBgBox && rightBgBox) {
      const leftOuter = leftBgBox.querySelector('.outer');
      const leftInner = leftBgBox.querySelector('.inner');
      const rightOuter = rightBgBox.querySelector('.outer');
      const rightInner = rightBgBox.querySelector('.inner');

      if (leftOuter && leftInner && rightOuter && rightInner) {
        gsap.set(leftOuter, { yPercent: 100 * dFactor });
        gsap.set(leftInner, { yPercent: -100 * dFactor });
        gsap.set(rightOuter, { yPercent: -100 * dFactor });
        gsap.set(rightInner, { yPercent: 100 * dFactor });

        tl.to(leftOuter, { yPercent: 0 }, 0)
          .to(leftInner, { yPercent: 0 }, 0)
          .to(rightOuter, { yPercent: 0 }, 0)
          .to(rightInner, { yPercent: 0 }, 0);
      }
    }

    if (leftOrb && rightOrb) {
      tl.fromTo(leftOrb, { scale: 0.6, opacity: 0.2 }, { scale: 1, opacity: 0.45, duration: 0.85 }, 0)
        .fromTo(rightOrb, { scale: 0.6, opacity: 0.2 }, { scale: 1, opacity: 0.45, duration: 0.85 }, 0);
    }

    // 2. Animar elementos de salida (Slide actual)
    if (currentLeft && currentRight && currentScreen) {
      const currentOuters = Array.from(currentLeft.querySelectorAll('.outer'))
        .concat(Array.from(currentRight.querySelectorAll('.outer')))
        .concat(Array.from(currentScreen.querySelectorAll('.outer')));
      
      const currentImages = Array.from(currentScreen.querySelectorAll('.bg'));

      tl.to(currentImages, { yPercent: -15 * dFactor, duration: 0.6 }, 0)
        .to(currentOuters, { yPercent: -100 * dFactor, opacity: 0, duration: 0.6 }, 0);
    }

    // 3. Preparar y animar elementos de entrada (Siguiente Slide)
    if (nextLeft && nextRight && nextScreen) {
      const nextOuters = Array.from(nextLeft.querySelectorAll('.outer'))
        .concat(Array.from(nextRight.querySelectorAll('.outer')))
        .concat(Array.from(nextScreen.querySelectorAll('.outer')));

      const nextInners = Array.from(nextLeft.querySelectorAll('.inner'))
        .concat(Array.from(nextRight.querySelectorAll('.inner')))
        .concat(Array.from(nextScreen.querySelectorAll('.inner')));

      const nextImages = Array.from(nextScreen.querySelectorAll('.bg'));
      const nextChars = this.splitCharsMap.get(nextIndex) || [];

      this.activeIndex = nextIndex;

      gsap.set(nextOuters, { yPercent: 100 * dFactor, opacity: 1 });
      gsap.set(nextInners, { yPercent: -100 * dFactor });
      gsap.set(nextImages, { yPercent: 15 * dFactor });
      if (nextChars.length > 0) {
        gsap.set(nextChars, { autoAlpha: 0, yPercent: 120 * dFactor });
      }

      tl.to(nextOuters, { yPercent: 0, opacity: 1 }, 0)
        .to(nextInners, { yPercent: 0 }, 0)
        .to(nextImages, { yPercent: 0 }, 0);

      if (nextChars.length > 0) {
        tl.to(nextChars, {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: {
            each: 0.02,
            from: "random"
          }
        }, 0.15);
      }
    }
  }

  nextSlide() {
    if (this.activeIndex < this.bgLeftGradients.length - 1) {
      this.goToSlide(this.activeIndex + 1);
    }
  }

  prevSlide() {
    if (this.activeIndex > 0) {
      this.goToSlide(this.activeIndex - 1);
    }
  }

  // Eventos Laptop Hover
  onLaptopEnter() {
    if (this.symbolIntervalId === null) {
      this.createFloatingSymbol();
      this.createFloatingSymbol();
      this.createFloatingSymbol();
      
      this.symbolIntervalId = setInterval(() => {
        this.createFloatingSymbol();
      }, 140);
    }
  }

  onLaptopLeave() {
    this.stopSymbolGeneration();
  }

  stopSymbolGeneration() {
    if (this.symbolIntervalId !== null) {
      clearInterval(this.symbolIntervalId);
      this.symbolIntervalId = null;
    }
  }

  createFloatingSymbol() {
    const symbolText = this.symbolsList[Math.floor(Math.random() * this.symbolsList.length)];
    const startX = Math.random() * 40 + 30;
    const startY = Math.random() * 30 + 35;
    const endX = Math.random() * 500 - 250;
    const endY = Math.random() * 400 - 200;
    const duration = Math.random() * 1.0 + 1.6;
    const rotZ = Math.random() * 180 - 90;
    const maxOpacity = Math.random() * 0.35 + 0.6;
    const fontSize = Math.random() * 0.8 + 1.0;
    const currentColor = this.symbolColors[this.activeIndex];

    const styleString = `
      left: ${startX}%;
      top: ${startY}%;
      color: ${currentColor};
      --start-x: ${startX}%;
      --start-y: ${startY}%;
      --end-x: ${endX}px;
      --end-y: ${endY}px;
      --duration: ${duration}s;
      --rot-z: ${rotZ}deg;
      --max-opacity: ${maxOpacity};
      --font-size: ${fontSize}rem;
    `.trim().replace(/\s+/g, ' ');

    const newSymbol: FloatingSymbol = {
      id: this.symbolIdCounter++,
      text: symbolText,
      style: styleString
    };

    this.floatingSymbols.push(newSymbol);

    setTimeout(() => {
      this.floatingSymbols = this.floatingSymbols.filter(s => s.id !== newSymbol.id);
    }, duration * 1000);
  }
}
