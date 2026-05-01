import { r as reactExports, l as useInvoices, I as InvoiceStatus, j as jsxRuntimeExports, s as Search, d as cn, T as TrendingUp, B as Button, L as Link, p as Plus, F as FileText, S as Skeleton, q as PaymentStatus } from "./index-BOl89Uzk.js";
import { B as Badge } from "./badge-BaYXkJRd.js";
import { C as Card } from "./card-CX7VVhkd.js";
import { I as Input } from "./input-B5w0Q6J7.js";
import { C as ChevronRight } from "./chevron-right-0zun3EdD.js";
function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100
  );
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function invoiceStatusConfig(status) {
  if (status === InvoiceStatus.Paid)
    return {
      label: "Paid",
      className: "bg-green-50 text-green-700 border-green-200"
    };
  if (status === InvoiceStatus.Sent)
    return {
      label: "Sent",
      className: "bg-blue-50 text-blue-700 border-blue-200"
    };
  return {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border"
  };
}
function paymentStatusConfig(status) {
  if (status === PaymentStatus.Paid)
    return {
      label: "Paid",
      className: "bg-green-50 text-green-700 border-green-200"
    };
  if (status === PaymentStatus.Partial_)
    return {
      label: "Partial",
      className: "bg-amber-50 text-amber-700 border-amber-200"
    };
  return {
    label: "Unpaid",
    className: "bg-red-50 text-red-700 border-red-200"
  };
}
const TABS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" }
];
function InvoiceCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 shadow-card flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-11 rounded-xl shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 rounded-lg" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
    ] })
  ] });
}
function Bills() {
  const [search, setSearch] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("all");
  const { data, isLoading } = useInvoices();
  const invoices = (data == null ? void 0 : data.items) ?? [];
  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase();
    const matchSearch = inv.customerName.toLowerCase().includes(q) || inv.invoiceNumber.toLowerCase().includes(q);
    const matchTab = tab === "all" || tab === "paid" && inv.status === InvoiceStatus.Paid || tab === "sent" && inv.status === InvoiceStatus.Sent || tab === "draft" && inv.status === InvoiceStatus.Draft;
    return matchSearch && matchTab;
  });
  const tabCounts = {
    all: invoices.length,
    draft: invoices.filter((i) => i.status === InvoiceStatus.Draft).length,
    sent: invoices.filter((i) => i.status === InvoiceStatus.Sent).length,
    paid: invoices.filter((i) => i.status === InvoiceStatus.Paid).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-24", "data-ocid": "bills.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 pt-3 pb-3 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 15,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by customer or invoice #...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 h-10 rounded-xl bg-muted border-0 text-sm",
            "data-ocid": "bills.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: TABS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setTab(value),
          className: cn(
            "flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-smooth flex items-center justify-center gap-1",
            tab === value ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
          ),
          "data-ocid": `bills.${value}_tab`,
          children: [
            label,
            tabCounts[value] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[10px] rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center font-bold",
                  tab === value ? "bg-primary-foreground/20" : "bg-border"
                ),
                children: tabCounts[value]
              }
            )
          ]
        },
        value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex gap-1 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 12 }),
        " Loading invoices..."
      ] }) : `${filtered.length} invoice${filtered.length !== 1 ? "s" : ""}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          className: "h-8 rounded-xl text-xs gap-1 bg-primary hover:bg-primary/90 shadow-sm",
          asChild: true,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bills/new", "data-ocid": "bills.new_invoice_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
            " New Invoice"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-2.5", children: isLoading ? Array.from({ length: 5 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
      /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceCardSkeleton, {}, i)
    )) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-10 text-center shadow-card rounded-2xl border-0 bg-card mt-4",
        "data-ocid": "bills.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 28, className: "text-primary opacity-60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: search ? "No invoices found" : "No invoices yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: search ? "Try adjusting your search or filters" : "Create your first invoice to get started" }),
          !search && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "rounded-xl gap-1", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bills/new", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
            " Create Invoice"
          ] }) })
        ]
      }
    ) : filtered.map((inv, i) => {
      const invStatus = invoiceStatusConfig(inv.status);
      const payStatus = paymentStatusConfig(inv.paymentStatus);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden",
          "data-ocid": `bills.invoice_item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/bills/$id",
              params: { id: inv.invoiceId.toString() },
              className: "flex items-center gap-3 px-4 py-3.5 hover:bg-muted/20 active:bg-muted/40 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                      inv.status === InvoiceStatus.Paid ? "bg-green-50" : inv.status === InvoiceStatus.Sent ? "bg-blue-50" : "bg-muted"
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      FileText,
                      {
                        size: 18,
                        className: cn(
                          inv.status === InvoiceStatus.Paid ? "text-green-600" : inv.status === InvoiceStatus.Sent ? "text-blue-600" : "text-muted-foreground"
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: inv.customerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: cn(
                          "text-[10px] px-1.5 py-0 h-4 shrink-0 border",
                          invStatus.className
                        ),
                        children: invStatus.label
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                    inv.invoiceNumber,
                    " · ",
                    formatDate(inv.createdAt)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 flex flex-col items-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                    "₹",
                    formatINR(inv.total)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-[10px] px-1.5 py-0 h-4 border",
                        payStatus.className
                      ),
                      children: payStatus.label
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronRight,
                  {
                    size: 15,
                    className: "text-muted-foreground ml-1 shrink-0"
                  }
                )
              ]
            }
          )
        },
        inv.invoiceId.toString()
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-20 right-4 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bills/new", "data-ocid": "bills.fab_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "w-14 h-14 bg-primary text-primary-foreground rounded-2xl shadow-elevated flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-smooth",
        "aria-label": "Create new invoice",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 24 })
      }
    ) }) })
  ] });
}
export {
  Bills as default
};
