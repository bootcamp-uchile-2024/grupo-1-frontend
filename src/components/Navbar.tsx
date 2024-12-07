import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCart } from '../CartContext';
import { UserInfo } from './UserInfo';
import { ShoppingCart } from '@mui/icons-material';  // Usando el icono de Material Design

const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + (item.cantidad || 0), 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Plantopía
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/plantas" className="dropdown-item">Plantas</Link></li>
                <li><Link to="/maceteros" className="dropdown-item">Maceteros</Link></li>
                <li><Link to="/fertilizantes" className="dropdown-item">Fertilizantes</Link></li>
                <li><Link to="/sustratos" className="dropdown-item">Sustratos</Link></li>
                {/* <li><Link to="/control-de-plagas" className="dropdown-item">Control de Plagas</Link></li> */}
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/quienes-somos" className="nav-link">Quienes Somos</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Administrador</Link>
            </li>
            <li className="nav-item">
              <UserInfo />
            </li>
            <li className="nav-item">
              {/* Botón de carrito con icono */}
              <button className="btn nav-link cart-link" onClick={onToggleSidebar}>
                <ShoppingCart /> {/* Icono de carrito */}
                {totalItems > 0 && (
                  <span className="cart-notification">{totalItems}</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
