import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Zap, Minus, Plus, ChevronRight, ImagePlus } from "lucide-react";
import { artworks } from "@/data/artworks";
import { useCart } from "@/context/CartContext";
import ArtCard from "@/components/ArtCard";
import { motion } from "framer-motion";

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === Number(id));
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!artwork) {
    return (
      <div className="pt-24 text-center min-h-screen">
        <p className="font-body text-muted-foreground">Artwork not found.</p>
        <Link to="/moral-arts" className="text-accent font-body mt-4 inline-block">← Back to Gallery</Link>
      </div>
    );
  }

  const isWished = wishlist.includes(artwork.id);
  const related = artworks.filter((a) => a.id !== artwork.id).slice(0, 3);
  const discount = Math.round(((artwork.originalPrice - artwork.price) / artwork.originalPrice) * 100);
  const reviewCount = artwork.reviews.length;
  const displayImages = artwork.images && artwork.images.length > 0 ? artwork.images : [artwork.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(artwork);
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { buyNowItem: { ...artwork, quantity } } });
  };

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="px-4">
        <div className="container mx-auto py-4">
          <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/moral-arts" className="hover:text-accent transition-colors">Moral Arts</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{artwork.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image with vertical thumbnails on left */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex flex-col-reverse sm:flex-row gap-4">
                {/* Vertical thumbnails */}
                <div className="flex sm:flex-col gap-3 sm:w-20 shrink-0 overflow-x-auto sm:overflow-x-visible sm:overflow-y-auto sm:max-h-[600px]">
                  {displayImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === index ? "border-accent" : "border-border hover:border-accent/50"
                      }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                {/* Main image + button below it */}
                <div className="flex-1 space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={displayImages[selectedImage]}
                      alt={artwork.name}
                      className="w-full rounded-lg"
                      style={{ maxHeight: "600px", objectFit: "contain", backgroundColor: "hsl(var(--muted))" }}
                    />
                    {discount > 0 && (
                      <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-body font-semibold px-3 py-1 rounded">
                        {discount}% OFF
                      </span>
                    )}
                    <button
                      onClick={() => toggleWishlist(artwork.id)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${isWished ? "fill-accent text-accent" : "text-foreground"}`} />
                    </button>
                  </div>
                  <Link
                    to="/upload-wall-art"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded bg-accent text-accent-foreground font-body font-medium hover:brightness-110 transition-all"
                  >
                    <ImagePlus className="h-5 w-5" /> Customize Your Own Artwork
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <span className="text-xs uppercase tracking-wider text-accent font-body font-medium">{artwork.category}</span>
              <h1 className="font-display text-3xl md:text-4xl mt-3">{artwork.name}</h1>
              <p className="text-muted-foreground font-body mt-1">by {artwork.artist}</p>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(artwork.rating) ? "fill-accent text-accent" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm font-body text-muted-foreground">{artwork.rating}</span>
                <span className="text-sm font-body text-muted-foreground">({reviewCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mt-5">
                <span className="font-display text-3xl text-accent">₹{artwork.price.toLocaleString()}</span>
                <span className="text-lg text-muted-foreground line-through font-body">₹{artwork.originalPrice.toLocaleString()}</span>
              </div>

              <p className="text-muted-foreground font-body mt-4 leading-relaxed">{artwork.description}</p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-6 border-t border-border">
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-body font-medium">Size</p>
                  <p className="font-body text-foreground mt-1">{artwork.size}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-body font-medium">Material</p>
                  <p className="font-body text-foreground mt-1">{artwork.material}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-body font-medium">Stock</p>
                  <p className={`font-body mt-1 ${artwork.stock <= 3 ? "text-destructive font-medium" : "text-foreground"}`}>
                    {artwork.stock <= 3 ? `Only ${artwork.stock} left!` : `${artwork.stock} available`}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-body font-medium">Category</p>
                  <p className="font-body text-foreground mt-1">{artwork.category}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-body font-medium text-foreground mb-3">Frame Size</p>
                <div className="flex gap-2 flex-wrap">
                  {artwork.frameSizes.map((frame, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFrame(index)}
                      className={`px-4 py-2 rounded border font-body text-sm transition-all ${
                        selectedFrame === index
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted-foreground hover:border-accent"
                      }`}
                    >
                      {frame.label} ({frame.dimensions})
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-body font-medium text-foreground mb-3">Quantity</p>
                <div className="inline-flex items-center border border-border rounded">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2.5 hover:bg-muted transition-colors">
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <span className="px-5 py-2 font-body text-foreground min-w-[48px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(artwork.stock, q + 1))} className="p-2.5 hover:bg-muted transition-colors">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border border-accent text-accent py-3.5 rounded font-body font-medium flex items-center justify-center gap-2 hover:bg-accent/10 transition-all"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-accent text-accent-foreground py-3.5 rounded font-body font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                >
                  <Zap className="h-5 w-5" /> Buy Now
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                {[
                  { icon: Truck, text: "Free Shipping" },
                  { icon: Shield, text: "Secure Payment" },
                  { icon: RotateCcw, text: "Easy Returns" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="text-center">
                    <Icon className="h-5 w-5 text-accent mx-auto mb-1" />
                    <p className="text-xs font-body text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl mb-8">Customer Reviews ({reviewCount})</h2>
            <div className="space-y-6">
              {artwork.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border pb-6 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-body font-medium text-foreground">{review.name}</p>
                    <p className="text-sm font-body text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="font-body text-muted-foreground">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <h2 className="font-display text-2xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((art) => (
                <ArtCard key={art.id} artwork={art} showDiscount />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtworkDetail;
