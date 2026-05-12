import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminLayout from "@/components/admin/AdminLayout";
import LoginPage from "@/pages/admin/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProductsPage from "@/pages/admin/ProductsPage";
import GalleryPage from "@/pages/admin/GalleryPage";
import VideosPage from "@/pages/admin/VideosPage";
import InquiriesPage from "@/pages/admin/InquiriesPage";
import CustomArtworkPage from "@/pages/admin/CustomArtworkPage";
import OrdersPage from "@/pages/admin/OrdersPage";
import ContentPage from "@/pages/admin/ContentPage";
import TestimonialsPage from "@/pages/admin/TestimonialsPage";
import UsersPage from "@/pages/admin/UsersPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="videos" element={<VideosPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="custom-artwork" element={<CustomArtworkPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
