import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  nombreProducto: string;
  nombreCientifico?: string;
  imagenProducto: string;
  descuento?: number;
  precio: number;
  stock: number;
  descripcionProducto: string;
  categoria: string;
}

interface DataFetcherProps {
  tipo: 'plantas' | 'maceteros' | 'fertilizantes' | 'sustratos' | 'controlPlagas';
  filters: Record<string, string | boolean>;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ tipo, filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URLS: Record<DataFetcherProps['tipo'], string> = {
    plantas: 'http://16.171.43.137:4000/productos/plantas/get',
    maceteros: 'http://16.171.43.137:4000/productos/maceteros/get',
    fertilizantes: 'http://16.171.43.137:4000/productos/fertilizantes/get',
    sustratos: 'http://16.171.43.137:4000/productos/sustratos/get',
    controlPlagas: 'http://16.171.43.137:4000/productos/catalogo',
  };

  const buildUrlWithFilters = () => {
    const baseUrl = API_URLS[tipo];
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') params.append(key, String(value));
    });

    params.append('page', '1');
    params.append('size', '10');
    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const urlWithFilters = buildUrlWithFilters();
        const response = await fetch(urlWithFilters);

        if (!response.ok) throw new Error('Error al obtener los productos');

        const data = await response.json();
        const mappedProducts = data.data.map((item: any) => ({
          id: item.producto.id,
          nombreProducto: item.producto.nombreProducto,
          nombreCientifico: item.nombreCientifico || undefined,
          imagenProducto: item.producto.imagenes[0]?.urlImagen || '',
          descuento: item.producto.descuento,
          precio: item.producto.precioNormal,
          stock: item.producto.stock,
          descripcionProducto: item.producto.descripcionProducto,
          categoria: item.producto.categoria.nombreCategoria,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tipo, filters]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default DataFetcher;
