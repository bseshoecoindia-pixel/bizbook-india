import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboardStats } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  IndianRupee,
  Package,
  Printer,
  TrendingDown,
  TrendingUp,
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

// ─── Report types ─────────────────────────────────────────────────────────
const REPORT_TYPES = [
  {
    label: "Daily Sales",
    icon: IndianRupee,
    desc: "Today's detailed transactions",
    color: "text-primary",
    bg: "bg-primary/10",
    chartType: "bar" as const,
  },
  {
    label: "Monthly Sales",
    icon: TrendingUp,
    desc: "Month-wise revenue breakdown",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    chartType: "bar" as const,
  },
  {
    label: "Profit & Loss",
    icon: BarChart3,
    desc: "Income vs. expenses analysis",
    color: "text-purple-600",
    bg: "bg-purple-50",
    chartType: "mixed" as const,
  },
  {
    label: "Expense Report",
    icon: TrendingDown,
    desc: "All business expenses tracked",
    color: "text-red-500",
    bg: "bg-red-50",
    chartType: "pie" as const,
  },
  {
    label: "Customer Outstanding",
    icon: Users,
    desc: "Pending dues by customer",
    color: "text-amber-600",
    bg: "bg-amber-50",
    chartType: "bar" as const,
  },
  {
    label: "Stock Report",
    icon: Package,
    desc: "Inventory valuation & movement",
    color: "text-blue-600",
    bg: "bg-blue-50",
    chartType: "bar" as const,
  },
  {
    label: "Tax Report",
    icon: FileText,
    desc: "CGST / SGST / IGST summary",
    color: "text-teal-600",
    bg: "bg-teal-50",
    chartType: "bar" as const,
  },
  {
    label: "Payment Report",
    icon: IndianRupee,
    desc: "All received & due payments",
    color: "text-green-600",
    bg: "bg-green-50",
    chartType: "bar" as const,
  },
];

// ─── Sample bar chart data per report ─────────────────────────────────────
const WEEKLY_DATA = [
  { day: "Mon", val: 18500 },
  { day: "Tue", val: 22400 },
  { day: "Wed", val: 17800 },
  { day: "Thu", val: 28450 },
  { day: "Fri", val: 31200 },
  { day: "Sat", val: 42800 },
  { day: "Sun", val: 15600 },
];

const EXPENSE_DATA = [
  { label: "Rent", val: 18000, color: "bg-red-400" },
  { label: "Salary", val: 45000, color: "bg-amber-400" },
  { label: "Transport", val: 8500, color: "bg-blue-400" },
  { label: "Electricity", val: 4200, color: "bg-purple-400" },
  { label: "Other", val: 6300, color: "bg-muted-foreground/50" },
];

