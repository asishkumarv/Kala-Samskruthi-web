import { useApi } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import {  Product } from "@/data/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

const materials = ["MDF", "HDHMR", "WAPC", "Sculpture"] as const;
const thicknessOptions = ["1 inch", "2 inch", "3 inch", "4 inch", "5 inch"];
const productCategories = ["Relief Sculpture", "3D Mural Art", "Mural Art", "HDHMR Mural Art", "Wood Carving", "Artist Collection"];

export default function ProductsPage() {
  const { data: mockProducts } = useApi('/products');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  useEffect(() => {
    if (mockProducts && mockProducts.length > 0) {
      setProducts(mockProducts);
    }
  }, [mockProducts]);

  const [search, setSearch] = useState("");
  const [filterMaterial, setFilterMaterial] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: "", price: "", dimensions: "", thickness: "2 inch",
    material: "MDF" as Product["material"], category: "3D Mural Art", description: "",
    featured: false, customizable: false, images: [] as string[],
  });

  const handleMultipleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const readPromises = fileList.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readPromises).then((base64Strings) => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, ...base64Strings]
        }));
      });
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchMaterial = filterMaterial === "all" || p.material === filterMaterial;
    return matchSearch && matchMaterial;
  });

  const openAdd = () => {
    setEditingProduct(null);
    setForm({ name: "", price: "", dimensions: "", thickness: "2 inch", material: "MDF", category: "3D Mural Art", description: "", featured: false, customizable: false, images: [] });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({ 
      name: p.name, 
      price: String(p.price), 
      dimensions: p.dimensions, 
      thickness: p.thickness, 
      material: p.material, 
      category: p.category, 
      description: p.description, 
      featured: p.featured, 
      customizable: p.customizable,
      images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) { toast.error("Name and price are required"); return; }
    setIsSaving(true);
    try {
      const productPayload = {
        name: form.name,
        price: Number(form.price),
        dimensions: form.dimensions,
        thickness: form.thickness,
        material: form.material,
        category: form.category,
        description: form.description,
        featured: form.featured,
        customizable: form.customizable,
        image: form.images[0] || "",
        images: form.images,
        rating: editingProduct?.rating || 0,
        stock: editingProduct?.stock || 1,
        artist: editingProduct?.artist || "Kala Samskruthi Arts"
      };

      if (editingProduct) {
        const res = await fetch(`https://kala-samskruthi-web.onrender.com/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload)
        });
        if (!res.ok) throw new Error('Failed to update product');
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? updated : p));
        toast.success("Product updated");
      } else {
        const res = await fetch('https://kala-samskruthi-web.onrender.com/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload)
        });
        if (!res.ok) throw new Error('Failed to add product');
        const newProduct = await res.json();
        setProducts((prev) => [...prev, newProduct]);
        toast.success("Product added");
      }
      setModalOpen(false);
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    try {
      const res = await fetch(`https://kala-samskruthi-web.onrender.com/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your mural arts & sculptures</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterMaterial} onValueChange={setFilterMaterial}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Material" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                {materials.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Material</TableHead>
                <TableHead className="hidden md:table-cell">Dimensions</TableHead>
                <TableHead className="hidden lg:table-cell">Flags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="animate-fade-in">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {p.images[0] ? (
                        <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">No img</div>
                      )}
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">₹{p.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.material}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.dimensions}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex gap-1">
                      {p.featured && <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs"><Star className="h-3 w-3 mr-1" />Featured</Badge>}
                      {p.customizable && <Badge variant="outline" className="text-xs">Custom</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No products found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminModal open={modalOpen} onOpenChange={setModalOpen} title={editingProduct ? "Edit Product" : "Add Product"} description="Fill in the product details below.">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Price (₹)</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" />
            </div>
            <div className="grid gap-2">
              <Label>Dimensions</Label>
              <Input value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} placeholder="36×48 inches" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Material</Label>
              <Select value={form.material} onValueChange={(v) => setForm({ ...form, material: v as Product["material"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{materials.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Thickness</Label>
              <Select value={form.thickness} onValueChange={(v) => setForm({ ...form, thickness: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{thicknessOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{productCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Product Images (Upload Multiple)</Label>
              <div className="flex flex-col gap-2">
                <Input type="file" accept="image/*" multiple onChange={handleMultipleImagesUpload} className="text-xs" />
                {form.images && form.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 border p-2 rounded bg-muted/30 max-h-40 overflow-y-auto animate-fade-in">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded overflow-hidden border bg-background group">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground p-0.5 rounded-full opacity-80 hover:opacity-100 hover:scale-105 transition-all shadow"
                          title="Remove Image"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-0 inset-x-0 bg-primary/85 text-primary-foreground text-[8px] text-center py-0.5 font-medium">
                            Main
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
              <Label>Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.customizable} onCheckedChange={(v) => setForm({ ...form, customizable: v })} />
              <Label>Customizable</Label>
            </div>
          </div>
          <Button onClick={handleSave} className="w-full">{editingProduct ? "Update Product" : "Add Product"}</Button>
        </div>
      </AdminModal>

      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-background border border-border p-6 rounded-lg shadow-xl flex flex-col items-center gap-4 min-w-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Saving product...</p>
          </div>
        </div>
      )}
    </div>
  );
}
