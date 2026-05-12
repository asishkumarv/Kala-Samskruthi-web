import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useArtworks } from "@/hooks/useArtworks";
import { useCart } from "@/context/CartContext";
import ArtCard from "@/components/ArtCard";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { data: artworks } = useArtworks();
  const { wishlist } = useCart();
  const wishlisted = artworks.filter((a) => wishlist.includes(a.id));

  return (
    <div className="pt-20">
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-center">
            My <em className="text-accent italic">Wishlist</em>
          </h1>
          <p className="text-muted-foreground mt-3 font-body text-center">
            {wishlisted.length} {wishlisted.length === 1 ? "item" : "items"} saved
          </p>

          {wishlisted.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="font-display text-2xl mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground font-body mb-6">
                Browse our collection and save artworks you love
              </p>
              <Link
                to="/moral-arts"
                className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded font-body font-medium hover:brightness-110 transition-all"
              >
                Explore Moral Arts
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {wishlisted.map((art) => (
                <ArtCard key={art.id} artwork={art} showDiscount />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
