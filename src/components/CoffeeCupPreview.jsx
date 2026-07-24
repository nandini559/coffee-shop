import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoffeeCupPreview({ coffeeData }) {
  const { baseObj, milkObj, syrupObj, whipObj } = coffeeData;

  const hasMilk = milkObj && milkObj.id !== 'none';
  const hasWhip = whipObj && whipObj.id !== 'none';

  let coffeeHeightPct = 75;
  let milkHeightPct = 0;
  let whipHeightPct = 0;

  if (hasMilk) {
    coffeeHeightPct = 40;
    milkHeightPct = 35;
  }
  if (hasWhip) {
    whipHeightPct = 15;
    coffeeHeightPct -= 5;
  }

  const baseColor = baseObj ? baseObj.color : '#2b1b17';
  const milkColor = milkObj ? milkObj.color : '#f1cc9c';
  const whipColor = whipObj ? whipObj.color : '#ffffff';
  const syrupColor = syrupObj && syrupObj.id === 'caramel' ? '#c67c4e' : syrupObj && syrupObj.id === 'mocha' ? '#4a2c20' : '#d4a359';

  return (
    <div className="relative flex flex-col items-center justify-center p-6 glass-panel rounded-3xl overflow-hidden border border-coffee-300 dark:border-coffee-400/20 shadow-glow">
      
      {/* Motion Steam Particles */}
      <div className="relative h-12 w-24 flex justify-center items-end mb-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, -50],
              x: [0, (i % 2 === 0 ? 8 : -8), (i % 2 === 0 ? -6 : 6)],
              opacity: [0, 0.7, 0],
              scale: [0.6, 1.2, 1.6]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8
            }}
            className="absolute bottom-0 w-3 h-3 rounded-full bg-amber-400/40 dark:bg-white/40 blur-[1px]"
            style={{ left: `${30 + i * 20}%` }}
          />
        ))}
      </div>

      {/* Coffee Cup Container */}
      <div className="relative w-56 h-64 flex flex-col items-center justify-end">
        
        {/* Cup Handle */}
        <div className="absolute right-3 top-16 w-12 h-28 border-4 border-coffee-400/40 dark:border-coffee-300/30 rounded-r-3xl pointer-events-none" />

        {/* Outer Glass Cup */}
        <div className="relative w-48 h-56 bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-b-[40px] rounded-t-lg border-2 border-white/60 dark:border-coffee-400/30 shadow-2xl overflow-hidden flex flex-col justify-end p-2">
          
          {/* Whipped Cream Layer */}
          <AnimatePresence>
            {hasWhip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${whipHeightPct}%`, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="w-full rounded-t-xl shadow-md relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: whipColor }}
              >
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-black/20" />
                <motion.span
                  key={whipObj.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  className="text-[10px] font-extrabold text-coffee-950 uppercase tracking-widest z-10"
                >
                  {whipObj.name.split(' ')[0]}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Milk Layer */}
          <AnimatePresence>
            {hasMilk && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${milkHeightPct}%`, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="w-full relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: milkColor }}
              >
                {/* Syrup Swirl Motion Accent */}
                {syrupObj && syrupObj.id !== 'none' && (
                  <motion.div
                    animate={{ x: [-20, 20, -20], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-x-0 h-2 blur-[1px]"
                    style={{ top: '40%', backgroundColor: syrupColor }}
                  />
                )}
                <motion.span
                  key={milkObj.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-extrabold text-coffee-900/90 uppercase tracking-wider z-10"
                >
                  {milkObj.name.replace('Organic ', '').replace('Barista ', '')}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coffee Base Layer */}
          <motion.div
            animate={{ height: `${coffeeHeightPct}%`, backgroundColor: baseColor }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="w-full rounded-b-[30px] relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />
            <motion.span
              key={baseObj.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs font-black text-crema-light uppercase tracking-widest z-10 drop-shadow-md"
            >
              {baseObj ? baseObj.name : 'Espresso'}
            </motion.span>
          </motion.div>

          {/* Glass Reflection Highlight */}
          <div className="absolute left-2 top-2 bottom-4 w-3 bg-white/30 rounded-full blur-[1px] pointer-events-none" />
        </div>

        {/* Cup Saucer Base */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-56 h-4 bg-gradient-to-r from-coffee-600 via-coffee-400 to-coffee-600 dark:from-coffee-900 dark:via-coffee-700 dark:to-coffee-900 rounded-full shadow-lg border-t border-white/30 mt-1"
        />
      </div>

      {/* Live Badge */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-coffee-200 dark:bg-coffee-400/20 text-coffee-800 dark:text-coffee-300 border border-coffee-300 dark:border-coffee-400/30">
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500"
          />
          Live Interactive Brew Visualizer
        </span>
      </div>

    </div>
  );
}
