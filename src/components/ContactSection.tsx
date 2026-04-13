import { MapPin, Phone, Clock } from "lucide-react";

const ContactSection = () => (
  <section className="py-14" id="contact">
    <div className="container">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">Contact Us</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {[
          { icon: MapPin, title: "Location", info: "Chhat Fast Food Corner, Main Road" },
          { icon: Phone, title: "Phone", info: "+91 86027 53357" },
          { icon: Clock, title: "Hours", info: "Mon-Sun: 10 AM – 11 PM" },
        ].map(({ icon: Icon, title, info }) => (
          <div key={title} className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm">
            <div className="p-3 bg-primary/10 rounded-full mb-3">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{info}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
