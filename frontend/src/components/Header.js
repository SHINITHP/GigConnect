import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GigConnect</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-gray-600 hidden md:block text-sm">
                  Welcome, {user.name}
                </span>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;