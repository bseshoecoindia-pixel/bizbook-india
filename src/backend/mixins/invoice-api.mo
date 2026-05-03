import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import InvoiceLib "../lib/invoice";
import InvoiceTypes "../types/invoice";
import CommonTypes "../types/common";
import CustomerTypes "../types/customer";
import BusinessTypes "../types/business";
import EmailClient "mo:caffeineai-email/emailClient";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  accessControlState : AccessControl.AccessControlState,
  invoices : InvoiceLib.State,
  nextInvoiceId : { var val : Nat },
  customers : List.List<CustomerTypes.Customer>,
  businessProfiles : Map.Map<Principal, BusinessTypes.BusinessProfile>,
) {
  public query ({ caller }) func getInvoice(id : CommonTypes.InvoiceId) : async ?InvoiceTypes.Invoice {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvoiceLib.getById(invoices, id);
  };

  public query ({ caller }) func listInvoices(page : Nat, pageSize : Nat) : async CommonTypes.PaginatedResult<InvoiceTypes.Invoice> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvoiceLib.list(invoices, page, pageSize);
  };

  public query ({ caller }) func getInvoicesByStatus(status : CommonTypes.InvoiceStatus) : async [InvoiceTypes.Invoice] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvoiceLib.getByStatus(invoices, status);
  };

  public query ({ caller }) func getInvoicesByCustomer(customerId : CommonTypes.CustomerId) : async [InvoiceTypes.Invoice] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvoiceLib.getByCustomer(invoices, customerId);
  };

  public shared ({ caller }) func createInvoice(input : InvoiceTypes.InvoiceInput) : async InvoiceTypes.Invoice {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextInvoiceId.val;
    nextInvoiceId.val += 1;
    InvoiceLib.create(invoices, id, input);
  };

  public shared ({ caller }) func updateInvoice(id : CommonTypes.InvoiceId, input : InvoiceTypes.InvoiceInput) : async ?InvoiceTypes.Invoice {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvoiceLib.update(invoices, id, input);
  };

  public shared ({ caller }) func deleteInvoice(id : CommonTypes.InvoiceId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvoiceLib.delete(invoices, id);
  };

  public shared ({ caller }) func updateInvoicePaymentStatus(id : CommonTypes.InvoiceId, paymentStatus : CommonTypes.PaymentStatus) : async ?InvoiceTypes.Invoice {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InvoiceLib.updatePaymentStatus(invoices, id, paymentStatus);
  };

  public shared ({ caller }) func sendInvoiceEmail(invoiceId : CommonTypes.InvoiceId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };

    let inv = switch (InvoiceLib.getById(invoices, invoiceId)) {
      case null { return false };
      case (?i) { i };
    };

    // Resolve customer email
    let customerEmail : ?Text = switch (inv.customerId) {
      case null null;
      case (?cid) {
        switch (customers.find(func(c) { c.customerId == cid })) {
          case null null;
          case (?c) { c.email };
        };
      };
    };

    let toEmail = switch (customerEmail) {
      case null { return false }; // no email on file — cannot send
      case (?e) { e };
    };

    // Resolve business name from caller's profile
    let businessName = switch (businessProfiles.get(caller)) {
      case null "BizBook India";
      case (?bp) { bp.name };
    };

    let subject = "Invoice #" # inv.invoiceNumber # " from " # businessName;

    // Build line items HTML rows
    var itemRows : Text = "";
    for (item in inv.items.values()) {
      let total = item.lineTotal / 100;
      let totalPaise = item.lineTotal % 100;
      let price = item.unitPrice / 100;
      let pricePaise = item.unitPrice % 100;
      itemRows #= "<tr>" #
        "<td style='padding:8px;border:1px solid #e2e8f0'>" # item.productName # "</td>" #
        "<td style='padding:8px;border:1px solid #e2e8f0;text-align:center'>" # item.quantity.toText() # "</td>" #
        "<td style='padding:8px;border:1px solid #e2e8f0;text-align:right'>&#8377;" # price.toText() # "." # (if (pricePaise < 10) "0" # pricePaise.toText() else pricePaise.toText()) # "</td>" #
        "<td style='padding:8px;border:1px solid #e2e8f0;text-align:right'>&#8377;" # total.toText() # "." # (if (totalPaise < 10) "0" # totalPaise.toText() else totalPaise.toText()) # "</td>" #
        "</tr>";
    };

    // Format money helper values
    let subtotalRs = inv.subtotal / 100;
    let subtotalPaise = inv.subtotal % 100;
    let cgstRs = inv.cgst / 100;
    let cgstPaise = inv.cgst % 100;
    let sgstRs = inv.sgst / 100;
    let sgstPaise = inv.sgst % 100;
    let discountRs = inv.discount / 100;
    let discountPaise = inv.discount % 100;
    let totalRs = inv.total / 100;
    let totalPaise2 = inv.total % 100;

    let discountRow = if (inv.discount > 0) {
      "<tr><td colspan='3' style='text-align:right;padding:6px'>Discount:</td>" #
      "<td style='text-align:right;padding:6px;color:#e53e3e'>-&#8377;" # discountRs.toText() # "." # (if (discountPaise < 10) "0" # discountPaise.toText() else discountPaise.toText()) # "</td></tr>"
    } else { "" };

    let htmlBody =
      "<!DOCTYPE html><html><body style='font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px'>" #
      "<div style='background:#1a56db;color:white;padding:20px;border-radius:8px 8px 0 0'>" #
      "<h1 style='margin:0;font-size:24px'>" # businessName # "</h1>" #
      "<p style='margin:4px 0 0'>Tax Invoice</p></div>" #
      "<div style='background:#f8fafc;padding:20px;border:1px solid #e2e8f0'>" #
      "<table style='width:100%'><tr>" #
      "<td><strong>Invoice No:</strong> " # inv.invoiceNumber # "</td>" #
      "<td style='text-align:right'><strong>Status:</strong> " # (switch (inv.status) { case (#Draft) "Draft"; case (#Sent) "Sent"; case (#Paid) "Paid" }) # "</td>" #
      "</tr></table>" #
      "<p><strong>Bill To:</strong> " # inv.customerName # "</p>" #
      "</div>" #
      "<table style='width:100%;border-collapse:collapse;margin-top:16px'>" #
      "<thead><tr style='background:#edf2f7'>" #
      "<th style='padding:10px;border:1px solid #e2e8f0;text-align:left'>Item</th>" #
      "<th style='padding:10px;border:1px solid #e2e8f0;text-align:center'>Qty</th>" #
      "<th style='padding:10px;border:1px solid #e2e8f0;text-align:right'>Rate</th>" #
      "<th style='padding:10px;border:1px solid #e2e8f0;text-align:right'>Amount</th>" #
      "</tr></thead><tbody>" # itemRows # "</tbody>" #
      "<tfoot>" #
      "<tr><td colspan='3' style='text-align:right;padding:6px'><strong>Subtotal:</strong></td>" #
      "<td style='text-align:right;padding:6px'>&#8377;" # subtotalRs.toText() # "." # (if (subtotalPaise < 10) "0" # subtotalPaise.toText() else subtotalPaise.toText()) # "</td></tr>" #
      "<tr><td colspan='3' style='text-align:right;padding:6px'>CGST (9%):</td>" #
      "<td style='text-align:right;padding:6px'>&#8377;" # cgstRs.toText() # "." # (if (cgstPaise < 10) "0" # cgstPaise.toText() else cgstPaise.toText()) # "</td></tr>" #
      "<tr><td colspan='3' style='text-align:right;padding:6px'>SGST (9%):</td>" #
      "<td style='text-align:right;padding:6px'>&#8377;" # sgstRs.toText() # "." # (if (sgstPaise < 10) "0" # sgstPaise.toText() else sgstPaise.toText()) # "</td></tr>" #
      discountRow #
      "<tr style='background:#edf2f7'><td colspan='3' style='text-align:right;padding:8px'><strong>Total:</strong></td>" #
      "<td style='text-align:right;padding:8px;font-size:18px;font-weight:bold'>&#8377;" # totalRs.toText() # "." # (if (totalPaise2 < 10) "0" # totalPaise2.toText() else totalPaise2.toText()) # "</td></tr>" #
      "</tfoot></table>" #
      (switch (inv.notes) {
        case null "";
        case (?n) "<p style='margin-top:16px;color:#718096'><em>Note: " # n # "</em></p>";
      }) #
      "<p style='margin-top:24px;color:#718096;font-size:12px;text-align:center'>Thank you for your business!</p>" #
      "</body></html>";

    let result = await EmailClient.sendServiceEmail(
      "noreply",
      [toEmail],
      subject,
      htmlBody,
    );

    switch (result) {
      case (#ok) {
        ignore InvoiceLib.markEmailSent(invoices, invoiceId);
        true;
      };
      case (#err(_)) { false };
    };
  };
};
