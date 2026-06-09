import { useState, useEffect } from "react";
import { mockTestimonials, Testimonial } from "@/data/mockData";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Star, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  useEffect(() => {
    fetch('https://api.kalasamskruthiarts.in/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setTestimonials(data);
        else if (mockTestimonials && mockTestimonials.length > 0) setTestimonials(mockTestimonials);
      })
      .catch(err => {
        console.error(err);
        if (mockTestimonials && mockTestimonials.length > 0) setTestimonials(mockTestimonials);
      });
  }, [mockTestimonials]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ customerName: "", rating: 5, text: "", featured: false });

  const handleAdd = async () => {
    if (!form.customerName || !form.text) { toast.error("Name and text required"); return; }
    try {
      const res = await fetch('https://api.kalasamskruthiarts.in/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, comment: form.text, date: new Date().toISOString(), approved: true })
      });
      if (!res.ok) throw new Error('Failed');
      const newReview = await res.json();
      setTestimonials((prev) => [...prev, newReview]);
      setModalOpen(false);
      toast.success("Testimonial added");
    } catch (err) {
      toast.error("Error adding testimonial");
      console.error(err);
    }
  };

  const toggleApproval = async (id: string) => {
    const t = testimonials.find(t => t.id === id);
    if (!t) return;
    try {
      const res = await fetch(`https://api.kalasamskruthiarts.in/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !t.approved })
      });
      if (!res.ok) throw new Error('Failed');
      setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, approved: !t.approved } : t));
      toast.success("Status updated");
    } catch (err) {
      toast.error("Error updating");
    }
  };

  const toggleFeatured = async (id: string) => {
    const t = testimonials.find(t => t.id === id);
    if (!t) return;
    try {
      const res = await fetch(`https://api.kalasamskruthiarts.in/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !t.featured })
      });
      if (!res.ok) throw new Error('Failed');
      setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, featured: !t.featured } : t));
      toast.success("Featured status updated");
    } catch (err) {
      toast.error("Error updating");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial? This action cannot be undone.")) return;
    try {
      const res = await fetch(`https://api.kalasamskruthiarts.in/api/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success("Testimonial deleted successfully");
    } catch (err) {
      toast.error("Error deleting");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">Manage customer reviews</p>
        </div>
        <Button onClick={() => { setForm({ customerName: "", rating: 5, text: "", featured: false }); setModalOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.customerName}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "text-primary fill-primary" : "text-muted"}`} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">{t.comment || t.text}</TableCell>
                  <TableCell>
                    <Badge variant={t.approved ? "default" : "secondary"} className={t.approved ? "bg-success text-success-foreground" : ""}>
                      {t.approved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {t.featured && <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30"><Star className="h-3 w-3 mr-1" />Featured</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => toggleApproval(t.id)} title={t.approved ? "Reject" : "Approve"}>
                        {t.approved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4 text-success" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toggleFeatured(t.id)} title="Toggle featured">
                        <Star className={`h-4 w-4 ${t.featured ? "text-primary fill-primary" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(t.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminModal open={modalOpen} onOpenChange={setModalOpen} title="Add Testimonial">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Customer Name</Label>
            <Input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Rating (1-5)</Label>
            <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
          </div>
          <div className="grid gap-2">
            <Label>Review Text</Label>
            <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
            <Label>Mark as Featured</Label>
          </div>
          <Button onClick={handleAdd} className="w-full">Add Testimonial</Button>
        </div>
      </AdminModal>
    </div>
  );
}
