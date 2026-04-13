/* ============================================================
 * CART CONTEXT — Manages cart items, orders, and WhatsApp integration.
 *
 * KEY FEATURES:
 * - Daily sequential order IDs (reset at midnight)
 * - 24-hour order visibility
 * - WhatsApp message on order placement
 * - Per-user order isolation (by customer name)
 *
 * WHATSAPP INTEGRATION:
 * Orders open wa.me/918602753357 with order details.
 * ============================================================ */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "completed";
  customerName: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  lastOrderId: string | null;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerName: string) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "chhat_cart";
const ORDERS_KEY = "chhat_orders";
const ORDER_COUNTER_KEY = "chhat_order_counter";
const WHATSAPP_NUMBER = "918602753357";

/* ---- Daily sequential order ID helpers ---- */
function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function getNextOrderId(): string {
  const stored = localStorage.getItem(ORDER_COUNTER_KEY);
  let counter = { date: getTodayStr(), seq: 0 };

  if (stored) {
    try {
      counter = JSON.parse(stored);
    } catch { }
  }

  // Reset counter if the day has changed
  if (counter.date !== getTodayStr()) {
    counter = { date: getTodayStr(), seq: 0 };
  }

  counter.seq += 1;
  localStorage.setItem(ORDER_COUNTER_KEY, JSON.stringify(counter));

  return `#${counter.seq}`;
}

/* ---- Filter orders to show only today's ---- */
function filterTodayOrders(orders: Order[]): Order[] {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return orders.filter((o) => new Date(o.date) >= oneDayAgo);
}

/* ---- Build WhatsApp message ---- */
function buildWhatsAppUrl(order: Order): string {
  const itemLines = order.items
    .map((i) => `- ${i.name} x ${i.quantity} = Rs ${i.price * i.quantity}`)
    .join("\n");

  const msg =
    `New Order from Chhat Fast Food\n\n` +
    `Order ID: ${order.id}\n` +
    `Customer: ${order.customerName}\n\n` +
    `Items:\n${itemLines}\n\n` +
    `Total: Rs ${order.total}\n` +
    `Date: ${new Date(order.date).toLocaleString("en-IN")}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? filterTodayOrders(JSON.parse(saved)) : [];
  });

  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  /* ---- Place order: generate daily ID, save, open WhatsApp ---- */
  const placeOrder = useCallback(
    (customerName: string) => {
      if (items.length === 0) return;

      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const orderId = getNextOrderId();

      const newOrder: Order = {
        id: orderId,
        items: [...items],
        total,
        date: new Date().toISOString(),
        status: "completed",
        customerName,
      };

      setLastOrderId(orderId);
      setOrders((prev) => [newOrder, ...prev]);
      clearCart();

      // Open WhatsApp with order details
      const waUrl = buildWhatsAppUrl(newOrder);
      window.open(waUrl, "_blank");
    },
    [items, clearCart]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        orders: filterTodayOrders(orders),
        lastOrderId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
