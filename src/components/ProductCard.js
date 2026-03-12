import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isAdmin, onUpdate }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card">
      <Link to={isAdmin ? '#' : `/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={product.thumbnailImg}
          alt={product.name}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
        />
        <div className="product-card-info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-price">
            <span className="price-current">₹ {product.price.toLocaleString()}</span>
            <span className="price-original">{product.originalPrice.toLocaleString()}</span>
            <span className="price-discount">({discount}% off)</span>
          </div>
        </div>
      </Link>
      {isAdmin && (
        <div style={{ padding: '0 12px 12px' }}>
          <button className="btn-update" onClick={() => onUpdate && onUpdate(product)}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
