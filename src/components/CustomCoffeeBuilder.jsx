import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  COFFEE_BASES, 
  MILK_OPTIONS, 
  SUGAR_LEVELS, 
  SYRUP_OPTIONS, 
  EXTRA_BOOSTS, 
  WHIPPED_CREAM,
  calculateCustomCoffee 
} from '../utils/aiBaristaLogic';
import CoffeeCupPreview from './CoffeeCupPreview';
import { useCart } from '../context/CartContext';
import { Sparkles, ShoppingBag, Flame, Coffee, HeartHandshake, CheckCircle } from 'lucide-react';

export default function CustomCoffeeBuilder() {
  const { addToCart } = useCart();

  const [config, setConfig] = useState({
    base: 'espresso-double',
    milk: 'oat',
    sugarLevel: '50',
    syrup: 'caramel',
    boosts: ['cinnamon'],
    whip: 'vanilla-whip'
  });

  const coffeeAnalysis = useMemo(() => {
    return calculateCustomCoffee(config);
  }, [config]);

  const toggleBoost = (boostId) => {
    setConfig(prev => {
      const exists = prev.boosts.includes(boostId);
      return {
        ...prev,
        boosts: exists ? prev.boosts.filter(b => b !== boostId) : [...prev.boosts, boostId]
      };
    });
  };

  const handleAddToCart = () => {
    const customItem = {
      id: 'custom-' + Date.now(),
      name: coffeeAnalysis.name,
      price: coffeeAnalysis.price,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
      description: coffeeAnalysis.flavorProfile,
      pairingRecommendation: coffeeAnalysis.pastryPairing,
      story: coffeeAnalysis.story,
      category: 'custom',
      quantity: 1
    };
    addToCart(customItem);
  };

  return (
    <section id="custom-builder" className="py-24 relative overflow-hidden bg-[#FDFBF7] dark:bg-[#160F0B] text-[#2C1A14] dark:text-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-white dark:bg-coffee-900/70 text-[#2C1A14] dark:text-[#F0C085] border border-[#E5DCD3] dark:border-coffee-800 uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C67C4E] dark:text-[#F0C085]" />
            AI Barista Customization Lab
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1A14] dark:text-white tracking-tight leading-tight">
            Build Your Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C1A14] via-[#C67C4E] to-[#A35D31] dark:from-coffee-300 dark:via-crema dark:to-amber-400">Masterpiece Brew</span>
          </h2>
          <p className="mt-4 text-base text-[#5C4337] dark:text-coffee-200 font-medium">
            Select your preferences and watch our AI Barista calculate pricing, generate a sensory flavor profile, and recommend the perfect pastry pairing in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Options (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 glass-card p-6 sm:p-8 rounded-3xl border border-[#E5DCD3] dark:border-coffee-800">
            
            {/* 1. Coffee Base */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 mb-3 block flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#C67C4E] dark:text-[#F0C085]" /> 1. Select Coffee Base
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {COFFEE_BASES.map(b => (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    key={b.id}
                    onClick={() => setConfig(prev => ({ ...prev, base: b.id }))}
                    className={`p-3.5 text-left rounded-xl border text-xs font-bold transition-all ${
                      config.base === b.id
                        ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] border-[#2C1A14] shadow-sm'
                        : 'bg-white dark:bg-coffee-900/60 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-200 hover:border-[#C67C4E]'
                    }`}
                  >
                    <div>{b.name}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">${b.basePrice.toFixed(2)}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 2. Milk Selection */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 mb-3 block">
                2. Choose Milk or Plant Dairy
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {MILK_OPTIONS.map(m => (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    key={m.id}
                    onClick={() => setConfig(prev => ({ ...prev, milk: m.id }))}
                    className={`p-3.5 text-left rounded-xl border text-xs font-bold transition-all ${
                      config.milk === m.id
                        ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] border-[#2C1A14] shadow-sm'
                        : 'bg-white dark:bg-coffee-900/60 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-200 hover:border-[#C67C4E]'
                    }`}
                  >
                    <div>{m.name}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{m.price > 0 ? `+$${m.price.toFixed(2)}` : 'Included'}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 3. Sugar Level */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 mb-3 block">
                3. Sweetness / Sugar Level
              </label>
              <div className="grid grid-cols-5 gap-2">
                {SUGAR_LEVELS.map(s => (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    key={s.id}
                    onClick={() => setConfig(prev => ({ ...prev, sugarLevel: s.id }))}
                    className={`py-2.5 px-1 text-center rounded-xl border text-xs font-extrabold transition-all ${
                      config.sugarLevel === s.id
                        ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] border-[#2C1A14] shadow-sm'
                        : 'bg-white dark:bg-coffee-900/60 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-300 hover:border-[#C67C4E]'
                    }`}
                  >
                    <div>{s.percent}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 4. Gourmet Syrup */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 mb-3 block">
                4. Infuse Gourmet Syrup
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SYRUP_OPTIONS.map(s => (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    key={s.id}
                    onClick={() => setConfig(prev => ({ ...prev, syrup: s.id }))}
                    className={`p-3.5 text-left rounded-xl border text-xs font-bold transition-all ${
                      config.syrup === s.id
                        ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] border-[#2C1A14] shadow-sm'
                        : 'bg-white dark:bg-coffee-900/60 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-200 hover:border-[#C67C4E]'
                    }`}
                  >
                    <div>{s.name}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{s.price > 0 ? `+$${s.price.toFixed(2)}` : 'None'}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 5. Extra Espresso & Boosts */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 mb-3 block">
                5. Add Extra Shots & Wellness Boosts
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {EXTRA_BOOSTS.map(b => {
                  const active = config.boosts.includes(b.id);
                  return (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      key={b.id}
                      onClick={() => toggleBoost(b.id)}
                      className={`p-3.5 text-left rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                        active
                          ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] border-[#2C1A14]'
                          : 'bg-white dark:bg-coffee-900/60 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-300 hover:border-[#C67C4E]'
                      }`}
                    >
                      <span>{b.name}</span>
                      {active && <CheckCircle className="w-4 h-4 text-white dark:text-[#160F0B] shrink-0 ml-1" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 6. Whipped Cream */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 mb-3 block">
                6. Crown Topping / Cold Foam
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {WHIPPED_CREAM.map(w => (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    key={w.id}
                    onClick={() => setConfig(prev => ({ ...prev, whip: w.id }))}
                    className={`p-3.5 text-left rounded-xl border text-xs font-bold transition-all ${
                      config.whip === w.id
                        ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] border-[#2C1A14] shadow-sm'
                        : 'bg-white dark:bg-coffee-900/60 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-200 hover:border-[#C67C4E]'
                    }`}
                  >
                    <div>{w.name}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{w.price > 0 ? `+$${w.price.toFixed(2)}` : 'None'}</div>
                  </motion.button>
                ))}
              </div>
            </div>

          </div>

          {/* Live Visual Summary Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <CoffeeCupPreview coffeeData={coffeeAnalysis} />

            <div className="glass-panel p-6 rounded-3xl border border-[#E5DCD3] dark:border-amber-400/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E5DCD3] dark:border-coffee-800 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2C1A14] dark:text-[#F0C085] bg-white dark:bg-[#F0C085]/10 px-2.5 py-1 rounded-md border border-[#E5DCD3] dark:border-transparent">
                    AI Generated Recipe
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C1A14] dark:text-white mt-1">
                    {coffeeAnalysis.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#2C1A14] dark:text-[#F0C085]">
                    ${coffeeAnalysis.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="mb-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 mb-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085]" /> Flavor Profile
                </h4>
                <p className="text-xs text-[#5C4337] dark:text-coffee-200 leading-relaxed font-medium italic">
                  "{coffeeAnalysis.flavorProfile}"
                </p>
              </div>

              {/* Pastry Recommendation */}
              <div className="mb-4 bg-white/90 dark:bg-coffee-900/60 p-3.5 rounded-xl border border-[#E5DCD3] dark:border-coffee-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FDFBF7] dark:bg-[#F0C085]/20 flex items-center justify-center shrink-0 text-[#2C1A14] dark:text-[#F0C085]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-[#855E4C] dark:text-coffee-400">Recommended Pastry Pair</span>
                  <p className="text-xs font-bold text-[#2C1A14] dark:text-amber-200">{coffeeAnalysis.pastryPairing}</p>
                </div>
              </div>

              {/* Story */}
              <div className="mb-6 p-3.5 rounded-xl bg-white/70 dark:bg-amber-500/10 border border-[#E5DCD3] dark:border-amber-500/20 text-xs text-[#2C1A14] dark:text-amber-100 leading-snug">
                <span className="font-extrabold text-[#2C1A14] dark:text-[#F0C085] block mb-1">📖 AI Story snippet:</span>
                "{coffeeAnalysis.story}"
              </div>

              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-sm uppercase tracking-wider shadow-sm transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                Add Custom Brew to Cart – ${coffeeAnalysis.price.toFixed(2)}
              </motion.button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
