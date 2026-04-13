import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menuData";

interface Props {
  item: MenuItem;
  onClose: () => void;
}

const ItemDetailPopup = ({ item, onClose }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-card rounded-t-3xl md:rounded-3xl shadow-2xl animate-slide-up overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-card/80 rounded-full backdrop-blur-sm">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
        <img src={item.image} alt={item.name} className="w-full h-56 object-cover" width={512} height={512} />
        <div className="p-6">
          <h2 className="text-xl font-display font-bold text-card-foreground">{item.name}</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-primary">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-muted-foreground line-through">₹{item.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3 bg-secondary rounded-full p-1">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button onClick={handleAdd}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all">
              Add ₹{item.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPopup;
