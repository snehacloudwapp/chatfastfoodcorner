import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logoImg from "@/assets/logo.jpg";

const navLinks = [
  { label: "Menu", href: "/#menu" },
  { label: "Offers", href: "/#offers" },
  { label: "Combos", href: "/#combos" },
  { label: "My Orders", href: "/orders" },
];

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Chhat Fast Food Corner" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-xl font-bold text-primary">Chhat Fast Food</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link =>
            link.href.startsWith("/") && !link.href.startsWith("/#") ? (
              <Link key={link.label} to={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>
            )
          )}
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map(link =>
              link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium py-2 text-muted-foreground hover:text-primary">
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-sm font-medium py-2 text-muted-foreground hover:text-primary">
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
