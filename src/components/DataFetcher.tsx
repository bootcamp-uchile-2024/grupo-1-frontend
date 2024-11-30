import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemsPerPage = 10;

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

    params.append('page', String(currentPage));
    params.append('size', String(itemsPerPage));
    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URLS[tipo]);
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();

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
        setTotalPages(Math.ceil(data.total / itemsPerPage)); // Total de páginas basado en la respuesta
      } catch (error) {
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tipo, filters, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Productos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {products.map((product) => {
          const currentItem = cartItems.find(item => item.id === product.id); // Usamos id en lugar de nombreProducto
          const quantityInCart = currentItem ? currentItem.cantidad ?? 0 : 0;

          return (
            <li key={product.id}>
              <h3>{product.nombreProducto}</h3>
              {product.imagenProducto.length > 0 && (
                <img
                  src={product.imagenProducto[0]}
                  alt={product.nombreProducto}
                  style={{ width: '100px', height: '100px' }}
                />
              )}
              <p><strong>Descripción:</strong> {product.descripcionProducto}</p>
              <p><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
              <p><strong>Categoría:</strong> {product.categoria}</p>
              <p><strong>Stock:</strong> {product.stock}</p>

              <button onClick={() => handlePurchase(product)}>Agregar al carrito</button>

              {quantityInCart > 0 && (
                <div>
                  <span>Cantidad en el carrito: {quantityInCart}</span>
                  <button onClick={() => handleRemove(product)}>Eliminar del carrito</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DataFetcher;
