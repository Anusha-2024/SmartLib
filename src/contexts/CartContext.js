import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const storageKey = user ? `cart_${user.username}` : 'cart_anonymous';
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(storageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);

  const addToCart = (book) => {
    // Remove non-serializable properties like component before adding
    const bookData = { ...book };
    delete bookData.component;

    // Ensure price is a number
    const priceNum = typeof bookData.price === 'string' ? parseFloat(bookData.price) : bookData.price;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === bookData.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === bookData.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...bookData, price: priceNum, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
