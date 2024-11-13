import React from 'react';
import './MenWatches.css';
import productsData from '../../data/products.json';

const MenWatches = ({ addToCart }) => {
  const menWatches = productsData.watches.filter(
    watch => watch.category === 'men' || watch.category === 'unisex'
  );

  const handleAddToCart = (watch) => {
    addToCart({
      id: watch.id,
      name: watch.name,
      brand: watch.brand,
      image: watch.image,
      price: watch.price,
      discountedPrice: watch.discountedPrice,
      quantity: 1
    });
  };

  // Group watches by their type (luxury, sport, etc)
  const watchCategories = [
    {
      id: 1,
      watches: menWatches
    }
  ];
console.log(menWatches, watchCategories);

  const calculateDiscountedPrice = (originalPrice, discount) => {
    const price = parseFloat(originalPrice?.replace('$', ''));
    const discountPercent = parseInt(discount) / 100;
    const discountedPrice = price * (1 - discountPercent);
    return `$${discountedPrice.toFixed(2)}`;
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
            {menWatches && menWatches?.map(watch => (
              <div key={watch.id} className="watch-card">
                <img src={watch.image} alt={watch.name} />
                <div className="watch-details">
                  <h2 className="brand">{watch.brand}</h2>
                  <h3>{watch.name}</h3>
                  <p className="description">{watch.description}</p>
                  <div className="price-container">
                    <p className="discounted-price">
                      ${watch.discountedPrice}
                      {/* {calculateDiscountedPrice(watch?.price, watch.discountPercentage)} */}
                    </p>
                    <p className="original-price">${watch.price}</p>
                    <p className="discount">{`${watch.discount}% off`}</p>
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