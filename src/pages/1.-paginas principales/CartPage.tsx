import React from 'react';
import { useCart } from '../../CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, incrementProduct, decrementProduct } = useCart();


  const totalAmount = cartItems.reduce((total, item) => total + (item.precio * (item.cantidad ?? 1)), 0);

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
                {item.imagenProducto && (
                  <img 
                    src={item.imagenProducto} 
                    alt={item.nombreProducto} 
                    style={{ width: '100px', height: '100px' }} 
                  />
                )}
                <p><strong>Precio:</strong> ${item.precio.toFixed(2)}</p>
                <p><strong>Cantidad:</strong> {item.cantidad}</p>
                <button onClick={() => incrementProduct(item)}>+</button>
                <button onClick={() => decrementProduct(item)} disabled={(item.cantidad ?? 1) <= 1}>-</button>
                <button onClick={() => removeFromCart(item)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount.toFixed(2)}</h3> {}
        </div>
      )}
    </div>
  );
};

export default CartPage;

