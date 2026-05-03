import { r as reactExports, m as useProducts, j as jsxRuntimeExports, x as Search, I as Input, B as Button, q as Link, s as Plus, o as Skeleton, t as Card, P as Package, d as cn, X } from "./index-DHdUgTPk.js";
import { B as Badge } from "./badge-mQmOdhEj.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-CmO9P3hJ.js";
import { u as useQRScanner } from "./qr-shim-Iy8OSzR0.js";
import { C as Camera } from "./camera-DOAGrYmw.js";
import { T as TriangleAlert } from "./triangle-alert-C_yx-y4S.js";
import { C as ChevronRight } from "./chevron-right-C1O50DUP.js";
import "./index-W78-Kk_E.js";
function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100
  );
}
function getStockStatus(qty) {
  if (qty <= BigInt(0)) return "out_of_stock";
  if (qty <= BigInt(5)) return "low_stock";
  return "in_stock";
}
function StockBadge({ qty }) {
  const status = getStockStatus(qty);
  if (status === "in_stock")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50 text-[10px] px-1.5 py-0.5 font-medium", children: "In Stock" });
  if (status === "low_stock")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 text-[10px] px-1.5 py-0.5 font-medium", children: "Low Stock" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50 text-[10px] px-1.5 py-0.5 font-medium", children: "Out of Stock" });
}
const PLACEHOLDER_PRODUCTS = [
  {
    productId: BigInt(1),
    name: "Raymond Suit Fabric (3m)",
    sku: "CLT-001",
    category: "Clothing",
    purchasePrice: BigInt(18e4),
    sellingPrice: BigInt(245e3),
    quantity: BigInt(22),
    unit: "Pcs",
    taxPercent: BigInt(12),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(2),
    name: "Everest Garam Masala (100g)",
    sku: "SPC-001",
    category: "Food & Spices",
    purchasePrice: BigInt(4500),
    sellingPrice: BigInt(6500),
    quantity: BigInt(3),
    unit: "Pcs",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(3),
    name: "Lakme 9to5 Lipstick",
    sku: "CSM-001",
    category: "Cosmetics",
    purchasePrice: BigInt(37e3),
    sellingPrice: BigInt(49900),
    quantity: BigInt(0),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(4),
    name: "boAt Airdopes 141 TWS",
    sku: "ELC-001",
    category: "Electronics",
    purchasePrice: BigInt(119900),
    sellingPrice: BigInt(149900),
    quantity: BigInt(14),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(5),
    name: "Fabindia Kurta (XL)",
    sku: "CLT-002",
    category: "Clothing",
    purchasePrice: BigInt(89e3),
    sellingPrice: BigInt(119500),
    quantity: BigInt(4),
    unit: "Pcs",
    taxPercent: BigInt(12),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(6),
    name: "MDH Sabzi Masala (500g)",
    sku: "SPC-002",
    category: "Food & Spices",
    purchasePrice: BigInt(8500),
    sellingPrice: BigInt(12e3),
    quantity: BigInt(31),
    unit: "Pcs",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(7),
    name: "Biotique Bio Honey Gel",
    sku: "CSM-002",
    category: "Cosmetics",
    purchasePrice: BigInt(14e3),
    sellingPrice: BigInt(18900),
    quantity: BigInt(2),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(8),
    name: "Realme Buds Air 3",
    sku: "ELC-002",
    category: "Electronics",
    purchasePrice: BigInt(159900),
    sellingPrice: BigInt(199900),
    quantity: BigInt(9),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  }
];
function StatCard({
  label,
  value,
  iconClass
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex-1 p-3 rounded-2xl border-0 shadow-card bg-card min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm font-bold truncate", iconClass), children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: label })
  ] });
}
function BarcodeScannerModal({
  onClose,
  onScan
}) {
  const {
    qrResults,
    error,
    isLoading,
    startScanning,
    videoRef,
    canvasRef
  } = useQRScanner();
  const handleUse = () => {
    if (qrResults.length > 0) {
      onScan(qrResults[0].data);
      onClose();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4",
      "data-ocid": "inventory.scanner_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[400px] bg-card rounded-2xl overflow-hidden shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Scan Barcode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-7 h-7 rounded-full bg-muted flex items-center justify-center",
              "data-ocid": "inventory.scanner_close_button",
              "aria-label": "Close scanner",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-black aspect-square", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: videoRef,
              style: { width: "100%", height: "100%", objectFit: "cover" },
              playsInline: true,
              muted: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, style: { display: "none" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-48 border-2 border-primary rounded-xl opacity-80" }) }),
          isLoading,
          error
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 border border-green-200 rounded-xl px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-700 font-medium truncate", children: [
            "✓ ",
            qrResults[0].data
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 rounded-xl",
                onClick: startScanning,
                disabled: true,
                "data-ocid": "inventory.scanner_start_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 15, className: "mr-1.5" }),
                  "Start Scanning"
                ]
              }
            ),
            qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 rounded-xl",
                onClick: handleUse,
                "data-ocid": "inventory.scanner_confirm_button",
                children: "Use Code"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function Inventory() {
  const [search, setSearch] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("all");
  const [scannerOpen, setScannerOpen] = reactExports.useState(false);
  const { data, isLoading } = useProducts();
  const products = (data == null ? void 0 : data.items) ?? PLACEHOLDER_PRODUCTS;
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.quantity <= BigInt(0)).length;
  const lowStock = products.filter(
    (p) => p.quantity > BigInt(0) && p.quantity <= BigInt(5)
  ).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.sellingPrice * p.quantity,
    BigInt(0)
  );
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const status = getStockStatus(p.quantity);
    const matchTab = tab === "all" || tab === "in_stock" && status === "in_stock" || tab === "low_stock" && status === "low_stock" || tab === "out_of_stock" && status === "out_of_stock";
    return matchSearch && matchTab;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-4", "data-ocid": "inventory.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 grid grid-cols-4 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total",
          value: totalProducts.toString(),
          iconClass: "text-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Out of Stock",
          value: outOfStock.toString(),
          iconClass: "text-red-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Low Stock",
          value: lowStock.toString(),
          iconClass: "text-amber-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Value",
          value: `₹${formatINR(inventoryValue)}`,
          iconClass: "text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-30 bg-background/95 backdrop-blur-sm px-4 pt-1 pb-2 border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 16,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search products, SKU...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 h-10 rounded-xl bg-muted border-0",
            "data-ocid": "inventory.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setScannerOpen(true),
          className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-smooth hover:bg-primary/20",
          "data-ocid": "inventory.scan_barcode_button",
          "aria-label": "Scan barcode",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 18, className: "text-primary" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: tab, onValueChange: setTab, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "w-full rounded-xl bg-muted h-9", children: [
      { value: "all", label: "All" },
      { value: "in_stock", label: "In Stock" },
      { value: "low_stock", label: "Low" },
      { value: "out_of_stock", label: "Out" }
    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsTrigger,
      {
        value: t.value,
        className: "flex-1 rounded-lg text-xs",
        "data-ocid": `inventory.${t.value}_tab`,
        children: t.label
      },
      t.value
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        filtered.length,
        " product",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8 rounded-xl text-xs gap-1", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/inventory/new", "data-ocid": "inventory.add_product_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Add Product"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-2", children: isLoading ? Array.from({ length: 5 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)
    )) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-8 text-center shadow-card rounded-2xl border-0 bg-card",
        "data-ocid": "inventory.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Package,
            {
              size: 32,
              className: "text-muted-foreground mx-auto mb-2 opacity-40"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "mt-3 rounded-xl", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/inventory/new", children: "Add Product" }) })
        ]
      }
    ) : filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden",
        "data-ocid": `inventory.product_item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/inventory/$id",
            params: { id: product.productId.toString() },
            className: "flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden", children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 18, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate leading-tight", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
                  product.sku,
                  " · ",
                  product.category
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    product.quantity.toString(),
                    " ",
                    product.unit
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StockBadge, { qty: product.quantity }),
                  getStockStatus(product.quantity) === "low_stock" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12, className: "text-amber-500" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                  "₹",
                  formatINR(product.sellingPrice)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                  "per ",
                  product.unit
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronRight,
                {
                  size: 16,
                  className: "text-muted-foreground ml-1 shrink-0"
                }
              )
            ]
          }
        )
      },
      product.productId.toString()
    )) }),
    scannerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BarcodeScannerModal,
      {
        onClose: () => setScannerOpen(false),
        onScan: (code) => setSearch(code)
      }
    )
  ] });
}
export {
  Inventory as default
};
