import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProductCarousel from '../../components/ProductCarousel';
import ImageCarousel from '../../components/ImageCarousel';

interface Product {
  nombreProducto: string;
  precioNormal: number;
  imagenProducto: string[];
  categoria: string;
}

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch('http://16.171.43.137:4000/productos/catalogo?page=1&size=200');
        if (!response.ok) {
          throw new Error(`Error al obtener el catálogo: ${response.statusText}`);
        }

        const result = await response.json();

        console.log('Respuesta de la API:', result); // Para depuración

        const products = result.data.map((item: any) => ({
          nombreProducto: item.nombreProducto,
          precioNormal: item.precioNormal,
          imagenProducto: item.imagenes.map((img: any) => img.urlImagen),
          categoria: item.categoria.nombreCategoria,
        }));

        // Lógica para separar los productos en destacados y recomendados
        setFeaturedProducts(products.slice(0, 8));
        setRecommendedProducts(products.slice(8, 16)); 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido al cargar el catálogo');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <header></header>

      <Container>
        {/* Carrusel de imágenes */}
        <ImageCarousel />

        {/* Productos Destacados */}
        <h2 className="my-4">Productos destacados</h2>
        <ProductCarousel
          products={featuredProducts.map((product) => product.nombreProducto)}
          prices={featuredProducts.map((product) => `$${product.precioNormal.toFixed(2)}`)}
          images={featuredProducts.map((product) => product.imagenProducto[0])}
        />

        {/* Productos Recomendados */}
        <h2 className="my-4">Recomendados para ti</h2>
        <ProductCarousel
          products={recommendedProducts.map((product) => product.nombreProducto)}
          prices={recommendedProducts.map((product) => `$${product.precioNormal.toFixed(2)}`)}
          images={recommendedProducts.map((product) => product.imagenProducto[0])}
        />
      </Container>

      {/* Footer */}
      <footer className="text-center mt-5 py-4"></footer>
    </div>
  );
};

export default HomePage;

