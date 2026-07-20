import { Component, OnInit, OnDestroy } from '@angular/core';

interface FloatingSymbol {
  id: number;
  text: string;
  style: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  activeIndex = 0;
  sliderTimer: any = null;
  
  bgColors = [
    'hsl(38, 85%, 28%)',  // Slide 0: Dorado ocre
    'hsl(188, 85%, 15%)', // Slide 1: Cian oscuro
    'hsl(263, 70%, 15%)'  // Slide 2: Violeta oscuro
  ];

  // Lógica de Símbolos Flotantes
  floatingSymbols: FloatingSymbol[] = [];
  symbolIdCounter = 0;
  symbolIntervalId: any = null;
  symbolsList = ['🔑', '💻', '🔒', '👁', '🤖', '⚙', '✦', '◇', '▲', '⚡', '1', '0', 'AI', 'ISO'];
  symbolColors = ['#f59e0b', '#06b6d4', '#a78bfa'];

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
    this.stopSymbolGeneration();
  }

  goToSlide(index: number) {
    const totalSlides = this.bgColors.length;
    this.activeIndex = (index + totalSlides) % totalSlides;
  }

  nextSlide() {
    this.goToSlide(this.activeIndex + 1);
    this.startAutoplay(); // Resetear autoplay tras interacción manual
  }

  prevSlide() {
    this.goToSlide(this.activeIndex - 1);
    this.startAutoplay(); // Resetear autoplay
  }

  startAutoplay() {
    this.stopAutoplay();
    this.sliderTimer = setInterval(() => {
      this.goToSlide(this.activeIndex + 1);
    }, 6500);
  }

  stopAutoplay() {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  }

  // Eventos Laptop Hover
  onLaptopEnter() {
    if (this.symbolIntervalId === null) {
      // Símbolos instantáneos iniciales
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
    const startX = Math.random() * 40 + 30; // 30% a 70%
    const startY = Math.random() * 30 + 35; // 35% a 65%
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

    // Remover al finalizar la animación
    setTimeout(() => {
      this.floatingSymbols = this.floatingSymbols.filter(s => s.id !== newSymbol.id);
    }, duration * 1000);
  }
}
