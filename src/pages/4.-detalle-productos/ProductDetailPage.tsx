import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';

interface Product {
  nombreProducto: string;
  descripcionProducto: string;
  precio: number;
  stock: number;
  imagenes: { id: number; urlImagen: string }[];
  categoria: { nombreCategoria: string };
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Asegúrate de definir un parámetro dinámico en tus rutas
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://16.171.43.137:4000/productos/${id}`);
        const data = await response.json();
        if (data && data.producto) {
          setProduct(data.producto);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <ProductDetail
      nombreProducto={product.nombreProducto}
      descripcionProducto={product.descripcionProducto}
      precio={product.precio}
      stock={product.stock}
      imagenes={product.imagenes}
      categoria={product.categoria.nombreCategoria}
    />
  );
};

export default ProductDetailPage;
