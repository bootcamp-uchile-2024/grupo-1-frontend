import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
  id: number;
  nombreProducto: string;
  cantidad?: number;
  stock: number;
  precio: number;
  imagenProducto: string;
  categoria:string
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  incrementProduct: (product: Product) => void;
  decrementProduct: (product: Product) => void;
  getTotal: () => number; // Nueva función para calcular el total
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.nombreProducto === product.nombreProducto
      );

      if (existingProduct) {
        const newQuantity = (existingProduct.cantidad || 0) + 1;
        if (newQuantity <= product.stock) {
          return prevItems.map((item) =>
            item.nombreProducto === product.nombreProducto
              ? { ...item, cantidad: newQuantity }
              : item
          );
        } else {
          alert('No hay suficiente stock disponible para agregar más de este producto.');
          return prevItems;
        }
      }

      if (product.stock > 0) {
        return [...prevItems, { ...product, cantidad: 1 }];
      } else {
        alert('No hay suficiente stock disponible para agregar este producto.');
        return prevItems;
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.nombreProducto !== product.nombreProducto)
    );
  };

  const incrementProduct = (product: Product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.nombreProducto === product.nombreProducto) {
          const newQuantity = (item.cantidad || 0) + 1;
          if (newQuantity <= product.stock) {
            return { ...item, cantidad: newQuantity };
          } else {
            alert('No hay suficiente stock disponible para incrementar la cantidad.');
            return item;
          }
        }
        return item;
      })
    );
  };

  const decrementProduct = (product: Product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.nombreProducto === product.nombreProducto) {
          const newQuantity = (item.cantidad || 1) - 1;
          return newQuantity > 0
            ? { ...item, cantidad: newQuantity }
            : item; // Mantener al menos 1
        }
        return item;
      })
    );
  };

  // Nueva función para calcular el total
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.cantidad ? item.precio * item.cantidad : 0;
      return total + itemTotal;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementProduct,
        decrementProduct,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
