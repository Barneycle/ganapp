import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
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
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    // Mock user data - in real app, this would come from auth context or API
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
    setMenuOpen(false);
    setOpenDropdown(null);
    if (to) {
      navigate(to);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-blue-900/95 backdrop-blur-lg md:hidden">
      <div className="flex flex-col h-full">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl focus:outline-none cursor-pointer"
            aria-label="Close Menu"
          >
            &times;
          </button>
        </div>

        {/* Menu items */}
        <div className="flex-1 px-4 py-8 space-y-4 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.special && !currentUser ? (
                <div className="flex justify-center mt-auto pt-8">
                  <Link
                    to={item.to}
                    className="block w-48 text-center px-4 py-2 text-white bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors font-semibold text-sm"
                    onClick={() => handleSectionClick(null, item.to)}
                  >
                    {item.name}
                  </Link>
                </div>
              ) : item.dropdown ? (
                <div>
                  <button
                    className="block w-full text-left px-4 py-3 text-white hover:bg-blue-800 rounded-lg transition-colors font-semibold"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.to}
                          className="block px-4 py-2 text-blue-200 hover:text-white hover:bg-blue-800 rounded-lg transition-colors"
                          onClick={() => handleSectionClick(null, subItem.to)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : !item.special || currentUser ? (
                <Link
                  to={item.to}
                  className="block px-4 py-3 text-white hover:bg-blue-800 rounded-lg transition-colors font-semibold"
                  onClick={() => handleSectionClick(item.name, item.to)}
                >
                  {item.name}
                </Link>
              ) : null}
            </div>
          ))}

          {/* User profile section */}
          {currentUser && (
            <div className="mt-8 pt-8 border-t border-blue-700">
              <div className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-900">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{currentUser.name}</p>
                    <p className="text-blue-200 text-sm">{currentUser.email}</p>
                    <p className="text-xs text-blue-300 bg-blue-800 px-2 py-1 rounded-full inline-block mt-1">
                      {currentUser.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Login button is now only shown in menuItems array */}
        </div>
      </div>
    </div>
  );
};
