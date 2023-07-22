import React, { useState, useContext, ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface shoppingCartContextProps {
  openCart(): void;
  closeCart(): void;
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity(id: number): number;
  incrementCartQuantity(id: number): void;
  decrementCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

interface CartItem {
  id: number;
  quantity: number;
}

const ShoppingContext = React.createContext({} as shoppingCartContextProps);

export const useShoopingContext = () => {
  return useContext(ShoppingContext);
};

export const ShoppingCartProvider = ({
  children
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  function openCart() {
    setIsCartOpen(true);
  }
  function closeCart() {
    setIsCartOpen(false);
  }
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function incrementCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decrementCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingContext.Provider
      value={{
        getItemQuantity,
        incrementCartQuantity,
        decrementCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
      }}
    >
      {children}
      <ShoppingCart isOpen={isCartOpen} />
    </ShoppingContext.Provider>
  );
};
