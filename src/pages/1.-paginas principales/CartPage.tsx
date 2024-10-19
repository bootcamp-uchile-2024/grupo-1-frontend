import React from 'react';
import { useCart } from '../../CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, incrementProduct, decrementProduct } = useCart();

  // Calcular el total
  const totalAmount = cartItems.reduce((total, item) => total + (parseFloat(item.precioNormal) * (item.cantidad || 1)), 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <h3>{item.nombreProducto}</h3>
                <p><strong>Precio:</strong> ${item.precioNormal}</p>
                <p><strong>Cantidad:</strong> {item.cantidad}</p>
                <button onClick={() => incrementProduct(item)}>+</button>
                <button onClick={() => decrementProduct(item)} disabled={item.cantidad <= 1}>-</button>
                <button onClick={() => removeFromCart(item)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
