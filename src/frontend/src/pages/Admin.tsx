import type { AdminStats, UserInfo } from "@/backend";
import { UserRole } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAdminStats,
  useListUsers,
  useUpdateUserRole,
} from "@/hooks/useBackend";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  FileText,
  IndianRupee,
  Package,
  ShoppingBag,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatINR(paise: bigint): string {
  const rupees = Number(paise) / 100;
  if (rupees >= 10000000) return `₹${(rupees / 10000000).toFixed(2)}Cr`;
  if (rupees >= 100000) return `₹${(rupees / 100000).toFixed(1)}L`;
  if (rupees >= 1000) return `₹${(rupees / 1000).toFixed(1)}K`;
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(rupees)}`;
}

function formatCount(n: bigint): string {
  return new Intl.NumberFormat("en-IN").format(Number(n));
}

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}

// ─── Role config ──────────────────────────────────────────────────────────────

const ROLE_CONFIG: Record<UserRole, { label: string; badgeClass: string }> = {
  [UserRole.owner]: {
    label: "Owner",
    badgeClass: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  [UserRole.staff]: {
    label: "Staff",
    badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  [UserRole.accountant]: {
    label: "Accountant",
    badgeClass: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  accentClass?: string;
  ocid: string;
}

function KpiCard({
  label,
  value,
  icon,
  trend,
  accentClass,
  ocid,
}: KpiCardProps) {
  return (
    <Card
      className="p-4 flex flex-col gap-2 shadow-sm border-border"
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </span>
        <span
          className={`p-1.5 rounded-lg ${accentClass ?? "bg-primary/10 text-primary"}`}
        >
          {icon}
        </span>
      </div>
      <span
        className={`text-2xl font-display font-bold ${
          trend === "down"
            ? "text-destructive"
            : trend === "up"
              ? "text-emerald-600"
              : "text-foreground"
        }`}
      >
        {value}
      </span>
      {trend && (
        <div className="flex items-center gap-1">
          {trend === "up" ? (
            <ArrowUpRight size={14} className="text-emerald-600" />
          ) : trend === "down" ? (
            <ArrowDownRight size={14} className="text-destructive" />
          ) : null}
        </div>
      )}
    </Card>
  );
}

// ─── Count Card ───────────────────────────────────────────────────────────────

function CountCard({
  label,
  count,
  icon,
  iconBg,
  ocid,
}: {
  label: string;
  count: bigint;
  icon: React.ReactNode;
  iconBg: string;
  ocid: string;
}) {
  return (
    <Card
      className="p-4 flex items-center gap-3 shadow-sm border-border"
      data-ocid={ocid}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xl font-display font-bold text-foreground">
          {formatCount(count)}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
}

// ─── Plan features ────────────────────────────────────────────────────────────

const PLAN_FEATURES = [
  "Unlimited Invoices",
  "GST Reports (GSTR-1)",
  "Inventory Management",
  "Customer Management",
  "Cloud Backup",
];

// ─── Skeletons ────────────────────────────────────────────────────────────────

function AnalyticsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-48 rounded-xl" />
    </div>
  );
}

function UsersSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <Skeleton key={i} className="h-20 rounded-xl" />
      ))}
    </div>
  );
}

// ─── User Row ─────────────────────────────────────────────────────────────────

function UserRow({ user, index }: { user: UserInfo; index: number }) {
  const { mutate: updateRole, isPending } = useUpdateUserRole();
  const cfg = ROLE_CONFIG[user.role] ?? ROLE_CONFIG[UserRole.staff];

  function handleRoleChange(newRole: string) {
    updateRole(
      { principal: user.principal, role: newRole as UserRole },
      {
        onSuccess: () =>
          toast.success(
            `Role updated to ${ROLE_CONFIG[newRole as UserRole]?.label ?? newRole}`,
          ),
        onError: () => toast.error("Failed to update role"),
      },
    );
  }

  return (
    <Card
      className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 shadow-sm border-border"
      data-ocid={`admin.user.item.${index}`}
    >
      {/* Avatar + info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-primary">
            {(user.email[0] ?? "U").toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {user.email}
          </p>
          <p className="text-xs text-muted-foreground">
            Joined {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      {/* Status + role */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="outline"
          className={`text-xs font-medium px-2 py-0.5 ${user.isActive ? "bg-emerald-500/10 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground"}`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </Badge>

        <Badge
          variant="outline"
          className={`text-xs font-medium px-2 py-0.5 ${cfg.badgeClass}`}
        >
          {cfg.label}
        </Badge>

        <Select
          value={user.role}
          onValueChange={handleRoleChange}
          disabled={isPending}
        >
          <SelectTrigger
            className="h-7 text-xs w-[110px]"
            data-ocid={`admin.user.role_select.${index}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.owner}>Owner</SelectItem>
            <SelectItem value={UserRole.staff}>Staff</SelectItem>
            <SelectItem value={UserRole.accountant}>Accountant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}

