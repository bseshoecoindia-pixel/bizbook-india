import { InvoiceStatus, PaymentStatus } from "@/backend";
import type { InvoiceItem } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateInvoice } from "@/hooks/useBackend";
import { useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronLeft,
  FileText,
  Minus,
  Plus,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LineItem {
  _id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxPercent: number;
}

function calcLineTotal(item: LineItem): number {
  const gross = item.quantity * item.unitPrice;
  const disc = (gross * item.discount) / 100;
  const taxable = gross - disc;
  return taxable + (taxable * item.taxPercent) / 100;
}

function fmtINR(n: number): string {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function nextInvoiceNumber(): string {
  const now = new Date();
  const seq = String(Math.floor(Math.random() * 9) + 4).padStart(4, "0");
  return `INV-${now.getFullYear()}-${seq}`;
}

export default function NewBill() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateInvoice();

  const [invoiceNo] = useState(nextInvoiceNumber);
  const [invoiceDate, setInvoiceDate] = useState(todayStr());
  const [dueDate, setDueDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    PaymentStatus.Unpaid,
  );
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [items, setItems] = useState<LineItem[]>([
    {
      _id: 1,
      productName: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      taxPercent: 18,
    },
  ]);

  const addLine = () =>
    setItems((prev) => [
      ...prev,
      {
        _id: Date.now(),
        productName: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        taxPercent: 18,
      },
    ]);

  const removeLine = (id: number) =>
    setItems((prev) =>
      prev.length > 1 ? prev.filter((it) => it._id !== id) : prev,
    );

  const updateLine = (id: number, k: keyof LineItem, v: string | number) =>
    setItems((prev) =>
      prev.map((it) => (it._id === id ? { ...it, [k]: v } : it)),
    );

  // Derived totals
  const subtotal = items.reduce((s, it) => s + it.quantity * it.unitPrice, 0);
  const totalDiscount = items.reduce(
    (s, it) => s + (it.quantity * it.unitPrice * it.discount) / 100,
    0,
  );
  const taxable = subtotal - totalDiscount;
  const totalTax = items.reduce((s, it) => {
    const base = it.quantity * it.unitPrice * (1 - it.discount / 100);
    return s + (base * it.taxPercent) / 100;
  }, 0);
  const cgst = totalTax / 2;
  const sgst = totalTax / 2;
  const grandTotal = taxable + totalTax;
  const toPaise = (r: number) => BigInt(Math.round(r * 100));

  // Compute effective GST rate label from actual line items (weighted average)
  const effectiveGstRate = (() => {
    const taxableBase = items.reduce(
      (s, it) => s + it.quantity * it.unitPrice * (1 - it.discount / 100),
      0,
    );
    if (taxableBase === 0) return 0;
    const weightedRate =
      items.reduce(
        (s, it) =>
          s +
          it.quantity * it.unitPrice * (1 - it.discount / 100) * it.taxPercent,
        0,
      ) / taxableBase;
    return weightedRate;
  })();
  const halfRate = effectiveGstRate / 2;
  const gstLabel = (half: number) =>
    half % 1 === 0 ? `${half}%` : `${half.toFixed(2)}%`;

  const validate = () => {
    const errs: Record<string, string> = {};
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

  const handleSubmit = async (status: InvoiceStatus) => {
    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    try {
      const invoiceItems: InvoiceItem[] = items.map((it) => ({
        productName: it.productName,
        quantity: BigInt(it.quantity),
        unitPrice: toPaise(it.unitPrice),
        discount: toPaise((it.quantity * it.unitPrice * it.discount) / 100),
        taxPercent: BigInt(it.taxPercent),
        lineTotal: toPaise(calcLineTotal(it)),
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
        notes: notes.trim() || undefined,
        dueDate: dueDate
          ? BigInt(new Date(dueDate).getTime()) * BigInt(1_000_000)
          : undefined,
      });
      toast.success(
        status === InvoiceStatus.Draft ? "Draft saved!" : "Invoice created!",
      );
      navigate({ to: "/bills" });
    } catch {
      toast.error("Failed to create invoice. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-0 pb-32" data-ocid="new_bill.page">
      {/* Sub-header */}
      <div className="sticky top-0 z-20 flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/bills" })}
          aria-label="Back"
          data-ocid="new_bill.back_button"
        >
          <ChevronLeft size={18} />
        </Button>
        <div className="flex items-center gap-2">
          <Receipt size={16} className="text-primary" />
          <h2 className="font-display font-semibold text-base text-foreground">
            New Invoice
          </h2>
        </div>
        <div className="ml-auto text-xs text-muted-foreground font-mono">
          {invoiceNo}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Invoice meta */}
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <CalendarDays size={14} className="text-primary" /> Invoice Details
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Invoice Date
              </Label>
              <Input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="h-10 rounded-xl text-sm"
                data-ocid="new_bill.invoice_date_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={invoiceDate}
                className="h-10 rounded-xl text-sm"
                data-ocid="new_bill.due_date_input"
              />
            </div>
          </div>
        </Card>

        {/* Customer */}
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <h3 className="font-semibold text-sm text-foreground mb-3">
            Customer Details
          </h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Customer Name *
              </Label>
              <Input
                placeholder="e.g. Ravi Shankar Traders"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName)
                    setErrors((p) => ({ ...p, customerName: "" }));
                }}
                onBlur={() => {
                  if (!customerName.trim())
                    setErrors((p) => ({
                      ...p,
                      customerName: "Customer name is required",
                    }));
                }}
                className={`h-10 rounded-xl ${errors.customerName ? "border-destructive ring-destructive/30" : ""}`}
                data-ocid="new_bill.customer_name_input"
              />
              {errors.customerName && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="new_bill.customer_name_field_error"
                >
                  {errors.customerName}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Phone *</Label>
              <Input
                placeholder="+91 98765 43210"
                type="tel"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  if (errors.customerPhone)
                    setErrors((p) => ({ ...p, customerPhone: "" }));
                }}
                onBlur={() => {
                  if (!customerPhone.trim())
                    setErrors((p) => ({
                      ...p,
                      customerPhone: "Phone number is required",
                    }));
                }}
                className={`h-10 rounded-xl ${errors.customerPhone ? "border-destructive" : ""}`}
                data-ocid="new_bill.customer_phone_input"
              />
              {errors.customerPhone && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="new_bill.customer_phone_field_error"
                >
                  {errors.customerPhone}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Payment Status
              </Label>
              <Select
                value={paymentStatus}
                onValueChange={(v) => setPaymentStatus(v as PaymentStatus)}
              >
                <SelectTrigger
                  className="h-10 rounded-xl"
                  data-ocid="new_bill.payment_status_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentStatus.Unpaid}>Unpaid</SelectItem>
                  <SelectItem value={PaymentStatus.Partial_}>
                    Partial
                  </SelectItem>
                  <SelectItem value={PaymentStatus.Paid}>Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Line items */}
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-foreground">
              Items ({items.length})
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={addLine}
              className="h-7 text-xs rounded-lg gap-1 border-primary/30 text-primary"
              data-ocid="new_bill.add_item_button"
            >
              <Plus size={12} /> Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={item._id}
                className={`border rounded-xl p-3 space-y-2.5 ${errors[`item_${i}`] ? "border-destructive/50" : "border-border/60"}`}
                data-ocid={`new_bill.line_item.${i + 1}`}
              >
                {/* Product name row */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 space-y-1">
                    <Input
                      placeholder="Product / service name"
                      value={item.productName}
                      onChange={(e) => {
                        updateLine(item._id, "productName", e.target.value);
                        if (errors[`item_${i}`])
                          setErrors((p) => ({ ...p, [`item_${i}`]: "" }));
                      }}
                      className="h-9 rounded-lg text-sm"
                      data-ocid={`new_bill.product_name_input.${i + 1}`}
                    />
                    {errors[`item_${i}`] && (
                      <p className="text-[11px] text-destructive">
                        {errors[`item_${i}`]}
                      </p>
                    )}
                  </div>
                  {items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-destructive shrink-0 hover:bg-destructive/10"
                      onClick={() => removeLine(item._id)}
                      aria-label="Remove item"
                      data-ocid={`new_bill.remove_item_button.${i + 1}`}
                    >
                      <Minus size={14} />
                    </Button>
                  )}
                </div>

                {/* Qty / Price / Discount / Tax */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground block">
                      Qty *
                    </Label>
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateLine(item._id, "quantity", Number(e.target.value))
                      }
                      className={`h-8 rounded-lg text-sm text-center ${errors[`qty_${i}`] ? "border-destructive" : ""}`}
                      data-ocid={`new_bill.quantity_input.${i + 1}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground block">
                      Price (₹) *
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateLine(
                          item._id,
                          "unitPrice",
                          Number(e.target.value),
                        )
                      }
                      className={`h-8 rounded-lg text-sm ${errors[`price_${i}`] ? "border-destructive" : ""}`}
                      data-ocid={`new_bill.price_input.${i + 1}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground block">
                      Disc %
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={item.discount}
                      onChange={(e) =>
                        updateLine(item._id, "discount", Number(e.target.value))
                      }
                      className="h-8 rounded-lg text-sm"
                      data-ocid={`new_bill.discount_input.${i + 1}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground block">
                      Tax %
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={item.taxPercent}
                      onChange={(e) =>
                        updateLine(
                          item._id,
                          "taxPercent",
                          Number(e.target.value),
                        )
                      }
                      className="h-8 rounded-lg text-sm"
                      data-ocid={`new_bill.tax_input.${i + 1}`}
                    />
                  </div>
                </div>

                {/* Line total */}
                <div className="flex items-center justify-between pt-1 border-t border-border/40">
                  <span className="text-[11px] text-muted-foreground">
                    {item.quantity > 0 && item.unitPrice > 0
                      ? `${item.quantity} × ₹${fmtINR(item.unitPrice)}`
                      : ""}
                    {item.discount > 0 ? ` − ${item.discount}% disc` : ""}
                    {item.taxPercent > 0 ? ` + ${item.taxPercent}% GST` : ""}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    ₹{fmtINR(calcLineTotal(item))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notes */}
        <Card className="p-4 shadow-card rounded-2xl border-0 bg-card">
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Notes (Optional)
          </Label>
          <Textarea
            placeholder="Payment terms, delivery notes, or any other information..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="rounded-xl resize-none text-sm"
            rows={2}
            data-ocid="new_bill.notes_textarea"
          />
        </Card>

        {/* Summary card */}
        <Card className="overflow-hidden shadow-card rounded-2xl border-0">
          <div className="px-4 py-3 bg-muted/40 border-b border-border/50">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <FileText size={14} className="text-primary" /> Invoice Summary
            </h3>
          </div>
          <div className="px-4 py-3 space-y-2.5">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                ₹{fmtINR(subtotal)}
              </span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600 font-medium">
                  −₹{fmtINR(totalDiscount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>CGST ({gstLabel(halfRate)})</span>
              <span>₹{fmtINR(cgst)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>SGST ({gstLabel(halfRate)})</span>
              <span>₹{fmtINR(sgst)}</span>
            </div>
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-base text-foreground">
                Grand Total
              </span>
              <div className="text-right">
                <span className="font-display font-bold text-2xl text-primary">
                  ₹{fmtINR(grandTotal)}
                </span>
              </div>
            </div>
          </div>
          {/* Teal highlight strip */}
          <div className="px-4 py-2 bg-primary/8 border-t border-primary/20">
            <p className="text-[11px] text-primary text-center font-medium">
              GST Inclusive · CGST + SGST = ₹{fmtINR(totalTax)}
            </p>
          </div>
        </Card>
      </div>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 py-3 max-w-md mx-auto">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl text-sm border-border"
            onClick={() => handleSubmit(InvoiceStatus.Draft)}
            disabled={isPending}
            data-ocid="new_bill.save_draft_button"
          >
            Save Draft
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl text-sm bg-primary hover:bg-primary/90 shadow-sm"
            onClick={() => handleSubmit(InvoiceStatus.Sent)}
            disabled={isPending}
            data-ocid="new_bill.submit_button"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Saving…
              </span>
            ) : (
              "Create Invoice"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
