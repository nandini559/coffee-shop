import React from "react";
import {motion} from "framer-motion";
import {CAFE_STATS} from "../data/reviewsData";
import {Cpu, Leaf} from "lucide-react";

export default function AboutSection() {
  return (<section id="about" className="py-24 bg-[#FAF7F2] dark:bg-[#120B07] relative overflow-hidden text-[#1C120C] dark:text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Images */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
          <div className="space-y-4">
            <motion.div whileHover={{
                scale: 1.02
              }} className="rounded-3xl overflow-hidden glass-card border border-[#E8DED1] dark:border-coffee-800 h-64">
              <img src="/asset/coffeepic1.png
              " alt="Precision Roasting" className="w-full h-full object-cover"/>
            </motion.div>
            <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-tr dark:from-coffee-900 dark:to-amber-950/40 border border-[#E8DED1] dark:border-amber-400/20 text-center shadow-sm">
              <span className="text-3xl font-extrabold text-[#2A1810] dark:text-amber-400 block font-serif">
                100%
              </span>
              <span className="text-xs font-bold text-[#523A30] dark:text-coffee-300 uppercase tracking-wider">
                Direct-Trade Beans
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-tr dark:from-coffee-900 dark:to-amber-950/40 border border-[#E8DED1] dark:border-amber-400/20 text-center shadow-sm">
              <span className="text-3xl font-extrabold text-[#2A1810] dark:text-amber-400 block font-serif">
                20 Hrs
              </span>
              <span className="text-xs font-bold text-[#523A30] dark:text-coffee-300 uppercase tracking-wider">
                Pure Coffee Brew
              </span>
            </div>
            <motion.div whileHover={{
                scale: 1.02
              }} className="rounded-3xl overflow-hidden glass-card border border-[#E8DED1] dark:border-coffee-800 h-64">
              <img src="/asset/coffeepic2.jpg" alt="Latte Art" className="w-full h-full object-cover"/>
            </motion.div>
          </div>
        </div>

        {/* Right Text */}
        <div className="lg:col-span-6 space-y-6">
          {/* <span className="text-xs font-extrabold uppercase tracking-widest text-[#2A1810] dark:text-amber-400 bg-white dark:bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-[#E8DED1] dark:border-amber-400/20 shadow-sm">
              Our Craft & Innovation
            </span> */
          }

          <h2 className="text-5xl  font-serif font-bold text-[#1C120C] dark:text-white leading-tight">
            Our Story
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A1810] via-[#C87D55] to-[#8C4A28] dark:from-amber-300 dark:via-crema dark:to-amber-500">
              Starts With a Bean
            </span>
          </h2>

          <p className="text-[#3D2920] dark:text-coffee-200 text-base font-medium leading-relaxed">
            Founded in 2024, Oak & Bean was born out of a passion for direct-trade specialty coffee and cutting-edge technology. We source micro-lot beans directly from high-altitude farms in Yirgacheffe, Huila, and Sidama.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-white dark:bg-amber-500/10 border border-[#E8DED1] dark:border-amber-500/20 text-[#2A1810] dark:text-amber-400 shrink-0 shadow-sm">
                <Cpu className="w-6 h-6"/>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C120C] dark:text-white">
                  Precision Brewing System
                </h4>
                <p className="text-xs text-[#523A30] dark:text-coffee-300 mt-1 font-medium">
                  Our proprietary thermal algorithms monitor water extraction pressure down to 0.1 bar, ensuring consistent caramelization and balanced sweetness.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-white dark:bg-amber-500/10 border border-[#E8DED1] dark:border-amber-500/20 text-[#2A1810] dark:text-amber-400 shrink-0 shadow-sm">
                <Leaf className="w-6 h-6"/>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C120C] dark:text-white">
                  Sustainable & Solar-Powered
                </h4>
                <p className="text-xs text-[#523A30] dark:text-coffee-300 mt-1 font-medium">
                  100% compostable plant cups, zero plastic waste policy, and solar-powered roasting facilities.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8DED1] dark:border-coffee-800">
            {
              CAFE_STATS.map(stat => (<div key={stat.label}>
                <span className="text-xl font-black text-[#2A1810] dark:text-amber-300 block font-serif">
                  {stat.value}
                </span>
                <span className="text-[11px] text-[#523A30] dark:text-coffee-400 font-bold">
                  {stat.label}
                </span>
              </div>))
            }
          </div>
        </div>
      </div>
    </div>
  </section>);
}
