import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginModal } from '../admin/LoginModal';

const NAV_LINKS = [
  { name: 'About Me', href: '/about' },
  { name: 'Education', href: '/education' },
  { name: 'Experience', href: '/experience' },
  { name: 'Publications', href: '/publications' },
  { name: 'Professional & Academic Profiles', href: '/profiles' },
  { name: 'Projects', href: '/projects' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for ?login=true redirect from protected routes
  useEffect(() => {
    if (location.search.includes('login=true')) {
      setIsLoginModalOpen(true);
      // Clean up the URL
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate, location.pathname]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[104px]',
          isScrolled
            ? 'bg-primary-bg/95 backdrop-blur-md shadow-sm border-b border-gold'
            : 'bg-primary-bg border-b border-border'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col h-full">
          
          {/* Top Row: Name and Admin Actions */}
          <div className="flex items-center justify-between h-[60px]">
            {/* Identity */}
            <Link to="/about" className="group text-left">
              <h1 className="text-lg md:text-xl font-bold text-primary-text font-serif tracking-wide group-hover:text-gold transition-colors">
                Mr.A. Arnold Christopher 
              </h1>
            </Link>

            {/* Right Actions (Admin Login) */}
            <div className="hidden lg:flex items-center">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-2 rounded-full border border-gold/40 text-primary-text hover:bg-gold hover:text-primary-bg transition-colors text-xs font-bold tracking-wider uppercase"
              >
                <span>Admin Login</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-primary-text hover:text-gold transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation Links */}
          <div className="hidden lg:flex items-center justify-center h-[44px] space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => cn(
                  'text-sm font-medium transition-colors hover:text-gold relative py-1',
                  isActive ? 'text-gold' : 'text-primary-text'
                )}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-primary-bg pt-28 px-6 pb-6 lg:hidden flex flex-col space-y-6 overflow-y-auto"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  'text-xl font-serif transition-colors text-left',
                  isActive ? 'text-gold' : 'text-primary-text'
                )}
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* Mobile Admin Actions */}
            <div className="flex flex-col space-y-4 pt-6 border-t border-border mt-auto">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="flex items-center justify-center space-x-2 px-4 py-3 mt-2 rounded-full border border-gold/40 text-primary-text hover:bg-gold hover:text-primary-bg transition-colors text-sm font-bold tracking-wider uppercase"
              >
                <span>Admin Login</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
