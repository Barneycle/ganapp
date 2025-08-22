import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isReportsDropdownOpen, setIsReportsDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isParticipantsEventsDropdownOpen, setIsParticipantsEventsDropdownOpen] = useState(false);
  const [isParticipantsAttendanceDropdownOpen, setIsParticipantsAttendanceDropdownOpen] = useState(false);
  const [isParticipantsSurveysDropdownOpen, setIsParticipantsSurveysDropdownOpen] = useState(false);
  const [isParticipantsCertificatesDropdownOpen, setIsParticipantsCertificatesDropdownOpen] = useState(false);
  const [isParticipantsProfileDropdownOpen, setIsParticipantsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const toolsDropdownRef = useRef(null);
  const reportsDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const participantsEventsDropdownRef = useRef(null);
  const participantsAttendanceDropdownRef = useRef(null);
  const participantsSurveysDropdownRef = useRef(null);
  const participantsCertificatesDropdownRef = useRef(null);
  const participantsProfileDropdownRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isOrganizerRoute = () => {
    return location.pathname.startsWith('/organizer') || 
           location.pathname === '/create-event' || 
           location.pathname === '/view-events';
  };

  const isParticipantsRoute = () => {
    return location.pathname.startsWith('/participants') || 
           location.pathname === '/events' || 
           location.pathname === '/my-attendance' || 
           location.pathname === '/surveys' || 
           location.pathname === '/certificates' ||
           location.pathname === '/profile';
  };

  const isAdminRoute = () => {
    return location.pathname.startsWith('/admin') || 
           location.pathname === '/attendance' || 
           location.pathname === '/surveys' || 
           location.pathname === '/certificates' ||
           location.pathname === '/reports' ||
           location.pathname === '/settings' ||
           location.pathname === '/profile';
  };

  const toggleEventsDropdown = () => {
    setIsEventsDropdownOpen(!isEventsDropdownOpen);
    // Close other dropdowns
    setIsToolsDropdownOpen(false);
    setIsReportsDropdownOpen(false);
    setIsSettingsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
    // Close other dropdowns
    setIsEventsDropdownOpen(false);
    setIsReportsDropdownOpen(false);
    setIsSettingsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleReportsDropdown = () => {
    setIsReportsDropdownOpen(!isReportsDropdownOpen);
    // Close other dropdowns
    setIsEventsDropdownOpen(false);
    setIsToolsDropdownOpen(false);
    setIsSettingsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
    // Close other dropdowns
    setIsEventsDropdownOpen(false);
    setIsToolsDropdownOpen(false);
    setIsReportsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    // Close other dropdowns
    setIsEventsDropdownOpen(false);
    setIsToolsDropdownOpen(false);
    setIsReportsDropdownOpen(false);
    setIsSettingsDropdownOpen(false);
  };

  const toggleParticipantsEventsDropdown = () => {
    setIsParticipantsEventsDropdownOpen(!isParticipantsEventsDropdownOpen);
    // Close other dropdowns
    setIsParticipantsAttendanceDropdownOpen(false);
    setIsParticipantsSurveysDropdownOpen(false);
    setIsParticipantsCertificatesDropdownOpen(false);
    setIsParticipantsProfileDropdownOpen(false);
  };

  const toggleParticipantsAttendanceDropdown = () => {
    setIsParticipantsAttendanceDropdownOpen(!isParticipantsAttendanceDropdownOpen);
    // Close other dropdowns
    setIsParticipantsEventsDropdownOpen(false);
    setIsParticipantsSurveysDropdownOpen(false);
    setIsParticipantsCertificatesDropdownOpen(false);
    setIsParticipantsProfileDropdownOpen(false);
  };

  const toggleParticipantsSurveysDropdown = () => {
    setIsParticipantsSurveysDropdownOpen(!isParticipantsSurveysDropdownOpen);
    // Close other dropdowns
    setIsParticipantsEventsDropdownOpen(false);
    setIsParticipantsAttendanceDropdownOpen(false);
    setIsParticipantsCertificatesDropdownOpen(false);
    setIsParticipantsProfileDropdownOpen(false);
  };

  const toggleParticipantsCertificatesDropdown = () => {
    setIsParticipantsCertificatesDropdownOpen(!isParticipantsCertificatesDropdownOpen);
    // Close other dropdowns
    setIsParticipantsEventsDropdownOpen(false);
    setIsParticipantsAttendanceDropdownOpen(false);
    setIsParticipantsSurveysDropdownOpen(false);
    setIsParticipantsProfileDropdownOpen(false);
  };

  const toggleParticipantsProfileDropdown = () => {
    setIsParticipantsProfileDropdownOpen(!isParticipantsProfileDropdownOpen);
    // Close other dropdowns
    setIsParticipantsEventsDropdownOpen(false);
    setIsParticipantsAttendanceDropdownOpen(false);
    setIsParticipantsSurveysDropdownOpen(false);
    setIsParticipantsCertificatesDropdownOpen(false);
  };

  // Close all dropdowns when route changes
  useEffect(() => {
    setIsEventsDropdownOpen(false);
    setIsToolsDropdownOpen(false);
    setIsReportsDropdownOpen(false);
    setIsSettingsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsParticipantsEventsDropdownOpen(false);
    setIsParticipantsAttendanceDropdownOpen(false);
    setIsParticipantsSurveysDropdownOpen(false);
    setIsParticipantsCertificatesDropdownOpen(false);
    setIsParticipantsProfileDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsEventsDropdownOpen(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target)) {
        setIsToolsDropdownOpen(false);
      }
      if (reportsDropdownRef.current && !reportsDropdownRef.current.contains(event.target)) {
        setIsReportsDropdownOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
        setIsSettingsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (participantsEventsDropdownRef.current && !participantsEventsDropdownRef.current.contains(event.target)) {
        setIsParticipantsEventsDropdownOpen(false);
      }
      if (participantsAttendanceDropdownRef.current && !participantsAttendanceDropdownRef.current.contains(event.target)) {
        setIsParticipantsAttendanceDropdownOpen(false);
      }
      if (participantsSurveysDropdownRef.current && !participantsSurveysDropdownRef.current.contains(event.target)) {
        setIsParticipantsSurveysDropdownOpen(false);
      }
      if (participantsCertificatesDropdownRef.current && !participantsCertificatesDropdownRef.current.contains(event.target)) {
        setIsParticipantsCertificatesDropdownOpen(false);
      }
      if (participantsProfileDropdownRef.current && !participantsProfileDropdownRef.current.contains(event.target)) {
        setIsParticipantsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-navy-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <Link to="/" className="text-xl font-bold text-white hover:text-gray-200">
            GanApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 ${
                isActive('/') ? 'text-white' : 'text-gray-300'
              }`}
              title="Return to home page"
            >
              Home
            </Link>
            
            {isOrganizerRoute() ? (
              // Organizer-specific menu
              <>
                {/* Events Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleEventsDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      (isActive('/create-event') || isActive('/view-events')) ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Create and manage events (upcoming, ongoing, past)"
                  >
                    <span>Events</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isEventsDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isEventsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/view-events"
                          onClick={() => setIsEventsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/view-events') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="View all events"
                        >
                          All Events
                        </Link>
                        <Link
                          to="/create-event"
                          onClick={() => setIsEventsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/create-event') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Create a new event"
                        >
                          Create Event
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link
                  to="/survey-analytics"
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 ${
                    isActive('/survey-analytics') ? 'text-white' : 'text-gray-300'
                  }`}
                  title="View survey responses and analytics"
                >
                  Survey Analytics
                </Link>
              </>
            ) : isAdminRoute() ? (
              // Admin-specific menu
              <>
                {/* Events Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleEventsDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      (isActive('/events') || isActive('/create-event') || isActive('/view-events')) ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Create and manage events (upcoming, ongoing, past)"
                  >
                    <span>Events</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isEventsDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Events Dropdown Menu */}
                  {isEventsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/events"
                          onClick={() => setIsEventsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/events') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="View all events"
                        >
                          All Events
                        </Link>
                        <Link
                          to="/create-event"
                          onClick={() => setIsEventsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/create-event') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Create a new event"
                        >
                          Create Event
                        </Link>
                        <Link
                          to="/manage-events"
                          onClick={() => setIsEventsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/manage-events') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Manage ongoing and past events"
                        >
                          Manage Events
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Tools Dropdown */}
                <div className="relative" ref={toolsDropdownRef}>
                  <button
                    onClick={toggleToolsDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      (isActive('/attendance') || isActive('/surveys') || isActive('/certificates')) ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Administrative tools and utilities"
                  >
                    <span>Tools</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Tools Dropdown Menu */}
                  {isToolsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/attendance"
                          onClick={() => setIsToolsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/attendance') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="QR check-ins, photo verification, admin overrides"
                        >
                          Attendance
                        </Link>
                        <Link
                          to="/surveys"
                          onClick={() => setIsToolsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/surveys') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Manage evaluation forms, view responses"
                        >
                          Surveys
                        </Link>
                        <Link
                          to="/certificates"
                          onClick={() => setIsToolsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/certificates') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Issue and track participant certificates"
                        >
                          Certificates
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Reports Dropdown */}
                <div className="relative" ref={reportsDropdownRef}>
                  <button
                    onClick={toggleReportsDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/reports') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Analytics dashboards, attendance trends, survey insights"
                  >
                    <span>Reports</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isReportsDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Reports Dropdown Menu */}
                  {isReportsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/survey-analytics"
                          onClick={() => setIsReportsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/survey-analytics') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="View analytics dashboard"
                        >
                          Analytics Dashboard
                        </Link>
                        <Link
                          to="/attendance-trends"
                          onClick={() => setIsReportsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/attendance-trends') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="View attendance trends"
                        >
                          Attendance Trends
                        </Link>
                        <Link
                          to="/survey-insights"
                          onClick={() => setIsReportsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/survey-insights') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="View survey insights"
                        >
                          Survey Insights
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Settings Dropdown */}
                <div className="relative" ref={settingsDropdownRef}>
                  <button
                    onClick={toggleSettingsDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/settings') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="System preferences, user management, customization"
                  >
                    <span>Settings</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isSettingsDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Settings Dropdown Menu */}
                  {isSettingsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/system-preferences"
                          onClick={() => setIsSettingsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/system-preferences') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Configure system preferences"
                        >
                          System Preferences
                        </Link>
                        <Link
                          to="/user-management"
                          onClick={() => setIsSettingsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/user-management') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Manage user accounts and permissions"
                        >
                          User Management
                        </Link>
                        <Link
                          to="/customization"
                          onClick={() => setIsSettingsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/customization') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Customize system appearance and behavior"
                        >
                          Customization
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Profile Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/profile') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Account settings, help, logout"
                  >
                    <span>Profile</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/account-settings"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/account-settings') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Manage account settings"
                        >
                          Account Settings
                        </Link>
                        <Link
                          to="/help"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/help') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Get help and support"
                        >
                          Help
                        </Link>
                        <Link
                          to="/logout"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/logout') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Logout from the system"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : isParticipantsRoute() ? (
              // Participants-specific menu
              <>
                {/* Events Dropdown */}
                <div className="relative" ref={participantsEventsDropdownRef}>
                  <button
                    onClick={toggleParticipantsEventsDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/events') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="List of events you can join/register for"
                  >
                    <span>Events</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isParticipantsEventsDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Events Dropdown Menu */}
                  {isParticipantsEventsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/events"
                          onClick={() => setIsParticipantsEventsDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/events') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="List of events you can join/register for"
                        >
                          All Events
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* My Attendance Dropdown */}
                <div className="relative" ref={participantsAttendanceDropdownRef}>
                  <button
                    onClick={toggleParticipantsAttendanceDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/my-attendance') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="View your attendance history and QR check-in status"
                  >
                    <span>My Attendance</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isParticipantsAttendanceDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* My Attendance Dropdown Menu */}
                  {isParticipantsAttendanceDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/my-attendance"
                          onClick={() => setIsParticipantsAttendanceDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/my-attendance') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="View your attendance history and QR check-in status"
                        >
                          My Attendance
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Surveys Dropdown */}
                <div className="relative" ref={participantsSurveysDropdownRef}>
                  <button
                    onClick={toggleParticipantsSurveysDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/surveys') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Answer post-event evaluation forms"
                  >
                    <span>Surveys</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isParticipantsSurveysDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Surveys Dropdown Menu */}
                  {isParticipantsSurveysDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/surveys"
                          onClick={() => setIsParticipantsSurveysDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/surveys') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Answer post-event evaluation forms"
                        >
                          Surveys
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Certificates Dropdown */}
                <div className="relative" ref={participantsCertificatesDropdownRef}>
                  <button
                    onClick={toggleParticipantsCertificatesDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/certificates') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Download and view your earned certificates"
                  >
                    <span>Certificates</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isParticipantsCertificatesDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Certificates Dropdown Menu */}
                  {isParticipantsCertificatesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/certificates"
                          onClick={() => setIsParticipantsCertificatesDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/certificates') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Download and view your earned certificates"
                        >
                          Certificates
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Profile Dropdown */}
                <div className="relative" ref={participantsProfileDropdownRef}>
                  <button
                    onClick={toggleParticipantsProfileDropdown}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 flex items-center space-x-1 ${
                      isActive('/profile') ? 'text-white' : 'text-gray-300'
                    }`}
                    title="Account settings, help, logout"
                  >
                    <span>Profile</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isParticipantsProfileDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  {isParticipantsProfileDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsParticipantsProfileDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm hover:bg-navy-600 transition-colors ${
                            isActive('/profile') ? 'text-white bg-navy-600' : 'text-gray-300'
                          }`}
                          title="Account settings, help, logout"
                        >
                          Profile
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Default menu
              <>
                <Link
                  to="/admin"
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 ${
                    isActive('/admin') ? 'text-white' : 'text-gray-300'
                  }`}
                  title="Access administrative functions and tools"
                >
                  Admin
                </Link>
                <Link
                  to="/organizer"
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 ${
                    isActive('/organizer') ? 'text-white' : 'text-gray-300'
                  }`}
                  title="Manage events and surveys as an organizer"
                >
                  Organizers
                </Link>
                <Link
                  to="/participants"
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gray-200 ${
                    isActive('/participants') ? 'text-white' : 'text-gray-300'
                  }`}
                  title="View and manage participant information"
                >
                  Participants
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-navy-700 transition-colors"
            title="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy-700 border-t border-navy-600">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium ${
                  isActive('/') ? 'text-white' : 'text-gray-300'
                } hover:text-white transition-colors`}
                title="Return to home page"
              >
                Home
              </Link>
              
              {isOrganizerRoute() ? (
                // Organizer-specific mobile menu
                <>
                  {/* Events Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Events
                    </div>
                    <Link
                      to="/view-events"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/view-events') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="View all events"
                    >
                      All Events
                    </Link>
                    <Link
                      to="/create-event"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/create-event') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Create a new event"
                    >
                      Create Event
                    </Link>
                  </div>
                  
                  <Link
                    to="/survey-analytics"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium ${
                      isActive('/survey-analytics') ? 'text-white' : 'text-gray-300'
                    } hover:text-white transition-colors`}
                    title="View survey responses and analytics"
                  >
                    Survey Analytics
                  </Link>
                </>
              ) : isAdminRoute() ? (
                // Admin-specific mobile menu
                <>
                  {/* Events Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Events
                    </div>
                    <Link
                      to="/events"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/events') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="View all events"
                    >
                      All Events
                    </Link>
                    <Link
                      to="/create-event"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/create-event') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Create a new event"
                    >
                      Create Event
                    </Link>
                    <Link
                      to="/manage-events"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/manage-events') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Manage ongoing and past events"
                    >
                      Manage Events
                    </Link>
                  </div>
                  
                  {/* Tools Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Tools
                    </div>
                    <Link
                      to="/attendance"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/attendance') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="QR check-ins, photo verification, admin overrides"
                    >
                      Attendance
                    </Link>
                    <Link
                      to="/surveys"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/surveys') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Manage evaluation forms, view responses"
                    >
                      Surveys
                    </Link>
                    <Link
                      to="/certificates"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/certificates') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Issue and track participant certificates"
                    >
                      Certificates
                    </Link>
                  </div>
                  
                  {/* Reports Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Reports
                    </div>
                    <Link
                      to="/survey-analytics"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/survey-analytics') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="View analytics dashboard"
                    >
                      Analytics Dashboard
                    </Link>
                    <Link
                      to="/attendance-trends"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/attendance-trends') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="View attendance trends"
                    >
                      Attendance Trends
                    </Link>
                    <Link
                      to="/survey-insights"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/survey-insights') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="View survey insights"
                    >
                      Survey Insights
                    </Link>
                  </div>
                  
                  {/* Settings Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Settings
                    </div>
                    <Link
                      to="/system-preferences"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/system-preferences') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Configure system preferences"
                    >
                      System Preferences
                    </Link>
                    <Link
                      to="/user-management"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/user-management') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Manage user accounts and permissions"
                    >
                      User Management
                    </Link>
                    <Link
                      to="/customization"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/customization') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Customize system appearance and behavior"
                    >
                      Customization
                    </Link>
                  </div>
                  
                  {/* Profile Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Profile
                    </div>
                    <Link
                      to="/account-settings"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/account-settings') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Manage account settings"
                    >
                      Account Settings
                    </Link>
                    <Link
                      to="/help"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/help') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Get help and support"
                    >
                      Help
                    </Link>
                    <Link
                      to="/logout"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/logout') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Logout from the system"
                    >
                      Logout
                    </Link>
                  </div>
                </>
              ) : isParticipantsRoute() ? (
                // Participants-specific mobile menu
                <>
                  {/* Events Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Events
                    </div>
                    <Link
                      to="/events"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/events') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="List of events you can join/register for"
                    >
                      All Events
                    </Link>
                  </div>
                  
                  {/* My Attendance Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      My Attendance
                    </div>
                    <Link
                      to="/my-attendance"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/my-attendance') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="View your attendance history and QR check-in status"
                    >
                      My Attendance
                    </Link>
                  </div>
                  
                  {/* Surveys Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Surveys
                    </div>
                    <Link
                      to="/surveys"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/surveys') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Answer post-event evaluation forms"
                    >
                      Surveys
                    </Link>
                  </div>
                  
                  {/* Certificates Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Certificates
                    </div>
                    <Link
                      to="/certificates"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/certificates') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Download and view your earned certificates"
                    >
                      Certificates
                    </Link>
                  </div>
                  
                  {/* Profile Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      Profile
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block pl-4 text-base font-medium ${
                        isActive('/profile') ? 'text-white' : 'text-gray-300'
                      } hover:text-white transition-colors`}
                      title="Account settings, help, logout"
                    >
                      Profile
                    </Link>
                  </div>
                </>
              ) : (
                // Default mobile menu
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium ${
                      isActive('/admin') ? 'text-white' : 'text-gray-300'
                    } hover:text-white transition-colors`}
                    title="Access administrative functions and tools"
                  >
                    Admin
                  </Link>
                  <Link
                    to="/organizer"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium ${
                      isActive('/organizer') ? 'text-white' : 'text-gray-300'
                    } hover:text-white transition-colors`}
                    title="Manage events and surveys as an organizer"
                  >
                    Organizers
                  </Link>
                  <Link
                    to="/participants"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium ${
                      isActive('/participants') ? 'text-white' : 'text-gray-300'
                    } hover:text-white transition-colors`}
                    title="View and manage participant information"
                  >
                    Participants
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
