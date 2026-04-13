/* ============================================================
 * OFFERS SECTION — Interactive carousel with hover effects,
 * clickable reveal buttons, badges, and scale/fade animations.
 * Offer data comes from menuData.ts (items with isOffer: true).
 * Mobile: Swiper carousel | Desktop: horizontal cards
 * ============================================================ */

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { menuItems } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { Tag, Eye, ShoppingBag, Flame, Zap } from "lucide-react";

/* Badge labels based on discount % */
function getBadge(discount: number) {
  if (discount >= 50) return { label: "🔥 50% OFF", icon: Flame };
  if (discount >= 30) return { label: "⚡ Hot Deal", icon: Zap };
  if (discount >= 15) return { label: "🏷️ Special", icon: Tag };
  return { label: "🏷️ Offer", icon: Tag };
}

const OffersSection = () => {
  const { addToCart } = useCart();
  const offers = menuItems.filter((i) => i.isOffer);
  const [revealedId, setRevealedId] = useState<string | null>(null);

  return (
    <section className="py-8 md:py-12" id="offers">
      <div className="container">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            🏷️ Special Offers
          </h2>
          <span className="px-2.5 py-1 bg-destructive/10 text-destructive text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse">
            Limited Time
          </span>
        </div>

        {/* Carousel for mobile */}
        <div className="block md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.15}
            centeredSlides
            loop
          >
            {offers.map((item) => (
              <SwiperSlide key={item.id}>
                <OfferCard
                  item={item}
                  revealed={revealedId === item.id}
                  onReveal={() => setRevealedId(revealedId === item.id ? null : item.id)}
                  onAdd={() =>
                    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid for desktop */}
        <div className="hidden md:flex flex-col gap-4">
          {offers.map((item) => (
            <OfferCard
              key={item.id}
              item={item}
              revealed={revealedId === item.id}
              onReveal={() => setRevealedId(revealedId === item.id ? null : item.id)}
              onAdd={() =>
                addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Single offer card ---------- */
interface OfferCardProps {
  item: (typeof menuItems)[0];
  revealed: boolean;
  onReveal: () => void;
  onAdd: () => void;
}

const OfferCard = ({ item, revealed, onReveal, onAdd }: OfferCardProps) => {
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const badge = getBadge(discount);
  const BadgeIcon = badge.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-5 md:p-8 flex items-center gap-4 md:gap-8 group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-1 px-2.5 py-1 bg-card text-primary text-[10px] md:text-xs font-bold rounded-full shadow-md z-10">
          <BadgeIcon className="h-3 w-3" />
          {badge.label}
        </div>
      )}

      {/* Image with scale on hover */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        width={512}
        height={512}
        className="w-20 h-20 md:w-28 md:h-28 rounded-xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-lg md:text-xl text-primary-foreground">
          {item.name}
        </h3>
        <p className="text-sm text-primary-foreground/80 mt-1 line-clamp-1">
          {item.description}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-xl font-bold text-primary-foreground">₹{item.price}</span>
          {item.originalPrice && (
            <span className="text-sm text-primary-foreground/60 line-through">
              ₹{item.originalPrice}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs font-semibold bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Reveal discount details on click */}
        {revealed && (
          <div className="mt-2 animate-fade-in bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-primary-foreground">
            <Tag className="inline h-3.5 w-3.5 mr-1" />
            You save <strong>₹{(item.originalPrice || 0) - item.price}</strong> ({discount}% off)!
            Limited time offer.
          </div>
        )}
      </div>

      <div className="shrink-0 flex flex-col gap-2">
        <button
          onClick={onReveal}
          className="px-3 py-2 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground font-medium rounded-full hover:bg-primary-foreground/30 transition-all text-xs flex items-center gap-1"
        >
          <Eye className="h-3.5 w-3.5" />
          {revealed ? "Hide" : "Details"}
        </button>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-card text-primary font-semibold rounded-full hover:bg-card/90 hover:scale-105 transition-all text-sm flex items-center gap-1"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
    </div>
  );
};

export default OffersSection;
