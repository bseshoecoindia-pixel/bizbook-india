import { r as reactExports, ad as useSuppliers, j as jsxRuntimeExports, x as Search, I as Input, B as Button, s as Plus, o as Skeleton, t as Card, d as cn, ae as useCreateSupplier, af as useUpdateSupplier, X, L as Label, ag as useDeleteSupplier, Z as Trash2, e as ue } from "./index-DHdUgTPk.js";
import { B as Building2 } from "./building-2-BqodSw9k.js";
import { P as Phone } from "./phone-BHLCko35.js";
import { I as IndianRupee } from "./indian-rupee-BSLgJRl2.js";
import { M as Mail } from "./mail-DAFzZTzG.js";
import { M as MapPin } from "./map-pin-B7DxU77B.js";
function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100
  );
}
function getInitials(name) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
const AVATAR_COLORS = [
  "bg-primary/15 text-primary",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700"
];
const EMPTY_FORM = {
  name: "",
  phone: "",
  email: void 0,
  address: void 0,
  gstNumber: void 0,
  paymentTerms: void 0,
  notes: void 0
};
function SupplierDrawer({
  open,
  onClose,
  onSaved,
  initialData
}) {
  const isEdit = !!initialData;
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();
  const isPending = createMutation.isPending || updateMutation.isPending;
  const [form, setForm] = reactExports.useState(
    initialData ? {
      name: initialData.name,
      phone: initialData.phone,
      email: initialData.email,
      address: initialData.address,
      gstNumber: initialData.gstNumber,
      paymentTerms: initialData.paymentTerms,
      notes: initialData.notes
    } : EMPTY_FORM
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v || void 0 }));
  const handleSave = async () => {
    if (!form.name.trim()) {
      ue.error("Supplier name is required");
      return;
    }
    if (!form.phone.trim()) {
      ue.error("Phone number is required");
      return;
    }
    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, input: form });
        ue.success("Supplier updated!");
      } else {
        await createMutation.mutateAsync(form);
        ue.success("Supplier added!");
      }
      onSaved();
      onClose();
    } catch {
      ue.error(
        isEdit ? "Failed to update supplier" : "Failed to add supplier"
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
        className: "relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4 max-h-[90vh] overflow-y-auto",
        "data-ocid": isEdit ? "suppliers.edit_supplier.dialog" : "suppliers.add_supplier.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: isEdit ? "Edit Supplier" : "Add Supplier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
                "aria-label": "Close",
                "data-ocid": isEdit ? "suppliers.edit_supplier.close_button" : "suppliers.add_supplier.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.name,
                  onChange: (e) => set("name", e.target.value),
                  placeholder: "e.g. Sharma Distributors",
                  className: "h-11 rounded-xl",
                  "data-ocid": "suppliers.form.name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Phone *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "tel",
                  value: form.phone,
                  onChange: (e) => set("phone", e.target.value),
                  placeholder: "+91 98765 43210",
                  className: "h-11 rounded-xl",
                  "data-ocid": "suppliers.form.phone.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  value: form.email ?? "",
                  onChange: (e) => set("email", e.target.value),
                  placeholder: "supplier@example.com",
                  className: "h-11 rounded-xl",
                  "data-ocid": "suppliers.form.email.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.address ?? "",
                  onChange: (e) => set("address", e.target.value),
                  placeholder: "City, State",
                  className: "h-11 rounded-xl",
                  "data-ocid": "suppliers.form.address.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "GST Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.gstNumber ?? "",
                  onChange: (e) => set("gstNumber", e.target.value),
                  placeholder: "22AAAAA0000A1Z5",
                  className: "h-11 rounded-xl font-mono",
                  "data-ocid": "suppliers.form.gst.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Payment Terms" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.paymentTerms ?? "",
                  onChange: (e) => set("paymentTerms", e.target.value),
                  placeholder: "e.g. Net 30, Advance, COD",
                  className: "h-11 rounded-xl",
                  "data-ocid": "suppliers.form.payment_terms.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.notes ?? "",
                  onChange: (e) => set("notes", e.target.value),
                  placeholder: "Any additional notes",
                  className: "h-11 rounded-xl",
                  "data-ocid": "suppliers.form.notes.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSave,
                disabled: isPending,
                className: "w-full h-11 rounded-xl mt-2",
                "data-ocid": isEdit ? "suppliers.edit_supplier.submit_button" : "suppliers.add_supplier.submit_button",
                children: isPending ? "Saving..." : isEdit ? "Update Supplier" : "Add Supplier"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function SupplierDetail({
  supplier,
  index,
  onClose,
  onEdit,
  onDelete
}) {
  const deleteMutation = useDeleteSupplier();
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(supplier.id);
      ue.success("Supplier deleted");
      onDelete();
      onClose();
    } catch {
      ue.error("Failed to delete supplier");
    }
  };
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
        className: "relative w-full max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-elevated px-4 pb-8 pt-4 max-h-[90vh] overflow-y-auto",
        "data-ocid": "suppliers.supplier_detail.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm",
                    AVATAR_COLORS[index % AVATAR_COLORS.length]
                  ),
                  children: getInitials(supplier.name)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground", children: supplier.name }),
                supplier.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: supplier.gstNumber })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
                "aria-label": "Close",
                "data-ocid": "suppliers.supplier_detail.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-muted-foreground" })
              }
            )
          ] }),
          supplier.pendingAmount > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 18, className: "text-red-600 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-red-700", children: [
                "₹",
                formatINR(supplier.pendingAmount),
                " Payable"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: "Payment pending to supplier" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: supplier.phone })
              ] })
            ] }),
            supplier.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: supplier.email })
              ] })
            ] }),
            supplier.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: supplier.address })
              ] })
            ] }),
            supplier.paymentTerms && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Payment Terms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: supplier.paymentTerms })
              ] })
            ] }),
            supplier.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 rounded-xl bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground", children: supplier.notes })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-2xl px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Purchases" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground mt-0.5", children: [
                "₹",
                formatINR(supplier.totalPurchases)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "rounded-2xl px-4 py-3",
                  supplier.pendingAmount > BigInt(0) ? "bg-red-50" : "bg-emerald-50"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Payable" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "font-display font-bold text-lg mt-0.5",
                        supplier.pendingAmount > BigInt(0) ? "text-red-600" : "text-emerald-600"
                      ),
                      children: supplier.pendingAmount > BigInt(0) ? `₹${formatINR(supplier.pendingAmount)}` : "Nil"
                    }
                  )
                ]
              }
            )
          ] }),
          confirmDelete ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 mb-3",
              "data-ocid": "suppliers.delete_confirm.dialog",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-red-700 mb-1", children: "Delete this supplier?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 mb-3", children: "This action cannot be undone." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "flex-1 rounded-xl border-border",
                      onClick: () => setConfirmDelete(false),
                      "data-ocid": "suppliers.delete_confirm.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "destructive",
                      size: "sm",
                      className: "flex-1 rounded-xl",
                      onClick: handleDelete,
                      disabled: deleteMutation.isPending,
                      "data-ocid": "suppliers.delete_confirm.confirm_button",
                      children: deleteMutation.isPending ? "Deleting..." : "Delete"
                    }
                  )
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${supplier.phone}`,
                className: "flex-1 h-11 rounded-xl border border-border flex items-center justify-center gap-2 text-sm font-semibold text-foreground hover:bg-muted/40 transition-smooth",
                "data-ocid": "suppliers.supplier_detail.call_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                  "Call"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 h-11 rounded-xl",
                onClick: onEdit,
                "data-ocid": "suppliers.supplier_detail.edit_button",
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setConfirmDelete(true),
                className: "w-11 h-11 rounded-xl border border-red-200 bg-red-50 flex items-center justify-center shrink-0 hover:bg-red-100 transition-smooth",
                "aria-label": "Delete supplier",
                "data-ocid": "suppliers.supplier_detail.delete_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16, className: "text-red-500" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Suppliers() {
  const [search, setSearch] = reactExports.useState("");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const [editSupplier, setEditSupplier] = reactExports.useState(null);
  const { data: suppliers = [], isLoading, refetch } = useSuppliers();
  const filtered = suppliers.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search) || (s.gstNumber ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const totalPayable = suppliers.reduce(
    (sum, s) => sum + s.pendingAmount,
    BigInt(0)
  );
  const selectedIndex = selected ? suppliers.findIndex((s) => s.id === selected.id) : 0;
  const handleEditFromDetail = () => {
    setEditSupplier(selected);
    setSelected(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-4", "data-ocid": "suppliers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-3 grid grid-cols-2 gap-2 border-b border-border/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl px-3 py-3 bg-primary/5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: suppliers.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Suppliers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl px-3 py-3 bg-amber-50 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-amber-600", children: [
          "₹",
          formatINR(totalPayable)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Payable" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-30 bg-background/95 backdrop-blur-sm px-4 pt-3 pb-2 border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
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
          placeholder: "Search by name, phone or GST...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9 h-10 rounded-xl bg-muted border-0",
          "data-ocid": "suppliers.search_input"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        filtered.length,
        " supplier",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "h-8 rounded-xl text-xs gap-1",
          onClick: () => setAddOpen(true),
          "data-ocid": "suppliers.add_supplier_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Add Supplier"
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
        "data-ocid": "suppliers.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Building2,
            {
              size: 36,
              className: "text-muted-foreground mx-auto mb-3 opacity-30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No suppliers yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add your first supplier to get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "mt-4 rounded-xl",
              onClick: () => setAddOpen(true),
              "data-ocid": "suppliers.empty_state.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
                " Add Supplier"
              ]
            }
          )
        ]
      }
    ) : filtered.map((supplier, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden cursor-pointer hover:shadow-elevated transition-smooth active:scale-[0.99]",
        onClick: () => setSelected(supplier),
        "data-ocid": `suppliers.supplier_item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                AVATAR_COLORS[i % AVATAR_COLORS.length]
              ),
              children: getInitials(supplier.name)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: supplier.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: supplier.phone })
            ] }),
            supplier.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono truncate", children: [
              "GST: ",
              supplier.gstNumber
            ] }),
            supplier.paymentTerms && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-primary font-medium mt-0.5", children: supplier.paymentTerms })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Purchases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
              "₹",
              formatINR(supplier.totalPurchases)
            ] }),
            supplier.pendingAmount > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-semibold text-red-500 mt-0.5", children: [
              "₹",
              formatINR(supplier.pendingAmount),
              " due"
            ] })
          ] })
        ] })
      },
      supplier.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SupplierDrawer,
      {
        open: addOpen,
        onClose: () => setAddOpen(false),
        onSaved: () => refetch()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SupplierDrawer,
      {
        open: !!editSupplier,
        initialData: editSupplier,
        onClose: () => setEditSupplier(null),
        onSaved: () => refetch()
      }
    ),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SupplierDetail,
      {
        supplier: selected,
        index: selectedIndex,
        onClose: () => setSelected(null),
        onEdit: handleEditFromDetail,
        onDelete: () => refetch()
      }
    )
  ] });
}
export {
  Suppliers as default
};
