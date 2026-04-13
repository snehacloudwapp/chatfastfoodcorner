import { comboItems } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

const CombosSection = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-10 bg-cafe-cream" id="combos">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">🎉 Combos</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {comboItems.map(combo => (
            <div key={combo.id}
              className="min-w-[280px] bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden flex-shrink-0">
              <div className="relative h-40 overflow-hidden">
                <img src={combo.image} alt={combo.name} loading="lazy" width={512} height={512}
                  className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-offer text-offer-foreground text-xs font-bold px-2 py-1 rounded-full">
                  Save ₹{combo.originalPrice - combo.price}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-card-foreground">{combo.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{combo.items.join(" + ")}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">₹{combo.price}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{combo.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => addToCart({ id: combo.id, name: combo.name, price: combo.price, image: combo.image })}
                    className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-all">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombosSection;
