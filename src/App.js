import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/pages/Home';
import MenWatches from './components/pages/MenWatches';
import WomenWatches from './components/pages/WomenWatches';
import ProductDetails from './components/pages/ProductDetails';

function App() {
  // Initialize cart items from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If item doesn't exist, add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Header 
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/men" 
            element={<MenWatches addToCart={addToCart} />} 
          />
          <Route 
            path="/women" 
            element={<WomenWatches addToCart={addToCart} />} 
          />
          <Route 
            path="/product/:id" 
            element={<ProductDetails addToCart={addToCart} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;