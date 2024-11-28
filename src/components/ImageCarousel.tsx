import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageCarousel.css'; // Importa el archivo CSS específico

const ImageCarousel: React.FC = () => {
  return (
    <div className="image-carousel-container">
      <div className="carousel-text-container">
        <h1>¡Descubre tu jardín interior!</h1>
        <p>Transforma tu espacio con el poder de las plantas. Desde suculentas hasta orquídeas, tenemos la planta perfecta para ti.</p>
        <div className="button-container">
          <button className="btn btn-success mx-2">Explora nuestro catálogo</button>
          <button className="btn btn-outline-success">Ofertas</button>
        </div>
      </div>

      {/* Carrusel de imágenes */}
      <div className="carousel-images-container">
        <Carousel className="carousel-images">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/home/1.png"
              alt="Primer slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/home/1.png"
              alt="Segundo slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/home/1.png"
              alt="Tercer slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
