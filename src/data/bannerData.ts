/* ============================================================
 * BANNER DATA — Dynamic banner slides for the Swiper hero slider.
 * To add/remove banners, simply edit this array.
 * Each banner needs: id, image, title, subtitle, buttonText.
 * ============================================================ */

import banner1 from "@/assets/banners/banner1.jpg";
import banner2 from "@/assets/banners/banner2.jpg";
import banner3 from "@/assets/banners/banner3.jpg";

export interface BannerSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export const bannerSlides: BannerSlide[] = [
  {
    id: "slide1",
    image: banner1,
    title: "Chhat Fast Food Corner",
    subtitle: "Tasty, fresh & affordable fast food. Order your favourites now!",
    buttonText: "Order Now",
  },
  {
    id: "slide2",
    image: banner2,
    title: "Fresh Pasta Specials",
    subtitle: "Handcrafted pasta made with love — creamy, spicy, or classic!",
    buttonText: "View Menu",
  },
  {
    id: "slide3",
    image: banner3,
    title: "Cool Beverages",
    subtitle: "Beat the heat with our refreshing smoothies & cold drinks!",
    buttonText: "Explore Drinks",
  },
];
