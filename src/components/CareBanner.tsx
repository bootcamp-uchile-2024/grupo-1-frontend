import React from 'react';
import './CareBanner.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Icono de Luz Baja
import OpacityIcon from '@mui/icons-material/Opacity'; // Icono de Riego Medio
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Icono de Cuidado Medio
import HomeIcon from '@mui/icons-material/Home'; // Icono de Interior
import PetsIcon from '@mui/icons-material/Pets'; // Icono de Petfriendly
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icono de check

const CareBanner: React.FC = () => {
  return (
    <div className="care-banner-container">
      {/* Sección izquierda con los iconos */}
      <div className="left-section">
        <div className="care-icons-container">
          <div className="care-icon">
            <WbSunnyIcon className="care-icon-item" />
            <span>Luz</span>
          </div>
          <div className="care-icon">
            <OpacityIcon className="care-icon-item" />
            <span>Riego</span>
          </div>
          <div className="care-icon">
            <FitnessCenterIcon className="care-icon-item" />
            <span>Cuidado</span>
          </div>
          <div className="care-icon">
            <HomeIcon className="care-icon-item" />
            <span>Interior</span>
          </div>
          <div className="care-icon">
            <PetsIcon className="care-icon-item" />
            <span>Petfriendly</span>
          </div>
        </div>

        <div className="care-info">
          <h1>
            ¿Primera vez <span>cuidando una planta?</span>
          </h1>
          <p>Descubre la planta ideal que se adapta a tu ritmo de vida</p>
        </div>

        <div className="care-buttons">
          <button className="guide-button">Guías de cuidado</button>
          <button className="beginner-button">Plantas para principiantes</button>
        </div>
      </div>

      {/* Sección derecha con los puntos */}
      <div className="right-section">
        <ul>
          <li>
            <CheckCircleIcon className="check-icon" /> Simples de cuidar
          </li>
          <li>
            <CheckCircleIcon className="check-icon" /> Resistentes
          </li>
          <li>
            <CheckCircleIcon className="check-icon" /> Ideales para cualquier espacio
          </li>
          <li>
            <CheckCircleIcon className="check-icon" /> Compra sin complicaciones
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CareBanner;