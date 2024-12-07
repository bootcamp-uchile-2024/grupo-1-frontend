import React from 'react';
import './PetFriendly.css';

const PetFriendly: React.FC = () => {
  return (
    <section className="pet-friendly">
      <div className="pet-friendly-content">
        <h2>Somos Petfriendly</h2>
        <p>Encuentra las plantas ideales para tu hogar y tus mascotas</p>
        <button>Descubre más</button>
      </div>
      <div className="pet-friendly-image">
        <img src="/path/to/pet-friendly.png" alt="Somos Petfriendly" />
      </div>
    </section>
  );
};

export default PetFriendly;
