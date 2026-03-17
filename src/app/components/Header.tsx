import { Link, useLocation } from 'react-router';
import logo from './figma/save-the-date-logo.png';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.services', path: '/services' },
    { key: 'nav.contact', path: '/contact' },
    { key: 'nav.faqs', path: '/faqs' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
                      <img
                        src={logo}
                        alt="Save The Date Logo"
                        style={{ width: '180px', height: 'auto' }}
                      />
              <span className="text-xs tracking-wider" style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}>
                EVENT PLANNING & DECORATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="relative py-2 transition-colors duration-300"
                style={{ 
                  fontFamily: 'var(--font-subheading)',
                  color: isActive(item.path) ? 'var(--gold)' : 'var(--navy)'
                }}
              >
                {t(item.key)}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--gold)' }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'mm' : 'en')}
              className="flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--gold)',
                color: 'white',
                fontFamily: 'var(--font-subheading)'
              }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language === 'en' ? 'မြန်မာ' : 'EN'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: 'var(--navy)' }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
          >
            <nav className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg transition-colors duration-300"
                  style={{ 
                    fontFamily: 'var(--font-subheading)',
                    backgroundColor: isActive(item.path) ? 'var(--gold)' : 'transparent',
                    color: isActive(item.path) ? 'white' : 'var(--navy)'
                  }}
                >
                  {t(item.key)}
                </Link>
              ))}
              <button
                onClick={() => {
                  setLanguage(language === 'en' ? 'mm' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-300"
                style={{ 
                  backgroundColor: 'var(--gold)',
                  color: 'white',
                  fontFamily: 'var(--font-subheading)'
                }}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'မြန်မာဘာသာ' : 'English'}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
