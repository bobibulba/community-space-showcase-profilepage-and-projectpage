import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, MessageSquareCode, Menu, X, Users, Home } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onProfileClick, onHomeClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.profile-button')
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleProfileOptionClick = (option: string) => {
    if (option === 'profile' && onProfileClick) {
      onProfileClick();
    }
    setProfileDropdownOpen(false);
  };

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={onHomeClick}
            >
              <MessageSquareCode className={`h-8 w-8 text-primary-600 transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`} />
              <span className={`ml-2 text-xl font-bold text-neutral-900 transition-all duration-300 ${scrolled ? 'scale-95' : 'scale-100'}`}>ChatAndBuild</span>
            </div>
          </div>

          {/* Search bar - hidden on mobile, visible on tablet and up */}
          <div className="hidden md:flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-center">
            <div className="max-w-lg w-full">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200"
                  placeholder="Search projects, categories, or builders"
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Right side navigation */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button 
                  className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                  onClick={onHomeClick}
                >
                  <span className="sr-only">Home</span>
                  <Home className="h-6 w-6" />
                </button>
                <button className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 relative">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
                </button>
                <div className="relative">
                  <button 
                    className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 profile-button"
                    onClick={handleProfileClick}
                    onMouseEnter={() => setProfileDropdownOpen(true)}
                  >
                    <span className="sr-only">View profile</span>
                    <User className="h-6 w-6" />
                  </button>
                  
                  {/* Profile dropdown */}
                  {profileDropdownOpen && (
                    <div 
                      ref={profileDropdownRef}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10 animate-fade-in"
                      onMouseEnter={() => setProfileDropdownOpen(true)}
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <button
                        onClick={() => handleProfileOptionClick('profile')}
                        className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => handleProfileOptionClick('subcommunities')}
                        className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Subcommunities
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                  Sign in
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow">
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="pt-2 pb-3 space-y-1">
            <div className="px-4 py-2">
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="mobile-search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200"
                  placeholder="Search projects, categories, or builders"
                  type="search"
                />
              </div>
            </div>
            {isLoggedIn ? (
              <div className="flex items-center justify-around py-4">
                <button 
                  className="flex flex-col items-center text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
                  onClick={onHomeClick}
                >
                  <Home className="h-6 w-6" />
                  <span className="text-xs mt-1">Home</span>
                </button>
                <button className="flex flex-col items-center text-neutral-500 hover:text-neutral-700 transition-colors duration-200">
                  <Bell className="h-6 w-6" />
                  <span className="text-xs mt-1">Notifications</span>
                </button>
                <button 
                  className="flex flex-col items-center text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
                  onClick={() => {
                    if (onProfileClick) onProfileClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-6 w-6" />
                  <span className="text-xs mt-1">Profile</span>
                </button>
                <button className="flex flex-col items-center text-neutral-500 hover:text-neutral-700 transition-colors duration-200">
                  <Users className="h-6 w-6" />
                  <span className="text-xs mt-1">Subcommunities</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-4 py-2">
                <button className="w-full px-4 py-2 text-sm font-medium text-center text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors duration-200">
                  Sign in
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-200">
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
