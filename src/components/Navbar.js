import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">ShopEZ</Link>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Electronics, Fashion, mobiles, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="navbar-actions">
        {user ? (
          <>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>
              👤 {user.username}
            </Link>
            <Link to="/cart" className="cart-icon">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </>
        ) : (
         <Link to="/login" style={{ color: 'white', textDecoration: 'none', background: 'transparent', border: '1px solid white', padding: '6px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: '600' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
