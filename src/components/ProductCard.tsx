import React from 'react';
import { useCart } from '../CartContext';
import './ProductCard.css';
import { Link } from 'react-router-dom';

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
      nombreProducto,
      stock,
      precio,
      imagenProducto,
      categoria: categoria,
      id
    });
  };
  


  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imagenProducto.includes('uploads/productos') ? `http://3.142.12.50:4000${imagenProducto}` : imagenProducto} alt={imagenProducto} />
      </div>
      <div className="product-info">
        {/* El nombre de la planta ahora es un enlace */}
        <h3>
          <Link to={`/productos/${categoria}/getbyid/${id}`} className="product-name-link">
            {nombreProducto}
          </Link>
        </h3>
        <p>${precio.toLocaleString()}</p>
        <p>{categoria}</p>
        <button className="view-product-button" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
