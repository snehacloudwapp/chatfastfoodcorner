import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const BottomCartBar = () => {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden">
      <button onClick={() => setIsCartOpen(true)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-primary text-primary-foreground rounded-2xl shadow-xl animate-slide-up">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-5 w-5" />
          <span className="font-semibold">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">₹{totalPrice}</span>
          <span className="text-sm opacity-80">View Cart →</span>
        </div>
      </button>
    </div>
  );
};

export default BottomCartBar;
