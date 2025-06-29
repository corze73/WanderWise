import React from 'react';
import { Plane, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              WanderWise
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Flights
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Hotels
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tours
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Deals
            </a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode('signin');
                    setIsAuthModalOpen(true);
                  }}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 font-medium">Flights</a>
              <a href="#" className="text-gray-700 font-medium">Hotels</a>
              <a href="#" className="text-gray-700 font-medium">Tours</a>
              <a href="#" className="text-gray-700 font-medium">Deals</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                {user ? (
                  <>
                    <div className="text-gray-700 font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-700 font-medium text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthMode('signin');
                        setIsAuthModalOpen(true);
                      }}
                      className="text-gray-700 font-medium text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setIsAuthModalOpen(true);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;