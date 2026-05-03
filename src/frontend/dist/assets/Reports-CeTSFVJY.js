import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as cn, l as useInvoices, ah as useExpenses, v as PaymentStatus, o as Skeleton, t as Card, T as TrendingUp, B as Button, m as useProducts } from "./index-DHdUgTPk.js";
import { D as Download } from "./download-B-io6e2F.js";
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
const inr = (paise) => `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
function nsToMs(ns) {
  return Number(ns / BigInt(1e6));
}
function getRangeBounds(range, custom) {
  const now = /* @__PURE__ */ new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  if (range === "this_month")
    return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
  if (range === "last_month")
    return { start: new Date(y, m - 1, 1), end: new Date(y, m, 0, 23, 59, 59) };
  if (range === "last_3")
    return {
      start: new Date(y, m - 2, 1),
      end: new Date(y, m + 1, 0, 23, 59, 59)
    };
  if (range === "this_year")
    return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59) };
  return {
    start: (custom == null ? void 0 : custom.from) ? new Date(custom.from) : new Date(y, m, 1),
    end: (custom == null ? void 0 : custom.to) ? /* @__PURE__ */ new Date(`${custom.to}T23:59:59`) : new Date(y, m + 1, 0, 23, 59, 59)
  };
}
const RANGE_LABELS = {
  this_month: "This Month",
  last_month: "Last Month",
  last_3: "Last 3 Months",
  this_year: "This Year",
  custom: "Custom"
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
  "Dec"
];
function RangeSelector({
  value,
  onChange,
  customFrom,
  customTo,
  onCustomFrom,
  onCustomTo
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: Object.keys(RANGE_LABELS).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(r),
        className: cn(
          "px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-smooth",
          value === r ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"
        ),
        "data-ocid": `reports.range_filter.${r}`,
        children: RANGE_LABELS[r]
      },
      r
    )) }),
    value === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: customFrom,
          onChange: (e) => onCustomFrom(e.target.value),
          className: "flex-1 h-8 text-xs rounded-lg border border-input bg-background px-2 text-foreground",
          "data-ocid": "reports.custom_from.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: customTo,
          onChange: (e) => onCustomTo(e.target.value),
          className: "flex-1 h-8 text-xs rounded-lg border border-input bg-background px-2 text-foreground",
          "data-ocid": "reports.custom_to.input"
        }
      )
    ] })
  ] });
}
function downloadCsv(filename, rows) {
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function PLTab() {
  const [range, setRange] = reactExports.useState("this_month");
  const [customFrom, setCustomFrom] = reactExports.useState("");
  const [customTo, setCustomTo] = reactExports.useState("");
  const {
    data: invData,
    isLoading: loadingInv,
    isFetching: fetchingInv,
    refetch: refetchInv
  } = useInvoices(BigInt(1), BigInt(200));
  const {
    data: expenses,
    isLoading: loadingExp,
    isFetching: fetchingExp,
    refetch: refetchExp
  } = useExpenses();
  reactExports.useEffect(() => {
    refetchInv();
    refetchExp();
  }, [refetchInv, refetchExp]);
  const bounds = getRangeBounds(range, { from: customFrom, to: customTo });
  const filteredInvoices = ((invData == null ? void 0 : invData.items) ?? []).filter((inv) => {
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
    0
  );
  const totalExpenses = filteredExpenses.reduce(
    (s, exp) => s + Number(exp.amount),
    0
  );
  const netPL = totalRevenue - totalExpenses;
  const monthlyMap = (() => {
    const map = /* @__PURE__ */ new Map();
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
    return Array.from(map.entries()).sort(([a], [b]) => b.localeCompare(a)).map(([key, val]) => {
      const [yr, mo] = key.split("-");
      return {
        label: `${MONTH_NAMES[Number(mo) - 1]} ${yr}`,
        ...val,
        net: val.revenue - val.expenses
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
        (r.net / 100).toFixed(2)
      ]),
      [
        "TOTAL",
        (totalRevenue / 100).toFixed(2),
        (totalExpenses / 100).toFixed(2),
        (netPL / 100).toFixed(2)
      ]
    ];
    downloadCsv("pl_report.csv", rows);
  }
  const loading = loadingInv || loadingExp || fetchingInv || fetchingExp;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.pl.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RangeSelector,
      {
        value: range,
        onChange: setRange,
        customFrom,
        customTo,
        onCustomFrom: setCustomFrom,
        onCustomTo: setCustomTo
      }
    ),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "reports.pl.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Loading fresh data…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-2xl" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-primary mt-1 leading-tight", children: inr(totalRevenue) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium", children: "Expenses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-destructive mt-1 leading-tight", children: inr(totalExpenses) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: cn(
              "p-3 shadow-card rounded-2xl border-0",
              netPL >= 0 ? "bg-emerald-50" : "bg-red-50"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium", children: "Net P&L" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: cn(
                    "font-display font-bold text-sm mt-1 leading-tight flex items-center gap-0.5",
                    netPL >= 0 ? "text-emerald-600" : "text-red-500"
                  ),
                  children: [
                    netPL >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12 }),
                    inr(Math.abs(netPL))
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Monthly Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 px-2 text-[11px] rounded-lg",
                onClick: () => window.print(),
                "data-ocid": "reports.pl.print_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 12, className: "mr-1" }),
                  " Print"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 px-2 text-[11px] rounded-lg",
                onClick: exportCSV,
                "data-ocid": "reports.pl.csv_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 12, className: "mr-1" }),
                  " CSV"
                ]
              }
            )
          ] })
        ] }),
        monthlyMap.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-8 text-center",
            "data-ocid": "reports.pl.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No data for selected period" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-semibold text-muted-foreground", children: "Month" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-semibold text-muted-foreground", children: "Revenue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-semibold text-muted-foreground", children: "Expenses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-semibold text-muted-foreground", children: "Net P&L" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            monthlyMap.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-t border-border/40",
                "data-ocid": `reports.pl.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground", children: row.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right text-primary font-semibold", children: inr(row.revenue) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right text-destructive", children: inr(row.expenses) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "td",
                    {
                      className: cn(
                        "px-4 py-2.5 text-right font-bold",
                        row.net >= 0 ? "text-emerald-600" : "text-red-500"
                      ),
                      children: [
                        row.net >= 0 ? "+" : "-",
                        inr(Math.abs(row.net))
                      ]
                    }
                  )
                ]
              },
              row.label
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-bold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-bold text-primary", children: inr(totalRevenue) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-bold text-destructive", children: inr(totalExpenses) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: cn(
                    "px-4 py-2.5 text-right font-bold",
                    netPL >= 0 ? "text-emerald-600" : "text-red-500"
                  ),
                  children: [
                    netPL >= 0 ? "+" : "-",
                    inr(Math.abs(netPL))
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function GSTTab() {
  const [range, setRange] = reactExports.useState("this_month");
  const [customFrom, setCustomFrom] = reactExports.useState("");
  const [customTo, setCustomTo] = reactExports.useState("");
  const { data: invData, isLoading } = useInvoices(BigInt(1), BigInt(200));
  const bounds = getRangeBounds(range, { from: customFrom, to: customTo });
  const filtered = reactExports.useMemo(() => {
    return ((invData == null ? void 0 : invData.items) ?? []).filter((inv) => {
      const d = new Date(nsToMs(inv.createdAt));
      return d >= bounds.start && d <= bounds.end;
    }).sort((a, b) => Number(b.createdAt - a.createdAt));
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
        "Invoice Total"
      ],
      ...filtered.map((inv) => [
        inv.invoiceNumber,
        new Date(nsToMs(inv.createdAt)).toLocaleDateString("en-IN"),
        inv.customerName,
        (Number(inv.subtotal) / 100).toFixed(2),
        (Number(inv.cgst) / 100).toFixed(2),
        (Number(inv.sgst) / 100).toFixed(2),
        ((Number(inv.cgst) + Number(inv.sgst)) / 100).toFixed(2),
        (Number(inv.total) / 100).toFixed(2)
      ]),
      [
        "TOTAL",
        "",
        "",
        (totalTaxable / 100).toFixed(2),
        (totalCgst / 100).toFixed(2),
        (totalSgst / 100).toFixed(2),
        (totalGst / 100).toFixed(2),
        ""
      ]
    ];
    downloadCsv("gstr1_report.csv", rows);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.gst.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RangeSelector,
      {
        value: range,
        onChange: setRange,
        customFrom,
        customTo,
        onCustomFrom: setCustomFrom,
        onCustomTo: setCustomTo
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Taxable Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground mt-1", children: inr(totalTaxable) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Total GST" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-primary mt-1", children: inr(totalGst) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "CGST (9%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground mt-1", children: inr(totalCgst) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 shadow-card rounded-2xl border-0 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "SGST (9%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground mt-1", children: inr(totalSgst) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "GSTR-1 Invoice List" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 px-2 text-[11px] rounded-lg",
                onClick: () => window.print(),
                "data-ocid": "reports.gst.print_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 12, className: "mr-1" }),
                  " Print"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 px-2 text-[11px] rounded-lg",
                onClick: exportCSV,
                "data-ocid": "reports.gst.csv_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 12, className: "mr-1" }),
                  " CSV"
                ]
              }
            )
          ] })
        ] }),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-8 text-center",
            "data-ocid": "reports.gst.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No invoices for selected period" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-semibold text-muted-foreground whitespace-nowrap", children: "Inv No." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-2 font-semibold text-muted-foreground whitespace-nowrap", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-2 font-semibold text-muted-foreground", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-2 py-2 font-semibold text-muted-foreground whitespace-nowrap", children: "Taxable" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-2 py-2 font-semibold text-muted-foreground", children: "CGST" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-2 py-2 font-semibold text-muted-foreground", children: "SGST" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-semibold text-muted-foreground whitespace-nowrap", children: "Total" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            filtered.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-t border-border/40",
                "data-ocid": `reports.gst.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-primary whitespace-nowrap", children: inv.invoiceNumber }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-muted-foreground whitespace-nowrap", children: new Date(nsToMs(inv.createdAt)).toLocaleDateString(
                    "en-IN",
                    { day: "2-digit", month: "short" }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-foreground max-w-[80px] truncate", children: inv.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-right text-foreground", children: inr(Number(inv.subtotal)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-right text-foreground", children: inr(Number(inv.cgst)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-right text-foreground", children: inr(Number(inv.sgst)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-semibold text-foreground", children: inr(Number(inv.total)) })
                ]
              },
              inv.invoiceId.toString()
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/30 font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", colSpan: 3, children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-right text-foreground", children: inr(totalTaxable) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-right text-foreground", children: inr(totalCgst) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-right text-foreground", children: inr(totalSgst) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right text-primary", children: inr(totalGst) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function StockTab() {
  const { data: prodData, isLoading } = useProducts(BigInt(1), BigInt(200));
  const products = (prodData == null ? void 0 : prodData.items) ?? [];
  const totalInventoryValue = products.reduce(
    (s, p) => s + Number(p.quantity) * Number(p.sellingPrice),
    0
  );
  function exportCSV() {
    const rows = [
      [
        "Product Name",
        "Category",
        "Stock",
        "Unit",
        "Selling Price (INR)",
        "Stock Value (INR)"
      ],
      ...products.map((p) => [
        p.name,
        p.category,
        p.quantity.toString(),
        p.unit,
        (Number(p.sellingPrice) / 100).toFixed(2),
        (Number(p.quantity) * Number(p.sellingPrice) / 100).toFixed(2)
      ]),
      ["TOTAL", "", "", "", "", (totalInventoryValue / 100).toFixed(2)]
    ];
    downloadCsv("stock_summary.csv", rows);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "reports.stock.section", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Stock Summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2 text-[11px] rounded-lg",
            onClick: () => window.print(),
            "data-ocid": "reports.stock.print_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 12, className: "mr-1" }),
              " Print"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2 text-[11px] rounded-lg",
            onClick: exportCSV,
            "data-ocid": "reports.stock.csv_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 12, className: "mr-1" }),
              " CSV"
            ]
          }
        )
      ] })
    ] }),
    products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-4 py-8 text-center",
        "data-ocid": "reports.stock.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No products found" })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-semibold text-muted-foreground", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-2 font-semibold text-muted-foreground", children: "Cat." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-2 py-2 font-semibold text-muted-foreground", children: "Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-2 py-2 font-semibold text-muted-foreground", children: "Unit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-2 py-2 font-semibold text-muted-foreground", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-semibold text-muted-foreground", children: "Value" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        products.map((p, i) => {
          const stockVal = Number(p.quantity) * Number(p.sellingPrice);
          const lowStock = Number(p.quantity) <= 5;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-border/40",
              "data-ocid": `reports.stock.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground max-w-[120px] truncate", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-muted-foreground", children: p.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: cn(
                      "px-2 py-2.5 text-right font-semibold",
                      lowStock ? "text-red-500" : "text-foreground"
                    ),
                    children: p.quantity.toString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-muted-foreground", children: p.unit }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-right text-foreground", children: inr(Number(p.sellingPrice)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-semibold text-primary", children: inr(stockVal) })
              ]
            },
            p.productId.toString()
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "px-4 py-2.5 font-bold text-foreground",
              colSpan: 5,
              children: "Total Inventory Value"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-bold text-primary", children: inr(totalInventoryValue) })
        ] })
      ] })
    ] }) })
  ] }) });
}
const TABS = [
  { id: "pl", label: "P&L Report" },
  { id: "gst", label: "GST (GSTR-1)" },
  { id: "stock", label: "Stock Summary" }
];
function Reports() {
  const [tab, setTab] = reactExports.useState("pl");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pb-4", "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Business analytics & GST summaries" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex border-b border-border/50 bg-card",
        "data-ocid": "reports.tab_bar",
        children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setTab(t.id),
            className: cn(
              "flex-1 py-3 text-[12px] font-semibold transition-smooth border-b-2",
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            ),
            "data-ocid": `reports.tab.${t.id}`,
            children: t.label
          },
          t.id
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4", children: [
      tab === "pl" && /* @__PURE__ */ jsxRuntimeExports.jsx(PLTab, {}),
      tab === "gst" && /* @__PURE__ */ jsxRuntimeExports.jsx(GSTTab, {}),
      tab === "stock" && /* @__PURE__ */ jsxRuntimeExports.jsx(StockTab, {})
    ] })
  ] });
}
export {
  Reports as default
};
