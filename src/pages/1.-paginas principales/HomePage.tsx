import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProductCarousel from '../../components/ProductCarousel';
import ImageSlider from '../../components/ImageSlider'; 
import Difficulty from '../../components/Difficulty';
import FirstTime from '../../components/FirstTime';
import PetFriendly from '../../components/PetFriendly';

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
        const response = await fetch('http://13.53.40.69:4000/productos/catalogo?page=1&size=200');
        if (!response.ok) {
          throw new Error(`Error al obtener el catálogo: ${response.statusText}`);
        }

        const result = await response.json();
        const products: Product[] = result.data.map((item: any) => ({
          nombreProducto: item.nombreProducto,
          precioNormal: item.precioNormal,
          imagenProducto: item.imagenes?.map((img: { urlImagen: string }) => img.urlImagen) || [],
          categoria: item.categoria?.nombreCategoria || 'Sin categoría',
        }));

        setFeaturedProducts(products.slice(0, 8));
        setRecommendedProducts(products.slice(8, 16));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <header></header>

      {/* Nuevo Slider */}
      <ImageSlider />

      <Container>
        <h2 className="my-4">Productos destacados</h2>
        <ProductCarousel
          products={featuredProducts.map((product: Product) => product.nombreProducto)}
          prices={featuredProducts.map((product: Product) => `$${product.precioNormal.toFixed(2)}`)}
          images={featuredProducts.map((product: Product) => product.imagenProducto[0])}
        />

        <h2 className="my-4">Recomendados para ti</h2>
        <ProductCarousel
          products={recommendedProducts.map((product: Product) => product.nombreProducto)}
          prices={recommendedProducts.map((product: Product) => `$${product.precioNormal.toFixed(2)}`)}
          images={recommendedProducts.map((product: Product) => product.imagenProducto[0])}
        />
      </Container>

      <Difficulty />
      <FirstTime />
      <PetFriendly />
    </div>
  );
};

export default HomePage;
