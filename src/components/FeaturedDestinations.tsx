import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { useDestinations } from '../hooks/useDestinations';

const FeaturedDestinations: React.FC = () => {
  const { destinations, loading } = useDestinations();

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular destinations with curated experiences and local guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image_url || 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{destination.average_rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{destination.total_reviews} reviews</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{destination.popular_months?.[0] || 'Year-round'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">From</span>
                    <div className="text-2xl font-bold text-blue-600">
                      $199
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;