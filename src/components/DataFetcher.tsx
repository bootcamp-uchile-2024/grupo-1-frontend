import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import './ProductCard.css'; // Archivo CSS para las tarjetas de productos

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
  toggleSidebar: () => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ tipo, filters, toggleSidebar }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cartItems, removeFromCart } = useCart();

  const API_URLS: Record<DataFetcherProps['tipo'], string> = {
    plantas: 'http://16.171.43.137:4000/productos/plantas/get',
    maceteros: 'http://16.171.43.137:4000/productos/maceteros/get',
    fertilizantes: 'http://16.171.43.137:4000/productos/fertilizantes/get',
    sustratos: 'http://16.171.43.137:4000/productos/sustratos/get',
    controlPlagas: 'http://16.171.43.137:4000/productos/catalogo',
  };

  // Construir la URL con filtros dinámicos
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

  const handlePurchase = (product: Product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    const currentQuantity = existingProduct ? existingProduct.cantidad ?? 0 : 0;

    if (product.stock > currentQuantity) {
      addToCart(product);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
      toggleSidebar();
    } else {
      alert('No hay suficiente stock disponible para este producto.');
    }
  };

  return (
    <div className="product-grid">
      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && products.length === 0 && <p>No se encontraron productos.</p>}
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.imagenProducto}
            alt={product.nombreProducto}
            className="product-image"
          />
          <div className="product-info">
            <h3>{product.nombreProducto}</h3>
            <p>${product.precio.toLocaleString()}</p>
            <p>{product.categoria}</p>
            <button onClick={() => handlePurchase(product)} className="product-button">
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataFetcher;
