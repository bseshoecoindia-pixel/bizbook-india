import CommonTypes "common";

module {
  public type InvoiceItem = {
    productId : ?CommonTypes.ProductId;
    productName : Text;
    quantity : Nat;
    unitPrice : Nat;
    discount : Nat;
    taxPercent : Nat;
    lineTotal : Nat;
  };

  public type Invoice = {
    invoiceId : CommonTypes.InvoiceId;
    invoiceNumber : Text;
    customerId : ?CommonTypes.CustomerId;
    customerName : Text;
    customerPhone : Text;
    items : [InvoiceItem];
    subtotal : Nat;
    cgst : Nat;
    sgst : Nat;
    discount : Nat;
    total : Nat;
    notes : ?Text;
    dueDate : ?CommonTypes.Timestamp;
    paymentStatus : CommonTypes.PaymentStatus;
    status : CommonTypes.InvoiceStatus;
    emailSent : Bool;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type InvoiceInput = {
    customerId : ?CommonTypes.CustomerId;
    customerName : Text;
    customerPhone : Text;
    items : [InvoiceItem];
    subtotal : Nat;
    cgst : Nat;
    sgst : Nat;
    discount : Nat;
    total : Nat;
    notes : ?Text;
    dueDate : ?CommonTypes.Timestamp;
    paymentStatus : CommonTypes.PaymentStatus;
    status : CommonTypes.InvoiceStatus;
  };
};
