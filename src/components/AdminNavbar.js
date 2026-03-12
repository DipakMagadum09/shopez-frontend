import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="admin-navbar">
      <Link to="/admin" className="admin-navbar-brand">ShopEZ (admin)</Link>
      <div className="admin-nav-links">
        <Link to="/admin">Home</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/new-product">New Product</Link>
        <span onClick={handleLogout} style={{ cursor: 'pointer', color: '#ccc' }}>Logout</span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
