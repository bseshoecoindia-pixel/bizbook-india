import type { Supplier, SupplierInput } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateSupplier,
  useDeleteSupplier,
  useSuppliers,
  useUpdateSupplier,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Building2,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────
function formatINR(paise: bigint): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100,
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-primary/15 text-primary",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
];

const EMPTY_FORM: SupplierInput = {
  name: "",
  phone: "",
  email: undefined,
  address: undefined,
  gstNumber: undefined,
  paymentTerms: undefined,
  notes: undefined,
};

// ─── Supplier Form Drawer ────────────────────────────────────────────────
interface SupplierDrawerProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  initialData?: Supplier | null;
}

function SupplierDrawer({
  open,
  onClose,
  onSaved,
  initialData,
}: SupplierDrawerProps) {
  const isEdit = !!initialData;
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState<SupplierInput>(
    initialData
      ? {
          name: initialData.name,
          phone: initialData.phone,
          email: initialData.email,
          address: initialData.address,
          gstNumber: initialData.gstNumber,
          paymentTerms: initialData.paymentTerms,
          notes: initialData.notes,
        }
      : EMPTY_FORM,
  );

  const set = (k: keyof SupplierInput, v: string) =>
    setForm((f) => ({ ...f, [k]: v || undefined }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Supplier name is required");
      return;
    }
    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, input: form });
        toast.success("Supplier updated!");
      } else {
        await createMutation.mutateAsync(form);
        toast.success("Supplier added!");
      }
      onSaved();
      onClose();
    } catch {
      toast.error(
        isEdit ? "Failed to update supplier" : "Failed to add supplier",
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
        className="relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4 max-h-[90vh] overflow-y-auto"
        data-ocid={
          isEdit
            ? "suppliers.edit_supplier.dialog"
            : "suppliers.add_supplier.dialog"
        }
      >
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground">
            {isEdit ? "Edit Supplier" : "Add Supplier"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            aria-label="Close"
            data-ocid={
              isEdit
                ? "suppliers.edit_supplier.close_button"
                : "suppliers.add_supplier.close_button"
            }
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Name *
            </Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Sharma Distributors"
              className="h-11 rounded-xl"
              data-ocid="suppliers.form.name.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Phone *
            </Label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="h-11 rounded-xl"
              data-ocid="suppliers.form.phone.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Email
            </Label>
            <Input
              type="email"
              value={form.email ?? ""}
              onChange={(e) => set("email", e.target.value)}
              placeholder="supplier@example.com"
              className="h-11 rounded-xl"
              data-ocid="suppliers.form.email.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Address
            </Label>
            <Input
              value={form.address ?? ""}
              onChange={(e) => set("address", e.target.value)}
              placeholder="City, State"
              className="h-11 rounded-xl"
              data-ocid="suppliers.form.address.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              GST Number
            </Label>
            <Input
              value={form.gstNumber ?? ""}
              onChange={(e) => set("gstNumber", e.target.value)}
              placeholder="22AAAAA0000A1Z5"
              className="h-11 rounded-xl font-mono"
              data-ocid="suppliers.form.gst.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Payment Terms
            </Label>
            <Input
              value={form.paymentTerms ?? ""}
              onChange={(e) => set("paymentTerms", e.target.value)}
              placeholder="e.g. Net 30, Advance, COD"
              className="h-11 rounded-xl"
              data-ocid="suppliers.form.payment_terms.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">
              Notes
            </Label>
            <Input
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Any additional notes"
              className="h-11 rounded-xl"
              data-ocid="suppliers.form.notes.input"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="w-full h-11 rounded-xl mt-2"
            data-ocid={
              isEdit
                ? "suppliers.edit_supplier.submit_button"
                : "suppliers.add_supplier.submit_button"
            }
          >
            {isPending
              ? "Saving..."
              : isEdit
                ? "Update Supplier"
                : "Add Supplier"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Supplier Detail ─────────────────────────────────────────────────────
interface SupplierDetailProps {
  supplier: Supplier;
  index: number;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function SupplierDetail({
  supplier,
  index,
  onClose,
  onEdit,
  onDelete,
}: SupplierDetailProps) {
  const deleteMutation = useDeleteSupplier();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(supplier.id);
      toast.success("Supplier deleted");
      onDelete();
      onClose();
    } catch {
      toast.error("Failed to delete supplier");
    }
  };

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
        className="relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4 max-h-[90vh] overflow-y-auto"
        data-ocid="suppliers.supplier_detail.dialog"
      >
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm",
                AVATAR_COLORS[index % AVATAR_COLORS.length],
              )}
            >
              {getInitials(supplier.name)}
            </div>
            <div>
              <p className="font-display font-bold text-base text-foreground">
                {supplier.name}
              </p>
              {supplier.gstNumber && (
                <p className="text-xs text-muted-foreground font-mono">
                  {supplier.gstNumber}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            aria-label="Close"
            data-ocid="suppliers.supplier_detail.close_button"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Outstanding badge */}
        {supplier.pendingAmount > BigInt(0) && (
          <div className="mb-4 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
            <IndianRupee size={18} className="text-red-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700">
                ₹{formatINR(supplier.pendingAmount)} Payable
              </p>
              <p className="text-xs text-red-500">
                Payment pending to supplier
              </p>
            </div>
          </div>
        )}

        {/* Info rows */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3">
            <Phone size={14} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">Phone</p>
              <p className="text-sm font-medium text-foreground">
                {supplier.phone}
              </p>
            </div>
          </div>
          {supplier.email && (
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {supplier.email}
                </p>
              </div>
            </div>
          )}
          {supplier.address && (
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">
                  {supplier.address}
                </p>
              </div>
            </div>
          )}
          {supplier.paymentTerms && (
            <div className="flex items-center gap-3">
              <Building2 size={14} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">
                  Payment Terms
                </p>
                <p className="text-sm font-medium text-foreground">
                  {supplier.paymentTerms}
                </p>
              </div>
            </div>
          )}
          {supplier.notes && (
            <div className="px-3 py-2 rounded-xl bg-muted/50">
              <p className="text-[10px] text-muted-foreground mb-0.5">Notes</p>
              <p className="text-xs text-foreground">{supplier.notes}</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-muted/50 rounded-2xl px-4 py-3">
            <p className="text-xs text-muted-foreground">Total Purchases</p>
            <p className="font-display font-bold text-lg text-foreground mt-0.5">
              ₹{formatINR(supplier.totalPurchases)}
            </p>
          </div>
          <div
            className={cn(
              "rounded-2xl px-4 py-3",
              supplier.pendingAmount > BigInt(0)
                ? "bg-red-50"
                : "bg-emerald-50",
            )}
          >
            <p className="text-xs text-muted-foreground">Payable</p>
            <p
              className={cn(
                "font-display font-bold text-lg mt-0.5",
                supplier.pendingAmount > BigInt(0)
                  ? "text-red-600"
                  : "text-emerald-600",
              )}
            >
              {supplier.pendingAmount > BigInt(0)
                ? `₹${formatINR(supplier.pendingAmount)}`
                : "Nil"}
            </p>
          </div>
        </div>

        {/* Actions */}
        {confirmDelete ? (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 mb-3"
            data-ocid="suppliers.delete_confirm.dialog"
          >
            <p className="text-sm font-semibold text-red-700 mb-1">
              Delete this supplier?
            </p>
            <p className="text-xs text-red-500 mb-3">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-xl border-border"
                onClick={() => setConfirmDelete(false)}
                data-ocid="suppliers.delete_confirm.cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 rounded-xl"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                data-ocid="suppliers.delete_confirm.confirm_button"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <a
              href={`tel:${supplier.phone}`}
              className="flex-1 h-11 rounded-xl border border-border flex items-center justify-center gap-2 text-sm font-semibold text-foreground hover:bg-muted/40 transition-smooth"
              data-ocid="suppliers.supplier_detail.call_button"
            >
              <Phone size={14} />
              Call
            </a>
            <Button
              className="flex-1 h-11 rounded-xl"
              onClick={onEdit}
              data-ocid="suppliers.supplier_detail.edit_button"
            >
              Edit
            </Button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="w-11 h-11 rounded-xl border border-red-200 bg-red-50 flex items-center justify-center shrink-0 hover:bg-red-100 transition-smooth"
              aria-label="Delete supplier"
              data-ocid="suppliers.supplier_detail.delete_button"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Supplier | null>(null);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const { data: suppliers = [], isLoading, refetch } = useSuppliers();

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      (s.gstNumber ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const totalPayable = suppliers.reduce(
    (sum, s) => sum + s.pendingAmount,
    BigInt(0),
  );

  const selectedIndex = selected
    ? suppliers.findIndex((s) => s.id === selected.id)
    : 0;

  const handleEditFromDetail = () => {
    setEditSupplier(selected);
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-0 pb-4" data-ocid="suppliers.page">
      {/* Stats */}
      <div className="px-4 pt-3 pb-3 grid grid-cols-2 gap-2 border-b border-border/50 bg-card">
        <div className="rounded-2xl px-3 py-3 bg-primary/5 text-center">
          <p className="font-display font-bold text-2xl text-foreground">
            {suppliers.length}
          </p>
          <p className="text-xs text-muted-foreground">Total Suppliers</p>
        </div>
        <div className="rounded-2xl px-3 py-3 bg-amber-50 text-center">
          <p className="font-display font-bold text-2xl text-amber-600">
            ₹{formatINR(totalPayable)}
          </p>
          <p className="text-xs text-muted-foreground">Total Payable</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm px-4 pt-3 pb-2 border-b border-border/50">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search by name, phone or GST..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-muted border-0"
            data-ocid="suppliers.search_input"
          />
        </div>
      </div>

      {/* Count + Add button */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} supplier{filtered.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          className="h-8 rounded-xl text-xs gap-1"
          onClick={() => setAddOpen(true)}
          data-ocid="suppliers.add_supplier_button"
        >
          <Plus size={14} /> Add Supplier
        </Button>
      </div>

      {/* Supplier list */}
      <div className="px-4 space-y-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))
        ) : filtered.length === 0 ? (
          <Card
            className="p-8 text-center shadow-card rounded-2xl border-0 bg-card"
            data-ocid="suppliers.empty_state"
          >
            <Building2
              size={36}
              className="text-muted-foreground mx-auto mb-3 opacity-30"
            />
            <p className="text-sm font-semibold text-foreground">
              No suppliers yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Add your first supplier to get started
            </p>
            <Button
              size="sm"
              className="mt-4 rounded-xl"
              onClick={() => setAddOpen(true)}
              data-ocid="suppliers.empty_state.add_button"
            >
              <Plus size={14} className="mr-1" /> Add Supplier
            </Button>
          </Card>
        ) : (
          filtered.map((supplier, i) => (
            <Card
              key={supplier.id.toString()}
              className="shadow-card rounded-2xl border-0 bg-card overflow-hidden cursor-pointer hover:shadow-elevated transition-smooth active:scale-[0.99]"
              onClick={() => setSelected(supplier)}
              data-ocid={`suppliers.supplier_item.${i + 1}`}
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                    AVATAR_COLORS[i % AVATAR_COLORS.length],
                  )}
                >
                  {getInitials(supplier.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {supplier.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone size={10} className="text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {supplier.phone}
                    </p>
                  </div>
                  {supplier.gstNumber && (
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      GST: {supplier.gstNumber}
                    </p>
                  )}
                  {supplier.paymentTerms && (
                    <p className="text-[10px] text-primary font-medium mt-0.5">
                      {supplier.paymentTerms}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">Purchases</p>
                  <p className="text-sm font-bold text-foreground">
                    ₹{formatINR(supplier.totalPurchases)}
                  </p>
                  {supplier.pendingAmount > BigInt(0) && (
                    <p className="text-[10px] font-semibold text-red-500 mt-0.5">
                      ₹{formatINR(supplier.pendingAmount)} due
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add / Edit Drawer */}
      <SupplierDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSaved={() => refetch()}
      />
      <SupplierDrawer
        open={!!editSupplier}
        initialData={editSupplier}
        onClose={() => setEditSupplier(null)}
        onSaved={() => refetch()}
      />

      {/* Detail drawer */}
      {selected && (
        <SupplierDetail
          supplier={selected}
          index={selectedIndex}
          onClose={() => setSelected(null)}
          onEdit={handleEditFromDetail}
          onDelete={() => refetch()}
        />
      )}
    </div>
  );
}
