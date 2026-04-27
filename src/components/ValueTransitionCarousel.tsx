import { useEffect, useMemo, useState } from 'react';

import './ValueTransitionCarousel.css';

export type ValueTransitionSlide = {
  title: string;
  accent: string;
  background: string;
};

type ValueTransitionCarouselProps = {
  values: ValueTransitionSlide[];
  intervalMs?: number;
};

export default function ValueTransitionCarousel({ values, intervalMs = 3000 }: ValueTransitionCarouselProps) {
  const safeValues = useMemo(() => values.filter((value) => Boolean(value.title)), [values]);
  const [activeIndex, setActiveIndex] = useState(0);
  const normalizedActiveIndex = safeValues.length === 0 ? 0 : activeIndex % safeValues.length;

  useEffect(() => {
    if (safeValues.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeValues.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, safeValues.length]);

  if (safeValues.length === 0) return null;

  const activeValue = safeValues[normalizedActiveIndex] ?? safeValues[0];

  return (
    <div className="value-transition-carousel" aria-label="Transición de valores">
      <div className="value-transition-carousel__frame">
        <div
          className="value-transition-carousel__panel"
          style={{ background: activeValue.background, boxShadow: `0 0 48px ${activeValue.accent}33` }}
          aria-hidden="true"
        />
        <div
          className="value-transition-carousel__glow"
          style={{ background: `radial-gradient(circle, ${activeValue.accent}40 0%, transparent 68%)` }}
          aria-hidden="true"
        />
        <div className="value-transition-carousel__orbit" aria-hidden="true" />
        <div className="value-transition-carousel__pulse" aria-hidden="true" />
        <div className="value-transition-carousel__content" key={`${activeValue.title}-${normalizedActiveIndex}`}>
          <span className="value-transition-carousel__eyebrow">Nuestros valores</span>
          <h3 className="value-transition-carousel__title" style={{ color: activeValue.accent }}>
            {activeValue.title}
          </h3>
        </div>
      </div>

      <div className="value-transition-carousel__dots" aria-hidden="true">
        {safeValues.map((value, index) => (
          <button
            key={value.title}
            type="button"
            className={`value-transition-carousel__dot ${index === normalizedActiveIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir a ${value.title}`}
          />
        ))}
      </div>
    </div>
  );
}
