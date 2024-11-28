import React, { useRef } from 'react';
import './ProductCarousel.css';

interface ProductCarouselProps {
  products: string[];
  prices: string[];
  images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, prices, images }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Función para desplazar hacia la izquierda
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Función para desplazar hacia la derecha
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="carousel-container">
      {/* Botón de navegación izquierda */}
      <button
        className="carousel-button left"
        onClick={scrollLeft}
        aria-label="Scroll Left"
      >
        &#8249;
      </button>

      <div className="carousel-content" ref={carouselRef}>
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="product-image">
              <img src={images[index]} alt={product} />
              <div className="product-tag">Pet-friendly</div> {/* Etiqueta opcional */}
            </div>
            <div className="product-info">
              <h5 className="product-name">{product}</h5>
              <p className="product-price">{prices[index]}</p>
              
            </div>
            <button className="product-button">Ver Producto</button>
          </div>
        ))}
      </div>

      {/* Botón de navegación derecha */}
      <button
        className="carousel-button right"
        onClick={scrollRight}
        aria-label="Scroll Right"
      >
        &#8250;
      </button>
    </div>
  );
};

export default ProductCarousel;
