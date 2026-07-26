import React, {useState} from "react";
import {GALLERY_ITEMS} from "../data/galleryData";
import {Maximize2, X} from "lucide-react";

export default function GallerySection() {
  const [filter, setFilter] = useState("all");
  const [activeImage, setActiveImage] = useState(null);

  const filtered = filter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.category === filter);

  return (<section id="gallery" className="py-16 sm:py-20 lg:py-24 relative bg-transparent text-[#2C1A14] dark:text-white flex flex-col justify-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1A14] dark:text-white mt-2">
          Life at{" "}
          <span className="text-[#C67C4E] dark:text-[#F0C085]">
            Oak & Bean
          </span>
        </h2>
        <p className="mt-2 text-[#5C4337] dark:text-coffee-200 text-xs sm:text-sm lg:text-base font-medium">
          Take a peak inside our sunlit espresso lounge, artisanal roasting laboratory, and daily bakery counter.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {
          filtered.map(item => (<div key={item.id} onClick={() => setActiveImage(item)} className="relative h-52 sm:h-56 lg:h-60 rounded-3xl overflow-hidden glass-card border border-[#E5DCD3] dark:border-coffee-800 group cursor-pointer gpu-render">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#160F0B] via-[#160F0B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#F0C085] font-extrabold">
                {item.category}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold mt-0.5">
                {item.title}
              </h3>
              <p className="text-xs text-coffee-200 mt-0.5 line-clamp-2">
                {item.caption}
              </p>
            </div>
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-coffee-950/70 text-[#2C1A14] dark:text-[#F0C085] opacity-0 group-hover:opacity-100 transition shadow-md backdrop-blur-md">
              <Maximize2 className="w-4 h-4"/>
            </div>
          </div>))
        }
      </div>
    </div>

    {/* LIGHTBOX MODAL */}
    {
      activeImage && (<div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setActiveImage(null)}>
        <div className="relative max-w-4xl w-full text-center space-y-4" onClick={e => e.stopPropagation()}>
          <button onClick={() => setActiveImage(null)} className="absolute -top-12 right-0 text-gray-400 hover:text-white p-2">
            <X className="w-8 h-8"/>
          </button>
          <img src={activeImage.image} alt={activeImage.title} className="w-full max-h-[75vh] object-contain rounded-3xl shadow-2xl border border-coffee-700"/>
          <div className="text-left bg-coffee-950/90 p-6 rounded-2xl border border-coffee-800 text-white">
            <h3 className="text-xl font-serif font-bold text-white">
              {activeImage.title}
            </h3>
            <p className="text-xs text-coffee-300 mt-1">
              {activeImage.caption}
            </p>
          </div>
        </div>
      </div>)
    }
  </section>);
}
