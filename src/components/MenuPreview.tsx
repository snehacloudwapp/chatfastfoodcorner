import { Link } from "react-router-dom";
import { menuItems, type MenuItem } from "@/data/menuData";
import ItemCard from "./ItemCard";

interface Props {
  onDetail: (item: MenuItem) => void;
}

const MenuPreview = ({ onDetail }: Props) => {
  const preview = menuItems.filter(i => !i.isOffer).slice(0, 4);

  return (
    <section className="py-10" id="menu">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">📋 Menu</h2>
          <Link to="/category/all" className="text-sm font-medium text-primary hover:underline">
            View Full Menu →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preview.map(item => (
            <ItemCard key={item.id} item={item} onDetail={onDetail} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
