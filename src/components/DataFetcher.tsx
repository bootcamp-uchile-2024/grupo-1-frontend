import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number; // Agregamos la variable id
  nombreProducto: string;
  nombreCientifico?: string;
  imagenProducto: string;
  descuento?: number;
  precio: number;
  coberturaDeDespacho?: string;
  stock: number;
  descripcionProducto: string;
  categoria: string;
  habitat?: string;
  luz?: string;
  frecuenciaDeRiego?: string;
  fertilizanteSugerido?: string;
  humedadIdeal?: string;
  temperaturaIdeal?: number;
  toxicidadParaMascotas?: boolean;
  tipoDeSuelo?: string;
  dificultadDeCuidado?: string;
}

interface DataFetcherProps {
  tipo: 'plantas' | 'maceteros' | 'fertilizantes' | 'sustratos' | 'controlPlagas';
  toggleSidebar: () => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ tipo, toggleSidebar }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cartItems, removeFromCart } = useCart();

  const API_URLS: Record<DataFetcherProps['tipo'], string> = {
    plantas: 'http://16.171.43.137:4000/productos/plantas/get?page=1&size=10',
    maceteros: 'http://16.171.43.137:4000/productos/maceteros/get?page=1&size=10',
    fertilizantes: 'http://16.171.43.137:4000/productos/fertilizantes/get?page=1&size=10',
    sustratos: 'http://16.171.43.137:4000/productos/sustratos/get?page=1&size=10',
    controlPlagas: 'http://16.171.43.137:4000/productos/catalogo?page=1&size=10',
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(API_URLS[tipo]);
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log('este es el producto: ', result);

        const mappedProducts = result.data.map((item: any) => ({
          id: item.producto.id, // Extraemos el id del producto
          nombreProducto: item.producto.nombreProducto,
          nombreCientifico: item.nombreCientifico || undefined,
          imagenProducto: item.producto.imagenes.map((img: any) => img.urlImagen),
          descuento: item.producto.descuento,
          precio: item.producto.precioNormal,
          stock: item.producto.stock,
          descripcionProducto: item.producto.descripcionProducto,
          categoria: item.producto.categoria.nombreCategoria,
          temperaturaIdeal: parseFloat(item.temperaturaIdeal),
          toxicidadParaMascotas: Boolean(item.toxicidadMascotas),
        }));

        setProducts(mappedProducts);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [tipo]);

  const handlePurchase = (product: Product) => {
    const existingProduct = cartItems.find(item => item.id === product.id); // Usamos id en lugar de nombreProducto
    const currentQuantity = existingProduct ? existingProduct.cantidad ?? 0 : 0;

    if (product.stock > currentQuantity) {
      addToCart(product);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
      toggleSidebar();
    } else {
      alert('No hay suficiente stock disponible para este producto.');
    }
  };

  const handleRemove = (product: Product) => {
    const existingProduct = cartItems.find(item => item.id === product.id); // Usamos id en lugar de nombreProducto
    if (existingProduct && existingProduct.cantidad) {
      removeFromCart(product);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, stock: p.stock + 1 } : p
        )
      );
    }
  };

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

              <Link to={`/productos/plantas/getbyid/${product.id}`}><button>Ver Detalles</button></Link>
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
