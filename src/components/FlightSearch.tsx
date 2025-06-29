import React from 'react';
import { Search, Calendar, Users, ArrowRightLeft } from 'lucide-react';

const FlightSearch: React.FC = () => {
  const [tripType, setTripType] = React.useState('roundtrip');

  return (
    <div className="space-y-6">
      {/* Trip Type Selector */}
      <div className="flex flex-wrap gap-4">
        {[
          { id: 'roundtrip', label: 'Round Trip' },
          { id: 'oneway', label: 'One Way' },
          { id: 'multicity', label: 'Multi-City' },
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* From */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <div className="relative">
            <input
              type="text"
              placeholder="City or Airport"
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <ArrowRightLeft className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            placeholder="City or Airport"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Departure</label>
          <div className="relative">
            <input
              type="date"
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <select className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
              <option>4+ Adults</option>
            </select>
            <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2">
        <Search className="h-6 w-6" />
        <span>Search Flights</span>
      </button>
    </div>
  );
};

export default FlightSearch;