import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const banners = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=400&fit=crop',
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(function() {
      setCurrentBanner(function(prev) {
        return (prev + 1) % banners.length;
      });
    }, 3000);
    return function() { clearInterval(timer); };
  }, []);

  return (
    <div>
      {/* Sliding Banner */}
      <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', background: '#111' }}>
        {banners.map(function(banner, index) {
          return (
            <img
              key={index}
              src={banner}
              alt={'banner' + index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: currentBanner === index ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out'
              }}
            />
          );
        })}

        {/* Left Arrow */}
        <button
          onClick={function() { setCurrentBanner(function(prev) { return (prev - 1 + banners.length) % banners.length; }); }}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >&#8249;</button>

        {/* Right Arrow */}
        <button
          onClick={function() { setCurrentBanner(function(prev) { return (prev + 1) % banners.length; }); }}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >&#8250;</button>

        {/* Dots */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          zIndex: 10
        }}>
          {banners.map(function(_, index) {
            return (
              <button
                key={index}
                onClick={function() { setCurrentBanner(index); }}
                style={{
                  width: currentBanner === index ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentBanner === index ? 'white' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            );
          })}
        </div>
      </div>

      {/* For You - Products */}
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
            onClick={function() { navigate('/products'); }}
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
