import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.slice(0, 8));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Banner */}
      <div style={{ width: '100%', height: '280px', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=300&fit=crop"
          alt="Banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* For You - Random Products */}
      <div style={{ padding: '20px', background: '#f1f3f6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px', color: '#333' }}>
          For You
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {products.map(function(product) {
            return (
              <ProductCard key={product._id} product={product} />
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/products')}
            style={{
              background: '#2874f0',
              color: 'white',
              border: 'none',
              padding: '12px 40px',
              borderRadius: '2px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
