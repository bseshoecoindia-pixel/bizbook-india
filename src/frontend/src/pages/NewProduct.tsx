import type { ProductInput } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProduct } from "@/hooks/useBackend";
import { ExternalBlob } from "@caffeineai/object-storage";
import { useQRScanner } from "@caffeineai/qr-code";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  CameraOff,
  ChevronLeft,
  ImagePlus,
  Loader2,
  Scan,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Clothing",
  "Food & Spices",
  "Cosmetics",
  "Electronics",
  "Stationery",
  "Other",
];

const UNITS = ["Pcs", "Kg", "Litre", "Box", "Pack", "Set"];

const SKU_PREFIXES: Record<string, string> = {
  Clothing: "CLT",
  "Food & Spices": "SPC",
  Cosmetics: "CSM",
  Electronics: "ELC",
  Stationery: "STN",
  Other: "OTH",
};

function generateSKU(category: string): string {
  const prefix = SKU_PREFIXES[category] ?? "PRD";
  return `${prefix}-${Date.now().toString().slice(-4)}`;
}

// ─── Barcode Scanner Modal ────────────────────────────────────────────────

function BarcodeScannerModal({
  onClose,
  onScan,
}: {
  onClose: () => void;
  onScan: (code: string) => void;
}) {
  const {
    qrResults,
    isActive,
    error,
    isLoading,
    canStartScanning,
    startScanning,
    stopScanning,
    videoRef,
    canvasRef,
  } = useQRScanner({ facingMode: "environment", scanInterval: 100 });

  const handleUse = () => {
    if (qrResults.length > 0) {
      onScan(qrResults[0].data);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4"
      data-ocid="new_product.scanner_modal"
    >
      <div className="w-full max-w-[400px] bg-card rounded-2xl overflow-hidden shadow-elevated">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Scan Barcode</p>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
            data-ocid="new_product.scanner_close_button"
            aria-label="Close scanner"
          >
            <X size={14} className="text-muted-foreground" />
          </button>
        </div>

        <div className="relative bg-black aspect-square">
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            playsInline
            muted
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-primary rounded-xl opacity-80" />
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="text-sm text-white">Starting camera...</p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
              <p className="text-sm text-red-400 text-center">
                {typeof error === "string" ? error : "Camera error occurred"}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          {qrResults.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <p className="text-xs text-green-700 font-medium truncate">
                ✓ {qrResults[0].data}
              </p>
            </div>
          )}
          <div className="flex gap-2">
            {!isActive ? (
              <Button
                className="flex-1 rounded-xl"
                onClick={startScanning}
                disabled={!canStartScanning}
                data-ocid="new_product.scanner_start_button"
              >
                <Camera size={15} className="mr-1.5" />
                Start
              </Button>
            ) : (
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={stopScanning}
                data-ocid="new_product.scanner_stop_button"
              >
                <CameraOff size={15} className="mr-1.5" />
                Stop
              </Button>
            )}
            {qrResults.length > 0 && (
              <Button
                className="flex-1 rounded-xl"
                onClick={handleUse}
                data-ocid="new_product.scanner_confirm_button"
              >
                Use Code
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function NewProduct() {
  const navigate = useNavigate();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form
  const [form, setForm] = useState({
    name: "",
    category: "",
    sku: "",
    barcode: "",
    purchasePrice: "",
    sellingPrice: "",
    quantity: "",
    unit: "Pcs",
    taxPercent: "18",
    supplierName: "",
  });
  const [skuAuto, setSkuAuto] = useState(true);

  function update(field: string, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "category" && skuAuto) {
        next.sku = generateSKU(value);
      }
      return next;
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category || !form.sellingPrice || !form.quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    let imageUrl: string | undefined;
    if (imageFile) {
      try {
        const bytes = new Uint8Array(await imageFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
          setUploadProgress(pct),
        );
        imageUrl = blob.getDirectURL();
      } catch {
        toast.error("Image upload failed — saving without image");
      }
    }

    const input: ProductInput = {
      name: form.name.trim(),
      category: form.category,
      sku: form.sku.trim() || generateSKU(form.category),
      barcode: form.barcode.trim() || undefined,
      purchasePrice: BigInt(
        Math.round(Number(form.purchasePrice || "0") * 100),
      ),
      sellingPrice: BigInt(Math.round(Number(form.sellingPrice) * 100)),
      quantity: BigInt(Number(form.quantity) || 0),
      unit: form.unit,
      taxPercent: BigInt(Number(form.taxPercent) || 18),
      supplierName: form.supplierName.trim() || undefined,
      imageUrl,
    };

    createProduct(input, {
      onSuccess: () => {
        toast.success("Product added successfully");
        navigate({ to: "/inventory" });
      },
      onError: () => toast.error("Failed to add product. Please try again."),
    });
  }

  return (
    <div className="flex flex-col pb-6" data-ocid="new_product.page">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border/50 px-4 py-3 flex items-center gap-3 shadow-subtle">
        <button
          type="button"
          onClick={() => navigate({ to: "/inventory" })}
          className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0"
          data-ocid="new_product.back_button"
          aria-label="Go back"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h1 className="text-base font-bold text-foreground font-display leading-tight">
            Add Product
          </h1>
          <p className="text-[11px] text-muted-foreground">
            Fill in the product details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-4">
        {/* Image upload */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card">
          <Label className="text-xs font-medium text-foreground mb-2.5 block">
            Product Image
          </Label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-2xl bg-muted border border-dashed border-border flex items-center justify-center overflow-hidden shrink-0"
              data-ocid="new_product.image_dropzone"
              aria-label="Upload product image"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImagePlus
                  size={24}
                  className="text-muted-foreground opacity-50"
                />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl w-full text-xs"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="new_product.image_upload_button"
              >
                <ImagePlus size={14} className="mr-1.5" />
                {imageFile ? "Change Image" : "Upload Image"}
              </Button>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2 bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
              {imageFile && (
                <p className="text-[10px] text-muted-foreground mt-1 truncate">
                  {imageFile.name}
                </p>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </Card>

        {/* Basic info */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Basic Info
          </p>

          <Field label="Product Name" required>
            <Input
              placeholder="e.g. Everest Garam Masala 100g"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rounded-xl bg-muted border-0 h-10"
              data-ocid="new_product.name_input"
            />
          </Field>

          <Field label="Category" required>
            <Select
              value={form.category}
              onValueChange={(v) => update("category", v)}
            >
              <SelectTrigger
                className="rounded-xl bg-muted border-0 h-10"
                data-ocid="new_product.category_select"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="SKU Code">
            <div className="flex gap-2">
              <Input
                placeholder="Auto-generated"
                value={form.sku}
                onChange={(e) => {
                  setSkuAuto(false);
                  update("sku", e.target.value);
                }}
                className="rounded-xl bg-muted border-0 h-10"
                data-ocid="new_product.sku_input"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl shrink-0 h-10 text-xs px-3"
                onClick={() => {
                  setSkuAuto(true);
                  update("sku", generateSKU(form.category || "Other"));
                }}
                data-ocid="new_product.sku_generate_button"
              >
                Auto
              </Button>
            </div>
          </Field>

          <Field label="Barcode">
            <div className="flex gap-2">
              <Input
                placeholder="Scan or enter barcode"
                value={form.barcode}
                onChange={(e) => update("barcode", e.target.value)}
                className="rounded-xl bg-muted border-0 h-10"
                data-ocid="new_product.barcode_input"
              />
              <button
                type="button"
                onClick={() => setScannerOpen(true)}
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-smooth hover:bg-primary/20"
                data-ocid="new_product.barcode_scan_button"
                aria-label="Scan barcode"
              >
                <Scan size={16} className="text-primary" />
              </button>
            </div>
          </Field>
        </Card>

        {/* Pricing */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Pricing
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Purchase Price (₹)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.purchasePrice}
                  onChange={(e) => update("purchasePrice", e.target.value)}
                  className="pl-7 rounded-xl bg-muted border-0 h-10"
                  data-ocid="new_product.purchase_price_input"
                />
              </div>
            </Field>
            <Field label="Selling Price (₹)" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.sellingPrice}
                  onChange={(e) => update("sellingPrice", e.target.value)}
                  className="pl-7 rounded-xl bg-muted border-0 h-10"
                  data-ocid="new_product.selling_price_input"
                />
              </div>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tax % (GST)">
              <Input
                type="number"
                placeholder="18"
                value={form.taxPercent}
                onChange={(e) => update("taxPercent", e.target.value)}
                className="rounded-xl bg-muted border-0 h-10"
                data-ocid="new_product.tax_input"
              />
            </Field>
          </div>
        </Card>

        {/* Stock */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Stock
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Current Qty" required>
              <Input
                type="number"
                placeholder="0"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                className="rounded-xl bg-muted border-0 h-10"
                data-ocid="new_product.quantity_input"
              />
            </Field>
            <Field label="Unit Type">
              <Select
                value={form.unit}
                onValueChange={(v) => update("unit", v)}
              >
                <SelectTrigger
                  className="rounded-xl bg-muted border-0 h-10"
                  data-ocid="new_product.unit_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </Card>

        {/* Supplier */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card">
          <Field label="Supplier Name">
            <Input
              placeholder="e.g. Sharma Wholesale Traders, Delhi"
              value={form.supplierName}
              onChange={(e) => update("supplierName", e.target.value)}
              className="rounded-xl bg-muted border-0 h-10"
              data-ocid="new_product.supplier_input"
            />
          </Field>
        </Card>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl text-base font-semibold"
          disabled={isPending}
          data-ocid="new_product.save_button"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Product"
          )}
        </Button>
      </form>

      {scannerOpen && (
        <BarcodeScannerModal
          onScan={(code) => update("barcode", code)}
          onClose={() => setScannerOpen(false)}
        />
      )}
    </div>
  );
}
