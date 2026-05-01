import List "mo:core/List";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import ProductTypes "../types/product";

module {
  public type ProductState = List.List<ProductTypes.Product>;
  public type StockState = List.List<ProductTypes.StockUpdate>;

  public func create(state : ProductState, nextId : Nat, input : ProductTypes.ProductInput) : ProductTypes.Product {
    let product : ProductTypes.Product = {
      productId = nextId;
      name = input.name;
      category = input.category;
      sku = input.sku;
      barcode = input.barcode;
      purchasePrice = input.purchasePrice;
      sellingPrice = input.sellingPrice;
      quantity = input.quantity;
      unit = input.unit;
      taxPercent = input.taxPercent;
      imageUrl = input.imageUrl;
      supplierName = input.supplierName;
      createdAt = Time.now();
    };
    state.add(product);
    product;
  };

  public func getById(state : ProductState, id : CommonTypes.ProductId) : ?ProductTypes.Product {
    state.find(func(p) { p.productId == id });
  };

  public func update(state : ProductState, id : CommonTypes.ProductId, input : ProductTypes.ProductInput) : ?ProductTypes.Product {
    var updated : ?ProductTypes.Product = null;
    state.mapInPlace(func(p) {
      if (p.productId == id) {
        let u : ProductTypes.Product = {
          p with
          name = input.name;
          category = input.category;
          sku = input.sku;
          barcode = input.barcode;
          purchasePrice = input.purchasePrice;
          sellingPrice = input.sellingPrice;
          quantity = input.quantity;
          unit = input.unit;
          taxPercent = input.taxPercent;
          imageUrl = input.imageUrl;
          supplierName = input.supplierName;
        };
        updated := ?u;
        u;
      } else { p };
    });
    updated;
  };

  public func delete(state : ProductState, id : CommonTypes.ProductId) : Bool {
    let sizeBefore = state.size();
    let filtered = state.filter(func(p) { p.productId != id });
    state.clear();
    state.append(filtered);
    state.size() < sizeBefore;
  };

  public func list(state : ProductState, page : Nat, pageSize : Nat) : CommonTypes.PaginatedResult<ProductTypes.Product> {
    let total = state.size();
    let start : Int = page * pageSize;
    let startNat : Nat = if (start < 0) 0 else start.toNat();
    let endNat : Nat = if (startNat + pageSize > total) total else startNat + pageSize;
    let items = state.sliceToArray(startNat, endNat);
    { items; total; page; pageSize };
  };

  public func getLowStock(state : ProductState, threshold : Nat) : [ProductTypes.Product] {
    state.filter(func(p) { p.quantity < threshold }).toArray();
  };

  public func updateStock(
    productState : ProductState,
    stockState : StockState,
    nextUpdateId : Nat,
    productId : CommonTypes.ProductId,
    newQty : Nat,
    reason : Text,
  ) : ?ProductTypes.StockUpdate {
    switch (productState.find(func(p) { p.productId == productId })) {
      case null null;
      case (?product) {
        let previousQty = product.quantity;
        productState.mapInPlace(func(p) {
          if (p.productId == productId) { { p with quantity = newQty } } else { p };
        });
        let update : ProductTypes.StockUpdate = {
          updateId = nextUpdateId;
          productId;
          productName = product.name;
          previousQty;
          newQty;
          changeReason = reason;
          changedAt = Time.now();
        };
        stockState.add(update);
        ?update;
      };
    };
  };

  public func getStockHistory(stockState : StockState, productId : CommonTypes.ProductId) : [ProductTypes.StockUpdate] {
    stockState.filter(func(u) { u.productId == productId }).toArray();
  };

  public func totalInventoryValue(state : ProductState) : Nat {
    state.foldLeft<Nat, ProductTypes.Product>(0, func(acc, p) { acc + p.sellingPrice * p.quantity });
  };
};
