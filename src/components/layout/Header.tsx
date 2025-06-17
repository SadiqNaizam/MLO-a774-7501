import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react'; // Using a generic icon as a placeholder logo

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
              <Leaf className="h-7 w-7 text-green-600" />
              <span>AuthApp</span>
            </Link>
          </div>
          {/* Navigation items could be added here if needed in the future */}
          {/* For auth pages, it's often kept minimal */}
        </div>
      </div>
    </header>
  );
};

export default Header;