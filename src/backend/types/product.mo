import CommonTypes "common";

module {
  public type Product = {
    productId : CommonTypes.ProductId;
    name : Text;
    category : Text;
    sku : Text;
    barcode : ?Text;
    purchasePrice : Nat;
    sellingPrice : Nat;
    quantity : Nat;
    unit : Text;
    taxPercent : Nat;
    imageUrl : ?Text;
    supplierName : ?Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type ProductInput = {
    name : Text;
    category : Text;
    sku : Text;
    barcode : ?Text;
    purchasePrice : Nat;
    sellingPrice : Nat;
    quantity : Nat;
    unit : Text;
    taxPercent : Nat;
    imageUrl : ?Text;
    supplierName : ?Text;
  };

  public type StockUpdate = {
    updateId : CommonTypes.StockUpdateId;
    productId : CommonTypes.ProductId;
    productName : Text;
    previousQty : Nat;
    newQty : Nat;
    changeReason : Text;
    changedAt : CommonTypes.Timestamp;
  };
};
