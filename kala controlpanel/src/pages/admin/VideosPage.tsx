import { useState } from "react";
import { mockArtworkVideos, ArtworkVideo } from "@/data/mockData";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2, Play, Video } from "lucide-react";
import { toast } from "sonner";

const videoCategories = ["Krishna", "Buddha", "Ganesh", "Peacock", "Floral", "Making Process", "Other"] as const;

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<ArtworkVideo[]>(mockArtworkVideos);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [playVideo, setPlayVideo] = useState<ArtworkVideo | null>(null);
  const [form, setForm] = useState({ title: "", category: "Krishna" as ArtworkVideo["category"], videoUrl: "", thumbnailUrl: "", featured: false });

  const filtered = filterCat === "all" ? videos : videos.filter((v) => v.category === filterCat);

  const openAdd = () => {
    setForm({ title: "", category: "Krishna", videoUrl: "", thumbnailUrl: "", featured: false });
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (v: ArtworkVideo) => {
    setForm({ title: v.title, category: v.category, videoUrl: v.videoUrl, thumbnailUrl: v.thumbnailUrl, featured: v.featured });
    setEditId(v.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.videoUrl) { toast.error("Title and video URL required"); return; }
    const ytId = getYouTubeId(form.videoUrl);
    const thumb = form.thumbnailUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "");
    if (editId) {
      setVideos((prev) => prev.map((v) => v.id === editId ? { ...v, ...form, thumbnailUrl: thumb } : v));
      toast.success("Video updated");
    } else {
      setVideos((prev) => [...prev, { id: String(Date.now()), ...form, thumbnailUrl: thumb, createdAt: new Date().toISOString().split("T")[0] }]);
      toast.success("Video added");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    toast.success("Video deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Artwork Videos</h1>
          <p className="text-muted-foreground">Manage artwork videos and YouTube embeds</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Video</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filterCat === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterCat("all")}>All</Button>
        {videoCategories.map((c) => (
          <Button key={c} variant={filterCat === c ? "default" : "outline"} size="sm" onClick={() => setFilterCat(c)}>{c}</Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((vid) => (
          <Card key={vid.id} className="overflow-hidden animate-fade-in group">
            <div className="aspect-video relative cursor-pointer" onClick={() => setPlayVideo(vid)}>
              <img src={vid.thumbnailUrl || "/placeholder.svg"} alt={vid.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-primary rounded-full p-3">
                  <Play className="h-6 w-6 text-primary-foreground fill-current" />
                </div>
              </div>
              {vid.featured && (
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">Featured</Badge>
              )}
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm truncate">{vid.title}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">{vid.category}</p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(vid)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(vid.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            <Video className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No videos in this category</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal open={modalOpen} onOpenChange={setModalOpen} title={editId ? "Edit Video" : "Add Video"}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Video title" />
          </div>
          <div className="grid gap-2">
            <Label>Video URL (YouTube or direct)</Label>
            <Input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
          </div>
          <div className="grid gap-2">
            <Label>Thumbnail URL (auto-generated for YouTube)</Label>
            <Input value={form.thumbnailUrl} onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })} placeholder="https://..." />
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as ArtworkVideo["category"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{videoCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
            <Label>Featured Video</Label>
          </div>
          <Button onClick={handleSave} className="w-full">{editId ? "Update" : "Add"} Video</Button>
        </div>
      </AdminModal>

      {/* Play Modal */}
      <AdminModal open={!!playVideo} onOpenChange={() => setPlayVideo(null)} title={playVideo?.title || "Video"}>
        {playVideo && (() => {
          const ytId = getYouTubeId(playVideo.videoUrl);
          return ytId ? (
            <div className="aspect-video">
              <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} className="w-full h-full rounded-lg" allowFullScreen allow="autoplay" />
            </div>
          ) : (
            <video src={playVideo.videoUrl} controls autoPlay className="w-full rounded-lg" />
          );
        })()}
      </AdminModal>
    </div>
  );
}
