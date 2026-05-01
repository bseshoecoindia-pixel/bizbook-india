import CommonTypes "common";

module {
  public type Customer = {
    customerId : CommonTypes.CustomerId;
    name : Text;
    phone : Text;
    email : ?Text;
    address : ?Text;
    gstNumber : ?Text;
    totalPurchaseAmount : Nat;
    pendingAmount : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  public type CustomerInput = {
    name : Text;
    phone : Text;
    email : ?Text;
    address : ?Text;
    gstNumber : ?Text;
  };
};
