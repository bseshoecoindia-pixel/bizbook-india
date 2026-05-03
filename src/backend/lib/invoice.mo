import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import InvoiceTypes "../types/invoice";

module {
  public type State = List.List<InvoiceTypes.Invoice>;

  // 1 day in nanoseconds
  let dayNs : Int = 86_400_000_000_000;

  public func create(state : State, nextId : Nat, input : InvoiceTypes.InvoiceInput) : InvoiceTypes.Invoice {
    let now = Time.now();
    let invoice : InvoiceTypes.Invoice = {
      invoiceId = nextId;
      invoiceNumber = generateInvoiceNumber(nextId);
      customerId = input.customerId;
      customerName = input.customerName;
      customerPhone = input.customerPhone;
      items = input.items;
      subtotal = input.subtotal;
      cgst = input.cgst;
      sgst = input.sgst;
      discount = input.discount;
      total = input.total;
      notes = input.notes;
      dueDate = input.dueDate;
      paymentStatus = input.paymentStatus;
      status = input.status;
      emailSent = false;
      createdAt = now;
      updatedAt = now;
    };
    state.add(invoice);
    invoice;
  };

  public func getById(state : State, id : CommonTypes.InvoiceId) : ?InvoiceTypes.Invoice {
    state.find(func(inv) { inv.invoiceId == id });
  };

  public func update(state : State, id : CommonTypes.InvoiceId, input : InvoiceTypes.InvoiceInput) : ?InvoiceTypes.Invoice {
    var updated : ?InvoiceTypes.Invoice = null;
    state.mapInPlace(func(inv) {
      if (inv.invoiceId == id) {
        let u : InvoiceTypes.Invoice = {
          inv with
          customerId = input.customerId;
          customerName = input.customerName;
          customerPhone = input.customerPhone;
          items = input.items;
          subtotal = input.subtotal;
          cgst = input.cgst;
          sgst = input.sgst;
          discount = input.discount;
          total = input.total;
          notes = input.notes;
          dueDate = input.dueDate;
          paymentStatus = input.paymentStatus;
          status = input.status;
          updatedAt = Time.now();
        };
        updated := ?u;
        u;
      } else { inv };
    });
    updated;
  };

  public func delete(state : State, id : CommonTypes.InvoiceId) : Bool {
    let sizeBefore = state.size();
    let filtered = state.filter(func(inv) { inv.invoiceId != id });
    state.clear();
    state.append(filtered);
    state.size() < sizeBefore;
  };

  public func list(state : State, page : Nat, pageSize : Nat) : CommonTypes.PaginatedResult<InvoiceTypes.Invoice> {
    let total = state.size();
    let start : Int = page * pageSize;
    let startNat : Nat = if (start < 0) 0 else start.toNat();
    let endNat : Nat = if (startNat + pageSize > total) total else startNat + pageSize;
    let items = state.sliceToArray(startNat, endNat);
    { items; total; page; pageSize };
  };

  public func getByStatus(state : State, status : CommonTypes.InvoiceStatus) : [InvoiceTypes.Invoice] {
    state.filter(func(inv) {
      switch (inv.status, status) {
        case (#Draft, #Draft) true;
        case (#Sent, #Sent) true;
        case (#Paid, #Paid) true;
        case _ false;
      };
    }).toArray();
  };

  public func getByCustomer(state : State, customerId : CommonTypes.CustomerId) : [InvoiceTypes.Invoice] {
    state.filter(func(inv) {
      switch (inv.customerId) {
        case (?cid) cid == customerId;
        case null false;
      };
    }).toArray();
  };

  public func updatePaymentStatus(state : State, id : CommonTypes.InvoiceId, paymentStatus : CommonTypes.PaymentStatus) : ?InvoiceTypes.Invoice {
    var updated : ?InvoiceTypes.Invoice = null;
    state.mapInPlace(func(inv) {
      if (inv.invoiceId == id) {
        let u : InvoiceTypes.Invoice = { inv with paymentStatus; updatedAt = Time.now() };
        updated := ?u;
        u;
      } else { inv };
    });
    updated;
  };

  public func markEmailSent(state : State, id : CommonTypes.InvoiceId) : ?InvoiceTypes.Invoice {
    var updated : ?InvoiceTypes.Invoice = null;
    state.mapInPlace(func(inv) {
      if (inv.invoiceId == id) {
        let u : InvoiceTypes.Invoice = { inv with emailSent = true; updatedAt = Time.now() };
        updated := ?u;
        u;
      } else { inv };
    });
    updated;
  };

  public func generateInvoiceNumber(nextId : Nat) : Text {
    // INV-2026-NNNN format
    let padded = if (nextId < 10) "000" # nextId.toText()
      else if (nextId < 100) "00" # nextId.toText()
      else if (nextId < 1000) "0" # nextId.toText()
      else nextId.toText();
    "INV-2026-" # padded;
  };

  public func todaySalesTotal(state : State, nowNs : Int) : Nat {
    let startOfDay = nowNs - (nowNs % dayNs);
    state.foldLeft<Nat, InvoiceTypes.Invoice>(0, func(acc, inv) {
      let isPaid = switch (inv.paymentStatus) { case (#Paid) true; case _ false };
      if (isPaid and inv.updatedAt >= startOfDay) acc + inv.total else acc;
    });
  };

  public func monthlySalesTotal(state : State, nowNs : Int) : Nat {
    // Approximate: last 30 days
    let startOfMonth = nowNs - (30 * dayNs);
    state.foldLeft<Nat, InvoiceTypes.Invoice>(0, func(acc, inv) {
      let isPaid = switch (inv.paymentStatus) { case (#Paid) true; case _ false };
      if (isPaid and inv.updatedAt >= startOfMonth) acc + inv.total else acc;
    });
  };

  public func outstandingTotal(state : State) : Nat {
    state.foldLeft<Nat, InvoiceTypes.Invoice>(0, func(acc, inv) {
      switch (inv.paymentStatus) {
        case (#Unpaid) acc + inv.total;
        case (#Partial) acc + inv.total / 2; // approximate; partial is half remaining
        case (#Paid) acc;
      };
    });
  };
};
