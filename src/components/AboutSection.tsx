/* ============================================================
 * ABOUT SECTION — Interactive section with scroll-based animations,
 * feature cards with icons, and engaging cafe story.
 * Uses IntersectionObserver for fade-in/slide animations.
 * ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Utensils, Truck, Star, Heart, Leaf, Clock } from "lucide-react";

const features = [
  { icon: Utensils, title: "Fresh Food", desc: "Made from scratch with premium ingredients every day." },
  { icon: Truck, title: "Fast Delivery", desc: "Hot meals delivered to your doorstep in minutes." },
  { icon: Star, title: "Best Taste", desc: "Recipes perfected over years for authentic flavours." },
  { icon: Heart, title: "Made with Love", desc: "Every dish is crafted with passion and care." },
  { icon: Leaf, title: "Quality First", desc: "We never compromise on freshness or hygiene." },
  { icon: Clock, title: "Quick Service", desc: "No long waits — grab your favourites in no time." },
];

/* Hook: returns true once the element scrolls into view */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const AboutSection = () => {
  const hero = useInView();
  const cards = useInView(0.1);

  return (
    <section className="py-16 md:py-20 bg-cafe-warm overflow-hidden" id="about">
      <div className="container max-w-5xl">

        {/* --- Story block with fade-in --- */}
        <div
          ref={hero.ref}
          className={`text-center mb-14 transition-all duration-700 ${
            hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-5">
            About <span className="text-primary">Chhat Fast Food Corner</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
            Born from a passion for bold flavours and fast service, Chhat Fast Food Corner has been
            serving happiness in every bite. We believe great food doesn't need to be expensive —
            just fresh, flavourful, and made with heart. Whether you're grabbing a quick snack or
            treating yourself to a full meal, we've got you covered.
          </p>
        </div>

        {/* --- Feature cards with staggered slide-in --- */}
        <div
          ref={cards.ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group flex flex-col items-center text-center p-5 md:p-7 bg-card rounded-2xl shadow-sm
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-500
                  ${cards.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: cards.visible ? `${i * 100}ms` : "0ms" }}
              >
                <div className="p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-card-foreground text-sm md:text-base">
                  {f.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
