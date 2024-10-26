import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext'; 

interface Product {
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
}

const DataFetcher: React.FC<DataFetcherProps> = ({ tipo }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cartItems, removeFromCart } = useCart();

  // Definir la URL de la API según el tipo de productos
  const API_URLS: Record<DataFetcherProps['tipo'], string> = {
    plantas: 'https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta',
    maceteros: 'https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Macetero',
    fertilizantes: 'https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Fertilizantes',
    sustratos: 'https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Sustrato',
    controlPlagas: 'https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Control%20Plagas',
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(API_URLS[tipo]); 
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        const result: any[] = await response.json();

        const mappedProducts = result.map((item) => ({
          nombreProducto: item.nombreProducto,
          nombreCientifico: item.nombreCientifico || undefined,
          imagenProducto: item.imagenProducto || [],
          descuento: item.descuento,
          precio: item.precioNormal, 
          coberturaDeDespacho: item.coberturaDeDespacho ? item.coberturaDeDespacho[0] : undefined,
          stock: item.stock,
          descripcionProducto: item.descripcionProducto,
          categoria: item.categoria,
          habitat: item.habitat,
          luz: item.luz,
          frecuenciaDeRiego: item.frecuenciaDeRiego,
          fertilizanteSugerido: item.fertilizantesSugeridos ? item.fertilizantesSugeridos[0] : undefined,
          humedadIdeal: item.humedadIdeal,
          temperaturaIdeal: item.temperaturaIdeal,
          toxicidadParaMascotas: item.toxicidadMascotas,
          tipoDeSuelo: item.tipoSuelo,
          dificultadDeCuidado: item.dificultadDeCuidado,
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
  }, [tipo]); // Dependencia del tipo

  // Función para manejar la compra
  const handlePurchase = (product: Product) => {
    const existingProduct = cartItems.find(item => item.nombreProducto === product.nombreProducto);
    const currentQuantity = existingProduct ? existingProduct.cantidad ?? 0 : 0;


    // Verificar si hay suficiente stock disponible
    if (product.stock > currentQuantity) {
      addToCart(product);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.nombreProducto === product.nombreProducto 
            ? { ...p, stock: p.stock - 1 } 
            : p
        )
      );
    } else {
      alert('No hay suficiente stock disponible para este producto.');
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
              <p><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
              <p><strong>Categoría:</strong> {product.categoria}</p>
              <p><strong>Stock:</strong> {product.stock}</p>

              <button onClick={() => handlePurchase(product)}>Agregar al carrito</button>

              {quantityInCart > 0 && (
                <div>
                  <span>Cantidad en el carrito: {quantityInCart}</span>
                  <button onClick={() => removeFromCart(product)}>Eliminar del carrito</button>
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
