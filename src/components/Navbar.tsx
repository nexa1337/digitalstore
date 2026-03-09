import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCurrency, Currency } from '../context/CurrencyContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-4 z-50 w-full px-4 sm:px-6 flex justify-center pointer-events-none">
      <nav className="w-full max-w-5xl bg-white/70 dark:bg-[#18181b]/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-lg shadow-zinc-200/20 dark:shadow-black/20 transition-all duration-300 pointer-events-auto">
        <div className="flex justify-between items-center h-14 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <Link to="/" className="flex flex-col">
              <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight leading-none">
                N E X A 1337
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-[0.2em] animate-pulse mt-0.5">
                DIGITAL STORE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-zinc-100/50 dark:bg-zinc-800/50 p-1 rounded-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.path
                    ? 'bg-white dark:bg-[#27272a] text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-sm font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="USD" className="bg-white dark:bg-[#18181b]">USD</option>
              <option value="EUR" className="bg-white dark:bg-[#18181b]">EUR</option>
              <option value="MAD" className="bg-white dark:bg-[#18181b]">MAD</option>
            </select>

            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 hidden sm:block"></div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
