import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalMRP = cart.reduce((sum, item) => {
    if (!item.productId) return sum;
    return sum + (item.productId.originalPrice * item.quantity);
  }, 0);

  const totalPrice = cart.reduce((sum, item) => {
    if (!item.productId) return sum;
    return sum + (item.productId.price * item.quantity);
  }, 0);

  const discount = totalMRP - totalPrice;

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    toast.info('Removed from cart');
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state" style={{ marginTop: '60px' }}>
        <h3>Your cart is empty</h3>
        <p>Add items to continue shopping</p>
        <Link to="/products">
          <button className="btn-primary" style={{ marginTop: '20px', maxWidth: '200px' }}>
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cart.map((item) => {
          if (!item.productId) return null;
          return (
            <div key={item._id} className="cart-item">
              <img
                src={item.productId.thumbnailImg}
                alt={item.productId.name}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
              />
              <div className="cart-item-info">
                <h3>{item.productId.name}</h3>
                <p>{item.productId.description?.substring(0, 80)}...</p>
                <p><strong>Size:</strong> {item.size || 'N/A'} &nbsp;
                <strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price: ₹{item.productId.price.toLocaleString()}</strong></p>
                <button className="remove-btn" onClick={() => handleRemove(item.productId._id)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h3>PRICE DETAILS</h3>
        <div className="summary-row">
          <span>Total MRP:</span>
          <span>₹{totalMRP.toLocaleString()}</span>
        </div>
        <div className="summary-row discount">
          <span>Discount on MRP:</span>
          <span>- ₹{discount.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Charges:</span>
          <span style={{ color: '#27ae60' }}>+ ₹0</span>
        </div>
        <div className="summary-final">
          <span>Final Price:</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
        <button className="btn-checkout" onClick={() => navigate('/checkout')}>
          Place order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
