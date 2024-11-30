import React, { useRef, useState } from 'react';
import './ProductCarousel.css';

interface ProductCarouselProps {
  products: string[];
  prices: string[];
  images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, prices, images }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const walk = (clientX - startX) * 1.5; // Ajuste de sensibilidad
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="carousel-container"
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={handleDragging}
      onTouchStart={startDragging}
      onTouchEnd={stopDragging}
      onTouchMove={handleDragging}
    >
      <div className="carousel-content" ref={carouselRef}>
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="product-image">
              <img src={images[index]} alt={product} />
            </div>
            <div className="product-info">
              <p className="product-price">{prices[index]}</p>
              <p className="product-name">{product}</p>
              <button className="view-product-button">Ver Producto</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
