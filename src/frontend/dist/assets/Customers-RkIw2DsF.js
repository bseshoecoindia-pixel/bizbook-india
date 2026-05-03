import { r as reactExports, ab as useCustomers, j as jsxRuntimeExports, x as Search, I as Input, B as Button, s as Plus, o as Skeleton, t as Card, U as Users, d as cn, ac as useCreateCustomer, X, L as Label, F as FileText, e as ue } from "./index-DHdUgTPk.js";
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
function AddCustomerDrawer({ open, onClose, onSaved }) {
  const { mutateAsync, isPending } = useCreateCustomer();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    email: void 0,
    address: void 0,
    gstNumber: void 0
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v || void 0 }));
  const handleSave = async () => {
    if (!form.name.trim()) {
      ue.error("Customer name is required");
      return;
    }
    if (!form.phone.trim()) {
      ue.error("Phone number is required");
      return;
    }
    try {
      await mutateAsync(form);
      ue.success("Customer added!");
      setForm({ name: "", phone: "" });
      onSaved();
      onClose();
    } catch {
      ue.error("Failed to add customer");
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
        "data-ocid": "customers.add_customer.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Add Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
                "aria-label": "Close",
                "data-ocid": "customers.add_customer.close_button",
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
                  placeholder: "e.g. Rajesh Kumar",
                  className: "h-11 rounded-xl",
                  "data-ocid": "customers.add_customer.name.input"
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
                  "data-ocid": "customers.add_customer.phone.input"
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
                  placeholder: "customer@example.com",
                  className: "h-11 rounded-xl",
                  "data-ocid": "customers.add_customer.email.input"
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
                  "data-ocid": "customers.add_customer.address.input"
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
                  "data-ocid": "customers.add_customer.gst.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSave,
                disabled: isPending,
                className: "w-full h-11 rounded-xl mt-2",
                "data-ocid": "customers.add_customer.submit_button",
                children: isPending ? "Saving..." : "Add Customer"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function CustomerDetail({ customer, index, onClose }) {
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
        "data-ocid": "customers.customer_detail.dialog",
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
                  children: getInitials(customer.name)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground", children: customer.name }),
                customer.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: customer.gstNumber })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
                "aria-label": "Close",
                "data-ocid": "customers.customer_detail.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-muted-foreground" })
              }
            )
          ] }),
          customer.pendingAmount > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 18, className: "text-red-600 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-red-700", children: [
                "₹",
                formatINR(customer.pendingAmount),
                " Outstanding"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500", children: "Payment pending" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: customer.phone })
              ] })
            ] }),
            customer.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: customer.email })
              ] })
            ] }),
            customer.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: customer.address })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-2xl px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Purchase" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground mt-0.5", children: [
                "₹",
                formatINR(customer.totalPurchaseAmount)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "rounded-2xl px-4 py-3",
                  customer.pendingAmount > BigInt(0) ? "bg-red-50" : "bg-emerald-50"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pending" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "font-display font-bold text-lg mt-0.5",
                        customer.pendingAmount > BigInt(0) ? "text-red-600" : "text-emerald-600"
                      ),
                      children: customer.pendingAmount > BigInt(0) ? `₹${formatINR(customer.pendingAmount)}` : "Nil"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${customer.phone}`,
                className: "flex-1 h-11 rounded-xl border border-border flex items-center justify-center gap-2 text-sm font-semibold text-foreground hover:bg-muted/40 transition-smooth",
                "data-ocid": "customers.customer_detail.call_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                  "Call"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 h-11 rounded-xl",
                onClick: () => ue.info("Invoice feature coming soon!"),
                "data-ocid": "customers.customer_detail.new_invoice_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14, className: "mr-1" }),
                  "New Invoice"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Customers() {
  const [search, setSearch] = reactExports.useState("");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const { data, isLoading, refetch } = useCustomers();
  const customers = (data == null ? void 0 : data.items) ?? [];
  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );
  const totalPending = customers.reduce(
    (sum, c) => sum + c.pendingAmount,
    BigInt(0)
  );
  const selectedIndex = selected ? customers.findIndex((c) => c.customerId === selected.customerId) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-4", "data-ocid": "customers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-3 grid grid-cols-2 gap-2 border-b border-border/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl px-3 py-3 bg-primary/5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: customers.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Customers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl px-3 py-3 bg-amber-50 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-amber-600", children: [
          "₹",
          formatINR(totalPending)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Pending" })
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
          placeholder: "Search by name or phone...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9 h-10 rounded-xl bg-muted border-0",
          "data-ocid": "customers.search_input"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        filtered.length,
        " customer",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "h-8 rounded-xl text-xs gap-1",
          onClick: () => setAddOpen(true),
          "data-ocid": "customers.add_customer_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Add Customer"
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
        "data-ocid": "customers.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Users,
            {
              size: 36,
              className: "text-muted-foreground mx-auto mb-3 opacity-30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No customers yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add your first customer to get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "mt-4 rounded-xl",
              onClick: () => setAddOpen(true),
              "data-ocid": "customers.empty_state.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
                " Add Customer"
              ]
            }
          )
        ]
      }
    ) : filtered.map((customer, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden cursor-pointer hover:shadow-elevated transition-smooth active:scale-[0.99]",
        onClick: () => setSelected(customer),
        "data-ocid": `customers.customer_item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                AVATAR_COLORS[i % AVATAR_COLORS.length]
              ),
              children: getInitials(customer.name)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: customer.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: customer.phone })
            ] }),
            customer.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: customer.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
              "₹",
              formatINR(customer.totalPurchaseAmount)
            ] }),
            customer.pendingAmount > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-semibold text-red-500 mt-0.5", children: [
              "₹",
              formatINR(customer.pendingAmount),
              " due"
            ] })
          ] })
        ] })
      },
      customer.customerId.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddCustomerDrawer,
      {
        open: addOpen,
        onClose: () => setAddOpen(false),
        onSaved: () => refetch()
      }
    ),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CustomerDetail,
      {
        customer: selected,
        index: selectedIndex,
        onClose: () => setSelected(null)
      }
    )
  ] });
}
export {
  Customers as default
};
