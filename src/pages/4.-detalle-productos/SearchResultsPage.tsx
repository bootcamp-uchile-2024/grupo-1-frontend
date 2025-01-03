import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

interface Product {
  id: number;
  nombreProducto: string;
  precioNormal: number;
  imagenProducto: string;
  categoria: string;
}

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://3.142.12.50:4000/productos/catalogo?page=1&size=200');
        if (!response.ok) throw new Error('Error al obtener los resultados.');

        const data = await response.json();
        const filteredResults = data.data
          .map((item: any) => ({
            id: item.id,
            nombreProducto: item.nombreProducto,
            precioNormal: item.precioNormal,
            imagenProducto: item.imagenes[0]?.urlImagen || '/default-image.png',
            categoria: item.categoria?.nombreCategoria || 'Sin categoría',
          }))
          .filter((product: Product) =>
            product.nombreProducto.toLowerCase().includes(query.toLowerCase())
          );

        setResults(filteredResults);
      } catch (err) {
        setError('No se encontraron resultados.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Resultados de búsqueda para "{query}"</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {results.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {results.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              nombreProducto={product.nombreProducto}
              precio={product.precioNormal}
              stock={0} // Si no tienes stock en la búsqueda, pon un valor por defecto
              imagenProducto={product.imagenProducto}
              categoria={product.categoria}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
