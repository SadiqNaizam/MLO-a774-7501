import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-6 px-4 md:px-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">
          &copy; {currentYear} Your Application. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;