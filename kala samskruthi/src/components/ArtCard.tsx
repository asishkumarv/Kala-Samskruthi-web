import { Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Artwork } from "@/data/artworks";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

type Props = {
  artwork: Artwork;
  showDiscount?: boolean;
};

const ArtCard = ({ artwork, showDiscount = false }: Props) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const isWished = wishlist.includes(artwork.id);
  const discount = Math.round(((artwork.originalPrice - artwork.price) / artwork.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group glass-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/artwork/${artwork.id}`} className="block relative overflow-hidden">
        <div className="w-full h-64 bg-muted flex items-center justify-center overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        {showDiscount && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-body font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(artwork.id); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <Heart className={`h-4 w-4 ${isWished ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(artwork); }}
            className="flex-1 bg-accent text-accent-foreground py-2.5 flex items-center justify-center gap-1.5 text-sm font-body font-medium"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </button>
          <button
            onClick={(e) => { e.preventDefault(); navigate("/checkout", { state: { buyNowItem: artwork } }); }}
            className="flex-1 bg-secondary text-secondary-foreground py-2.5 flex items-center justify-center gap-1.5 text-sm font-body font-medium border-l border-border"
          >
            <Zap className="h-4 w-4" /> Buy Now
          </button>
        </div>
      </Link>
      <Link to={`/artwork/${artwork.id}`} className="block p-4">
        <p className="text-xs uppercase tracking-wider text-accent font-body font-medium">{artwork.category}</p>
        <h3 className="font-display text-lg mt-1">{artwork.name}</h3>
        <p className="text-sm text-muted-foreground font-body">
          by {artwork.artist} · {artwork.size}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-accent">₹{artwork.price.toLocaleString()}</span>
            {showDiscount && (
              <span className="text-sm text-muted-foreground line-through">₹{artwork.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-accent">
            <Star className="h-4 w-4 fill-accent" />
            <span className="text-sm font-body">{artwork.rating}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtCard;
