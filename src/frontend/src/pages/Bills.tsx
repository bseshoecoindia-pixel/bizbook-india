import { InvoiceStatus, PaymentStatus } from "@/backend";
import type { Invoice } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useInvoices } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  FileText,
  MailCheck,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

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

type FilterTab = "all" | "draft" | "sent" | "paid";

interface StatusConfig {
  label: string;
  className: string;
}

function invoiceStatusConfig(status: InvoiceStatus): StatusConfig {
  if (status === InvoiceStatus.Paid)
    return {
      label: "Paid",
      className: "bg-green-50 text-green-700 border-green-200",
    };
  if (status === InvoiceStatus.Sent)
    return {
      label: "Sent",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    };
  return {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  };
}

function paymentStatusConfig(status: PaymentStatus): StatusConfig {
  if (status === PaymentStatus.Paid)
    return {
      label: "Paid",
      className: "bg-green-50 text-green-700 border-green-200",
    };
  if (status === PaymentStatus.Partial_)
    return {
      label: "Partial",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    };
  return {
    label: "Unpaid",
    className: "bg-red-50 text-red-700 border-red-200",
  };
}

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
];

function InvoiceCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-3">
      <Skeleton className="h-11 w-11 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3 rounded-lg" />
        <Skeleton className="h-3 w-1/2 rounded-lg" />
      </div>
      <div className="space-y-2 text-right">
        <Skeleton className="h-4 w-16 rounded-lg" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export default function Bills() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<FilterTab>("all");
  const { data, isLoading } = useInvoices();

  const invoices: Invoice[] = data?.items ?? [];

  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase();
    const matchSearch =
      inv.customerName.toLowerCase().includes(q) ||
      inv.invoiceNumber.toLowerCase().includes(q);
    const matchTab =
      tab === "all" ||
      (tab === "paid" && inv.status === InvoiceStatus.Paid) ||
      (tab === "sent" && inv.status === InvoiceStatus.Sent) ||
      (tab === "draft" && inv.status === InvoiceStatus.Draft);
    return matchSearch && matchTab;
  });

  const tabCounts = {
    all: invoices.length,
    draft: invoices.filter((i) => i.status === InvoiceStatus.Draft).length,
    sent: invoices.filter((i) => i.status === InvoiceStatus.Sent).length,
    paid: invoices.filter((i) => i.status === InvoiceStatus.Paid).length,
  };

  return (
    <div className="flex flex-col gap-0 pb-24" data-ocid="bills.page">
      {/* Sticky search + filters */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 pt-3 pb-3 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            placeholder="Search by customer or invoice #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-muted border-0 text-sm"
            data-ocid="bills.search_input"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                "flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-smooth flex items-center justify-center gap-1",
                tab === value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
              data-ocid={`bills.${value}_tab`}
            >
              {label}
              {tabCounts[value] > 0 && (
                <span
                  className={cn(
                    "text-[10px] rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center font-bold",
                    tab === value ? "bg-primary-foreground/20" : "bg-border",
                  )}
                >
                  {tabCounts[value]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {isLoading ? (
            <span className="inline-flex gap-1 items-center">
              <TrendingUp size={12} /> Loading invoices...
            </span>
          ) : (
            `${filtered.length} invoice${filtered.length !== 1 ? "s" : ""}`
          )}
        </p>
        <Button
          size="sm"
          className="h-8 rounded-xl text-xs gap-1 bg-primary hover:bg-primary/90 shadow-sm"
          asChild
        >
          <Link to="/bills/new" data-ocid="bills.new_invoice_button">
            <Plus size={13} /> New Invoice
          </Link>
        </Button>
      </div>

      {/* Invoice list */}
      <div className="px-4 space-y-2.5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <InvoiceCardSkeleton key={i} />
          ))
        ) : filtered.length === 0 ? (
          <Card
            className="p-10 text-center shadow-card rounded-2xl border-0 bg-card mt-4"
            data-ocid="bills.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-primary opacity-60" />
            </div>
            <p className="font-display font-semibold text-foreground mb-1">
              {search ? "No invoices found" : "No invoices yet"}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {search
                ? "Try adjusting your search or filters"
                : "Create your first invoice to get started"}
            </p>
            {!search && (
              <Button size="sm" className="rounded-xl gap-1" asChild>
                <Link to="/bills/new">
                  <Plus size={13} /> Create Invoice
                </Link>
              </Button>
            )}
          </Card>
        ) : (
          filtered.map((inv, i) => {
            const invStatus = invoiceStatusConfig(inv.status);
            const payStatus = paymentStatusConfig(inv.paymentStatus);
            return (
              <Card
                key={inv.invoiceId.toString()}
                className="shadow-card rounded-2xl border-0 bg-card overflow-hidden"
                data-ocid={`bills.invoice_item.${i + 1}`}
              >
                <Link
                  to="/bills/$id"
                  params={{ id: inv.invoiceId.toString() }}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/20 active:bg-muted/40 transition-smooth"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                      inv.status === InvoiceStatus.Paid
                        ? "bg-green-50"
                        : inv.status === InvoiceStatus.Sent
                          ? "bg-blue-50"
                          : "bg-muted",
                    )}
                  >
                    <FileText
                      size={18}
                      className={cn(
                        inv.status === InvoiceStatus.Paid
                          ? "text-green-600"
                          : inv.status === InvoiceStatus.Sent
                            ? "text-blue-600"
                            : "text-muted-foreground",
                      )}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {inv.customerName}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0 h-4 shrink-0 border",
                          invStatus.className,
                        )}
                      >
                        {invStatus.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {inv.invoiceNumber} · {formatDate(inv.createdAt)}
                    </p>
                  </div>

                  {/* Amount + payment */}
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5">
                      {inv.emailSent && (
                        <MailCheck
                          size={12}
                          className="text-green-600 shrink-0"
                          aria-label="Email sent"
                        />
                      )}
                      <p className="text-sm font-bold text-foreground">
                        ₹{formatINR(inv.total)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0 h-4 border",
                        payStatus.className,
                      )}
                    >
                      {payStatus.label}
                    </Badge>
                  </div>
                  <ChevronRight
                    size={15}
                    className="text-muted-foreground ml-1 shrink-0"
                  />
                </Link>
              </Card>
            );
          })
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-20 right-4 z-40">
        <Link to="/bills/new" data-ocid="bills.fab_button">
          <button
            type="button"
            className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl shadow-elevated flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-smooth"
            aria-label="Create new invoice"
          >
            <Plus size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
}
