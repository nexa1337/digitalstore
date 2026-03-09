import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#121214] border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-24 md:pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight leading-none">
                  N E X A 1337
                </span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-[0.2em] animate-pulse mt-1">
                  DIGITAL STORE
                </span>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-sm mb-6">
              Premium digital products for modern creators. Hosted securely on Gumroad for seamless checkout.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/nexa1337" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/nexa1337" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@nexa.1337" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link></li>
              <li><Link to="/calculator" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Profit Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            © {new Date().getFullYear()} N E X A 1337. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
            <span>Powered by</span>
            <a href="https://linktr.ee/nexa1337" target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              N E X A 1337
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
