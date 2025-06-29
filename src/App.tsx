import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Check for admin access via URL parameter
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdmin(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {showAdmin ? (
        <div className="py-16">
          <AdminPanel />
        </div>
      ) : (
        <>
          <Hero />
          <FeaturedDestinations />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;