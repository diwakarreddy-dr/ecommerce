import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import productsData from '../../data/products.json';
import CheckoutPopup from '../CheckoutPopup/CheckoutPopup';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [facingMode, setFacingMode] = useState('environment');
  
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages(prev => [...prev, reader.result]);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: facingMode } 
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setShowCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please make sure you've granted camera permissions.");
    }
  };

  const switchCamera = async () => {
    stopCamera();
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
    startCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageUrl = canvas.toDataURL('image/jpeg');
    setUploadedImages(prev => [...prev, imageUrl]);
    setPreviewImage(imageUrl);
    stopCamera();
  };

  return (
    <div>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-details-container">
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

        <div className="image-upload-section">
          {showCamera ? (
            <div className="camera-container">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="camera-preview"
              />
              <div className="camera-controls">
                <button 
                  className="camera-button switch"
                  onClick={switchCamera}
                >
                  🔄
                </button>
                <button 
                  className="camera-button capture"
                  onClick={capturePhoto}
                >
                  📸
                </button>
                <button 
                  className="camera-button close"
                  onClick={stopCamera}
                >
                  ✖
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="upload-area"
              onClick={() => document.getElementById('file-input').click()}
            >
              {previewImage ? (
                <div className="preview-container">
                  <img src={previewImage} alt="Preview" className="preview-image" />
                </div>
              ) : (
                <>
                  <div className="camera-options">
                    <button 
                      className="camera-option-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        startCamera();
                      }}
                    >
                      <span className="camera-icon">📸</span>
                      Take Photo
                    </button>
                    <div className="option-divider">or</div>
                    <button className="upload-button">
                      Choose File
                    </button>
                  </div>
                </>
              )}
              <input 
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          )}

          {uploadedImages.length > 0 && (
            <div className="uploaded-images">
              <h3>Uploaded Images</h3>
              <div className="image-grid">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="uploaded-image-container">
                    <img 
                      src={img} 
                      alt={`Uploaded ${index + 1}`} 
                      onClick={() => setPreviewImage(img)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {showCheckout && (
          <CheckoutPopup
            onClose={() => setShowCheckout(false)}
            onSubmit={handleCheckoutSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails; 