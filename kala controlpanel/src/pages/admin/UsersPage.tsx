import { useState, useEffect } from "react";
import { mockAdminUsers, AdminUser } from "@/data/mockData";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Shield, UserCheck, Pencil } from "lucide-react";
import { toast } from "sonner";

const roles = ["Super Admin", "Staff Admin", "Editor"] as const;
const roleIcons: Record<string, typeof Shield> = { "Super Admin": Shield, "Staff Admin": UserCheck, "Editor": Pencil };

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);
  useEffect(() => {
    if (mockAdminUsers && mockAdminUsers.length > 0) {
      setUsers(mockAdminUsers);
    }
  }, [mockAdminUsers]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Staff Admin" as AdminUser["role"] });

  const handleAdd = async () => {
    if (!form.name || !form.email) { toast.error("Name and email are required"); return; }
    try {
      const res = await fetch('https://kala-samskruthi-web.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: 'password123' }) // Default password for admin creation
      });
      if (!res.ok) throw new Error('Failed to create');
      const newUser = await res.json();
      setUsers((prev) => [...prev, { ...newUser, lastLogin: "Never", active: true }]);
      setModalOpen(false);
      toast.success("User added successfully");
    } catch (err) {
      toast.error("Failed to add user");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this user? This action cannot be undone.")) return;
    try {
      const res = await fetch(`https://kala-samskruthi-web.onrender.com/api/users/${id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User removed successfully");
    } catch (err) {
      toast.error("Failed to remove user");
    }
  };

  const toggleActive = async (id: string) => {
    try {
      const u = users.find(u => u.id === id);
      const res = await fetch(`https://kala-samskruthi-web.onrender.com/api/users/${id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // Using role endpoint to update active state for now
        body: JSON.stringify({ active: !u?.active })
      });
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, active: !u.active } : u));
      toast.success("User status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage admin users & roles</p>
        </div>
        <Button onClick={() => { setForm({ name: "", email: "", role: "Staff Admin" }); setModalOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => {
                const RoleIcon = roleIcons[u.role] || Shield;
                return (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <RoleIcon className="h-3 w-3" /> {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{u.lastLogin}</TableCell>
                    <TableCell>
                      <Badge variant={u.active ? "default" : "secondary"} className={u.active ? "bg-success text-success-foreground" : ""}>
                        {u.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => toggleActive(u.id)}>
                          {u.active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(u.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminModal open={modalOpen} onOpenChange={setModalOpen} title="Add User">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as AdminUser["role"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Button onClick={handleAdd} className="w-full">Add User</Button>
        </div>
      </AdminModal>
    </div>
  );
}
