import React from 'react';
import './PurchaseSuccessPage.css';

const PurchaseSuccessPage: React.FC = () => {
  return (
    <div className="success-page-container">
      {/* Encabezado */}
      <div className="success-header">
        <h1>3/3</h1>
        <h2>Compra exitosa</h2>
        <p>¡Listo!</p>
      </div>

      <div className="success-content">
        {/* Imagen y mensaje */}
        <div className="success-image">
          <img
            src="/home/compra.png" // Ruta correcta a la imagen en public
            alt="Compra exitosa"
          />
        </div>

        {/* Detalles de compra */}
        <aside className="purchase-details">
          <h3>Detalle de tu compra</h3>
          <p>01 de noviembre | #1342</p>
          <div className="details-item">
            <span>Productos</span>
            <span>$34.990</span>
          </div>
          <div className="details-item">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className="details-item">
            <span>Detalles del pago y envío</span>
            <span>▼</span>
          </div>
          <div className="details-total">
            <span>Total</span>
            <span>$34.990</span>
          </div>
          <p className="payment-method">Pago mediante Webpay</p>
        </aside>
      </div>

      
    </div>
  );
};

export default PurchaseSuccessPage;