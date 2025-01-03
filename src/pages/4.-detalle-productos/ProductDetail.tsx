import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

interface Product {
  id: string;
  nombreProducto: string;
  descripcionProducto: string;
  precio: number;
  stock: number;
  imagenes: { id: number; urlImagen: string }[];
  categoria: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://16.171.43.137:4000/productos/catalogo?page=1&size=200`);
        if (!response.ok) throw new Error('Error al obtener los productos del catálogo');
        const data = await response.json();
        const foundProduct = data.data.find((p: any) => String(p.producto.id) === id);
        if (!foundProduct) throw new Error('Producto no encontrado');
        setProduct({
          id: foundProduct.producto.id,
          nombreProducto: foundProduct.producto.nombreProducto,
          descripcionProducto: foundProduct.producto.descripcionProducto,
          precio: foundProduct.producto.precioNormal,
          stock: foundProduct.producto.stock,
          imagenes: foundProduct.producto.imagenes,
          categoria: foundProduct.producto.categoria.nombreCategoria,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  const { nombreProducto, descripcionProducto, precio, stock, imagenes, categoria } = product;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={imagenes[0]?.urlImagen || ''} alt={nombreProducto} />
      </div>
      <div className="product-detail-info">
        <h1>{nombreProducto}</h1>
        <p className="category">Categoría: {categoria}</p>
        <p className="price">${precio.toFixed(2)}</p>
        <p className="description">{descripcionProducto}</p>
        <p className="stock">Stock disponible: {stock}</p>
        <button className="add-to-cart-button">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductDetail;
