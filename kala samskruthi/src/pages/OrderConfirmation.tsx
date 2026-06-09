import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { CheckCircle, MapPin, Package, Clock, ShoppingBag, PackageCheck, Truck, Home, CircleCheck } from "lucide-react";
import { motion } from "framer-motion";

const timelineSteps = [
  { icon: ShoppingBag, label: "Order Placed", description: "Your order has been received", completed: true },
  { icon: CircleCheck, label: "Order Confirmed", description: "Seller has confirmed your order", completed: true },
  { icon: PackageCheck, label: "Package Prepared", description: "Your item is being prepared", completed: false },
  { icon: Truck, label: "Shipped", description: "Package handed to courier", completed: false },
  { icon: Truck, label: "Out for Delivery", description: "Package is on its way", completed: false },
  { icon: Home, label: "Delivered", description: "Package delivered to you", completed: false },
];

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    if (!orderDetails && orderId) {
      fetch(`https://api.kalasamskruthiarts.in/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [orderId, orderDetails]);

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <CheckCircle className="h-20 w-20 text-accent mx-auto mb-4 stroke-[1.5]" />
          </motion.div>
          <h1 className="font-display text-3xl md:text-4xl">🎉 Order Placed Successfully!</h1>
          <p className="text-muted-foreground font-body mt-2">Thank you for choosing Kala Samskruthi Arts</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mt-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">Order ID</p>
              <p className="font-body font-semibold">{orderId}</p>
            </div>
          </div>

          {orderDetails?.items && (
            <div className="space-y-3 border-t border-border pt-4">
              {orderDetails.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <p className="font-body text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-body">Qty: {item.quantity} · ₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {orderDetails?.address && (
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">Delivery Address</p>
                  <p className="font-body text-sm mt-1">
                    {orderDetails.address.name}, {orderDetails.address.address}, {orderDetails.address.city}, {orderDetails.address.state} - {orderDetails.address.pincode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {orderDetails?.total && (
            <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
              <span className="font-display text-lg">Total Paid</span>
              <span className="font-display text-xl text-accent">₹{orderDetails.total.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Order Timeline */}
        <div className="bg-card border border-border rounded-lg p-6 mt-6">
          <h2 className="font-display text-xl mb-6">Order Timeline</h2>
          <div className="relative">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === timelineSteps.length - 1;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 relative"
                >
                  {!isLast && (
                    <div className="absolute left-[19px] top-10 w-0.5 h-full" style={{ backgroundColor: step.completed ? "hsl(var(--accent))" : "hsl(var(--border))" }} />
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${step.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="pb-8">
                    <p className={`font-body font-medium text-sm ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{step.description}</p>
                    {step.completed && <p className="font-body text-xs text-accent mt-1">✓ Completed</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dispatch Note */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-6 flex items-start gap-3 text-left">
          <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <p className="font-body text-sm text-foreground">
            <span className="font-semibold">Please Note:</span> For any order to dispatch to your location, it will take <span className="font-semibold text-accent">15 days</span> of time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/" className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded font-body font-medium hover:brightness-110 transition-all text-center">
            Continue Shopping
          </Link>
          <Link
            to={`/track-order/${orderId}`}
            state={{ items: orderDetails?.items, total: orderDetails?.total }}
            className="inline-block border border-accent text-accent px-8 py-3 rounded font-body font-medium hover:bg-accent/10 transition-all text-center"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
