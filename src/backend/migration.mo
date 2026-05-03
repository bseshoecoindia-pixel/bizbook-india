import List "mo:core/List";

module {
  // Old Expense type (before receiptUrl was added)
  type OldExpenseId = Nat;
  type OldExpenseCategory = {
    #office;
    #utilities;
    #transport;
    #rawMaterials;
    #marketing;
    #salaries;
    #rent;
    #other;
  };
  type OldTimestamp = Int;

  type OldExpense = {
    id : OldExpenseId;
    category : OldExpenseCategory;
    amount : Int;
    date : OldTimestamp;
    description : Text;
    notes : ?Text;
    createdAt : OldTimestamp;
    updatedAt : OldTimestamp;
  };

  // New Expense type (with receiptUrl)
  type NewExpense = {
    id : OldExpenseId;
    category : OldExpenseCategory;
    amount : Int;
    date : OldTimestamp;
    description : Text;
    notes : ?Text;
    receiptUrl : ?Text;
    createdAt : OldTimestamp;
    updatedAt : OldTimestamp;
  };

  // Old Invoice type (before emailSent was added)
  type OldInvoiceId = Nat;
  type OldCustomerId = Nat;
  type OldProductId = Nat;
  type OldPaymentStatus = { #Unpaid; #Partial; #Paid };
  type OldInvoiceStatus = { #Draft; #Sent; #Paid };

  type OldInvoiceItem = {
    productId : ?OldProductId;
    productName : Text;
    quantity : Nat;
    unitPrice : Nat;
    discount : Nat;
    taxPercent : Nat;
    lineTotal : Nat;
  };

  type OldInvoice = {
    invoiceId : OldInvoiceId;
    invoiceNumber : Text;
    customerId : ?OldCustomerId;
    customerName : Text;
    customerPhone : Text;
    items : [OldInvoiceItem];
    subtotal : Nat;
    cgst : Nat;
    sgst : Nat;
    discount : Nat;
    total : Nat;
    notes : ?Text;
    dueDate : ?OldTimestamp;
    paymentStatus : OldPaymentStatus;
    status : OldInvoiceStatus;
    createdAt : OldTimestamp;
    updatedAt : OldTimestamp;
  };

  // New Invoice type (with emailSent)
  type NewInvoice = {
    invoiceId : OldInvoiceId;
    invoiceNumber : Text;
    customerId : ?OldCustomerId;
    customerName : Text;
    customerPhone : Text;
    items : [OldInvoiceItem];
    subtotal : Nat;
    cgst : Nat;
    sgst : Nat;
    discount : Nat;
    total : Nat;
    notes : ?Text;
    dueDate : ?OldTimestamp;
    paymentStatus : OldPaymentStatus;
    status : OldInvoiceStatus;
    emailSent : Bool;
    createdAt : OldTimestamp;
    updatedAt : OldTimestamp;
  };

  type OldActor = {
    expenses : List.List<OldExpense>;
    invoices : List.List<OldInvoice>;
  };

  type NewActor = {
    expenses : List.List<NewExpense>;
    invoices : List.List<NewInvoice>;
  };

  public func run(old : OldActor) : NewActor {
    let expenses = old.expenses.map<OldExpense, NewExpense>(
      func(e) { { e with receiptUrl = null } }
    );
    let invoices = old.invoices.map<OldInvoice, NewInvoice>(
      func(inv) { { inv with emailSent = false } }
    );
    { expenses; invoices };
  };
};
