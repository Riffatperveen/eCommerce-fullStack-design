import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              eShop
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">
              Shop
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Admin
            </Link>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          {/* Cart Icon and Mobile Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-blue-600 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/admin"
              className="block text-gray-700 hover:text-blue-600 py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <a href="#about" className="block text-gray-700 hover:text-blue-600 py-2">
              About
            </a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600 py-2">
              Contact
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
