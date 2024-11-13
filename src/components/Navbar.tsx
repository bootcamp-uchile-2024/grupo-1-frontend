import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCart } from '../CartContext';
import { UserInfo } from './UserInfo';

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 4v2h2l3.6 7.59-1.35 2.44c-.2.36-.25.78-.14 1.18.11.4.38.74.74.96.36.22.8.32 1.23.25h7v-2h-6.42c-.14-.01-.28-.1-.36-.23-.08-.13-.09-.3-.01-.44l.75-1.35h4.96c.37 0 .72-.21.88-.55l3.58-6.49h-16.25l-.94-2h-2.03zm2 13c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm10 0c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z" />
  </svg>
);

const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + (item.cantidad || 0), 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
              {/* Botón de carrito que abre la barra lateral */}
              <button
                className="btn nav-link cart-link"
                onClick={onToggleSidebar} // Llama a onToggleSidebar al hacer clic
              >
                <CartIcon />
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
