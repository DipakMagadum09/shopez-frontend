import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import NewProduct from './pages/admin/NewProduct';

// Components
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<><Navbar /><LandingPage /></>} />
            <Route path="/products" element={<><Navbar /><ProductsPage /></>} />
            <Route path="/products/:id" element={<><Navbar /><ProductDetailPage /></>} />
            <Route path="/login" element={<><Navbar /><LoginPage /></>} />
            <Route path="/register" element={<><Navbar /><RegisterPage /></>} />
            <Route path="/cart" element={<ProtectedRoute><Navbar /><CartPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Navbar /><ProfilePage /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Navbar /><CheckoutPage /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminNavbar /><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminNavbar /><AdminProducts /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminNavbar /><AdminOrders /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminNavbar /><AdminUsers /></AdminRoute>} />
            <Route path="/admin/new-product" element={<AdminRoute><AdminNavbar /><NewProduct /></AdminRoute>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
