import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import artistImg from "@/assets/artist.jpg";
import { artworks } from "@/data/artworks";
import ArtCard from "@/components/ArtCard";
import { Input } from "@/components/ui/input";

const stats = [
  { value: "500+", label: "Artworks" },
  { value: "200+", label: "Happy Clients" },
  { value: "15+", label: "Art Styles" },
];

const testimonials = [
  { text: "The Tanjore painting I received is absolutely breathtaking. The gold leaf work is exquisite and it's now the centerpiece of my living room.", name: "Anita Desai", city: "Mumbai" },
  { text: "Incredible craftsmanship! The Madhubani art piece I ordered exceeded all expectations. The colors are vibrant and the details are remarkable.", name: "Rajesh Kumar", city: "Delhi" },
  { text: "I've been collecting traditional art for years, and Kalā Samskruthi stands out for their authenticity and quality. Highly recommended!", name: "Priyanka Nair", city: "Kochi" },
];

const aboutStats = [
  { value: "25+", label: "Years of Tradition" },
  { value: "100%", label: "Handcrafted" },
  { value: "50+", label: "Art Forms" },
  { value: "Global", label: "Shipping" },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Art Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brown-deep/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent uppercase tracking-[0.3em] text-sm font-body mb-4"
          >
            Handcrafted Traditional Art
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight"
          >
            Experience the <em className="text-accent italic">Beauty</em> of Traditional Art
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-primary-foreground/80 mt-6 text-lg font-body font-light max-w-xl mx-auto"
          >
            Discover exquisite handmade moral arts that celebrate India's rich cultural heritage. Each piece is a unique masterpiece, crafted with passion and tradition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link
              to="/moral-arts"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded font-body font-medium hover:brightness-110 transition-all"
            >
              Explore Moral Arts <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded font-body font-medium hover:bg-primary-foreground/10 transition-all"
            >
              <Play className="h-4 w-4" /> Watch Artwork Videos
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center gap-12 mt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl text-accent">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70 font-body">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">Curated for You</p>
            <h2 className="font-display text-3xl md:text-4xl mt-2">
              Featured <em className="text-accent italic">Collection</em>
            </h2>
            <p className="text-muted-foreground mt-3 font-body max-w-xl mx-auto">
              Each artwork is a unique masterpiece, handcrafted by skilled artisans preserving centuries-old traditions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <ArtCard key={art.id} artwork={art} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/moral-arts"
              className="inline-flex items-center gap-2 border border-accent text-accent px-8 py-3 rounded font-body font-medium hover:bg-accent hover:text-accent-foreground transition-all"
            >
              View All Artworks <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={artistImg} alt="Artist at work" className="rounded-lg shadow-xl w-full max-w-md mx-auto" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl mt-2">
                Where Tradition Meets <em className="text-accent italic">Artistry</em>
              </h2>
              <p className="text-muted-foreground mt-4 font-body leading-relaxed">
                At Kalā Samskruthi Arts, we believe that art is the bridge between generations. Our artisans dedicate their lives to preserving India's rich artistic heritage, creating each piece with meticulous attention to detail and deep reverence for tradition.
              </p>
              <p className="text-muted-foreground mt-3 font-body leading-relaxed">
                From the intricate gold leaf work of Tanjore paintings to the geometric elegance of Warli art, every creation tells a story that spans centuries of cultural wisdom.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {aboutStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-2xl text-accent">{s.value}</p>
                    <p className="text-xs text-muted-foreground font-body">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">Testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl mt-2">
              What Our <em className="text-accent italic">Patrons</em> Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-lg p-6"
              >
                <Quote className="h-8 w-8 text-accent/30 mb-3" />
                <p className="text-foreground/80 font-body text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center font-display text-accent">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-body font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground font-body">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brown-deep">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">Stay Connected</p>
          <h2 className="font-display text-3xl text-primary-foreground mt-2">
            Join Our <em className="text-accent italic">Art Circle</em>
          </h2>
          <p className="text-primary-foreground/60 mt-3 font-body text-sm">
            Subscribe to receive updates on new collections, exclusive offers, and behind-the-scenes stories.
          </p>
          <div className="flex gap-2 mt-6">
            <Input placeholder="Enter your email" className="bg-brown-medium border-primary/30 text-primary-foreground placeholder:text-primary-foreground/40 font-body" />
            <button className="bg-accent text-accent-foreground px-6 py-2 rounded font-body font-medium hover:brightness-110 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
