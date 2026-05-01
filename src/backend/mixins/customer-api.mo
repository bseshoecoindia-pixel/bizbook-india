import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CustomerLib "../lib/customer";
import CustomerTypes "../types/customer";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  customers : CustomerLib.State,
  nextCustomerId : { var val : Nat },
) {
  public query ({ caller }) func getCustomer(id : CommonTypes.CustomerId) : async ?CustomerTypes.Customer {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.getById(customers, id);
  };

  public query ({ caller }) func listCustomers(page : Nat, pageSize : Nat) : async CommonTypes.PaginatedResult<CustomerTypes.Customer> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.list(customers, page, pageSize);
  };

  public shared ({ caller }) func createCustomer(input : CustomerTypes.CustomerInput) : async CustomerTypes.Customer {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextCustomerId.val;
    nextCustomerId.val += 1;
    CustomerLib.create(customers, id, input);
  };

  public shared ({ caller }) func updateCustomer(id : CommonTypes.CustomerId, input : CustomerTypes.CustomerInput) : async ?CustomerTypes.Customer {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.update(customers, id, input);
  };

  public shared ({ caller }) func deleteCustomer(id : CommonTypes.CustomerId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.delete(customers, id);
  };
};
