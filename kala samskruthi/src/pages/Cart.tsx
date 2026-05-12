import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { coupons } from "@/data/artworks";


const Cart = () => {
  const { cart, removeFromCart, addToCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount / 100)) : 0;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (appliedCoupon) {
      
      return;
    }
    if (coupons[code]) {
      setAppliedCoupon({ code, discount: coupons[code] });
      
    } else {
      
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 min-h-screen text-center px-4">
        <h1 className="font-display text-3xl">Your Cart is Empty</h1>
        <p className="text-muted-foreground font-body mt-2">Add some beautiful artworks to get started.</p>
        <Link to="/moral-arts" className="inline-block mt-6 bg-accent text-accent-foreground px-6 py-3 rounded font-body font-medium hover:brightness-110 transition-all">
          Browse Moral Arts
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Link to="/moral-arts" className="inline-flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-accent transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
        <h1 className="font-display text-3xl mb-8">Shopping Cart ({cart.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">by {item.artist} · Standard</p>
                  <p className="text-accent font-display text-lg mt-1">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 border border-border rounded flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="h-8 w-8 border border-border rounded flex items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {/* Coupon Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-lg flex items-center gap-2 mb-3"><Tag className="h-4 w-4 text-accent" /> Apply Coupon</h2>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-md px-4 py-2">
                  <span className="font-body text-sm font-medium text-accent">{appliedCoupon.code} — {appliedCoupon.discount}% OFF</span>
                  <button onClick={removeCoupon} className="text-xs text-destructive font-body hover:underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 rounded-md border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button onClick={handleApplyCoupon} className="bg-accent text-accent-foreground px-4 py-2 rounded font-body text-sm font-medium hover:brightness-110 transition-all">
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-xl mb-4">Order Summary</h2>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-accent">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-medium text-base">
                  <span className="font-display">Total</span>
                  <span className="text-accent font-display text-xl">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" state={{ coupon: appliedCoupon }} className="block w-full bg-accent text-accent-foreground text-center py-3 rounded font-body font-medium mt-6 hover:brightness-110 transition-all">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
