import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, placeOrder, lastOrderId } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handlePlaceOrder = () => {
    setShowNamePrompt(true);
  };

  const handleConfirmOrder = () => {
    if (!customerName.trim()) return;
    placeOrder(customerName.trim());
    setShowNamePrompt(false);
    setCustomerName("");
    setShowConfirmation(true);
  };

  const handleGoToOrders = () => {
    setShowConfirmation(false);
    setIsCartOpen(false);
    navigate("/orders");
  };

  return (
    <div className="fixed inset-0 z-[70]" onClick={() => { if (!showConfirmation && !showNamePrompt) setIsCartOpen(false); }}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl flex flex-col animate-slide-up"
        onClick={e => e.stopPropagation()}>

        {showConfirmation ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle2 className="h-20 w-20 text-primary mb-6" />
            <h2 className="font-display text-2xl font-bold text-card-foreground mb-2">Order Placed Successfully!</h2>
            <p className="text-muted-foreground mb-1">Your order has been confirmed</p>
            {lastOrderId && (
              <p className="text-primary font-bold text-lg mb-8">Order {lastOrderId}</p>
            )}
            <button onClick={handleGoToOrders}
              className="w-full max-w-xs py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all">
              View My Orders
            </button>
          </div>
        ) : showNamePrompt ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-primary mb-6" />
            <h2 className="font-display text-2xl font-bold text-card-foreground mb-2">Confirm Your Order</h2>
            <p className="text-muted-foreground mb-6">Please enter your name to place the order</p>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="Your name"
              className="w-full max-w-xs px-4 py-3 border border-border rounded-xl text-center text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              autoFocus
              onKeyDown={e => e.key === "Enter" && handleConfirmOrder()}
            />
            <div className="flex items-center justify-between w-full max-w-xs mb-4 px-2">
              <span className="text-muted-foreground font-medium">Total</span>
              <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
            </div>
            <div className="flex gap-3 w-full max-w-xs">
              <button onClick={() => setShowNamePrompt(false)}
                className="flex-1 py-3 border border-border text-foreground font-semibold rounded-full hover:bg-secondary transition-all">
                Back
              </button>
              <button onClick={handleConfirmOrder}
                disabled={!customerName.trim()}
                className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all disabled:opacity-50">
                Confirm Order
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-display text-lg font-bold text-card-foreground flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag className="h-16 w-16 mb-4 opacity-30" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1">Add some delicious items!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-card-foreground truncate">{item.name}</p>
                        <p className="text-primary font-bold text-sm">₹{item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 rounded-full bg-card hover:bg-primary/10 transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded-full bg-card hover:bg-primary/10 transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                        <button onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-full text-destructive hover:bg-destructive/10 transition-colors ml-1">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground font-medium">Total</span>
                  <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
                </div>
                <button onClick={handlePlaceOrder}
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all">
                  Place Order
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
