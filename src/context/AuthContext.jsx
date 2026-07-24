import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'user-1',
  name: 'Sarah Jenkins',
  email: 'sarah@oakandbean.coffee',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'user', // 'user' | 'admin'
  tier: 'Crema Gold Member',
  points: 480,
  memberSince: 'March 2024',
  favoriteDrinks: ['Nitro Lavender Cold Foam Brew', 'Oak & Bean Velvet Caramel Latte'],
  savedAddresses: ['742 Park Avenue, Apt 4B, Coffee District']
};

const DEMO_ADMIN = {
  id: 'admin-1',
  name: 'Alex Vance (Barista Lead)',
  email: 'admin@oakandbean.coffee',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  role: 'admin',
  tier: 'Master Roast Manager',
  points: 1250,
  memberSince: 'January 2024',
  favoriteDrinks: ['Single Shot Espresso'],
  savedAddresses: ['742 Crema Boulevard, Headquarters']
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('oak_bean_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup' | 'profile'

  useEffect(() => {
    if (user) {
      localStorage.setItem('oak_bean_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('oak_bean_user');
    }
  }, [user]);

  const login = (email, password) => {
    if (email.toLowerCase().includes('admin')) {
      setUser(DEMO_ADMIN);
    } else {
      setUser({
        ...DEMO_USER,
        email: email || DEMO_USER.email,
        name: email ? email.split('@')[0] : DEMO_USER.name
      });
    }
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: name || 'Coffee Enthusiast',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'user',
      tier: 'Crema Explorer Member',
      points: 100,
      memberSince: 'Just joined',
      favoriteDrinks: [],
      savedAddresses: []
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthModalOpen(false);
  };

  const toggleFavoriteDrink = (drinkName) => {
    if (!user) return;
    setUser(prev => {
      const exists = prev.favoriteDrinks.includes(drinkName);
      const updatedFavorites = exists
        ? prev.favoriteDrinks.filter(d => d !== drinkName)
        : [...prev.favoriteDrinks, drinkName];
      return { ...prev, favoriteDrinks: updatedFavorites };
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authTab,
      setAuthTab,
      toggleFavoriteDrink,
      DEMO_USER,
      DEMO_ADMIN
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
