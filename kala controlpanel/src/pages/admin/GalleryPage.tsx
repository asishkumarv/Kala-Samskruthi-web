import { useState } from "react";
import { mockGalleryImages, GalleryImage } from "@/data/mockData";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const categories = ["Krishna", "Buddha", "Ganesh", "Peacock", "Floral", "Other"] as const;

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(mockGalleryImages);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ url: "", title: "", category: "Krishna" as GalleryImage["category"], isBanner: false, isCarousel: false });

  const filtered = filterCat === "all" ? images : images.filter((i) => i.category === filterCat);

  const handleAdd = () => {
    if (!form.url || !form.title) { toast.error("URL and title required"); return; }
    setImages((prev) => [...prev, { id: String(Date.now()), ...form, createdAt: new Date().toISOString().split("T")[0] }]);
    setModalOpen(false);
    toast.success("Image added");
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
    toast.success("Image deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">Manage gallery, banner & carousel images</p>
        </div>
        <Button onClick={() => { setForm({ url: "", title: "", category: "Krishna", isBanner: false, isCarousel: false }); setModalOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Image
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filterCat === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterCat("all")}>All</Button>
        {categories.map((c) => (
          <Button key={c} variant={filterCat === c ? "default" : "outline"} size="sm" onClick={() => setFilterCat(c)}>{c}</Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((img) => (
          <Card key={img.id} className="overflow-hidden animate-fade-in">
            <div className="aspect-square relative group">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                {img.isBanner && <Badge className="bg-primary text-primary-foreground text-xs">Banner</Badge>}
                {img.isCarousel && <Badge variant="secondary" className="text-xs">Carousel</Badge>}
              </div>
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm truncate">{img.title}</p>
              <p className="text-xs text-muted-foreground">{img.category}</p>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No images in this category</p>
          </div>
        )}
      </div>

      <AdminModal open={modalOpen} onOpenChange={setModalOpen} title="Add Gallery Image">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Image URL</Label>
            <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
          </div>
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Image title" />
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as GalleryImage["category"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={form.isBanner} onCheckedChange={(v) => setForm({ ...form, isBanner: v })} />
              <Label>Homepage Banner</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.isCarousel} onCheckedChange={(v) => setForm({ ...form, isCarousel: v })} />
              <Label>Carousel</Label>
            </div>
          </div>
          <Button onClick={handleAdd} className="w-full">Add Image</Button>
        </div>
      </AdminModal>
    </div>
  );
}
