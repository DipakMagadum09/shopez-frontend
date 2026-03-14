import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get('/users/stats', { headers: { Authorization: 'Bearer ' + token } }),
          api.get('/products'),
          api.get('/orders', { headers: { Authorization: 'Bearer ' + token } })
        ]);
        setStats({
          users: usersRes.data.totalUsers,
          products: productsRes.data.length,
          orders: ordersRes.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div className="admin-page">
      <div className="admin-dashboard-grid">
        <div className="admin-stat-card">
          <h3>Total users</h3>
          <div className="stat-value">{stats.users}</div>
          <Link to="/admin/users" className="btn-admin-action">View all</Link>
        </div>
        <div className="admin-stat-card">
          <h3>All Products</h3>
          <div className="stat-value">{stats.products}</div>
          <Link to="/admin/products" className="btn-admin-action">View all</Link>
        </div>
        <div className="admin-stat-card">
          <h3>All Orders</h3>
          <div className="stat-value">{stats.orders}</div>
          <Link to="/admin/orders" className="btn-admin-action">View all</Link>
        </div>
        <div className="admin-stat-card">
          <h3>Add Product</h3>
          <div className="stat-value" style={{ fontSize: '16px', color: '#aaa' }}>(new)</div>
          <Link to="/admin/new-product" className="btn-admin-action">Add now</Link>
        </div>
      </div>

      <div className="admin-banner-card">
        <h3>Update banner</h3>
        <input
          type="text"
          placeholder="Banner url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            background: '#2a2a3e',
            border: '1px solid #444',
            color: 'white',
            borderRadius: '4px',
            marginBottom: '10px',
            outline: 'none'
          }}
        />
        <button
          className="btn-admin-action"
          onClick={() => toast.success('Banner updated!')}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
