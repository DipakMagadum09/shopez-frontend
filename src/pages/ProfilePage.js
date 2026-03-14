import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my-orders', {
          headers: { Authorization: 'Bearer ' + token }
        });
        const data = res.data;
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error(err);
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token]);

  const handleCancel = async (orderId) => {
    try {
      await api.delete('/orders/' + orderId, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setOrders(orders.filter(o => o._id !== orderId));
      toast.success('Order cancelled');
    } catch (err) {
      toast.error('Failed to cancel order');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <h3>Username: {user?.username}</h3>
        <p>Email: {user?.email}</p>
        <p>Orders: {orders.length}</p>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="profile-orders">
        <h2>Orders</h2>
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <h3>No orders yet</h3>
            <p>Start shopping!</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card">
              {order.productId && (
                <img
                  src={order.productId.thumbnailImg}
                  alt={order.productId.name}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/90'; }}
                />
              )}
              <div className="order-info">
                <h3>{order.productId ? order.productId.name : 'Product'}</h3>
                <p>Size: {order.size} &nbsp; Quantity: {order.quantity} &nbsp; Price: Rs.{order.price}</p>
                <p>Address: {order.address} &nbsp; Pincode: {order.pincode}</p>
                <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="order-status">Order status: {order.orderStatus}</p>
                {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                  <button className="btn-cancel" onClick={() => handleCancel(order._id)}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
