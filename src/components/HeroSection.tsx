/* ============================================================
 * HERO SECTION — Swiper banner slider with autoplay & navigation.
 * Banners are loaded dynamically from src/data/bannerData.ts
 * To add more slides: just add entries to the bannerSlides array.
 * ============================================================ */

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { bannerSlides } from "@/data/bannerData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative" id="hero">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        className="h-[60vh] min-h-[400px] md:h-[70vh] md:min-h-[480px]"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                width={1920}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
              <div className="container relative z-10 h-full flex items-center">
                <div className="max-w-lg animate-fade-in">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-3 md:mt-4 text-base md:text-lg text-primary-foreground/80 font-body">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={scrollToMenu}
                    className="mt-5 md:mt-6 px-6 md:px-8 py-2.5 md:py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows */}
      <button className="hero-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-all">
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
      </button>
      <button className="hero-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-all">
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
      </button>
    </section>
  );
};

export default HeroSection;
