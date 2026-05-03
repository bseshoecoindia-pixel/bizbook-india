import type { Expense, Invoice, Product } from "@/backend";
import { PaymentStatus } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useExpenses, useInvoices, useProducts } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Download,
  Minus,
  Printer,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────

const inr = (paise: number) =>
  `\u20B9${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function nsToMs(ns: bigint): number {
  return Number(ns / BigInt(1_000_000));
}

type DateRange =
  | "this_month"
  | "last_month"
  | "last_3"
  | "this_year"
  | "custom";

interface DateBounds {
  start: Date;
  end: Date;
}

function getRangeBounds(
  range: DateRange,
  custom?: { from: string; to: string },
): DateBounds {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  if (range === "this_month")
    return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
  if (range === "last_month")
    return { start: new Date(y, m - 1, 1), end: new Date(y, m, 0, 23, 59, 59) };
  if (range === "last_3")
    return {
      start: new Date(y, m - 2, 1),
      end: new Date(y, m + 1, 0, 23, 59, 59),
    };
  if (range === "this_year")
    return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59) };
  return {
    start: custom?.from ? new Date(custom.from) : new Date(y, m, 1),
    end: custom?.to
      ? new Date(`${custom.to}T23:59:59`)
      : new Date(y, m + 1, 0, 23, 59, 59),
  };
}

const RANGE_LABELS: Record<DateRange, string> = {
  this_month: "This Month",
  last_month: "Last Month",
  last_3: "Last 3 Months",
  this_year: "This Year",
  custom: "Custom",
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// ─── Date range picker ────────────────────────────────────────────────────

interface RangeSelectorProps {
  value: DateRange;
  onChange: (r: DateRange) => void;
  customFrom: string;
  customTo: string;
  onCustomFrom: (v: string) => void;
  onCustomTo: (v: string) => void;
}

function RangeSelector({
  value,
  onChange,
  customFrom,
  customTo,
  onCustomFrom,
  onCustomTo,
}: RangeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(RANGE_LABELS) as DateRange[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onChange(r)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-smooth",
              value === r
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border",
            )}
            data-ocid={`reports.range_filter.${r}`}
          >
            {RANGE_LABELS[r]}
          </button>
        ))}
      </div>
      {value === "custom" && (
        <div className="flex gap-2">
          <input
            type="date"
            value={customFrom}
            onChange={(e) => onCustomFrom(e.target.value)}
            className="flex-1 h-8 text-xs rounded-lg border border-input bg-background px-2 text-foreground"
            data-ocid="reports.custom_from.input"
          />
          <input
            type="date"
            value={customTo}
            onChange={(e) => onCustomTo(e.target.value)}
            className="flex-1 h-8 text-xs rounded-lg border border-input bg-background px-2 text-foreground"
            data-ocid="reports.custom_to.input"
          />
        </div>
      )}
    </div>
  );
}

// ─── Export helpers ───────────────────────────────────────────────────────

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── P&L Tab ─────────────────────────────────────────────────────────────

function PLTab() {
  const [range, setRange] = useState<DateRange>("this_month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const {
    data: invData,
    isLoading: loadingInv,
    isFetching: fetchingInv,
    refetch: refetchInv,
  } = useInvoices(BigInt(1), BigInt(200));
  const {
    data: expenses,
    isLoading: loadingExp,
    isFetching: fetchingExp,
    refetch: refetchExp,
  } = useExpenses();

  // Force fresh fetch every time this tab mounts
  useEffect(() => {
    refetchInv();
    refetchExp();
  }, [refetchInv, refetchExp]);

  const bounds = getRangeBounds(range, { from: customFrom, to: customTo });

  // No useMemo — calculate fresh on every render
  const filteredInvoices = (invData?.items ?? []).filter((inv) => {
    if (inv.paymentStatus !== PaymentStatus.Paid) return false;
    const d = new Date(nsToMs(inv.createdAt));
    return d >= bounds.start && d <= bounds.end;
  });

  const filteredExpenses = (expenses ?? []).filter((exp) => {
    const d = new Date(nsToMs(exp.date));
    return d >= bounds.start && d <= bounds.end;
  });

  const totalRevenue = filteredInvoices.reduce(
    (s, inv) => s + Number(inv.total),
    0,
  );
  const totalExpenses = filteredExpenses.reduce(
    (s, exp) => s + Number(exp.amount),
    0,
  );
  const netPL = totalRevenue - totalExpenses;

  // Monthly breakdown — calculated inline, no useMemo
  const monthlyMap = (() => {
    const map = new Map<string, { revenue: number; expenses: number }>();
    for (const inv of filteredInvoices) {
      const d = new Date(nsToMs(inv.createdAt));
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const entry = map.get(key) ?? { revenue: 0, expenses: 0 };
      entry.revenue += Number(inv.total);
      map.set(key, entry);
    }
    for (const exp of filteredExpenses) {
      const d = new Date(nsToMs(exp.date));
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const entry = map.get(key) ?? { revenue: 0, expenses: 0 };
      entry.expenses += Number(exp.amount);
      map.set(key, entry);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, val]) => {
        const [yr, mo] = key.split("-");
        return {
          label: `${MONTH_NAMES[Number(mo) - 1]} ${yr}`,
          ...val,
          net: val.revenue - val.expenses,
        };
      });
  })();

  function exportCSV() {
    const rows = [
      ["Month", "Revenue (INR)", "Expenses (INR)", "Net P&L (INR)"],
      ...monthlyMap.map((r) => [
        r.label,
        (r.revenue / 100).toFixed(2),
        (r.expenses / 100).toFixed(2),
        (r.net / 100).toFixed(2),
      ]),
      [
        "TOTAL",
        (totalRevenue / 100).toFixed(2),
        (totalExpenses / 100).toFixed(2),
        (netPL / 100).toFixed(2),
      ],
    ];
    downloadCsv("pl_report.csv", rows);
  }

  const loading = loadingInv || loadingExp || fetchingInv || fetchingExp;

  return (
    <div className="space-y-4" data-ocid="reports.pl.section">
      <RangeSelector
        value={range}
        onChange={setRange}
        customFrom={customFrom}
        customTo={customTo}
        onCustomFrom={setCustomFrom}
        onCustomTo={setCustomTo}
      />

      {loading ? (
        <div className="space-y-3" data-ocid="reports.pl.loading_state">
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-xs text-muted-foreground">
              Loading fresh data…
            </span>
          </div>
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-2">
            <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
              <p className="text-[10px] text-muted-foreground font-medium">
                Revenue
              </p>
              <p className="font-display font-bold text-sm text-primary mt-1 leading-tight">
                {inr(totalRevenue)}
              </p>
            </Card>
            <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
              <p className="text-[10px] text-muted-foreground font-medium">
                Expenses
              </p>
              <p className="font-display font-bold text-sm text-destructive mt-1 leading-tight">
                {inr(totalExpenses)}
              </p>
            </Card>
            <Card
              className={cn(
                "p-3 shadow-card rounded-2xl border-0",
                netPL >= 0 ? "bg-emerald-50" : "bg-red-50",
              )}
            >
              <p className="text-[10px] text-muted-foreground font-medium">
                Net P&amp;L
              </p>
              <p
                className={cn(
                  "font-display font-bold text-sm mt-1 leading-tight flex items-center gap-0.5",
                  netPL >= 0 ? "text-emerald-600" : "text-red-500",
                )}
              >
                {netPL >= 0 ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                {inr(Math.abs(netPL))}
              </p>
            </Card>
          </div>

          {/* Monthly table */}
          <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <h3 className="font-semibold text-sm text-foreground">
                Monthly Breakdown
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-[11px] rounded-lg"
                  onClick={() => window.print()}
                  data-ocid="reports.pl.print_button"
                >
                  <Printer size={12} className="mr-1" /> Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-[11px] rounded-lg"
                  onClick={exportCSV}
                  data-ocid="reports.pl.csv_button"
                >
                  <Download size={12} className="mr-1" /> CSV
                </Button>
              </div>
            </div>
            {monthlyMap.length === 0 ? (
              <div
                className="px-4 py-8 text-center"
                data-ocid="reports.pl.empty_state"
              >
                <p className="text-sm text-muted-foreground">
                  No data for selected period
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left px-4 py-2 font-semibold text-muted-foreground">
                        Month
                      </th>
                      <th className="text-right px-3 py-2 font-semibold text-muted-foreground">
                        Revenue
                      </th>
                      <th className="text-right px-3 py-2 font-semibold text-muted-foreground">
                        Expenses
                      </th>
                      <th className="text-right px-4 py-2 font-semibold text-muted-foreground">
                        Net P&amp;L
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyMap.map((row, i) => (
                      <tr
                        key={row.label}
                        className="border-t border-border/40"
                        data-ocid={`reports.pl.item.${i + 1}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {row.label}
                        </td>
                        <td className="px-3 py-2.5 text-right text-primary font-semibold">
                          {inr(row.revenue)}
                        </td>
                        <td className="px-3 py-2.5 text-right text-destructive">
                          {inr(row.expenses)}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-2.5 text-right font-bold",
                            row.net >= 0 ? "text-emerald-600" : "text-red-500",
                          )}
                        >
                          {row.net >= 0 ? "+" : "-"}
                          {inr(Math.abs(row.net))}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-border bg-muted/30">
                      <td className="px-4 py-2.5 font-bold text-foreground">
                        Total
                      </td>
                      <td className="px-3 py-2.5 text-right font-bold text-primary">
                        {inr(totalRevenue)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-bold text-destructive">
                        {inr(totalExpenses)}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-2.5 text-right font-bold",
                          netPL >= 0 ? "text-emerald-600" : "text-red-500",
                        )}
                      >
                        {netPL >= 0 ? "+" : "-"}
                        {inr(Math.abs(netPL))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

// ─── GST / GSTR-1 Tab ────────────────────────────────────────────────────

function GSTTab() {
  const [range, setRange] = useState<DateRange>("this_month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const { data: invData, isLoading } = useInvoices(BigInt(1), BigInt(200));

  const bounds = getRangeBounds(range, { from: customFrom, to: customTo });

  const filtered = useMemo(() => {
    return (invData?.items ?? [])
      .filter((inv) => {
        const d = new Date(nsToMs(inv.createdAt));
        return d >= bounds.start && d <= bounds.end;
      })
      .sort((a, b) => Number(b.createdAt - a.createdAt));
  }, [invData, bounds.start, bounds.end]);

  const totalTaxable = filtered.reduce((s, inv) => s + Number(inv.subtotal), 0);
  const totalCgst = filtered.reduce((s, inv) => s + Number(inv.cgst), 0);
  const totalSgst = filtered.reduce((s, inv) => s + Number(inv.sgst), 0);
  const totalGst = totalCgst + totalSgst;

  function exportCSV() {
    const rows = [
      [
        "Invoice No.",
        "Date",
        "Customer",
        "Taxable Amount",
        "CGST (9%)",
        "SGST (9%)",
        "Total GST",
        "Invoice Total",
      ],
      ...filtered.map((inv) => [
        inv.invoiceNumber,
        new Date(nsToMs(inv.createdAt)).toLocaleDateString("en-IN"),
        inv.customerName,
        (Number(inv.subtotal) / 100).toFixed(2),
        (Number(inv.cgst) / 100).toFixed(2),
        (Number(inv.sgst) / 100).toFixed(2),
        ((Number(inv.cgst) + Number(inv.sgst)) / 100).toFixed(2),
        (Number(inv.total) / 100).toFixed(2),
      ]),
      [
        "TOTAL",
        "",
        "",
        (totalTaxable / 100).toFixed(2),
        (totalCgst / 100).toFixed(2),
        (totalSgst / 100).toFixed(2),
        (totalGst / 100).toFixed(2),
        "",
      ],
    ];
    downloadCsv("gstr1_report.csv", rows);
  }

  return (
    <div className="space-y-4" data-ocid="reports.gst.section">
      <RangeSelector
        value={range}
        onChange={setRange}
        customFrom={customFrom}
        customTo={customTo}
        onCustomFrom={setCustomFrom}
        onCustomTo={setCustomTo}
      />

      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-2xl" />
      ) : (
        <>
          {/* GST summary */}
          <div className="grid grid-cols-2 gap-2">
            <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
              <p className="text-[10px] text-muted-foreground">Taxable Value</p>
              <p className="font-display font-bold text-sm text-foreground mt-1">
                {inr(totalTaxable)}
              </p>
            </Card>
            <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
              <p className="text-[10px] text-muted-foreground">Total GST</p>
              <p className="font-display font-bold text-sm text-primary mt-1">
                {inr(totalGst)}
              </p>
            </Card>
            <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
              <p className="text-[10px] text-muted-foreground">CGST (9%)</p>
              <p className="font-display font-bold text-sm text-foreground mt-1">
                {inr(totalCgst)}
              </p>
            </Card>
            <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
              <p className="text-[10px] text-muted-foreground">SGST (9%)</p>
              <p className="font-display font-bold text-sm text-foreground mt-1">
                {inr(totalSgst)}
              </p>
            </Card>
          </div>

          {/* GSTR-1 table */}
          <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <h3 className="font-semibold text-sm text-foreground">
                GSTR-1 Invoice List
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-[11px] rounded-lg"
                  onClick={() => window.print()}
                  data-ocid="reports.gst.print_button"
                >
                  <Printer size={12} className="mr-1" /> Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-[11px] rounded-lg"
                  onClick={exportCSV}
                  data-ocid="reports.gst.csv_button"
                >
                  <Download size={12} className="mr-1" /> CSV
                </Button>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div
                className="px-4 py-8 text-center"
                data-ocid="reports.gst.empty_state"
              >
                <p className="text-sm text-muted-foreground">
                  No invoices for selected period
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left px-3 py-2 font-semibold text-muted-foreground whitespace-nowrap">
                        Inv No.
                      </th>
                      <th className="text-left px-2 py-2 font-semibold text-muted-foreground whitespace-nowrap">
                        Date
                      </th>
                      <th className="text-left px-2 py-2 font-semibold text-muted-foreground">
                        Customer
                      </th>
                      <th className="text-right px-2 py-2 font-semibold text-muted-foreground whitespace-nowrap">
                        Taxable
                      </th>
                      <th className="text-right px-2 py-2 font-semibold text-muted-foreground">
                        CGST
                      </th>
                      <th className="text-right px-2 py-2 font-semibold text-muted-foreground">
                        SGST
                      </th>
                      <th className="text-right px-3 py-2 font-semibold text-muted-foreground whitespace-nowrap">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((inv, i) => (
                      <tr
                        key={inv.invoiceId.toString()}
                        className="border-t border-border/40"
                        data-ocid={`reports.gst.item.${i + 1}`}
                      >
                        <td className="px-3 py-2.5 font-medium text-primary whitespace-nowrap">
                          {inv.invoiceNumber}
                        </td>
                        <td className="px-2 py-2.5 text-muted-foreground whitespace-nowrap">
                          {new Date(nsToMs(inv.createdAt)).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short" },
                          )}
                        </td>
                        <td className="px-2 py-2.5 text-foreground max-w-[80px] truncate">
                          {inv.customerName}
                        </td>
                        <td className="px-2 py-2.5 text-right text-foreground">
                          {inr(Number(inv.subtotal))}
                        </td>
                        <td className="px-2 py-2.5 text-right text-foreground">
                          {inr(Number(inv.cgst))}
                        </td>
                        <td className="px-2 py-2.5 text-right text-foreground">
                          {inr(Number(inv.sgst))}
                        </td>
                        <td className="px-3 py-2.5 text-right font-semibold text-foreground">
                          {inr(Number(inv.total))}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-border bg-muted/30 font-bold">
                      <td className="px-3 py-2.5" colSpan={3}>
                        Total
                      </td>
                      <td className="px-2 py-2.5 text-right text-foreground">
                        {inr(totalTaxable)}
                      </td>
                      <td className="px-2 py-2.5 text-right text-foreground">
                        {inr(totalCgst)}
                      </td>
                      <td className="px-2 py-2.5 text-right text-foreground">
                        {inr(totalSgst)}
                      </td>
                      <td className="px-3 py-2.5 text-right text-primary">
                        {inr(totalGst)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

// ─── Stock Summary Tab ────────────────────────────────────────────────────

function StockTab() {
  const { data: prodData, isLoading } = useProducts(BigInt(1), BigInt(200));
  const products = prodData?.items ?? [];

  const totalInventoryValue = products.reduce(
    (s, p) => s + Number(p.quantity) * Number(p.sellingPrice),
    0,
  );

  function exportCSV() {
    const rows = [
      [
        "Product Name",
        "Category",
        "Stock",
        "Unit",
        "Selling Price (INR)",
        "Stock Value (INR)",
      ],
      ...products.map((p) => [
        p.name,
        p.category,
        p.quantity.toString(),
        p.unit,
        (Number(p.sellingPrice) / 100).toFixed(2),
        ((Number(p.quantity) * Number(p.sellingPrice)) / 100).toFixed(2),
      ]),
      ["TOTAL", "", "", "", "", (totalInventoryValue / 100).toFixed(2)],
    ];
    downloadCsv("stock_summary.csv", rows);
  }

  return (
    <div className="space-y-4" data-ocid="reports.stock.section">
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-2xl" />
      ) : (
        <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <h3 className="font-semibold text-sm text-foreground">
              Stock Summary
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px] rounded-lg"
                onClick={() => window.print()}
                data-ocid="reports.stock.print_button"
              >
                <Printer size={12} className="mr-1" /> Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px] rounded-lg"
                onClick={exportCSV}
                data-ocid="reports.stock.csv_button"
              >
                <Download size={12} className="mr-1" /> CSV
              </Button>
            </div>
          </div>
          {products.length === 0 ? (
            <div
              className="px-4 py-8 text-center"
              data-ocid="reports.stock.empty_state"
            >
              <p className="text-sm text-muted-foreground">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40">
                    <th className="text-left px-4 py-2 font-semibold text-muted-foreground">
                      Product
                    </th>
                    <th className="text-left px-2 py-2 font-semibold text-muted-foreground">
                      Cat.
                    </th>
                    <th className="text-right px-2 py-2 font-semibold text-muted-foreground">
                      Stock
                    </th>
                    <th className="text-left px-2 py-2 font-semibold text-muted-foreground">
                      Unit
                    </th>
                    <th className="text-right px-2 py-2 font-semibold text-muted-foreground">
                      Price
                    </th>
                    <th className="text-right px-4 py-2 font-semibold text-muted-foreground">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => {
                    const stockVal =
                      Number(p.quantity) * Number(p.sellingPrice);
                    const lowStock = Number(p.quantity) <= 5;
                    return (
                      <tr
                        key={p.productId.toString()}
                        className="border-t border-border/40"
                        data-ocid={`reports.stock.item.${i + 1}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground max-w-[120px] truncate">
                          {p.name}
                        </td>
                        <td className="px-2 py-2.5 text-muted-foreground">
                          {p.category}
                        </td>
                        <td
                          className={cn(
                            "px-2 py-2.5 text-right font-semibold",
                            lowStock ? "text-red-500" : "text-foreground",
                          )}
                        >
                          {p.quantity.toString()}
                        </td>
                        <td className="px-2 py-2.5 text-muted-foreground">
                          {p.unit}
                        </td>
                        <td className="px-2 py-2.5 text-right text-foreground">
                          {inr(Number(p.sellingPrice))}
                        </td>
                        <td className="px-4 py-2.5 text-right font-semibold text-primary">
                          {inr(stockVal)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-border bg-muted/30">
                    <td
                      className="px-4 py-2.5 font-bold text-foreground"
                      colSpan={5}
                    >
                      Total Inventory Value
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-primary">
                      {inr(totalInventoryValue)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────

type Tab = "pl" | "gst" | "stock";

const TABS: { id: Tab; label: string }[] = [
  { id: "pl", label: "P&L Report" },
  { id: "gst", label: "GST (GSTR-1)" },
  { id: "stock", label: "Stock Summary" },
];

export default function Reports() {
  const [tab, setTab] = useState<Tab>("pl");

  return (
    <div className="flex flex-col pb-4" data-ocid="reports.page">
      <div className="px-4 pt-4 pb-3 border-b border-border/50">
        <h2 className="font-display font-bold text-lg text-foreground">
          Reports
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Business analytics &amp; GST summaries
        </p>
      </div>

      {/* Tab bar */}
      <div
        className="flex border-b border-border/50 bg-card"
        data-ocid="reports.tab_bar"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 py-3 text-[12px] font-semibold transition-smooth border-b-2",
              tab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground",
            )}
            data-ocid={`reports.tab.${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4">
        {tab === "pl" && <PLTab />}
        {tab === "gst" && <GSTTab />}
        {tab === "stock" && <StockTab />}
      </div>
    </div>
  );
}
