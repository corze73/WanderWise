import React from 'react';
import SearchTabs from './SearchTabs';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover amazing destinations, book the perfect stay, and find unforgettable experiences—all in one place.
          </p>
        </div>

        <SearchTabs />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-400 bg-opacity-10 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;