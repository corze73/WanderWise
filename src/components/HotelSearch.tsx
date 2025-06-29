import React from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { HotelBookingData, BookingResult } from '../types/booking';
import { useAuth } from '../hooks/useAuth';
import BookingResults from './BookingResults';

interface HotelSearchProps {
  onResults?: (results: BookingResult[]) => void;
}

const HotelSearch: React.FC<HotelSearchProps> = ({ onResults }) => {
  const [searchData, setSearchData] = React.useState<HotelBookingData>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });
  const [results, setResults] = React.useState<BookingResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchData.destination || !searchData.checkIn || !searchData.checkOut) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const searchResults = await bookingService.searchHotels(searchData);
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
              placeholder="City, Hotel, or Landmark"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Check-in</label>
          <div className="relative">
            <input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => setSearchData(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Check-out</label>
          <div className="relative">
            <input
              type="date"
              value={searchData.checkOut}
              onChange={(e) => setSearchData(prev => ({ ...prev, checkOut: e.target.value }))}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Guests and Rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          <div className="relative">
            <select 
              value={searchData.guests}
              onChange={(e) => setSearchData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5+ Guests</option>
            </select>
            <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Rooms</label>
          <select 
            value={searchData.rooms}
            onChange={(e) => setSearchData(prev => ({ ...prev, rooms: parseInt(e.target.value) }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={1}>1 Room</option>
            <option value={2}>2 Rooms</option>
            <option value={3}>3 Rooms</option>
            <option value={4}>4+ Rooms</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <Search className="h-6 w-6" />
        <span>{loading ? 'Searching...' : 'Search Hotels'}</span>
      </button>
      </form>

      {/* Results */}
      {(results.length > 0 || loading) && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Available Hotels</h3>
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

export default HotelSearch;