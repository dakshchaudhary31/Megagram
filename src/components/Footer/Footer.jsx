import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">

          {/* Section 1: Logo & Copyright */}
          <div className="w-full md:w-1/2 lg:w-5/12 mb-10 md:mb-0 px-4">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center gap-2 mb-4">
                <Logo width="100px" />
                <span className="text-lg font-semibold">Megagram</span>
              </div>
              <p className="text-sm text-gray-500">
                &copy; 2025. All rights reserved.
              </p>
            </div>
          </div>

          {/* Section 2: Company */}
          <div className="w-full md:w-1/2 lg:w-2/12 mb-10 md:mb-0 px-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/" className="hover:text-white transition">Pricing</Link></li>
              <li><Link to="/" className="hover:text-white transition">Affiliate Program</Link></li>
              <li><Link to="/" className="hover:text-white transition">Press Kit</Link></li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div className="w-full md:w-1/2 lg:w-2/12 mb-10 md:mb-0 px-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition">Account</Link></li>
              <li><Link to="/" className="hover:text-white transition">Help</Link></li>
              <li><Link to="/" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-white transition">Customer Support</Link></li>
            </ul>
          </div>

          {/* Section 4: Legals */}
          <div className="w-full md:w-1/2 lg:w-3/12 px-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Legals</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition">Licensing</Link></li>
            </ul>
          </div>
        </div>

        {/* Optional Bottom Divider */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          Made with 💙 by Daksh Chaudhary 
        </div>
      </div>
    </footer>
  )
}

export default Footer
