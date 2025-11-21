import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Navbar() {
  const { user = null, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold hover:text-orange-100 transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">N</span>
              </div>
              <span>NourishNetwork</span>
            </Link>

            {/* Navigation Links based on role */}
            <div className="hidden md:flex items-center space-x-6">
              {user && user.role === "donor" && (
                <>
                  <NavLink to="/food/post" icon="📦">
                    Post Food
                  </NavLink>
                  <NavLink to="/food" icon="🍽️">
                    My Listings
                  </NavLink>
                  <NavLink to="/donations" icon="❤️">
                    My Donations
                  </NavLink>
                </>
              )}
              {user && user.role === "recipient" && (
                <>
                  <NavLink to="/food" icon="🔍">
                    Find Food
                  </NavLink>
                  <NavLink to="/my-claims" icon="📋">
                    My Claims
                  </NavLink>
                </>
              )}
              {!user && (
                <NavLink to="/food" icon="🍽️">
                  Browse Food
                </NavLink>
              )}
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Info with Role Badge */}
                <div className="hidden sm:flex items-center space-x-3 bg-white/10 px-3 py-1 rounded-full">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.role === 'donor' 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-yellow-600 text-white'
                    }`}>
                      {user.role === 'donor' ? '🥗 Donor' : '👥 Recipient'}
                    </span>
                  </div>
                </div>

                {/* Profile and Logout */}
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/profile" 
                    className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>👤</span>
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>🚪</span>
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              /* Login/Register for non-authenticated users */
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {user && user.role === "donor" && (
              <>
                <MobileNavLink to="/food/post" icon="📦">
                  Post Food
                </MobileNavLink>
                <MobileNavLink to="/food" icon="🍽️">
                  My Listings
                </MobileNavLink>
                <MobileNavLink to="/donations" icon="❤️">
                  My Donations
                </MobileNavLink>
              </>
            )}
            {user && user.role === "recipient" && (
              <>
                <MobileNavLink to="/food" icon="🔍">
                  Find Donations
                </MobileNavLink>
                <MobileNavLink to="/my-claims" icon="📋">
                  My Claims
                </MobileNavLink>
              </>
            )}
            {!user && (
              <MobileNavLink to="/food" icon="🍽️">
                Browse Food
              </MobileNavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink component for desktop
function NavLink({ to, icon, children }) {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors group"
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium group-hover:text-orange-100">{children}</span>
    </Link>
  );
}

// Reusable MobileNavLink component
function MobileNavLink({ to, icon, children }) {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors"
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}