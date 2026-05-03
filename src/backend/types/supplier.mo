import Types "common";

module {
  public type SupplierId = Nat;

  public type Supplier = {
    id : SupplierId;
    name : Text;
    phone : Text;
    email : ?Text;
    address : ?Text;
    gstNumber : ?Text;
    paymentTerms : ?Text;
    notes : ?Text;
    totalPurchases : Int;
    pendingAmount : Int;
    createdAt : Types.Timestamp;
    updatedAt : Types.Timestamp;
  };

  public type SupplierInput = {
    name : Text;
    phone : Text;
    email : ?Text;
    address : ?Text;
    gstNumber : ?Text;
    paymentTerms : ?Text;
    notes : ?Text;
  };
};
