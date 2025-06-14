import React from 'react';
import { Heart, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                {import.meta.env.VITE_APP_NAME || 'AuthApp'}
              </span>
            </div>
            <p className="text-slate-600 text-sm mb-4 max-w-md">
              A beautiful, secure, and production-ready authentication template built with React, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex items-center text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              <span>for developers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Home</a></li>
              <li><a href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Dashboard</a></li>
              <li><a href="/profile" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Profile</a></li>
              <li><a href="/settings" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Settings</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Report Bug</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © {currentYear} {import.meta.env.VITE_APP_NAME || 'AuthApp'}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;