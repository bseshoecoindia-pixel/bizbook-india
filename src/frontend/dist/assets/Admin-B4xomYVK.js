import { c as createLucideIcon, ar as useAdminStats, as as useListUsers, j as jsxRuntimeExports, T as TrendingUp, o as Skeleton, P as Package, F as FileText, U as Users, at as Truck, t as Card, B as Button, au as UserRole, av as useUpdateUserRole, e as ue } from "./index-DHdUgTPk.js";
import { B as Badge } from "./badge-mQmOdhEj.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-WqVn_Noe.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CmO9P3hJ.js";
import { I as IndianRupee } from "./indian-rupee-BSLgJRl2.js";
import { W as Wallet, A as ArrowUpRight, a as ArrowDownRight } from "./wallet-C5T5Y2J1.js";
import { C as CircleCheck } from "./circle-check-DOLw6yw2.js";
import { Z as Zap } from "./zap-D18ybkCi.js";
import "./index-W78-Kk_E.js";
import "./chevron-down-CZ7Jrx8h.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function formatINR(paise) {
  const rupees = Number(paise) / 100;
  if (rupees >= 1e7) return `₹${(rupees / 1e7).toFixed(2)}Cr`;
  if (rupees >= 1e5) return `₹${(rupees / 1e5).toFixed(1)}L`;
  if (rupees >= 1e3) return `₹${(rupees / 1e3).toFixed(1)}K`;
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(rupees)}`;
}
function formatCount(n) {
  return new Intl.NumberFormat("en-IN").format(Number(n));
}
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(ms));
}
const ROLE_CONFIG = {
  [UserRole.owner]: {
    label: "Owner",
    badgeClass: "bg-blue-500/10 text-blue-700 border-blue-200"
  },
  [UserRole.staff]: {
    label: "Staff",
    badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-200"
  },
  [UserRole.accountant]: {
    label: "Accountant",
    badgeClass: "bg-amber-500/10 text-amber-700 border-amber-200"
  }
};
function KpiCard({
  label,
  value,
  icon,
  trend,
  accentClass,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "p-4 flex flex-col gap-2 shadow-sm border-border",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `p-1.5 rounded-lg ${accentClass ?? "bg-primary/10 text-primary"}`,
              children: icon
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-2xl font-display font-bold ${trend === "down" ? "text-destructive" : trend === "up" ? "text-emerald-600" : "text-foreground"}`,
            children: value
          }
        ),
        trend && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, className: "text-emerald-600" }) : trend === "down" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { size: 14, className: "text-destructive" }) : null })
      ]
    }
  );
}
function CountCard({
  label,
  count,
  icon,
  iconBg,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "p-4 flex items-center gap-3 shadow-sm border-border",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: formatCount(count) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
        ] })
      ]
    }
  );
}
const PLAN_FEATURES = [
  "Unlimited Invoices",
  "GST Reports (GSTR-1)",
  "Inventory Management",
  "Customer Management",
  "Cloud Backup"
];
function AnalyticsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, i)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" })
  ] });
}
function UsersSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 4 }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)
  )) });
}
function UserRow({ user, index }) {
  const { mutate: updateRole, isPending } = useUpdateUserRole();
  const cfg = ROLE_CONFIG[user.role] ?? ROLE_CONFIG[UserRole.staff];
  function handleRoleChange(newRole) {
    updateRole(
      { principal: user.principal, role: newRole },
      {
        onSuccess: () => {
          var _a;
          return ue.success(
            `Role updated to ${((_a = ROLE_CONFIG[newRole]) == null ? void 0 : _a.label) ?? newRole}`
          );
        },
        onError: () => ue.error("Failed to update role")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 shadow-sm border-border",
      "data-ocid": `admin.user.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: (user.email[0] ?? "U").toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Joined ",
              formatDate(user.createdAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-xs font-medium px-2 py-0.5 ${user.isActive ? "bg-emerald-500/10 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground"}`,
              children: user.isActive ? "Active" : "Inactive"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-xs font-medium px-2 py-0.5 ${cfg.badgeClass}`,
              children: cfg.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: user.role,
              onValueChange: handleRoleChange,
              disabled: isPending,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-7 text-xs w-[110px]",
                    "data-ocid": `admin.user.role_select.${index}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole.owner, children: "Owner" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole.staff, children: "Staff" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole.accountant, children: "Accountant" })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function UserManagementTab() {
  const { data: users = [], isLoading } = useListUsers();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(UsersSkeleton, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "admin.user_management_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage roles for registered users. Roles are informational labels only." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          className: "bg-primary/10 text-primary border-0 font-semibold",
          "data-ocid": "admin.total_users_badge",
          children: [
            users.length,
            " ",
            users.length === 1 ? "user" : "users"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(ROLE_CONFIG).map(([role, cfg]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: `text-xs ${cfg.badgeClass}`,
        children: cfg.label
      },
      role
    )) }),
    users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-10 flex flex-col items-center gap-3 text-center border-dashed",
        "data-ocid": "admin.users_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 36, className: "text-muted-foreground/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No users registered yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Users will appear here once they sign up." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: users.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserRow,
      {
        user,
        index: i + 1
      },
      user.principal.toString()
    )) })
  ] });
}
function AnalyticsTab({ stats }) {
  const revenue = (stats == null ? void 0 : stats.totalRevenue) ?? BigInt(0);
  const expenses = (stats == null ? void 0 : stats.totalExpenses) ?? BigInt(0);
  const netPL = (stats == null ? void 0 : stats.netPL) ?? BigInt(0);
  const currentMonthRevenue = (stats == null ? void 0 : stats.currentMonthRevenue) ?? BigInt(0);
  const invoiceCount = (stats == null ? void 0 : stats.invoiceCount) ?? BigInt(0);
  const customerCount = (stats == null ? void 0 : stats.customerCount) ?? BigInt(0);
  const supplierCount = (stats == null ? void 0 : stats.supplierCount) ?? BigInt(0);
  const expenseCount = (stats == null ? void 0 : stats.expenseCount) ?? BigInt(0);
  const totalUsers = (stats == null ? void 0 : stats.totalUsers) ?? BigInt(0);
  const activeUsers = (stats == null ? void 0 : stats.activeUsers) ?? BigInt(0);
  const plTrend = netPL > BigInt(0) ? "up" : netPL < BigInt(0) ? "down" : "neutral";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.overview_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Business Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Total Revenue",
            value: formatINR(revenue),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 16 }),
            trend: "up",
            accentClass: "bg-emerald-500/10 text-emerald-600",
            ocid: "admin.revenue_card"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Total Expenses",
            value: formatINR(expenses),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 16 }),
            trend: "down",
            accentClass: "bg-destructive/10 text-destructive",
            ocid: "admin.expenses_card"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Net P&L",
            value: formatINR(netPL < BigInt(0) ? -netPL : netPL),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16 }),
            trend: plTrend,
            accentClass: plTrend === "up" ? "bg-emerald-500/10 text-emerald-600" : plTrend === "down" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
            ocid: "admin.net_pl_card"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "This Month",
            value: formatINR(currentMonthRevenue),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16 }),
            trend: "neutral",
            accentClass: "bg-primary/10 text-primary",
            ocid: "admin.current_month_card"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.counts_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Entity Counts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CountCard,
          {
            label: "Total Invoices",
            count: invoiceCount,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, className: "text-primary" }),
            iconBg: "bg-primary/10",
            ocid: "admin.count_invoices"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CountCard,
          {
            label: "Customers",
            count: customerCount,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18, className: "text-blue-600" }),
            iconBg: "bg-blue-500/10",
            ocid: "admin.count_customers"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CountCard,
          {
            label: "Suppliers",
            count: supplierCount,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 18, className: "text-orange-600" }),
            iconBg: "bg-orange-500/10",
            ocid: "admin.count_suppliers"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CountCard,
          {
            label: "Expenses",
            count: expenseCount,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, className: "text-rose-600" }),
            iconBg: "bg-rose-500/10",
            ocid: "admin.count_expenses"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.user_stats_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "User Activity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "p-4 flex items-center gap-3 shadow-sm border-border",
            "data-ocid": "admin.total_users_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18, className: "text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: formatCount(totalUsers) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Users" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "p-4 flex items-center gap-3 shadow-sm border-border",
            "data-ocid": "admin.active_users_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, className: "text-emerald-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: formatCount(activeUsers) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active Users" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.plan_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Subscription Plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-primary/30 shadow-sm overflow-hidden",
          "data-ocid": "admin.plan_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-4 py-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18, className: "text-primary-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary-foreground text-base", children: "BizBook Pro" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary-foreground/20 text-primary-foreground border-0 text-xs", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4 space-y-2.5", children: PLAN_FEATURES.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheck,
                {
                  size: 15,
                  className: "text-primary flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: feature })
            ] }, feature)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "w-full gap-2",
                variant: "outline",
                "data-ocid": "admin.upgrade_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 16 }),
                  "Upgrade to Enterprise"
                ]
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
function Admin() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: users = [] } = useListUsers();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 pt-4 pb-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground leading-tight", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Business Overview & User Management" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "analytics", "data-ocid": "admin.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "analytics",
            className: "flex-1",
            "data-ocid": "admin.analytics_tab",
            children: "Analytics"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "users",
            className: "flex-1",
            "data-ocid": "admin.users_tab",
            children: [
              "Users",
              users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1.5 bg-primary/15 text-primary border-0 text-[10px] px-1.5 py-0 h-4 font-semibold", children: users.length })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "analytics", children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsTab, { stats: stats ?? null }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserManagementTab, {}) })
    ] }) })
  ] });
}
export {
  Admin as default
};
