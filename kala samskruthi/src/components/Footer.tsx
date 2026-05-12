import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-brown-deep text-primary-foreground/80">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Kalā" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <span className="font-display text-lg tracking-wider text-primary-foreground">KALĀ</span>
              <p className="text-xs text-accent tracking-widest uppercase">Samskruthi Arts</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            Preserving the beauty of traditional Indian art through handcrafted moral arts that tell stories of culture and heritage.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="h-9 w-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="h-9 w-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="h-9 w-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg text-accent mb-4">Quick Links</h4>
          <div className="space-y-2">
            {[
              { label: "Home", path: "/" },
              { label: "Moral Arts", path: "/moral-arts" },
              { label: "About Us", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link key={l.label} to={l.path} className="block text-sm hover:text-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg text-accent mb-4">Art Categories</h4>
          <div className="space-y-2 text-sm">
            {["Mandala Art", "Tanjore Paintings", "Madhubani Art", "Warli Art", "Pichwai Paintings", "Kalamkari Art"].map((cat) => (
              <Link key={cat} to="/moral-arts" className="block hover:text-accent transition-colors">{cat}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg text-accent mb-4">Get in Touch</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" /> Art Studio, Bengaluru, Karnataka, India</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent shrink-0" /> +91 98765 43210</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent shrink-0" /> hello@kalasamskruthi.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary/20 mt-8 pt-6 text-center text-sm">
        © 2026 Kala Samskruthi Arts. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