// ─── User Management Tab ──────────────────────────────────────────────────────

function UserManagementTab() {
  const { data: users = [], isLoading } = useListUsers();

  if (isLoading) return <UsersSkeleton />;

  return (
    <div className="space-y-4" data-ocid="admin.user_management_section">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage roles for registered users. Roles are informational labels
          only.
        </p>
        <Badge
          className="bg-primary/10 text-primary border-0 font-semibold"
          data-ocid="admin.total_users_badge"
        >
          {users.length} {users.length === 1 ? "user" : "users"}
        </Badge>
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap gap-2">
        {(
          Object.entries(ROLE_CONFIG) as [
            UserRole,
            (typeof ROLE_CONFIG)[UserRole],
          ][]
        ).map(([role, cfg]) => (
          <Badge
            key={role}
            variant="outline"
            className={`text-xs ${cfg.badgeClass}`}
          >
            {cfg.label}
          </Badge>
        ))}
      </div>

      {users.length === 0 ? (
        <Card
          className="p-10 flex flex-col items-center gap-3 text-center border-dashed"
          data-ocid="admin.users_empty_state"
        >
          <Users size={36} className="text-muted-foreground/50" />
          <p className="font-semibold text-foreground">
            No users registered yet
          </p>
          <p className="text-sm text-muted-foreground">
            Users will appear here once they sign up.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {users.map((user, i) => (
            <UserRow
              key={user.principal.toString()}
              user={user}
              index={i + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Analytics Tab ────────────────────────────────────────────────────────────

function AnalyticsTab({ stats }: { stats: AdminStats | null }) {
  const revenue = stats?.totalRevenue ?? BigInt(0);
  const expenses = stats?.totalExpenses ?? BigInt(0);
  const netPL = stats?.netPL ?? BigInt(0);
  const currentMonthRevenue = stats?.currentMonthRevenue ?? BigInt(0);
  const invoiceCount = stats?.invoiceCount ?? BigInt(0);
  const customerCount = stats?.customerCount ?? BigInt(0);
  const supplierCount = stats?.supplierCount ?? BigInt(0);
  const expenseCount = stats?.expenseCount ?? BigInt(0);
  const totalUsers = stats?.totalUsers ?? BigInt(0);
  const activeUsers = stats?.activeUsers ?? BigInt(0);

  const plTrend: "up" | "down" | "neutral" =
    netPL > BigInt(0) ? "up" : netPL < BigInt(0) ? "down" : "neutral";

  return (
    <div className="space-y-6">
      {/* Section 1: KPI Cards */}
      <section data-ocid="admin.overview_section">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Business Overview
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <KpiCard
            label="Total Revenue"
            value={formatINR(revenue)}
            icon={<IndianRupee size={16} />}
            trend="up"
            accentClass="bg-emerald-500/10 text-emerald-600"
            ocid="admin.revenue_card"
          />
          <KpiCard
            label="Total Expenses"
            value={formatINR(expenses)}
            icon={<Wallet size={16} />}
            trend="down"
            accentClass="bg-destructive/10 text-destructive"
            ocid="admin.expenses_card"
          />
          <KpiCard
            label="Net P&L"
            value={formatINR(netPL < BigInt(0) ? -netPL : netPL)}
            icon={<TrendingUp size={16} />}
            trend={plTrend}
            accentClass={
              plTrend === "up"
                ? "bg-emerald-500/10 text-emerald-600"
                : plTrend === "down"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
            }
            ocid="admin.net_pl_card"
          />
          <KpiCard
            label="This Month"
            value={formatINR(currentMonthRevenue)}
            icon={<Package size={16} />}
            trend="neutral"
            accentClass="bg-primary/10 text-primary"
            ocid="admin.current_month_card"
          />
        </div>
      </section>

      {/* Section 2: Entity Counts */}
      <section data-ocid="admin.counts_section">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Entity Counts
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <CountCard
            label="Total Invoices"
            count={invoiceCount}
            icon={<FileText size={18} className="text-primary" />}
            iconBg="bg-primary/10"
            ocid="admin.count_invoices"
          />
          <CountCard
            label="Customers"
            count={customerCount}
            icon={<Users size={18} className="text-blue-600" />}
            iconBg="bg-blue-500/10"
            ocid="admin.count_customers"
          />
          <CountCard
            label="Suppliers"
            count={supplierCount}
            icon={<Truck size={18} className="text-orange-600" />}
            iconBg="bg-orange-500/10"
            ocid="admin.count_suppliers"
          />
          <CountCard
            label="Expenses"
            count={expenseCount}
            icon={<ShoppingBag size={18} className="text-rose-600" />}
            iconBg="bg-rose-500/10"
            ocid="admin.count_expenses"
          />
        </div>
      </section>

      {/* Section 3: User Activity */}
      <section data-ocid="admin.user_stats_section">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          User Activity
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="p-4 flex items-center gap-3 shadow-sm border-border"
            data-ocid="admin.total_users_card"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-500/10">
              <Users size={18} className="text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-display font-bold text-foreground">
                {formatCount(totalUsers)}
              </p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </Card>
          <Card
            className="p-4 flex items-center gap-3 shadow-sm border-border"
            data-ocid="admin.active_users_card"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/10">
              <CheckCircle2 size={18} className="text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-display font-bold text-foreground">
                {formatCount(activeUsers)}
              </p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 4: Subscription Plan */}
      <section data-ocid="admin.plan_section">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Subscription Plan
        </h2>
        <Card
          className="border-primary/30 shadow-sm overflow-hidden"
          data-ocid="admin.plan_card"
        >
          <div className="bg-primary px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-primary-foreground" />
              <span className="font-display font-bold text-primary-foreground text-base">
                BizBook Pro
              </span>
            </div>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-xs">
              Active
            </Badge>
          </div>
          <div className="px-4 py-4 space-y-2.5">
            {PLAN_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <CheckCircle2
                  size={15}
                  className="text-primary flex-shrink-0"
                />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <Button
              type="button"
              className="w-full gap-2"
              variant="outline"
              data-ocid="admin.upgrade_button"
            >
              <BadgeCheck size={16} />
              Upgrade to Enterprise
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Admin() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: users = [] } = useListUsers();

  return (
    <div className="pb-24">
      {/* Page header */}
      <div className="bg-card border-b border-border px-4 pt-4 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-lg text-foreground leading-tight">
              Admin Panel
            </h1>
            <p className="text-xs text-muted-foreground">
              Business Overview &amp; User Management
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5">
        <Tabs defaultValue="analytics" data-ocid="admin.tabs">
          <TabsList className="w-full mb-5">
            <TabsTrigger
              value="analytics"
              className="flex-1"
              data-ocid="admin.analytics_tab"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex-1"
              data-ocid="admin.users_tab"
            >
              Users
              {users.length > 0 && (
                <Badge className="ml-1.5 bg-primary/15 text-primary border-0 text-[10px] px-1.5 py-0 h-4 font-semibold">
                  {users.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            {statsLoading ? (
              <AnalyticsSkeleton />
            ) : (
              <AnalyticsTab stats={stats ?? null} />
            )}
          </TabsContent>

          <TabsContent value="users">
            <UserManagementTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
