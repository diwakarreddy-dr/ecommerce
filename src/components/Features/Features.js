import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: 'Free-shipping.png',
      title: 'Free Shipping',
      description: 'Free shipping on all order'
    },
    {
      icon: 'Support.png',
      title: 'Support 24/7',
      description: 'Free shipping on all order'
    },
    {
      icon: 'Money-return.png',
      title: 'Money Return',
      description: 'Free shipping on all order'
    },
    {
      icon: 'Order-discount.png',
      title: 'Order Discount',
      description: 'Free shipping on all order'
    }
  ];

  return (
    <section className="features">
      {features.map((feature, index) => (
        <div key={index} className="feature-item">
          <div className="feature-icon">
            <img src={feature.icon} alt={feature.title} />
          </div>
          <div className="feature-content">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features; 