import React from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <section className="promo-banner">
      <div className="banner-content">
        <h2>Smart Products</h2>
        <h1>Winter Offer<br />2024 Collection</h1>
        <button className="shop-now-btn">SHOP NOW</button>
      </div>
      <div className="banner-image">
        <img src="./Watch_image.jpg" alt="Watch_image" />
      </div>
    </section>
  );
};

export default PromoBanner; 