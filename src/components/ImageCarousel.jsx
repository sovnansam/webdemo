import React, { useEffect, useRef, useState } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images = [], autoplay = true, interval = 4000, showThumbnails = true }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const validImages = Array.isArray(images) && images.length ? images : [
    { src: 'https://images.unsplash.com/photo-1587502536263-3e0d6a4d65f3?auto=format&fit=crop&w=1200&q=80', alt: 'Heart 1', caption: 'Advanced Cardiology' },
    { src: 'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?auto=format&fit=crop&w=1200&q=80', alt: 'Heart 2', caption: 'Imaging & Diagnostics' },
    { src: 'https://images.unsplash.com/photo-1580281657521-7f6f5b9a1cda?auto=format&fit=crop&w=1200&q=80', alt: 'Heart 3', caption: 'Clinical Team' }
  ];

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % validImages.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoplay, interval, validImages.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const prev = () => {
    clearInterval(timerRef.current);
    setIndex((i) => (i - 1 + validImages.length) % validImages.length);
  };

  const next = () => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + 1) % validImages.length);
  };

  return (
    <div className="carousel-root">
      <div className="carousel-viewport" aria-roledescription="carousel">
        {validImages.map((img, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === index ? 'active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${validImages.length}`}
          >
            <div className="carousel-image-circle">
              <img src={img.src} alt={img.alt || `slide-${i}`} loading="lazy" />
            </div>
            {img.caption && <div className="carousel-caption">{img.caption}</div>}
          </div>
        ))}

        <button className="carousel-btn prev" onClick={prev} aria-label="Previous slide">‹</button>
        <button className="carousel-btn next" onClick={next} aria-label="Next slide">›</button>
      </div>

      {showThumbnails && (
        <div className="carousel-thumbs">
          {validImages.map((img, i) => (
            <button
              key={i}
              className={`carousel-thumb ${i === index ? 'selected' : ''}`}
              onClick={() => { clearInterval(timerRef.current); setIndex(i); }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <img src={img.src} alt={img.alt || `thumb-${i}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
