import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NotificationCenter } from './NotificationCenter';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in (you'll need to implement auth)
    const checkAuth = async () => {
      // For now, let's simulate a logged-in user
      setUser({ name: 'John Doe', role: 'participant' });
    };

    checkAuth();
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">G</span>
            </div>
            <span className={`font-bold text-xl sm:text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              GanApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${
                isActive('/events') 
                  ? 'text-blue-600' 
                  : isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Events
            </Link>
            <Link
              to="/survey"
              className={`text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${
                isActive('/survey') 
                  ? 'text-blue-600' 
                  : isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Survey
            </Link>
            {user && (
              <>
                <Link
                  to="/organizer"
                  className={`text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${
                    isActive('/organizer') 
                      ? 'text-blue-600' 
                      : isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Organizer
                </Link>
                <Link
                  to="/admin"
                  className={`text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${
                    isActive('/admin') 
                      ? 'text-blue-600' 
                      : isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Admin
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Auth & Notifications */}
          <div className="flex items-center space-x-4">
            {/* Notification Center */}
            {user && <NotificationCenter />}
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}>
                    Welcome, {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                    isScrolled
                      ? 'text-gray-700 hover:text-gray-900'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200"
            >
              <svg
                className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/events"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium ${
                  isActive('/events') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Events
              </Link>
              <Link
                to="/survey"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium ${
                  isActive('/survey') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Survey
              </Link>
              {user && (
                <>
                  <Link
                    to="/organizer"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium ${
                      isActive('/organizer') ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Organizer
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium ${
                      isActive('/admin') ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
