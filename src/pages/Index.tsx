import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import PopularItems from "@/components/PopularItems";
import OffersSection from "@/components/OffersSection";
import CombosSection from "@/components/CombosSection";
import MenuPreview from "@/components/MenuPreview";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ItemDetailPopup from "@/components/ItemDetailPopup";
import type { MenuItem } from "@/data/menuData";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div className="pb-20 md:pb-0 flex-1">
      <HeroSection />
      <CategorySection />
      <PopularItems onDetail={setSelectedItem} />
      <OffersSection />
      <CombosSection />
      <MenuPreview onDetail={setSelectedItem} />
      <AboutSection />
      <ContactSection />

      {selectedItem && (
        <ItemDetailPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default Index;
