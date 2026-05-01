import { PaymentStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDashboardStats,
  useInvoices,
  useLowStockProducts,
  useProducts,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  FileText,
  IndianRupee,
  Package,
  Plus,
  Receipt,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatINR(paise: bigint): string {
  const rupees = Number(paise) / 100;
  if (rupees >= 100000) return `${(rupees / 100000).toFixed(1)}L`;
  if (rupees >= 1000) return `${(rupees / 1000).toFixed(1)}K`;
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    rupees,
  );
}

function formatINRFull(paise: bigint): string {
  const rupees = Number(paise) / 100;
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    rupees,
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

function getPaymentStatusColor(status: PaymentStatus) {
  if (status === PaymentStatus.Paid)
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === PaymentStatus.Partial_)
    return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
}

function getPaymentStatusLabel(status: PaymentStatus) {
  if (status === PaymentStatus.Paid) return "Paid";
  if (status === PaymentStatus.Partial_) return "Partial";
  return "Unpaid";
}

// ─── Static chart data ───────────────────────────────────────────────────────

const weeklyData = [
  { day: "Mon", sales: 18400 },
  { day: "Tue", sales: 24200 },
  { day: "Wed", sales: 19800 },
  { day: "Thu", sales: 31500 },
  { day: "Fri", sales: 28700 },
  { day: "Sat", sales: 42300 },
  { day: "Sun", sales: 24500 },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 218000 },
  { month: "Feb", revenue: 245000 },
  { month: "Mar", revenue: 298000 },
  { month: "Apr", revenue: 267000 },
  { month: "May", revenue: 312000 },
  { month: "Jun", revenue: 289000 },
  { month: "Jul", revenue: 334000 },
  { month: "Aug", revenue: 356000 },
  { month: "Sep", revenue: 298000 },
  { month: "Oct", revenue: 378000 },
  { month: "Nov", revenue: 342800 },
  { month: "Dec", revenue: 0 },
];

const expenseVsIncome = [
  { month: "Jul", income: 334000, expense: 198000 },
  { month: "Aug", income: 356000, expense: 212000 },
  { month: "Sep", income: 298000, expense: 178000 },
  { month: "Oct", income: 378000, expense: 234000 },
  { month: "Nov", income: 342800, expense: 189000 },
  { month: "Dec", income: 0, expense: 0 },
];

// ─── KPI Card ────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  prefix?: string;
  sub?: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: "up" | "down";
  trendValue?: string;
  borderColor?: string;
}

function KpiCard({
  label,
  value,
  prefix = "₹",
  sub,
  icon,
  iconBg,
  trend,
  trendValue,
  borderColor = "border-l-primary",
}: KpiCardProps) {
  return (
    <Card
      className={cn(
        "p-3.5 shadow-card rounded-2xl border-0 bg-card border-l-4",
        borderColor,
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
            iconBg,
          )}
        >
          {icon}
        </div>
        {trend && trendValue && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
              trend === "up"
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-600 bg-red-50",
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight size={10} />
            ) : (
              <ArrowDownRight size={10} />
            )}
            {trendValue}
          </span>
        )}
      </div>
      <p className="font-display font-bold text-lg text-foreground leading-tight">
        <span className="text-xs font-semibold text-muted-foreground mr-0.5">
          {prefix}
        </span>
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
        {label}
      </p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </Card>
  );
}

function KpiCardCount({
  label,
  value,
  icon,
  iconBg,
  sub,
  trend,
  trendValue,
  borderColor = "border-l-primary",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  sub?: string;
  trend?: "up" | "down";
  trendValue?: string;
  borderColor?: string;
}) {
  return (
    <Card
      className={cn(
        "p-3.5 shadow-card rounded-2xl border-0 bg-card border-l-4",
        borderColor,
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
            iconBg,
          )}
        >
          {icon}
        </div>
        {trend && trendValue && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
              trend === "up"
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-600 bg-red-50",
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight size={10} />
            ) : (
              <ArrowDownRight size={10} />
            )}
            {trendValue}
          </span>
        )}
      </div>
      <p className="font-display font-bold text-2xl text-foreground leading-tight">
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
        {label}
      </p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </Card>
  );
}

// ─── Quick Action ─────────────────────────────────────────────────────────────

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  path: string;
  bgClass: string;
  ocid: string;
  primary?: boolean;
}

