import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import ScrollToTopButton from './ScrollToTopButton';

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      <ScrollToTopButton />
      <Header />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
