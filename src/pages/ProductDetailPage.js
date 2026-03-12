import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImg, setMainImg] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        setMainImg(res.data.thumbnailImg);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.warning('Please login first!');
      navigate('/login');
      return;
    }
    if (product.availableSizes && product.availableSizes.length > 0 && !selectedSize) {
      toast.warning('Please select a size!');
      return;
    }
    await addToCart(product._id, 1, selectedSize);
    toast.success('Added to cart!');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="loading">Product not found</div>;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const allImages = [product.thumbnailImg, ...product.images].filter(Boolean);

  return (
    <div className="product-detail">
      {/* Images */}
      <div className="product-detail-images">
        <img
          src={mainImg}
          alt={product.name}
          className="product-detail-main-img"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
        />
        {allImages.length > 1 && (
          <div className="product-detail-thumbs">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setMainImg(img)}
                style={{ border: mainImg === img ? '2px solid #3f51b5' : '2px solid #ddd' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <div className="product-price" style={{ marginBottom: '20px' }}>
          <span className="price-current" style={{ fontSize: '24px' }}>₹ {product.price.toLocaleString()}</span>
          <span className="price-original" style={{ fontSize: '16px' }}>{product.originalPrice.toLocaleString()}</span>
          <span className="price-discount" style={{ fontSize: '14px' }}>({discount}% off)</span>
        </div>

        {product.availableSizes && product.availableSizes.length > 0 && (
          <div className="size-selector">
            <h4>Select Size</h4>
            <div className="size-options">
              {product.availableSizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '15px', fontSize: '14px', color: '#555' }}>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Gender:</strong> {product.gender}</p>
        </div>

        <button className="btn-add-cart" onClick={handleAddToCart}>
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
