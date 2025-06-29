import React from 'react';
import { ExternalLink, Shield, Star, Clock } from 'lucide-react';
import { BookingResult } from '../types/booking';

interface BookingResultsProps {
  results: BookingResult[];
  loading: boolean;
  onBookingClick: (result: BookingResult) => void;
}

const BookingResults: React.FC<BookingResultsProps> = ({ results, loading, onBookingClick }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No results found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-5 w-5 text-green-600" />
        <span className="text-sm text-gray-600">All bookings are processed through secure, verified partners</span>
      </div>

      {results.map((result, index) => (
        <div
          key={`${result.provider.id}-${index}`}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onBookingClick(result)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={result.provider.logo}
                alt={result.provider.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div>
                <h3 className="font-semibold text-gray-900">{result.provider.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure booking</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Trusted partner</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              {result.price && (
                <div className="text-2xl font-bold text-blue-600">
                  {result.currency}{result.price}
                </div>
              )}
              <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <span>Book Now</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>SSL encrypted</span>
              </div>
            </div>
            <span className="text-blue-600 hover:text-blue-700">
              View details →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingResults;