import { useApi } from "@/hooks/useApi";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, MessageSquare, ShoppingCart, IndianRupee, Activity, Video, Paintbrush } from "lucide-react";

export default function DashboardPage() {
  const { data: mockInquiries = [] } = useApi('/inquiries');
  const { data: orders = [] } = useApi('/orders');
  const { data: products = [] } = useApi('/products');
  const { data: videos = [] } = useApi('/videos');
  const { data: customReqs = [] } = useApi('/custom-requests');

  // Calculate dynamic stats
  const totalProducts = products.length;
  const totalInquiries = mockInquiries.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum: number, o: any) => sum + o.total, 0);
  const totalVideos = videos.length;
  const totalCustomRequests = customReqs.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your store.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <StatCard title="Products" value={totalProducts} icon={Package} trend={{ value: 0, positive: true }} />
        <StatCard title="Inquiries" value={totalInquiries} icon={MessageSquare} trend={{ value: 0, positive: true }} />
        <StatCard title="Orders" value={totalOrders} icon={ShoppingCart} trend={{ value: 0, positive: true }} />
        <StatCard title="Revenue" value={`₹${totalRevenue.toLocaleString("en-IN")}`} icon={IndianRupee} trend={{ value: 0, positive: true }} />
        <StatCard title="Videos" value={totalVideos} icon={Video} />
        <StatCard title="Custom Requests" value={totalCustomRequests} icon={Paintbrush} trend={{ value: 0, positive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="mt-1 h-2 w-2 rounded-full shrink-0 bg-success" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">Activity dynamically loading...</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-primary" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 4).map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>₹{order.total.toLocaleString("en-IN")}</TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-primary" /> Recent Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Design</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInquiries.slice(0, 5).map((inq: any) => (
                <TableRow key={inq.id}>
                  <TableCell className="font-medium">{inq.id}</TableCell>
                  <TableCell>{inq.customerName}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{inq.designPreference}</TableCell>
                  <TableCell>{inq.materialSelection}</TableCell>
                  <TableCell><StatusBadge status={inq.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{inq.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
