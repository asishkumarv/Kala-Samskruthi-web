import { useState, useRef, useCallback, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";

const UNITS = [
  { label: "-- select --", value: "" },
  { label: "Inches", value: "inches" },
  { label: "Centimeters", value: "cm" },
  { label: "Feet", value: "feet" },
];

const MATERIALS = ["MDF", "Canvas", "Acrylic", "Wood", "Metal"];

const UploadWallArt = () => {
  const [wallImage, setWallImage] = useState<string | null>(null);
  const [artworkImage, setArtworkImage] = useState<string | null>(null);
  const [artNaturalSize, setArtNaturalSize] = useState({ w: 1, h: 1 });
  const [unit, setUnit] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [material, setMaterial] = useState("MDF");
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [artPos, setArtPos] = useState({ x: 0, y: 0 });
  const [artScale, setArtScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [fitToWall, setFitToWall] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const wallInputRef = useRef<HTMLInputElement>(null);
  const artInputRef = useRef<HTMLInputElement>(null);
  // Track which dimension user is actively editing to lock aspect ratio
  const lockRef = useRef<"w" | "h" | null>(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    artworkDetails: "",
    colorPreferences: ""
  });

  const handleBookingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://kala-samskruthi-web.onrender.com/api/custom-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingForm,
          preferredSize: `${width} ${unit} x ${height} ${unit}`,
          material: material,
          uploadedImageUrl: artworkImage,
          status: 'New'
        })
      });

      if (!response.ok) throw new Error('Failed to submit request');
      
      alert('Custom artwork request submitted successfully!');
      setShowBookingModal(false);
      setBookingForm({ customerName: "", email: "", phone: "", address: "", artworkDetails: "", colorPreferences: "" });
    } catch (error) {
      console.error(error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCanvas = () => {
    setArtPos({ x: 0, y: 0 });
    setArtScale(1);
    setRotation(0);
    setOpacity(100);
    setFitToWall(false);
    setWidth("");
    setHeight("");
  };

  const handleWallUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Clear old wall
    setWallImage(null);
    resetCanvas();
    const reader = new FileReader();
    reader.onload = () => setWallImage(reader.result as string);
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleArtUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Clear old artwork
    setArtworkImage(null);
    resetCanvas();
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      // Get natural dimensions for aspect ratio
      const img = new Image();
      img.onload = () => {
        setArtNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
        setArtworkImage(src);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Proportional width/height: when one changes, auto-adjust the other
  const handleWidthChange = (val: string) => {
    lockRef.current = "w";
    setWidth(val);
    setFitToWall(false);
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0 && artNaturalSize.w > 0) {
      const ratio = artNaturalSize.h / artNaturalSize.w;
      setHeight((n * ratio).toFixed(1));
    }
  };

  const handleHeightChange = (val: string) => {
    lockRef.current = "h";
    setHeight(val);
    setFitToWall(false);
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0 && artNaturalSize.h > 0) {
      const ratio = artNaturalSize.w / artNaturalSize.h;
      setWidth((n * ratio).toFixed(1));
    }
  };

  // Compute pixel scale from user dimensions
  const computedScale = (() => {
    if (fitToWall) return null;
    const container = previewRef.current;
    if (!container || !width || !height || !unit) return null;
    const pxPerUnit = unit === "inches" ? 10 : unit === "cm" ? 4 : unit === "feet" ? 120 : 0;
    if (!pxPerUnit) return null;
    const artW = parseFloat(width) * pxPerUnit;
    const artH = parseFloat(height) * pxPerUnit;
    if (!artW || !artH) return null;
    const maxW = container.clientWidth * 0.8;
    const maxH = container.clientHeight * 0.8;
    return Math.min(maxW / artW, maxH / artH, 3);
  })();

  const effectiveScale = computedScale ?? artScale;

  const handleReset = () => resetCanvas();

  const handleFitToWall = () => {
    setArtPos({ x: 0, y: 0 });
    setArtScale(1);
    setRotation(0);
    setFitToWall(true);
  };

  const handleDownloadPreview = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "wall-art-preview.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  }, []);

  const handleDownloadArtwork = useCallback(() => {
    if (!artworkImage) return;
    const link = document.createElement("a");
    link.download = "artwork.png";
    link.href = artworkImage;
    link.click();
  }, [artworkImage]);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    if (!artworkImage) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - artPos.x, y: e.clientY - artPos.y });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setArtPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setIsDragging(false);

  // Touch drag & pinch
  const touchStartRef = useRef<{ dist: number; scale: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    if (!artworkImage) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - artPos.x, y: e.touches[0].clientY - artPos.y });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = { dist, scale: effectiveScale };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setArtPos({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
    } else if (e.touches.length === 2 && touchStartRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = touchStartRef.current.scale * (dist / touchStartRef.current.dist);
      setArtScale(Math.max(0.1, Math.min(5, newScale)));
      setFitToWall(false);
    }
  };
  const onTouchEnd = () => {
    setIsDragging(false);
    touchStartRef.current = null;
  };

  // Scroll to zoom
  const onWheel = (e: React.WheelEvent) => {
    if (!artworkImage) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setArtScale((s) => Math.max(0.1, Math.min(5, s + delta)));
    setFitToWall(false);
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block font-body font-medium text-foreground mb-1 text-sm";
  const btnClass =
    "px-4 py-2 rounded-md font-body text-sm font-medium border border-border bg-muted text-foreground hover:bg-accent hover:text-accent-foreground transition-colors";
  const btnPrimaryClass =
    "px-4 py-2 rounded-md font-body text-sm font-medium bg-accent text-accent-foreground hover:brightness-110 transition-all";

  return (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl md:text-3xl mb-2 text-foreground">
            Try artwork on your wall — AR-like preview
          </h1>
          <p className="text-sm font-body text-muted-foreground mb-6">
            1) Upload a photo of your wall → 2) Upload your artwork → 3) Enter size → 4) Drag/scale/rotate to place → 5) Download &amp; book
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left – Form */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-5">
            <div>
              <label className={labelClass}>1) Upload your WALL photo</label>
              <input ref={wallInputRef} type="file" accept="image/*" onChange={handleWallUpload} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>2) Upload your ARTWORK image</label>
              <input ref={artInputRef} type="file" accept="image/*" onChange={handleArtUpload} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>3) Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Width</label>
                <input
                  type="number"
                  placeholder="e.g. 60"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Height</label>
                <input
                  type="number"
                  placeholder="e.g. 40"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className={inputClass}>
                {MATERIALS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleFitToWall} className={btnClass}>Fit to wall</button>
              <button onClick={handleReset} className={btnClass}>Reset position</button>
              <button onClick={handleDownloadPreview} className={btnPrimaryClass}>Download Preview</button>
            </div>
            <p className="text-xs font-body text-muted-foreground">
              Tip: Take a straight-on photo of your wall for the best result.
            </p>
          </motion.div>

          {/* Right – Preview */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
            <div
              ref={previewRef}
              className="relative w-full rounded-xl overflow-hidden bg-secondary select-none cursor-crosshair"
              style={{ minHeight: 360, aspectRatio: "4/3", touchAction: "none" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onWheel={onWheel}
            >
              {!wallImage && !artworkImage && (
                <p className="absolute inset-0 flex items-center justify-center text-sm font-body text-muted-foreground px-4 text-center">
                  Upload images to preview artwork on your wall
                </p>
              )}
              {wallImage && (
                <img src={wallImage} alt="Wall" className="absolute inset-0 w-full h-full object-cover" />
              )}
              {artworkImage && (
                <img
                  src={artworkImage}
                  alt="Artwork"
                  draggable={false}
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${artPos.x}px), calc(-50% + ${artPos.y}px)) scale(${fitToWall ? 1 : effectiveScale}) rotate(${rotation}deg)`,
                    opacity: opacity / 100,
                    maxWidth: fitToWall ? "90%" : "60%",
                    maxHeight: fitToWall ? "90%" : "60%",
                    objectFit: "contain",
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                  }}
                />
              )}
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-body text-foreground font-medium mb-2 block">
                  Rotate ({rotation}°)
                </label>
                <Slider value={[rotation]} onValueChange={([v]) => setRotation(v)} min={-180} max={180} step={1} />
              </div>
              <div>
                <label className="text-sm font-body text-foreground font-medium mb-2 block">
                  Opacity ({opacity}%)
                </label>
                <Slider value={[opacity]} onValueChange={([v]) => setOpacity(v)} min={0} max={100} step={1} />
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setShowBookingModal(true)}
                className={btnPrimaryClass}
              >
                Book This Artwork
              </button>
              <button onClick={handleDownloadArtwork} className={btnPrimaryClass}>
                Download PNG
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="font-display text-2xl mb-4 text-foreground">Submit Custom Request</h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input required type="text" name="customerName" className="w-full p-2 rounded border bg-background" onChange={handleBookingFormChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input required type="email" name="email" className="w-full p-2 rounded border bg-background" onChange={handleBookingFormChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input required type="tel" name="phone" className="w-full p-2 rounded border bg-background" onChange={handleBookingFormChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea required name="address" className="w-full p-2 rounded border bg-background" rows={2} onChange={handleBookingFormChange}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Artwork Details / Notes</label>
                <textarea required name="artworkDetails" className="w-full p-2 rounded border bg-background" rows={2} onChange={handleBookingFormChange}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Color Preferences</label>
                <input type="text" name="colorPreferences" className="w-full p-2 rounded border bg-background" onChange={handleBookingFormChange} />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowBookingModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-accent text-accent-foreground rounded">{isSubmitting ? 'Submitting...' : 'Submit Request'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWallArt;
