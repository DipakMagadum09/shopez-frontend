import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
        const map = {};
        res.data.forEach(o => { map[o._id] = o.orderStatus; });
        setStatusMap(map);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token]);

  const handleUpdate = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { orderStatus: statusMap[orderId] }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Order status updated!');
      setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: statusMap[orderId] } : o));
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return;
    try {
      await axios.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders.filter(o => o._id !== orderId));
      toast.success('Order cancelled');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <div className="admin-page">
      <h2 style={{ color: 'white', marginBottom: '20px' }}>Orders</h2>
      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state" style={{ color: '#aaa' }}>No orders yet</div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="admin-order-card">
            {order.productId && (
              <img
                src={order.productId.thumbnailImg}
                alt={order.productId.name}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
              />
            )}
            <div className="admin-order-info">
              <h3>{order.productId?.name || 'Product'}</h3>
              <p>{order.productId?.description?.substring(0, 70)}...</p>
              <p>
                <strong>Size:</strong> {order.size} &nbsp;
                <strong>Quantity:</strong> {order.quantity} &nbsp;
                <strong>Price: ₹{order.price}</strong> &nbsp;
                <strong>Payment method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>UserId:</strong> {order.userId?._id || order.userId} &nbsp;
                <strong>Name:</strong> {order.userName} &nbsp;
                <strong>Email:</strong> {order.userEmail} &nbsp;
                <strong>Mobile:</strong> {order.userMobile}
              </p>
              <p>
                <strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()} &nbsp;
                <strong>Address:</strong> {order.address} &nbsp;
                <strong>Pincode:</strong> {order.pincode}
              </p>
              <p><strong>Order status:</strong> <span style={{ color: '#e8a838' }}>{order.orderStatus}</span></p>
              <div className="order-actions">
                <select
                  value={statusMap[order._id] || order.orderStatus}
                  onChange={(e) => setStatusMap({ ...statusMap, [order._id]: e.target.value })}
                >
                  {['order placed', 'processing', 'shipped', 'in-transit', 'delivered', 'cancelled'].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <button className="btn-blue" onClick={() => handleUpdate(order._id)}>Update</button>
                <button className="btn-red" onClick={() => handleCancel(order._id)}>Cancel</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
