import React from 'react';
import './MenWatches.css';

const MenWatches = () => {
  const watchCategories = [
    {
        id: 1,
        name: 'Luxury Watches',
        watches: [
          {
            id: 'l1',
            brand: 'Rolex',
            description: 'Elegant automatic watch with classic styling and premium materials',
            name: 'Classic Automatic',
            originalPrice: '$299.99',
            discount: '40% off',
            image: 'watch-m1.avif',
            rating: 4,
          },
          {
            id: 'l2',
            brand: 'Rolex',
            description: 'Luxurious gold-plated timepiece with sophisticated design', 
            name: 'Premium Gold',
            originalPrice: '$499.99',
            discount: '20% off',
            image: 'watch-m2.avif',
            rating: 4,
          },
          {
            id: 's1', 
            brand: 'Rolex',
            description: 'Modern digital sports watch with advanced fitness tracking features',
            name: 'Digital Sport',
            originalPrice: '$299.99',
            discount: '40% off',
            image: 'watch-m3.avif',
            rating: 5,
          },
          {
            id: 's2',
            brand: 'Rolex', 
            description: 'Professional chronograph watch with precision timing capabilities',
            name: 'Chronograph',
            originalPrice: '$399.99',
            discount: '25% off',
            image: 'watch-m4.avif',
            rating: 5,
          },
          {
            id: 's3',
            brand: 'Rolex',
            description: 'Durable sports watch designed for active lifestyles',
            name: 'Sports Watch', 
            originalPrice: '$399.99',
            discount: '25% off',
            image: 'watch-m5.avif',
            rating: 4,
          },
          {
            id: 'l3',
            brand: 'Rolex',
            description: 'Exquisite diamond-encrusted timepiece for ultimate luxury',
            name: 'Diamond Encrusted',
            originalPrice: '$999.99',
            discount: '15% off',
            image: 'watch-m6.avif',
            rating: 5,
          },
          {
            id: 'l4',
            brand: 'Rolex',
            description: 'Platinum Edition watch with exceptional craftsmanship',
            name: 'Platinum Edition',
            originalPrice: '$799.99',
            discount: '30% off',
            image: 'watch-m7.avif',
            rating: 5,
          },
          {
            id: 's4',
            brand: 'Rolex',
            description: 'Advanced smartwatch with comprehensive health monitoring',
            name: 'Smart Watch Pro',
            originalPrice: '$449.99',
            discount: '35% off',
            image: 'watch-m8.avif',
            rating: 4,
          },
          {
            id: 'l5',
            brand: 'Rolex',
            description: 'Classic vintage-inspired timepiece with modern reliability',
            name: 'Vintage Collection',
            originalPrice: '$599.99',
            discount: '25% off',
            image: 'watch-m9.avif',
            rating: 5,
          },
          {
            id: 's5',
            brand: 'Rolex',
            description: 'Premium fitness tracking watch with extensive workout features',
            name: 'Fitness Tracker Elite',
            originalPrice: '$349.99',
            discount: '45% off',
            image: 'watch-m10.avif',
            rating: 4,
          }
        ]
    }
  ];
  const calculateDiscountedPrice = (originalPrice, discount) => {
    const price = parseFloat(originalPrice.replace('$', ''));
    const discountPercent = parseInt(discount) / 100;
    const discountedPrice = price * (1 - discountPercent);
    return `$${discountedPrice.toFixed(2)}`;
  };

  const handleAddToCart = (watch) => {
    // TODO: Implement actual cart functionality
    alert(`${watch.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    // Add half star if rating has decimal
    if (hasHalfStar) {
      stars.push(<span key="half" className="star-half">★</span>);
    }

    // Add empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star-empty">☆</span>);
    }

    return stars;
  };


  return (
    <div className="men-watches-container">
      <h1>Men's Watches</h1>
      {watchCategories.map(category => (
        <div key={category.id} className="watch-category">
          <h2>{category.name}</h2>
          <div className="watches-grid">
            {category.watches.map(watch => (
              <div key={watch.id} className="watch-card">
                <img src={watch.image} alt={watch.name} />
                <div className="watch-details">
                  <h2 className="brand">{watch.brand}</h2>
                  <h3>{watch.name}</h3>
                  <p className="description">{watch.description}</p>
                  <div className="price-container">
                    <p className="discounted-price">
                      {calculateDiscountedPrice(watch.originalPrice, watch.discount.replace('% off', ''))}
                    </p>
                    <p className="original-price">{watch.originalPrice}</p>
                    <p className="discount">{watch.discount}</p>
                  </div>
                  <div className="rating">
                    {renderStars(watch.rating)} ({watch.rating})
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(watch)}
                    aria-label={`Add ${watch.name} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenWatches;