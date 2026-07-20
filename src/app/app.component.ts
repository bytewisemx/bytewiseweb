import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { StatsComponent } from './components/stats/stats.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HackerAlertComponent } from './components/hacker-alert/hacker-alert.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  baseSize: number;

  constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.baseSize = size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mouse: { x: number | null; y: number | null; radius: number }) {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        this.x += (dx / distance) * force * 1.2;
        this.y += (dy / distance) * force * 1.2;
        this.size = this.baseSize * (1 + force * 0.8);
      } else {
        if (this.size > this.baseSize) this.size -= 0.1;
      }
    } else {
      if (this.size > this.baseSize) this.size -= 0.1;
    }

    this.draw(ctx);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PreloaderComponent,
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    StatsComponent,
    ContactComponent,
    FooterComponent,
    HackerAlertComponent,
    PrivacyPolicyComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'ByteWise';
  
  // Lógica de partículas
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private mouse = { x: null as number | null, y: null as number | null, radius: 150 };
  private animationFrameId: number | null = null;

  ngAfterViewInit() {
    this.canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      this.animateParticles();
    }
    
    // Inicializar Scroll Reveal después de que el DOM esté listo
    setTimeout(() => {
      this.setupScrollReveal();
    }, 200);
  }

  private setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.resizeCanvas();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  @HostListener('window:mouseleave', [])
  onMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  private resizeCanvas() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.initParticles();
    }
  }

  private initParticles() {
    if (!this.canvas) return;
    this.particles = [];
    const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 13000);
    
    const colors = [
      'rgba(139, 92, 246, 0.25)', // Violeta
      'rgba(6, 182, 212, 0.25)',  // Cian
      'rgba(236, 72, 153, 0.15)',  // Rosa
      'rgba(255, 255, 255, 0.15)'  // Blanco
    ];

    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 1.2;
      let x = Math.random() * (this.canvas.width - size * 2) + size;
      let y = Math.random() * (this.canvas.height - size * 2) + size;
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;
      let color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  private connect() {
    if (!this.ctx) return;
    let opacityValue = 1;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        let dx = this.particles[a].x - this.particles[b].x;
        let dy = this.particles[a].y - this.particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          opacityValue = 1 - (distance / 110);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.05})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private animateParticles() {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.canvas, this.ctx, this.mouse);
    }
    
    this.connect();
    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }
}
