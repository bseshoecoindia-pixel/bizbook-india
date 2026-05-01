import type { Customer, CustomerInput } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateCustomer, useCustomers } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  FileText,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

// ─── Add Customer Drawer ──────────────────────────────────────────────────
interface AddCustomerDrawerProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

function AddCustomerDrawer({ open, onClose, onSaved }: AddCustomerDrawerProps) {
  const { mutateAsync, isPending } = useCreateCustomer();
  const [form, setForm] = useState<CustomerInput>({
    name: "",
    phone: "",
    email: undefined,
    address: undefined,
    gstNumber: undefined,
  });

  const set = (k: keyof CustomerInput, v: string) =>
    setForm((f) => ({ ...f, [k]: v || undefined }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Customer name is required");
      return;
    }
    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    try {
      await mutateAsync(form);
      toast.success("Customer added!");
      setForm({ name: "", phone: "" });
      onSaved();
      onClose();
    } catch {
      toast.error("Failed to add customer");
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
        data-ocid="customers.add_customer.dialog"
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground">
            Add Customer
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            aria-label="Close"
            data-ocid="customers.add_customer.close_button"
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
              placeholder="e.g. Rajesh Kumar"
              className="h-11 rounded-xl"
              data-ocid="customers.add_customer.name.input"
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
              data-ocid="customers.add_customer.phone.input"
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
              placeholder="customer@example.com"
              className="h-11 rounded-xl"
              data-ocid="customers.add_customer.email.input"
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
              data-ocid="customers.add_customer.address.input"
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
              data-ocid="customers.add_customer.gst.input"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="w-full h-11 rounded-xl mt-2"
            data-ocid="customers.add_customer.submit_button"
          >
            {isPending ? "Saving..." : "Add Customer"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Customer Detail Modal ─────────────────────────────────────────────────
interface CustomerDetailProps {
  customer: Customer;
  index: number;
  onClose: () => void;
}

function CustomerDetail({ customer, index, onClose }: CustomerDetailProps) {
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
        data-ocid="customers.customer_detail.dialog"
      >
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm",
                AVATAR_COLORS[index % AVATAR_COLORS.length],
              )}
            >
              {getInitials(customer.name)}
            </div>
            <div>
              <p className="font-display font-bold text-base text-foreground">
                {customer.name}
              </p>
              {customer.gstNumber && (
                <p className="text-xs text-muted-foreground font-mono">
                  {customer.gstNumber}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            aria-label="Close"
            data-ocid="customers.customer_detail.close_button"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Outstanding due badge */}
        {customer.pendingAmount > BigInt(0) && (
          <div className="mb-4 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
            <IndianRupee size={18} className="text-red-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700">
                ₹{formatINR(customer.pendingAmount)} Outstanding
              </p>
              <p className="text-xs text-red-500">Payment pending</p>
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
                {customer.phone}
              </p>
            </div>
          </div>
          {customer.email && (
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {customer.email}
                </p>
              </div>
            </div>
          )}
          {customer.address && (
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">
                  {customer.address}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-muted/50 rounded-2xl px-4 py-3">
            <p className="text-xs text-muted-foreground">Total Purchase</p>
            <p className="font-display font-bold text-lg text-foreground mt-0.5">
              ₹{formatINR(customer.totalPurchaseAmount)}
            </p>
          </div>
          <div
            className={cn(
              "rounded-2xl px-4 py-3",
              customer.pendingAmount > BigInt(0)
                ? "bg-red-50"
                : "bg-emerald-50",
            )}
          >
            <p className="text-xs text-muted-foreground">Pending</p>
            <p
              className={cn(
                "font-display font-bold text-lg mt-0.5",
                customer.pendingAmount > BigInt(0)
                  ? "text-red-600"
                  : "text-emerald-600",
              )}
            >
              {customer.pendingAmount > BigInt(0)
                ? `₹${formatINR(customer.pendingAmount)}`
                : "Nil"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`tel:${customer.phone}`}
            className="flex-1 h-11 rounded-xl border border-border flex items-center justify-center gap-2 text-sm font-semibold text-foreground hover:bg-muted/40 transition-smooth"
            data-ocid="customers.customer_detail.call_button"
          >
            <Phone size={14} />
            Call
          </a>
          <Button
            className="flex-1 h-11 rounded-xl"
            onClick={() => toast.info("Invoice feature coming soon!")}
            data-ocid="customers.customer_detail.new_invoice_button"
          >
            <FileText size={14} className="mr-1" />
            New Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Customers() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Customer | null>(null);
  const { data, isLoading, refetch } = useCustomers();

  const customers: Customer[] = data?.items ?? [];
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  const totalPending = customers.reduce(
    (sum, c) => sum + c.pendingAmount,
    BigInt(0),
  );
  const selectedIndex = selected
    ? customers.findIndex((c) => c.customerId === selected.customerId)
    : 0;

  return (
    <div className="flex flex-col gap-0 pb-4" data-ocid="customers.page">
      {/* Stats */}
      <div className="px-4 pt-3 pb-3 grid grid-cols-2 gap-2 border-b border-border/50 bg-card">
        <div className="rounded-2xl px-3 py-3 bg-primary/5 text-center">
          <p className="font-display font-bold text-2xl text-foreground">
            {customers.length}
          </p>
          <p className="text-xs text-muted-foreground">Total Customers</p>
        </div>
        <div className="rounded-2xl px-3 py-3 bg-amber-50 text-center">
          <p className="font-display font-bold text-2xl text-amber-600">
            ₹{formatINR(totalPending)}
          </p>
          <p className="text-xs text-muted-foreground">Total Pending</p>
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
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-muted border-0"
            data-ocid="customers.search_input"
          />
        </div>
      </div>

      {/* Count + Add button */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} customer{filtered.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          className="h-8 rounded-xl text-xs gap-1"
          onClick={() => setAddOpen(true)}
          data-ocid="customers.add_customer_button"
        >
          <Plus size={14} /> Add Customer
        </Button>
      </div>

      {/* Customer list */}
      <div className="px-4 space-y-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))
        ) : filtered.length === 0 ? (
          <Card
            className="p-8 text-center shadow-card rounded-2xl border-0 bg-card"
            data-ocid="customers.empty_state"
          >
            <Users
              size={36}
              className="text-muted-foreground mx-auto mb-3 opacity-30"
            />
            <p className="text-sm font-semibold text-foreground">
              No customers yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Add your first customer to get started
            </p>
            <Button
              size="sm"
              className="mt-4 rounded-xl"
              onClick={() => setAddOpen(true)}
              data-ocid="customers.empty_state.add_button"
            >
              <Plus size={14} className="mr-1" /> Add Customer
            </Button>
          </Card>
        ) : (
          filtered.map((customer, i) => (
            <Card
              key={customer.customerId.toString()}
              className="shadow-card rounded-2xl border-0 bg-card overflow-hidden cursor-pointer hover:shadow-elevated transition-smooth active:scale-[0.99]"
              onClick={() => setSelected(customer)}
              data-ocid={`customers.customer_item.${i + 1}`}
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                    AVATAR_COLORS[i % AVATAR_COLORS.length],
                  )}
                >
                  {getInitials(customer.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {customer.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone size={10} className="text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {customer.phone}
                    </p>
                  </div>
                  {customer.address && (
                    <p className="text-xs text-muted-foreground truncate">
                      {customer.address}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-sm font-bold text-foreground">
                    ₹{formatINR(customer.totalPurchaseAmount)}
                  </p>
                  {customer.pendingAmount > BigInt(0) && (
                    <p className="text-[10px] font-semibold text-red-500 mt-0.5">
                      ₹{formatINR(customer.pendingAmount)} due
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modals */}
      <AddCustomerDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSaved={() => refetch()}
      />
      {selected && (
        <CustomerDetail
          customer={selected}
          index={selectedIndex}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
