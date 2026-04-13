/* ============================================================
 * ORDERS PAGE — Shows only today's orders for the current user.
 * Orders are visible for 24 hours only.
 * Footer stays at bottom via min-h-screen flex layout in App.
 * ============================================================ */

import { useCart } from "@/context/CartContext";
import { Package, MessageCircle } from "lucide-react";

const OrdersPage = () => {
  const { orders } = useCart();

  return (
    <div className="container py-6 pb-20 md:pb-6 flex-1">
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">My Orders</h1>
      <p className="text-sm text-muted-foreground mb-6">Showing today's orders only (last 24 hours)</p>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Package className="h-16 w-16 mb-4 opacity-30" />
          <p className="font-medium">No orders yet today</p>
          <p className="text-sm mt-1">Your orders will appear here for 24 hours</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl shadow-sm p-5 border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs text-muted-foreground">Order</span>
                  <p className="font-bold text-primary text-lg">{order.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {order.customerName}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary bg-secondary px-2 py-1 rounded-full">
                    <MessageCircle className="h-3 w-3" />
                    WhatsApp sent
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {order.items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="flex-1 text-sm text-card-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground">×{item.quantity}</span>
                    <span className="text-sm font-medium text-primary">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="font-bold text-foreground">Total: ₹{order.total}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(order.date).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
