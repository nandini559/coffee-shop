import React from 'react';
import { motion } from 'framer-motion';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';
import { Star, ShoppingBag, Clock, Flame, AlertCircle } from 'lucide-react';

export default function FeaturedSection() {
  const { addToCart } = useCart();
  const { outOfStockMenuItemIds } = useInventory();
  const featuredItems = MENU_ITEMS.filter(item => item.popular).slice(0, 4);

  return (
    <section className="py-24 bg-[#FDFBF7] dark:bg-[#160F0B] relative overflow-hidden text-[#2C1A14] dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2C1A14] dark:text-[#F0C085] bg-white dark:bg-[#F0C085]/10 px-3.5 py-1.5 rounded-full border border-[#E5DCD3] dark:border-amber-400/20 shadow-sm">
              Curated Excellence
            </span>
            <h2 className="text-4xl font-serif font-bold text-[#2C1A14] dark:text-white mt-3">
              Featured Signature <span className="text-[#C67C4E] dark:text-[#F0C085]">Creations</span>
            </h2>
          </div>
          <a
            href="#menu"
            className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-[#F0C085] hover:text-[#C67C4E] dark:hover:text-[#F8E6D3] flex items-center gap-1 transition"
          >
            View Full Menu &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item) => {
            const isOutOfStock = outOfStockMenuItemIds.includes(item.id);

            return (
              <motion.div
                whileHover={{ y: -4 }}
                key={item.id}
                className={`glass-card rounded-3xl overflow-hidden border flex flex-col justify-between group transition-all duration-300 ${
                  isOutOfStock ? 'opacity-85 border-red-500/30' : 'border-[#E5DCD3] dark:border-coffee-800'
                }`}
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                        isOutOfStock ? 'grayscale-[50%]' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160F0B]/80 via-transparent to-transparent" />
                    
                    {isOutOfStock ? (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Out of Stock
                      </span>
                    ) : (
                      <span className="absolute top-4 left-4 bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {item.tags[0]}
                      </span>
                    )}

                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#160F0B]/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#E5DCD3] dark:border-white/10 text-xs font-extrabold text-[#2C1A14] dark:text-[#F0C085]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-serif font-bold text-[#2C1A14] dark:text-white group-hover:text-[#C67C4E] dark:group-hover:text-[#F0C085] transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs text-[#5C4337] dark:text-coffee-300 line-clamp-2 leading-relaxed font-medium">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs text-[#855E4C] dark:text-coffee-400 border-t border-[#E5DCD3] dark:border-coffee-800 pt-3 font-bold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085]" /> {item.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085]" /> {item.calories} kcal
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-[#2C1A14] dark:text-[#F0C085]">
                    ${item.price.toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
                    whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                    disabled={isOutOfStock}
                    onClick={() => addToCart(item)}
                    className={`p-3 rounded-2xl font-bold transition shadow-sm flex items-center gap-1.5 text-xs uppercase tracking-wider ${
                      isOutOfStock
                        ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-400/30'
                        : 'bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" /> {isOutOfStock ? 'Sold Out' : 'Add'}
                  </motion.button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
