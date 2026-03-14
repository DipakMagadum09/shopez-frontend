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
      navigate('/products?search=' + encodeURIComponent(searchQuery));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = [
    { name: 'Fashion', query: 'fashion', icon: '👕' },
    { name: 'Mobiles', query: 'mobiles', icon: '📱' },
    { name: 'Electronics', query: 'electronics', icon: '💻' },
    { name: 'Groceries', query: 'groceries', icon: '🛒' },
    { name: 'Sports', query: 'sports-equipment', icon: '⚽' },
  ];

  return (
    <div>
      {/* Main Navbar */}
      <nav style={{
        background: '#2874f0',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', minWidth: '100px' }}>
          <div style={{ color: 'white', fontWeight: 900, fontSize: '20px', fontStyle: 'italic' }}>
            ShopEZ
            <div style={{ fontSize: '10px', color: '#ffe500', fontStyle: 'italic', fontWeight: 400 }}>
              Explore Plus ✦
            </div>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px' }}>
          <div style={{ display: 'flex', background: 'white', borderRadius: '2px', overflow: 'hidden' }}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 15px',
                border: 'none',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button type="submit" style={{
              background: '#2874f0',
              border: 'none',
              padding: '0 20px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '18px'
            }}>🔍</button>
          </div>
        </form>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: 'auto' }}>
          {user ? (
            <>
              <div style={{ position: 'relative', cursor: 'pointer' }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
                  👤 {user.username}
                </span>
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  borderRadius: '4px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  width: '200px',
                  display: 'none',
                  zIndex: 999
                }} className="dropdown-menu">
                </div>
              </div>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                My Orders
              </Link>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600, position: 'relative' }}>
                🛒 Cart
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#ff6161',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>{cartCount}</span>
                )}
              </Link>
              <button onClick={handleLogout} style={{
                background: 'white',
                color: '#2874f0',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px'
              }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                background: 'white',
                color: '#2874f0',
                textDecoration: 'none',
                padding: '8px 30px',
                borderRadius: '2px',
                fontWeight: 700,
                fontSize: '14px'
              }}>Login</Link>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                🏠 Home
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Categories Bar */}
      <div style={{
        background: '#1a5dc8',
        padding: '0 20px',
        display: 'flex',
        gap: '5px',
        overflowX: 'auto'
      }}>
        {categories.map(function(cat) {
          return (
            <Link
              key={cat.name}
              to={'/products?category=' + cat.query}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={function(e) { e.target.style.borderBottomColor = 'white'; }}
              onMouseLeave={function(e) { e.target.style.borderBottomColor = 'transparent'; }}
            >
              {cat.icon} {cat.name}
            </Link>
          );
        })}
        <Link
          to="/products"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          🛍️ All Products
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
