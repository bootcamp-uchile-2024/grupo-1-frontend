import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCart } from '../CartContext';
import { UserInfo } from './UserInfo';
import { ShoppingCart } from '@mui/icons-material';
import './Navbar.css'; 
import SearchIcon from '@mui/icons-material/Search';


const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((total, item) => total + (item.cantidad || 0), 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          Plantopía
        </Link>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="search-form">
  <input
    type="text"
    placeholder="Busca aquí..."
    className="search-input"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button type="submit" className="search-button">
    <SearchIcon />
  </button>
</form>


        {/* Botón de colapso */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item"><Link to="/plantas" className="nav-link">Plantas</Link></li>

            {/* Menú desplegable con hover */}
            <li className="nav-item dropdown hover-dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="catalogoDropdown"
                role="button"
                aria-expanded="false"
              >
                Catálogo
              </Link>
              <ul className="dropdown-menu" aria-labelledby="catalogoDropdown">
                <li><Link to="/maceteros" className="dropdown-item">Maceteros</Link></li>
                <li><Link to="/fertilizantes" className="dropdown-item">Fertilizantes</Link></li>
                <li><Link to="/sustratos" className="dropdown-item">Sustratos</Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
            <li className="nav-item"><Link to="/servicios" className="nav-link">Servicios</Link></li>
            <li className="nav-item"><Link to="/kits" className="nav-link">Kits</Link></li>
            <li className="nav-item"><Link to="/admin" className="nav-link">Admin</Link></li>

            {/* Carrito */}
            <li className="nav-item">
              <button className="btn cart-link" onClick={onToggleSidebar}>
                <ShoppingCart />
                {totalItems > 0 && <span className="cart-notification">{totalItems}</span>}
              </button>
            </li>

            {/* Información del usuario */}
            <li className="nav-item">
              <UserInfo />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  