import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/supplier";
import SupplierLib "../lib/supplier";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  suppliers : List.List<Types.Supplier>,
  nextSupplierId : { var val : Nat },
) {
  public query ({ caller }) func listSuppliers() : async [Types.Supplier] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.listSuppliers(suppliers);
  };

  public query ({ caller }) func getSupplier(id : Types.SupplierId) : async ?Types.Supplier {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.getSupplier(suppliers, id);
  };

  public shared ({ caller }) func createSupplier(input : Types.SupplierInput) : async Types.Supplier {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextSupplierId.val;
    nextSupplierId.val += 1;
    SupplierLib.addSupplier(suppliers, id, input);
  };

  public shared ({ caller }) func updateSupplier(id : Types.SupplierId, input : Types.SupplierInput) : async ?Types.Supplier {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.updateSupplier(suppliers, id, input);
  };

  public shared ({ caller }) func deleteSupplier(id : Types.SupplierId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.deleteSupplier(suppliers, id);
  };

  public shared ({ caller }) func recordSupplierPurchase(id : Types.SupplierId, amount : Int) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.recordPurchase(suppliers, id, amount);
  };

  public shared ({ caller }) func recordSupplierPayment(id : Types.SupplierId, amount : Int) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SupplierLib.recordPayment(suppliers, id, amount);
  };
};
