import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Coffee } from 'lucide-react';

export default function Hero({ onOpenReservation }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#FDFBF7] dark:bg-[#160F0B] text-[#2C1A14] dark:text-white">
      
      {/* Soft Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#C67C4E]/20 dark:bg-coffee-400/20 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-coffee-900/70 border border-[#E5DCD3] dark:border-coffee-800 shadow-card-soft">
              <Sparkles className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2C1A14] dark:text-[#F0C085]">
                Next-Gen Artisanal Coffee Experience
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-[#2C1A14] dark:text-white leading-[1.1]">
              Artisanal Coffee <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C1A14] via-[#C67C4E] to-[#A35D31] dark:from-[#F0C085] dark:via-crema-light dark:to-[#C67C4E]">
                Meets AI Precision
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-[#5C4337] dark:text-coffee-200 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience hand-crafted direct-trade espresso beans, slow 20-hour cold brews, and our groundbreaking <strong className="text-[#2C1A14] dark:text-[#F0C085] font-extrabold">AI Drink Customizer</strong> designed to tailor every cup to your exact mood and flavor profile.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#custom-builder"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-sm uppercase tracking-wider shadow-sm transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Sparkles className="w-4 h-4" />
                Build Your Own Coffee
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-coffee-900 hover:bg-[#FDFBF7] dark:hover:bg-coffee-800 border border-[#E5DCD3] dark:border-coffee-700 text-[#2C1A14] dark:text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <Coffee className="w-4 h-4 text-[#C67C4E] dark:text-[#F0C085]" />
                Explore Menu
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-transparent hover:bg-white/60 dark:hover:bg-coffee-900/50 text-[#5C4337] dark:text-coffee-300 font-extrabold text-xs uppercase tracking-wider transition"
              >
                Reserve Table
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-[#E5DCD3] dark:border-coffee-800 grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#C67C4E]/10 border border-[#E5DCD3] dark:border-[#C67C4E]/20 text-[#2C1A14] dark:text-[#F0C085] shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-base font-extrabold text-[#2C1A14] dark:text-white">4.95 ★</span>
                  <span className="text-xs text-[#5C4337] dark:text-coffee-400 font-bold">140+ Reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#C67C4E]/10 border border-[#E5DCD3] dark:border-[#C67C4E]/20 text-[#2C1A14] dark:text-[#F0C085] shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-base font-extrabold text-[#2C1A14] dark:text-white">15 Mins</span>
                  <span className="text-xs text-[#5C4337] dark:text-coffee-400 font-bold">Express Delivery</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#C67C4E]/10 border border-[#E5DCD3] dark:border-[#C67C4E]/20 text-[#2C1A14] dark:text-[#F0C085] shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-base font-extrabold text-[#2C1A14] dark:text-white">100% Organic</span>
                  <span className="text-xs text-[#5C4337] dark:text-coffee-400 font-bold">Direct-Trade</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden glass-card p-4 border border-[#E5DCD3] dark:border-amber-400/30 shadow-xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=80"
                alt="Signature Cold Brew"
                className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
              />
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-[#E5DCD3] dark:border-white/20 shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <span className="text-[11px] font-extrabold text-[#5C4337] dark:text-[#F0C085] block uppercase tracking-wider">Today's Special</span>
                      <span className="text-sm font-serif font-bold text-[#2C1A14] dark:text-white">Nitro Lavender Foam Brew</span>
                    </div>
                  </div>
                  <span className="text-base font-black text-[#2C1A14] dark:text-[#F0C085]">$6.20</span>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
