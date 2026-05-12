import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Search, Truck } from "lucide-react";
import { motion } from "framer-motion";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/track-order/${orderId.trim()}`);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <Truck className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl">Track Your Order</h1>
          <p className="text-muted-foreground font-body mt-2">
            Enter your order ID to check the current status of your delivery.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleTrack}
          className="bg-card border border-border rounded-lg p-8"
        >
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Order ID
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. KSA-1234567"
                className="w-full pl-10 pr-4 py-3 rounded border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-accent text-accent-foreground px-6 py-3 rounded font-body font-medium flex items-center gap-2 hover:brightness-110 transition-all"
            >
              <Search className="h-4 w-4" /> Track
            </button>
          </div>
          <p className="text-xs text-muted-foreground font-body mt-3">
            You can find your order ID in the confirmation email or on the order confirmation page.
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default TrackOrder;
