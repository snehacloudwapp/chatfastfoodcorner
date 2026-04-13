import { menuItems, type MenuItem } from "@/data/menuData";
import ItemCard from "./ItemCard";

interface Props {
  onDetail: (item: MenuItem) => void;
}

const PopularItems = ({ onDetail }: Props) => {
  const popular = menuItems.filter(i => i.isPopular);

  return (
    <section className="py-10 bg-cafe-warm" id="popular">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">🔥 Popular Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popular.map(item => (
            <ItemCard key={item.id} item={item} onDetail={onDetail} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItems;
