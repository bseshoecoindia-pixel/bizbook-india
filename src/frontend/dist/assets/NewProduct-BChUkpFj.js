import { c as createLucideIcon, a as useNavigate, _ as useCreateProduct, r as reactExports, j as jsxRuntimeExports, t as Card, L as Label, B as Button, I as Input, e as ue, $ as ExternalBlob, X } from "./index-DHdUgTPk.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-WqVn_Noe.js";
import { u as useQRScanner } from "./qr-shim-Iy8OSzR0.js";
import { C as ChevronLeft } from "./chevron-left-Bw78PDox.js";
import { L as LoaderCircle } from "./loader-circle-D3T1zLWJ.js";
import { C as Camera } from "./camera-DOAGrYmw.js";
import "./index-W78-Kk_E.js";
import "./chevron-down-CZ7Jrx8h.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
];
const Scan = createLucideIcon("scan", __iconNode);
const CATEGORIES = [
  "Clothing",
  "Food & Spices",
  "Cosmetics",
  "Electronics",
  "Stationery",
  "Other"
];
const UNITS = ["Pcs", "Kg", "Litre", "Box", "Pack", "Set"];
const SKU_PREFIXES = {
  Clothing: "CLT",
  "Food & Spices": "SPC",
  Cosmetics: "CSM",
  Electronics: "ELC",
  Stationery: "STN",
  Other: "OTH"
};
function generateSKU(category) {
  const prefix = SKU_PREFIXES[category] ?? "PRD";
  return `${prefix}-${Date.now().toString().slice(-4)}`;
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
      "data-ocid": "new_product.scanner_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[400px] bg-card rounded-2xl overflow-hidden shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Scan Barcode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-7 h-7 rounded-full bg-muted flex items-center justify-center",
              "data-ocid": "new_product.scanner_close_button",
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
                "data-ocid": "new_product.scanner_start_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 15, className: "mr-1.5" }),
                  "Start"
                ]
              }
            ),
            qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 rounded-xl",
                onClick: handleUse,
                "data-ocid": "new_product.scanner_confirm_button",
                children: "Use Code"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
    ] }),
    children
  ] });
}
function NewProduct() {
  const navigate = useNavigate();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const fileInputRef = reactExports.useRef(null);
  const [scannerOpen, setScannerOpen] = reactExports.useState(false);
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [form, setForm] = reactExports.useState({
    name: "",
    category: "",
    sku: "",
    barcode: "",
    purchasePrice: "",
    sellingPrice: "",
    quantity: "",
    unit: "Pcs",
    taxPercent: "18",
    supplierName: ""
  });
  const [skuAuto, setSkuAuto] = reactExports.useState(true);
  function update(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "category" && skuAuto) {
        next.sku = generateSKU(value);
      }
      return next;
    });
  }
  function handleImageChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setImagePreview((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category || !form.sellingPrice || !form.quantity) {
      ue.error("Please fill all required fields");
      return;
    }
    let imageUrl;
    if (imageFile) {
      try {
        const bytes = new Uint8Array(await imageFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
          (pct) => setUploadProgress(pct)
        );
        imageUrl = blob.getDirectURL();
      } catch {
        ue.error("Image upload failed — saving without image");
      }
    }
    const input = {
      name: form.name.trim(),
      category: form.category,
      sku: form.sku.trim() || generateSKU(form.category),
      barcode: form.barcode.trim() || void 0,
      purchasePrice: BigInt(
        Math.round(Number(form.purchasePrice || "0") * 100)
      ),
      sellingPrice: BigInt(Math.round(Number(form.sellingPrice) * 100)),
      quantity: BigInt(Number(form.quantity) || 0),
      unit: form.unit,
      taxPercent: BigInt(Number(form.taxPercent) || 18),
      supplierName: form.supplierName.trim() || void 0,
      imageUrl
    };
    createProduct(input, {
      onSuccess: () => {
        ue.success("Product added successfully");
        navigate({ to: "/inventory" });
      },
      onError: () => ue.error("Failed to add product. Please try again.")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pb-6", "data-ocid": "new_product.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 bg-card border-b border-border/50 px-4 py-3 flex items-center gap-3 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/inventory" }),
          className: "w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0",
          "data-ocid": "new_product.back_button",
          "aria-label": "Go back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18, className: "text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-foreground font-display leading-tight", children: "Add Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Fill in the product details" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 px-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-foreground mb-2.5 block", children: "Product Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              className: "w-20 h-20 rounded-2xl bg-muted border border-dashed border-border flex items-center justify-center overflow-hidden shrink-0",
              "data-ocid": "new_product.image_dropzone",
              "aria-label": "Upload product image",
              children: imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imagePreview,
                  alt: "Preview",
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImagePlus,
                {
                  size: 24,
                  className: "text-muted-foreground opacity-50"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "rounded-xl w-full text-xs",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                "data-ocid": "new_product.image_upload_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { size: 14, className: "mr-1.5" }),
                  imageFile ? "Change Image" : "Upload Image"
                ]
              }
            ),
            uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 bg-muted rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-primary h-1.5 rounded-full transition-all",
                style: { width: `${uploadProgress}%` }
              }
            ) }),
            imageFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1 truncate", children: imageFile.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handleImageChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Basic Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Product Name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "e.g. Everest Garam Masala 100g",
            value: form.name,
            onChange: (e) => update("name", e.target.value),
            className: "rounded-xl bg-muted border-0 h-10",
            "data-ocid": "new_product.name_input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.category,
            onValueChange: (v) => update("category", v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "rounded-xl bg-muted border-0 h-10",
                  "data-ocid": "new_product.category_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "SKU Code", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Auto-generated",
              value: form.sku,
              onChange: (e) => {
                setSkuAuto(false);
                update("sku", e.target.value);
              },
              className: "rounded-xl bg-muted border-0 h-10",
              "data-ocid": "new_product.sku_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "rounded-xl shrink-0 h-10 text-xs px-3",
              onClick: () => {
                setSkuAuto(true);
                update("sku", generateSKU(form.category || "Other"));
              },
              "data-ocid": "new_product.sku_generate_button",
              children: "Auto"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Barcode", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Scan or enter barcode",
              value: form.barcode,
              onChange: (e) => update("barcode", e.target.value),
              className: "rounded-xl bg-muted border-0 h-10",
              "data-ocid": "new_product.barcode_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setScannerOpen(true),
              className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-smooth hover:bg-primary/20",
              "data-ocid": "new_product.barcode_scan_button",
              "aria-label": "Scan barcode",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { size: 16, className: "text-primary" })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Purchase Price (₹)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "₹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "0.00",
                value: form.purchasePrice,
                onChange: (e) => update("purchasePrice", e.target.value),
                className: "pl-7 rounded-xl bg-muted border-0 h-10",
                "data-ocid": "new_product.purchase_price_input"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Selling Price (₹)", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "₹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "0.00",
                value: form.sellingPrice,
                onChange: (e) => update("sellingPrice", e.target.value),
                className: "pl-7 rounded-xl bg-muted border-0 h-10",
                "data-ocid": "new_product.selling_price_input"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tax % (GST)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            placeholder: "18",
            value: form.taxPercent,
            onChange: (e) => update("taxPercent", e.target.value),
            className: "rounded-xl bg-muted border-0 h-10",
            "data-ocid": "new_product.tax_input"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Current Qty", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: "0",
              value: form.quantity,
              onChange: (e) => update("quantity", e.target.value),
              className: "rounded-xl bg-muted border-0 h-10",
              "data-ocid": "new_product.quantity_input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Unit Type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.unit,
              onValueChange: (v) => update("unit", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "rounded-xl bg-muted border-0 h-10",
                    "data-ocid": "new_product.unit_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)) })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 rounded-2xl border-0 shadow-card bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Supplier Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "e.g. Sharma Wholesale Traders, Delhi",
          value: form.supplierName,
          onChange: (e) => update("supplierName", e.target.value),
          className: "rounded-xl bg-muted border-0 h-10",
          "data-ocid": "new_product.supplier_input"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full h-12 rounded-xl text-base font-semibold",
          disabled: isPending,
          "data-ocid": "new_product.save_button",
          children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "mr-2 animate-spin" }),
            "Saving..."
          ] }) : "Save Product"
        }
      )
    ] }),
    scannerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BarcodeScannerModal,
      {
        onScan: (code) => update("barcode", code),
        onClose: () => setScannerOpen(false)
      }
    )
  ] });
}
export {
  NewProduct as default
};