function BarMiniChart({ data }: { data: { day: string; val: number }[] }) {
  const max = Math.max(...data.map((d) => d.val));
  return (
    <div className="flex items-end justify-between gap-1 h-20 mt-3">
      {data.map((d, i) => {
        const pct = (d.val / max) * 100;
        const isHighest = d.val === max;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static chart bars
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className={cn(
                "w-full rounded-t-md transition-smooth",
                isHighest ? "bg-primary" : "bg-primary/25",
              )}
              style={{ height: `${pct}%`, minHeight: "6px" }}
            />
            <span
              className={cn(
                "text-[9px] font-medium",
                isHighest ? "text-primary" : "text-muted-foreground",
              )}
            >
              {d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PieDonut({
  data,
}: { data: { label: string; val: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.val, 0);
  return (
    <div className="mt-3 space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2">
          <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", d.color)} />
          <div className="flex-1 flex items-center justify-between">
            <span className="text-xs text-foreground">{d.label}</span>
            <span className="text-xs font-semibold text-foreground">
              {((d.val / total) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full", d.color)}
              style={{ width: `${(d.val / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Report detail sheet ──────────────────────────────────────────────────
interface ReportSheetProps {
  report: (typeof REPORT_TYPES)[number];
  onClose: () => void;
}

function ReportSheet({ report, onClose }: ReportSheetProps) {
  const [dateFrom, setDateFrom] = useState("2026-04-01");
  const [dateTo, setDateTo] = useState("2026-04-30");

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
        className="relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4 max-h-[85vh] overflow-y-auto"
        data-ocid="reports.report_detail.dialog"
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                report.bg,
              )}
            >
              <report.icon size={20} className={report.color} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-foreground">
                {report.label}
              </h3>
              <p className="text-xs text-muted-foreground">{report.desc}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            aria-label="Close"
            data-ocid="reports.report_detail.close_button"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Date filters */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <Calendar size={10} />
              From
            </Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-9 rounded-xl text-sm"
              data-ocid="reports.filter.date_from.input"
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <Calendar size={10} />
              To
            </Label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-9 rounded-xl text-sm"
              data-ocid="reports.filter.date_to.input"
            />
          </div>
        </div>

        {/* Sample chart */}
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-background mb-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">
              {report.label} — Sample Data
            </p>
            <span className="text-[10px] text-muted-foreground">Apr 2026</span>
          </div>
          {report.chartType === "pie" ? (
            <PieDonut data={EXPENSE_DATA} />
          ) : (
            <BarMiniChart data={WEEKLY_DATA} />
          )}
          <p className="text-[10px] text-muted-foreground mt-3 text-center">
            ₹
            {new Intl.NumberFormat("en-IN").format(
              WEEKLY_DATA.reduce((s, d) => s + d.val, 0),
            )}{" "}
            total this week
          </p>
        </Card>

        {/* Export buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="h-10 rounded-xl flex flex-col gap-0.5 text-[10px] font-semibold border-border py-2"
            onClick={() => toast.success("PDF export coming soon!")}
            data-ocid="reports.export_pdf_button"
          >
            <Download size={14} className="text-red-500" />
            PDF
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl flex flex-col gap-0.5 text-[10px] font-semibold border-border py-2"
            onClick={() => toast.success("Excel export coming soon!")}
            data-ocid="reports.export_excel_button"
          >
            <FileSpreadsheet size={14} className="text-emerald-600" />
            Excel
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl flex flex-col gap-0.5 text-[10px] font-semibold border-border py-2"
            onClick={() => toast.success("Print coming soon!")}
            data-ocid="reports.print_button"
          >
            <Printer size={14} className="text-blue-600" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function Reports() {
  const { data: stats } = useDashboardStats();
  const [activeReport, setActiveReport] = useState<
    (typeof REPORT_TYPES)[number] | null
  >(null);

  return (
    <div className="flex flex-col gap-0 pb-4" data-ocid="reports.page">
      <div className="px-4 pt-4 pb-3 border-b border-border/50">
        <h2 className="font-display font-bold text-lg text-foreground">
          Reports
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Business analytics & summaries
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-3 mb-4">
        <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
          <p className="text-xs text-muted-foreground">Monthly Revenue</p>
          <p className="font-display font-bold text-lg text-primary mt-1">
            ₹{formatINR(stats?.monthlySales ?? BigInt(0))}
          </p>
          <p className="text-[10px] text-emerald-600 mt-0.5">
            ↑ +8% vs last month
          </p>
        </Card>
        <Card className="p-3 shadow-card rounded-2xl border-0 bg-card">
          <p className="text-xs text-muted-foreground">Outstanding</p>
          <p className="font-display font-bold text-lg text-amber-600 mt-1">
            ₹{formatINR(stats?.outstandingPayments ?? BigInt(0))}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Pending collection
          </p>
        </Card>
      </div>

      {/* Weekly bar chart */}
      <div className="px-4 mb-4">
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm text-foreground">
              Weekly Sales
            </h3>
            <span className="text-[10px] text-muted-foreground">This Week</span>
          </div>
          <BarMiniChart data={WEEKLY_DATA} />
          <div className="flex justify-between mt-2 pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xs font-semibold text-foreground">
              ₹
              {new Intl.NumberFormat("en-IN").format(
                WEEKLY_DATA.reduce((s, d) => s + d.val, 0),
              )}
            </p>
          </div>
        </Card>
      </div>

      {/* Report cards grid */}
      <div className="px-4">
        <h3 className="font-display font-semibold text-sm text-foreground mb-3">
          Available Reports
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {REPORT_TYPES.map((report, i) => (
            <Card
              key={report.label}
              className="shadow-card rounded-2xl border-0 bg-card p-4 cursor-pointer hover:shadow-elevated transition-smooth active:scale-[0.98]"
              onClick={() => setActiveReport(report)}
              data-ocid={`reports.report_item.${i + 1}`}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                  report.bg,
                )}
              >
                <report.icon size={20} className={report.color} />
              </div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {report.label}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-tight">
                {report.desc}
              </p>
              <div className="flex items-center gap-1 mt-3">
                <Download size={11} className="text-primary" />
                <span className="text-[10px] text-primary font-medium">
                  View Report
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Report detail sheet */}
      {activeReport && (
        <ReportSheet
          report={activeReport}
          onClose={() => setActiveReport(null)}
        />
      )}
    </div>
  );
}
