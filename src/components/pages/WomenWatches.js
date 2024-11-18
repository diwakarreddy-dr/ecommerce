import React from 'react';
import { Link } from 'react-router-dom';
import './WomenWatches.css';
import productsData from '../../data/products.json';

const WomenWatches = ({ addToCart }) => {
  const womenWatches = productsData.watches.filter(
    watch => watch.category === 'women' || watch.category === 'unisex'
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

  const watchCategories = [
    {
      id: 1,
      watches: womenWatches
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star-half">★</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star-empty">☆</span>);
    }

    return stars;
  };

  return (
    <div className="women-watches-container">
      <h1>Women's Watches</h1>
      {watchCategories.map(category => (
        <div key={category.id} className="watch-category">
          <h2>{category.name}</h2>
          <div className="watches-grid">
            {womenWatches && womenWatches?.map(watch => (
              <div key={watch.id} className="watch-card">
                <Link to={`/product/${watch.id}`}>
                  <img src={watch.image} alt={watch.name} />
                </Link>
                <div className="watch-details">
                  <h2 className="brand">{watch.brand}</h2>
                  <h3>{watch.name}</h3>
                  <p className="description">{watch.description}</p>
                  <div className="price-container">
                    <p className="discounted-price">
                      ${watch.discountedPrice}
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

export default WomenWatches;