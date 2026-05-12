import { useArtworks } from "@/hooks/useArtworks";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Tag, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Artwork, coupons } from "@/data/artworks";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { data: artworks } = useArtworks();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = (location.state as { buyNowItem?: Artwork })?.buyNowItem;
  const passedCoupon = (location.state as { coupon?: { code: string; discount: number } })?.coupon;

  const checkoutItems = buyNowItem ? [{ ...buyNowItem, quantity: 1 }] : cart;

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [couponCode, setCouponCode] = useState(passedCoupon?.code || "");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(passedCoupon || null);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount / 100)) : 0;
  const codCharge = paymentMethod === "cod" ? 50 : 0;
  const total = subtotal - discountAmount + codCharge;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError("");
    setCouponSuccess("");
    if (appliedCoupon) {
      setCouponError("A coupon is already applied.");
      return;
    }
    if (coupons[code]) {
      setAppliedCoupon({ code, discount: coupons[code] });
      setCouponSuccess(`Coupon "${code}" applied! ${coupons[code]}% off.`);
    } else {
      setCouponError("Invalid coupon code.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    setCouponSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://kala-samskruthi-web.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          email: form.email,
          address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
          total: total,
          paymentMethod: paymentMethod === 'online' ? 'Online' : 'Cash on Delivery',
          items: checkoutItems.map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price || 0,
            size: item.size || 'Standard',
            material: item.material || 'Standard',
            productImage: item.image || (item.images && item.images.length > 0 ? item.images[0] : null)
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const newOrder = await response.json();
      setPendingOrderData({ orderId: newOrder.id, items: checkoutItems, address: form, total, paymentMethod });
      setShowOrderPopup(true);
    } catch (error) {
      console.error(error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handlePopupClose = () => {
    if (!buyNowItem) clearCart();
    navigate(`/order-confirmation/${pendingOrderData.orderId}`, {
      state: { items: pendingOrderData.items, address: pendingOrderData.address, total: pendingOrderData.total, paymentMethod: pendingOrderData.paymentMethod },
    });
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="pt-24 min-h-screen text-center px-4">
        <p className="font-body text-muted-foreground">Your cart is empty.</p>
        <Link to="/moral-arts" className="text-accent font-body mt-4 inline-block">← Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-accent transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="font-display text-3xl mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-xl flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-accent" /> Delivery Address</h2>
              <div className="space-y-4">
                <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <textarea name="address" placeholder="Complete Address" value={form.address} onChange={handleChange} required rows={3} className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input name="city" placeholder="City" value={form.city} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  <input name="state" placeholder="State" value={form.state} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-xl flex items-center gap-2 mb-4"><CreditCard className="h-5 w-5 text-accent" /> Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors ${paymentMethod === "online" ? "border-accent bg-accent/5" : "border-border"}`}>
                  <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="mt-1 accent-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-body font-medium text-sm">Online Payment</p>
                    <p className="text-xs text-muted-foreground font-body">UPI, Debit/Credit Card, Net Banking</p>
                  </div>
                </label>
                <label className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-accent bg-accent/5" : "border-border"}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="mt-1 accent-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-body font-medium text-sm">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground font-body">Additional charge of ₹50 applicable</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-lg flex items-center gap-2 mb-3"><Tag className="h-4 w-4 text-accent" /> Apply Coupon</h2>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-md px-4 py-2">
                  <span className="font-body text-sm font-medium text-accent">{appliedCoupon.code} — {appliedCoupon.discount}% OFF</span>
                  <button type="button" onClick={removeCoupon} className="text-xs text-destructive font-body hover:underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button type="button" onClick={handleApplyCoupon} className="bg-accent text-accent-foreground px-4 py-2 rounded font-body text-sm font-medium hover:brightness-110 transition-all">
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="text-destructive text-xs font-body mt-2">{couponError}</p>}
              {couponSuccess && <p className="text-accent text-xs font-body mt-2">{couponSuccess}</p>}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-xl mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-body">Qty: {item.quantity}</p>
                      <p className="text-sm text-accent font-body">₹{((item.price || 0) * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2 font-body text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                {appliedCoupon && (
                  <div className="flex justify-between text-accent">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-accent font-medium">Free</span></div>
                {codCharge > 0 && <div className="flex justify-between"><span className="text-muted-foreground">COD Charge</span><span>₹{codCharge}</span></div>}
                <div className="border-t border-border pt-2 flex justify-between font-medium text-base">
                  <span className="font-display">Total</span>
                  <span className="text-accent font-display text-xl">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button type="submit" className="w-full bg-accent text-accent-foreground py-3 rounded font-body font-medium mt-6 hover:brightness-110 transition-all">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {showOrderPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handlePopupClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card border border-border rounded-xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              </motion.div>
              <h2 className="font-display text-2xl mb-2">Order Placed!</h2>
              <p className="font-body text-muted-foreground text-sm mb-6">Your order has been placed successfully! 🎉</p>
              <button onClick={handlePopupClose} className="bg-accent text-accent-foreground px-8 py-3 rounded font-body font-medium hover:brightness-110 transition-all">
                View Order Details
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
