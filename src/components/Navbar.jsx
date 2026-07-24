import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { Coffee, ShoppingBag, Sun, Moon, Menu as MenuIcon, X, User, ShieldAlert } from 'lucide-react';

export default function Navbar({ onOpenReservation }) {
  const { theme, toggleTheme } = useTheme();
  const { totalItemCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen, setAuthTab } = useAuth();
  const { outOfStockIngredients, setIsAdminDashboardOpen } = useInventory();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'AI Builder', href: '#custom-builder' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 bg-[#FDFBF7]/90 dark:bg-[#160F0B]/90 backdrop-blur-xl border-b border-[#E5DCD3] dark:border-coffee-800 shadow-card-soft' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="w-10 h-10 rounded-xl bg-[#2C1A14] text-[#FDFBF7] dark:bg-[#C67C4E] dark:text-[#160F0B] flex items-center justify-center shadow-sm"
          >
            <Coffee className="w-5 h-5" />
          </motion.div>
          <div>
            <span className="text-xl font-serif font-black tracking-tight text-[#2C1A14] dark:text-white flex items-center gap-1">
              OAK <span className="text-[#C67C4E] dark:text-[#F0C085] font-sans font-light">& BEAN</span>
            </span>
            <span className="block text-[9px] tracking-widest uppercase font-bold text-[#855E4C] dark:text-coffee-300 -mt-1">
              Artisanal Coffee & AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-extrabold uppercase tracking-wider text-[#3D291F] dark:text-coffee-200 hover:text-[#C67C4E] dark:hover:text-[#F0C085] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Admin Inventory Button (If Admin role) */}
          {user?.role === 'admin' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdminDashboardOpen(true)}
              className="relative p-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#2C1A14] dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-sm"
              title="Admin Inventory Dashboard"
            >
              <ShieldAlert className="w-4 h-4 text-[#C67C4E]" />
              <span className="hidden xl:inline">Inventory</span>
              {outOfStockIngredients.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </motion.button>
          )}

          {/* User Auth Profile Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setAuthTab(user ? 'profile' : 'login');
              setIsAuthModalOpen(true);
            }}
            className="p-2.5 rounded-xl bg-white dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-[#F0C085] shadow-sm flex items-center gap-2"
          >
            {user ? (
              <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-[#C67C4E]" />
            ) : (
              <User className="w-4 h-4" />
            )}
            <span className="hidden lg:inline text-xs font-extrabold uppercase tracking-wider">
              {user ? user.name.split(' ')[0] : 'Sign In'}
            </span>
          </motion.button>

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl bg-white dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-[#F0C085] shadow-sm"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          {/* Cart Drawer Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
            className="relative px-4 py-2.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order</span>
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C67C4E] dark:bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {totalItemCount}
              </span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#2C1A14] dark:text-coffee-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FDFBF7] dark:bg-[#160F0B] border-b border-[#E5DCD3] dark:border-coffee-800 px-6 py-6 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-100 hover:text-[#C67C4E]"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReservation) onOpenReservation();
              }}
              className="w-full mt-4 py-3 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-bold text-xs uppercase tracking-wider"
            >
              Reserve a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
