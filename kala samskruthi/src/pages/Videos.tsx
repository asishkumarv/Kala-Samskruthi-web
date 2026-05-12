import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { videos } from "@/data/artworks";

const Videos = () => {
  return (
    <div className="pt-20">
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">Behind the Canvas</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">
            Watch Our <em className="text-accent italic">Artwork</em> Videos
          </h1>
          <p className="text-muted-foreground mt-3 font-body">
            Experience the magic of art creation through our exclusive video gallery
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brown-deep/40 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-accent-foreground ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5 text-left">
                  <h3 className="font-display text-lg">{v.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
