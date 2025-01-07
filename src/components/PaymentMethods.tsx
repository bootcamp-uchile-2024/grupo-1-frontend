import React from 'react';
import './PaymentMethods.css'; // Archivo CSS para los estilos

interface PaymentMethodsProps {
  onSelect: (method: string) => void;
  selectedMethod: string | null;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onSelect, selectedMethod }) => {
  return (
    <div className="payment-options">
      <div
        className={`payment-card ${selectedMethod === 'mercadopago' ? 'selected' : ''}`}
        onClick={() => onSelect('mercadopago')}
      >
        <input
          type="radio"
          name="payment-method"
          checked={selectedMethod === 'mercadopago'}
          readOnly
        />
        <label>Mercado Pago</label>
        <div className="payment-description">
          Después de hacer click en "Pagar ahora" serás redirigido a Mercado Pago para completar tu compra de forma segura.
        </div>
      </div>

      <div
        className={`payment-card ${selectedMethod === 'banco' ? 'selected' : ''}`}
        onClick={() => onSelect('banco')}
      >
        <input
          type="radio"
          name="payment-method"
          checked={selectedMethod === 'banco'}
          readOnly
        />
        <label>Paga con tu banco</label>
      </div>

      <div
        className={`payment-card ${selectedMethod === 'tarjeta' ? 'selected' : ''}`}
        onClick={() => onSelect('tarjeta')}
      >
        <input
          type="radio"
          name="payment-method"
          checked={selectedMethod === 'tarjeta'}
          readOnly
        />
        <label>Paga con tarjeta de crédito</label>
      </div>
    </div>
  );
};

export default PaymentMethods;