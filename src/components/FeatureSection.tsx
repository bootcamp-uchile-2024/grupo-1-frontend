import React from 'react';
import MopedIcon from '@mui/icons-material/Moped';
import LooksIcon from '@mui/icons-material/Looks';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import './FeatureSection.css'; // Asegúrate de que el archivo CSS esté importado

const FeatureSection: React.FC = () => {
  return (
    <section className="features-section">
      {/* Tarjeta 1: Envío gratis */}
      <div className="feature-card">
        <div className="icon-container">
          <MopedIcon />
        </div>
        <h3>Envío gratis</h3>
        <p>Despacho sin costo en compras sobre $50.000</p>
      </div>

      {/* Tarjeta 2: Soporte */}
      <div className="feature-card">
        <div className="icon-container">
          <SupportAgentIcon />
        </div>
        <h3>Soporte</h3>
        <p>Cuidamos cada detalle de tu experiencia</p>
      </div>

      {/* Tarjeta 3: Garantía Plantopiapp */}
      <div className="feature-card">
        <div className="icon-container">
          <LooksIcon />
        </div>
        <h3>Garantía Plantopiapp</h3>
        <p>Asegúrate que tus plantas crezcan sanas</p>
      </div>

      {/* Tarjeta 4: Recomendaciones */}
      <div className="feature-card">
        <div className="icon-container">
          <LocalFloristIcon />
        </div>
        <h3>Recomendaciones</h3>
        <p>Haz florecer tus habilidades</p>
      </div>
    </section>
  );
};

export default FeatureSection;