export interface Product {
  id: string;
  name: string;
  price: number;
  dimensions: string;
  thickness: string;
  material: "MDF" | "HDHMR" | "WAPC" | "Sculpture";
  category: string;
  description: string;
  image?: string;
  images: string[];
  featured: boolean;
  customizable: boolean;
  rating?: number;
  stock?: number;
  artist?: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: "Krishna" | "Buddha" | "Ganesh" | "Peacock" | "Floral" | "Other";
  title: string;
  isBanner: boolean;
  isCarousel: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  customSize: string;
  designPreference: string;
  colorChoices: string;
  materialSelection: string;
  message: string;
  status: "New" | "In Progress" | "Quoted" | "Completed";
  notes: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: { productId?: string; productName: string; productImage: string; quantity: number; size: string; material: string; price: number }[];
  total: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  status: "Received" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  bookingDate: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  comment?: string;
  featured: boolean;
  approved: boolean;
  createdAt: string;
}

export interface SiteContent {
  homepageText: string;
  aboutUsText: string;
  materialDetails: { name: string; description: string }[];
  socialLinks: { platform: string; url: string }[];
  contactInfo: { phone: string; email: string; address: string };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Staff Admin" | "Editor";
  lastLogin: string;
  active: boolean;
}

export interface ArtworkVideo {
  id: string;
  title: string;
  category: "Krishna" | "Buddha" | "Ganesh" | "Peacock" | "Floral" | "Making Process" | "Other";
  videoUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  createdAt: string;
}

export interface CustomArtworkRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  artworkDetails: string;
  uploadedImageUrl: string;
  preferredSize: string;
  material: string;
  colorPreferences: string;
  notes: string;
  status: "New" | "Contacted" | "In Review" | "Quoted" | "Confirmed" | "In Production" | "Completed";
  createdAt: string;
}

// Mock data
export const mockProducts: Product[] = [
  { id: "1", name: "Ram Darbar Relief", price: 35999, dimensions: "36×48 inches", thickness: "3 inch", material: "MDF", category: "Relief Sculpture", description: "Handcrafted Ram Darbar relief sculpture with intricate detailing.", images: ["https://kala-samskruthi-arts.web.app/assets/art7-CrVhw45g.jpg"], featured: true, customizable: true, createdAt: "2024-12-01" },
  { id: "2", name: "Radha Krishna Vrindavan", price: 28999, dimensions: "48×30 inches", thickness: "2 inch", material: "HDHMR", category: "3D Mural Art", description: "Beautiful Radha Krishna mural set in Vrindavan.", images: ["https://kala-samskruthi-arts.web.app/assets/art8-BrQqb7Tg.jpg"], featured: true, customizable: true, createdAt: "2024-11-15" },
  { id: "3", name: "Radha Krishna Moonlight", price: 32999, dimensions: "36×36 inches", thickness: "2 inch", material: "WAPC", category: "3D Mural Art", description: "Radha Krishna under moonlight, 3D mural art.", images: ["https://kala-samskruthi-arts.web.app/assets/art9-C4oZkW7x.jpg"], featured: true, customizable: false, createdAt: "2024-11-20" },
  { id: "4", name: "Ganesh Blessing", price: 18999, dimensions: "24×24 inches", thickness: "1 inch", material: "MDF", category: "Wall Art", description: "Lord Ganesh in blessing pose, vibrant colors.", images: [], featured: false, customizable: true, createdAt: "2024-10-05" },
  { id: "5", name: "Peacock Paradise", price: 22999, dimensions: "30×40 inches", thickness: "2 inch", material: "HDHMR", category: "3D Mural Art", description: "Stunning peacock mural with detailed feathers.", images: [], featured: false, customizable: true, createdAt: "2024-09-18" },
];