function QuickActionBtn({
  label,
  icon,
  path,
  bgClass,
  ocid,
  primary,
}: QuickActionProps) {
  return (
    <Link
      to={path}
      data-ocid={ocid}
      className={cn(
        "flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-smooth group active:scale-95",
        primary ? "col-span-2 flex-row gap-3 justify-center py-3.5" : "",
        bgClass,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-xl transition-smooth group-hover:scale-110",
          primary
            ? "w-9 h-9 bg-primary-foreground/20 shrink-0"
            : "w-10 h-10 bg-card/80",
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "text-xs font-semibold leading-tight text-center",
          primary ? "text-primary-foreground text-sm" : "text-foreground",
        )}
      >
        {label}
      </span>
    </Link>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  linkTo,
  linkLabel = "View All",
  ocid,
}: {
  title: string;
  linkTo?: string;
  linkLabel?: string;
  ocid?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-display font-bold text-sm text-foreground">
        {title}
      </h3>
      {linkTo && (
        <Link
          to={linkTo}
          className="text-xs text-primary font-semibold"
          data-ocid={ocid}
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

// ─── Chart Tooltip ────────────────────────────────────────────────────────────

function ChartTooltipContent({
  active,
  payload,
  label,
  prefix = "₹",
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
  prefix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl shadow-elevated px-3 py-2 text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {prefix}
          {new Intl.NumberFormat("en-IN").format(p.value)}
        </p>
      ))}
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: invoicesData, isLoading: invoicesLoading } = useInvoices();
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: lowStock } = useLowStockProducts();

  const recentInvoices = (invoicesData?.items ?? []).slice(0, 3);
  const recentProducts = (productsData?.items ?? []).slice(0, 3);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="flex flex-col gap-0 pb-6 max-w-xl mx-auto"
      data-ocid="dashboard.page"
    >
      {/* ── Header Banner ── */}
      <div
        className="px-4 pt-5 pb-5 text-primary-foreground bg-primary"
        data-ocid="dashboard.header"
      >
        <p className="text-xs font-medium opacity-80 mb-0.5">{today}</p>
        <h1 className="font-display font-bold text-xl leading-tight mb-0.5">
          {getGreeting()}, Ramesh Sharma 👋
        </h1>
        <p className="text-sm font-semibold opacity-90">
          Sharma General Stores — Mumbai
        </p>

        {/* Mini summary chips */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-3 py-1">
            <IndianRupee size={10} />
            <span className="text-[11px] font-semibold">
              Today: ₹
              {statsLoading
                ? "—"
                : formatINRFull(stats?.todaySales ?? BigInt(2450000))}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-3 py-1">
            <AlertTriangle size={10} />
            <span className="text-[11px] font-semibold">
              {statsLoading
                ? "—"
                : (stats?.lowStockCount ?? BigInt(5)).toString()}{" "}
              Low Stock
            </span>
          </div>
        </div>
      </div>

      {/* ── KPI Row 1 ── */}
      <div className="px-4 pt-4">
        <SectionHeader title="Today's Overview" />
        {statsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <Skeleton key={i} className="h-[88px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 gap-3"
            data-ocid="dashboard.kpi_row1"
          >
            <KpiCard
              label="Today's Sales"
              value={formatINR(stats?.todaySales ?? BigInt(2450000))}
              icon={<IndianRupee size={15} className="text-primary" />}
              iconBg="bg-primary/10"
              trend="up"
              trendValue="+12%"
              sub="vs Yesterday"
              borderColor="border-l-primary"
            />
            <KpiCard
              label="Monthly Sales"
              value={formatINR(stats?.monthlySales ?? BigInt(34280000))}
              icon={<TrendingUp size={15} className="text-emerald-600" />}
              iconBg="bg-emerald-50"
              trend="up"
              trendValue="+8%"
              sub="This Month"
              borderColor="border-l-emerald-500"
            />
            <KpiCard
              label="Outstanding"
              value={formatINR(stats?.outstandingPayments ?? BigInt(4520000))}
              icon={<Wallet size={15} className="text-amber-600" />}
              iconBg="bg-amber-50"
              sub="5 Invoices Overdue"
              borderColor="border-l-amber-500"
            />
            <KpiCard
              label="Inventory Value"
              value={formatINR(stats?.inventoryValue ?? BigInt(87650000))}
              icon={<Package size={15} className="text-blue-600" />}
              iconBg="bg-blue-50"
              trend="up"
              trendValue="+3%"
              sub="Stock Value"
              borderColor="border-l-blue-500"
            />
          </div>
        )}
      </div>

      {/* ── KPI Row 2 ── */}
      <div className="px-4 pt-4">
        <SectionHeader title="Business Insights" />
        {statsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <Skeleton key={i} className="h-[88px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 gap-3"
            data-ocid="dashboard.kpi_row2"
          >
            <KpiCard
              label="Profit Summary"
              value={formatINR(BigInt(8620000))}
              icon={<BarChart3 size={15} className="text-violet-600" />}
              iconBg="bg-violet-50"
              trend="up"
              trendValue="+15%"
              sub="Net This Month"
              borderColor="border-l-violet-500"
            />
            <KpiCardCount
              label="Pending Payments"
              value="12"
              icon={<Receipt size={15} className="text-rose-600" />}
              iconBg="bg-rose-50"
              sub="Awaiting Collection"
              borderColor="border-l-rose-500"
            />
            <KpiCardCount
              label="Total Customers"
              value={(stats?.totalCustomers ?? BigInt(48)).toString()}
              icon={<Users size={15} className="text-sky-600" />}
              iconBg="bg-sky-50"
              trend="up"
              trendValue="+3"
              sub="This Week"
              borderColor="border-l-sky-500"
            />
            <KpiCardCount
              label="Low Stock Alerts"
              value={(stats?.lowStockCount ?? BigInt(5)).toString()}
              icon={<AlertTriangle size={15} className="text-orange-600" />}
              iconBg="bg-orange-50"
              sub="Needs Restocking"
              borderColor="border-l-orange-500"
            />
          </div>
        )}
      </div>

      {/* ── Low Stock Alert Banner ── */}
      {(lowStock?.length ?? 0) > 0 && (
        <div className="mx-4 mt-4">
          <Link
            to="/inventory"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 active:scale-[0.98] transition-smooth"
            data-ocid="dashboard.low_stock_alert"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} className="text-amber-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-amber-800">
                {lowStock?.length} Items Running Low
              </p>
              <p className="text-xs text-amber-600 truncate">
                {lowStock
                  ?.slice(0, 2)
                  .map((p) => p.name)
                  .join(", ")}
              </p>
            </div>
            <ArrowUpRight
              size={16}
              className="text-amber-600 shrink-0 rotate-45"
            />
          </Link>
        </div>
      )}

      {/* ── Quick Actions ── */}
      <div className="px-4 mt-4">
        <SectionHeader title="Quick Actions" />
        <div
          className="grid grid-cols-3 gap-2.5"
          data-ocid="dashboard.quick_actions"
        >
          <QuickActionBtn
            label="New Invoice"
            icon={<Plus size={20} className="text-primary-foreground" />}
            path="/bills/new"
            bgClass="bg-primary col-span-1"
            ocid="dashboard.new_invoice_button"
            primary={false}
          />
          <QuickActionBtn
            label="Add Customer"
            icon={<Users size={18} className="text-sky-600" />}
            path="/customers"
            bgClass="bg-sky-50"
            ocid="dashboard.add_customer_button"
          />
          <QuickActionBtn
            label="Add Product"
            icon={<Package size={18} className="text-emerald-600" />}
            path="/inventory/new"
            bgClass="bg-emerald-50"
            ocid="dashboard.add_product_button"
          />
          <QuickActionBtn
            label="Add Expense"
            icon={<Wallet size={18} className="text-violet-600" />}
            path="/expenses"
            bgClass="bg-violet-50"
            ocid="dashboard.add_expense_button"
          />
          <QuickActionBtn
            label="View Reports"
            icon={<BarChart3 size={18} className="text-rose-600" />}
            path="/reports"
            bgClass="bg-rose-50"
            ocid="dashboard.reports_button"
          />
          <QuickActionBtn
            label="Bills"
            icon={<FileText size={18} className="text-amber-600" />}
            path="/bills"
            bgClass="bg-amber-50"
            ocid="dashboard.bills_button"
          />
        </div>
      </div>

      {/* ── Weekly Sales Chart ── */}
      <div className="px-4 mt-4">
        <SectionHeader
          title="Weekly Sales"
          linkTo="/reports"
          ocid="dashboard.weekly_chart_link"
        />
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <p className="text-xs text-muted-foreground mb-3">Last 7 days (₹)</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart
              data={weeklyData}
              barSize={28}
              margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.88 0.01 240)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "oklch(0.45 0.01 240)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "oklch(0.45 0.01 240)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="sales"
                name="Sales"
                fill="#008B8B"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Monthly Revenue Chart ── */}
      <div className="px-4 mt-4">
        <SectionHeader
          title="Monthly Revenue"
          linkTo="/reports"
          ocid="dashboard.monthly_chart_link"
        />
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <p className="text-xs text-muted-foreground mb-3">FY 2025 (₹)</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart
              data={monthlyRevenue}
              margin={{ top: 0, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.88 0.01 240)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "oklch(0.45 0.01 240)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "oklch(0.45 0.01 240)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#008B8B"
                strokeWidth={2.5}
                dot={{ fill: "#008B8B", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Expense vs Income Chart ── */}
      <div className="px-4 mt-4">
        <SectionHeader
          title="Income vs Expense"
          linkTo="/reports"
          ocid="dashboard.expense_chart_link"
        />
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <div className="flex gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-[11px] text-muted-foreground font-medium">
                Income
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="text-[11px] text-muted-foreground font-medium">
                Expense
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart
              data={expenseVsIncome}
              margin={{ top: 0, right: 4, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#008B8B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#008B8B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.88 0.01 240)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "oklch(0.45 0.01 240)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "oklch(0.45 0.01 240)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#008B8B"
                strokeWidth={2}
                fill="url(#colorIncome)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#f43f5e"
                strokeWidth={2}
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Recent Invoices ── */}
      <div className="px-4 mt-4">
        <SectionHeader
          title="Recent Invoices"
          linkTo="/bills"
          ocid="dashboard.view_all_bills_link"
        />
        <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
          {invoicesLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            </div>
          ) : recentInvoices.length === 0 ? (
            <div
              className="p-8 text-center"
              data-ocid="dashboard.invoices_empty_state"
            >
              <FileText
                size={36}
                className="text-muted-foreground mx-auto mb-3 opacity-30"
              />
              <p className="text-sm font-semibold text-foreground mb-1">
                No invoices yet
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Create your first invoice to get started
              </p>
              <Button size="sm" className="rounded-xl" asChild>
                <Link to="/bills/new">Create Invoice</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentInvoices.map((inv, i) => (
                <Link
                  key={inv.invoiceId.toString()}
                  to="/bills/$id"
                  params={{ id: inv.invoiceId.toString() }}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-smooth"
                  data-ocid={`dashboard.invoice_item.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={15} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {inv.customerName}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {inv.invoiceNumber}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">
                      ₹{formatINRFull(inv.total)}
                    </p>
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mt-0.5",
                        getPaymentStatusColor(inv.paymentStatus),
                      )}
                    >
                      {getPaymentStatusLabel(inv.paymentStatus)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* ── Recent Stock Updates ── */}
      <div className="px-4 mt-4">
        <SectionHeader
          title="Recent Stock"
          linkTo="/inventory"
          ocid="dashboard.view_all_inventory_link"
        />
        <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
          {productsLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="h-12 rounded-xl" />
              ))}
            </div>
          ) : recentProducts.length === 0 ? (
            <div
              className="p-6 text-center"
              data-ocid="dashboard.stock_empty_state"
            >
              <Package
                size={32}
                className="text-muted-foreground mx-auto mb-2 opacity-30"
              />
              <p className="text-sm text-muted-foreground">No products yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentProducts.map((product, i) => (
                <Link
                  key={product.productId.toString()}
                  to="/inventory/$id"
                  params={{ id: product.productId.toString() }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-smooth"
                  data-ocid={`dashboard.stock_item.${i + 1}`}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      Number(product.quantity) <= 5
                        ? "bg-amber-50"
                        : "bg-emerald-50",
                    )}
                  >
                    <Package
                      size={15}
                      className={
                        Number(product.quantity) <= 5
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {product.category} · {product.sku}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-semibold rounded-full px-2 py-0.5",
                        Number(product.quantity) <= 5
                          ? "border-amber-200 text-amber-700 bg-amber-50"
                          : "border-emerald-200 text-emerald-700 bg-emerald-50",
                      )}
                    >
                      {product.quantity.toString()} {product.unit}
                    </Badge>
                    <p className="text-xs font-bold text-foreground mt-0.5">
                      ₹{formatINR(product.sellingPrice)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 pt-6 pb-2 text-center">
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
