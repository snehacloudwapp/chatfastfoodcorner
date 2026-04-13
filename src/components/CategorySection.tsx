import { useNavigate } from "react-router-dom";
import { categories } from "@/data/menuData";

interface Props {
  selected?: string;
  onSelect?: (id: string) => void;
  horizontal?: boolean;
}

const CategorySection = ({ selected = "all", onSelect, horizontal = false }: Props) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    if (onSelect) {
      onSelect(id);
    } else {
      navigate(`/category/${id}`);
    }
  };

  if (horizontal) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => handleClick(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              selected === cat.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}>
            <span className="text-lg">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">Categories</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => handleClick(cat.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                selected === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-card-foreground shadow-sm hover:shadow-md hover:scale-105"
              }`}>
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
