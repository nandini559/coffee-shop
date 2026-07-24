import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import { X, AlertTriangle, ShieldCheck, RefreshCw, Plus, Minus, Package, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminInventoryModal() {
  const {
    inventory,
    outOfStockIngredients,
    lowStockIngredients,
    outOfStockMenuItemIds,
    restockIngredient,
    setIngredientStock,
    resetInventoryToDefault,
    isAdminDashboardOpen,
    setIsAdminDashboardOpen
  } = useInventory();

  const { addToast } = useCart();

  if (!isAdminDashboardOpen) return null;

  const handleRestockAll = () => {
    resetInventoryToDefault();
    addToast('Restocked all ingredients to full capacity! 📦', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 space-y-6 text-[#2C1A14] dark:text-white border border-[#E5DCD3] dark:border-amber-400/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5DCD3] dark:border-coffee-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B]">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-serif font-bold text-[#2C1A14] dark:text-white">Smart Inventory Dashboard</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase">
                  Real-time Sync
                </span>
              </div>
              <p className="text-xs text-[#855E4C] dark:text-coffee-300 font-medium mt-0.5">
                Automated stock depletion engine & menu availability control
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminDashboardOpen(false)}
            className="p-2 rounded-full bg-[#FAF7F2] dark:bg-coffee-900 text-[#2C1A14] dark:text-coffee-300 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Alert Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-coffee-900/80 border border-[#E5DCD3] dark:border-coffee-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#855E4C] dark:text-coffee-400 block">Total Managed</span>
              <span className="text-xl font-black text-[#2C1A14] dark:text-white">{inventory.length} Items</span>
            </div>
            <Package className="w-6 h-6 text-[#C67C4E]" />
          </div>

          <div className={`p-3.5 rounded-2xl border flex items-center justify-between shadow-sm ${
            lowStockIngredients.length > 0
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300'
              : 'bg-white dark:bg-coffee-900/80 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white'
          }`}>
            <div>
              <span className="text-[10px] font-extrabold uppercase block">Low Stock Alert</span>
              <span className="text-xl font-black">{lowStockIngredients.length} Ingredients</span>
            </div>
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>

          <div className={`p-3.5 rounded-2xl border flex items-center justify-between shadow-sm ${
            outOfStockIngredients.length > 0
              ? 'bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-300'
              : 'bg-white dark:bg-coffee-900/80 border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white'
          }`}>
            <div>
              <span className="text-[10px] font-extrabold uppercase block">Depleted (Out of Stock)</span>
              <span className="text-xl font-black">{outOfStockIngredients.length} Ingredients</span>
            </div>
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
        </div>

        {/* Ingredients Inventory Table */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {inventory.map(item => {
            const isOut = item.stock === 0;
            const isLow = item.stock > 0 && item.stock <= item.lowThreshold;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isOut
                    ? 'bg-red-500/5 border-red-500/30'
                    : isLow
                    ? 'bg-amber-500/5 border-amber-500/30'
                    : 'bg-white dark:bg-coffee-900/60 border-[#E5DCD3] dark:border-coffee-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#2C1A14] dark:text-white">{item.name}</h4>
                    {isOut && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                        Out of Stock
                      </span>
                    )}
                    {isLow && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">
                        Low Stock Alert
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#855E4C] dark:text-coffee-400 font-medium block">
                    Category: {item.category} • Threshold: {item.lowThreshold} {item.unit}
                  </span>
                </div>

                {/* Stock Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-[#FAF7F2] dark:bg-coffee-950 p-1.5 rounded-xl border border-[#E5DCD3] dark:border-coffee-800">
                    <button
                      onClick={() => setIngredientStock(item.id, item.stock - 1)}
                      className="p-1 rounded-lg hover:bg-[#E5DCD3] dark:hover:bg-coffee-800 text-[#2C1A14] dark:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={item.stock}
                      onChange={e => setIngredientStock(item.id, e.target.value)}
                      className="w-12 text-center text-xs font-black bg-transparent focus:outline-none text-[#2C1A14] dark:text-white"
                    />
                    <span className="text-[10px] text-[#855E4C] dark:text-coffee-400 font-bold pr-1">{item.unit}</span>
                    <button
                      onClick={() => setIngredientStock(item.id, item.stock + 1)}
                      className="p-1 rounded-lg hover:bg-[#E5DCD3] dark:hover:bg-coffee-800 text-[#2C1A14] dark:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      restockIngredient(item.id, 10);
                      addToast(`Restocked ${item.name} (+10 ${item.unit})`, 'success');
                    }}
                    className="px-3 py-2 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:opacity-90 text-white dark:text-[#160F0B] font-extrabold text-xs uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Restock
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E5DCD3] dark:border-coffee-800 flex items-center justify-between">
          <span className="text-xs text-[#855E4C] dark:text-coffee-400 font-medium">
            Auto Depletion Mode: <strong>ACTIVE</strong> (Out of stock items disable menu order buttons)
          </span>

          <button
            onClick={handleRestockAll}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Restock All Ingredients
          </button>
        </div>

      </motion.div>
    </div>
  );
}
