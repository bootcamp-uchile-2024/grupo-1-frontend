import React from 'react';
import { useCart } from '../CartContext';
import './SidebarCart.css';
import { Link } from 'react-router-dom';

const SidebarCart: React.FC<{ show: boolean; toggleSidebar: () => void }> = ({ show, toggleSidebar }) => {
  const { cartItems, removeFromCart, incrementProduct, decrementProduct } = useCart();

  return (
    <div className={`sidebar-cart ${show ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="close-button">Cerrar</button>
      <h2>Productos en el Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              {/* Muestra la imagen del producto */}
              {item.imagenProducto && (
                <img 
                  src={item.imagenProducto} 
                  alt={item.nombreProducto} 
                  className="cart-item-image"
                />
              )}
              <h3>{item.nombreProducto}</h3>
              <p><strong>Precio:</strong> ${item.precio.toFixed(2)}</p>
              <p><strong>Cantidad:</strong> {item.cantidad ?? 0}</p>
              <button onClick={() => incrementProduct(item)}>+</button>
              <button onClick={() => decrementProduct(item)} disabled={(item.cantidad ?? 1) <= 1}>-</button>
              <button onClick={() => removeFromCart(item)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {/* Botón para ir al carrito de compras */}
      <Link to="/carrito">
        <button className="go-to-cart-button">Ir al Carrito</button>
      </Link>
    </div>
  );
};

export default SidebarCart;
