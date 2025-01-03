import React, { useState } from 'react';
import './ImageSlider.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Flecha izquierda
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Flecha derecha
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const slides = [
  {
    id: 1,
    image: '/home/left-content.png', // Ruta de la primera imagen
  },
  {
    id: 2,
    image: '/home/left-content-2.png', // Ruta de la segunda imagen
  },
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Índice actual del slider

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Avanzar al siguiente slide
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length); // Retroceder al slide anterior
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index); // Cambiar al índice seleccionado
  };

  const currentSlide = slides[currentIndex]; // Slide actual

  return (
    <section className="slider">
      {/* Flecha izquierda */}
      <button className="slider-arrow left" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </button>

      <div className="slider-item">
        <div className="slider-card">
          <h1>
            Transforma tu espacio con <span>tu planta ideal</span>
          </h1>
          <p>¡Descubre nuestras LP!</p>
          <Link to="/plantas" className="slider-button">
            Comprar aquí
            <AddShoppingCartIcon className="cart-icon" />
          </Link>
        </div>
        <div className="slider-image">
          <img src={currentSlide.image} alt={`Slide ${currentSlide.id}`} />
        </div>
      </div>

      {/* Flecha derecha */}
      <button className="slider-arrow right" onClick={handleNext}>
        <ArrowForwardIosIcon />
      </button>

      {/* Indicadores de puntos */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider; 