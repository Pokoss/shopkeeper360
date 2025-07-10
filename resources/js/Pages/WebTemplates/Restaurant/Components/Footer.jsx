import React from 'react';
import { Link } from '@inertiajs/react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">BiashariBites</h2>
          <p className="text-sm leading-relaxed">
            Whether you're serving rolex, chips, or gourmet meals — we help you manage bookings, menus, and customer engagement all in one system.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link href="#menu" className="hover:text-orange-400">Menu</Link></li>
            <li><Link href="#about" className="hover:text-orange-400">About Us</Link></li>
            <li><Link href="#contact" className="hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>📞 +256 700 123456</li>
            <li>✉️ info@biasharibites.com</li>
            <li>📍 Kampala, Uganda</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-orange-400">🌐</a>
            <a href="#" className="hover:text-orange-400">📘</a>
            <a href="#" className="hover:text-orange-400">📸</a>
            <a href="#" className="hover:text-orange-400">🐦</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BiashariBites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;