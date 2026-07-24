import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext();

const INITIAL_INVENTORY = [
  {
    id: 'ing-1',
    name: 'Ethiopian Single Origin Espresso Beans',
    category: 'Coffee Beans',
    stock: 18,
    unit: 'kg',
    lowThreshold: 5,
    relatedMenuItemIds: ['item-1', 'item-3', 'item-5', 'item-6', 'item-12']
  },
  {
    id: 'ing-2',
    name: 'Barista Organic Oat Milk',
    category: 'Dairy & Alternatives',
    stock: 3, // LOW STOCK ALERT
    unit: 'Liters',
    lowThreshold: 8,
    relatedMenuItemIds: ['item-[oat-milk]', 'item-3']
  },
  {
    id: 'ing-3',
    name: 'French Lavender Syrup Extract',
    category: 'Gourmet Syrups',
    stock: 0, // OUT OF STOCK ALERT
    unit: 'Bottles',
    lowThreshold: 3,
    relatedMenuItemIds: ['item-2'] // Nitro Lavender Cold Foam Brew
  },
  {
    id: 'ing-4',
    name: 'Uji Ceremonial Kyoto Matcha',
    category: 'Teas & Powder',
    stock: 12,
    unit: 'Tins',
    lowThreshold: 3,
    relatedMenuItemIds: ['item-4']
  },
  {
    id: 'ing-5',
    name: 'Fresh French Normandy Butter Croissants',
    category: 'Bakery',
    stock: 15,
    unit: 'Units',
    lowThreshold: 5,
    relatedMenuItemIds: ['item-7']
  },
  {
    id: 'ing-6',
    name: 'Hass Organic Avocado',
    category: 'Fresh Produce',
    stock: 0, // OUT OF STOCK ALERT
    unit: 'Units',
    lowThreshold: 5,
    relatedMenuItemIds: ['item-10'] // Vegan Avocado Sourdough Toast
  },
  {
    id: 'ing-7',
    name: 'Belgian 70% Dark Chocolate',
    category: 'Bakery & Syrups',
    stock: 14,
    unit: 'kg',
    lowThreshold: 4,
    relatedMenuItemIds: ['item-6', 'item-11']
  }
];

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('oak_bean_inventory');
      return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
    } catch {
      return INITIAL_INVENTORY;
    }
  });

  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('oak_bean_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Derived calculations
  const outOfStockIngredients = inventory.filter(item => item.stock === 0);
  const lowStockIngredients = inventory.filter(item => item.stock > 0 && item.stock <= item.lowThreshold);

  // Compute menu item IDs that are automatically out of stock due to ingredient depletion
  const outOfStockMenuItemIds = inventory
    .filter(item => item.stock === 0)
    .flatMap(item => item.relatedMenuItemIds);

  const restockIngredient = (id, amount = 10) => {
    setInventory(prev =>
      prev.map(item => item.id === id ? { ...item, stock: item.stock + amount } : item)
    );
  };

  const setIngredientStock = (id, newStock) => {
    const stockVal = Math.max(0, Number(newStock) || 0);
    setInventory(prev =>
      prev.map(item => item.id === id ? { ...item, stock: stockVal } : item)
    );
  };

  const resetInventoryToDefault = () => {
    setInventory(INITIAL_INVENTORY);
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      outOfStockIngredients,
      lowStockIngredients,
      outOfStockMenuItemIds,
      restockIngredient,
      setIngredientStock,
      resetInventoryToDefault,
      isAdminDashboardOpen,
      setIsAdminDashboardOpen
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
