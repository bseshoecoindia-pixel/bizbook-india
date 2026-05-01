import { c as createLucideIcon, v as useParams, a as useNavigate, w as useInvoice, x as useUpdateInvoicePaymentStatus, y as useDeleteInvoice, j as jsxRuntimeExports, B as Button, d as cn, z as Separator, q as PaymentStatus, e as ue, S as Skeleton, I as InvoiceStatus } from "./index-BOl89Uzk.js";
import { P as Pencil, A as AlertDialog, a as AlertDialogTrigger, T as Trash2, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DcuOgEaX.js";
import { B as Badge } from "./badge-BaYXkJRd.js";
import { C as Card } from "./card-CX7VVhkd.js";
import { C as ChevronLeft } from "./chevron-left-DzoJVfGU.js";
import { B as Building2 } from "./building-2-B5k5tGKa.js";
import { P as Phone } from "./phone-DCOg1z2M.js";
import { C as CircleCheck } from "./circle-check-RvQ6t2T5.js";
import { D as Download } from "./download-DICvaxtc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100
  );
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function invoiceStatusBadge(status) {
  if (status === InvoiceStatus.Paid)
    return "bg-green-50 text-green-700 border-green-200";
  if (status === InvoiceStatus.Sent)
    return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-muted text-muted-foreground border-border";
}
function paymentStatusBadge(status) {
  if (status === PaymentStatus.Paid)
    return {
      cls: "bg-green-50 text-green-700 border-green-200",
      label: "Paid"
    };
  if (status === PaymentStatus.Partial_)
    return {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      label: "Partial"
    };
  return { cls: "bg-red-50 text-red-700 border-red-200", label: "Unpaid" };
}
function BillDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl" })
  ] });
}
function buildShareText(inv) {
  const total = `₹${formatINR(inv.total)}`;
  return `Invoice ${inv.invoiceNumber}
Customer: ${inv.customerName}
Amount: ${total}
Status: ${inv.paymentStatus}
Date: ${formatDate(inv.createdAt)}`;
}
function BillDetail() {
  const { id } = useParams({ from: "/app-layout/bills/$id" });
  const navigate = useNavigate();
  const { data: invoice, isLoading } = useInvoice(id ? BigInt(id) : null);
  const { mutate: updateStatus, isPending: updatingStatus } = useUpdateInvoicePaymentStatus();
  const { mutate: deleteInvoice, isPending: deleting } = useDeleteInvoice();
  const handleMarkPaid = () => {
    if (!invoice) return;
    updateStatus(
      { id: invoice.invoiceId, paymentStatus: PaymentStatus.Paid },
      {
        onSuccess: () => ue.success("Marked as Paid!"),
        onError: () => ue.error("Failed to update status")
      }
    );
  };
  const handleDelete = () => {
    if (!invoice) return;
    deleteInvoice(invoice.invoiceId, {
      onSuccess: () => {
        ue.success("Invoice deleted");
        navigate({ to: "/bills" });
      },
      onError: () => ue.error("Failed to delete invoice")
    });
  };
  const handleShare = async () => {
    if (!invoice) return;
    const text = buildShareText(invoice);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${invoice.invoiceNumber}`,
          text
        });
      } catch {
      }
    } else {
      await navigator.clipboard.writeText(text);
      ue.success("Invoice details copied to clipboard");
    }
  };
  const handleDownload = () => {
    window.print();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          body > *:not(#print-root) { display: none !important; }
          #print-root { display: block !important; }
          .no-print { display: none !important; }
          .print-invoice { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col gap-0 pb-32",
        "data-ocid": "bill_detail.page",
        id: "print-root",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-print sticky top-0 z-20 flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                onClick: () => navigate({ to: "/bills" }),
                "aria-label": "Back",
                "data-ocid": "bill_detail.back_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 15, className: "text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground truncate", children: isLoading ? "Loading…" : (invoice == null ? void 0 : invoice.invoiceNumber) ?? "Invoice" })
            ] }),
            invoice && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-muted-foreground",
                onClick: handleShare,
                "aria-label": "Share invoice",
                "data-ocid": "bill_detail.share_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 16 })
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BillDetailSkeleton, {}) : !invoice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-4 pt-12 text-center",
              "data-ocid": "bill_detail.not_found_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Building2,
                  {
                    size: 24,
                    className: "text-muted-foreground opacity-50"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Invoice not found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "This invoice may have been deleted." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "rounded-xl",
                    onClick: () => navigate({ to: "/bills" }),
                    children: "Back to Bills"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-4 print-invoice", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Invoice Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: invoice.invoiceNumber }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(invoice.createdAt) }),
                  invoice.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 mt-0.5", children: [
                    "Due: ",
                    formatDate(invoice.dueDate)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-xs px-2 py-0.5 border",
                        invoiceStatusBadge(invoice.status)
                      ),
                      children: invoice.status
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-xs px-2 py-0.5 border",
                        paymentStatusBadge(invoice.paymentStatus).cls
                      ),
                      children: paymentStatusBadge(invoice.paymentStatus).label
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/8 border border-primary/20 px-4 py-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary/70 mb-0.5", children: "Total Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-3xl text-primary", children: [
                  "₹",
                  formatINR(invoice.total)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3", children: "Bill To" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-base text-foreground leading-snug", children: invoice.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12, className: "text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: invoice.customerPhone })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-muted/30 border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Item" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide text-center", children: "Qty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide text-right", children: "Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide text-right", children: "Total" })
              ] }) }),
              invoice.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No items on this invoice" }) }) : invoice.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-4 py-3 border-b border-border/40 last:border-0",
                  "data-ocid": `bill_detail.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-1 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-tight", children: item.productName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                        item.taxPercent.toString(),
                        "% GST",
                        item.discount > BigInt(0) ? ` · disc ₹${formatINR(item.discount)}` : ""
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-2 text-sm text-muted-foreground text-center pt-0.5", children: item.quantity.toString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "col-span-2 text-sm text-muted-foreground text-right pt-0.5", children: [
                      "₹",
                      formatINR(item.unitPrice)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "col-span-3 text-sm font-semibold text-foreground text-right pt-0.5", children: [
                      "₹",
                      formatINR(item.lineTotal)
                    ] })
                  ] })
                },
                i
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                    "₹",
                    formatINR(invoice.subtotal)
                  ] })
                ] }),
                invoice.discount > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "Discount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 font-medium", children: [
                    "−₹",
                    formatINR(invoice.discount)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "CGST (9%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    "₹",
                    formatINR(invoice.cgst)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "SGST (9%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    "₹",
                    formatINR(invoice.sgst)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 bg-primary/8 border-t border-primary/20 flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-base text-foreground", children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl text-primary", children: [
                  "₹",
                  formatINR(invoice.total)
                ] })
              ] })
            ] }),
            invoice.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2", children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: invoice.notes })
            ] })
          ] })
        ]
      }
    ),
    invoice && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-print fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 py-3 max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      invoice.paymentStatus !== PaymentStatus.Paid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "flex-1 h-11 rounded-xl text-sm bg-primary hover:bg-primary/90 gap-1.5",
          onClick: handleMarkPaid,
          disabled: updatingStatus,
          "data-ocid": "bill_detail.mark_paid_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15 }),
            updatingStatus ? "Updating…" : "Mark Paid"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "h-11 px-3 rounded-xl border-border",
          onClick: handleDownload,
          "aria-label": "Download / Print",
          "data-ocid": "bill_detail.download_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "h-11 px-3 rounded-xl border-border",
          onClick: () => ue.info("Edit coming soon"),
          "aria-label": "Edit invoice",
          "data-ocid": "bill_detail.edit_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "h-11 px-3 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/5",
            "aria-label": "Delete invoice",
            "data-ocid": "bill_detail.delete_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "bill_detail.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Invoice?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Invoice ",
              invoice.invoiceNumber,
              " will be permanently deleted. This cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "bill_detail.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                disabled: deleting,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "bill_detail.confirm_button",
                children: deleting ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BillDetail as default
};
