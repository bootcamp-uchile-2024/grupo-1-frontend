import React from 'react';
import './ProductDetail.css';

interface ProductDetailProps {
  nombreProducto: string;
  descripcionProducto: string;
  precio: number;
  stock: number;
  imagenes: { id: number; urlImagen: string }[];
  categoria: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  nombreProducto,
  descripcionProducto,
  precio,
  stock,
  imagenes,
  categoria,
}) => {
  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={imagenes[0]?.urlImagen || '/default-image.png'} alt={nombreProducto} />
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
