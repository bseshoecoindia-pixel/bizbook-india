import type { Purchase, PurchaseInput } from "@/backend";
import { PurchaseStatus } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreatePurchase,
  useDeletePurchase,
  usePurchases,
  useUpdatePurchase,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Edit2,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────

function formatINR(paise: bigint): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100,
  );
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

const STATUS_META: Record<
  PurchaseStatus,
  { label: string; color: string; dot: string }
> = {
  [PurchaseStatus.ordered]: {
    label: "Ordered",
    color: "bg-orange-50 text-orange-700 border border-orange-200",
    dot: "bg-orange-500",
  },
  [PurchaseStatus.received]: {
    label: "Received",
    color: "bg-green-50 text-green-700 border border-green-200",
    dot: "bg-green-500",
  },
  [PurchaseStatus.cancelled]: {
    label: "Cancelled",
    color: "bg-red-50 text-red-700 border border-red-200",
    dot: "bg-red-500",
  },
};

type FilterTab = "all" | PurchaseStatus;

// ─── Drawer ───────────────────────────────────────────────────────────────

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  initial?: Purchase | null;
}

function PurchaseDrawer({ open, onClose, initial }: DrawerProps) {
  const isEdit = !!initial;

  const [supplierName, setSupplierName] = useState(initial?.supplierName ?? "");
  const [date, setDate] = useState(() => {
    if (initial?.date) {
      return new Date(Number(initial.date) / 1_000_000)
        .toISOString()
        .split("T")[0];
    }
    return todayISO();
  });
  const [amount, setAmount] = useState(
    initial ? String(Number(initial.amount) / 100) : "",
  );
  const [status, setStatus] = useState<PurchaseStatus>(
    initial?.status ?? PurchaseStatus.ordered,
  );
  const [description, setDescription] = useState(initial?.description ?? "");

  const createPurchase = useCreatePurchase();
  const updatePurchase = useUpdatePurchase();

  function reset() {
    setSupplierName(initial?.supplierName ?? "");
    setDate(
      initial?.date
        ? new Date(Number(initial.date) / 1_000_000).toISOString().split("T")[0]
        : todayISO(),
    );
    setAmount(initial ? String(Number(initial.amount) / 100) : "");
    setStatus(initial?.status ?? PurchaseStatus.ordered);
    setDescription(initial?.description ?? "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supplierName.trim()) {
      toast.error("Supplier name is required");
      return;
    }
    const amountPaise = Math.round(Number.parseFloat(amount) * 100);
    if (!amount || Number.isNaN(amountPaise) || amountPaise <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    const dateMs = new Date(date).getTime();
    const dateNano = BigInt(dateMs) * BigInt(1_000_000);

    const input: PurchaseInput = {
      supplierName: supplierName.trim(),
      date: dateNano,
      amount: BigInt(amountPaise),
      status,
      description: description.trim() || undefined,
    };

    try {
      if (isEdit && initial) {
        await updatePurchase.mutateAsync({ id: initial.id, input });
        toast.success("Purchase updated");
      } else {
        await createPurchase.mutateAsync(input);
        toast.success("Purchase added");
      }
      onClose();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const loading = createPurchase.isPending || updatePurchase.isPending;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close drawer"
      />
      {/* Drawer */}
      <div
        className="relative w-full max-w-lg bg-card rounded-t-2xl shadow-2xl"
        data-ocid="purchase.drawer"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border">
          <h2 className="text-lg font-semibold font-display text-foreground">
            {isEdit ? "Edit Purchase" : "Add Purchase"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="purchase.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {/* Supplier Name */}
          <div className="space-y-1.5">
            <Label htmlFor="supplierName">
              Supplier Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="supplierName"
              placeholder="e.g. Sharma Enterprises"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              data-ocid="purchase.input"
            />
          </div>

          {/* Date & Amount row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="date">
                Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="amount">
                Amount (₹) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label>Status</Label>
            <div className="flex gap-2 flex-wrap">
              {Object.values(PurchaseStatus).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    status === s
                      ? STATUS_META[s].color
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                  data-ocid="purchase.select"
                >
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Add notes about this purchase..."
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              data-ocid="purchase.textarea"
            />
          </div>

          <div className="flex gap-3 pt-2 pb-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                reset();
                onClose();
              }}
              data-ocid="purchase.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
              data-ocid="purchase.submit_button"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Purchase"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Dialog ─────────────────────────────────────────────────

interface DeleteDialogProps {
  open: boolean;
  supplierName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

function DeleteDialog({
  open,
  supplierName,
  onConfirm,
  onCancel,
  loading,
}: DeleteDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onCancel}
        role="button"
        tabIndex={-1}
        aria-label="Close dialog"
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
      />
      <div
        className="relative bg-card rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        data-ocid="purchase.dialog"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Delete Purchase?</h3>
            <p className="text-sm text-muted-foreground">{supplierName}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            data-ocid="purchase.cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={loading}
            data-ocid="purchase.confirm_button"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Purchase Card ─────────────────────────────────────────────────────────

interface PurchaseCardProps {
  purchase: Purchase;
  index: number;
  onEdit: (p: Purchase) => void;
  onDelete: (p: Purchase) => void;
}

function PurchaseCard({
  purchase,
  index,
  onEdit,
  onDelete,
}: PurchaseCardProps) {
  const meta = STATUS_META[purchase.status];
  return (
    <Card
      className="p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer rounded-2xl border-border"
      onClick={() => onEdit(purchase)}
      data-ocid={`purchase.item.${index}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">
            {purchase.supplierName}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {formatDate(purchase.date)}
          </p>
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 flex-shrink-0",
            meta.color,
          )}
        >
          <span
            className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", meta.dot)}
          />
          {meta.label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-foreground font-display">
          ₹{formatINR(purchase.amount)}
        </p>
        <div
          className="flex gap-1"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={() => {}}
        >
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            onClick={() => onEdit(purchase)}
            aria-label="Edit purchase"
            data-ocid={`purchase.edit_button.${index}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={() => onDelete(purchase)}
            aria-label="Delete purchase"
            data-ocid={`purchase.delete_button.${index}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {purchase.description && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {purchase.description}
        </p>
      )}
    </Card>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function PurchasesPage() {
  const { data: purchases, isLoading } = usePurchases();
  const deletePurchase = useDeletePurchase();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Purchase | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Purchase | null>(null);

  const filtered = useMemo(() => {
    if (!purchases) return [];
    let list = purchases;
    if (filter !== "all") list = list.filter((p) => p.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.supplierName.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [purchases, filter, search]);

  const receivedTotal = useMemo(
    () =>
      (purchases ?? []).reduce(
        (acc, p) =>
          p.status === PurchaseStatus.received ? acc + p.amount : acc,
        BigInt(0),
      ),
    [purchases],
  );

  function openAdd() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(p: Purchase) {
    setEditing(p);
    setDrawerOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePurchase.mutateAsync(deleteTarget.id);
      toast.success("Purchase deleted");
    } catch {
      toast.error("Failed to delete purchase");
    } finally {
      setDeleteTarget(null);
    }
  }

  const FILTERS: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: PurchaseStatus.ordered, label: "Ordered" },
    { key: PurchaseStatus.received, label: "Received" },
    { key: PurchaseStatus.cancelled, label: "Cancelled" },
  ];

  return (
    <div
      className="flex flex-col min-h-full bg-background"
      data-ocid="purchases.page"
    >
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-5 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold font-display text-foreground">
              Purchase Orders
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Received:{" "}
              <span className="font-semibold text-foreground">
                ₹{formatINR(receivedTotal)}
              </span>
            </p>
          </div>
          <Button
            size="sm"
            className="gap-1.5 rounded-xl"
            onClick={openAdd}
            data-ocid="purchase.add_button"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9 rounded-xl bg-muted/60 border-transparent focus:border-border"
            placeholder="Search supplier or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="purchase.search_input"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
                filter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
              data-ocid="purchase.filter.tab"
            >
              {f.label}
              {f.key !== "all" && purchases && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({purchases.filter((p) => p.status === f.key).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-3">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-2xl" />
            ))}
          </>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="purchase.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-base font-semibold text-foreground">
              {search || filter !== "all"
                ? "No purchases match your filter"
                : "No purchase orders yet"}
            </p>
            <p className="text-sm text-muted-foreground mt-1 mb-5">
              {search || filter !== "all"
                ? "Try adjusting your search or filter"
                : "Add your first purchase to get started"}
            </p>
            {!search && filter === "all" && (
              <Button
                variant="outline"
                className="gap-2 rounded-xl"
                onClick={openAdd}
                data-ocid="purchase.primary_button"
              >
                <Plus className="w-4 h-4" />
                Add Purchase
              </Button>
            )}
          </div>
        ) : (
          filtered.map((p, idx) => (
            <PurchaseCard
              key={p.id.toString()}
              purchase={p}
              index={idx + 1}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        type="button"
        onClick={openAdd}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-transform z-30"
        aria-label="Add purchase"
        data-ocid="purchase.open_modal_button"
      >
        <Package className="w-6 h-6" />
      </button>

      <PurchaseDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditing(null);
        }}
        initial={editing}
      />
      <DeleteDialog
        open={!!deleteTarget}
        supplierName={deleteTarget?.supplierName ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deletePurchase.isPending}
      />
    </div>
  );
}
