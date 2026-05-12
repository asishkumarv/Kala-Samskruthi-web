import { useApi } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import {  Order } from "@/data/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye } from "lucide-react";
import { toast } from "sonner";

const orderStatuses = ["Received", "Processing", "Shipped", "Delivered", "Cancelled"] as const;

export default function OrdersPage() {
  const { data: mockOrders } = useApi('/orders');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  useEffect(() => {
    if (mockOrders && mockOrders.length > 0) {
      setOrders(mockOrders);
    }
  }, [mockOrders]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: Order["status"]) => {
    try {
      const res = await fetch(`https://kala-samskruthi-web.onrender.com/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update');
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
      if (selected?.id === id) setSelected({ ...selected!, status });
      toast.success(`Order status updated to ${status}`);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders & Bookings</h1>
        <p className="text-muted-foreground">Manage customer orders and artwork bookings</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {orderStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="hidden md:table-cell">Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{order.items.length} item{order.items.length > 1 ? "s" : ""}</TableCell>
                  <TableCell className="font-medium">₹{order.total.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="hidden md:table-cell"><StatusBadge status={order.paymentStatus} /></TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setSelected(order)}><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminModal open={!!selected} onOpenChange={() => setSelected(null)} title={`Order ${selected?.id || ""}`} description="Order & booking details">
        {selected && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-muted-foreground text-xs">Customer</Label><p className="font-medium">{selected.customerName}</p></div>
              <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium">{selected.phone}</p></div>
              <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{selected.email}</p></div>
              <div><Label className="text-muted-foreground text-xs">Booking Date</Label><p className="font-medium">{selected.bookingDate}</p></div>
            </div>
            <div className="border-t pt-4">
              <Label className="text-muted-foreground text-xs">Address</Label>
              <p>{selected.address}</p>
            </div>
            <div className="border-t pt-4">
              <Label className="text-muted-foreground text-xs mb-2 block">Items</Label>
              <div className="space-y-3">
                {selected.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start border rounded-lg p-3">
                    {item.productImage ? (
                      <img src={item.productImage} alt={item.productName} className="h-16 w-16 rounded-md object-cover" />
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">No img</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">Size: {item.size} · Material: {item.material} · Qty: {item.quantity}</p>
                      <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t font-bold">
                <span>Total</span>
                <span>₹{selected.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground text-xs">Payment Method</Label>
                <p>{selected.paymentMethod}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Payment Status</Label>
                <div className="mt-1"><StatusBadge status={selected.paymentStatus} /></div>
              </div>
            </div>
            <div className="border-t pt-4 grid gap-2">
              <Label>Order Status</Label>
              <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v as Order["status"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{orderStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
