import { useEffect, useMemo, useRef, useState } from 'react';

import './ImageThumbnailCarousel.css';

export type ImageThumbnailCarouselSlide = {
  src: string;
  alt: string;
};

type ImageThumbnailCarouselProps = {
  slides: ImageThumbnailCarouselSlide[];
};

export default function ImageThumbnailCarousel({ slides }: ImageThumbnailCarouselProps) {
  const safeSlides = useMemo(() => slides.filter((slide) => Boolean(slide.src)), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const slideRefs = useRef<Array<HTMLLIElement | null>>([]);
  const normalizedActiveIndex = safeSlides.length === 0 ? 0 : Math.min(activeIndex, safeSlides.length - 1);

  useEffect(() => {
    const activeSlide = slideRefs.current[normalizedActiveIndex];
    const slider = sliderRef.current;
    if (!activeSlide || !slider) return;

    const slideLeft = activeSlide.offsetLeft;
    const slideWidth = activeSlide.offsetWidth;
    const sliderWidth = slider.clientWidth;

    slider.scrollTo({
      left: slideLeft - sliderWidth / 2 + slideWidth / 2,
      behavior: 'smooth'
    });
  }, [normalizedActiveIndex]);

  const setActive = (index: number) => {
    if (index < 0 || index >= safeSlides.length) return;
    setActiveIndex(index);
  };

  const goPrev = () => setActive(normalizedActiveIndex - 1);
  const goNext = () => setActive(normalizedActiveIndex + 1);

  if (safeSlides.length === 0) return null;

  const activeSlide = safeSlides[normalizedActiveIndex] ?? safeSlides[0];

  return (
    <div className="image-thumbnail-carousel" aria-label="Carrusel de imágenes de metodología">
      <section className="image-display" aria-live="polite">
        <div className="screen">
          <img src={activeSlide.src} alt={activeSlide.alt} className="screen__image" loading="eager" decoding="async" />
          <div className="screen__caption">
            <span className="screen__eyebrow">Cómo trabajamos</span>
            <h3 className="screen__title">{activeSlide.alt}</h3>
          </div>
        </div>
      </section>

      <section className="thumbnail-carousel" aria-label="Miniaturas del carrusel">
        <button
          type="button"
          className="carousel__btn prev"
          aria-label="Previous slide"
          onClick={goPrev}
          disabled={normalizedActiveIndex === 0}
        >
          <svg width="16" height="16" fill="currentColor" className="arrow-icon arrow-left-circle" viewBox="0 0 16 16" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
        </button>

        <ul className="carousel__slider" ref={sliderRef} role="list">
          {safeSlides.map((slide, index) => (
            <li
              key={`${slide.alt}-${slide.src}`}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={`carousel__slide ${index === normalizedActiveIndex ? 'active' : ''}`}
            >
              <button
                type="button"
                className="thumbnail"
                onClick={() => setActive(index)}
                aria-label={`Seleccionar imagen ${index + 1}`}
              >
                <img loading="lazy" src={slide.src} alt={slide.alt} />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="carousel__btn next"
          aria-label="Next slide"
          onClick={goNext}
          disabled={normalizedActiveIndex === safeSlides.length - 1}
        >
          <svg width="16" height="16" fill="currentColor" className="arrow-icon arrow-right-circle" viewBox="0 0 16 16" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </button>
      </section>
    </div>
  );
}
