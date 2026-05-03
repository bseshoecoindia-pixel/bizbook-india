import CommonTypes "common";

module {
  public type PurchaseId = Nat;

  public type PurchaseStatus = {
    #ordered;
    #received;
    #cancelled;
  };

  public type Purchase = {
    id : PurchaseId;
    supplierId : ?CommonTypes.SupplierId;
    supplierName : Text;
    date : CommonTypes.Timestamp;
    amount : Int;
    status : PurchaseStatus;
    description : ?Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type PurchaseInput = {
    supplierId : ?CommonTypes.SupplierId;
    supplierName : Text;
    date : CommonTypes.Timestamp;
    amount : Int;
    status : PurchaseStatus;
    description : ?Text;
  };
};
