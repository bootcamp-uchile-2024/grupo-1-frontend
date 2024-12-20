import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import './SidebarCart.css';

const SidebarCart: React.FC<{ show: boolean; toggleSidebar: () => void }> = ({ show, toggleSidebar }) => {
  const { cartItems, incrementProduct, decrementProduct, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate(); // Hook para la navegación

  const handleConfirmPurchase = () => {
    toggleSidebar(); // Cierra el Sidebar
    navigate('/carrito'); // Redirige a la página del carrito final
  };

  return (
    <>
      {/* Overlay para el blur */}
      <div
        className={`cart-overlay ${show ? 'active' : ''}`}
        onClick={toggleSidebar} // Cierra el carrito si se hace clic en el overlay
      ></div>

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
                  <img
                    src={item.imagenProducto}
                    alt={item.nombreProducto}
                    className="cart-item-image"
                  />

                  {/* Contenido del producto */}
                  <div className="cart-item-content">
                    {/* Nombre del producto */}
                    <p className="cart-item-name">{item.nombreProducto}</p>

                    {/* Controles de cantidad y precio */}
                    <div className="cart-item-controls">
                      <div className="cart-item-quantity">
                        <button
                          onClick={() => decrementProduct(item)}
                          disabled={(item.cantidad ?? 1) <= 1}
                        >
                          -
                        </button>
                        <span>{item.cantidad ?? 1}</span>
                        <button onClick={() => incrementProduct(item)}>+</button>
                      </div>
                      <p className="cart-item-price">
                        ${((item.precio * (item.cantidad ?? 1)) || 0).toLocaleString()}
                      </p>
                    </div>

                    {/* Acciones del producto */}
                    <div className="cart-item-actions">
                      <button onClick={() => removeFromCart(item)}>Eliminar</button>
                      <button onClick={() => navigate(`/productos/${item.id}`)}>
                        Ver Producto
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Resumen del total */}
            <div className="cart-summary1">
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
    </>
  );
};

export default SidebarCart;