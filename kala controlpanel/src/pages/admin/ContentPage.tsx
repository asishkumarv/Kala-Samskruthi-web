import { useState, useEffect } from "react";
import { mockSiteContent, SiteContent } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent>(mockSiteContent);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('https://kala-samskruthi-web.onrender.com/api/content')
      .then(res => res.json())
      .then(data => {
        if (data) setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('https://kala-samskruthi-web.onrender.com/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success("Content saved successfully!");
    } catch (err) {
      toast.error("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Edit website content & settings</p>
      </div>

      <Tabs defaultValue="homepage">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage">
          <Card>
            <CardHeader><CardTitle>Homepage Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Hero Text (Title)</Label>
                <Input value={content.homepageText} onChange={(e) => setContent({ ...content, homepageText: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Hero Subtext (Description)</Label>
                <Textarea value={content.homepageSubtext || ""} onChange={(e) => setContent({ ...content, homepageSubtext: e.target.value })} rows={4} />
              </div>
              <Button onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader><CardTitle>About Us</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>About Text</Label>
                <Textarea value={content.aboutUsText} onChange={(e) => setContent({ ...content, aboutUsText: e.target.value })} rows={6} />
              </div>
              <Button onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader><CardTitle>Material Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {content.materialDetails.map((mat, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-2">
                  <Label className="font-medium">{mat.name}</Label>
                  <Textarea
                    value={mat.description}
                    onChange={(e) => {
                      const updated = [...content.materialDetails];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      setContent({ ...content, materialDetails: updated });
                    }}
                    rows={2}
                  />
                </div>
              ))}
              <Button onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader><CardTitle>Contact & Social</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input value={content.contactInfo.phone} onChange={(e) => setContent({ ...content, contactInfo: { ...content.contactInfo, phone: e.target.value } })} />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={content.contactInfo.email} onChange={(e) => setContent({ ...content, contactInfo: { ...content.contactInfo, email: e.target.value } })} />
                </div>
                <div className="grid gap-2">
                  <Label>Address</Label>
                  <Input value={content.contactInfo.address} onChange={(e) => setContent({ ...content, contactInfo: { ...content.contactInfo, address: e.target.value } })} />
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <Label className="font-medium">Social Media Links</Label>
                {content.socialLinks.map((link, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Label className="w-24 text-muted-foreground">{link.platform}</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...content.socialLinks];
                        updated[idx] = { ...updated[idx], url: e.target.value };
                        setContent({ ...content, socialLinks: updated });
                      }}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background border border-border p-6 rounded-lg shadow-xl flex flex-col items-center gap-4 min-w-[220px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Saving content changes...</p>
          </div>
        </div>
      )}
    </div>
  );
}
