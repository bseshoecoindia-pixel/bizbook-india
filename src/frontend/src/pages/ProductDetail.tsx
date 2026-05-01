import type { StockUpdate } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteProduct,
  useProduct,
  useUpdateProductStock,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  Clock,
  History,
  Loader2,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatINR(paise: bigint): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100,
  );
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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
      <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 text-xs">
        In Stock
      </Badge>
    );
  if (status === "low_stock")
    return (
      <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 text-xs">
        Low Stock
      </Badge>
    );
  return (
    <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50 text-xs">
      Out of Stock
    </Badge>
  );
}

// ─── Placeholder stock history ────────────────────────────────────────────

const PLACEHOLDER_HISTORY: StockUpdate[] = [
  {
    updateId: BigInt(1),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(10),
    newQty: BigInt(22),
    changeReason: "Purchase — New stock arrival",
    changedAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
  },
  {
    updateId: BigInt(2),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(14),
    newQty: BigInt(10),
    changeReason: "Sale — Invoice INV-2024-012",
    changedAt: BigInt(Date.now() - 3 * 86400000) * BigInt(1000000),
  },
  {
    updateId: BigInt(3),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(20),
    newQty: BigInt(14),
    changeReason: "Damaged — Quality check failure",
    changedAt: BigInt(Date.now() - 7 * 86400000) * BigInt(1000000),
  },
  {
    updateId: BigInt(4),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(5),
    newQty: BigInt(20),
    changeReason: "Purchase — Sharma Wholesale Delivery",
    changedAt: BigInt(Date.now() - 14 * 86400000) * BigInt(1000000),
  },
  {
    updateId: BigInt(5),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(0),
    newQty: BigInt(5),
    changeReason: "Adjustment — Opening stock",
    changedAt: BigInt(Date.now() - 30 * 86400000) * BigInt(1000000),
  },
];

const STOCK_REASONS = [
  "Purchase",
  "Sale",
  "Return",
  "Damaged",
  "Adjustment",
  "Transfer",
  "Other",
];

// ─── Detail Row ───────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-border/40 last:border-0">
      <p className="text-xs text-muted-foreground w-32 shrink-0">{label}</p>
      <p className="text-sm font-medium text-foreground text-right flex-1 min-w-0 break-words">
        {value}
      </p>
    </div>
  );
}

// ─── Stock History Item ───────────────────────────────────────────────────

