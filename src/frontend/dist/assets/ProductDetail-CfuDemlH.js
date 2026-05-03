import { c as createLucideIcon, K as useParams, a as useNavigate, a0 as useProduct, a1 as useUpdateProductStock, a2 as useDeleteProduct, r as reactExports, j as jsxRuntimeExports, o as Skeleton, P as Package, B as Button, e as ue, t as Card, d as cn, L as Label, I as Input, Z as Trash2 } from "./index-DHdUgTPk.js";
import { P as Pencil, A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-rwy0vuor.js";
import { B as Badge } from "./badge-mQmOdhEj.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-WqVn_Noe.js";
import { C as ChevronLeft } from "./chevron-left-Bw78PDox.js";
import { L as LoaderCircle } from "./loader-circle-D3T1zLWJ.js";
import "./index-W78-Kk_E.js";
import "./chevron-down-CZ7Jrx8h.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
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
function getStockStatus(qty) {
  if (qty <= BigInt(0)) return "out_of_stock";
  if (qty <= BigInt(5)) return "low_stock";
  return "in_stock";
}
function StockBadge({ qty }) {
  const status = getStockStatus(qty);
  if (status === "in_stock")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50 text-xs", children: "In Stock" });
  if (status === "low_stock")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 text-xs", children: "Low Stock" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50 text-xs", children: "Out of Stock" });
}
const PLACEHOLDER_HISTORY = [
  {
    updateId: BigInt(1),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(10),
    newQty: BigInt(22),
    changeReason: "Purchase — New stock arrival",
    changedAt: BigInt(Date.now() - 864e5) * BigInt(1e6)
  },
  {
    updateId: BigInt(2),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(14),
    newQty: BigInt(10),
    changeReason: "Sale — Invoice INV-2024-012",
    changedAt: BigInt(Date.now() - 3 * 864e5) * BigInt(1e6)
  },
  {
    updateId: BigInt(3),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(20),
    newQty: BigInt(14),
    changeReason: "Damaged — Quality check failure",
    changedAt: BigInt(Date.now() - 7 * 864e5) * BigInt(1e6)
  },
  {
    updateId: BigInt(4),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(5),
    newQty: BigInt(20),
    changeReason: "Purchase — Sharma Wholesale Delivery",
    changedAt: BigInt(Date.now() - 14 * 864e5) * BigInt(1e6)
  },
  {
    updateId: BigInt(5),
    productId: BigInt(1),
    productName: "Product",
    previousQty: BigInt(0),
    newQty: BigInt(5),
    changeReason: "Adjustment — Opening stock",
    changedAt: BigInt(Date.now() - 30 * 864e5) * BigInt(1e6)
  }
];
const STOCK_REASONS = [
  "Purchase",
  "Sale",
  "Return",
  "Damaged",
  "Adjustment",
  "Transfer",
  "Other"
];
function DetailRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between py-2.5 border-b border-border/40 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground w-32 shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground text-right flex-1 min-w-0 break-words", children: value })
  ] });
}
function StockHistoryItem({ update }) {
  const diff = Number(update.newQty) - Number(update.previousQty);
  const isIncrease = diff >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2.5 border-b border-border/30 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          isIncrease ? "bg-green-50" : "bg-red-50"
        ),
        children: isIncrease ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { size: 14, className: "text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 14, className: "text-red-600" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: update.changeReason }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
        update.previousQty.toString(),
        " → ",
        update.newQty.toString(),
        " units"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: cn(
            "text-xs font-semibold",
            isIncrease ? "text-green-600" : "text-red-600"
          ),
          children: [
            isIncrease ? "+" : "",
            diff
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: formatDate(update.changedAt) })
    ] })
  ] });
}
function ProductDetail() {
  const { id } = useParams({ from: "/app-layout/inventory/$id" });
  const navigate = useNavigate();
  const productId = BigInt(id ?? "0");
  const { data: product, isLoading } = useProduct(productId);
  const { mutate: updateStock, isPending: updating } = useUpdateProductStock();
  const { mutate: deleteProduct, isPending: deleting } = useDeleteProduct();
  const [newQty, setNewQty] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("Adjustment");
  function handleStockUpdate(e) {
    e.preventDefault();
    if (!newQty || Number.isNaN(Number(newQty))) {
      ue.error("Enter a valid quantity");
      return;
    }
    updateStock(
      { id: productId, newQty: BigInt(Number(newQty)), reason },
      {
        onSuccess: () => {
          ue.success("Stock updated successfully");
          setNewQty("");
        },
        onError: () => ue.error("Failed to update stock")
      }
    );
  }
  function handleDelete() {
    deleteProduct(productId, {
      onSuccess: () => {
        ue.success("Product deleted");
        navigate({ to: "/inventory" });
      },
      onError: () => ue.error("Failed to delete product")
    });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", "data-ocid": "product_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl" })
    ] });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center p-8 text-center pt-16",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 40, className: "text-muted-foreground opacity-40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "mt-3 rounded-xl",
              onClick: () => navigate({ to: "/inventory" }),
              children: "Back to Inventory"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pb-6", "data-ocid": "product_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 bg-card border-b border-border/50 px-4 py-3 flex items-center gap-2 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/inventory" }),
          className: "w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0",
          "data-ocid": "product_detail.back_button",
          "aria-label": "Go back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18, className: "text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-foreground font-display truncate leading-tight", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          "SKU: ",
          product.sku
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "h-8 rounded-xl text-xs gap-1 shrink-0",
          "data-ocid": "product_detail.edit_button",
          onClick: () => ue.info("Edit coming soon"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 12 }),
            "Edit"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 px-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl border-0 shadow-card bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted flex items-center justify-center shrink-0 overflow-hidden", children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Package,
            {
              size: 28,
              className: "text-muted-foreground opacity-50"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StockBadge, { qty: product.quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary mt-1.5", children: [
              "₹",
              formatINR(product.sellingPrice)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "per ",
              product.unit
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: product.quantity.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                product.unit,
                " in stock"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] bg-primary/8 text-primary px-2.5 py-1 rounded-full font-medium", children: product.category }),
          product.barcode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] bg-muted text-muted-foreground px-2.5 py-1 rounded-full", children: [
            "Barcode: ",
            product.barcode
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
        {
          label: "Purchase Price",
          value: `₹${formatINR(product.purchasePrice)}`
        },
        {
          label: "Selling Price",
          value: `₹${formatINR(product.sellingPrice)}`,
          accent: true
        },
        { label: "GST", value: `${product.taxPercent.toString()}%` },
        {
          label: "Margin",
          value: `₹${formatINR(product.sellingPrice - product.purchasePrice)}`
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-3 rounded-xl border-0 shadow-card bg-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "text-sm font-bold mt-0.5",
                  item.accent ? "text-primary" : "text-foreground"
                ),
                children: item.value
              }
            )
          ]
        },
        item.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Product Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Product Name", value: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Category", value: product.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "SKU", value: product.sku }),
        product.barcode && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Barcode", value: product.barcode }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Unit Type", value: product.unit }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailRow,
          {
            label: "Tax (GST)",
            value: `${product.taxPercent.toString()}%`
          }
        ),
        product.supplierName && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Supplier", value: product.supplierName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Added On", value: formatDate(product.createdAt) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Update Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "Current:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              product.quantity.toString(),
              " ",
              product.unit
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleStockUpdate, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-foreground", children: "New Quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: `e.g. ${(Number(product.quantity) + 10).toString()}`,
                value: newQty,
                onChange: (e) => setNewQty(e.target.value),
                className: "rounded-xl bg-muted border-0 h-10",
                "data-ocid": "product_detail.new_qty_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-foreground", children: "Reason" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: reason, onValueChange: setReason, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "rounded-xl bg-muted border-0 h-10",
                  "data-ocid": "product_detail.reason_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STOCK_REASONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full h-10 rounded-xl font-medium",
              disabled: updating || !newQty,
              "data-ocid": "product_detail.update_stock_button",
              children: updating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "mr-2 animate-spin" }),
                "Updating..."
              ] }) : "Update Stock"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 14, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Stock History" })
        ] }),
        PLACEHOLDER_HISTORY.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-4",
            "data-ocid": "product_detail.history_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Clock,
                {
                  size: 24,
                  className: "text-muted-foreground opacity-40 mx-auto mb-1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No stock updates yet" })
            ]
          }
        ) : PLACEHOLDER_HISTORY.slice(0, 5).map((update, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StockHistoryItem,
          {
            update,
            "data-ocid": `product_detail.history_item.${i + 1}`
          },
          update.updateId.toString()
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full h-11 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5 gap-2",
            "data-ocid": "product_detail.delete_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }),
              "Delete Product"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "product_detail.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Product?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This action cannot be undone. All stock history for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: product.name }),
              " ",
              "will be permanently removed."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                className: "rounded-xl",
                "data-ocid": "product_detail.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AlertDialogAction,
              {
                onClick: handleDelete,
                disabled: deleting,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl",
                "data-ocid": "product_detail.confirm_button",
                children: [
                  deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin mr-1" }) : null,
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductDetail as default
};
