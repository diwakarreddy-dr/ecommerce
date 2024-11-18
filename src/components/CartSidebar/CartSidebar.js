import React, { useState } from 'react';
import './CartSidebar.css';
import CheckoutPopup from '../CheckoutPopup/CheckoutPopup';

const CartSidebar = ({ onClose, cartItems = [], updateQuantity, removeFromCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0).toFixed(2);
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    updateQuantity(item.id, newQuantity);
  };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  const handleCheckoutSubmit = (formData) => {
    console.log('Checkout data:', formData);
    setShowCheckout(false);
    onClose();
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <button className="close-cart" onClick={onClose}>×</button>
        <div className="cart-content">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <div className="item-header">
                        <h3>{item.name}</h3>
                        <button 
                          className="delete-button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ×
                        </button>
                      </div>
                      <p className="brand">{item.brand}</p>
                      <div className="price-quantity">
                        <p className="price">${item.discountedPrice}</p>
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckoutClick}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
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

export default CartSidebar; 