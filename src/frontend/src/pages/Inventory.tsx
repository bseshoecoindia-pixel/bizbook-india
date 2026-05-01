import type { Product } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useQRScanner } from "@caffeineai/qr-code";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Camera,
  CameraOff,
  ChevronRight,
  Package,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatINR(paise: bigint): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100,
  );
}

type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

function getStockStatus(qty: bigint): StockStatus {
  if (qty <= BigInt(0)) return "out_of_stock";
  if (qty <= BigInt(5)) return "low_stock";
  return "in_stock";
}

function StockBadge({ qty }: { qty: bigint }) {
  const status = getStockStatus(qty);
  if (status === "in_stock")
    return (
      <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 text-[10px] px-1.5 py-0.5 font-medium">
        In Stock
      </Badge>
    );
  if (status === "low_stock")
    return (
      <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 text-[10px] px-1.5 py-0.5 font-medium">
        Low Stock
      </Badge>
    );
  return (
    <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50 text-[10px] px-1.5 py-0.5 font-medium">
      Out of Stock
    </Badge>
  );
}

// ─── Placeholder products ─────────────────────────────────────────────────

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    productId: BigInt(1),
    name: "Raymond Suit Fabric (3m)",
    sku: "CLT-001",
    category: "Clothing",
    purchasePrice: BigInt(180000),
    sellingPrice: BigInt(245000),
    quantity: BigInt(22),
    unit: "Pcs",
    taxPercent: BigInt(12),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(2),
    name: "Everest Garam Masala (100g)",
    sku: "SPC-001",
    category: "Food & Spices",
    purchasePrice: BigInt(4500),
    sellingPrice: BigInt(6500),
    quantity: BigInt(3),
    unit: "Pcs",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(3),
    name: "Lakme 9to5 Lipstick",
    sku: "CSM-001",
    category: "Cosmetics",
    purchasePrice: BigInt(37000),
    sellingPrice: BigInt(49900),
    quantity: BigInt(0),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(4),
    name: "boAt Airdopes 141 TWS",
    sku: "ELC-001",
    category: "Electronics",
    purchasePrice: BigInt(119900),
    sellingPrice: BigInt(149900),
    quantity: BigInt(14),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(5),
    name: "Fabindia Kurta (XL)",
    sku: "CLT-002",
    category: "Clothing",
    purchasePrice: BigInt(89000),
    sellingPrice: BigInt(119500),
    quantity: BigInt(4),
    unit: "Pcs",
    taxPercent: BigInt(12),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(6),
    name: "MDH Sabzi Masala (500g)",
    sku: "SPC-002",
    category: "Food & Spices",
    purchasePrice: BigInt(8500),
    sellingPrice: BigInt(12000),
    quantity: BigInt(31),
    unit: "Pcs",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(7),
    name: "Biotique Bio Honey Gel",
    sku: "CSM-002",
    category: "Cosmetics",
    purchasePrice: BigInt(14000),
    sellingPrice: BigInt(18900),
    quantity: BigInt(2),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(8),
    name: "Realme Buds Air 3",
    sku: "ELC-002",
    category: "Electronics",
    purchasePrice: BigInt(159900),
    sellingPrice: BigInt(199900),
    quantity: BigInt(9),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
];

