import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token, user } = useAuth();

  const fetchCart = async () => {
    if (!token || !user || user.userType === 'admin') return;
    try {
      const res = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = async (productId, quantity, size) => {
    try {
      await api.post('/cart/add', { productId, quantity, size }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
