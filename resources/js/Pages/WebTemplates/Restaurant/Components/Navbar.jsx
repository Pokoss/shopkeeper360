import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg left-0 w-full sticky opacity-95 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition">
              🍽️ BiashariBites
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center text-gray-700 font-medium">
            <Link href="/res" className="hover:text-orange-600 transition">Home</Link>
            <Link href="/res/menu" className="hover:text-orange-600 transition">Menu</Link>
            <Link href="/res/aboutus" className="hover:text-orange-600 transition">About</Link>
            <Link href="/res/reservations" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
              Book a Table
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'transform rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        } bg-white`}
      >
        <div className="px-6 py-4 space-y-3 text-gray-700 font-medium">
          <Link href="/" className="block hover:text-orange-600 transition">Home</Link>
          <Link href="#menu" className="block hover:text-orange-600 transition">Menu</Link>
          <Link href="#about" className="block hover:text-orange-600 transition">About</Link>
          <Link href="#contact" className="block hover:text-orange-600 transition">Contact</Link>
          <Link href="#book" className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
            Book a Table
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;