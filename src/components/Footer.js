import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#172337',
      color: '#fff',
      marginTop: '40px'
    }}>
      {/* Top Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        padding: '40px 60px',
        borderBottom: '1px solid #2d3f55'
      }}>
        {/* About */}
        <div>
          <h4 style={{ fontSize: '13px', color: '#878787', marginBottom: '15px', fontWeight: 500, letterSpacing: '1px' }}>
            ABOUT
          </h4>
          {['Contact Us', 'About Us', 'Careers', 'Press', 'Corporate Information'].map(function(item) {
            return (
              <p key={item} style={{ fontSize: '13px', marginBottom: '10px', cursor: 'pointer', color: '#fff' }}
                onMouseEnter={function(e) { e.target.style.textDecoration = 'underline'; }}
                onMouseLeave={function(e) { e.target.style.textDecoration = 'none'; }}
              >
                {item}
              </p>
            );
          })}
        </div>

        {/* Help */}
        <div>
          <h4 style={{ fontSize: '13px', color: '#878787', marginBottom: '15px', fontWeight: 500, letterSpacing: '1px' }}>
            HELP
          </h4>
          {['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ', 'Report Infringement'].map(function(item) {
            return (
              <p key={item} style={{ fontSize: '13px', marginBottom: '10px', cursor: 'pointer', color: '#fff' }}
                onMouseEnter={function(e) { e.target.style.textDecoration = 'underline'; }}
                onMouseLeave={function(e) { e.target.style.textDecoration = 'none'; }}
              >
                {item}
              </p>
            );
          })}
        </div>

        {/* Policy */}
        <div>
          <h4 style={{ fontSize: '13px', color: '#878787', marginBottom: '15px', fontWeight: 500, letterSpacing: '1px' }}>
            POLICY
          </h4>
          {['Return Policy', 'Terms Of Use', 'Security', 'Privacy', 'Sitemap'].map(function(item) {
            return (
              <p key={item} style={{ fontSize: '13px', marginBottom: '10px', cursor: 'pointer', color: '#fff' }}
                onMouseEnter={function(e) { e.target.style.textDecoration = 'underline'; }}
                onMouseLeave={function(e) { e.target.style.textDecoration = 'none'; }}
              >
                {item}
              </p>
            );
          })}
        </div>

        {/* Social */}
        <div>
          <h4 style={{ fontSize: '13px', color: '#878787', marginBottom: '15px', fontWeight: 500, letterSpacing: '1px' }}>
            SOCIAL
          </h4>
          {[
            { name: 'Facebook', icon: 'f', color: '#1877f2' },
            { name: 'Twitter', icon: 't', color: '#1da1f2' },
            { name: 'Instagram', icon: 'in', color: '#e1306c' },
            { name: 'YouTube', icon: 'yt', color: '#ff0000' }
          ].map(function(social) {
            return (
              <div key={social.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                <div style={{
                  width: '28px', height: '28px',
                  background: social.color,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700, color: 'white'
                }}>
                  {social.icon}
                </div>
                <span style={{ fontSize: '13px', color: '#fff' }}>{social.name}</span>
              </div>
            );
          })}
        </div>

        {/* Mail Us */}
        <div>
          <h4 style={{ fontSize: '13px', color: '#878787', marginBottom: '15px', fontWeight: 500, letterSpacing: '1px' }}>
            MAIL US
          </h4>
          <p style={{ fontSize: '13px', color: '#fff', lineHeight: '1.8' }}>
            ShopEZ Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Pune, Maharashtra - 411001,<br />
            India
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#878787', textDecoration: 'none', fontSize: '12px' }}>Home</Link>
          <Link to="/products" style={{ color: '#878787', textDecoration: 'none', fontSize: '12px' }}>Products</Link>
          <Link to="/login" style={{ color: '#878787', textDecoration: 'none', fontSize: '12px' }}>Login</Link>
          <Link to="/register" style={{ color: '#878787', textDecoration: 'none', fontSize: '12px' }}>Register</Link>
        </div>
        <p style={{ fontSize: '12px', color: '#878787', margin: 0 }}>
          © 2024 ShopEZ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
