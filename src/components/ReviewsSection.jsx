import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/reviewsData';
import { Star, MessageSquarePlus, CheckCircle2, Quote, X } from 'lucide-react';
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
      drinkOrdered: newReview.drinkOrdered || 'Custom AI Brew',
      comment: newReview.comment,
      verified: true
    };

    setReviewsList(prev => [created, ...prev]);
    setIsModalOpen(false);
    setNewReview({ name: '', drinkOrdered: '', rating: 5, comment: '' });
    addToast('Thank you! Your review was verified and posted! ⭐', 'success');
  };

  return (
    <section id="reviews" className="py-24 bg-coffee-100/60 dark:bg-coffee-900/60 text-coffee-950 dark:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-coffee-800 dark:text-amber-400 bg-coffee-200 dark:bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-coffee-300 dark:border-amber-400/20">
              Community Love
            </span>
            <h2 className="text-4xl font-serif font-bold text-coffee-950 dark:text-white mt-3">
              What Coffee Lovers <span className="text-coffee-600 dark:text-amber-400">Say</span>
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-coffee-600 dark:bg-amber-500 hover:bg-coffee-700 dark:hover:bg-amber-400 text-white dark:text-coffee-950 font-extrabold text-sm transition shadow-glow flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" /> Leave a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 rounded-3xl border border-coffee-200 dark:border-coffee-800 flex flex-col justify-between space-y-4 hover:border-coffee-400 dark:hover:border-amber-400/30 transition-all duration-300"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-coffee-400/50 dark:text-amber-400/30" />
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-coffee-300 dark:text-coffee-700'}`}
                    />
                  ))}
                </div>

                <p className="text-xs text-coffee-800 dark:text-coffee-200 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-coffee-200 dark:border-coffee-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-coffee-300 dark:border-amber-400/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-coffee-950 dark:text-white">{rev.name}</span>
                    {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-coffee-600 dark:text-amber-400" />}
                  </div>
                  <span className="text-[11px] text-coffee-600 dark:text-coffee-400 block font-semibold">{rev.drinkOrdered}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* SUBMIT REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 space-y-6 text-coffee-950 dark:text-white border border-coffee-300 dark:border-amber-400/30">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-coffee-100 dark:bg-coffee-900 text-coffee-700 dark:text-coffee-300 hover:text-coffee-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-2xl font-serif font-bold text-coffee-950 dark:text-white">Share Your Experience</h3>
              <p className="text-xs text-coffee-700 dark:text-coffee-300 mt-1">Tell us what you thought of your drink or visit!</p>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-coffee-800 dark:text-coffee-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newReview.name}
                  onChange={e => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-800 text-coffee-950 dark:text-white text-xs focus:border-coffee-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-coffee-800 dark:text-coffee-300 block mb-1">Drink / Food Ordered</label>
                <input
                  type="text"
                  placeholder="e.g. Nitro Lavender Cold Foam Brew"
                  value={newReview.drinkOrdered}
                  onChange={e => setNewReview(prev => ({ ...prev, drinkOrdered: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-800 text-coffee-950 dark:text-white text-xs focus:border-coffee-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-coffee-800 dark:text-coffee-300 block mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-coffee-300 dark:text-coffee-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-coffee-800 dark:text-coffee-300 block mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write your honest review here..."
                  value={newReview.comment}
                  onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-800 text-coffee-950 dark:text-white text-xs focus:border-coffee-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-coffee-600 dark:bg-amber-500 hover:bg-coffee-700 dark:hover:bg-amber-400 text-white dark:text-coffee-950 font-extrabold text-sm shadow-glow"
              >
                Post Review
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
}
