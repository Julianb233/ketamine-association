'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';

// Cart item type
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

// Cart state type
interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isInitialized: boolean;
}

// Cart action types
type CartAction =
  | { type: 'INITIALIZE'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean };

// Cart context type
interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  isInitialized: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
  isInCart: (id: string) => boolean;
}

// Storage key for localStorage
const CART_STORAGE_KEY = 'ketamine-store-cart';

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        items: action.payload,
        isInitialized: true,
        isLoading: false,
      };

    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }

      // New item
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

// Initial state
const initialState: CartState = {
  items: [],
  isLoading: true,
  isInitialized: false,
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          dispatch({ type: 'INITIALIZE', payload: parsedCart });
        } else {
          dispatch({ type: 'INITIALIZE', payload: [] });
        }
      } else {
        dispatch({ type: 'INITIALIZE', payload: [] });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      dispatch({ type: 'INITIALIZE', payload: [] });
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (state.isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, state.isInitialized]);

  // Add item to cart
  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: { ...item, quantity },
      });
    },
    []
  );

  // Remove item from cart
  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // Get quantity of specific item
  const getItemQuantity = useCallback(
    (id: string) => {
      const item = state.items.find((item) => item.id === id);
      return item?.quantity ?? 0;
    },
    [state.items]
  );

  // Check if item is in cart
  const isInCart = useCallback(
    (id: string) => {
      return state.items.some((item) => item.id === id);
    },
    [state.items]
  );

  // Calculate derived values
  const itemCount = useMemo(
    () => state.items.reduce((count, item) => count + item.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    [state.items]
  );

  const value: CartContextType = {
    items: state.items,
    isLoading: state.isLoading,
    isInitialized: state.isInitialized,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Export context for advanced use cases
export { CartContext };
