import React from "react";
import {motion} from "framer-motion";
import {MENU_ITEMS} from "../data/menuData";
import {useCart} from "../context/CartContext";
import {
  Star,
  ShoppingBag,
  Clock,
  Flame,
  Sparkles,
  Trophy,
  ArrowRight
} from "lucide-react";

export default function FeaturedSection() {
  const {addToCart} = useCart();
  const featuredItems = MENU_ITEMS.filter(item => item.popular).slice(0, 4);

  return (<section id="bestsellers" className="h-screen flex items-center overflow-hidden relative text-[#2C1A14] dark:text-white mt-40 mb-20">
    {/* Decorative Background Lighting Effects */}
    {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/10 dark:bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"/>
    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#C67C4E]/10 dark:bg-[#C67C4E]/20 blur-[100px] rounded-full pointer-events-none"/> */
    }

    <div className="max-w-6xl mx-auto px-6 w-full">
      {" "}
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end  mb-8 gap-3 justify-between">
        <div className="space-y-3 max-w-2xl">
          <motion.div initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}></motion.div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1A14] dark:text-white tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#C67C4E] via-[#A35D31] to-[#855E4C] dark:from-[#F0C085] dark:to-[#C67C4E] bg-clip-text text-transparent">
              Bestsellers
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C4337] dark:text-coffee-200 font-medium leading-relaxed">
            Explore the iconic roasts, velvety micro-foams, and handcrafted artisanal treats that our coffee lovers return for every single day.
          </p>
        </div>

        <motion.a whileHover={{
            x: 5
          }} href="#menu" className="ml-auto inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-[#F0C085] hover:text-[#C67C4E] dark:hover:text-[#F8E6D3] bg-white/80 dark:bg-coffee-900/80 px-3 py-2 rounded-2xl border border-[#E5DCD3] dark:border-coffee-700 shadow-sm backdrop-blur-md transition-all shrink-0">
          <span>Explore Full Menu</span>
          <ArrowRight className="w-4 h-4 text-[#C67C4E]"/>
        </motion.a>
      </div>
      {/* Bestsellers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {
          featuredItems.map((item, index) => (<motion.div key={item.id} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1,
              duration: 0.5
            }} whileHover={{
              y: -6
            }} className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-white via-[#FDFBF7] to-[#F5EFE6] dark:from-[#241812] dark:via-[#1D130E] dark:to-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 hover:border-[#C67C4E] dark:hover:border-amber-400/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            {/* Bestseller Rank Ribbon */}

            <div>
              {/* Image Wrapper */}
              <div className="relative h-40 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A14]/90 via-black/20 to-transparent"/>{" "}
                {/* Rating Badge */}
                <div className="absolute bottom-3 right-4 bg-white/90 dark:bg-[#160F0B]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#E5DCD3] dark:border-amber-400/30 text-xs font-black text-[#2C1A14] dark:text-[#F0C085] shadow-sm">
                  <span>{item.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>{" "}
                  {/* <span className="text-[10px] text-coffee-400 font-semibold">
                    ({item.reviewsCount})
                  </span> */
                  }
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C67C4E] dark:text-[#F0C085] block">
                  {item.tags[0]}
                </span>
                <h3 className="text-base font-serif font-bold text-[#2C1A14] dark:text-white group-hover:text-[#C67C4E] dark:group-hover:text-[#F0C085] transition-colors leading-snug">
                  {item.name}
                </h3>
                <p className="text-[11px] text-[#5C4337] dark:text-coffee-300 line-clamp-2 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Metadata Chips */}
                {/* <div className="pt-2 flex items-center justify-between text-xs text-[#855E4C] dark:text-coffee-400 border-t border-[#E5DCD3] dark:border-coffee-800/80 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085]"/>{" "}
                    {item.prepTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085]"/>{" "}
                    {item.calories}
                    kcal
                  </span>
                </div> */
                }
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-3 flex items-center justify-between border-t border-[#E5DCD3]/50 dark:border-coffee-800/50 mt-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#855E4C] dark:text-coffee-400 block tracking-wider">
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
                }} onClick={() => addToCart(item)} className="px-2 py-2 rounded-2xl font-semibold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] transition-all">
                <ShoppingBag className="w-4 h-4"/>
                <span>Order Now</span>
              </motion.button>
            </div>
          </motion.div>))
        }
      </div>
    </div>
  </section>);
}
