import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import productsData from '../../data/products.json';
import CheckoutPopup from '../CheckoutPopup/CheckoutPopup';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  
  const product = productsData.watches.find(watch => watch.id === id);

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const getImagePath = (imagePath) => {
    const cleanPath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;
    return `${process.env.PUBLIC_URL}/${cleanPath}`;
  };

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

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: getImagePath(product.image),
      price: product.price,
      discountedPrice: product.discountedPrice,
      quantity: 1
    };
    addToCart(cartItem);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setShowCheckout(true);
  };

  const handleCheckoutSubmit = (formData) => {
    console.log('Checkout data:', formData);
    setShowCheckout(false);
  };

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-details">
        <div className="product-image">
          <img src={getImagePath(product.image)} alt={product.name} />
        </div>
        <div className="product-info">
          <h1 className="brand">{product.brand}</h1>
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          
          <div className="price-section">
            <div className="price-container">
              <p className="discounted-price">${product.discountedPrice}</p>
              <p className="original-price">${product.price}</p>
              <p className="discount">{product.discount}% off</p>
            </div>
            <div className="rating">
              {renderStars(product.rating)} ({product.rating})
              <span className="reviews">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="specifications">
            <h3>Specifications</h3>
            <ul>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="specifications">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="colors">
            <h3>Available Colors</h3>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <span key={index} className="color-option">{color}</span>
              ))}
            </div>
          </div>

          <div className="button-container">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              className="buy-now-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      {showCheckout && (
        <CheckoutPopup
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckoutSubmit}
        />
      )}
    </div>
  );
};

export default ProductDetails; 