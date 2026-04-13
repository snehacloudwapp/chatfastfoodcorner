import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menuData";

interface Props {
  item: MenuItem;
  onDetail?: (item: MenuItem) => void;
}

const ItemCard = ({ item, onDetail }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
      onClick={() => onDetail?.(item)}>
      <div className="relative overflow-hidden aspect-square">
        <img src={item.image} alt={item.name} loading="lazy" width={512} height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {item.isOffer && item.originalPrice && (
          <span className="absolute top-3 left-3 bg-offer text-offer-foreground text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground text-sm">{item.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{item.originalPrice}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }); }}
            className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded-full transition-all">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
