import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Package, ShoppingBag, PackageCheck, Truck, Home, CircleCheck, MapPin, Calendar, ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";

const allSteps = [
  { icon: ShoppingBag, label: "Order Placed", description: "Your order has been received and is being processed.", date: "Just now" },
  { icon: CircleCheck, label: "Order Confirmed", description: "The seller has confirmed your order.", date: "Expected in 1 day" },
  { icon: PackageCheck, label: "Package Prepared", description: "Your artwork is carefully packed and ready for dispatch.", date: "Expected in 3-5 days" },
  { icon: Truck, label: "Shipped", description: "Your package has been handed to the courier partner.", date: "Expected in 5-7 days" },
  { icon: Truck, label: "Out for Delivery", description: "Your package is on its way to your doorstep.", date: "Expected in 12-14 days" },
  { icon: Home, label: "Delivered", description: "Package successfully delivered to you.", date: "Expected in 15 days" },
];

const OrderTracking = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderDetails && orderId) {
      setLoading(true);
      fetch(`https://api.kalasamskruthiarts.in/api/orders/${orderId}`)
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Order not found");
          }
          return res.json();
        })
        .then(data => {
          setOrderDetails(data);
          setError("");
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [orderId, orderDetails]);

  const getStatusStep = (status: string) => {
    switch (status) {
      case "Received": return 0;
      case "Processing": return 1;
      case "Shipped": return 3;
      case "Delivered": return 5;
      case "Cancelled": return -1;
      default: return 0;
    }
  };

  const isCancelled = orderDetails?.status === "Cancelled";
  const currentStep = orderDetails ? getStatusStep(orderDetails.status) : 0;
  const trackingId = "TRK-" + (orderId?.replace("KSA-", "").slice(0, 8) || "0000000");

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 15);
  const estimatedDelivery = estimatedDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="pt-24 min-h-screen text-center px-4">
        <p className="font-body text-muted-foreground mb-4">Loading order details...</p>
      </div>
    );
  }

  if (error || (!orderDetails && !loading)) {
    return (
      <div className="pt-24 min-h-screen text-center px-4">
        <p className="font-body text-destructive mb-4">{error || "Order not found."}</p>
        <Link to="/track-order" className="text-accent font-body inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Try another Tracking ID
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-accent transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="font-display text-3xl md:text-4xl mb-2">Track Your Order</h1>
        <p className="text-muted-foreground font-body mb-8">Stay updated on your order's journey</p>

        {/* Cancelled Alert */}
        {isCancelled && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-5 mb-8 flex items-center gap-3">
            <X className="h-6 w-6 text-destructive shrink-0" />
            <div>
              <p className="font-body font-bold text-lg text-destructive">Order Cancelled</p>
              <p className="font-body text-sm text-muted-foreground">This order has been cancelled. Please contact support if you have any questions.</p>
            </div>
          </div>
        )}

        {/* Order & Tracking Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 text-accent" />
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">Order ID</p>
            </div>
            <p className="font-body font-semibold text-lg">{orderId}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-accent" />
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">Tracking ID</p>
            </div>
            <p className="font-body font-semibold text-lg">{trackingId}</p>
          </div>
        </div>

        {/* Estimated Delivery (Hidden if cancelled) */}
        {!isCancelled && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-5 mb-8 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-accent shrink-0" />
            <div>
              <p className="font-body font-medium text-sm text-foreground">Estimated Delivery</p>
              <p className="font-body text-accent font-semibold">{estimatedDelivery}</p>
            </div>
          </div>
        )}

        {/* Order Items */}
        {orderDetails?.items && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="font-display text-xl mb-4">Order Items</h2>
            <div className="space-y-3">
              {orderDetails.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.productImage || "/placeholder.svg"} alt={item.productName} className="w-14 h-14 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium truncate">{item.productName}</p>
                    <p className="text-xs text-muted-foreground font-body">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-body text-sm text-accent font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            {orderDetails.total && (
              <div className="border-t border-border pt-3 mt-3 flex justify-between items-center">
                <span className="font-display text-base">Total</span>
                <span className="font-display text-lg text-accent">₹{orderDetails.total.toLocaleString()}</span>
              </div>
            )}
          </div>
        )}

        {/* Full Timeline (Hidden if cancelled) */}
        {!isCancelled && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-6">Order Progress</h2>
            <div className="relative">
            {allSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStep;
              const isCurrent = index === currentStep;
              const isLast = index === allSteps.length - 1;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 relative"
                >
                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      className="absolute left-[19px] top-10 w-0.5 h-full"
                      style={{ backgroundColor: isCompleted ? "hsl(var(--accent))" : "hsl(var(--border))" }}
                    />
                  )}
                  {/* Icon circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                      isCompleted
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    } ${isCurrent ? "ring-4 ring-accent/30" : ""}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {/* Text */}
                  <div className="pb-8">
                    <p className={`font-body font-medium text-sm ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                      {isCurrent && (
                        <span className="ml-2 inline-block bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded font-semibold">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{step.description}</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {isCompleted ? "✓ Completed" : step.date}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        )}

        <div className="text-center mt-8">
          <Link to="/" className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded font-body font-medium hover:brightness-110 transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
