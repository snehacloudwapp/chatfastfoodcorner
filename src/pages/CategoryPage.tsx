import { useState } from "react";
import { useParams } from "react-router-dom";
import { menuItems, type MenuItem } from "@/data/menuData";
import CategorySection from "@/components/CategorySection";
import ItemCard from "@/components/ItemCard";
import ItemDetailPopup from "@/components/ItemDetailPopup";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState(id || "all");
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);

  const filtered = selected === "all"
    ? menuItems
    : menuItems.filter(i => i.category === selected);

  return (
    <div className="pb-20 md:pb-0">
      <div className="container pt-6">
        <h1 className="text-2xl font-display font-bold text-foreground mb-4">Full Menu</h1>
        <CategorySection selected={selected} onSelect={setSelected} horizontal />
      </div>
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <ItemCard key={item.id} item={item} onDetail={setDetailItem} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No items in this category yet.</p>
        )}
      </div>
      {detailItem && (
        <ItemDetailPopup item={detailItem} onClose={() => setDetailItem(null)} />
      )}
    </div>
  );
};

export default CategoryPage;
