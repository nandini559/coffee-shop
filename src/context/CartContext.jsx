import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { generateDrinkStory } from '../utils/aiBaristaLogic';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'pickup'
  const [toasts, setToasts] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (item) => {
    // Generate AI Story for item
    const story = item.story || generateDrinkStory(item.name, item.category || 'Coffee');

    setCartItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += (item.quantity || 1);
        return updated;
      } else {
        return [...prev, {
          ...item,
          quantity: item.quantity || 1,
          story
        }];
      }
    });

    addToast(`Added "${item.name}" to cart! ☕`, 'success');
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find(i => i.id === id);
    setCartItems(prev => prev.filter(i => i.id !== id));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from cart.`, 'info');
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'OAK15' || cleanCode === 'AURA15') {
      setPromoCode('OAK15');
      setDiscountPercent(15);
      addToast('Applied 15% discount code! 🎉', 'success');
      return true;
    } else if (cleanCode === 'BREW20') {
      setPromoCode('BREW20');
      setDiscountPercent(20);
      addToast('Applied 20% BeanBuddy discount code! ☕', 'success');
      return true;
    } else if (cleanCode === 'MORNINGCOMBO') {
      setPromoCode('MORNINGCOMBO');
      setDiscountPercent(10);
      addToast('Applied Morning Combo promo code! 🥐', 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try "AURA15" or "BREW20"', 'error');
      return false;
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const placeOrder = (customerDetails) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = (subtotal * discountPercent) / 100;
    const deliveryFee = orderType === 'delivery' ? (subtotal > 25 ? 0 : 2.99) : 0;
    const tax = (subtotal - discount) * 0.0825;
    const total = subtotal - discount + deliveryFee + tax;

    const newOrder = {
      orderId: 'AB-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cartItems],
      customer: customerDetails,
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      orderType,
      status: 'Preparing', // Preparing -> Out for Delivery / Ready for Pickup -> Delivered
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: orderType === 'delivery' ? '15-20 mins' : '8-10 mins'
    };

    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if confetti canvas fails
    }

    addToast(`Order ${newOrder.orderId} successfully placed! ☕`, 'success');
  };

  const totalItemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      promoCode,
      discountPercent,
      orderType,
      setOrderType,
      toasts,
      addToast,
      removeToast,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyPromo,
      clearCart,
      placeOrder,
      activeOrder,
      setActiveOrder,
      totalItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
