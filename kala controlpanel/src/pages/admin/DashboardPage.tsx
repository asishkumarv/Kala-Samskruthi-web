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

  // Generate dynamic recent activity feed
  const recentActivity = [
    ...orders.map((o: any) => ({ type: "order", text: `New order #${o.id.slice(0, 8)} from ${o.customerName}`, date: new Date(o.createdAt) })),
    ...mockInquiries.map((i: any) => ({ type: "inquiry", text: `New inquiry from ${i.customerName}`, date: new Date(i.createdAt) })),
    ...customReqs.map((c: any) => ({ type: "custom", text: `New custom request from ${c.customerName}`, date: new Date(c.createdAt) }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

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
              {recentActivity.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                    act.type === 'order' ? 'bg-blue-500' : act.type === 'inquiry' ? 'bg-amber-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{act.text}</p>
                    <p className="text-xs text-muted-foreground">{act.date.toLocaleDateString()} {act.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">No recent activity</p>
              )}
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
                    <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>₹{order.total.toLocaleString("en-IN")}</TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No recent orders
                    </TableCell>
                  </TableRow>
                )}
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
