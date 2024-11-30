import React from 'react';
import { useCart } from '../../CartContext';
import './CartPage.css'; // Archivo CSS para estilos específicos

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, incrementProduct, decrementProduct, getTotal } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.precio * (item.cantidad ?? 1)),
    0
  );

  return (
    <div className="cart-page-container">
      {/* Barra lateral izquierda */}
      <aside className="cart-sidebar">
        <h1>1/4</h1>
        <h2>¡Estamos casi listos!</h2>
        <p>Revisa que tu compra esté correcta</p>
      </aside>

      {/* Contenido principal */}
      <main className="cart-main">
        <h3>Productos en tu carrito</h3>
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                {/* Imagen */}
                {item.imagenProducto && (
                  <img
                    src={item.imagenProducto}
                    alt={item.nombreProducto}
                    className="cart-item-image"
                  />
                )}
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.nombreProducto}</p>
                  <div className="cart-item-controls">
                    <button
                      onClick={() => decrementProduct(item)}
                      disabled={(item.cantidad ?? 1) <= 1}
                      className="control-button"
                    >
                      -
                    </button>
                    <span>{item.cantidad ?? 1}</span>
                    <button
                      onClick={() => incrementProduct(item)}
                      className="control-button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="cart-item-price">${(item.precio * (item.cantidad ?? 1)).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Resumen de compra */}
      <aside className="cart-summary">
        <h3>Resumen de compra</h3>
        <div className="summary-item">
          <span>Productos:</span>
          <span>${totalAmount.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span>Envío:</span>
          <span>Gratis</span>
        </div>
        <div className="summary-item total">
          <span>Subtotal:</span>
          <span>${totalAmount.toLocaleString()}</span>
        </div>
        <button className="confirm-button">Confirmar compra</button>
      </aside>
    </div>
  );
};

export default CartPage;
