import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedDestinations />
      <Footer />
    </div>
  );
}

export default App;