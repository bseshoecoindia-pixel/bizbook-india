import { c as createLucideIcon, j as jsxRuntimeExports, d as cn, a as useNavigate, t as useCreateInvoice, r as reactExports, q as PaymentStatus, B as Button, o as Receipt, p as Plus, F as FileText, I as InvoiceStatus, e as ue } from "./index-BOl89Uzk.js";
import { C as Card } from "./card-CX7VVhkd.js";
import { I as Input } from "./input-B5w0Q6J7.js";
import { L as Label } from "./label-BFAcOAgF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cj0axHzH.js";
import { C as ChevronLeft } from "./chevron-left-DzoJVfGU.js";
import "./index-Aw0u7M1h.js";
import "./index-CzzZAx8a.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function calcLineTotal(item) {
  const gross = item.quantity * item.unitPrice;
  const disc = gross * item.discount / 100;
  const taxable = gross - disc;
  return taxable + taxable * item.taxPercent / 100;
}
function fmtINR(n) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function todayStr() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function nextInvoiceNumber() {
  const now = /* @__PURE__ */ new Date();
  const seq = String(Math.floor(Math.random() * 9) + 4).padStart(4, "0");
  return `INV-${now.getFullYear()}-${seq}`;
}
function NewBill() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateInvoice();
  const [invoiceNo] = reactExports.useState(nextInvoiceNumber);
  const [invoiceDate, setInvoiceDate] = reactExports.useState(todayStr());
  const [dueDate, setDueDate] = reactExports.useState("");
  const [customerName, setCustomerName] = reactExports.useState("");
  const [customerPhone, setCustomerPhone] = reactExports.useState("");
  const [paymentStatus, setPaymentStatus] = reactExports.useState(
    PaymentStatus.Unpaid
  );
  const [notes, setNotes] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [items, setItems] = reactExports.useState([
    {
      _id: 1,
      productName: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      taxPercent: 18
    }
  ]);
  const addLine = () => setItems((prev) => [
    ...prev,
    {
      _id: Date.now(),
      productName: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      taxPercent: 18
    }
  ]);
  const removeLine = (id) => setItems(
    (prev) => prev.length > 1 ? prev.filter((it) => it._id !== id) : prev
  );
  const updateLine = (id, k, v) => setItems(
    (prev) => prev.map((it) => it._id === id ? { ...it, [k]: v } : it)
  );
  const subtotal = items.reduce((s, it) => s + it.quantity * it.unitPrice, 0);
  const totalDiscount = items.reduce(
    (s, it) => s + it.quantity * it.unitPrice * it.discount / 100,
    0
  );
  const taxable = subtotal - totalDiscount;
  const totalTax = items.reduce((s, it) => {
    const base = it.quantity * it.unitPrice * (1 - it.discount / 100);
    return s + base * it.taxPercent / 100;
  }, 0);
  const cgst = totalTax / 2;
  const sgst = totalTax / 2;
  const grandTotal = taxable + totalTax;
  const toPaise = (r) => BigInt(Math.round(r * 100));
  const effectiveGstRate = (() => {
    const taxableBase = items.reduce(
      (s, it) => s + it.quantity * it.unitPrice * (1 - it.discount / 100),
      0
    );
    if (taxableBase === 0) return 0;
    const weightedRate = items.reduce(
      (s, it) => s + it.quantity * it.unitPrice * (1 - it.discount / 100) * it.taxPercent,
      0
    ) / taxableBase;
    return weightedRate;
  })();
  const halfRate = effectiveGstRate / 2;
  const gstLabel = (half) => half % 1 === 0 ? `${half}%` : `${half.toFixed(2)}%`;
  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.customerName = "Customer name is required";
    if (!customerPhone.trim()) errs.customerPhone = "Phone number is required";
    for (const [i, it] of items.entries()) {
      if (!it.productName.trim()) errs[`item_${i}`] = "Product name required";
      if (it.quantity <= 0) errs[`qty_${i}`] = "Qty must be > 0";
      if (it.unitPrice <= 0) errs[`price_${i}`] = "Price must be > 0";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (status) => {
    if (!validate()) {
      ue.error("Please fix the highlighted fields");
      return;
    }
    try {
      const invoiceItems = items.map((it) => ({
        productName: it.productName,
        quantity: BigInt(it.quantity),
        unitPrice: toPaise(it.unitPrice),
        discount: toPaise(it.quantity * it.unitPrice * it.discount / 100),
        taxPercent: BigInt(it.taxPercent),
        lineTotal: toPaise(calcLineTotal(it))
      }));
      await mutateAsync({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        items: invoiceItems,
        subtotal: toPaise(subtotal),
        discount: toPaise(totalDiscount),
        cgst: toPaise(cgst),
        sgst: toPaise(sgst),
        total: toPaise(grandTotal),
        status,
        paymentStatus,
        notes: notes.trim() || void 0,
        dueDate: dueDate ? BigInt(new Date(dueDate).getTime()) * BigInt(1e6) : void 0
      });
      ue.success(
        status === InvoiceStatus.Draft ? "Draft saved!" : "Invoice created!"
      );
      navigate({ to: "/bills" });
    } catch {
      ue.error("Failed to create invoice. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-32", "data-ocid": "new_bill.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8 shrink-0",
          onClick: () => navigate({ to: "/bills" }),
          "aria-label": "Back",
          "data-ocid": "new_bill.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "New Invoice" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto text-xs text-muted-foreground font-mono", children: invoiceNo })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 14, className: "text-primary" }),
          " Invoice Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Invoice Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: invoiceDate,
                onChange: (e) => setInvoiceDate(e.target.value),
                className: "h-10 rounded-xl text-sm",
                "data-ocid": "new_bill.invoice_date_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Due Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: dueDate,
                onChange: (e) => setDueDate(e.target.value),
                min: invoiceDate,
                className: "h-10 rounded-xl text-sm",
                "data-ocid": "new_bill.due_date_input"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-3", children: "Customer Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Customer Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. Ravi Shankar Traders",
                value: customerName,
                onChange: (e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName)
                    setErrors((p) => ({ ...p, customerName: "" }));
                },
                onBlur: () => {
                  if (!customerName.trim())
                    setErrors((p) => ({
                      ...p,
                      customerName: "Customer name is required"
                    }));
                },
                className: `h-10 rounded-xl ${errors.customerName ? "border-destructive ring-destructive/30" : ""}`,
                "data-ocid": "new_bill.customer_name_input"
              }
            ),
            errors.customerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "new_bill.customer_name_field_error",
                children: errors.customerName
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Phone *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "+91 98765 43210",
                type: "tel",
                value: customerPhone,
                onChange: (e) => {
                  setCustomerPhone(e.target.value);
                  if (errors.customerPhone)
                    setErrors((p) => ({ ...p, customerPhone: "" }));
                },
                onBlur: () => {
                  if (!customerPhone.trim())
                    setErrors((p) => ({
                      ...p,
                      customerPhone: "Phone number is required"
                    }));
                },
                className: `h-10 rounded-xl ${errors.customerPhone ? "border-destructive" : ""}`,
                "data-ocid": "new_bill.customer_phone_input"
              }
            ),
            errors.customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "new_bill.customer_phone_field_error",
                children: errors.customerPhone
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Payment Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: paymentStatus,
                onValueChange: (v) => setPaymentStatus(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-10 rounded-xl",
                      "data-ocid": "new_bill.payment_status_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentStatus.Unpaid, children: "Unpaid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentStatus.Partial_, children: "Partial" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentStatus.Paid, children: "Paid" })
                  ] })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground", children: [
            "Items (",
            items.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: addLine,
              className: "h-7 text-xs rounded-lg gap-1 border-primary/30 text-primary",
              "data-ocid": "new_bill.add_item_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
                " Add Item"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `border rounded-xl p-3 space-y-2.5 ${errors[`item_${i}`] ? "border-destructive/50" : "border-border/60"}`,
            "data-ocid": `new_bill.line_item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Product / service name",
                      value: item.productName,
                      onChange: (e) => {
                        updateLine(item._id, "productName", e.target.value);
                        if (errors[`item_${i}`])
                          setErrors((p) => ({ ...p, [`item_${i}`]: "" }));
                      },
                      className: "h-9 rounded-lg text-sm",
                      "data-ocid": `new_bill.product_name_input.${i + 1}`
                    }
                  ),
                  errors[`item_${i}`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-destructive", children: errors[`item_${i}`] })
                ] }),
                items.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-9 w-9 text-destructive shrink-0 hover:bg-destructive/10",
                    onClick: () => removeLine(item._id),
                    "aria-label": "Remove item",
                    "data-ocid": `new_bill.remove_item_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground block", children: "Qty *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 1,
                      value: item.quantity,
                      onChange: (e) => updateLine(item._id, "quantity", Number(e.target.value)),
                      className: `h-8 rounded-lg text-sm text-center ${errors[`qty_${i}`] ? "border-destructive" : ""}`,
                      "data-ocid": `new_bill.quantity_input.${i + 1}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground block", children: "Price (₹) *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      value: item.unitPrice,
                      onChange: (e) => updateLine(
                        item._id,
                        "unitPrice",
                        Number(e.target.value)
                      ),
                      className: `h-8 rounded-lg text-sm ${errors[`price_${i}`] ? "border-destructive" : ""}`,
                      "data-ocid": `new_bill.price_input.${i + 1}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground block", children: "Disc %" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      max: 100,
                      value: item.discount,
                      onChange: (e) => updateLine(item._id, "discount", Number(e.target.value)),
                      className: "h-8 rounded-lg text-sm",
                      "data-ocid": `new_bill.discount_input.${i + 1}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground block", children: "Tax %" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      max: 100,
                      value: item.taxPercent,
                      onChange: (e) => updateLine(
                        item._id,
                        "taxPercent",
                        Number(e.target.value)
                      ),
                      className: "h-8 rounded-lg text-sm",
                      "data-ocid": `new_bill.tax_input.${i + 1}`
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
                  item.quantity > 0 && item.unitPrice > 0 ? `${item.quantity} × ₹${fmtINR(item.unitPrice)}` : "",
                  item.discount > 0 ? ` − ${item.discount}% disc` : "",
                  item.taxPercent > 0 ? ` + ${item.taxPercent}% GST` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
                  "₹",
                  fmtINR(calcLineTotal(item))
                ] })
              ] })
            ]
          },
          item._id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Notes (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Payment terms, delivery notes, or any other information...",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            className: "rounded-xl resize-none text-sm",
            rows: 2,
            "data-ocid": "new_bill.notes_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden shadow-card rounded-2xl border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-muted/40 border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14, className: "text-primary" }),
          " Invoice Summary"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              "₹",
              fmtINR(subtotal)
            ] })
          ] }),
          totalDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "Discount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 font-medium", children: [
              "−₹",
              fmtINR(totalDiscount)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "CGST (",
              gstLabel(halfRate),
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              fmtINR(cgst)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "SGST (",
              gstLabel(halfRate),
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              fmtINR(sgst)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border my-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-base text-foreground", children: "Grand Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-2xl text-primary", children: [
              "₹",
              fmtINR(grandTotal)
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-primary/8 border-t border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-primary text-center font-medium", children: [
          "GST Inclusive · CGST + SGST = ₹",
          fmtINR(totalTax)
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 py-3 max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "flex-1 h-12 rounded-xl text-sm border-border",
          onClick: () => handleSubmit(InvoiceStatus.Draft),
          disabled: isPending,
          "data-ocid": "new_bill.save_draft_button",
          children: "Save Draft"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "flex-1 h-12 rounded-xl text-sm bg-primary hover:bg-primary/90 shadow-sm",
          onClick: () => handleSubmit(InvoiceStatus.Sent),
          disabled: isPending,
          "data-ocid": "new_bill.submit_button",
          children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
            "Saving…"
          ] }) : "Create Invoice"
        }
      )
    ] }) })
  ] });
}
export {
  NewBill as default
};
