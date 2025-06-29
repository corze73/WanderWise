import React from 'react';
import { Plane, Building, MapPin } from 'lucide-react';
import FlightSearch from './FlightSearch';
import HotelSearch from './HotelSearch';
import TourSearch from './TourSearch';

const SearchTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('flights');

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building },
    { id: 'tours', label: 'Tours', icon: MapPin },
  ];

  const renderSearchContent = () => {
    switch (activeTab) {
      case 'flights':
        return <FlightSearch />;
      case 'hotels':
        return <HotelSearch />;
      case 'tours':
        return <TourSearch />;
      default:
        return <FlightSearch />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Content */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
        {renderSearchContent()}
      </div>
    </div>
  );
};

export default SearchTabs;