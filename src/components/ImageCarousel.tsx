import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageCarousel.css'; // Asegúrate de que este archivo esté correctamente importado

interface ImageCarouselProps {
  images: string[]; // Las imágenes ahora se pasan como props
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className="image-carousel-container">
      <div className="carousel-text-container">
        <h1>¡Descubre tu jardín interior!</h1>
        <p>
          Transforma tu espacio con el poder de las plantas. Desde suculentas
          hasta orquídeas, tenemos la planta perfecta para ti.
        </p>
        <div className="button-container">
          <button className="btn btn-success mx-2">Explora nuestro catálogo</button>
          <button className="btn btn-outline-success">Ofertas</button>
        </div>
      </div>

      {/* Carrusel de imágenes */}
      <div className="carousel-images-container">
        <Carousel className="carousel-images">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
