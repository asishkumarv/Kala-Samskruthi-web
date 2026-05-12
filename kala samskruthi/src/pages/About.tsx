import { motion } from "framer-motion";
import { Shield, Gem, Lightbulb, Heart } from "lucide-react";
import artistImg from "@/assets/artist.jpg";
import art1 from "@/assets/art1.jpg";
import art5 from "@/assets/art5.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const values = [
  { icon: Shield, title: "Authenticity", desc: "Every piece is genuinely handcrafted using traditional techniques passed down through generations." },
  { icon: Gem, title: "Quality", desc: "We use only the finest materials — natural pigments, gold leaf, and premium canvases." },
  { icon: Lightbulb, title: "Innovation", desc: "While honoring tradition, we embrace contemporary design sensibilities." },
  { icon: Heart, title: "Passion", desc: "Art is not just our business — it's our calling and our way of preserving culture." },
];

const timeline = [
  { year: "2001", title: "The Beginning", desc: "Started as a small home studio with a passion for preserving traditional art forms." },
  { year: "2008", title: "First Exhibition", desc: "Showcased our collection at the National Art Gallery, receiving critical acclaim." },
  { year: "2015", title: "Going Digital", desc: "Launched our online gallery to bring traditional art to art lovers worldwide." },
  { year: "2023", title: "Global Reach", desc: "Now serving art collectors across 25+ countries with authentic Indian artwork." },
];

const About = () => {
  const { data: siteContent } = useSiteContent();
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 px-4 bg-cream-dark">
        <div className="container mx-auto text-center max-w-2xl">
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">About Us</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">
            The Soul Behind <em className="text-accent italic">Kalā Samskruthi</em>
          </h1>
          <p className="text-muted-foreground mt-4 font-body">
            {siteContent?.aboutUsText ? siteContent.aboutUsText.split('.')[0] + '.' : "We are custodians of India's timeless art heritage, bridging the ancient and the modern through handcrafted masterpieces."}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-body">Our Story</p>
            <h2 className="font-display text-3xl mt-2">
              Our <em className="text-accent italic">Story</em>
            </h2>
            <p className="text-muted-foreground mt-4 font-body leading-relaxed">
              {siteContent?.aboutUsText || "Born from a deep reverence for India's artistic legacy, Kalā Samskruthi Arts began as a humble studio in Bengaluru. Our founder, driven by a passion for preserving dying art forms, traveled across India to learn from master artisans in remote villages."}
            </p>
            <p className="text-muted-foreground mt-3 font-body leading-relaxed">
              Today, we collaborate with over 50 traditional artists, ensuring their craft not only survives but thrives in the modern world. Each artwork in our collection carries the soul of its creator and the wisdom of centuries.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
            <img src={artistImg} alt="Artist" className="rounded-lg shadow-lg w-full h-48 object-cover" loading="lazy" />
            <img src={art1} alt="Art" className="rounded-lg shadow-lg w-full h-48 object-cover mt-8" loading="lazy" />
            <img src={art5} alt="Art" className="rounded-lg shadow-lg w-full h-48 object-cover col-span-2" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-cream-dark">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Our <em className="text-accent italic">Values</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-lg p-6 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-body mt-2">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-display text-3xl text-center mb-12">
            Our <em className="text-accent italic">Journey</em>
          </h2>
          <div className="space-y-8 relative before:absolute before:left-[39px] before:top-0 before:bottom-0 before:w-px before:bg-accent/30">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 h-20 w-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                  <span className="font-display text-accent text-sm">{t.year}</span>
                </div>
                <div className="pt-3">
                  <h3 className="font-display text-lg">{t.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
