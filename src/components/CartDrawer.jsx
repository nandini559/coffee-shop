import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, ArrowRight, Truck, Store } from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    promoCode,
    discountPercent,
    applyPromo,
    orderType,
    setOrderType
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = orderType === 'delivery' ? (subtotal > 25 ? 0 : 2.99) : 0;
  const taxAmount = (subtotal - discountAmount) * 0.0825;
  const grandTotal = subtotal - discountAmount + deliveryFee + taxAmount;

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (inputCode) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">

          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">

            {/* Slide-in Cart Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-screen max-w-md glass-panel bg-coffee-50/95 dark:bg-coffee-950/95 text-coffee-950 dark:text-white border-l border-coffee-200 dark:border-coffee-800 flex flex-col justify-between shadow-2xl"
            >

              {/* Header */}
              <div className="p-6 border-b border-coffee-200 dark:border-coffee-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-coffee-200 dark:bg-amber-500/20 text-coffee-800 dark:text-amber-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-coffee-950 dark:text-white">Your Coffee Order</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-coffee-600 dark:text-coffee-400 hover:text-coffee-950 dark:hover:text-white hover:bg-coffee-200 dark:hover:bg-coffee-900 transition"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Delivery / Pickup Order Mode Switcher */}
              <div className="p-4 bg-coffee-100/60 dark:bg-coffee-900/60 border-b border-coffee-200 dark:border-coffee-800 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${orderType === 'delivery'
                      ? 'bg-coffee-600 dark:bg-amber-500 text-white dark:text-coffee-950 border-coffee-500 dark:border-amber-400 shadow-md'
                      : 'bg-white dark:bg-coffee-950 border-coffee-200 dark:border-coffee-800 text-coffee-800 dark:text-coffee-300'
                    }`}
                >
                  <Truck className="w-4 h-4" /> 15-Min Delivery
                </button>

                <button
                  onClick={() => setOrderType('pickup')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${orderType === 'pickup'
                      ? 'bg-coffee-600 dark:bg-amber-500 text-white dark:text-coffee-950 border-coffee-500 dark:border-amber-400 shadow-md'
                      : 'bg-white dark:bg-coffee-950 border-coffee-200 dark:border-coffee-800 text-coffee-800 dark:text-coffee-300'
                    }`}
                >
                  <Store className="w-4 h-4" /> Express Pickup
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-coffee-400" />
                    <p className="text-sm font-semibold text-coffee-700 dark:text-coffee-300">Your cart is currently empty.</p>
                    {/* <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-coffee-600 dark:bg-amber-500 text-white dark:text-coffee-950 font-bold text-xs"
                    >
                      Explore Our Menu
                    </button> */}
                  </div>
                ) : (
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="bg-white/80 dark:bg-coffee-900/70 p-4 rounded-2xl border border-coffee-200 dark:border-coffee-800 flex gap-4 items-center justify-between shadow-sm"
                      >
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-coffee-950 dark:text-white truncate">{item.name}</h4>
                          <span className="text-xs font-extrabold text-coffee-900 dark:text-amber-300 block mt-0.5">${item.price.toFixed(2)}</span>

                          {item.story && (
                            <p className="text-[10px] text-coffee-600 dark:text-coffee-400 italic truncate mt-0.5">
                              "{item.story}"
                            </p>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-lg bg-coffee-100 dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-700 text-coffee-800 dark:text-coffee-300 hover:text-coffee-950"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-lg bg-coffee-100 dark:bg-coffee-950 border border-coffee-300 dark:border-coffee-700 text-coffee-800 dark:text-coffee-300 hover:text-coffee-950"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 ml-1 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Checkout Breakdown Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-coffee-100/90 dark:bg-coffee-950 border-t border-coffee-200 dark:border-coffee-800 space-y-4">

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-500 dark:text-coffee-400" />
                      <input
                        type="text"
                        placeholder="Promo Code (AURA15, BREW20)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-coffee-900 border border-coffee-300 dark:border-coffee-800 text-xs text-coffee-950 dark:text-white uppercase focus:border-coffee-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-coffee-200 dark:bg-coffee-800 hover:bg-coffee-300 text-coffee-900 dark:text-amber-300 font-bold text-xs border border-coffee-300 dark:border-coffee-700"
                    >
                      Apply
                    </button>
                  </form>

                  {promoCode && (
                    <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <span>Code Applied: <strong>{promoCode}</strong></span>
                      <span>-{discountPercent}% OFF</span>
                    </div>
                  )}

                  {/* Price Calculations */}
                  <div className="space-y-1.5 text-xs text-coffee-700 dark:text-coffee-300 pt-2 border-t border-coffee-200 dark:border-coffee-900">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Tax (8.25%)</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{orderType === 'delivery' ? 'Express Delivery' : 'Pickup Fee'}</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-coffee-950 dark:text-white pt-2 border-t border-coffee-200 dark:border-coffee-800">
                      <span>Total</span>
                      <span className="text-coffee-900 dark:text-amber-300">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Trigger */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-coffee-600 via-amber-500 to-coffee-700 dark:from-amber-500 dark:via-coffee-400 dark:to-amber-600 text-white dark:text-coffee-950 font-extrabold text-sm shadow-glow flex items-center justify-center gap-2"
                  >
                    Proceed to Online Checkout <ArrowRight className="w-4 h-4" />
                  </motion.button>

                </div>
              )}

            </motion.div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
