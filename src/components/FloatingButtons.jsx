import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ArrowUp, Bot} from "lucide-react";
import {CAFE_INFO} from "../data/faqData";
import Chatbot from "./Chatbot";

export default function FloatingButtons({onOpenReservation}) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return() => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const rawPhoneNumber = (CAFE_INFO.phone || "18005556252").replace(/[^0-9]/g, "");

  const whatsappUrl = `https://wa.me/${rawPhoneNumber}?text=${encodeURIComponent("Hello Oak & Bean! I would like to inquire about coffee orders & reservations.")}`;

return (
    <>
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scrollTopBtn"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2C1A14] text-white shadow-2xl border border-amber-300/40 flex items-center justify-center cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp + Chatbot */}
        <div className="flex items-center gap-3">
          {/* WhatsApp button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white shadow-2xl border border-white/30 flex items-center justify-center group cursor-pointer"
          >
            <svg
              className="w-6 h-6 fill-current group-hover:rotate-6 transition-transform duration-300"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461l-.004-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </motion.a>

          {/* Chatbot button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen((prev) => !prev)}
            aria-label="Open BeanBuddy Chatbot"
            className="pointer-events-auto relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#2C1A14] via-[#5C4337] to-[#C67C4E] text-white shadow-2xl border border-amber-300/40 flex items-center justify-center group cursor-pointer"
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
          </motion.button>
        </div>
      </div>

      <Chatbot
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        onOpenReservation={onOpenReservation}
      />
    </>
  );
}