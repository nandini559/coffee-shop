import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Calendar, Clock, Users, Coffee } from 'lucide-react';

export default function ReservationModal({ isOpen, onClose }) {
  const { addToast } = useCart();
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '10:00 AM',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(`Table reserved for ${booking.guests} guests on ${booking.date || 'today'} at ${booking.time}! ☕`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 space-y-6 text-white border border-amber-400/40">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-coffee-900 text-coffee-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-white">Reserve a Table</h3>
            <p className="text-xs text-[#5C4337] dark:text-coffee-300 font-medium">Book your cozy spot at Oak & Bean</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-coffee-300 block mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Green"
                value={booking.name}
                onChange={e => setBooking(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-coffee-300 block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 012-3456"
                value={booking.phone}
                onChange={e => setBooking(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-coffee-300 block mb-1">Guests</label>
              <select
                value={booking.guests}
                onChange={e => setBooking(prev => ({ ...prev, guests: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
              >
                <option value="1">1 Person</option>
                <option value="2">2 Guests</option>
                <option value="4">4 Guests</option>
                <option value="6">6+ Group</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-coffee-300 block mb-1">Date</label>
              <input
                type="date"
                required
                value={booking.date}
                onChange={e => setBooking(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-coffee-300 block mb-1">Time</label>
              <select
                value={booking.time}
                onChange={e => setBooking(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
              >
                <option value="8:00 AM">8:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-coffee-300 block mb-1">Special Seating Request (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Quiet corner, patio seating near fire pit"
              value={booking.notes}
              onChange={e => setBooking(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-coffee-950 font-extrabold text-sm shadow-glow"
          >
            Confirm Reservation
          </button>
        </form>

      </div>
    </div>
  );
}
