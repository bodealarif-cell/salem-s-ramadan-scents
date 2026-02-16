import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shipping: number;
  name: string;
  phone: string;
  address: string;
  date: string;
  paid: boolean;
}

const CART_KEY = "salem_cart";
const ORDERS_KEY = "salem_orders";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: number, size: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = total >= 350 ? 0 : 60;

  const addOrder = useCallback((order: Omit<Order, "id" | "date" | "paid">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ar-EG"),
      paid: false,
    };
    setOrders(prev => [newOrder, ...prev]);
  }, []);

  const debt = orders.filter(o => !o.paid).reduce((sum, o) => sum + o.total + o.shipping, 0);

  return { items, addItem, removeItem, clearCart, total, count, shipping, orders, addOrder, debt };
}
