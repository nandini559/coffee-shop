import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import { X, User, LogIn, UserPlus, LogOut, Award, Heart, Package, Shield, Coffee, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const {
    user,
    login,
    signup,
    logout,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authTab,
    setAuthTab,
    DEMO_USER,
    DEMO_ADMIN
  } = useAuth();

  const { setIsAdminDashboardOpen } = useInventory();
  const { addToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    addToast(`Welcome back, ${formData.email ? formData.email.split('@')[0] : 'Coffee Enthusiast'}! ☕`, 'success');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signup(formData.name, formData.email, formData.password);
    addToast('Account created successfully! Welcome to Oak & Bean Club. 🎉', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 space-y-6 text-[#2C1A14] dark:text-white border border-[#E5DCD3] dark:border-amber-400/40 shadow-2xl overflow-hidden"
      >
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F2] dark:bg-coffee-900 text-[#2C1A14] dark:text-coffee-300 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- VIEW 1: USER PROFILE VIEW (If Logged In) --- */}
        {user ? (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C67C4E] shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-serif font-bold text-[#2C1A14] dark:text-white">{user.name}</h3>
                  {user.role === 'admin' && (
                    <span className="px-2 py-0.5 rounded-md bg-[#2C1A14] text-white text-[10px] font-black uppercase">
                      Admin
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-[#C67C4E] dark:text-[#F0C085] flex items-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5" /> {user.tier}
                </span>
                <span className="text-[11px] text-[#855E4C] dark:text-coffee-400 font-medium block">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Loyalty Stats Card */}
            <div className="grid grid-cols-2 gap-3 bg-[#FDFBF7] dark:bg-[#160F0B] p-4 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800 text-xs">
              <div>
                <span className="text-[#855E4C] dark:text-coffee-400 font-bold block">Reward Points</span>
                <span className="text-2xl font-black text-[#2C1A14] dark:text-[#F0C085]">{user.points} pts</span>
              </div>
              <div>
                <span className="text-[#855E4C] dark:text-coffee-400 font-bold block">Member Since</span>
                <span className="text-sm font-bold text-[#2C1A14] dark:text-white mt-1 block">{user.memberSince}</span>
              </div>
            </div>

            {/* Favorite Drinks List */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2C1A14] dark:text-coffee-300 block mb-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Saved Favorite Drinks
              </span>
              <div className="space-y-1.5">
                {user.favoriteDrinks && user.favoriteDrinks.length > 0 ? (
                  user.favoriteDrinks.map(drink => (
                    <div key={drink} className="bg-white dark:bg-coffee-900/60 px-3 py-2 rounded-xl border border-[#E5DCD3] dark:border-coffee-800 text-xs font-bold text-[#2C1A14] dark:text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Coffee className="w-3.5 h-3.5 text-[#C67C4E]" /> {drink}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#855E4C] dark:text-coffee-400 italic">No favorite drinks saved yet.</p>
                )}
              </div>
            </div>

            {/* Admin Smart Inventory Dashboard Trigger (If Admin role) */}
            {user.role === 'admin' && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2C1A14] dark:text-amber-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#C67C4E]" /> Admin Inventory Portal
                  </span>
                  <span className="text-[10px] bg-red-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                    Live Stock Engine
                  </span>
                </div>
                <p className="text-[11px] text-[#5C4337] dark:text-coffee-300 font-medium">
                  Monitor ingredient stock levels, receive low-stock alerts, and manage auto menu depletion.
                </p>
                <button
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setIsAdminDashboardOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm"
                >
                  Open Smart Inventory Dashboard
                </button>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                addToast('Logged out of Oak & Bean account.', 'info');
              }}
              className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" /> Sign Out of Account
            </button>

          </div>
        ) : (

          /* --- VIEW 2: LOGIN / SIGNUP TABS --- */
          <div className="space-y-6">
            
            {/* Modal Header */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C67C4E]">
                Oak & Bean Rewards & Order Sync
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#2C1A14] dark:text-white mt-1">
                {authTab === 'login' ? 'Welcome Back' : 'Create Your Account'}
              </h2>
            </div>

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#FDFBF7] dark:bg-coffee-900 rounded-2xl border border-[#E5DCD3] dark:border-coffee-800">
              <button
                onClick={() => setAuthTab('login')}
                className={`py-2 rounded-xl text-xs font-extrabold transition ${
                  authTab === 'login'
                    ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] shadow-sm'
                    : 'text-[#855E4C] dark:text-coffee-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthTab('signup')}
                className={`py-2 rounded-xl text-xs font-extrabold transition ${
                  authTab === 'signup'
                    ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] shadow-sm'
                    : 'text-[#855E4C] dark:text-coffee-300'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Quick Demo Credentials Assistant */}
            <div className="p-3 rounded-2xl bg-white dark:bg-coffee-900/60 border border-[#E5DCD3] dark:border-coffee-800 text-xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855E4C] dark:text-coffee-400 block">
                ⚡ Quick Demo Login Presets:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    login(DEMO_USER.email, 'password');
                    addToast(`Signed in as ${DEMO_USER.name}! ☕`, 'success');
                  }}
                  className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-coffee-950 border border-[#E5DCD3] dark:border-coffee-800 text-left hover:border-[#C67C4E]"
                >
                  <span className="font-bold text-[#2C1A14] dark:text-white block text-[11px]">{DEMO_USER.name}</span>
                  <span className="text-[9px] text-[#855E4C] dark:text-coffee-400">Customer Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    login(DEMO_ADMIN.email, 'password');
                    addToast(`Signed in as Admin Lead ${DEMO_ADMIN.name}! 🛡️`, 'success');
                  }}
                  className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-coffee-950 border border-[#E5DCD3] dark:border-coffee-800 text-left hover:border-[#C67C4E]"
                >
                  <span className="font-bold text-[#2C1A14] dark:text-white block text-[11px]">{DEMO_ADMIN.name}</span>
                  <span className="text-[9px] text-amber-600 font-bold">Admin Inventory Access</span>
                </button>
              </div>
            </div>

            {/* Form */}
            {authTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@oakandbean.coffee"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-xs font-medium focus:border-[#C67C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-xs font-medium focus:border-[#C67C4E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" /> Sign In to Account
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Scott"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-xs font-medium focus:border-[#C67C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. michael@example.com"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-xs font-medium focus:border-[#C67C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#2C1A14] dark:text-coffee-300 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-800 text-xs font-medium focus:border-[#C67C4E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" /> Create New Account
                </button>
              </form>
            )}

          </div>
        )}

      </motion.div>
    </div>
  );
}
