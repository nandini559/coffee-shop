import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Bot } from 'lucide-react';
import { CAFE_INFO } from '../data/faqData';
import Chatbot from './Chatbot';

export default function FloatingButtons({ onOpenReservation }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Convert phone number for WhatsApp wa.me URL format (digits only: 18005556252)
  const rawPhoneNumber = CAFE_INFO.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${rawPhoneNumber || '18005556252'}?text=${encodeURIComponent('Hello Oak & Bean! I would like to inquire about coffee orders & reservations.')}`;

  return (
    <>
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3 pointer-events-none">
        {/* 1. Scroll to Top Floating Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scrollTopBtn"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] shadow-2xl border border-amber-300/40 dark:border-amber-900/40 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#C67C4E] group"
            >
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 2. WhatsApp Floating Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white shadow-2xl border border-white/30 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366] group"
        >
          <svg
            className="w-6 h-6 fill-current group-hover:rotate-6 transition-transform duration-300"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 2c-5.514 0-9.997 4.485-9.997 10 0 1.966.571 3.797 1.559 5.353l-1.593 5.82 5.968-1.565c1.49.808 3.197 1.392 4.963 1.392 5.514 0 9.997-4.485 9.997-10s-4.483-10-9.997-10zm0 18.067c-1.63 0-3.167-.447-4.498-1.226l-.323-.19-3.337.874.89-3.25-.208-.33c-.876-1.39-1.338-3.003-1.338-4.945 0-4.453 3.621-8.074 8.074-8.074s8.074 3.621 8.074 8.074-3.621 8.074-8.074 8.074zm4.428-6.046c-.243-.122-1.438-.71-1.662-.791-.224-.082-.387-.122-.55.122-.163.245-.632.791-.775.954-.143.163-.285.184-.528.061-.243-.122-1.028-.379-1.958-1.209-.724-.646-1.213-1.444-1.356-1.688-.143-.245-.015-.377.107-.498.11-.11.243-.285.365-.428.122-.143.163-.245.245-.408.082-.163.041-.306-.02-.428-.061-.122-.55-1.326-.753-1.815-.198-.478-.4-.414-.55-.422-.143-.008-.306-.008-.469-.008-.163 0-.428.061-.652.306-.224.245-.856.837-.856 2.041 0 1.204.876 2.366.998 2.529.122.163 1.725 2.635 4.179 3.693.583.251 1.039.401 1.394.514.586.186 1.119.16 1.54.098.47-.07 1.438-.588 1.641-1.156.204-.568.204-1.054.143-1.156-.061-.102-.224-.163-.467-.285z" />
          </svg>
        </motion.a>

        {/* 3. AI Barista Chatbot Launcher Button (Positioned directly below WhatsApp) */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open AI Barista Chatbot"
          className="pointer-events-auto relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#2C1A14] via-[#5C4337] to-[#C67C4E] dark:from-[#C67C4E] dark:to-[#F0C085] text-white dark:text-[#160F0B] shadow-2xl border border-amber-300/40 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#C67C4E] group"
        >
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#160F0B] animate-pulse" />
        </motion.button>
      </div>

      {/* Responsive Chatbot Window */}
      <Chatbot
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        onOpenReservation={onOpenReservation}
      />
    </>
  );
}
