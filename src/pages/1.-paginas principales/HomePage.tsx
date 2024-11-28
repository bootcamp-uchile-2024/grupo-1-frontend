import React from 'react';
import { Button, Container } from 'react-bootstrap';
import ProductCarousel from '../../components/ProductCarousel';
import ImageCarousel from '../../components/ImageCarousel';

const HomePage: React.FC = () => {
  const featuredProducts = [
    'Hierba Gatera',
    'Pachira Trenzada',
    'Orquidea Fucsia XL',
    'Monstera Deliciosa',
    'Planta 5',
    'Planta 6',
    'Planta 7',
    'Planta 8',
  ];
  const recommendedProducts = [
    'Kit nivel Intermedio',
    'Kit nivel avanzado',
    'Humus de lombriz',
    'Sustrato Orgánico',
    'Producto 5',
    'Producto 6',
    'Producto 7',
    'Producto 8',
  ];
  const productPrices = [
    '$8.990',
    '$8.990',
    '$34.990',
    '$24.990',
    '$25.990',
    '$35.990',
    '$5.990',
    '$20.990',
  ];

  // Agregar imágenes para productos destacados y recomendados
  const featuredImages = [
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    
  ];
  const recommendedImages = [
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
    'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/WMDB7LVFBRFSXFLDBQHESOFM3A.png',
  ];

  return (
    <div>
      <header></header>

      <Container>
        {/* Carrusel de imágenes */}
        <ImageCarousel />

        {/* Productos Destacados */}
        <h2 className="my-4">Productos destacados</h2>
        <ProductCarousel
          products={featuredProducts.slice(0, 8)}
          prices={productPrices.slice(0, 8)}
          images={featuredImages}
        />

        {/* Productos Recomendados */}
        <h2 className="my-4">Recomendados para ti</h2>
        <ProductCarousel
          products={recommendedProducts.slice(0, 8)}
          prices={productPrices.slice(8)}
          images={recommendedImages}
        />
      </Container>

      {/* Footer */}
      <footer className="text-center mt-5 py-4"></footer>
    </div>
  );
};

export default HomePage;
