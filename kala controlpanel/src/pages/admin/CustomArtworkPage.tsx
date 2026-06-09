import { useApi } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import {  CustomArtworkRequest } from "@/data/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Trash2, Download, FileDown, Paintbrush } from "lucide-react";
import { toast } from "sonner";

const statuses = ["New", "Contacted", "In Review", "Quoted", "Confirmed", "In Production", "Completed"] as const;

export default function CustomArtworkPage() {
  const { data: mockCustomArtworkRequests } = useApi('/custom-requests');
  const [requests, setRequests] = useState<CustomArtworkRequest[]>(mockCustomArtworkRequests);
  useEffect(() => {
    if (mockCustomArtworkRequests && mockCustomArtworkRequests.length > 0) {
      setRequests(mockCustomArtworkRequests);
    }
  }, [mockCustomArtworkRequests]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<CustomArtworkRequest | null>(null);

  const filtered = requests.filter((r) => {
    const matchSearch = r.customerName.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: CustomArtworkRequest["status"]) => {
    try {
      const res = await fetch(`https://api.kalasamskruthiarts.in/api/custom-requests/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update');
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
      if (selected?.id === id) setSelected({ ...selected!, status });
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this custom artwork request? This action cannot be undone.")) return;

    try {
      const res = await fetch(`https://api.kalasamskruthiarts.in/api/custom-requests/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setRequests((prev) => prev.filter((r) => r.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success("Request deleted successfully");
    } catch (err) {
      toast.error("Failed to delete request");
      console.error(err);
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Customer", "Phone", "Email", "Address", "Artwork Details", "Size", "Material", "Colors", "Status", "Date"];
    const rows = requests.map((r) => [r.id, r.customerName, r.phone, r.email, r.address, r.artworkDetails, r.preferredSize, r.material, r.colorPreferences, r.status, r.createdAt]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom_artwork_requests.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Custom Artwork Requests</h1>
          <p className="text-muted-foreground">Manage customize-your-own artwork submissions</p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="gap-2"><FileDown className="h-4 w-4" /> Export CSV</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID, email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
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
                <TableHead className="hidden md:table-cell">Size</TableHead>
                <TableHead className="hidden md:table-cell">Material</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{req.customerName}</p>
                      <p className="text-xs text-muted-foreground">{req.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{req.preferredSize}</TableCell>
                  <TableCell className="hidden md:table-cell">{req.material}</TableCell>
                  <TableCell><StatusBadge status={req.status} /></TableCell>
                  <TableCell className="hidden lg:table-cell">{req.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setSelected(req)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(req.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    <Paintbrush className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    No requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminModal open={!!selected} onOpenChange={() => setSelected(null)} title={`Request ${selected?.id || ""}`} description="Custom artwork request details">
        {selected && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-muted-foreground text-xs">Customer</Label><p className="font-medium">{selected.customerName}</p></div>
              <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium">{selected.phone}</p></div>
              <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{selected.email}</p></div>
              <div><Label className="text-muted-foreground text-xs">Date</Label><p className="font-medium">{selected.createdAt}</p></div>
            </div>
            {selected.address && (
              <div className="border-t pt-4">
                <Label className="text-muted-foreground text-xs">Address</Label>
                <p>{selected.address}</p>
              </div>
            )}
            <div className="border-t pt-4">
              <Label className="text-muted-foreground text-xs">Artwork Details</Label>
              <p>{selected.artworkDetails}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label className="text-muted-foreground text-xs">Preferred Size</Label><p className="font-medium">{selected.preferredSize}</p></div>
              <div><Label className="text-muted-foreground text-xs">Material</Label><p className="font-medium">{selected.material}</p></div>
              <div><Label className="text-muted-foreground text-xs">Color Preferences</Label><p className="font-medium">{selected.colorPreferences}</p></div>
            </div>
            <div className="border-t pt-4">
              <Label className="text-muted-foreground text-xs mb-2 block">Uploaded Reference Image</Label>
              {selected.uploadedImageUrl ? (
                <div className="space-y-2">
                  <img src={selected.uploadedImageUrl} alt="Reference" className="w-full max-w-sm rounded-lg border shadow-sm" />
                  <a href={selected.uploadedImageUrl} download={`custom_request_${selected.id}.png`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <Download className="h-3.5 w-3.5" /> Download Image
                  </a>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
                  <Paintbrush className="h-8 w-8 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No reference image uploaded</p>
                </div>
              )}
            </div>
            {selected.notes && (
              <div className="border-t pt-4">
                <Label className="text-muted-foreground text-xs">Notes / Message</Label>
                <p>{selected.notes}</p>
              </div>
            )}
            <div className="border-t pt-4 grid gap-2">
              <Label>Status</Label>
              <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v as CustomArtworkRequest["status"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
