import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PurchaseLib "../lib/purchase";
import PurchaseTypes "../types/purchase";
import CommonTypes "../types/common";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  purchases : List.List<PurchaseTypes.Purchase>,
  nextPurchaseId : { var val : Nat },
) {
  public shared ({ caller }) func createPurchase(input : PurchaseTypes.PurchaseInput) : async PurchaseTypes.Purchase {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextPurchaseId.val;
    nextPurchaseId.val += 1;
    PurchaseLib.createPurchase(purchases, id, input);
  };

  public shared ({ caller }) func updatePurchase(id : PurchaseTypes.PurchaseId, input : PurchaseTypes.PurchaseInput) : async ?PurchaseTypes.Purchase {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.updatePurchase(purchases, id, input);
  };

  public shared ({ caller }) func deletePurchase(id : PurchaseTypes.PurchaseId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.deletePurchase(purchases, id);
  };

  public query ({ caller }) func getPurchase(id : PurchaseTypes.PurchaseId) : async ?PurchaseTypes.Purchase {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.getPurchase(purchases, id);
  };

  public query ({ caller }) func listPurchases() : async [PurchaseTypes.Purchase] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.listPurchases(purchases);
  };

  public query ({ caller }) func listPurchasesBySupplier(supplierId : CommonTypes.SupplierId) : async [PurchaseTypes.Purchase] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.listPurchasesBySupplier(purchases, supplierId);
  };

  public query ({ caller }) func listPurchasesByStatus(status : PurchaseTypes.PurchaseStatus) : async [PurchaseTypes.Purchase] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.listPurchasesByStatus(purchases, status);
  };
};
