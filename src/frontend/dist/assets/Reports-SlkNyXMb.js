import { c as createLucideIcon, k as useDashboardStats, r as reactExports, j as jsxRuntimeExports, T as TrendingUp, C as ChartColumn, U as Users, P as Package, F as FileText, d as cn, X, B as Button, e as ue } from "./index-BOl89Uzk.js";
import { C as Card } from "./card-CX7VVhkd.js";
import { I as Input } from "./input-B5w0Q6J7.js";
import { L as Label } from "./label-BFAcOAgF.js";
import { I as IndianRupee } from "./indian-rupee-B7FCt2Py.js";
import { D as Download } from "./download-DICvaxtc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode$2);
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
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100
  );
}
const REPORT_TYPES = [
  {
    label: "Daily Sales",
    icon: IndianRupee,
    desc: "Today's detailed transactions",
    color: "text-primary",
    bg: "bg-primary/10",
    chartType: "bar"
  },
  {
    label: "Monthly Sales",
    icon: TrendingUp,
    desc: "Month-wise revenue breakdown",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    chartType: "bar"
  },
  {
    label: "Profit & Loss",
    icon: ChartColumn,
    desc: "Income vs. expenses analysis",
    color: "text-purple-600",
    bg: "bg-purple-50",
    chartType: "mixed"
  },
  {
    label: "Expense Report",
    icon: TrendingDown,
    desc: "All business expenses tracked",
    color: "text-red-500",
    bg: "bg-red-50",
    chartType: "pie"
  },
  {
    label: "Customer Outstanding",
    icon: Users,
    desc: "Pending dues by customer",
    color: "text-amber-600",
    bg: "bg-amber-50",
    chartType: "bar"
  },
  {
    label: "Stock Report",
    icon: Package,
    desc: "Inventory valuation & movement",
    color: "text-blue-600",
    bg: "bg-blue-50",
    chartType: "bar"
  },
  {
    label: "Tax Report",
    icon: FileText,
    desc: "CGST / SGST / IGST summary",
    color: "text-teal-600",
    bg: "bg-teal-50",
    chartType: "bar"
  },
  {
    label: "Payment Report",
    icon: IndianRupee,
    desc: "All received & due payments",
    color: "text-green-600",
    bg: "bg-green-50",
    chartType: "bar"
  }
];
const WEEKLY_DATA = [
  { day: "Mon", val: 18500 },
  { day: "Tue", val: 22400 },
  { day: "Wed", val: 17800 },
  { day: "Thu", val: 28450 },
  { day: "Fri", val: 31200 },
  { day: "Sat", val: 42800 },
  { day: "Sun", val: 15600 }
];
const EXPENSE_DATA = [
  { label: "Rent", val: 18e3, color: "bg-red-400" },
  { label: "Salary", val: 45e3, color: "bg-amber-400" },
  { label: "Transport", val: 8500, color: "bg-blue-400" },
  { label: "Electricity", val: 4200, color: "bg-purple-400" },
  { label: "Other", val: 6300, color: "bg-muted-foreground/50" }
];
function BarMiniChart({ data }) {
  const max = Math.max(...data.map((d) => d.val));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between gap-1 h-20 mt-3", children: data.map((d, i) => {
    const pct = d.val / max * 100;
    const isHighest = d.val === max;
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static chart bars
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-full rounded-t-md transition-smooth",
              isHighest ? "bg-primary" : "bg-primary/25"
            ),
            style: { height: `${pct}%`, minHeight: "6px" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-[9px] font-medium",
              isHighest ? "text-primary" : "text-muted-foreground"
            ),
            children: d.day
          }
        )
      ] }, i)
    );
  }) });
}
function PieDonut({
  data
}) {
  const total = data.reduce((s, d) => s + d.val, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: data.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-2.5 h-2.5 rounded-full shrink-0", d.color) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground", children: d.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
        (d.val / total * 100).toFixed(0),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn("h-full rounded-full", d.color),
        style: { width: `${d.val / total * 100}%` }
      }
    ) })
  ] }, d.label)) });
}
function ReportSheet({ report, onClose }) {
  const [dateFrom, setDateFrom] = reactExports.useState("2026-04-01");
  const [dateTo, setDateTo] = reactExports.useState("2026-04-30");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex flex-col justify-end bg-foreground/30 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "absolute inset-0",
        onClick: onClose,
        "aria-label": "Close",
        tabIndex: -1
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4 max-h-[85vh] overflow-y-auto",
        "data-ocid": "reports.report_detail.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    report.bg
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(report.icon, { size: 20, className: report.color })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground", children: report.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: report.desc })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
                "aria-label": "Close",
                "data-ocid": "reports.report_detail.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 10 }),
                "From"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: dateFrom,
                  onChange: (e) => setDateFrom(e.target.value),
                  className: "h-9 rounded-xl text-sm",
                  "data-ocid": "reports.filter.date_from.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 10 }),
                "To"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: dateTo,
                  onChange: (e) => setDateTo(e.target.value),
                  className: "h-9 rounded-xl text-sm",
                  "data-ocid": "reports.filter.date_to.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-background mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
                report.label,
                " — Sample Data"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Apr 2026" })
            ] }),
            report.chartType === "pie" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PieDonut, { data: EXPENSE_DATA }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BarMiniChart, { data: WEEKLY_DATA }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-3 text-center", children: [
              "₹",
              new Intl.NumberFormat("en-IN").format(
                WEEKLY_DATA.reduce((s, d) => s + d.val, 0)
              ),
              " ",
              "total this week"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "h-10 rounded-xl flex flex-col gap-0.5 text-[10px] font-semibold border-border py-2",
                onClick: () => ue.success("PDF export coming soon!"),
                "data-ocid": "reports.export_pdf_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14, className: "text-red-500" }),
                  "PDF"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "h-10 rounded-xl flex flex-col gap-0.5 text-[10px] font-semibold border-border py-2",
                onClick: () => ue.success("Excel export coming soon!"),
                "data-ocid": "reports.export_excel_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 14, className: "text-emerald-600" }),
                  "Excel"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "h-10 rounded-xl flex flex-col gap-0.5 text-[10px] font-semibold border-border py-2",
                onClick: () => ue.success("Print coming soon!"),
                "data-ocid": "reports.print_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 14, className: "text-blue-600" }),
                  "Print"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Reports() {
  const { data: stats } = useDashboardStats();
  const [activeReport, setActiveReport] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-4", "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Business analytics & summaries" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 grid grid-cols-2 gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Monthly Revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-primary mt-1", children: [
          "₹",
          formatINR((stats == null ? void 0 : stats.monthlySales) ?? BigInt(0))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-emerald-600 mt-0.5", children: "↑ +8% vs last month" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Outstanding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-amber-600 mt-1", children: [
          "₹",
          formatINR((stats == null ? void 0 : stats.outstandingPayments) ?? BigInt(0))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Pending collection" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Weekly Sales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "This Week" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BarMiniChart, { data: WEEKLY_DATA }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-2 pt-2 border-t border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
          "₹",
          new Intl.NumberFormat("en-IN").format(
            WEEKLY_DATA.reduce((s, d) => s + d.val, 0)
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Available Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: REPORT_TYPES.map((report, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "shadow-card rounded-2xl border-0 bg-card p-4 cursor-pointer hover:shadow-elevated transition-smooth active:scale-[0.98]",
          onClick: () => setActiveReport(report),
          "data-ocid": `reports.report_item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                  report.bg
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(report.icon, { size: 20, className: report.color })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: report.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1 leading-tight", children: report.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 11, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary font-medium", children: "View Report" })
            ] })
          ]
        },
        report.label
      )) })
    ] }),
    activeReport && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportSheet,
      {
        report: activeReport,
        onClose: () => setActiveReport(null)
      }
    )
  ] });
}
export {
  Reports as default
};
