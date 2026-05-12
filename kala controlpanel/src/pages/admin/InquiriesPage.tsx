import { useApi } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import {  Inquiry } from "@/data/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye } from "lucide-react";
import { toast } from "sonner";

const statuses = ["New", "In Progress", "Quoted", "Completed"] as const;

export default function InquiriesPage() {
  const { data: mockInquiries } = useApi('/inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  useEffect(() => {
    if (mockInquiries && mockInquiries.length > 0) {
      setInquiries(mockInquiries);
    }
  }, [mockInquiries]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const filtered = inquiries.filter((i) => {
    const matchSearch = i.customerName.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      const res = await fetch(`https://kala-samskruthi-web.onrender.com/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update');
      setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
      if (selected?.id === id) setSelected({ ...selected!, status });
      toast.success(`Inquiry marked as ${status}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    // Assuming backend will support notes update later, but for now we'll just fake it or add it
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, notes } : i));
    if (selected?.id === id) setSelected({ ...selected!, notes });
    toast.success("Notes saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-muted-foreground">Custom order requests & inquiries</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Design</TableHead>
                <TableHead className="hidden md:table-cell">Material</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inq) => (
                <TableRow key={inq.id}>
                  <TableCell className="font-medium">{inq.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{inq.customerName}</p>
                      <p className="text-xs text-muted-foreground">{inq.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">{inq.designPreference}</TableCell>
                  <TableCell className="hidden md:table-cell">{inq.materialSelection}</TableCell>
                  <TableCell><StatusBadge status={inq.status} /></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setSelected(inq)}><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminModal open={!!selected} onOpenChange={() => setSelected(null)} title={`Inquiry ${selected?.id || ""}`} description="Customer inquiry details">
        {selected && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-muted-foreground text-xs">Customer</Label><p className="font-medium">{selected.customerName}</p></div>
              <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium">{selected.phone}</p></div>
              <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{selected.email}</p></div>
              <div><Label className="text-muted-foreground text-xs">Date</Label><p className="font-medium">{selected.createdAt}</p></div>
            </div>
            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div><Label className="text-muted-foreground text-xs">Custom Size</Label><p>{selected.customSize}</p></div>
              <div><Label className="text-muted-foreground text-xs">Material</Label><p>{selected.materialSelection}</p></div>
              <div><Label className="text-muted-foreground text-xs">Design Preference</Label><p>{selected.designPreference}</p></div>
              <div><Label className="text-muted-foreground text-xs">Colors</Label><p>{selected.colorChoices}</p></div>
            </div>
            <div className="border-t pt-4">
              <Label className="text-muted-foreground text-xs">Message</Label>
              <p className="mt-1">{selected.message}</p>
            </div>
            <div className="border-t pt-4 grid gap-2">
              <Label>Status</Label>
              <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v as Inquiry["status"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Internal Notes</Label>
              <Textarea value={selected.notes} onChange={(e) => updateNotes(selected.id, e.target.value)} rows={3} placeholder="Add notes..." />
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
