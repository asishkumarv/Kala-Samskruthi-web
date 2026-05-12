import { useState } from "react";
import { motion } from "framer-motion";
import { artworks, categories } from "@/data/artworks";
import ArtCard from "@/components/ArtCard";

const WallArt = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? artworks : artworks.filter((a) => a.category === active);

  return (
    <div className="pt-20">
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl">
            Moral <em className="text-accent italic">Arts</em> Gallery
          </h1>
          <p className="text-muted-foreground mt-3 font-body">
            Browse our curated collection of handcrafted traditional artworks
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-all border ${
                  active === cat
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          >
            {filtered.map((art) => (
              <ArtCard key={art.id} artwork={art} showDiscount />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WallArt;
