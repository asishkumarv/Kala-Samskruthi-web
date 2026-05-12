import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";
import { useState } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Moral Arts", path: "/moral-arts" },
  { label: "Customize Your Own Artwork", path: "/upload-wall-art" },
  { label: "Videos", path: "/videos" },
  { label: "Track Order", path: "/track-order" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlistCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brown-deep/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Kalā" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <span className="font-display text-lg tracking-wider text-primary-foreground">KALĀ</span>
            <p className="text-xs text-accent tracking-widest uppercase">Samskruthi Arts</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-body tracking-wide transition-colors ${
                location.pathname === link.path
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "text-primary-foreground/80 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
              <Heart className="h-5 w-5 text-primary-foreground/80 hover:text-accent transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-body font-semibold">
                  {wishlistCount}
                </span>
              )}
            </div>
          ) : (
            <Heart
              className="h-5 w-5 text-primary-foreground/80 hover:text-accent cursor-pointer transition-colors"
              onClick={() => navigate("/login")}
            />
          )}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart className="h-5 w-5 text-primary-foreground/80 hover:text-accent transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-body font-semibold">
                {cartCount}
              </span>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary-foreground font-body hidden sm:inline">{user.name}</span>
              <button onClick={logout} className="text-primary-foreground/80 hover:text-accent transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <User
              className="h-5 w-5 text-primary-foreground/80 hover:text-accent cursor-pointer transition-colors"
              onClick={() => navigate("/login")}
            />
          )}

          {/* Mobile menu button */}
          <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-brown-deep border-t border-primary/20 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-body tracking-wide py-2 ${
                location.pathname === link.path ? "text-accent" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
