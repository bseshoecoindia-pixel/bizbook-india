import type { Expense, ExpenseInput } from "@/backend";
import { ExpenseCategory } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateExpense,
  useDeleteExpense,
  useExpenses,
  useTotalExpenses,
  useUpdateExpense,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { ExternalBlob } from "@caffeineai/object-storage";
import {
  Camera,
  Edit2,
  ImageIcon,
  Loader2,
  Plus,
  Receipt,
  Trash2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
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
    month: "short",
    year: "numeric",
  });
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

const CATEGORY_META: Record<
  ExpenseCategory,
  { label: string; emoji: string; color: string }
> = {
  [ExpenseCategory.office]: {
    label: "Office",
    emoji: "🏢",
    color: "bg-blue-50 text-blue-700",
  },
  [ExpenseCategory.utilities]: {
    label: "Utilities",
    emoji: "⚡",
    color: "bg-yellow-50 text-yellow-700",
  },
  [ExpenseCategory.transport]: {
    label: "Transport",
    emoji: "🚗",
    color: "bg-sky-50 text-sky-700",
  },
  [ExpenseCategory.rawMaterials]: {
    label: "Raw Materials",
    emoji: "📦",
    color: "bg-orange-50 text-orange-700",
  },
  [ExpenseCategory.marketing]: {
    label: "Marketing",
    emoji: "📢",
    color: "bg-pink-50 text-pink-700",
  },
  [ExpenseCategory.salaries]: {
    label: "Salaries",
    emoji: "👥",
    color: "bg-violet-50 text-violet-700",
  },
  [ExpenseCategory.rent]: {
    label: "Rent",
    emoji: "🏠",
    color: "bg-emerald-50 text-emerald-700",
  },
  [ExpenseCategory.other]: {
    label: "Other",
    emoji: "📋",
    color: "bg-muted text-muted-foreground",
  },
};

const ALL_FILTER = "all";
type FilterValue = typeof ALL_FILTER | ExpenseCategory;

const FILTER_CHIPS: { label: string; value: FilterValue }[] = [
  { label: "All", value: ALL_FILTER },
  ...Object.values(ExpenseCategory).map((cat) => ({
    label: CATEGORY_META[cat].label,
    value: cat,
  })),
];

// ─── Receipt Lightbox ─────────────────────────────────────────────────────
function ReceiptLightbox({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
      data-ocid="expenses.receipt_lightbox.dialog"
    >
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close"
        tabIndex={-1}
      />
      <div className="relative z-10 max-w-[360px] w-full">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card shadow-elevated flex items-center justify-center z-20"
          aria-label="Close receipt"
          data-ocid="expenses.receipt_lightbox.close_button"
        >
          <X size={15} className="text-foreground" />
        </button>
        <img
          src={url}
          alt="Receipt"
          className="w-full rounded-2xl shadow-elevated object-contain max-h-[70vh]"
        />
      </div>
    </div>
  );
}

// ─── Receipt Upload Field ──────────────────────────────────────────────────
interface ReceiptUploadProps {
  receiptUrl: string | null;
  uploadProgress: number;
  uploading: boolean;
  onFileChange: (file: File) => void;
  onRemove: () => void;
}

