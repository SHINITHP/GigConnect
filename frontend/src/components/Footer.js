import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="text-lg font-bold text-gray-900">GigConnect</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; 2024 GigConnect. The modern platform for professional talent.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;