import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {CATEGORIES, MENU_ITEMS} from "../data/menuData";
import {useCart} from "../context/CartContext";
import {
  Search,
  Star,
  ShoppingBag,
  X,
  ShieldAlert,
  Sparkles
} from "lucide-react";

export default function MenuSection() {
  const {addToCart} = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [activeItemModal, setActiveItemModal] = useState(null);

  const tagsList = ["Best Seller", "Vegan", "Gluten-Free", "Organic", "Signature"];

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || item.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
    return matchesCategory && matchesSearch && matchesTag;
  });

  return (<section id="menu" className="py-20 sm:py-24 lg:py-28 bg-transparent text-[#2C1A14] dark:text-white relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1A14] dark:text-white mt-2">
          {"Our "}
          <span className="text-[#C67C4E] dark:text-[#F0C085]">Menu</span>
        </h2>
        <p className="mt-2 text-[#5C4337] dark:text-coffee-200 text-xs sm:text-sm lg:text-base font-medium">
          Explore our ethically harvested single-origin brews, home-made foams, and freshly baked pastries.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#855E4C] dark:text-coffee-400"/>
          <input type="text" placeholder="Search espresso, cold brew, matcha, sourdough, croissant..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/90 dark:bg-[#160F0B]/90 border border-[#E5DCD3] dark:border-coffee-800 focus:border-[#C67C4E] text-[#2C1A14] dark:text-white text-xs sm:text-sm font-medium placeholder-[#855E4C] focus:outline-none transition shadow-sm backdrop-blur-md"/>{" "}
          {
            searchQuery && (<button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-900">
              <X className="w-4 h-4"/>
            </button>)
          }
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10 flex-wrap sm:flex-nowrap overflow-x-auto py-1">
        {
          CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;

            return (<button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`relative px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wide transition-all duration-300 ${
              isActive
                ? "text-white dark:text-[#160F0B]"
                : "bg-white/80 dark:bg-coffee-950/80 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-200 hover:border-[#C67C4E]"}`}>
              {
                isActive && (<motion.div layoutId="activeCategoryPill" transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }} className="absolute inset-0 rounded-lg bg-[#2C1A14] dark:bg-gradient-to-r dark:from-[#C67C4E] dark:to-[#F0C085]"/>)
              }

              <span className="relative z-10 whitespace-nowrap">
                {cat.name}
              </span>
            </button>);
          })
        }
      </div>

      {/* Menu Items Grid */}
      {
        filteredItems.length === 0
          ? (<div className="text-center py-16 glass-card rounded-3xl">
            <p className="text-[#5C4337] dark:text-coffee-300 text-base font-medium">
              No items matched your search criteria.
            </p>
            <button onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setSelectedTag("");
              }} className="mt-4 px-6 py-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-bold text-xs">
              Clear All Filters
            </button>
          </div>)
          : (<motion.div layout="layout" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence>
              {
                filteredItems.map(item => {
                  return (<motion.div key={item.id} layout="layout" initial={{
                      opacity: 0,
                      scale: 0.92
                    }} animate={{
                      opacity: 1,
                      scale: 1
                    }} exit={{
                      opacity: 0,
                      scale: 0.92
                    }} transition={{
                      duration: 0.3
                    }} className="glass-card rounded-3xl overflow-hidden border border-[#E5DCD3] dark:border-coffee-800 hover:border-[#C67C4E] dark:hover:border-amber-400/30 flex flex-col justify-between group transition-all duration-300">
                    <div>
                      <div className="relative h-44 sm:h-48 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></img>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#160F0B]/80 via-transparent to-transparent opacity-80"/>{" "}
                        <motion.button whileHover={{
                            scale: 1.05
                          }} whileTap={{
                            scale: 0.95
                          }} onClick={() => addToCart(item)} className="px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5 bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B]">
                          <ShoppingBag className="w-4 h-4"/>
                          Add to Order
                        </motion.button>
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                          <span className="text-xs font-extrabold text-white dark:text-[#F0C085] flex items-center gap-1 bg-[#160F0B]/80 px-2.5 py-1 rounded-full border border-white/20">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>{" "}
                            {item.rating}
                          </span>
                          <span className="text-[11px] text-coffee-200 font-semibold">
                            ({item.reviewsCount}
                            reviews)
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-serif font-bold text-[#2C1A14] dark:text-white group-hover:text-[#C67C4E] dark:group-hover:text-[#F0C085] transition">
                            {item.name}
                          </h3>
                        </div>
                        <p className="mt-2 text-xs text-[#5C4337] dark:text-coffee-300 leading-relaxed line-clamp-2 font-medium">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {
                            item.tags.map(t => (<span key={t} className="text-[10px] font-extrabold bg-[#FDFBF7] dark:bg-coffee-950 px-2 py-0.5 rounded-md text-[#2C1A14] dark:text-[#F0C085] border border-[#E5DCD3] dark:border-coffee-800">
                              {t}
                            </span>))
                          }
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-3 flex items-center justify-between border-t border-[#E5DCD3] dark:border-coffee-800">
                      <div>
                        <span className="text-xs text-[#855E4C] dark:text-coffee-400 block font-bold uppercase tracking-wider">
                          Price
                        </span>
                        <span className="text-xl font-black text-[#2C1A14] dark:text-[#F0C085]">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <motion.button whileHover={{
                          scale: 1.05
                        }} whileTap={{
                          scale: 0.95
                        }} onClick={() => addToCart(item)} className="px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5 bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B]">
                        <ShoppingBag className="w-4 h-4"/>
                        Add to Order
                      </motion.button>
                    </div>
                  </motion.div>);
                })
              }
            </AnimatePresence>
          </motion.div>)
      }
    </div>

    {/* QUICK VIEW ITEM DETAILS MODAL */}
    <AnimatePresence>
      {
        activeItemModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div initial={{
              opacity: 0,
              scale: 0.92,
              y: 20
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.92,
              y: 20
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }} className="relative w-full max-w-xl glass-card rounded-3xl overflow-hidden border border-[#E5DCD3] dark:border-amber-400/40 p-6 sm:p-8 space-y-6 text-[#2C1A14] dark:text-white max-h-[90vh] overflow-y-auto">
            <button onClick={() => setActiveItemModal(null)} className="absolute top-4 right-4 p-2 rounded-full bg-[#FDFBF7] dark:bg-coffee-900 text-[#2C1A14] dark:text-coffee-300 hover:text-black">
              <X className="w-5 h-5"/>
            </button>

            <div className="relative h-60 rounded-2xl overflow-hidden">
              <img src={activeItemModal.image} alt={activeItemModal.name} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#160F0B]/90 via-transparent to-transparent"/>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C67C4E] dark:text-[#F0C085]">
                {activeItemModal.category}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#2C1A14] dark:text-white mt-1">
                {activeItemModal.name}
              </h3>
              <p className="text-xs text-[#5C4337] dark:text-coffee-200 mt-2 leading-relaxed font-medium">
                {activeItemModal.description}
              </p>
            </div>

            {/* Ingredients & Allergens */}
            <div className="grid grid-cols-2 gap-4 bg-[#FDFBF7] dark:bg-[#160F0B] p-4 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800 text-xs">
              <div>
                <span className="font-extrabold text-[#2C1A14] dark:text-[#F0C085] block mb-1">
                  Key Ingredients:
                </span>
                <ul className="list-disc list-inside text-[#5C4337] dark:text-coffee-300 space-y-0.5 font-medium">
                  {activeItemModal.ingredients.map(ing => (<li key={ing}>{ing}</li>))}
                </ul>
              </div>
              <div>
                <span className="font-extrabold text-[#2C1A14] dark:text-[#F0C085] mb-1 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085]"/>{" "}
                  Allergens:
                </span>
                <p className="text-[#5C4337] dark:text-coffee-300 font-medium">
                  {activeItemModal.allergens.join(", ")}
                </p>
              </div>
            </div>

            {/* Pairing */}
            <div className="bg-white dark:bg-amber-500/10 p-4 rounded-2xl border border-[#E5DCD3] dark:border-amber-500/20 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C67C4E] dark:text-[#F0C085]"/>
                <span className="font-extrabold text-[#2C1A14] dark:text-amber-200">
                  Recommended Pairing:
                </span>
                <span className="font-bold text-[#5C4337] dark:text-white">
                  {activeItemModal.pairingRecommendation}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E5DCD3] dark:border-coffee-800">
              <span className="text-2xl font-black text-[#2C1A14] dark:text-[#F0C085]">
                ${activeItemModal.price.toFixed(2)}
              </span>
              <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} onClick={() => {
                  addToCart(activeItemModal);
                  setActiveItemModal(null);
                }} className="px-6 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B]">
                <ShoppingBag className="w-4 h-4"/>
                Add to Order
              </motion.button>
            </div>
          </motion.div>
        </div>)
      }
    </AnimatePresence>
  </section>);
}
