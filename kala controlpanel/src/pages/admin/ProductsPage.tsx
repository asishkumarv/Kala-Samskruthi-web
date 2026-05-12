import { useState } from "react";
import { mockProducts, Product } from "@/data/mockData";
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
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";
import { toast } from "sonner";

const materials = ["MDF", "HDHMR", "WAPC", "Sculpture"] as const;
const thicknessOptions = ["1 inch", "2 inch", "3 inch", "4 inch", "5 inch"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [filterMaterial, setFilterMaterial] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form, setForm] = useState({
    name: "", price: "", dimensions: "", thickness: "2 inch",
    material: "MDF" as Product["material"], category: "", description: "",
    featured: false, customizable: false,
  });

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchMaterial = filterMaterial === "all" || p.material === filterMaterial;
    return matchSearch && matchMaterial;
  });

  const openAdd = () => {
    setEditingProduct(null);
    setForm({ name: "", price: "", dimensions: "", thickness: "2 inch", material: "MDF", category: "", description: "", featured: false, customizable: false });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({ name: p.name, price: String(p.price), dimensions: p.dimensions, thickness: p.thickness, material: p.material, category: p.category, description: p.description, featured: p.featured, customizable: p.customizable });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error("Name and price are required"); return; }
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? { ...p, ...form, price: Number(form.price) } : p));
      toast.success("Product updated");
    } else {
      const newProduct: Product = { id: String(Date.now()), ...form, price: Number(form.price), images: [], createdAt: new Date().toISOString().split("T")[0] };
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product added");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
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
          <div className="grid gap-2">
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. 3D Mural Art" />
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
    </div>
  );
}
