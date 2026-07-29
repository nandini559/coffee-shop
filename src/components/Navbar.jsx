import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useTheme} from "../context/ThemeContext";
import {useCart} from "../context/CartContext";
import {useAuth} from "../context/AuthContext";
import {
  Coffee,
  ShoppingBag,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  User
} from "lucide-react";

export default function Navbar({onOpenReservation}) {
  const {theme, toggleTheme} = useTheme();
  const {totalItemCount, setIsCartOpen} = useCart();
  const {user, setIsAuthModalOpen, setAuthTab} = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return() => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "#"
    }, {
      name: "Menu",
      href: "#menu"
    }, {
      name: "About",
      href: "#about"
    }, {
      name: "Reviews",
      href: "#reviews"
    }, {
      name: "Gallery",
      href: "#gallery"
    }, {
      name: "Contact",
      href: "#contact"
    }
  ];

  const handleMobileLinkClick = href => {
    setMobileMenuOpen(false);
    // console.log("Mobile link clicked:", href);
    requestAnimationFrame(() => {
      if (href === "#") {
        window.scrollTo({top: 0, behavior: "smooth"});
        return;
      }

      document.querySelector(href)
        ?.scrollIntoView({behavior: "smooth"});
    });
  };

  const handleDesktopLinkClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      if (!targetId) {
        window.scrollTo({top: 0, behavior: "smooth"});
      } else {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({behavior: "smooth"});
        }
      }
    }
  };

  return (<motion.header initial={{
      y: -50,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.5,
      ease: "easeOut"
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "py-3 bg-white/90 dark:bg-[#160F0B]/90 backdrop-blur-xl shadow-lg"
      : "py-4 bg-transparent"}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <a href="#" onClick={e => {
          e.preventDefault();
          window.scrollTo({top: 0, behavior: "smooth"});
          setMobileMenuOpen(false);
        }} className="flex items-center gap-3 group cursor-pointer">
        <motion.div whileTap={{
            scale: 0.95
          }} className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2C1A14] via-[#5C4337] to-[#C67C4E] p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-amber-300/40">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(240,192,133,0.35),transparent_70%)]"/>{" "}
          {/* Artisanal Coffee Cup & Bean Emblem SVG */}
          <svg className="w-6 h-6 text-[#FDFBF7] relative z-10 filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3c.5 1 1.5 1.5 1.5 2.5s-1 1.5-.5 2.5" className="animate-pulse" stroke="#F0C085" strokeWidth="1.5"/>
            <path d="M12 2c.5 1 1.5 1.5 1.5 2.5s-1 1.5-.5 2.5" className="animate-pulse" stroke="#F0C085" strokeWidth="1.5" style={{
                animationDelay: "300ms"
              }}/>
            <path d="M18 3c.5 1 1.5 1.5 1.5 2.5s-1 1.5-.5 2.5" className="animate-pulse" stroke="#F0C085" strokeWidth="1.5" style={{
                animationDelay: "600ms"
              }}/>
            <path d="M17 8h1a4 4 0 0 1 0 8h-1" stroke="#FDFBF7" strokeWidth="2"/>
            <path d="M3 8h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" fill="currentColor" fillOpacity="0.15" stroke="#FDFBF7" strokeWidth="2"/>
            <line x1="6" y1="21" x2="14" y2="21" stroke="#FDFBF7" strokeWidth="2"/>
          </svg>
        </motion.div>
        <div>
          <span className="text-xl font-serif font-black tracking-tight text-[#2C1A14] dark:text-white flex items-center gap-1">
            OAK{" "}
            <span className="text-[#C67C4E] dark:text-[#F0C085] font-sans font-light">
              & BEAN
            </span>
          </span>
        </div>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-12">
        {
          navLinks.map((link, index) => (<button key={link.name} onClick={e => handleDesktopLinkClick(e, link.href)} className={`relative text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            scrolled
              ? "text-[#3D291F] dark:text-coffee-100 hover:text-[#C67C4E] dark:hover:text-[#F0C085]"
              : index < 3
                ? "text-[#2C1A14] hover:text-[#6F4E37]"
                : "text-[#FFF8F2] hover:text-[#F5E6D3]"}`}>
            {link.name}
            <span className="absolute left-0 -bottom-1 h-[2px] bg-[#C67C4E] transition-all duration-300 w-0 hover:w-full"/>
          </button>))
        }
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2.5">
        {/* Cart Drawer Button */}
        <motion.button whileTap={{
            scale: 0.96
          }} onClick={e => {
            e.stopPropagation();
            setIsCartOpen(true);
          }} aria-label="Open Cart" className="relative px-4 py-2.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer touch-manipulation">
          <ShoppingBag className="w-4 h-4"/>
          <span className="hidden sm:inline">Order</span>
          {
            totalItemCount > 0 && (<span className="absolute -top-1.5 -right-1.5 bg-[#C67C4E] dark:bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {totalItemCount}
            </span>)
          }
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button type="button" aria-label="Toggle Mobile Menu" onClick={e => {
            e.stopPropagation();
            setMobileMenuOpen(prev => !prev);
          }} className="md:hidden p-2 rounded-xl text-[#2C1A14] dark:text-coffee-200 cursor-pointer touch-manipulation select-none">
          {
            mobileMenuOpen
              ? (<X className="w-6 h-6"/>)
              : (<MenuIcon className="w-6 h-6"/>)
          }
        </button>
      </div>
    </div>

    {/* Mobile Drawer */}
    <AnimatePresence>
      {
        mobileMenuOpen && (<div initial={{
            opacity: 0,

            height: 0
          }} animate={{
            opacity: 1,

            height: "auto"
          }} exit={{}} className="md:hidden bg-[#FDFBF7] dark:bg-[#160F0B] border-b border-[#E5DCD3] dark:border-coffee-800 px-6 py-6 space-y-4 shadow-xl">
          {
            navLinks.map(link => (<button key={link.name} onClick={e => handleMobileLinkClick(link.href)} className="block text-sm font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-100 hover:text-[#C67C4E] py-1 cursor-pointer touch-manipulation">
              {link.name}
            </button>))
          }
          <button type="button" onClick={e => {
              e.stopPropagation();
              if (onOpenReservation) 
                onOpenReservation();
              setTimeout(() => setMobileMenuOpen(false), 10);
            }} className="w-full mt-4 py-3 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-bold text-xs uppercase tracking-wider cursor-pointer touch-manipulation">
            Reserve a Table
          </button>
        </div>)
      }
    </AnimatePresence>
  </motion.header>);
}
