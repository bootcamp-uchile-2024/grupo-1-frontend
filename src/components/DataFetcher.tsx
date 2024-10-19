import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext'; // Importar el contexto del carrito

interface Product {
  nombreProducto: string;
  nombreCientifico?: string;
  imagenProducto: string | null;
  descuento?: string;
  precioNormal: string;
  coberturaDeDespacho?: string;
  stock: number; // Stock debe ser de tipo número
  descripcionProducto: string;
  categoria: string;
  habitat?: string;
  luz?: string;
  frecuenciaDeRiego?: string;
  fertilizanteSugerido?: string;
  humedadIdeal?: string;
  temperaturaIdeal?: string;
  toxicidadParaMascotas?: string;
  tipoDeSuelo?: string;
  dificultadDeCuidado?: string;
}

const DataFetcher: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cartItems, incrementProduct, decrementProduct, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        const result: any[] = await response.json();

        const mappedProducts = result.map((item) => ({
          nombreProducto: item.title,
          nombreCientifico: undefined,
          imagenProducto: item.image || null,
          descuento: undefined,
          precioNormal: item.price !== undefined ? item.price.toString() : '0',
          coberturaDeDespacho: undefined,
          stock: 10, // Inicialmente asignar un stock; puedes cambiarlo a stock real si está disponible
          descripcionProducto: item.description,
          categoria: item.category,
          habitat: undefined,
          luz: undefined,
          frecuenciaDeRiego: undefined,
          fertilizanteSugerido: undefined,
          humedadIdeal: undefined,
          temperaturaIdeal: undefined,
          toxicidadParaMascotas: undefined,
          tipoDeSuelo: undefined,
          dificultadDeCuidado: undefined,
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
  }, []);

  // Función para manejar la compra
  const handlePurchase = (product: Product) => {
    const existingProduct = cartItems.find(item => item.nombreProducto === product.nombreProducto);
    const currentQuantity = existingProduct ? existingProduct.cantidad : 0;

    // Verificar si hay suficiente stock disponible
    if (product.stock > currentQuantity) {
      addToCart(product); // Agregar al carrito

      // Actualizar el stock en el estado de productos
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.nombreProducto === product.nombreProducto 
            ? { ...p, stock: p.stock - 1 } // Reducir el stock en 1
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
          const quantityInCart = currentItem ? currentItem.cantidad : 0;

          return (
            <li key={index}>
              <h3>{product.nombreProducto}</h3>
              {product.imagenProducto && (
                <img src={product.imagenProducto} alt={product.nombreProducto} style={{ width: '100px', height: '100px' }} />
              )}
              <p><strong>Descripción:</strong> {product.descripcionProducto}</p>
              <p><strong>Precio:</strong> ${product.precioNormal}</p>
              <p><strong>Categoría:</strong> {product.categoria}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <button onClick={() => handlePurchase(product)}>Agregar al carrito</button>

              {/* Botones para incrementar y disminuir cantidad */}
              {quantityInCart > 0 && (
                <div>
                  <button onClick={() => incrementProduct(product)} disabled={quantityInCart >= product.stock}>+</button>
                  <button onClick={() => decrementProduct(product)} disabled={quantityInCart <= 1}>-</button>
                  <span>Cantidad: {quantityInCart}</span>
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
