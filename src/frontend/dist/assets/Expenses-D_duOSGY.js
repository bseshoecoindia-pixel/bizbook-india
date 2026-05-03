import { c as createLucideIcon, r as reactExports, ah as useExpenses, al as useTotalExpenses, am as useDeleteExpense, j as jsxRuntimeExports, d as cn, B as Button, s as Plus, o as Skeleton, t as Card, p as Receipt, e as ue, an as ExpenseCategory, ao as Pen, Z as Trash2, X, ap as useCreateExpense, aq as useUpdateExpense, L as Label, I as Input, z as Textarea, $ as ExternalBlob } from "./index-DHdUgTPk.js";
import { L as LoaderCircle } from "./loader-circle-D3T1zLWJ.js";
import { C as Camera } from "./camera-DOAGrYmw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100
  );
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function todayISO() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
const CATEGORY_META = {
  [ExpenseCategory.office]: {
    label: "Office",
    emoji: "🏢",
    color: "bg-blue-50 text-blue-700"
  },
  [ExpenseCategory.utilities]: {
    label: "Utilities",
    emoji: "⚡",
    color: "bg-yellow-50 text-yellow-700"
  },
  [ExpenseCategory.transport]: {
    label: "Transport",
    emoji: "🚗",
    color: "bg-sky-50 text-sky-700"
  },
  [ExpenseCategory.rawMaterials]: {
    label: "Raw Materials",
    emoji: "📦",
    color: "bg-orange-50 text-orange-700"
  },
  [ExpenseCategory.marketing]: {
    label: "Marketing",
    emoji: "📢",
    color: "bg-pink-50 text-pink-700"
  },
  [ExpenseCategory.salaries]: {
    label: "Salaries",
    emoji: "👥",
    color: "bg-violet-50 text-violet-700"
  },
  [ExpenseCategory.rent]: {
    label: "Rent",
    emoji: "🏠",
    color: "bg-emerald-50 text-emerald-700"
  },
  [ExpenseCategory.other]: {
    label: "Other",
    emoji: "📋",
    color: "bg-muted text-muted-foreground"
  }
};
const ALL_FILTER = "all";
const FILTER_CHIPS = [
  { label: "All", value: ALL_FILTER },
  ...Object.values(ExpenseCategory).map((cat) => ({
    label: CATEGORY_META[cat].label,
    value: cat
  }))
];
function ReceiptLightbox({
  url,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4",
      "data-ocid": "expenses.receipt_lightbox.dialog",
      children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-[360px] w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card shadow-elevated flex items-center justify-center z-20",
              "aria-label": "Close receipt",
              "data-ocid": "expenses.receipt_lightbox.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15, className: "text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: url,
              alt: "Receipt",
              className: "w-full rounded-2xl shadow-elevated object-contain max-h-[70vh]"
            }
          )
        ] })
      ]
    }
  );
}
function ReceiptUpload({
  receiptUrl,
  uploadProgress,
  uploading,
  onFileChange,
  onRemove
}) {
  const fileRef = reactExports.useRef(null);
  function handleChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) onFileChange(file);
    e.target.value = "";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Receipt Photo (optional)" }),
    receiptUrl ? (
      // Show thumbnail + remove button
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-2 rounded-xl bg-muted/50 border border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: receiptUrl,
            alt: "Receipt thumbnail",
            className: "w-14 h-14 rounded-lg object-cover border border-border/40 shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: "Receipt attached" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Tap × to remove" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: "w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0",
            "aria-label": "Remove receipt",
            "data-ocid": "expenses.expense_drawer.receipt_remove_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-red-500" })
          }
        )
      ] })
    ) : uploading ? (
      // Upload progress
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-muted/50 border border-border/50 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "text-primary animate-spin shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Uploading… ",
            uploadProgress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-border rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-primary h-1.5 rounded-full transition-all duration-300",
            style: { width: `${uploadProgress}%` },
            "data-ocid": "expenses.expense_drawer.receipt_upload.loading_state"
          }
        ) })
      ] })
    ) : (
      // Upload button
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a;
            return (_a = fileRef.current) == null ? void 0 : _a.click();
          },
          className: "flex items-center gap-2.5 w-full p-3 rounded-xl bg-muted/50 border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth",
          "data-ocid": "expenses.expense_drawer.receipt_upload_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 18, className: "text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tap to attach receipt photo" })
          ]
        }
      )
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleChange
      }
    )
  ] });
}
function ExpenseDrawer({ open, expense, onClose }) {
  const isEdit = !!expense;
  const { mutateAsync: create, isPending: creating } = useCreateExpense();
  const { mutateAsync: update, isPending: updating } = useUpdateExpense();
  const isPending = creating || updating;
  const [form, setForm] = reactExports.useState({
    amount: expense ? String(Number(expense.amount) / 100) : "",
    category: (expense == null ? void 0 : expense.category) ?? ExpenseCategory.other,
    date: expense ? new Date(Number(expense.date) / 1e6).toISOString().split("T")[0] : todayISO(),
    description: (expense == null ? void 0 : expense.description) ?? "",
    notes: (expense == null ? void 0 : expense.notes) ?? ""
  });
  const [receiptUrl, setReceiptUrl] = reactExports.useState(
    (expense == null ? void 0 : expense.receiptUrl) ?? null
  );
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  async function handleReceiptFile(file) {
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setUploadProgress(Math.round(pct))
      );
      const url = blob.getDirectURL();
      setReceiptUrl(url);
    } catch {
      ue.error("Receipt upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }
  const handleSave = async () => {
    const amountNum = Number.parseFloat(form.amount);
    if (!form.amount || Number.isNaN(amountNum) || amountNum <= 0) {
      ue.error("Enter a valid amount");
      return;
    }
    if (!form.description.trim()) {
      ue.error("Description is required");
      return;
    }
    if (uploading) {
      ue.error("Please wait for the receipt upload to finish");
      return;
    }
    const input = {
      amount: BigInt(Math.round(amountNum * 100)),
      category: form.category,
      date: BigInt(new Date(form.date).getTime()) * BigInt(1e6),
      description: form.description.trim(),
      notes: form.notes.trim() || void 0,
      receiptUrl: receiptUrl ?? void 0
    };
    try {
      if (isEdit && expense) {
        await update({ id: expense.id, input });
        ue.success("Expense updated!");
      } else {
        await create(input);
        ue.success("Expense added!");
      }
      onClose();
    } catch {
      ue.error(
        isEdit ? "Failed to update expense" : "Failed to add expense"
      );
    }
  };
  if (!open) return null;
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
        className: "relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4",
        "data-ocid": "expenses.expense_drawer.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: isEdit ? "Edit Expense" : "Add Expense" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
                "aria-label": "Close",
                "data-ocid": "expenses.expense_drawer.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Amount (₹) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground", children: "₹" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "0",
                    step: "0.01",
                    value: form.amount,
                    onChange: (e) => set("amount", e.target.value),
                    placeholder: "0.00",
                    className: "pl-7 h-11 rounded-xl",
                    "data-ocid": "expenses.expense_drawer.amount.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Category *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: form.category,
                  onChange: (e) => set("category", e.target.value),
                  className: "w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40",
                  "data-ocid": "expenses.expense_drawer.category.select",
                  children: Object.values(ExpenseCategory).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: cat, children: [
                    CATEGORY_META[cat].emoji,
                    " ",
                    CATEGORY_META[cat].label
                  ] }, cat))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Date *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.date,
                  onChange: (e) => set("date", e.target.value),
                  className: "h-11 rounded-xl",
                  "data-ocid": "expenses.expense_drawer.date.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Description *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.description,
                  onChange: (e) => set("description", e.target.value),
                  placeholder: "e.g. Electricity bill for May",
                  className: "h-11 rounded-xl",
                  "data-ocid": "expenses.expense_drawer.description.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Notes (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: form.notes,
                  onChange: (e) => set("notes", e.target.value),
                  placeholder: "Additional details...",
                  className: "rounded-xl resize-none",
                  rows: 2,
                  "data-ocid": "expenses.expense_drawer.notes.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReceiptUpload,
              {
                receiptUrl,
                uploadProgress,
                uploading,
                onFileChange: handleReceiptFile,
                onRemove: () => setReceiptUrl(null)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSave,
                disabled: isPending || uploading,
                className: "w-full h-11 rounded-xl mt-2",
                "data-ocid": "expenses.expense_drawer.submit_button",
                children: isPending ? "Saving..." : isEdit ? "Save Changes" : "Add Expense"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function ExpenseCard({
  expense,
  index,
  onEdit,
  onDelete,
  onViewReceipt
}) {
  const meta = CATEGORY_META[expense.category];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden",
      "data-ocid": `expenses.expense_item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-4 py-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0",
              meta.color
            ),
            children: meta.emoji
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: expense.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            meta.label,
            " · ",
            formatDate(expense.date)
          ] }),
          expense.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: expense.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
            "₹",
            formatINR(expense.amount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            expense.receiptUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => expense.receiptUrl && onViewReceipt(expense.receiptUrl),
                className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-smooth",
                "aria-label": "View receipt",
                "data-ocid": `expenses.receipt_view_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 12, className: "text-primary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onEdit(expense),
                className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-smooth",
                "aria-label": "Edit expense",
                "data-ocid": `expenses.edit_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 12, className: "text-muted-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onDelete(expense.id),
                className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-red-50 transition-smooth",
                "aria-label": "Delete expense",
                "data-ocid": `expenses.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12, className: "text-red-500" })
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function Expenses() {
  var _a;
  const [filter, setFilter] = reactExports.useState(ALL_FILTER);
  const [drawerOpen, setDrawerOpen] = reactExports.useState(false);
  const [editExpense, setEditExpense] = reactExports.useState();
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const [lightboxUrl, setLightboxUrl] = reactExports.useState(null);
  const { data: expenses = [], isLoading } = useExpenses();
  const { data: totalPaise = BigInt(0) } = useTotalExpenses();
  const { mutateAsync: deleteExpense } = useDeleteExpense();
  const filtered = filter === ALL_FILTER ? expenses : expenses.filter((e) => e.category === filter);
  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };
  const confirmDelete = async () => {
    if (confirmDeleteId === null) return;
    try {
      await deleteExpense(confirmDeleteId);
      ue.success("Expense deleted");
    } catch {
      ue.error("Failed to delete expense");
    } finally {
      setConfirmDeleteId(null);
    }
  };
  const handleEdit = (expense) => {
    setEditExpense(expense);
    setDrawerOpen(true);
  };
  const handleAdd = () => {
    setEditExpense(void 0);
    setDrawerOpen(true);
  };
  const handleClose = () => {
    setDrawerOpen(false);
    setEditExpense(void 0);
  };
  const monthTotal = expenses.filter((e) => {
    const d = new Date(Number(e.date) / 1e6);
    const now = /* @__PURE__ */ new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((sum, e) => sum + e.amount, BigInt(0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-24", "data-ocid": "expenses.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-3 grid grid-cols-2 gap-2 border-b border-border/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl px-3 py-3 bg-primary/5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-foreground", children: [
          "₹",
          formatINR(monthTotal)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This Month" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl px-3 py-3 bg-red-50 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-red-600", children: [
          "₹",
          formatINR(totalPaise)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Expenses" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar", children: FILTER_CHIPS.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(chip.value),
        className: cn(
          "flex-none px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth whitespace-nowrap",
          filter === chip.value ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
        ),
        "data-ocid": `expenses.filter.${chip.value}`,
        children: chip.label
      },
      chip.value
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        filtered.length,
        " expense",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "h-8 rounded-xl text-xs gap-1",
          onClick: handleAdd,
          "data-ocid": "expenses.add_expense_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Add Expense"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-2", children: isLoading ? Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)
    )) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-8 text-center shadow-card rounded-2xl border-0 bg-card",
        "data-ocid": "expenses.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Receipt,
            {
              size: 36,
              className: "text-muted-foreground mx-auto mb-3 opacity-30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: filter === ALL_FILTER ? "No expenses recorded yet" : `No ${((_a = CATEGORY_META[filter]) == null ? void 0 : _a.label) ?? ""} expenses` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Tap '+ Add Expense' to record one" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "mt-4 rounded-xl",
              onClick: handleAdd,
              "data-ocid": "expenses.empty_state.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
                " Add Expense"
              ]
            }
          )
        ]
      }
    ) : filtered.map((expense, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExpenseCard,
      {
        expense,
        index: i + 1,
        onEdit: handleEdit,
        onDelete: handleDelete,
        onViewReceipt: setLightboxUrl
      },
      expense.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleAdd,
        className: "fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-smooth z-40",
        "aria-label": "Add expense",
        "data-ocid": "expenses.fab_add_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 24 })
      }
    ),
    confirmDeleteId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl shadow-elevated w-full max-w-[320px] p-5",
        "data-ocid": "expenses.delete_confirm.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground mb-1", children: "Delete Expense?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "This action cannot be undone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1 rounded-xl",
                onClick: () => setConfirmDeleteId(null),
                "data-ocid": "expenses.delete_confirm.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                className: "flex-1 rounded-xl",
                onClick: confirmDelete,
                "data-ocid": "expenses.delete_confirm.confirm_button",
                children: "Delete"
              }
            )
          ] })
        ]
      }
    ) }),
    lightboxUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReceiptLightbox,
      {
        url: lightboxUrl,
        onClose: () => setLightboxUrl(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExpenseDrawer,
      {
        open: drawerOpen,
        expense: editExpense,
        onClose: handleClose
      }
    )
  ] });
}
export {
  Expenses as default
};
