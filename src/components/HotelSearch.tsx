import React from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';

const HotelSearch: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <div className="relative">
            <input
              type="text"
              placeholder="City, Hotel, or Landmark"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <select className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5+ Guests</option>
            </select>
            <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Rooms</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>1 Room</option>
            <option>2 Rooms</option>
            <option>3 Rooms</option>
            <option>4+ Rooms</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2">
        <Search className="h-6 w-6" />
        <span>Search Hotels</span>
      </button>
    </div>
  );
};

export default HotelSearch;