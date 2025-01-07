import React from 'react';
import './PetFriendly.css';
import ProductCard from './ProductCard'; // Importa ProductCard

const PetFriendly: React.FC = () => {
  return (
    <div className="pet-friendly-container">
      {/* Sección izquierda */}
      <div className="left-section">
        <h1 className="pet-friendly-title">¡Somos PetFriendly!</h1>
        <p className="pet-friendly-description">
          Encuentra las plantas ideales para tu hogar y tus mascotas.
        </p>
        <div className="pet-friendly-buttons">
          <button className="discover-button">Descubre más</button>
        </div>
      </div>

      {/* Sección derecha - ProductCard */}
      <div className="right-section">
        <ProductCard
          id={1}  // Aquí va el ID dinámico del producto
          nombreProducto="Caladium Mediana"  // Nombre del producto
          precio={23990}  // Precio del producto
          stock={10}  // Stock disponible
          imagenProducto="https://mygarden.com.co/wp-content/uploads/2020/05/CALADIUM-1.png"  // Imagen del producto
          categoria="Planta PetFriendly"  // Categoría
        />
      </div>
    </div>
  );
};

export default PetFriendly;