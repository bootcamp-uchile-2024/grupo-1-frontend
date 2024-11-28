import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ProductCarousel.css'; // Asegúrate de que el archivo CSS esté correctamente importado

// Definir el tipo para los props del componente
interface ProductCarouselProps {
  products: string[];
  prices: string[];
  images: string[]; // El prop images es obligatorio
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, prices, images }) => {
  if (!products || !prices || !images || products.length === 0 || prices.length === 0 || images.length === 0) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="product-carousel-container">
      <Carousel>
        <Carousel.Item>
          <div className="product-carousel-inner">
            {products.slice(0, 8).map((product, index) => (
              <div className="product-carousel-item" key={index}>
                {/* Usar las URLs de las imágenes de Google Drive */}
                {images[index] ? (
                  <img src={images[index]} alt={product} />
                ) : (
                  <div>No disponible</div>
                )}
                <div className="product-info">
                  <h5>{product}</h5>
                  <p>{prices[index]}</p>
                </div>
              </div>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
