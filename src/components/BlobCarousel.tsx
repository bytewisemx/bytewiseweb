import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './BlobCarousel.css';

export type BlobCarouselSlide = {
  src: string;
  alt: string;
};

type SupahBlobOptions = {
  el: SVGPathElement | null;
  segments?: number;
  centerX?: number;
  centerY?: number;
  minRadius?: number;
  maxRadius?: number;
  minDuration?: number;
  maxDuration?: number;
  maskEl?: HTMLDivElement | null;
  maskID?: string | null;
};

class SupahBlob {
  el: SVGPathElement | null;
  segments: number;
  centerX: number;
  centerY: number;
  minRadius: number;
  maxRadius: number;
  minDuration: number;
  maxDuration: number;
  maskEl: HTMLDivElement | null;
  maskID: string | null;
  points: Array<{ x: number; y: number }>;
  tweens: gsap.core.Tween[];
  timeline: gsap.core.Timeline | null;

  constructor(obj: SupahBlobOptions) {
    this.el = obj.el;
    this.segments = obj.segments ?? 8;
    this.centerX = obj.centerX ?? 400;
    this.centerY = obj.centerY ?? 400;
    this.minRadius = obj.minRadius ?? 300;
    this.maxRadius = obj.maxRadius ?? 380;
    this.minDuration = obj.minDuration ?? 1;
    this.maxDuration = obj.maxDuration ?? 2;
    this.maskEl = obj.maskEl ?? null;
    this.maskID = obj.maskID ?? null;
    this.points = [];
    this.tweens = [];
    this.timeline = null;
  }

  init() {
    if (!this.el) return;

    this.points = [];
    const slice = (Math.PI * 2) / this.segments;
    this.timeline = gsap.timeline({
      onUpdate: () => {
        this.update();
      }
    });

    for (let i = 0; i < this.segments; i += 1) {
      const angle = slice * i;
      const duration = gsap.utils.random(this.minDuration, this.maxDuration);

      const point = {
        x: this.centerX + Math.cos(angle) * this.minRadius,
        y: this.centerY + Math.sin(angle) * this.minRadius
      };

      const tween = gsap.to(point, {
        duration,
        x: this.centerX + Math.cos(angle) * this.maxRadius,
        y: this.centerY + Math.sin(angle) * this.maxRadius,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      this.timeline.add(tween, -duration);
      this.points.push(point);
      this.tweens.push(tween);
    }
  }

  update() {
    if (!this.el) return;

    this.el.setAttribute('d', this.createPath());

    if (this.maskEl && this.maskID) {
      const maskStyle = this.maskEl.style as CSSStyleDeclaration & { webkitClipPath?: string };
      this.maskEl.style.clipPath = 'none';
      maskStyle.webkitClipPath = 'none';
      // Force browser to recalculate the mask before restoring the clip-path.
      void this.maskEl.offsetWidth;
      this.maskEl.style.clipPath = `url("${this.maskID}")`;
      maskStyle.webkitClipPath = `url("${this.maskID}")`;
    }
  }

  createPath() {
    const data = this.points;
    const size = data.length;

    if (size === 0) {
      return '';
    }

    let path = `M${data[0].x} ${data[0].y} C`;

    for (let i = 0; i < size; i += 1) {
      const p0 = data[(i - 1 + size) % size];
      const p1 = data[i];
      const p2 = data[(i + 1) % size];
      const p3 = data[(i + 2) % size];

      const x1 = p1.x + (p2.x - p0.x) * 0.15;
      const y1 = p1.y + (p2.y - p0.y) * 0.15;
      const x2 = p2.x - (p3.x - p1.x) * 0.15;
      const y2 = p2.y - (p3.y - p1.y) * 0.15;

      path += ` ${x1} ${y1} ${x2} ${y2} ${p2.x} ${p2.y}`;
    }

    return `${path}z`;
  }

  destroy() {
    this.tweens.forEach((tween) => tween.kill());
    this.tweens = [];
    this.timeline?.kill();
    this.timeline = null;
  }
}

type BlobCarouselProps = {
  slides: BlobCarouselSlide[];
  autoplayDelay?: number;
};

export default function BlobCarousel({ slides, autoplayDelay = 4200 }: BlobCarouselProps) {
  const safeSlides = useMemo(() => slides.filter((slide) => Boolean(slide.src)), [slides]);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
  const maskId = useId().replace(/:/g, '');
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathMaskRef = useRef<SVGPathElement | null>(null);
  const pathBgRef = useRef<SVGPathElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const blobMaskRef = useRef<SupahBlob | null>(null);
  const blobBgRef = useRef<SupahBlob | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!pathMaskRef.current || !pathBgRef.current || !imagesRef.current || safeSlides.length === 0) return undefined;

    if (svgRef.current) {
      gsap.set(svgRef.current, { visibility: 'visible' });
    }

    blobMaskRef.current = new SupahBlob({
      el: pathMaskRef.current,
      segments: isMobile ? 7 : 9,
      centerX: 400,
      centerY: 400,
      minRadius: isMobile ? 314 : 300,
      maxRadius: isMobile ? 350 : 372,
      minDuration: isMobile ? 2.8 : 2.1,
      maxDuration: isMobile ? 4.2 : 3.2,
      maskEl: imagesRef.current,
      maskID: `#${maskId}`
    });
    blobBgRef.current = new SupahBlob({
      el: pathBgRef.current,
      segments: isMobile ? 7 : 9,
      centerX: 400,
      centerY: 400,
      minRadius: isMobile ? 332 : 320,
      maxRadius: isMobile ? 366 : 394,
      minDuration: isMobile ? 3.1 : 2.5,
      maxDuration: isMobile ? 4.5 : 3.4
    });

    blobMaskRef.current.init();
    blobBgRef.current.init();

    return () => {
      blobMaskRef.current?.destroy();
      blobBgRef.current?.destroy();
      blobMaskRef.current = null;
      blobBgRef.current = null;
    };
  }, [isMobile, maskId, safeSlides.length]);

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % safeSlides.length);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [autoplayDelay, safeSlides.length]);

  const handleNext = () => {
    if (safeSlides.length <= 1) return;
    setActive((current) => (current + 1) % safeSlides.length);
  };

  if (safeSlides.length === 0) return null;

  return (
    <div className="blob-carousel" aria-label="Carousel de metodología">
      <svg ref={svgRef} id={`blob-${maskId}`} className="blob-carousel__svg" viewBox="0 0 800 800" aria-hidden="true">
        <defs>
          <clipPath id={maskId}>
            <path ref={pathMaskRef} />
          </clipPath>
        </defs>
        <path ref={pathBgRef} />
      </svg>

      <div
        ref={imagesRef}
        className="blob-carousel__images"
        style={{
          clipPath: `url(#${maskId})`,
          WebkitClipPath: `url(#${maskId})`
        }}
      >
        {safeSlides.map((slide, index) => (
          <img
            key={`${slide.alt}-${slide.src}`}
            src={slide.src}
            alt={slide.alt}
            className={index === active ? 'active' : ''}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>

      <button type="button" className="blob-carousel__play" onClick={handleNext} aria-label="Ver siguiente imagen">
        <span className="blob-carousel__playIcon" aria-hidden="true" />
      </button>
    </div>
  );
}
