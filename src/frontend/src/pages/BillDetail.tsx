import { InvoiceStatus, PaymentStatus } from "@/backend";
import type { Invoice } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCustomer,
  useDeleteInvoice,
  useInvoice,
  useSendInvoiceEmail,
  useUpdateInvoicePaymentStatus,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  Download,
  Mail,
  MailCheck,
  Pencil,
  Phone,
  Share2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatINR(paise: bigint): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100,
  );
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function invoiceStatusBadge(status: InvoiceStatus) {
  if (status === InvoiceStatus.Paid)
    return "bg-green-50 text-green-700 border-green-200";
  if (status === InvoiceStatus.Sent)
    return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-muted text-muted-foreground border-border";
}

function paymentStatusBadge(status: PaymentStatus) {
  if (status === PaymentStatus.Paid)
    return {
      cls: "bg-green-50 text-green-700 border-green-200",
      label: "Paid",
    };
  if (status === PaymentStatus.Partial_)
    return {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      label: "Partial",
    };
  return { cls: "bg-red-50 text-red-700 border-red-200", label: "Unpaid" };
}

function BillDetailSkeleton() {
  return (
    <div className="px-4 pt-4 space-y-3">
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
      <Skeleton className="h-48 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  );
}

function buildShareText(inv: Invoice): string {
  const total = `₹${formatINR(inv.total)}`;
  return `Invoice ${inv.invoiceNumber}\nCustomer: ${inv.customerName}\nAmount: ${total}\nStatus: ${inv.paymentStatus}\nDate: ${formatDate(inv.createdAt)}`;
}

export default function BillDetail() {
  const { id } = useParams({ from: "/app-layout/bills/$id" });
  const navigate = useNavigate();
  const { data: invoice, isLoading } = useInvoice(id ? BigInt(id) : null);
  const { mutate: updateStatus, isPending: updatingStatus } =
    useUpdateInvoicePaymentStatus();
  const { mutate: deleteInvoice, isPending: deleting } = useDeleteInvoice();
  const { mutate: sendEmail, isPending: sendingEmail } = useSendInvoiceEmail();
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  // Fetch customer to get email address
  const { data: customer } = useCustomer(invoice?.customerId ?? null);

  const handleMarkPaid = () => {
    if (!invoice) return;
    updateStatus(
      { id: invoice.invoiceId, paymentStatus: PaymentStatus.Paid },
      {
        onSuccess: () => toast.success("Marked as Paid!"),
        onError: () => toast.error("Failed to update status"),
      },
    );
  };

  const handleDelete = () => {
    if (!invoice) return;
    deleteInvoice(invoice.invoiceId, {
      onSuccess: () => {
        toast.success("Invoice deleted");
        navigate({ to: "/bills" });
      },
      onError: () => toast.error("Failed to delete invoice"),
    });
  };

  const handleShare = async () => {
    if (!invoice) return;
    const text = buildShareText(invoice);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${invoice.invoiceNumber}`,
          text,
        });
      } catch {
        // User cancelled share — silent
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Invoice details copied to clipboard");
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const handleSendEmail = () => {
    if (!invoice) return;
    sendEmail(invoice.invoiceId, {
      onSuccess: () => {
        toast.success("Invoice emailed successfully!");
        setEmailDialogOpen(false);
      },
      onError: (err) => {
        toast.error(
          err instanceof Error ? err.message : "Failed to send email",
        );
      },
    });
  };

  const customerEmail = customer?.email ?? undefined;
  const canEmail = !!customerEmail;

  return (
    <>
      {/* Print styles injected inline */}
      <style>{`
        @media print {
          body > *:not(#print-root) { display: none !important; }
          #print-root { display: block !important; }
          .no-print { display: none !important; }
          .print-invoice { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div
        className="flex flex-col gap-0 pb-32"
        data-ocid="bill_detail.page"
        id="print-root"
      >
        {/* Sub-header */}
        <div className="no-print sticky top-0 z-20 flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate({ to: "/bills" })}
            aria-label="Back"
            data-ocid="bill_detail.back_button"
          >
            <ChevronLeft size={18} />
          </Button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Building2 size={15} className="text-primary shrink-0" />
            <h2 className="font-display font-semibold text-base text-foreground truncate">
              {isLoading ? "Loading…" : (invoice?.invoiceNumber ?? "Invoice")}
            </h2>
          </div>
          {invoice && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={handleShare}
              aria-label="Share invoice"
              data-ocid="bill_detail.share_button"
            >
              <Share2 size={16} />
            </Button>
          )}
        </div>

        {isLoading ? (
          <BillDetailSkeleton />
        ) : !invoice ? (
          <div
            className="px-4 pt-12 text-center"
            data-ocid="bill_detail.not_found_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Building2
                size={24}
                className="text-muted-foreground opacity-50"
              />
            </div>
            <p className="font-semibold text-foreground mb-1">
              Invoice not found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              This invoice may have been deleted.
            </p>
            <Button
              className="rounded-xl"
              onClick={() => navigate({ to: "/bills" })}
            >
              Back to Bills
            </Button>
          </div>
        ) : (
          <div className="px-4 pt-4 space-y-4 print-invoice">
            {/* Invoice header card */}
            <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Invoice Number
                  </p>
                  <p className="font-display font-bold text-lg text-foreground">
                    {invoice.invoiceNumber}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(invoice.createdAt)}
                  </p>
                  {invoice.dueDate && (
                    <p className="text-xs text-amber-600 mt-0.5">
                      Due: {formatDate(invoice.dueDate)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0.5 border",
                      invoiceStatusBadge(invoice.status),
                    )}
                  >
                    {invoice.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0.5 border",
                      paymentStatusBadge(invoice.paymentStatus).cls,
                    )}
                  >
                    {paymentStatusBadge(invoice.paymentStatus).label}
                  </Badge>
                </div>
              </div>

              <Separator className="my-3" />

              {/* Grand total highlight */}
              <div className="rounded-xl bg-primary/8 border border-primary/20 px-4 py-3 text-center">
                <p className="text-xs text-primary/70 mb-0.5">Total Amount</p>
                <p className="font-display font-bold text-3xl text-primary">
                  ₹{formatINR(invoice.total)}
                </p>
              </div>
            </Card>

            {/* Customer card */}
            <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Bill To
              </h3>
              <p className="font-semibold text-base text-foreground leading-snug">
                {invoice.customerName}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <Phone size={12} className="text-muted-foreground shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {invoice.customerPhone}
                </p>
              </div>
            </Card>

            {/* Items table */}
            <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
              <div className="px-4 py-3 bg-muted/30 border-b border-border/40">
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Item
                  </span>
                  <span className="col-span-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide text-center">
                    Qty
                  </span>
                  <span className="col-span-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide text-right">
                    Rate
                  </span>
                  <span className="col-span-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide text-right">
                    Total
                  </span>
                </div>
              </div>

              {invoice.items.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    No items on this invoice
                  </p>
                </div>
              ) : (
                invoice.items.map((item, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
                    key={i}
                    className="px-4 py-3 border-b border-border/40 last:border-0"
                    data-ocid={`bill_detail.item.${i + 1}`}
                  >
                    <div className="grid grid-cols-12 gap-1 items-start">
                      <div className="col-span-5">
                        <p className="text-sm font-medium text-foreground leading-tight">
                          {item.productName}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {item.taxPercent.toString()}% GST
                          {item.discount > BigInt(0)
                            ? ` · disc ₹${formatINR(item.discount)}`
                            : ""}
                        </p>
                      </div>
                      <p className="col-span-2 text-sm text-muted-foreground text-center pt-0.5">
                        {item.quantity.toString()}
                      </p>
                      <p className="col-span-2 text-sm text-muted-foreground text-right pt-0.5">
                        ₹{formatINR(item.unitPrice)}
                      </p>
                      <p className="col-span-3 text-sm font-semibold text-foreground text-right pt-0.5">
                        ₹{formatINR(item.lineTotal)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </Card>

            {/* Totals card */}
            <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
              <div className="px-4 py-3 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">
                    ₹{formatINR(invoice.subtotal)}
                  </span>
                </div>
                {invoice.discount > BigInt(0) && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600 font-medium">
                      −₹{formatINR(invoice.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CGST (9%)</span>
                  <span className="text-foreground">
                    ₹{formatINR(invoice.cgst)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SGST (9%)</span>
                  <span className="text-foreground">
                    ₹{formatINR(invoice.sgst)}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 bg-primary/8 border-t border-primary/20 flex justify-between items-center">
                <span className="font-bold text-base text-foreground">
                  Grand Total
                </span>
                <span className="font-display font-bold text-xl text-primary">
                  ₹{formatINR(invoice.total)}
                </span>
              </div>
            </Card>

            {/* Notes */}
            {invoice.notes && (
              <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
                <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Notes
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {invoice.notes}
                </p>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Fixed bottom action bar */}
      {invoice && !isLoading && (
        <div className="no-print fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 py-3 max-w-md mx-auto">
          <div className="flex gap-2">
            {/* Mark Paid (primary action) */}
            {invoice.paymentStatus !== PaymentStatus.Paid && (
              <Button
                className="flex-1 h-11 rounded-xl text-sm bg-primary hover:bg-primary/90 gap-1.5"
                onClick={handleMarkPaid}
                disabled={updatingStatus}
                data-ocid="bill_detail.mark_paid_button"
              >
                <CheckCircle2 size={15} />
                {updatingStatus ? "Updating…" : "Mark Paid"}
              </Button>
            )}

            {/* Email Invoice */}
            {!invoice.customerId ? null : !canEmail ? (
              <Button
                variant="outline"
                className="h-11 px-3 rounded-xl border-border text-muted-foreground"
                onClick={() => toast.info("Customer has no email address")}
                aria-label="No email available"
                data-ocid="bill_detail.email_unavailable_button"
                type="button"
              >
                <Mail size={16} />
              </Button>
            ) : invoice.emailSent ? (
              <Button
                variant="outline"
                className="h-11 px-3 rounded-xl border-green-200 text-green-700 hover:bg-green-50 gap-1.5"
                onClick={() => setEmailDialogOpen(true)}
                aria-label="Email sent — resend"
                data-ocid="bill_detail.email_sent_button"
                type="button"
              >
                <MailCheck size={15} />
                <span className="text-xs font-medium">Sent</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="h-11 px-3 rounded-xl border-border gap-1.5"
                onClick={() => setEmailDialogOpen(true)}
                aria-label="Email Invoice"
                data-ocid="bill_detail.email_button"
                type="button"
              >
                <Mail size={15} />
                <span className="text-xs font-medium hidden sm:inline">
                  Email
                </span>
              </Button>
            )}

            {/* Download */}
            <Button
              variant="outline"
              className="h-11 px-3 rounded-xl border-border"
              onClick={handleDownload}
              aria-label="Download / Print"
              data-ocid="bill_detail.download_button"
            >
              <Download size={16} />
            </Button>

            {/* Edit (placeholder navigation) */}
            <Button
              variant="outline"
              className="h-11 px-3 rounded-xl border-border"
              onClick={() => toast.info("Edit coming soon")}
              aria-label="Edit invoice"
              data-ocid="bill_detail.edit_button"
            >
              <Pencil size={16} />
            </Button>

            {/* Delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 px-3 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/5"
                  aria-label="Delete invoice"
                  data-ocid="bill_detail.delete_button"
                >
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="bill_detail.delete_dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Invoice?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Invoice {invoice.invoiceNumber} will be permanently deleted.
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="bill_detail.cancel_button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-ocid="bill_detail.confirm_button"
                  >
                    {deleting ? "Deleting…" : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
      {/* Email confirmation dialog */}
      {invoice && (
        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogContent data-ocid="bill_detail.email_dialog">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                {invoice.emailSent ? "Resend Invoice" : "Send Invoice"}
              </DialogTitle>
              <DialogDescription>
                {canEmail ? (
                  <>
                    Send invoice{" "}
                    <span className="font-semibold text-foreground">
                      {invoice.invoiceNumber}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-foreground">
                      {customerEmail}
                    </span>
                    ?
                    {invoice.emailSent && (
                      <span className="block mt-1 text-amber-600 text-xs">
                        This invoice was already emailed. Sending again will
                        deliver a duplicate.
                      </span>
                    )}
                  </>
                ) : (
                  "Customer has no email address on file."
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setEmailDialogOpen(false)}
                data-ocid="bill_detail.email_cancel_button"
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="rounded-xl gap-1.5"
                onClick={handleSendEmail}
                disabled={sendingEmail || !canEmail}
                data-ocid="bill_detail.email_confirm_button"
                type="button"
              >
                {sendingEmail ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Mail size={14} />
                    {invoice.emailSent ? "Resend" : "Send Email"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
