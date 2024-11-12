import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import PromoBanner from './components/PromoBanner/PromoBanner';
import Features from './components/Features/Features';
import MenWatches from './components/pages/MenWatches';
import WomenWatches from './components/pages/WomenWatches';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <PromoBanner />
              <Features />
            </>
          } />
          <Route path="/men" element={<MenWatches />} />
          <Route path="/women" element={<WomenWatches />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;