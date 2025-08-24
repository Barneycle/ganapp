import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log('🔄 Starting sign out process...');
      const result = await signOut();
      console.log('🔄 Sign out result:', result);
      
      if (result && result.success) {
        console.log('✅ Sign out successful, navigating to home...');
        navigate('/');
      } else {
        console.error('❌ Sign out failed:', result?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  // Get user initials for profile circle
  const getUserInitials = () => {
    if (!user) return '?';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };

  return (
    <nav className="bg-gradient-to-r from-navy-600 via-navy-700 to-navy-600 text-white shadow-2xl border-b border-navy-500/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:from-navy-200 hover:via-white hover:to-navy-200 transition-all duration-300">
              GanApp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Events
              </Link>
              <Link to="/surveys" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Surveys
              </Link>
              {isAuthenticated && user?.role === 'admin' && (
                <Link to="/admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Profile/Login Section */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-navy-400 to-navy-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md hover:shadow-lg transition-shadow border border-navy-300/50">
                    {getUserInitials()}
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-navy-700 rounded-xl shadow-xl border border-navy-600/50 py-2 z-50">
                    <div className="px-4 py-2 border-b border-navy-600/50">
                      <p className="text-sm font-medium text-white">{user?.first_name} {user?.last_name}</p>
                      <p className="text-xs text-gray-300">{user?.email}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user?.user_type === 'psu-student' ? 'bg-blue-100 text-blue-800' :
                          user?.user_type === 'psu-employee' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {user?.user_type}
                        </span>
                        <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user?.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user?.role === 'organizer' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user?.role}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-navy-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-500 hover:to-navy-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 border border-navy-500/50 hover:border-navy-400 hover:shadow-lg hover:shadow-navy-600/25 hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-600 border-t border-navy-500/50">
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/surveys"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Surveys
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            
            {/* Mobile Profile/Login Section */}
            {isAuthenticated ? (
              <div className="pt-4 border-t border-navy-500/50">
                <div className="flex items-center px-3 py-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-navy-400 to-navy-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-3 border border-navy-300/50">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-gray-300">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-navy-500 transition-colors rounded-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-navy-500/50">
                <Link
                  to="/login"
                  className="block w-full px-6 py-4 bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-500 hover:to-navy-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 border border-navy-500/50 hover:border-navy-400 hover:shadow-lg hover:shadow-navy-600/25 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close profile dropdown */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeProfileDropdown}
        />
      )}
    </nav>
  );
};