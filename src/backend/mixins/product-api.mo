import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductLib "../lib/product";
import ProductTypes "../types/product";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : ProductLib.ProductState,
  stockUpdates : ProductLib.StockState,
  nextProductId : { var val : Nat },
  nextStockUpdateId : { var val : Nat },
) {
  public query ({ caller }) func getProduct(id : CommonTypes.ProductId) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProductLib.getById(products, id);
  };

  public query ({ caller }) func listProducts(page : Nat, pageSize : Nat) : async CommonTypes.PaginatedResult<ProductTypes.Product> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProductLib.list(products, page, pageSize);
  };

  public query ({ caller }) func getLowStockProducts() : async [ProductTypes.Product] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProductLib.getLowStock(products, 5);
  };

  public shared ({ caller }) func createProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextProductId.val;
    nextProductId.val += 1;
    ProductLib.create(products, id, input);
  };

  public shared ({ caller }) func updateProduct(id : CommonTypes.ProductId, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProductLib.update(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : CommonTypes.ProductId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProductLib.delete(products, id);
  };

  public shared ({ caller }) func updateProductStock(id : CommonTypes.ProductId, newQty : Nat, reason : Text) : async ?ProductTypes.StockUpdate {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let updateId = nextStockUpdateId.val;
    nextStockUpdateId.val += 1;
    ProductLib.updateStock(products, stockUpdates, updateId, id, newQty, reason);
  };

  public query ({ caller }) func getStockHistory(id : CommonTypes.ProductId) : async [ProductTypes.StockUpdate] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProductLib.getStockHistory(stockUpdates, id);
  };
};
