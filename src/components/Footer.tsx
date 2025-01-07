import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Email } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo de Plantopía */}
          <div className="footer-column">
            <h4>Plantopía</h4>
          </div>

          {/* Plantas */}
          <div className="footer-column">
            <h4>Plantas</h4>
            <a href="#">Interior</a>
            <a href="#">Exterior</a>
            <a href="#">Petfriendly</a>
            <a href="#">Recordatorios</a>
            <a href="#">Cuidados</a>
          </div>

          {/* Kits */}
          <div className="footer-column">
            <h4>Kits</h4>
            <a href="#">Básico</a>
            <a href="#">Medio</a>
            <a href="#">Experto</a>
            <a href="#">Regalo</a>
            <a href="#">Gift card</a>
          </div>

          {/* Soporte */}
          <div className="footer-column">
            <h4>Soporte</h4>
            <a href="#">Plantopiapp</a>
            <a href="#">Contáctanos</a>
            <a href="#">Chatbot</a>
            <a href="#">Agenda con un experto</a>
            <a href="#">Guías de cuidado</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© Plantopía ~ El lugar ideal para amantes de las plantas | 2024</span>
        <div className="social-icons">
          <Email />
          <Facebook />
          <Instagram />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
