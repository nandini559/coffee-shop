import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/galleryData';
import { Maximize2, X } from 'lucide-react';

export default function GallerySection() {
  const [filter, setFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const filtered = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(g => g.category === filter);

  return (
    <section id="gallery" className="py-24 bg-coffee-50 dark:bg-coffee-950 text-coffee-950 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-coffee-800 dark:text-amber-400 bg-coffee-200 dark:bg-amber-400/10 px-4 py-1.5 rounded-full border border-coffee-300 dark:border-amber-400/30">
            Visual Ambiance
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-coffee-950 dark:text-white mt-3">
            Life at <span className="text-[#C67C4E] dark:text-[#F0C085]">Oak & Bean</span>
          </h2>
          <p className="mt-3 text-coffee-700 dark:text-coffee-200/80 text-sm sm:text-base">
            Take a peak inside our sunlit espresso lounge, artisanal roasting laboratory, and daily bakery counter.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {['all', 'brews', 'ambiance', 'bakery'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-bold text-xs capitalize transition ${
                filter === cat
                  ? 'bg-coffee-600 dark:bg-amber-500 text-white dark:text-coffee-950 shadow-md'
                  : 'bg-white dark:bg-coffee-900 border border-coffee-200 dark:border-coffee-800 text-coffee-800 dark:text-coffee-300 hover:border-coffee-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="relative h-72 rounded-3xl overflow-hidden glass-card border border-coffee-200 dark:border-coffee-800 group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-extrabold">{item.category}</span>
                <h3 className="text-lg font-serif font-bold mt-1">{item.title}</h3>
                <p className="text-xs text-coffee-200 mt-1 line-clamp-2">{item.caption}</p>
              </div>
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-coffee-950/70 text-coffee-900 dark:text-amber-300 opacity-0 group-hover:opacity-100 transition shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl w-full text-center space-y-4" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="w-full max-h-[75vh] object-contain rounded-3xl shadow-2xl border border-coffee-700"
            />
            <div className="text-left bg-coffee-950/90 p-6 rounded-2xl border border-coffee-800 text-white">
              <h3 className="text-xl font-serif font-bold text-white">{activeImage.title}</h3>
              <p className="text-xs text-coffee-300 mt-1">{activeImage.caption}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
