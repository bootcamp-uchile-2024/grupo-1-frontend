import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

interface Product {
  nombreProducto: string;
  nombreCientifico?: string;
  imagenProducto: string[];
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
  toggleSidebar: () => void; // Prop para abrir el sidebar
}

const DataFetcher: React.FC<DataFetcherProps> = ({ tipo, toggleSidebar }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cartItems, removeFromCart } = useCart();

  // Nuevos endpoints basados en la URL proporcionada
  const API_URLS: Record<DataFetcherProps['tipo'], string> = {
    plantas: 'http://16.171.43.137:4000/productos/plantas/get?page=1&size=200',
    maceteros: 'http://16.171.43.137:4000/productos/maceteros/get?page=1&size=200',
    fertilizantes: 'http://16.171.43.137:4000/productos/fertilizantes/get?page=1&size=200',
    sustratos: 'http://16.171.43.137:4000/productos/sustratos/get?page=1&size=200',
    controlPlagas: 'http://16.171.43.137:4000/productos/catalogo?page=1&size=200', // Usamos el endpoint genérico para el catálogo
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(API_URLS[tipo]);
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();

        console.log('Respuesta de la API:', result); // Verificar la respuesta completa

        // Verificar si result es un array o si está contenido en una propiedad del objeto
        if (Array.isArray(result)) {
          const mappedProducts = result.map((item: Product) => ({
            nombreProducto: item.nombreProducto,
            nombreCientifico: item.nombreCientifico || undefined,
            // Asegurarse de que 'imagenProducto' sea siempre un array de cadenas
            imagenProducto: Array.isArray(item.imagenProducto) ? item.imagenProducto : [item.imagenProducto || ''],
            descuento: item.descuento,
            // Verificar que el precio esté definido y sea un número
            precio: typeof item.precio === 'number' && !isNaN(item.precio) ? item.precio : 0,
            coberturaDeDespacho: item.coberturaDeDespacho ? item.coberturaDeDespacho[0] : undefined,
            stock: item.stock,
            descripcionProducto: item.descripcionProducto,
            categoria: item.categoria,
            habitat: item.habitat,
            luz: item.luz,
            frecuenciaDeRiego: item.frecuenciaDeRiego,
            fertilizanteSugerido: item.fertilizanteSugerido ? item.fertilizanteSugerido[0] : undefined,
            humedadIdeal: item.humedadIdeal,
            temperaturaIdeal: item.temperaturaIdeal,
            toxicidadParaMascotas: item.toxicidadParaMascotas,
            tipoDeSuelo: item.tipoDeSuelo,
            dificultadDeCuidado: item.dificultadDeCuidado,
          }));

          setProducts(mappedProducts);
        } else if (result.data && Array.isArray(result.data)) {
          // Si la respuesta tiene una clave 'data' que contiene el array
          const mappedProducts = result.data.map((item: Product) => ({
            nombreProducto: item.nombreProducto,
            nombreCientifico: item.nombreCientifico || undefined,
            // Asegurarse de que 'imagenProducto' sea siempre un array de cadenas
            imagenProducto: Array.isArray(item.imagenProducto) ? item.imagenProducto : [item.imagenProducto || ''],
            descuento: item.descuento,
            // Verificar que el precio esté definido y sea un número
            precio: typeof item.precio === 'number' && !isNaN(item.precio) ? item.precio : 0,
            coberturaDeDespacho: item.coberturaDeDespacho ? item.coberturaDeDespacho[0] : undefined,
            stock: item.stock,
            descripcionProducto: item.descripcionProducto,
            categoria: item.categoria,
            habitat: item.habitat,
            luz: item.luz,
            frecuenciaDeRiego: item.frecuenciaDeRiego,
            fertilizanteSugerido: item.fertilizanteSugerido ? item.fertilizanteSugerido[0] : undefined,
            humedadIdeal: item.humedadIdeal,
            temperaturaIdeal: item.temperaturaIdeal,
            toxicidadParaMascotas: item.toxicidadParaMascotas,
            tipoDeSuelo: item.tipoDeSuelo,
            dificultadDeCuidado: item.dificultadDeCuidado,
          }));

          setProducts(mappedProducts);
        } else {
          console.error('La respuesta de la API no contiene un array de productos');
          setError('La respuesta de la API no es válida');
        }
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
    const existingProduct = cartItems.find(item => item.nombreProducto === product.nombreProducto);
    const currentQuantity = existingProduct ? existingProduct.cantidad ?? 0 : 0;

    if (product.stock > currentQuantity) {
      addToCart(product);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.nombreProducto === product.nombreProducto
            ? { ...p, stock: p.stock - 1 }
            : p
        )
      );
      toggleSidebar();
    } else {
      alert('No hay suficiente stock disponible para este producto.');
    }
  };

  const handleRemove = (product: Product) => {
    const existingProduct = cartItems.find(item => item.nombreProducto === product.nombreProducto);
    if (existingProduct && existingProduct.cantidad) {
      removeFromCart(product);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.nombreProducto === product.nombreProducto
            ? { ...p, stock: p.stock + 1 }
            : p
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
        {products.map((product, index) => {
          const currentItem = cartItems.find(item => item.nombreProducto === product.nombreProducto);
          const quantityInCart = currentItem ? currentItem.cantidad ?? 0 : 0;

          return (
            <li key={index}>
              <h3>{product.nombreProducto}</h3>
              {product.imagenProducto.length > 0 && (
                <img
                  src={product.imagenProducto[0]}
                  alt={product.nombreProducto}
                  style={{ width: '100px', height: '100px' }}
                />
              )}
              <p><strong>Descripción:</strong> {product.descripcionProducto}</p>
              <p><strong>Precio:</strong> ${product.precio ? product.precio.toFixed(2) : 'No disponible'}</p> {/* Si precio es 0 o undefined, muestra "No disponible" */}
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
