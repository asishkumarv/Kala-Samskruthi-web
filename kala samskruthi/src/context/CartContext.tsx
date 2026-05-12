import { useArtworks } from "@/hooks/useArtworks";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Artwork } from "@/data/artworks";
import { useAuth } from "@/context/AuthContext";

type CartItem = Artwork & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  toggleWishlist: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
  wishlistCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const getWishlistKey = (email: string) => `wishlist_${email}`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: artworks } = useArtworks();
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load user-specific wishlist when user changes
  useEffect(() => {
    if (user?.email) {
      const stored = localStorage.getItem(getWishlistKey(user.email));
      setWishlist(stored ? JSON.parse(stored) : []);
    } else {
      setWishlist([]);
    }
  }, [user?.email]);

  // Persist wishlist to localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(getWishlistKey(user.email), JSON.stringify(wishlist));
    }
  }, [wishlist, user?.email]);

  const addToCart = (artwork: Artwork) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...artwork, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, clearCart, cartCount, wishlistCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
