import React from 'react';
import { Button, Container } from 'react-bootstrap';
import ProductCarousel from '../../components/ProductCarousel';
import ImageCarousel from '../../components/ImageCarousel';

const HomePage: React.FC = () => {
  const featuredProducts = ['Hierba Gatera', 'Pachira Trenzada', 'Orquidea Fucsia XL', 'Monstera Deliciosa', 'Planta 5', 'Planta 6', 'Planta 7', 'Planta 8'];
  const recommendedProducts = ['Kit nivel Intermedio', 'Kit nivel avanzado', 'Humus de lombriz', 'Sustrato Orgánico', 'Producto 5', 'Producto 6', 'Producto 7', 'Producto 8'];
  const productPrices = ['$8.990', '$8.990', '$34.990', '$24.990', '$25.990', '$35.990', '$5.990', '$20.990'];
  
  const images = [
    'https://drive.google.com/uc?id=1COxutGXzjzjL8TEFAduLULRX3AG8uHTK',  
  ];
  
  return (
    <div>
      <header>
      </header>

      <Container>
        {/* Carrusel de imágenes */}
        <ImageCarousel />

        {/* Productos Destacados */}
        <h2 className="my-4">Productos destacados</h2>
        <ProductCarousel products={featuredProducts} prices={productPrices.slice(0, 4)} />

        {/* Productos Recomendados */}
        <h2 className="my-4">Recomendados para ti</h2>
        <ProductCarousel products={recommendedProducts} prices={productPrices.slice(4)} />
      </Container>

      {/* Footer */}
      <footer className="text-center mt-5 py-4">

      </footer>
    </div>
  );
}

export default HomePage;
