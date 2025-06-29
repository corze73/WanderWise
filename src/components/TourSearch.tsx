import React from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { TourBookingData, BookingResult } from '../types/booking';
import { useAuth } from '../hooks/useAuth';
import BookingResults from './BookingResults';

interface TourSearchProps {
  onResults?: (results: BookingResult[]) => void;
}

const TourSearch: React.FC<TourSearchProps> = ({ onResults }) => {
  const [searchData, setSearchData] = React.useState<TourBookingData>({
    destination: '',
    date: '',
    travelers: 1,
    category: ''
  });
  const [results, setResults] = React.useState<BookingResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchData.destination || !searchData.date) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const searchResults = await bookingService.searchTours(searchData);
      setResults(searchResults);
      onResults?.(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingClick = async (result: BookingResult) => {
    if (user) {
      await bookingService.saveBookingAttempt(user.id, result.provider, searchData);
    }
    window.open(result.searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <div className="relative">
            <input
              type="text"
              value={searchData.destination}
              onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
              placeholder="Where do you want to explore?"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <div className="relative">
            <input
              type="date"
              value={searchData.date}
              onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Travelers */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Travelers</label>
          <div className="relative">
            <select 
              value={searchData.travelers}
              onChange={(e) => setSearchData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value={1}>1 Person</option>
              <option value={2}>2 People</option>
              <option value={4}>3-5 People</option>
              <option value={8}>6-10 People</option>
              <option value={15}>Large Group (10+)</option>
            </select>
            <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tour Categories */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Tour Type</label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'city', label: 'City Tours' },
            { id: 'adventure', label: 'Adventure' },
            { id: 'cultural', label: 'Cultural' },
            { id: 'food', label: 'Food & Drink' },
            { id: 'nature', label: 'Nature' },
            { id: 'photography', label: 'Photography' },
            { id: 'historical', label: 'Historical' },
            { id: 'private', label: 'Private Tours' },
          ].map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSearchData(prev => ({ 
                ...prev, 
                category: prev.category === category.id ? '' : category.id 
              }))}
              className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                searchData.category === category.id
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <Search className="h-6 w-6" />
        <span>{loading ? 'Searching...' : 'Find Tours & Experiences'}</span>
      </button>
      </form>

      {/* Results */}
      {(results.length > 0 || loading) && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Available Tours</h3>
          <BookingResults 
            results={results} 
            loading={loading} 
            onBookingClick={handleBookingClick}
          />
        </div>
      )}
    </div>
  );
};

export default TourSearch;