function ReceiptUpload({
  receiptUrl,
  uploadProgress,
  uploading,
  onFileChange,
  onRemove,
}: ReceiptUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileChange(file);
    // reset input so same file can be re-selected
    e.target.value = "";
  }

  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold text-muted-foreground">
        Receipt Photo (optional)
      </Label>

      {receiptUrl ? (
        // Show thumbnail + remove button
        <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/50 border border-border/50">
          <img
            src={receiptUrl}
            alt="Receipt thumbnail"
            className="w-14 h-14 rounded-lg object-cover border border-border/40 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              Receipt attached
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Tap × to remove
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0"
            aria-label="Remove receipt"
            data-ocid="expenses.expense_drawer.receipt_remove_button"
          >
            <X size={14} className="text-red-500" />
          </button>
        </div>
      ) : uploading ? (
        // Upload progress
        <div className="p-3 rounded-xl bg-muted/50 border border-border/50 space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 size={14} className="text-primary animate-spin shrink-0" />
            <p className="text-xs text-muted-foreground">
              Uploading… {uploadProgress}%
            </p>
          </div>
          <div className="bg-border rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
              data-ocid="expenses.expense_drawer.receipt_upload.loading_state"
            />
          </div>
        </div>
      ) : (
        // Upload button
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2.5 w-full p-3 rounded-xl bg-muted/50 border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth"
          data-ocid="expenses.expense_drawer.receipt_upload_button"
        >
          <Camera size={18} className="text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground">
            Tap to attach receipt photo
          </span>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

// ─── Add / Edit Expense Drawer ─────────────────────────────────────────────
interface ExpenseDrawerProps {
  open: boolean;
  expense?: Expense;
  onClose: () => void;
}

function ExpenseDrawer({ open, expense, onClose }: ExpenseDrawerProps) {
  const isEdit = !!expense;
  const { mutateAsync: create, isPending: creating } = useCreateExpense();
  const { mutateAsync: update, isPending: updating } = useUpdateExpense();
  const isPending = creating || updating;

  const [form, setForm] = useState<{
    amount: string;
    category: ExpenseCategory;
    date: string;
    description: string;
    notes: string;
  }>({
    amount: expense ? String(Number(expense.amount) / 100) : "",
    category: expense?.category ?? ExpenseCategory.other,
    date: expense
      ? new Date(Number(expense.date) / 1_000_000).toISOString().split("T")[0]
      : todayISO(),
    description: expense?.description ?? "",
    notes: expense?.notes ?? "",
  });

  // Receipt state
  const [receiptUrl, setReceiptUrl] = useState<string | null>(
    expense?.receiptUrl ?? null,
  );
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleReceiptFile(file: File) {
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(Math.round(pct)),
      );
      const url = blob.getDirectURL();
      setReceiptUrl(url);
    } catch {
      toast.error("Receipt upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  const handleSave = async () => {
    const amountNum = Number.parseFloat(form.amount);
    if (!form.amount || Number.isNaN(amountNum) || amountNum <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (uploading) {
      toast.error("Please wait for the receipt upload to finish");
      return;
    }
    const input: ExpenseInput = {
      amount: BigInt(Math.round(amountNum * 100)),
      category: form.category,
      date: BigInt(new Date(form.date).getTime()) * BigInt(1_000_000),
      description: form.description.trim(),
      notes: form.notes.trim() || undefined,
      receiptUrl: receiptUrl ?? undefined,
    };
    try {
      if (isEdit && expense) {
        await update({ id: expense.id, input });
        toast.success("Expense updated!");
      } else {
        await create(input);
        toast.success("Expense added!");
      }
      onClose();
    } catch {
      toast.error(
        isEdit ? "Failed to update expense" : "Failed to add expense",
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-foreground/30 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close"
        tabIndex={-1}
      />
      <div
        className="relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4"
        data-ocid="expenses.expense_drawer.dialog"
      >
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground">
            {isEdit ? "Edit Expense" : "Add Expense"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            aria-label="Close"
            data-ocid="expenses.expense_drawer.close_button"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Amount */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Amount (₹) *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                ₹
              </span>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                placeholder="0.00"
                className="pl-7 h-11 rounded-xl"
                data-ocid="expenses.expense_drawer.amount.input"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Category *
            </Label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              data-ocid="expenses.expense_drawer.category.select"
            >
              {Object.values(ExpenseCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_META[cat].emoji} {CATEGORY_META[cat].label}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Date *
            </Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="h-11 rounded-xl"
              data-ocid="expenses.expense_drawer.date.input"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Description *
            </Label>
            <Input
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="e.g. Electricity bill for May"
              className="h-11 rounded-xl"
              data-ocid="expenses.expense_drawer.description.input"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Notes (optional)
            </Label>
            <Textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Additional details..."
              className="rounded-xl resize-none"
              rows={2}
              data-ocid="expenses.expense_drawer.notes.textarea"
            />
          </div>

          {/* Receipt photo upload */}
          <ReceiptUpload
            receiptUrl={receiptUrl}
            uploadProgress={uploadProgress}
            uploading={uploading}
            onFileChange={handleReceiptFile}
            onRemove={() => setReceiptUrl(null)}
          />

          <Button
            type="button"
            onClick={handleSave}
            disabled={isPending || uploading}
            className="w-full h-11 rounded-xl mt-2"
            data-ocid="expenses.expense_drawer.submit_button"
          >
            {isPending ? "Saving..." : isEdit ? "Save Changes" : "Add Expense"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Expense Card ──────────────────────────────────────────────────────────
interface ExpenseCardProps {
  expense: Expense;
  index: number;
  onEdit: (e: Expense) => void;
  onDelete: (id: bigint) => void;
  onViewReceipt: (url: string) => void;
}

function ExpenseCard({
  expense,
  index,
  onEdit,
  onDelete,
  onViewReceipt,
}: ExpenseCardProps) {
  const meta = CATEGORY_META[expense.category];
  return (
    <Card
      className="shadow-card rounded-2xl border-0 bg-card overflow-hidden"
      data-ocid={`expenses.expense_item.${index}`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0",
            meta.color,
          )}
        >
          {meta.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {expense.description}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {meta.label} · {formatDate(expense.date)}
          </p>
          {expense.notes && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {expense.notes}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <p className="text-sm font-bold text-foreground">
            ₹{formatINR(expense.amount)}
          </p>
          <div className="flex items-center gap-1">
            {expense.receiptUrl && (
              <button
                type="button"
                onClick={() =>
                  expense.receiptUrl && onViewReceipt(expense.receiptUrl)
                }
                className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-smooth"
                aria-label="View receipt"
                data-ocid={`expenses.receipt_view_button.${index}`}
              >
                <ImageIcon size={12} className="text-primary" />
              </button>
            )}
            <button
              type="button"
              onClick={() => onEdit(expense)}
              className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-smooth"
              aria-label="Edit expense"
              data-ocid={`expenses.edit_button.${index}`}
            >
              <Edit2 size={12} className="text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(expense.id)}
              className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-red-50 transition-smooth"
              aria-label="Delete expense"
              data-ocid={`expenses.delete_button.${index}`}
            >
              <Trash2 size={12} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Expenses() {
  const [filter, setFilter] = useState<FilterValue>(ALL_FILTER);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | undefined>();
  const [confirmDeleteId, setConfirmDeleteId] = useState<bigint | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const { data: expenses = [], isLoading } = useExpenses();
  const { data: totalPaise = BigInt(0) } = useTotalExpenses();
  const { mutateAsync: deleteExpense } = useDeleteExpense();

  const filtered =
    filter === ALL_FILTER
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const handleDelete = (id: bigint) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (confirmDeleteId === null) return;
    try {
      await deleteExpense(confirmDeleteId);
      toast.success("Expense deleted");
    } catch {
      toast.error("Failed to delete expense");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditExpense(expense);
    setDrawerOpen(true);
  };

  const handleAdd = () => {
    setEditExpense(undefined);
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
    setEditExpense(undefined);
  };

  // Summary stats
  const monthTotal = expenses
    .filter((e) => {
      const d = new Date(Number(e.date) / 1_000_000);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + e.amount, BigInt(0));

  return (
    <div className="flex flex-col gap-0 pb-24" data-ocid="expenses.page">
      {/* Header stats */}
      <div className="px-4 pt-3 pb-3 grid grid-cols-2 gap-2 border-b border-border/50 bg-card">
        <div className="rounded-2xl px-3 py-3 bg-primary/5 text-center">
          <p className="font-display font-bold text-2xl text-foreground">
            ₹{formatINR(monthTotal)}
          </p>
          <p className="text-xs text-muted-foreground">This Month</p>
        </div>
        <div className="rounded-2xl px-3 py-3 bg-red-50 text-center">
          <p className="font-display font-bold text-2xl text-red-600">
            ₹{formatINR(totalPaise)}
          </p>
          <p className="text-xs text-muted-foreground">Total Expenses</p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilter(chip.value)}
              className={cn(
                "flex-none px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth whitespace-nowrap",
                filter === chip.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
              data-ocid={`expenses.filter.${chip.value}`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count + Add button */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          className="h-8 rounded-xl text-xs gap-1"
          onClick={handleAdd}
          data-ocid="expenses.add_expense_button"
        >
          <Plus size={14} /> Add Expense
        </Button>
      </div>

      {/* Expense list */}
      <div className="px-4 space-y-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))
        ) : filtered.length === 0 ? (
          <Card
            className="p-8 text-center shadow-card rounded-2xl border-0 bg-card"
            data-ocid="expenses.empty_state"
          >
            <Receipt
              size={36}
              className="text-muted-foreground mx-auto mb-3 opacity-30"
            />
            <p className="text-sm font-semibold text-foreground">
              {filter === ALL_FILTER
                ? "No expenses recorded yet"
                : `No ${CATEGORY_META[filter as ExpenseCategory]?.label ?? ""} expenses`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Tap '+ Add Expense' to record one
            </p>
            <Button
              size="sm"
              className="mt-4 rounded-xl"
              onClick={handleAdd}
              data-ocid="expenses.empty_state.add_button"
            >
              <Plus size={14} className="mr-1" /> Add Expense
            </Button>
          </Card>
        ) : (
          filtered.map((expense, i) => (
            <ExpenseCard
              key={expense.id.toString()}
              expense={expense}
              index={i + 1}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewReceipt={setLightboxUrl}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        type="button"
        onClick={handleAdd}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-smooth z-40"
        aria-label="Add expense"
        data-ocid="expenses.fab_add_button"
      >
        <Plus size={24} />
      </button>

      {/* Delete confirmation dialog */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-6">
          <div
            className="bg-card rounded-2xl shadow-elevated w-full max-w-[320px] p-5"
            data-ocid="expenses.delete_confirm.dialog"
          >
            <p className="font-display font-bold text-base text-foreground mb-1">
              Delete Expense?
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setConfirmDeleteId(null)}
                data-ocid="expenses.delete_confirm.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="flex-1 rounded-xl"
                onClick={confirmDelete}
                data-ocid="expenses.delete_confirm.confirm_button"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt lightbox */}
      {lightboxUrl && (
        <ReceiptLightbox
          url={lightboxUrl}
          onClose={() => setLightboxUrl(null)}
        />
      )}

      {/* Drawer */}
      <ExpenseDrawer
        open={drawerOpen}
        expense={editExpense}
        onClose={handleClose}
      />
    </div>
  );
}
