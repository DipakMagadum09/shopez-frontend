import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ProductCard';
import api from '../../utils/api';

const AdminProducts = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [filters, setFilters] = useState({ category: '', gender: '' });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.gender) params.append('gender', filters.gender);
      const res = await api.get('/products?' + params.toString());
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [filters]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/products/' + editProduct._id, editProduct, {
        headers: { Authorization: 'Bearer ' + token }
      });
      toast.success('Product updated!');
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete('/products/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      });
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="products-page">
      <div className="filters-sidebar">
        <h3>Filters</h3>
        <div className="filter-group">
          <h4>Categories</h4>
          {['mobiles', 'electronics', 'sports-equipment', 'fashion', 'groceries'].map(cat => (
            <label key={cat} className="filter-option">
              <input
                type="checkbox"
                checked={filters.category === cat}
                onChange={() => setFilters(f => ({ ...f, category: f.category === cat ? '' : cat }))}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h4>Gender</h4>
          {['men', 'women', 'unisex'].map(g => (
            <label key={g} className="filter-option">
              <input
                type="checkbox"
                checked={filters.gender === g}
                onChange={() => setFilters(f => ({ ...f, gender: f.gender === g ? '' : g }))}
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="products-main">
        <h2>All Products</h2>

        {editProduct && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)', zIndex: 999, display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{
              background: '#1a1a2e', padding: '30px', borderRadius: '8px',
              width: '500px', maxHeight: '80vh', overflowY: 'auto'
            }}>
              <h3 style={{ color: 'white', marginBottom: '20px' }}>Update Product</h3>
              <form onSubmit={handleUpdate}>
                {['name', 'description', 'price', 'originalPrice', 'thumbnailImg'].map(field => (
                  <div className="form-group" key={field} style={{ marginBottom: '10px' }}>
                    <label style={{ color: '#ccc', fontSize: '13px' }}>{field}</label>
                    <input
                      type={field === 'price' || field === 'originalPrice' ? 'number' : 'text'}
                      value={editProduct[field] || ''}
                      onChange={(e) => setEditProduct({ ...editProduct, [field]: e.target.value })}
                      style={{
                        background: '#2a2a3e', border: '1px solid #444',
                        color: 'white', width: '100%', padding: '8px', borderRadius: '4px'
                      }}
                    />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button type="submit" className="btn-blue">Update</button>
                  <button
                    type="button"
                    className="btn-red"
                    onClick={() => handleDelete(editProduct._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditProduct(null)}
                    style={{
                      background: '#555', color: 'white', border: 'none',
                      padding: '7px 14px', borderRadius: '4px', cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                isAdmin={true}
                onUpdate={(p) => setEditProduct({ ...p })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
