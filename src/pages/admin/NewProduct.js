import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const NewProduct = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    thumbnailImg: '',
    images: ['', '', ''],
    category: '',
    gender: 'unisex',
    availableSizes: [],
    stock: 10
  });

  const handleSizeToggle = (size) => {
    setForm(f => ({
      ...f,
      availableSizes: f.availableSizes.includes(size)
        ? f.availableSizes.filter(s => s !== size)
        : [...f.availableSizes, size]
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = {
        ...form,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        stock: Number(form.stock),
        images: form.images.filter(img => img.trim() !== '')
      };
      await axios.post('/api/products', productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product added successfully!');
      setForm({
        name: '', description: '', price: '', originalPrice: '',
        thumbnailImg: '', images: ['', '', ''], category: '',
        gender: 'unisex', availableSizes: [], stock: 10
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    }
    setLoading(false);
  };

  return (
    <div className="admin-page">
      <div className="new-product-form">
        <h2>New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Thumbnail Img url"
              value={form.thumbnailImg}
              onChange={(e) => setForm({ ...form, thumbnailImg: e.target.value })}
              required
            />
          </div>

          <div className="form-row-3">
            {form.images.map((img, i) => (
              <div className="form-group" key={i}>
                <input
                  type="text"
                  placeholder={`Add on img${i + 1} url`}
                  value={img}
                  onChange={(e) => handleImageChange(i, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="form-group">
            <label style={{ color: '#ccc', fontWeight: 600 }}>Available Size</label>
            <div className="size-checkboxes" style={{ marginTop: '8px' }}>
              {['S', 'M', 'L', 'XL'].map(size => (
                <label key={size} className="size-checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.availableSizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label style={{ color: '#ccc', fontWeight: 600 }}>Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              style={{ marginTop: '8px' }}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="number"
                placeholder="Price (discounted)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Original Price (MRP)"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="mobiles">Mobiles</option>
                <option value="electronics">Electronics</option>
                <option value="sports-equipment">Sports Equipment</option>
                <option value="fashion">Fashion</option>
                <option value="groceries">Groceries</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-add-product" disabled={loading}>
            {loading ? 'Adding...' : 'Add product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
