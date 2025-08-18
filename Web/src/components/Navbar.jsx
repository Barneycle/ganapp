import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuItems, setMenuItems] = useState([
    { name: "Home", to: "/" },
    { name: "Admin", to: "/admin" },
    { name: "Organizer", to: "/organizer" },
    { name: "Participants", to: "/participants" },
    { name: "Log In", to: "/login", special: true }
  ]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    // Mock user data - in real app, this would come from auth context or API
    // For testing logged out state, set to null
    const mockUser = null; // Change this to test logged in/out states
    setCurrentUser(mockUser);
  }, []);

  useEffect(() => {
    // Update menu items based on current path
    const path = location.pathname;
    if (path === "/create-event" || path === "/create-survey") {
      setActiveSection("CreateEvent");
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Events", to: "/view-events" },
        { name: "Survey Analytics", to: "/survey-analytics" }
      ]);
    } else if (path.startsWith("/organizer")) {
      setActiveSection("Organizer");
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Events", to: "/organizer", dropdown: true, items: [
          { name: "All Events", to: "/view-events" },
          { name: "Create Event", to: "/create-event" }
        ]},
        { name: "Survey Analytics", to: "/survey-analytics" }
      ]);
    } else if (path.startsWith("/admin")) {
      setActiveSection("Admin");
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Events", to: "/admin", dropdown: true, items: [
          { name: "All Events", to: "/view-events" },
          { name: "Create Event", to: "/create-event" }
        ]},
        { name: "Analytics", to: "/survey-analytics" },
        { name: "Management", to: "/admin", dropdown: true, items: [
          { name: "Attendees", to: "/attendees" },
          { name: "Certificates", to: "/certificates" },
          { name: "QR & Surveys", to: "/qr-surveys" },
          { name: "User Management", to: "/users" }
        ]}
      ]);
    } else if (path.startsWith("/participants")) {
      setActiveSection("Participants");
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Participants", to: "/participants" }
      ]);
    } else {
      setActiveSection(null);
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Admin", to: "/admin" },
        { name: "Organizer", to: "/organizer" },
        { name: "Participants", to: "/participants" },
        { name: "Log In", to: "/login", special: true }
      ]);
    }
  }, [location.pathname]);

  const handleSectionClick = (section, to) => {
    setActiveSection(section);
    if (section === "Organizer") {
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "View Events", to: "/view-events" },
        { name: "Survey Analytics", to: "/survey-analytics" },
        { name: "Create Event", to: "/create-event", special: true }
      ]);
    } else if (section === "Admin") {
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Admin Dashboard", to: "/admin" }
      ]);
    } else if (section === "Participants") {
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Participants", to: "/participants" }
      ]);
    } else if (section === "CreateEvent") {
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "View Events", to: "/view-events" }
      ]);
    } else {
      // Default menu
      setMenuItems([
        { name: "Home", to: "/" },
        { name: "Admin", to: "/admin" },
        { name: "Organizer", to: "/organizer" },
        { name: "Participants", to: "/participants" },
        { name: "Log In", to: "/login", special: true }
      ]);
    }
    setMenuOpen(false); // Close mobile menu on selection
    if (to) {
      navigate(to);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-blue-900 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link to="/" className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
              {" "} Gan<span className="text-blue-300">App</span> {" "}
            </Link>
            
            {/* Mobile menu button */}
            <div
              className="w-7 h-5 relative cursor-pointer z-40 md:hidden flex flex-col justify-center space-y-1"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
              {menuItems
                .filter(item => !item.special || (item.special && currentUser))
                .map((item) =>
                item.special ? (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-300 hover:text-blue-300 transition-colors font-semibold border border-white rounded px-2 py-1 lg:px-3 lg:py-1.5 hover:bg-white hover:text-blue-900 transition-colors text-xs sm:text-sm whitespace-nowrap"
                    onClick={() => handleSectionClick(null)}
                    target={item.name === "Create Event" ? "_blank" : undefined}
                    rel={item.name === "Create Event" ? "noopener noreferrer" : undefined}
                  >
                    {item.name}
                  </Link>
                ) : item.dropdown ? (
                  <div key={item.name} className="relative group">
                    <button className="flex items-center text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">
                      {item.name}
                      <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-40 lg:w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.items.map(subItem => (
                        <Link
                          key={subItem.name}
                          to={subItem.to}
                          className="block px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSectionClick(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm whitespace-nowrap"
                    onClick={() => handleSectionClick(item.name, item.to)}
                  >
                    {item.name}
                  </Link>
                )
              )}
              
              {/* User Display Button */}
              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 lg:space-x-2 bg-blue-800 hover:bg-blue-700 text-white px-2 py-1 lg:px-3 lg:py-1.5 rounded-lg transition-colors text-xs sm:text-sm">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-blue-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-900">
                        {currentUser.name.charAt(0)}
                      </span>
                    </div>
                    <span className="hidden lg:inline text-sm font-medium">{currentUser.name}</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-3 lg:p-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm lg:text-base">{currentUser.name}</p>
                      <p className="text-xs lg:text-sm text-gray-600">{currentUser.email}</p>
                      <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mt-1">
                        {currentUser.role}
                      </p>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          setCurrentUser(null);
                          navigate('/login');
                        }}
                        className="w-full text-left px-3 lg:px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors font-semibold border border-white rounded px-2 py-1 lg:px-3 lg:py-1.5 hover:bg-white hover:text-blue-900 transition-colors text-xs sm:text-sm whitespace-nowrap"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setMenuOpen(false)}></div>
      )}
      
      {/* Mobile menu */}
      <div className={`fixed top-14 sm:top-16 left-0 w-full bg-blue-900 z-30 transform transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="block px-3 sm:px-4 py-2 sm:py-3 text-white hover:bg-blue-800 rounded transition-colors text-sm sm:text-base"
              onClick={() => {
                handleSectionClick(item.name, item.to);
                setMenuOpen(false);
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="h-14 sm:h-16" />
    </>
  );
};
