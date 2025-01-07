import React, { useState } from 'react';
import { useCart } from '../../CartContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import PaymentMethods from '../../components/PaymentMethods'; // Importa el componente
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cartItems, incrementProduct, decrementProduct, removeFromCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.precio * (item.cantidad ?? 1)),
    0
  );

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handlePayment = () => {
    if (selectedMethod) {
      navigate('/compra-exitosa'); // Redirige a la página de éxito
    } else {
      alert('Por favor, selecciona un método de pago.');
    }
  };

  return (
    <div className="cart-page-container">
      {/* Encabezado */}
      <div className="payment-header">
        <h1>2/3</h1>
        <h2>Elige cómo pagar</h2>
        <p>Confirma tu método de pago</p>
      </div>

      {/* Contenido principal */}
      <div className="cart-page-content">
        {/* Formulario de pago */}
        <div className="payment-form">
          <h3>Contacto</h3>
          <input type="email" placeholder="Ingresa tu correo electrónico" />
          <label>
            <input type="checkbox" /> Enviarme novedades y promociones al correo electrónico
          </label>

          <h3>Entrega</h3>
          <div className="delivery-grid">
            <select>
              <option>País/Región</option>
            </select>
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellidos" />
            <input type="text" placeholder="Dirección" />
            <input type="text" placeholder="+569" />
            <input type="text" placeholder="Comuna" />
            <input type="text" placeholder="Región" />
          </div>

          <h3>Método de pago</h3>
          {/* Tarjetas de métodos de pago */}
          <PaymentMethods
            onSelect={handleSelectMethod}
            selectedMethod={selectedMethod}
          />

          <h3>Dirección de facturación</h3>
          <div className="payment-methods">
            <label className="method-option">
              <input type="radio" name="billing" /> La misma dirección de envío
            </label>
            <label className="method-option">
              <input type="radio" name="billing" /> Usar una dirección de facturación distinta
            </label>
          </div>

          <button className="confirm-payment-button" onClick={handlePayment}>
            Pagar ahora
          </button>
        </div>

        {/* Resumen del carrito */}
        <div className="cart-summary">
          <h3>Carrito de Compra</h3>
          {cartItems.map((item, index) => (
            <div className="cart-item-summary" key={index}>
              <img src={item.imagenProducto} alt={item.nombreProducto} className="cart-item-image" />
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
                <p className="cart-item-price">${(item.precio * (item.cantidad ?? 1)).toLocaleString()}</p>
                <div className="cart-item-actions">
                  <button onClick={() => removeFromCart(item)} className="action-button">Eliminar</button>
                  <button className="action-button">Ver producto</button>
                </div>
              </div>
            </div>
          ))}

          {/* Totales */}
          <div className="cart-summary-totals">
            <div className="summary-item">
              <span>Productos ({cartItems.length}):</span>
              <span>${totalAmount.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>${totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <a href="#!" className="apply-coupon">Ingresar código de cupón</a>
        </div>
      </div>
    </div>
  );
};

export default CartPage;