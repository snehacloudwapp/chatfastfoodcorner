import pizzaImg from "@/assets/food/pizza.jpg";
import burgerImg from "@/assets/food/burger.jpg";
import coffeeImg from "@/assets/food/coffee.jpg";
import pastaImg from "@/assets/food/pasta.jpg";
import saladImg from "@/assets/food/salad.jpg";
import brownieImg from "@/assets/food/brownie.jpg";
import smoothieImg from "@/assets/food/smoothie.jpg";
import friesImg from "@/assets/food/fries.jpg";
import colaImg from "@/assets/food/cola.jpg";
import sandwichImg from "@/assets/food/sandwich.jpg";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  isPopular?: boolean;
  isOffer?: boolean;
}

export interface ComboItem {
  id: string;
  name: string;
  items: string[];
  price: number;
  originalPrice: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "burger", name: "Burgers", icon: "🍔" },
  { id: "beverage", name: "Beverages", icon: "☕" },
  { id: "pasta", name: "Pasta", icon: "🍝" },
  { id: "snacks", name: "Snacks", icon: "🍟" },
  { id: "dessert", name: "Desserts", icon: "🍫" },
  { id: "salad", name: "Salads", icon: "🥗" },
];

export const menuItems: MenuItem[] = [
  { id: "1", name: "Margherita Pizza", price: 249, description: "Classic pizza with fresh mozzarella, tomato sauce and basil leaves on a thin crust base.", image: pizzaImg, category: "pizza", isPopular: true },
  { id: "2", name: "Classic Cheeseburger", price: 179, description: "Juicy beef patty with melted cheese, lettuce, tomato and our special sauce.", image: burgerImg, category: "burger", isPopular: true },
  { id: "3", name: "Cappuccino", price: 129, description: "Rich espresso with steamed milk and a layer of creamy foam, topped with cocoa.", image: coffeeImg, category: "beverage", isPopular: true },
  { id: "4", name: "Alfredo Pasta", price: 219, description: "Creamy alfredo sauce tossed with fettuccine pasta, garnished with parmesan and herbs.", image: pastaImg, category: "pasta", isPopular: true },
  { id: "5", name: "Green Salad Bowl", price: 159, description: "Fresh avocado, cherry tomatoes, cucumber and feta cheese with olive oil dressing.", image: saladImg, category: "salad" },
  { id: "6", name: "Chocolate Brownie", price: 149, description: "Warm chocolate brownie served with vanilla ice cream and chocolate drizzle.", image: brownieImg, category: "dessert", isPopular: true },
  { id: "7", name: "Mango Smoothie", price: 139, description: "Fresh mango blended with yogurt and honey for a tropical refreshment.", image: smoothieImg, category: "beverage" },
  { id: "8", name: "Crispy Fries", price: 99, description: "Golden crispy french fries seasoned with salt and served with ketchup.", image: friesImg, category: "snacks", isPopular: true },
  { id: "9", name: "Cold Cola", price: 59, description: "Refreshing chilled cola served with ice and a lemon slice.", image: colaImg, category: "beverage" },
  { id: "10", name: "Chicken Sandwich", price: 169, description: "Grilled chicken breast with lettuce, tomato and mayo in a toasted bun.", image: sandwichImg, category: "snacks" },
  { id: "11", name: "Veggie Burger", price: 99, originalPrice: 149, description: "Crispy veggie patty with fresh vegetables and tangy mayo.", image: burgerImg, category: "burger", isOffer: true },
  { id: "12", name: "Iced Coffee", price: 79, originalPrice: 119, description: "Cold brewed coffee served over ice with a hint of vanilla.", image: coffeeImg, category: "beverage", isOffer: true },
  { id: "13", name: "Pasta Arrabiata", price: 159, originalPrice: 219, description: "Spicy tomato-based pasta with garlic, chili flakes and fresh basil.", image: pastaImg, category: "pasta", isOffer: true },
];

export const comboItems: ComboItem[] = [
  { id: "c1", name: "Pizza + Cola Combo", items: ["Margherita Pizza", "Cold Cola"], price: 269, originalPrice: 308, image: pizzaImg },
  { id: "c2", name: "Burger + Fries Combo", items: ["Classic Cheeseburger", "Crispy Fries"], price: 229, originalPrice: 278, image: burgerImg },
  { id: "c3", name: "Pasta + Smoothie Combo", items: ["Alfredo Pasta", "Mango Smoothie"], price: 299, originalPrice: 358, image: pastaImg },
];
