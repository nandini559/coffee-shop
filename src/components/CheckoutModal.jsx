import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle, CreditCard, Truck, Store, Clock, Sparkles, Coffee } from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    promoCode,
    discountPercent,
    orderType,
    placeOrder,
    activeOrder,
    setActiveOrder
  } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '742 Park Avenue, Apt 4B',
    paymentMethod: 'card'
  });

  if (!isCheckoutOpen && !activeOrder) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = orderType === 'delivery' ? (subtotal > 25 ? 0 : 2.99) : 0;
  const taxAmount = (subtotal - discountAmount) * 0.0825;
  const grandTotal = subtotal - discountAmount + deliveryFee + taxAmount;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    placeOrder(customer);
  };

  return (
    <div
      onClick={() => {
        setIsCheckoutOpen(false);
        setActiveOrder(null);
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden border border-amber-400/40 p-6 sm:p-8 space-y-6 text-white my-8"
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setActiveOrder(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-coffee-900 text-coffee-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- VIEW 1: LIVE ACTIVE ORDER RECEIPT & TRACKER --- */}
        {activeOrder ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Order Confirmed • #{activeOrder.orderId}
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-3">
                Your Coffee is Being Crafted!
              </h2>
              <p className="text-xs text-coffee-300 mt-1">
                Estimated {activeOrder.orderType === 'delivery' ? 'Delivery' : 'Pickup'} Time: <strong className="text-amber-300 font-bold">{activeOrder.estimatedTime}</strong>
              </p>
            </div>

            {/* AI Generated Drink Story Showcase */}
            <div className="bg-gradient-to-r from-coffee-900 to-amber-950/60 p-5 rounded-2xl border border-amber-400/30 text-left space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Personalized Coffee Stories:
              </div>
              {activeOrder.items.map(item => (
                <div key={item.id} className="text-xs text-coffee-200 border-l-2 border-amber-400 pl-3 py-1">
                  <span className="font-bold text-white block">{item.name}</span>
                  <p className="italic text-coffee-300 mt-0.5">"{item.story}"</p>
                </div>
              ))}
            </div>

            {/* Order Receipt Details */}
            <div className="bg-coffee-950 p-4 rounded-2xl border border-coffee-800 text-xs text-left space-y-2">
              <div className="flex justify-between font-bold text-white border-b border-coffee-800 pb-2">
                <span>Items ({activeOrder.items.length})</span>
                <span>Subtotal: ${activeOrder.total.toFixed(2)}</span>
              </div>
              <p className="text-coffee-400">Customer: {activeOrder.customer.name} ({activeOrder.customer.phone || 'Standard'})</p>
              <p className="text-coffee-400">Fulfillment: {activeOrder.orderType.toUpperCase()} – {activeOrder.customer.address}</p>
            </div>

            <button
              onClick={() => setActiveOrder(null)}
              className="w-full py-3.5 rounded-xl bg-amber-500 text-coffee-950 font-extrabold text-sm shadow-glow"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : (

          /* --- VIEW 2: CHECKOUT FORM & CONFIRMATION --- */
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Fast Online Ordering
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Complete Your Coffee Order
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-coffee-300 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Miller"
                    value={customer.name}
                    onChange={e => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-coffee-300 block mb-1">Phone Number (For Order SMS)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={customer.phone}
                    onChange={e => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="text-xs font-bold text-coffee-300 block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Street Address, Apartment, Suite"
                    value={customer.address}
                    onChange={e => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold text-coffee-300 block mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {['card', 'applepay', 'cash'].map(method => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setCustomer(prev => ({ ...prev, paymentMethod: method }))}
                      className={`p-3 rounded-xl border text-xs font-bold capitalize transition ${
                        customer.paymentMethod === method
                          ? 'bg-amber-500 text-coffee-950 border-amber-400 shadow-glow'
                          : 'bg-coffee-950 border-coffee-800 text-coffee-300'
                      }`}
                    >
                      {method === 'card' ? '💳 Credit Card' : method === 'applepay' ? '🍎 Apple Pay' : '💵 Pay at Door/Bar'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="bg-coffee-950/80 p-4 rounded-2xl border border-coffee-800 space-y-2">
                <span className="text-xs font-bold text-amber-300 block mb-1">Order Summary ({cartItems.length} items):</span>
                <div className="max-h-32 overflow-y-auto space-y-1.5 pr-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-xs text-coffee-300">
                      <span className="truncate">{item.quantity}x {item.name}</span>
                      <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-coffee-800">
                  <span>Grand Total</span>
                  <span className="text-amber-300">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-coffee-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-coffee-950 font-extrabold text-base shadow-glow flex items-center justify-center gap-2"
              >
                Confirm & Place Order – ${grandTotal.toFixed(2)}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
