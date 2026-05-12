import { useState } from "react";
import { useVideos } from "@/hooks/useVideos";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

const Videos = () => {
  const { data: videos } = useVideos();
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

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
                onClick={() => setSelectedVideo(v)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={v.thumbnailUrl || v.image}
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
                  <p className="text-sm text-muted-foreground font-body mt-1">{v.description || "Watch the creation of this beautiful masterpiece."}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-card rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="aspect-video bg-black">
                {(() => {
                  const ytId = getYouTubeId(selectedVideo.videoUrl);
                  return ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay"
                    />
                  ) : (
                    <video src={selectedVideo.videoUrl} controls autoPlay className="w-full h-full" />
                  );
                })()}
              </div>
              
              <div className="p-6">
                <h2 className="font-display text-2xl text-accent">{selectedVideo.title}</h2>
                <p className="text-muted-foreground font-body mt-2">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Videos;
