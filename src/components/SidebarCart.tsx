import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import './SidebarCart.css';

const SidebarCart: React.FC<{ show: boolean; toggleSidebar: () => void }> = ({ show, toggleSidebar }) => {
  const { cartItems, incrementProduct, decrementProduct, getTotal } = useCart(); // Elimina `removeFromCart` si no se usa
  const navigate = useNavigate(); // Hook para la navegación

  const handleConfirmPurchase = () => {
    toggleSidebar(); // Cierra el Sidebar
    navigate('/carrito'); // Redirige a la página del carrito final
  };

  return (
    <div className={`sidebar-cart ${show ? 'open' : ''}`}>
      {/* Botón de cierre */}
      <button onClick={toggleSidebar} className="close-button">
        ✕
      </button>

      <h2>Carrito de compra</h2>

      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                {/* Imagen del producto */}
                {item.imagenProducto && (
                  <img
                    src={item.imagenProducto}
                    alt={item.nombreProducto}
                    className="cart-item-image"
                  />
                )}
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.nombreProducto}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => decrementProduct(item)}
                    disabled={(item.cantidad ?? 1) <= 1} // Usa valor predeterminado de 1
                  >
                    -
                  </button>
                  <span>{item.cantidad ?? 1}</span> {/* Asegúrate de mostrar un valor válido */}
                  <button onClick={() => incrementProduct(item)}>+</button>
                </div>
                <p className="cart-item-price">
                  ${((item.precio * (item.cantidad ?? 1)) || 0).toLocaleString()} {/* Evita valores undefined */}
                </p>
              </li>
            ))}
          </ul>

          {/* Resumen del total */}
          <div className="cart-summary">
            <p className="total-label">Total</p>
            <p className="total-amount">${getTotal().toLocaleString()}</p>
          </div>

          {/* Botones de acción */}
          <div className="cart-actions">
            <button className="confirm-button" onClick={handleConfirmPurchase}>
              Confirmar compra
            </button>
            <button className="continue-button" onClick={toggleSidebar}>
              Seguir comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarCart;
