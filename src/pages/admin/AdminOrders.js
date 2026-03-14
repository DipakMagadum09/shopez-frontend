import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders', {
          headers: { Authorization: 'Bearer ' + token }
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
      await api.put('/orders/' + orderId, { orderStatus: statusMap[orderId] }, {
        headers: { Authorization: 'Bearer ' + token }
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
      await api.delete('/orders/' + orderId, {
        headers: { Authorization: 'Bearer ' + token }
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
              <h3>{order.productId ? order.productId.name : 'Product'}</h3>
              <p>{order.productId ? order.productId.description.substring(0, 70) : ''}...</p>
              <p>
                Size: {order.size} &nbsp;
                Quantity: {order.quantity} &nbsp;
                Price: Rs.{order.price} &nbsp;
                Payment: {order.paymentMethod}
              </p>
              <p>
                Name: {order.userName} &nbsp;
                Email: {order.userEmail} &nbsp;
                Mobile: {order.userMobile}
              </p>
              <p>
                Ordered on: {new Date(order.createdAt).toLocaleDateString()} &nbsp;
                Address: {order.address} &nbsp;
                Pincode: {order.pincode}
              </p>
              <p>Order status: <span style={{ color: '#e8a838' }}>{order.orderStatus}</span></p>
              <div className="order-actions">
                <select
                  value={statusMap[order._id] || order.orderStatus}
                  onChange={(e) => setStatusMap({ ...statusMap, [order._id]: e.target.value })}
                >
                  <option value="order placed">Order Placed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="in-transit">In-Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
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
