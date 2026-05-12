import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-accent" />
          </div>
        </div>
        <h1 className="font-display text-7xl font-bold mb-4">404</h1>
        <h2 className="font-display text-2xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground font-body mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-md font-body font-medium hover:brightness-110 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
