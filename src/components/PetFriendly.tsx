import React from 'react';
import './PetFriendly.css';

const PetFriendly: React.FC = () => {
  return (
    <div className="pet-friendly-container">
      <div className="pet-friendly-card">
        <h1 className="pet-friendly-title">¡Somos PetFriendly!</h1>
        <p className="pet-friendly-description">
          Encuentra las plantas ideales para tu hogar y tus mascotas.
        </p>
        <button className="discover-button">Descubre más</button>
      </div>
    </div>
  );
};

export default PetFriendly;
