import React from 'react';
import { Search, Calendar, Users, ArrowRightLeft } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { FlightBookingData, BookingResult } from '../types/booking';
import { useAuth } from '../hooks/useAuth';
import BookingResults from './BookingResults';

interface FlightSearchProps {
  onResults?: (results: BookingResult[]) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onResults }) => {
  const [tripType, setTripType] = React.useState('roundtrip');
  const [searchData, setSearchData] = React.useState<FlightBookingData>({
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    classType: 'economy',
    tripType: 'roundtrip'
  });
  const [results, setResults] = React.useState<BookingResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchData.departure || !searchData.arrival || !searchData.departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const searchResults = await bookingService.searchFlights({
        ...searchData,
        tripType: tripType as any
      });
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
      {/* Trip Type Selector */}
      <div className="flex flex-wrap gap-4">
        {[
          { id: 'roundtrip', label: 'Round Trip' },
          { id: 'oneway', label: 'One Way' },
        ].map((type) => (
          <label key={type.id} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value={type.id}
              checked={tripType === type.id}
              onChange={(e) => setTripType(e.target.value)}
              className="sr-only"
            />
            <div
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                tripType === type.id
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {type.label}
            </div>
          </label>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* From */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <div className="relative">
            <input
              type="text"
              value={searchData.departure}
              onChange={(e) => setSearchData(prev => ({ ...prev, departure: e.target.value }))}
              placeholder="City or Airport"
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <ArrowRightLeft className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            value={searchData.arrival}
            onChange={(e) => setSearchData(prev => ({ ...prev, arrival: e.target.value }))}
            placeholder="City or Airport"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Departure</label>
          <div className="relative">
            <input
              type="date"
              value={searchData.departureDate}
              onChange={(e) => setSearchData(prev => ({ ...prev, departureDate: e.target.value }))}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Return Date */}
        {tripType === 'roundtrip' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Return</label>
            <div className="relative">
              <input
                type="date"
                value={searchData.returnDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Passengers and Class */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Passengers</label>
          <div className="relative">
            <select 
              value={searchData.passengers}
              onChange={(e) => setSearchData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value={1}>1 Adult</option>
              <option value={2}>2 Adults</option>
              <option value={3}>3 Adults</option>
              <option value={4}>4+ Adults</option>
            </select>
            <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select 
            value={searchData.classType}
            onChange={(e) => setSearchData(prev => ({ ...prev, classType: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="economy">Economy</option>
            <option value="premium">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
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
        <span>{loading ? 'Searching...' : 'Search Flights'}</span>
      </button>
      </form>

      {/* Results */}
      {(results.length > 0 || loading) && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Available Flights</h3>
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

export default FlightSearch;