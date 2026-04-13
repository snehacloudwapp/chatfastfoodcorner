import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import logoImg from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-cafe-brown text-primary-foreground pt-12 pb-6">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logoImg} alt="Chhat Fast Food Corner" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display text-xl font-bold">Chhat Fast Food</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            Fresh &amp; Affordable Food — made with love, served fast. Your favourite corner for tasty bites.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/category/all" className="hover:opacity-100 transition-opacity">Full Menu</Link>
            <Link to="/orders" className="hover:opacity-100 transition-opacity">My Orders</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Main Road</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 86027 53357</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 10 AM – 11 PM</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Chhat Fast Food Corner. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
