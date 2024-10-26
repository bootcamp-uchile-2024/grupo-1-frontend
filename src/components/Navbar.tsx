import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { UserInfo } from './UserInfo';
import { useCart } from '../CartContext'; // Importar el contexto del carrito

// SVG para el ícono del carrito
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 4v2h2l3.6 7.59-1.35 2.44c-.2.36-.25.78-.14 1.18.11.4.38.74.74.96.36.22.8.32 1.23.25h7v-2h-6.42c-.14-.01-.28-.1-.36-.23-.08-.13-.09-.3-.01-.44l.75-1.35h4.96c.37 0 .72-.21.88-.55l3.58-6.49h-16.25l-.94-2h-2.03zm2 13c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm10 0c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z" />
  </svg>
);

const Navbar: React.FC = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { cartItems } = useCart();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + (item.cantidad || 0), 0);


  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo'>
          PLANTOPIA
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>Productos <i className='fas fa-caret-down' /></Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link to='/contacto' className='nav-links' onClick={closeMobileMenu}>Contáctanos</Link>
          </li>
          <li className='nav-item'>
            <Link to='/quienes-somos' className='nav-links' onClick={closeMobileMenu}>Quienes Somos</Link>
          </li>
          <li className='nav-item'>
            <Link to='/admin' className='nav-links' onClick={closeMobileMenu}>Administrador</Link>
          </li>
          <li className='nav-item'>
            <div className='nav-links' onClick={closeMobileMenu}><UserInfo /></div>
          </li>
          <li className='nav-item'>
            <Link className='nav-links cart-link' onClick={closeMobileMenu} to='/carrito'>
              <CartIcon />
              {totalItems > 0 && (
                <span className="cart-notification">{totalItems}</span> // Mostrar total de productos
              )}
            </Link>
              </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
  