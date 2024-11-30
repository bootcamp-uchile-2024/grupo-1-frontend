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
  renderItem?: (products: Product[]) => JSX.Element; // Nueva propiedad para render personalizado
}

const DataFetcher: React.FC<DataFetcherProps> = ({ tipo, filters, renderItem }) => {
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

    params.append('page', '1'); // Paginación básica
    params.append('size', '200'); // Tamaño máximo de elementos
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
=======
        const mappedProducts = result.data.map((item: any) => ({
>>>>>>> origin/entrega-10
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

<<<<<<< HEAD
  // Usar renderItem si está disponible, de lo contrario mostrar productos predeterminados
  return renderItem ? (
    renderItem(products)
  ) : (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
=======
  return (
    <div>
      <h2>Productos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {products.map((product) => {
          const currentItem = cartItems.find(item => item.id === product.id); // Usamos id en lugar de nombreProducto
          const quantityInCart = currentItem ? currentItem.cantidad ?? 0 : 0;

          function handlePurchase(product: Product): void {
            throw new Error('Function not implemented.');
          }

          function handleRemove(product: Product): void {
            throw new Error('Function not implemented.');
          }

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
>>>>>>> origin/entrega-10
    </div>
  );
};

export default DataFetcher;
