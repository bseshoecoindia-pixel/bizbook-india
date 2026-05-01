import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import InvoiceLib "../lib/invoice";
import InvoiceTypes "../types/invoice";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  invoices : InvoiceLib.State,
  nextInvoiceId : { var val : Nat },
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
};
