import React from 'react';
import { useCart } from '../CartContext';
import './ProductCard.css';

interface ProductCardProps {
  id: number;
  nombreProducto: string;
  precio: number;
  stock: number;
  imagenProducto: string;
  categoria: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  nombreProducto,
  precio,
  stock,
  imagenProducto,
  categoria,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      nombreProducto,
      precio,
      stock,
      imagenProducto,
      categoria,
    });
  };

  const isPetFriendly = stock > 13;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imagenProducto} alt={nombreProducto} />
        {isPetFriendly && (
          <div className="pet-friendly-badge">
            <img src="/home/simbologia.svg" alt="Pet-friendly" />
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{nombreProducto}</h3>
        <p>${precio.toLocaleString()}</p>
        <p>{categoria}</p>
        <button onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
