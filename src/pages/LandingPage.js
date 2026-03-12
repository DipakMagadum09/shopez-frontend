import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  { name: 'Fashion', query: 'fashion', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop' },
  { name: 'Electronics', query: 'electronics', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop' },
  { name: 'Mobiles', query: 'mobiles', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop' },
  { name: 'Groceries', query: 'groceries', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop' },
  { name: 'Sports Equipments', query: 'sports-equipment', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop' },
];

const LandingPage = () => {
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=300&fit=crop');
  const navigate = useNavigate();

  return (
    <div>
      {/* Banner */}
      <div style={{ width: '100%', height: '280px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={banner}
          alt="Super Sale Banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setBanner(null)}
        />
        {!banner && (
          <div className="banner-placeholder">🛍️ SUPER SALE</div>
        )}
      </div>

      {/* Categories */}
      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.query}`}
              className="category-card"
            >
              <img src={cat.img} alt={cat.name} onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="category-card-label">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* View All Products */}
      <div style={{ textAlign: 'center', padding: '30px' }}>
        <button
          className="btn-primary"
          style={{ maxWidth: '250px', margin: '0 auto' }}
          onClick={() => navigate('/products')}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
