import React from 'react';
import './CareBanner.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CareBanner: React.FC = () => {
  return (
    <div className="care-banner-container">
      {/* Sección izquierda */}
      <div className="left-section">
        <div className="care-info">
          <div className="care-badge">
            <span className="badge-title">Cuidado</span>
            <div className="badge-levels">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>
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

      {/* Sección derecha */}
      <div className="right-section">
        <ul>
          <li>
            <CheckCircleIcon className="check-icon" /> Simples de cuidar
          </li>
          <li>
            <CheckCircleIcon className="check-icon" /> Resistenes
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
