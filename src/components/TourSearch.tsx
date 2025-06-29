import React from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';

const TourSearch: React.FC = () => {
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
              placeholder="Where do you want to explore?"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Travelers */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Travelers</label>
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>1 Person</option>
              <option>2 People</option>
              <option>3-5 People</option>
              <option>6-10 People</option>
              <option>Large Group (10+)</option>
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
            'City Tours',
            'Adventure',
            'Cultural',
            'Food & Drink',
            'Nature',
            'Photography',
            'Historical',
            'Private Tours',
          ].map((category) => (
            <button
              key={category}
              className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2">
        <Search className="h-6 w-6" />
        <span>Find Tours & Experiences</span>
      </button>
    </div>
  );
};

export default TourSearch;