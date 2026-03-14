import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isAdmin, onUpdate }) => {
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const rating = product.rating || (3.5 + Math.random() * 1.5).toFixed(1);
  const reviews = product.numReviews || Math.floor(Math.random() * 5000) + 100;

  const stars = function(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return (
      <span style={{ fontSize: '12px' }}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
        {'☆'.repeat(empty)}
      </span>
    );
  };

  return (
    <div
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      style={{
        background: 'white',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        border: '0.5px solid #e0e0e0'
      }}
    >
      <Link to={isAdmin ? '#' : '/products/' + product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
          <img
            src={product.thumbnailImg}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onError={function(e) { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
          />
          {discount > 0 && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#388e3c',
              color: 'white',
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '2px'
            }}>
              {discount}% off
            </div>
          )}
        </div>

        <div style={{ padding: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px', color: '#212121', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '12px', color: '#878787', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.description}
          </p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{
              background: '#388e3c',
              color: 'white',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              {Number(rating).toFixed(1)} ★
            </span>
            <span style={{ fontSize: '11px', color: '#878787' }}>({reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#212121' }}>
              Rs.{product.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '12px', color: '#878787', textDecoration: 'line-through' }}>
              {product.originalPrice.toLocaleString()}
            </span>
            <span style={{ fontSize: '12px', color: '#388e3c', fontWeight: 600 }}>
              {discount}% off
            </span>
          </div>

          {/* Free delivery */}
          <p style={{ fontSize: '11px', color: '#388e3c', marginTop: '6px', fontWeight: 500 }}>
            Free Delivery
          </p>
        </div>
      </Link>

      {isAdmin && (
        <div style={{ padding: '0 12px 12px' }}>
          <button
            className="btn-update"
            onClick={function() { onUpdate && onUpdate(product); }}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
