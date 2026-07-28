import React from "react";
import {motion} from "framer-motion";
import {ArrowRight, Coffee, Sparkles, Star} from "lucide-react";

export default function Hero({onOpenReservation}) {
  // Floating animation variants for floating coffee beans
  const floatAnim1 = {
    y: [
      0, -14, 0
    ],
    rotate: [
      0, 10, -5, 0
    ],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const floatAnim2 = {
    y: [
      0, 12, 0
    ],
    rotate: [
      0, -12, 8, 0
    ],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5
    }
  };

  const floatAnim3 = {
    y: [
      0, -18, 0
    ],
    rotate: [
      0, 15, -15, 0
    ],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }
  };

  return (<section className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:py-24 flex items-center justify-center bg-transparent text-[#2C1A14] dark:text-white">
    {/* BACKGROUND WAVE SPLIT (Cream Left / Dark Brown Right) */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Right side dark coffee background shape */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full bg-[#2C1A14]/90 dark:bg-[#1A0E0A]/95 rounded-l-[100px] lg:rounded-l-[200px] shadow-2xl transition-all duration-500"/>{" "}
      {/* Decorative background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C67C4E]/20 dark:bg-amber-500/10 blur-[130px] rounded-full"/>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* LEFT COLUMN: TYPOGRAPHY & PRICING PILLS */}
        <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7,
            ease: "easeOut"
          }} className="lg:col-span-6 space-y-5 lg:space-y-6 text-left pr-0 lg:pr-4">
          {/* Giant Main Display Headline */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tight leading-[1.1] text-[#2C1A14] dark:text-white pb-1">
              Awaken Your
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tight leading-[1.1] bg-gradient-to-r from-[#C67C4E] via-[#A35D31] to-[#855E4C] dark:from-[#F0C085] dark:to-[#C67C4E] bg-clip-text text-transparent pb-1">
              Senses with
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tight leading-[1.1] bg-gradient-to-r from-[#C67C4E] via-[#A35D31] to-[#855E4C] dark:from-[#F0C085] dark:to-[#C67C4E] bg-clip-text text-transparent pb-1">
              Every Sip
            </h1>
          </div>

          {/* Tagline & Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#2C1A14] dark:text-amber-200">
              Cool. Smooth. Perfect.
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[#5C4337] dark:text-coffee-200 font-medium max-w-md leading-relaxed">
              Chill out with every sip – artisanal cold coffee, slow-brewed for 20 hours for your ultimate refreshment.
            </p>
          </div>

          {/* Pricing Pills (BIG SHARE $25, MINI SHAKE $11) */}
          {/* <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#2C1A14] text-white dark:bg-[#1D130E] dark:text-white border border-[#3D291F] dark:border-amber-400/30 shadow-md flex items-center justify-between gap-5">
              <span className="text-xs font-black uppercase tracking-wider text-amber-200/90">
                Big Share
              </span>
              <span className="text-base sm:text-lg font-black text-amber-400">$25</span>
            </div>

            <div className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#2C1A14] text-white dark:bg-[#1D130E] dark:text-white border border-[#3D291F] dark:border-amber-400/30 shadow-md flex items-center justify-between gap-5">
              <span className="text-xs font-black uppercase tracking-wider text-amber-200/90">
                Mini Shake
              </span>
              <span className="text-base sm:text-lg font-black text-amber-400">$11</span>
            </div>

            <div className="px-3.5 py-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-[#2C1A14] dark:text-[#F0C085] flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.95 ★ (140+ Reviews)</span>
            </div>
          </div> */
          }

          {/* Primary Order Button */}
          <div className="pt-2 flex items-center gap-4">
            <motion.a whileHover={{
                scale: 1.05,
                x: 5
              }} whileTap={{
                scale: 0.95
              }} href="#menu" className="px-8 py-3.5 rounded-full bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all duration-300">
              <span>ORDER NOW</span>
              <ArrowRight className="w-4 h-4"/>
            </motion.a>

            <button onClick={onOpenReservation} className="px-8 py-3.5 rounded-full bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all duration-300">
              Reserve Table
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: CENTERPIECE ICED COFFEE & FLOATING COFFEE BEANS */}
        <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="lg:col-span-6 relative flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
          {/* FLOATING COFFEE BEANS (Scattered around the drink) */}
          {/* Top Left Floating Bean */}
          <motion.div animate={floatAnim1} className="absolute top-2 left-4 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 opacity-90 drop-shadow-lg gpu-render">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#3D291F] dark:text-[#C67C4E] fill-current">
              <ellipse cx="50" cy="50" rx="35" ry="45" transform="rotate(-25 50 50)"/>
              <path d="M48 10 Q 55 50 48 90" stroke="#FAF6F0" strokeWidth="6" fill="none"/>
            </svg>
          </motion.div>
          {/* Top Right Floating Bean */}
          <motion.div animate={floatAnim2} className="absolute top-4 right-6 sm:right-8 z-20 w-12 h-12 sm:w-14 sm:h-14 opacity-90 drop-shadow-xl gpu-render">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#4A3022] dark:text-[#D48A5A] fill-current">
              <ellipse cx="50" cy="50" rx="38" ry="48" transform="rotate(35 50 50)"/>
              <path d="M52 8 Q 45 50 52 92" stroke="#1A0E0A" strokeWidth="7" fill="none"/>
            </svg>
          </motion.div>
          {/* Bottom Left Floating Bean */}
          <motion.div animate={floatAnim3} className="absolute bottom-6 left-2 sm:left-4 z-20 w-14 h-14 sm:w-16 sm:h-16 opacity-85 blur-[0.5px] drop-shadow-xl gpu-render">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#2C1A14] dark:text-[#855E4C] fill-current">
              <ellipse cx="50" cy="50" rx="40" ry="50" transform="rotate(-40 50 50)"/>
              <path d="M47 5 Q 56 50 47 95" stroke="#F5EFE6" strokeWidth="7" fill="none"/>
            </svg>
          </motion.div>
          {/* Center Background Liquid Splash Ring */}
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tr from-[#3D291F]/40 via-[#C67C4E]/30 to-amber-500/20 blur-[50px] animate-pulse pointer-events-none"/>{" "}
          {/* CENTERPIECE ICED COFFEE CUP */}
          <div className="relative z-10 max-w-xs sm:max-w-sm lg:max-w-md w-full flex flex-col items-center">
            <motion.div whileHover={{
                scale: 1.04,
                rotate: 2
              }} transition={{
                type: "spring",
                stiffness: 200
              }} className="relative group cursor-pointer">
              {/* Main Hero Image */}
              <img src="/iced_coffee_hero.png" alt="Craft Iced Cold Coffee" className="w-full h-auto max-h-[340px] sm:max-h-[400px] lg:max-h-[430px] xl:max-h-[460px] object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 rounded-full"/>{" "}
              {/* Wooden Coaster Base Shadow */}
              <div className="w-3/4 h-5 mx-auto -mt-3 bg-[#1A0E0A]/60 dark:bg-black/80 blur-md rounded-full"/>
            </motion.div>

            {/* Floating Quality Badge */}
            <motion.div initial={{
                y: 20,
                opacity: 0
              }} animate={{
                y: 0,
                opacity: 1
              }} transition={{
                delay: 0.6,
                duration: 0.5
              }} className="mt-3 px-4 py-2 rounded-full bg-[#FAF6F0]/90 dark:bg-[#1D130E]/90 border border-[#2C1A14]/20 dark:border-amber-400/30 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-black text-[#2C1A14] dark:text-[#F0C085]">
              <Sparkles className="w-3.5 h-3.5 text-[#C67C4E] animate-pulse"/>
              <span>Handcrafted Cold Brew • 100% Single Origin Arabica</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>);
}
