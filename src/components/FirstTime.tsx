import React, { useState } from 'react';
import './FirstTime.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Flecha izquierda
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Flecha derecha

const slides = [
  {
    id: 1,
    subtitle:
      'Descubre la planta ideal para ti y tu ritmo de vida (CTA a app / carrusel de plantas con sus cuidados).',
    image: '/home/content-section.png',
  },
  {
    id: 2,
    subtitle:
      'Explora las opciones que mejor se adaptan a tu hogar y estilo de vida.',
    image: '/home/content-section-2.png',
  },
];

const FirstTime: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Índice actual del slider

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Avanzar al siguiente slide
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length); // Retroceder al slide anterior
  };

  const currentSlide = slides[currentIndex]; // Slide actual

  return (
    <section className="first-time-slider">
      {/* Texto estático */}
      <div className="text-section">
        <h1>
          <span className="first-text">¿Es tu primera vez</span>{' '}
          <span className="highlighted-text">comprando plantas?</span>
        </h1>
        <p>{currentSlide.subtitle}</p>
      </div>

      {/* Flecha izquierda */}
      <button className="slider-arrow left" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </button>

      {/* Imagen principal */}
      <div className="image-section">
        <img src={currentSlide.image} alt={`Slide ${currentSlide.id}`} />
      </div>

      {/* Flecha derecha */}
      <button className="slider-arrow right" onClick={handleNext}>
        <ArrowForwardIosIcon />
      </button>
    </section>
  );
};

export default FirstTime;
