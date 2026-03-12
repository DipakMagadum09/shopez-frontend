import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    sortBy: 'popular',
    category: searchParams.get('category') || '',
    gender: '',
    search: searchParams.get('search') || ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.gender) params.append('gender', filters.gender);
      if (filters.search) params.append('search', filters.search);
      if (filters.sortBy && filters.sortBy !== 'popular') params.append('sortBy', filters.sortBy);

      const res = await axios.get(`/api/products?${params.toString()}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    setFilters(f => ({ ...f, category: searchParams.get('category') || '', search: searchParams.get('search') || '' }));
  }, [searchParams]);

  const handleSortChange = (val) => setFilters(f => ({ ...f, sortBy: val }));
  const handleCategoryChange = (val) => setFilters(f => ({ ...f, category: f.category === val ? '' : val }));
  const handleGenderChange = (val) => setFilters(f => ({ ...f, gender: f.gender === val ? '' : val }));

  return (
    <div className="products-page">
      {/* Filters Sidebar */}
      <div className="filters-sidebar">
        <h3>Filters</h3>

        <div className="filter-group">
          <h4>Sort By</h4>
          {[
            { label: 'Popularity', value: 'popular' },
            { label: 'Price (low to high)', value: 'price_low' },
            { label: 'Price (high to low)', value: 'price_high' },
            { label: 'Discount', value: 'discount' }
          ].map(opt => (
            <label key={opt.value} className="filter-option">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === opt.value}
                onChange={() => handleSortChange(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Categories</h4>
          {['mobiles', 'electronics', 'sports-equipment', 'fashion', 'groceries'].map(cat => (
            <label key={cat} className="filter-option">
              <input
                type="checkbox"
                checked={filters.category === cat}
                onChange={() => handleCategoryChange(cat)}
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
                onChange={() => handleGenderChange(g)}
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-main">
        <h2>All Products</h2>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
