import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const CheckoutPage = () => {
  const { user, token } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    address: '',
    pincode: '',
    mobile: '',
    paymentMethod: 'netbanking'
  });

  const totalPrice = cart.reduce((sum, item) => {
    if (!item.productId) return sum;
    return sum + (item.productId.price * item.quantity);
  }, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const item of cart) {
        if (!item.productId) continue;
        await api.post('/orders', {
          productId: item.productId._id,
          quantity: item.quantity,
          size: item.size,
          price: item.productId.price * item.quantity,
          paymentMethod: form.paymentMethod,
          address: form.address,
          pincode: form.pincode,
          userMobile: form.mobile
        }, {
          headers: { Authorization: 'Bearer ' + token }
        });
      }
      await clearCart();
      toast.success('Orders placed successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error('Failed to place order');
    }
    setLoading(false);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div style={{ background: 'white', borderRadius: '8px', padding: '15px 20px', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Order Summary ({cart.length} items)</h3>
        {cart.map(item => item.productId && (
          <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
            <span>{item.productId.name} x{item.quantity}</span>
            <span>Rs.{(item.productId.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ borderTop: '2px solid #eee', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
          <span>Total:</span>
          <span>Rs.{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="checkout-form">
        <h3 style={{ marginBottom: '20px' }}>Delivery Details</h3>
        <form onSubmit={handlePlaceOrder}>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Delivery address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Mobile number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            >
              <option value="netbanking">Net Banking</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order - Rs.' + totalPrice.toLocaleString()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
