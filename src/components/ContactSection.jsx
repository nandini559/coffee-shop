import React, { useState } from 'react';
import { CAFE_INFO } from '../data/faqData';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, Clock, Calendar, Send, Compass } from 'lucide-react';

export default function ContactSection({ onOpenReservation }) {
  const { addToast } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Thank you! Your message was sent to Oak & Bean support team. ☕', 'success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-coffee-100/50 dark:bg-coffee-950 text-coffee-950 dark:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-coffee-800 dark:text-amber-400 bg-coffee-200 dark:bg-amber-400/10 px-4 py-1.5 rounded-full border border-coffee-300 dark:border-amber-400/30">
            Visit & Connect
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-coffee-950 dark:text-white mt-3">
            Find Us & <span className="text-coffee-600 dark:text-amber-400">Get in Touch</span>
          </h2>
          <p className="mt-3 text-coffee-700 dark:text-coffee-200/80 text-sm sm:text-base">
            Drop by for a fresh espresso, book a table for your team, or send us a quick question.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Address Card */}
              <div className="glass-card p-6 rounded-3xl border border-coffee-200 dark:border-coffee-800 space-y-3">
                <div className="p-3 rounded-2xl bg-coffee-200 dark:bg-amber-500/10 text-coffee-800 dark:text-amber-400 w-fit">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-coffee-950 dark:text-white">Cafe Address</h3>
                <p className="text-xs text-coffee-700 dark:text-coffee-300 leading-relaxed">
                  {CAFE_INFO.address}
                </p>
                <span className="text-[11px] text-coffee-600 dark:text-amber-400 font-bold block pt-1">
                  Free 2-hr Guest Parking
                </span>
              </div>

              {/* Hours Card */}
              <div className="glass-card p-6 rounded-3xl border border-coffee-200 dark:border-coffee-800 space-y-3">
                <div className="p-3 rounded-2xl bg-coffee-200 dark:bg-amber-500/10 text-coffee-800 dark:text-amber-400 w-fit">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-coffee-950 dark:text-white">Opening Hours</h3>
                <p className="text-xs text-coffee-700 dark:text-coffee-300">
                  Mon–Fri: {CAFE_INFO.hours.weekdays}<br />
                  Sat–Sun: {CAFE_INFO.hours.weekends}
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block pt-1">
                  🟢 Currently Open (14 Seats Free)
                </span>
              </div>

              {/* Contact Direct */}
              <div className="glass-card p-6 rounded-3xl border border-coffee-200 dark:border-coffee-800 space-y-3">
                <div className="p-3 rounded-2xl bg-coffee-200 dark:bg-amber-500/10 text-coffee-800 dark:text-amber-400 w-fit">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-coffee-950 dark:text-white">Direct Line</h3>
                <p className="text-xs text-coffee-700 dark:text-coffee-300">
                  {CAFE_INFO.phone}<br />
                  {CAFE_INFO.email}
                </p>
              </div>

              {/* Table Booking Banner */}
              <div className="glass-panel p-6 rounded-3xl border border-coffee-300 dark:border-amber-400/30 flex flex-col justify-between space-y-3 bg-gradient-to-br from-coffee-100 to-amber-100/50 dark:from-amber-500/10 dark:to-coffee-900">
                <div className="p-3 rounded-2xl bg-coffee-600 dark:bg-amber-500 text-white dark:text-coffee-950 w-fit">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-coffee-950 dark:text-white">Reserve a Table</h3>
                  <p className="text-xs text-coffee-700 dark:text-coffee-300 mt-1">Book your space for work, study, or gatherings.</p>
                </div>
                <button
                  onClick={onOpenReservation}
                  className="w-full py-2.5 rounded-xl bg-coffee-600 dark:bg-amber-500 hover:bg-coffee-700 dark:hover:bg-amber-400 text-white dark:text-coffee-950 font-extrabold text-xs shadow-glow transition"
                >
                  Book Table Now
                </button>
              </div>

            </div>

            {/* Map Graphic */}
            <div className="relative h-64 rounded-3xl overflow-hidden glass-card border border-coffee-200 dark:border-coffee-800 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#8c533e_1px,transparent_1px)] [background-size:16px_16px] opacity-20 dark:opacity-40" />
              <div className="relative z-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-coffee-600 dark:bg-amber-500 text-white dark:text-coffee-950 flex items-center justify-center mx-auto shadow-glow animate-bounce">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif font-bold text-coffee-950 dark:text-white">Interactive Coffee District Location</h4>
                <p className="text-xs text-coffee-700 dark:text-coffee-300 max-w-sm">742 Crema Boulevard • 3 Mins Walk from Central Metro Station</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 rounded-xl bg-coffee-200 dark:bg-coffee-800 text-coffee-900 dark:text-amber-300 text-xs font-bold border border-coffee-300 dark:border-coffee-700 hover:border-coffee-500 transition"
                >
                  Open Google Maps &rarr;
                </a>
              </div>
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-coffee-200 dark:border-coffee-800 space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-coffee-950 dark:text-white">Send Us a Message</h3>
              <p className="text-xs text-coffee-700 dark:text-coffee-300 mt-1">Have feedback, catering inquiries, or partnership questions?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-coffee-800 dark:text-coffee-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-800 text-coffee-950 dark:text-white text-xs focus:border-coffee-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-coffee-800 dark:text-coffee-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-800 text-coffee-950 dark:text-white text-xs focus:border-coffee-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-coffee-800 dark:text-coffee-300 block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-800 text-coffee-950 dark:text-white text-xs focus:border-coffee-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-coffee-600 dark:bg-gradient-to-r dark:from-amber-500 dark:to-coffee-400 text-white dark:text-coffee-950 font-extrabold text-sm shadow-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