// ─── Stat Card ────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  iconClass,
}: {
  label: string;
  value: string;
  iconClass: string;
}) {
  return (
    <Card className="flex-1 p-3 rounded-2xl border-0 shadow-card bg-card min-w-0">
      <p className={cn("text-sm font-bold truncate", iconClass)}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
        {label}
      </p>
    </Card>
  );
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
      data-ocid="inventory.scanner_modal"
    >
      <div className="w-full max-w-[400px] bg-card rounded-2xl overflow-hidden shadow-elevated">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Scan Barcode</p>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
            data-ocid="inventory.scanner_close_button"
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
                data-ocid="inventory.scanner_start_button"
              >
                <Camera size={15} className="mr-1.5" />
                Start Scanning
              </Button>
            ) : (
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={stopScanning}
                data-ocid="inventory.scanner_stop_button"
              >
                <CameraOff size={15} className="mr-1.5" />
                Stop
              </Button>
            )}
            {qrResults.length > 0 && (
              <Button
                className="flex-1 rounded-xl"
                onClick={handleUse}
                data-ocid="inventory.scanner_confirm_button"
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

// ─── Main Component ───────────────────────────────────────────────────────

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [scannerOpen, setScannerOpen] = useState(false);

  const { data, isLoading } = useProducts();
  const products: Product[] = data?.items ?? PLACEHOLDER_PRODUCTS;

  // Stats
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.quantity <= BigInt(0)).length;
  const lowStock = products.filter(
    (p) => p.quantity > BigInt(0) && p.quantity <= BigInt(5),
  ).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.sellingPrice * p.quantity,
    BigInt(0),
  );

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const status = getStockStatus(p.quantity);
    const matchTab =
      tab === "all" ||
      (tab === "in_stock" && status === "in_stock") ||
      (tab === "low_stock" && status === "low_stock") ||
      (tab === "out_of_stock" && status === "out_of_stock");
    return matchSearch && matchTab;
  });

  return (
    <div className="flex flex-col gap-0 pb-4" data-ocid="inventory.page">
      {/* Stats row */}
      <div className="px-4 pt-4 pb-3 grid grid-cols-4 gap-2">
        <StatCard
          label="Total"
          value={totalProducts.toString()}
          iconClass="text-foreground"
        />
        <StatCard
          label="Out of Stock"
          value={outOfStock.toString()}
          iconClass="text-red-600"
        />
        <StatCard
          label="Low Stock"
          value={lowStock.toString()}
          iconClass="text-amber-600"
        />
        <StatCard
          label="Value"
          value={`₹${formatINR(inventoryValue)}`}
          iconClass="text-primary"
        />
      </div>

      {/* Search + scan */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm px-4 pt-1 pb-2 border-b border-border/50">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search products, SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-muted border-0"
              data-ocid="inventory.search_input"
            />
          </div>
          <button
            type="button"
            onClick={() => setScannerOpen(true)}
            className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-smooth hover:bg-primary/20"
            data-ocid="inventory.scan_barcode_button"
            aria-label="Scan barcode"
          >
            <Camera size={18} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-4 pt-3 pb-2">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full rounded-xl bg-muted h-9">
            {[
              { value: "all", label: "All" },
              { value: "in_stock", label: "In Stock" },
              { value: "low_stock", label: "Low" },
              { value: "out_of_stock", label: "Out" },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="flex-1 rounded-lg text-xs"
                data-ocid={`inventory.${t.value}_tab`}
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Count + add button */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>
        <Button size="sm" className="h-8 rounded-xl text-xs gap-1" asChild>
          <Link to="/inventory/new" data-ocid="inventory.add_product_button">
            <Plus size={14} /> Add Product
          </Link>
        </Button>
      </div>

      {/* Product list */}
      <div className="px-4 space-y-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))
        ) : filtered.length === 0 ? (
          <Card
            className="p-8 text-center shadow-card rounded-2xl border-0 bg-card"
            data-ocid="inventory.empty_state"
          >
            <Package
              size={32}
              className="text-muted-foreground mx-auto mb-2 opacity-40"
            />
            <p className="text-sm font-medium text-muted-foreground">
              No products found
            </p>
            <Button size="sm" className="mt-3 rounded-xl" asChild>
              <Link to="/inventory/new">Add Product</Link>
            </Button>
          </Card>
        ) : (
          filtered.map((product, i) => (
            <Card
              key={product.productId.toString()}
              className="shadow-card rounded-2xl border-0 bg-card overflow-hidden"
              data-ocid={`inventory.product_item.${i + 1}`}
            >
              <Link
                to="/inventory/$id"
                params={{ id: product.productId.toString() }}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-smooth"
              >
                {/* Icon / image */}
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package size={18} className="text-primary" />
                  )}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {product.sku} · {product.category}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {product.quantity.toString()} {product.unit}
                    </span>
                    <StockBadge qty={product.quantity} />
                    {getStockStatus(product.quantity) === "low_stock" && (
                      <AlertTriangle size={12} className="text-amber-500" />
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">
                    ₹{formatINR(product.sellingPrice)}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    per {product.unit}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-muted-foreground ml-1 shrink-0"
                />
              </Link>
            </Card>
          ))
        )}
      </div>

      {/* Barcode scanner modal */}
      {scannerOpen && (
        <BarcodeScannerModal
          onClose={() => setScannerOpen(false)}
          onScan={(code) => setSearch(code)}
        />
      )}
    </div>
  );
}
