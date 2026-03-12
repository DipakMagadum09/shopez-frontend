import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token, user } = useAuth();

  const fetchCart = async () => {
    if (!token || !user || user.userType === 'admin') return;
    try {
      const res = await axios.get('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
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
      const res = await axios.post('/api/cart/add', { productId, quantity, size }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart/clear', { headers: { Authorization: `Bearer ${token}` } });
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
