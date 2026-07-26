import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { REVIEWS_DATA } from '../data/reviewsData';
import { Star, MessageSquarePlus, CheckCircle2, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ReviewsSection() {
  const { addToast } = useCart();
  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newReview, setNewReview] = useState({
    name: '',
    drinkOrdered: '',
    rating: 5,
    comment: ''
  });

  const stickyNoteColors = [
    { bg: 'bg-[#FFF9C4] dark:bg-[#FFF59D] text-[#2C1A14]', border: 'border-[#FBC02D]/40', tape: 'bg-white/80' }, // Yellow
    { bg: 'bg-[#FFECB3] dark:bg-[#FFE082] text-[#2C1A14]', border: 'border-[#FFA000]/40', tape: 'bg-amber-100/90' }, // Amber
    { bg: 'bg-[#F0F4C3] dark:bg-[#E6EE9C] text-[#2C1A14]', border: 'border-[#AFB42B]/40', tape: 'bg-emerald-100/80' }, // Lime/Mint
    { bg: 'bg-[#FFE0B2] dark:bg-[#FFCC80] text-[#2C1A14]', border: 'border-[#FB8C00]/40', tape: 'bg-orange-100/80' }, // Peach
  ];

  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      addToast('Please fill out your name and review comment.', 'error');
      return;
    }

    const created = {
      id: 'rev-' + Date.now(),
      name: newReview.name,
      role: 'Valued Coffee Guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: newReview.rating,
      date: 'Just now',
      drinkOrdered: newReview.drinkOrdered || 'Artisanal Brew',
      comment: newReview.comment,
      verified: true
    };

    setReviewsList(prev => [created, ...prev]);
    setIsModalOpen(false);
    setNewReview({ name: '', drinkOrdered: '', rating: 5, comment: '' });
    addToast('Thank you! Your handwritten review note has been posted! ⭐', 'success');
  };

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-[#FFFDF9] via-[#F4ECE1] to-[#E8DCCF] dark:from-[#160F0B] dark:via-[#20150F] dark:to-[#160F0B] text-[#2C1A14] dark:text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C67C4E_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C1A14]/10 dark:bg-amber-400/10 border border-[#2C1A14]/20 dark:border-amber-400/30 text-xs font-black uppercase tracking-widest text-[#2C1A14] dark:text-[#F0C085]">
              <Sparkles className="w-3.5 h-3.5 text-[#C67C4E] dark:text-amber-400" />
              <span>Real Customer Notes</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1A14] dark:text-white tracking-tight">
              Sticky Notes from <span className="text-[#C67C4E] dark:text-[#F0C085]">Coffee Lovers</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5C4337] dark:text-coffee-200 font-medium">
              Read authentic handwritten feedback pinned straight onto our coffee bar wall by our community.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:bg-[#3D291F] dark:hover:bg-[#A35D31] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" /> Pin a Review Note
          </motion.button>
        </div>

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {reviewsList.map((rev, idx) => {
            const theme = stickyNoteColors[idx % stickyNoteColors.length];
            const rotationClass = rotations[idx % rotations.length];

            return (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative p-6 sm:p-7 rounded-2xl ${theme.bg} ${theme.border} ${rotationClass} sticky-note-shadow border transition-all duration-300 flex flex-col justify-between space-y-4`}
              >
                {/* Translucent Scotch Tape Accent at Top Center */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 ${theme.tape} border border-white/60 shadow-xs transform -rotate-1 rounded-sm opacity-90 pointer-events-none`} />

                {/* Stars Rating */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-500 text-amber-600'
                            : 'text-stone-300/80'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Handwritten Review Text */}
                  <p className="font-handwritten text-xl sm:text-2xl text-[#2C1A14] leading-relaxed font-bold tracking-wide">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Handwritten Author Info */}
                <div className="pt-4 border-t border-[#2C1A14]/15 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#2C1A14]/30 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-handwritten text-lg font-bold text-[#2C1A14] leading-none">
                          {rev.name}
                        </span>
                        {rev.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        )}
                      </div>
                      <span className="text-[10px] font-black uppercase text-[#5C4337] block tracking-wider">
                        {rev.drinkOrdered}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#855E4C] italic">{rev.date}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* SUBMIT STICKY NOTE REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg bg-[#FFF9C4] rounded-3xl p-6 sm:p-8 space-y-6 text-[#2C1A14] border-2 border-[#FBC02D] shadow-2xl overflow-hidden"
          >
            {/* Top Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/80 border border-white/60 shadow-xs rounded-sm" />

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#FBC02D]/20 text-[#2C1A14] hover:bg-[#FBC02D]/40"
            >
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
                <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newReview.name}
                  onChange={e => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300 text-[#2C1A14] text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">Drink / Pastry Enjoyed</label>
                <input
                  type="text"
                  placeholder="e.g. Velvet Caramel Latte"
                  value={newReview.drinkOrdered}
                  onChange={e => setNewReview(prev => ({ ...prev, drinkOrdered: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300 text-[#2C1A14] text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star className={`w-7 h-7 ${star <= newReview.rating ? 'fill-amber-500 text-amber-600' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#2C1A14] block mb-1">Your Note Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write your review here in handwritten style..."
                  value={newReview.comment}
                  onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300 text-[#2C1A14] font-handwritten text-xl font-bold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2C1A14] hover:bg-[#3D291F] text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                Pin Sticky Note
              </button>
            </form>

          </motion.div>
        </div>
      )}

    </section>
  );
}
