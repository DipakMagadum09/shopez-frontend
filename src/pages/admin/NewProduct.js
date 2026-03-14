import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

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
    setForm(function(f) {
      return {
        ...f,
        availableSizes: f.availableSizes.includes(size)
          ? f.availableSizes.filter(function(s) { return s !== size; })
          : [...f.availableSizes, size]
      };
    });
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
        name: form.name,
        description: form.description,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        thumbnailImg: form.thumbnailImg,
        images: form.images.filter(function(img) { return img.trim() !== ''; }),
        category: form.category,
        gender: form.gender,
        availableSizes: form.availableSizes,
        stock: Number(form.stock)
      };
      await api.post('/products', productData, {
        headers: { Authorization: 'Bearer ' + token }
      });
      toast.success('Product added successfully!');
      setForm({
        name: '', description: '', price: '', originalPrice: '',
        thumbnailImg: '', images: ['', '', ''], category: '',
        gender: 'unisex', availableSizes: [], stock: 10
      });
    } catch (err) {
      toast.error(err.response && err.response.data ? err.response.data.message : 'Failed to add product');
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
                onChange={function(e) { setForm({ ...form, name: e.target.value }); }}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product Description"
                value={form.description}
                onChange={function(e) { setForm({ ...form, description: e.target.value }); }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Thumbnail Img url"
              value={form.thumbnailImg}
              onChange={function(e) { setForm({ ...form, thumbnailImg: e.target.value }); }}
              required
            />
          </div>

          <div className="form-row-3">
            {form.images.map(function(img, i) {
              return (
                <div className="form-group" key={i}>
                  <input
                    type="text"
                    placeholder={'Add on img' + (i + 1) + ' url'}
                    value={img}
                    onChange={function(e) { handleImageChange(i, e.target.value); }}
                  />
                </div>
              );
            })}
          </div>

          <div className="form-group">
            <label style={{ color: '#ccc', fontWeight: 600 }}>Available Size</label>
            <div className="size-checkboxes" style={{ marginTop: '8px' }}>
              {['S', 'M', 'L', 'XL'].map(function(size) {
                return (
                  <label key={size} className="size-checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.availableSizes.includes(size)}
                      onChange={function() { handleSizeToggle(size); }}
                    />
                    {size}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label style={{ color: '#ccc', fontWeight: 600 }}>Gender</label>
            <select
              value={form.gender}
              onChange={function(e) { setForm({ ...form, gender: e.target.value }); }}
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
                onChange={function(e) { setForm({ ...form, price: e.target.value }); }}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Original Price (MRP)"
                value={form.originalPrice}
                onChange={function(e) { setForm({ ...form, originalPrice: e.target.value }); }}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select
                value={form.category}
                onChange={function(e) { setForm({ ...form, category: e.target.value }); }}
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
                onChange={function(e) { setForm({ ...form, stock: e.target.value }); }}
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
