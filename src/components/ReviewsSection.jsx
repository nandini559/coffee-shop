import React, { useState } from "react";
import { motion } from "framer-motion";
import { REVIEWS_DATA } from "../data/reviewsData";
import { Star, MessageSquarePlus, CheckCircle2, X, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ReviewsSection() {
  const { addToast } = useCart();
  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newReview, setNewReview] = useState({ name: "", drinkOrdered: "", rating: 5, comment: "" });

  const stickyNoteColors = [
    {
      bg: "bg-[#F4F0FF] dark:bg-[#D8CFF1] text-[#2C1A14]",
      border: "border-[#C9BEEA]/30",
      tape: "bg-[#FBFAFF]/80"
    }, {
      bg: "bg-[#FCEEF5] dark:bg-[#E9C8D7] text-[#2C1A14]",
      border: "border-[#E9B8C9]/30",
      tape: "bg-[#FFF8FB]/80"
    }, {
      bg: "bg-[#EEF9F1] dark:bg-[#CFE7D3] text-[#2C1A14]",
      border: "border-[#B9D8C0]/30",
      tape: "bg-[#FAFFFB]/80"
    }, {
      bg: "bg-[#F6F1EA] dark:bg-[#D9C4B1] text-[#2C1A14]",
      border: "border-[#D1B9A1]/30",
      tape: "bg-[#FCFAF7]/80"
    }
  ];

  const rotations = [
    "rotate-1",
    "-rotate-2",
    "rotate-2",
    "-rotate-1",
    "rotate-3",
    "-rotate-3"
  ];

  const handleAddReview = e => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      addToast("Please fill out your name and review comment.", "error");
      return;
    }

    const created = {
      id: "rev-" + Date.now(),
      name: newReview.name,
      role: "Valued Coffee Guest",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      rating: newReview.rating,
      date: "Just now",
      drinkOrdered: newReview.drinkOrdered || "Artisanal Brew",
      comment: newReview.comment,
      verified: true
    };

    setReviewsList(prev => [
      created, ...prev
    ]);
    setIsModalOpen(false);
    setNewReview({ name: "", drinkOrdered: "", rating: 5, comment: "" });
    addToast("Thank you! Your handwritten review note has been posted! ⭐", "success");
  };

  return (<section id="reviews" className="py-16 sm:py-20 lg:py-24 relative bg-transparent text-[#2C1A14] dark:text-white flex flex-col justify-center">
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(#C67C4E_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1A14] dark:text-white tracking-tight">
            Notes from{" "}
            <span className="text-[#C67C4E] dark:text-[#F0C085]">
              Coffee Lovers
            </span>
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#5C4337] dark:text-coffee-200 font-medium">
            Read authentic handwritten feedback pinned straight onto our coffee bar wall by our community.
          </p>
        </div>

        <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setIsModalOpen(true)} className="px-4 py-3 rounded-2xl border border-[#2C1A14]/30 dark:border-amber-400/40 bg-white/80 dark:bg-coffee-900/80 hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-[#2C1A14] dark:text-[#F0C085] hover:text-white dark:hover:text-[#160F0B] font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition shrink-0 backdrop-blur-md">
          <MessageSquarePlus className="w-4 h-4" />
          Pin a Review Note
        </motion.button>
      </div>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pt-2">
        {
          reviewsList.map((rev, idx) => {
            const theme = stickyNoteColors[idx % stickyNoteColors.length];
            const rotationClass = rotations[idx % rotations.length];

            return (<motion.div key={rev.id} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} whileHover={{
              scale: 1.04,
              rotate: 0,
              zIndex: 30
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }} className={`relative p-5 sm:p-6 rounded-2xl ${theme.bg} ${theme.border} ${rotationClass} sticky-note-shadow border transition-all duration-300 flex flex-col justify-between space-y-3 gpu-render`}>
              {/* Translucent Scotch Tape Accent at Top Center */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 ${theme.tape} border border-white/60 shadow-xs transform -rotate-1 rounded-sm opacity-90 pointer-events-none`} />{" "}
              {/* Stars Rating */}
              <div className="space-y-2">
                {/* Handwritten Review Text */}
                <p className="font-handwritten text-lg sm:text-xl text-[#2C1A14] leading-relaxed font-bold tracking-wide line-clamp-4 sm:line-clamp-5">
                  "{rev.comment}"
                </p>

                <div className="flex items-center gap-1">
                  {
                    [...Array(5)].map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating
                        ? "fill-amber-500 text-amber-600"
                        : "text-stone-300/80"}`} />))
                  }
                </div>
              </div>
              {/* Handwritten Author Info */}
              <div className="pt-3 border-t border-[#2C1A14]/15 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover border-2 border-[#2C1A14]/30 shadow-xs" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-handwritten text-base font-bold text-[#2C1A14] leading-none">
                        {rev.name}
                      </span>
                      {rev.verified && (<CheckCircle2 className="w-3 h-3 text-emerald-700" />)}
                    </div>
                    <span className="text-[9px] font-black uppercase text-[#5C4337] block tracking-wider">
                      {rev.drinkOrdered}
                    </span>
                  </div>
                </div>
                {/* <span className="text-[9px] font-bold text-[#855E4C] italic">
                  {rev.date}
                </span> */}
              </div>
            </motion.div>);
          })
        }
      </div>
    </div>

    {/* SUBMIT STICKY NOTE REVIEW MODAL */}
    {
      isModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div initial={{
          opacity: 0,
          scale: 0.9,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} className="relative w-full max-w-lg bg-[#FFF9C4] rounded-3xl p-6 sm:p-8 space-y-6 text-[#2C1A14] border-2 border-[#FBC02D] shadow-2xl overflow-hidden">
          {/* Top Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/80 border border-white/60 shadow-xs rounded-sm" />

          <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-[#FBC02D]/20 text-[#2C1A14] hover:bg-[#FBC02D]/40">
            <X className="w-5 h-5" />
          </button>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-800">
              Write a Sticky Note
            </span>
            <h3 className="text-3xl font-handwritten font-bold text-[#2C1A14] mt-1">
              Share Your Handwritten Review
            </h3>
          </div>

          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">
                Your Name
              </label>
              <input type="text" required="required" placeholder="e.g. Sarah Jenkins" value={newReview.name} onChange={e => setNewReview(prev => ({
                ...prev,
                name: e.target.value
              }))
              } className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300 text-[#2C1A14] text-xs font-bold focus:outline-none" />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">
                Drink / Pastry Enjoyed
              </label>
              <input type="text" placeholder="e.g. Velvet Caramel Latte" value={newReview.drinkOrdered} onChange={e => setNewReview(prev => ({
                ...prev,
                drinkOrdered: e.target.value
              }))
              } className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300 text-[#2C1A14] text-xs font-bold focus:outline-none" />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">
                Star Rating
              </label>
              <div className="flex gap-2">
                {
                  [1, 2, 3, 4, 5].map(star => (<button type="button" key={star} onClick={() => setNewReview(prev => ({
                    ...prev,
                    rating: star
                  }))
                  } className="p-1">
                    <Star className={`w-7 h-7 ${star <= newReview.rating
                        ? "fill-amber-500 text-amber-600"
                        : "text-stone-300"}`} />
                  </button>))
                }
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">
                Your Note Message
              </label>
              <textarea rows={3} required="required" placeholder="Write your review here in handwritten style..." value={newReview.comment} onChange={e => setNewReview(prev => ({
                ...prev,
                comment: e.target.value
              }))
              } className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300 text-[#2C1A14] font-handwritten text-xl font-bold focus:outline-none" />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-[#2C1A14] hover:bg-[#3D291F] text-white font-extrabold text-xs uppercase tracking-wider shadow-md">
              Pin Sticky Note
            </button>
          </form>
        </motion.div>
      </div>)
    }
  </section>);
}