export const mockGalleryImages: GalleryImage[] = [
  { id: "1", url: "https://kala-samskruthi-arts.web.app/assets/art7-CrVhw45g.jpg", category: "Krishna", title: "Ram Darbar", isBanner: true, isCarousel: true, createdAt: "2024-12-01" },
  { id: "2", url: "https://kala-samskruthi-arts.web.app/assets/art8-BrQqb7Tg.jpg", category: "Krishna", title: "Radha Krishna", isBanner: false, isCarousel: true, createdAt: "2024-11-15" },
  { id: "3", url: "https://kala-samskruthi-arts.web.app/assets/art9-C4oZkW7x.jpg", category: "Krishna", title: "Moonlight Scene", isBanner: false, isCarousel: false, createdAt: "2024-11-20" },
  { id: "4", url: "https://kala-samskruthi-arts.web.app/assets/art7-CrVhw45g.jpg", category: "Ganesh", title: "Ganesh Mural", isBanner: false, isCarousel: false, createdAt: "2024-10-05" },
  { id: "5", url: "https://kala-samskruthi-arts.web.app/assets/art8-BrQqb7Tg.jpg", category: "Peacock", title: "Peacock Art", isBanner: false, isCarousel: true, createdAt: "2024-09-18" },
];

export const mockInquiries: Inquiry[] = [
  { id: "INQ-001", customerName: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 43210", customSize: "48×60 inches", designPreference: "Krishna with Gopis", colorChoices: "Gold, Blue, Green", materialSelection: "HDHMR", message: "I want a large mural for my living room.", status: "New", notes: "", createdAt: "2025-04-08" },
  { id: "INQ-002", customerName: "Rahul Verma", email: "rahul@example.com", phone: "+91 91234 56789", customSize: "36×48 inches", designPreference: "Ganesh with floral border", colorChoices: "Red, Gold", materialSelection: "MDF", message: "Looking for a Ganesh mural for pooja room.", status: "In Progress", notes: "Sent design draft on April 5", createdAt: "2025-04-03" },
  { id: "INQ-003", customerName: "Meera Patel", email: "meera@example.com", phone: "+91 87654 32100", customSize: "24×24 inches", designPreference: "Buddha meditation", colorChoices: "White, Gold, Blue", materialSelection: "WAPC", message: "Minimalist Buddha mural for office.", status: "Quoted", notes: "Quoted ₹15,000", createdAt: "2025-03-28" },
  { id: "INQ-004", customerName: "Arjun Nair", email: "arjun@example.com", phone: "+91 76543 21098", customSize: "60×36 inches", designPreference: "Peacock garden", colorChoices: "Blue, Green, Gold", materialSelection: "Sculpture", message: "3D peacock sculpture for entrance.", status: "Completed", notes: "Delivered on March 20", createdAt: "2025-03-10" },
];

export const mockOrders: Order[] = [
  { id: "ORD-001", customerName: "Suresh Kumar", email: "suresh@example.com", phone: "+91 98765 11111", address: "12, MG Road, Bangalore 560001", items: [{ productName: "Ram Darbar Relief", productImage: "https://kala-samskruthi-arts.web.app/assets/art7-CrVhw45g.jpg", quantity: 1, size: "36×48 inches", material: "MDF", price: 35999 }], total: 35999, paymentMethod: "UPI", paymentStatus: "Paid", status: "Processing", bookingDate: "2025-04-07", createdAt: "2025-04-07" },
  { id: "ORD-002", customerName: "Anita Reddy", email: "anita@example.com", phone: "+91 91234 22222", address: "45, HSR Layout, Bangalore 560102", items: [{ productName: "Radha Krishna Vrindavan", productImage: "https://kala-samskruthi-arts.web.app/assets/art8-BrQqb7Tg.jpg", quantity: 1, size: "48×30 inches", material: "HDHMR", price: 28999 }, { productName: "Peacock Paradise", productImage: "", quantity: 1, size: "30×40 inches", material: "HDHMR", price: 22999 }], total: 51998, paymentMethod: "Card", paymentStatus: "Paid", status: "Received", bookingDate: "2025-04-09", createdAt: "2025-04-09" },
  { id: "ORD-003", customerName: "Vikram Singh", email: "vikram@example.com", phone: "+91 87654 33333", address: "78, Koramangala, Bangalore 560034", items: [{ productName: "Ganesh Blessing", productImage: "", quantity: 2, size: "24×24 inches", material: "MDF", price: 18999 }], total: 37998, paymentMethod: "COD", paymentStatus: "Pending", status: "Shipped", bookingDate: "2025-04-01", createdAt: "2025-04-01" },
  { id: "ORD-004", customerName: "Lakshmi Iyer", email: "lakshmi@example.com", phone: "+91 76543 44444", address: "23, Indiranagar, Bangalore 560038", items: [{ productName: "Radha Krishna Moonlight", productImage: "https://kala-samskruthi-arts.web.app/assets/art9-C4oZkW7x.jpg", quantity: 1, size: "36×36 inches", material: "WAPC", price: 32999 }], total: 32999, paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", bookingDate: "2025-03-15", createdAt: "2025-03-15" },
];

export const mockTestimonials: Testimonial[] = [
  { id: "1", customerName: "Deepa Menon", rating: 5, text: "Absolutely stunning artwork! The Ram Darbar relief is a masterpiece. Everyone who visits our home admires it.", featured: true, approved: true, createdAt: "2025-03-20" },
  { id: "2", customerName: "Rajesh Gupta", rating: 5, text: "Exceptional quality and craftsmanship. The 3D effect is breathtaking.", featured: true, approved: true, createdAt: "2025-03-15" },
  { id: "3", customerName: "Kavitha S", rating: 4, text: "Beautiful artwork, delivered on time. Slightly smaller than expected but quality is amazing.", featured: false, approved: true, createdAt: "2025-02-28" },
  { id: "4", customerName: "New Customer", rating: 3, text: "Good product but packaging could be better.", featured: false, approved: false, createdAt: "2025-04-05" },
];

export const mockSiteContent: SiteContent = {
  homepageText: "Experience the Beauty of Traditional Art. Discover exquisite handmade moral arts that celebrate India's rich cultural heritage.",
  aboutUsText: "Kala Samskruthi Arts is dedicated to preserving and promoting traditional Indian art forms. Our skilled artisans create stunning mural arts, relief sculptures, and 3D artwork using premium materials.",
  materialDetails: [
    { name: "MDF", description: "Medium Density Fibreboard - Durable, smooth surface ideal for detailed artwork and painting." },
    { name: "HDHMR", description: "High Density High Moisture Resistance - Superior moisture resistance, perfect for humid environments." },
    { name: "WAPC", description: "Wood and Plastic Composite - Lightweight, weather-resistant material for indoor and outdoor use." },
    { name: "Sculpture", description: "Hand-sculpted using traditional techniques with premium clay and materials." },
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/kalasamskruthiarts" },
    { platform: "Facebook", url: "https://facebook.com/kalasamskruthiarts" },
    { platform: "YouTube", url: "https://youtube.com/@kalasamskruthiarts" },
    { platform: "WhatsApp", url: "https://wa.me/919876543210" },
  ],
  contactInfo: { phone: "+91 98765 43210", email: "info@kalasamskruthiarts.com", address: "Bangalore, Karnataka, India" },
};

export const mockAdminUsers: AdminUser[] = [
  { id: "1", name: "Admin User", email: "admin@kalasamskruthi.com", role: "Super Admin", lastLogin: "2025-04-10 09:30", active: true },
  { id: "2", name: "Staff Member", email: "staff@kalasamskruthi.com", role: "Staff Admin", lastLogin: "2025-04-09 14:15", active: true },
  { id: "3", name: "Content Editor", email: "editor@kalasamskruthi.com", role: "Editor", lastLogin: "2025-04-08 11:00", active: false },
];

export const mockArtworkVideos: ArtworkVideo[] = [
  { id: "1", title: "Krishna Mural Making Process", category: "Krishna", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnailUrl: "https://kala-samskruthi-arts.web.app/assets/art7-CrVhw45g.jpg", featured: true, createdAt: "2025-03-15" },
  { id: "2", title: "3D Ganesh Sculpture Tutorial", category: "Ganesh", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnailUrl: "https://kala-samskruthi-arts.web.app/assets/art8-BrQqb7Tg.jpg", featured: true, createdAt: "2025-03-10" },
  { id: "3", title: "Peacock Feather Detailing", category: "Peacock", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnailUrl: "https://kala-samskruthi-arts.web.app/assets/art9-C4oZkW7x.jpg", featured: false, createdAt: "2025-02-28" },
  { id: "4", title: "Behind the Scenes - Workshop Tour", category: "Making Process", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnailUrl: "https://kala-samskruthi-arts.web.app/assets/art7-CrVhw45g.jpg", featured: false, createdAt: "2025-02-15" },
];

export const mockCustomArtworkRequests: CustomArtworkRequest[] = [
  { id: "CAR-001", customerName: "Ravi Shankar", phone: "+91 99887 76655", email: "ravi@example.com", address: "56, JP Nagar, Bangalore", artworkDetails: "Custom Krishna playing flute mural with gold leaf accents", uploadedImageUrl: "https://kala-samskruthi-arts.web.app/assets/art7-CrVhw45g.jpg", preferredSize: "48×36 inches", material: "HDHMR", colorPreferences: "Gold, Royal Blue, White", notes: "Want it similar to the reference image but with a modern twist", status: "New", createdAt: "2025-04-10" },
  { id: "CAR-002", customerName: "Sunita Devi", phone: "+91 88776 65544", email: "sunita@example.com", address: "12, Whitefield, Bangalore", artworkDetails: "Large Ganesh mural for main entrance with peacock motifs", uploadedImageUrl: "https://kala-samskruthi-arts.web.app/assets/art8-BrQqb7Tg.jpg", preferredSize: "60×40 inches", material: "MDF", colorPreferences: "Traditional red, gold, green", notes: "Budget around 40,000-50,000", status: "Contacted", createdAt: "2025-04-08" },
  { id: "CAR-003", customerName: "Amit Joshi", phone: "+91 77665 54433", email: "amit@example.com", address: "89, Electronic City, Bangalore", artworkDetails: "Buddha meditation relief for yoga studio", uploadedImageUrl: "", preferredSize: "36×36 inches", material: "WAPC", colorPreferences: "Neutral tones, white, beige", notes: "Need waterproof material as studio has humidity", status: "Quoted", createdAt: "2025-04-05" },
  { id: "CAR-004", customerName: "Priyanka Rao", phone: "+91 66554 43322", email: "priyanka@example.com", address: "34, Malleshwaram, Bangalore", artworkDetails: "Set of 3 peacock themed wall art panels", uploadedImageUrl: "https://kala-samskruthi-arts.web.app/assets/art9-C4oZkW7x.jpg", preferredSize: "24×48 inches each", material: "HDHMR", colorPreferences: "Blue, Teal, Gold", notes: "For new home decoration, need by May end", status: "In Production", createdAt: "2025-03-28" },
];

export const dashboardStats = {
  totalInquiries: mockInquiries.length,
  totalOrders: mockOrders.length,
  totalProducts: mockProducts.length,
  totalRevenue: mockOrders.reduce((sum, o) => sum + o.total, 0),
  totalVideos: mockArtworkVideos.length,
  totalCustomRequests: mockCustomArtworkRequests.length,
  recentActivity: [
    { type: "order" as const, text: "New order #ORD-002 from Anita Reddy", time: "2 hours ago" },
    { type: "inquiry" as const, text: "New inquiry from Priya Sharma", time: "5 hours ago" },
    { type: "product" as const, text: "Product 'Ram Darbar Relief' updated", time: "1 day ago" },
    { type: "order" as const, text: "Order #ORD-003 shipped to Vikram Singh", time: "2 days ago" },
    { type: "testimonial" as const, text: "New review from New Customer (pending)", time: "3 days ago" },
  ],
};