function StockHistoryItem({ update }: { update: StockUpdate }) {
  const diff = Number(update.newQty) - Number(update.previousQty);
  const isIncrease = diff >= 0;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/30 last:border-0">
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          isIncrease ? "bg-green-50" : "bg-red-50",
        )}
      >
        {isIncrease ? (
          <ArrowUp size={14} className="text-green-600" />
        ) : (
          <ArrowDown size={14} className="text-red-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">
          {update.changeReason}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {update.previousQty.toString()} → {update.newQty.toString()} units
        </p>
      </div>
      <div className="text-right shrink-0">
        <p
          className={cn(
            "text-xs font-semibold",
            isIncrease ? "text-green-600" : "text-red-600",
          )}
        >
          {isIncrease ? "+" : ""}
          {diff}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {formatDate(update.changedAt)}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function ProductDetail() {
  const { id } = useParams({ from: "/app-layout/inventory/$id" });
  const navigate = useNavigate();
  const productId = BigInt(id ?? "0");

  const { data: product, isLoading } = useProduct(productId);
  const { mutate: updateStock, isPending: updating } = useUpdateProductStock();
  const { mutate: deleteProduct, isPending: deleting } = useDeleteProduct();

  const [newQty, setNewQty] = useState("");
  const [reason, setReason] = useState("Adjustment");

  function handleStockUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!newQty || Number.isNaN(Number(newQty))) {
      toast.error("Enter a valid quantity");
      return;
    }
    updateStock(
      { id: productId, newQty: BigInt(Number(newQty)), reason },
      {
        onSuccess: () => {
          toast.success("Stock updated successfully");
          setNewQty("");
        },
        onError: () => toast.error("Failed to update stock"),
      },
    );
  }

  function handleDelete() {
    deleteProduct(productId, {
      onSuccess: () => {
        toast.success("Product deleted");
        navigate({ to: "/inventory" });
      },
      onError: () => toast.error("Failed to delete product"),
    });
  }

  if (isLoading) {
    return (
      <div className="p-4 space-y-3" data-ocid="product_detail.loading_state">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="flex flex-col items-center justify-center p-8 text-center pt-16"
        data-ocid="product_detail.error_state"
      >
        <Package size={40} className="text-muted-foreground opacity-40 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">
          Product not found
        </p>
        <Button
          size="sm"
          variant="outline"
          className="mt-3 rounded-xl"
          onClick={() => navigate({ to: "/inventory" })}
        >
          Back to Inventory
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-6" data-ocid="product_detail.page">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border/50 px-4 py-3 flex items-center gap-2 shadow-subtle">
        <button
          type="button"
          onClick={() => navigate({ to: "/inventory" })}
          className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0"
          data-ocid="product_detail.back_button"
          aria-label="Go back"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-foreground font-display truncate leading-tight">
            {product.name}
          </h1>
          <p className="text-[11px] text-muted-foreground">
            SKU: {product.sku}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 rounded-xl text-xs gap-1 shrink-0"
          data-ocid="product_detail.edit_button"
          onClick={() => toast.info("Edit coming soon")}
        >
          <Pencil size={12} />
          Edit
        </Button>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-4">
        {/* Hero card */}
        <Card className="rounded-2xl border-0 shadow-card bg-card overflow-hidden">
          <div className="flex gap-4 p-4">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package
                  size={28}
                  className="text-muted-foreground opacity-50"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <StockBadge qty={product.quantity} />
              <p className="text-2xl font-bold text-primary mt-1.5">
                ₹{formatINR(product.sellingPrice)}
              </p>
              <p className="text-xs text-muted-foreground">
                per {product.unit}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-sm font-semibold text-foreground">
                  {product.quantity.toString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.unit} in stock
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            <span className="text-[11px] bg-primary/8 text-primary px-2.5 py-1 rounded-full font-medium">
              {product.category}
            </span>
            {product.barcode && (
              <span className="text-[11px] bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                Barcode: {product.barcode}
              </span>
            )}
          </div>
        </Card>

        {/* Pricing mini-grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              label: "Purchase Price",
              value: `₹${formatINR(product.purchasePrice)}`,
            },
            {
              label: "Selling Price",
              value: `₹${formatINR(product.sellingPrice)}`,
              accent: true,
            },
            { label: "GST", value: `${product.taxPercent.toString()}%` },
            {
              label: "Margin",
              value: `₹${formatINR(product.sellingPrice - product.purchasePrice)}`,
            },
          ].map((item) => (
            <Card
              key={item.label}
              className="p-3 rounded-xl border-0 shadow-card bg-card"
            >
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p
                className={cn(
                  "text-sm font-bold mt-0.5",
                  item.accent ? "text-primary" : "text-foreground",
                )}
              >
                {item.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Full product details */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Product Details
          </p>
          <DetailRow label="Product Name" value={product.name} />
          <DetailRow label="Category" value={product.category} />
          <DetailRow label="SKU" value={product.sku} />
          {product.barcode && (
            <DetailRow label="Barcode" value={product.barcode} />
          )}
          <DetailRow label="Unit Type" value={product.unit} />
          <DetailRow
            label="Tax (GST)"
            value={`${product.taxPercent.toString()}%`}
          />
          {product.supplierName && (
            <DetailRow label="Supplier" value={product.supplierName} />
          )}
          <DetailRow label="Added On" value={formatDate(product.createdAt)} />
        </Card>

        {/* Stock update */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package size={14} className="text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Update Stock
            </p>
            <span className="text-xs text-muted-foreground ml-auto">
              Current:{" "}
              <span className="font-semibold text-foreground">
                {product.quantity.toString()} {product.unit}
              </span>
            </span>
          </div>

          <form onSubmit={handleStockUpdate} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                New Quantity
              </Label>
              <Input
                type="number"
                placeholder={`e.g. ${(Number(product.quantity) + 10).toString()}`}
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                className="rounded-xl bg-muted border-0 h-10"
                data-ocid="product_detail.new_qty_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                Reason
              </Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger
                  className="rounded-xl bg-muted border-0 h-10"
                  data-ocid="product_detail.reason_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STOCK_REASONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full h-10 rounded-xl font-medium"
              disabled={updating || !newQty}
              data-ocid="product_detail.update_stock_button"
            >
              {updating ? (
                <>
                  <Loader2 size={15} className="mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Stock"
              )}
            </Button>
          </form>
        </Card>

        {/* Stock history */}
        <Card className="p-4 rounded-2xl border-0 shadow-card bg-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
              <History size={14} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Stock History
            </p>
          </div>

          {PLACEHOLDER_HISTORY.length === 0 ? (
            <div
              className="text-center py-4"
              data-ocid="product_detail.history_empty_state"
            >
              <Clock
                size={24}
                className="text-muted-foreground opacity-40 mx-auto mb-1"
              />
              <p className="text-xs text-muted-foreground">
                No stock updates yet
              </p>
            </div>
          ) : (
            PLACEHOLDER_HISTORY.slice(0, 5).map((update, i) => (
              <StockHistoryItem
                key={update.updateId.toString()}
                update={update}
                data-ocid={`product_detail.history_item.${i + 1}`}
              />
            ))
          )}
        </Card>

        {/* Delete */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5 gap-2"
              data-ocid="product_detail.delete_button"
            >
              <Trash2 size={16} />
              Delete Product
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent data-ocid="product_detail.dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All stock history for{" "}
                <span className="font-medium text-foreground">
                  {product.name}
                </span>{" "}
                will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="rounded-xl"
                data-ocid="product_detail.cancel_button"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                data-ocid="product_detail.confirm_button"
              >
                {deleting ? (
                  <Loader2 size={15} className="animate-spin mr-1" />
                ) : null}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
