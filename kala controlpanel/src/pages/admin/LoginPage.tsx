import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://kala-samskruthi-web.onrender.com/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        toast.success("Welcome back!");
        navigate("/admin");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (error) {
      toast.error("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, hsl(30 12% 12%), hsl(30 10% 8%))" }}>
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto mb-2">
            <img src={logo} alt="Kala Samskruthi Arts" className="h-24 w-24 mx-auto rounded-xl object-contain" />
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Sign in to manage your store</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@kalasamskruthi.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            <p className="text-xs text-center text-muted-foreground">Demo: admin@kalasamskruthi.com / admin123</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
