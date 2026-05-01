import List "mo:core/List";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import CustomerTypes "../types/customer";

module {
  public type State = List.List<CustomerTypes.Customer>;

  public func create(state : State, nextId : Nat, input : CustomerTypes.CustomerInput) : CustomerTypes.Customer {
    let customer : CustomerTypes.Customer = {
      customerId = nextId;
      name = input.name;
      phone = input.phone;
      email = input.email;
      address = input.address;
      gstNumber = input.gstNumber;
      totalPurchaseAmount = 0;
      pendingAmount = 0;
      createdAt = Time.now();
    };
    state.add(customer);
    customer;
  };

  public func getById(state : State, id : CommonTypes.CustomerId) : ?CustomerTypes.Customer {
    state.find(func(c) { c.customerId == id });
  };

  public func update(state : State, id : CommonTypes.CustomerId, input : CustomerTypes.CustomerInput) : ?CustomerTypes.Customer {
    var updated : ?CustomerTypes.Customer = null;
    state.mapInPlace(func(c) {
      if (c.customerId == id) {
        let u : CustomerTypes.Customer = {
          c with
          name = input.name;
          phone = input.phone;
          email = input.email;
          address = input.address;
          gstNumber = input.gstNumber;
        };
        updated := ?u;
        u;
      } else { c };
    });
    updated;
  };

  public func delete(state : State, id : CommonTypes.CustomerId) : Bool {
    let sizeBefore = state.size();
    let filtered = state.filter(func(c) { c.customerId != id });
    state.clear();
    state.append(filtered);
    state.size() < sizeBefore;
  };

  public func list(state : State, page : Nat, pageSize : Nat) : CommonTypes.PaginatedResult<CustomerTypes.Customer> {
    let total = state.size();
    let start : Int = page * pageSize;
    let startNat : Nat = if (start < 0) 0 else start.toNat();
    let endNat : Nat = if (startNat + pageSize > total) total else startNat + pageSize;
    let items = state.sliceToArray(startNat, endNat);
    { items; total; page; pageSize };
  };

  public func updateAmounts(state : State, id : CommonTypes.CustomerId, addPurchase : Nat, pendingDelta : Int) : () {
    state.mapInPlace(func(c) {
      if (c.customerId == id) {
        let newPending : Nat = if (pendingDelta >= 0) {
          c.pendingAmount + pendingDelta.toNat();
        } else {
          let sub = (-pendingDelta).toNat();
          if (sub > c.pendingAmount) 0 else c.pendingAmount - sub;
        };
        { c with totalPurchaseAmount = c.totalPurchaseAmount + addPurchase; pendingAmount = newPending };
      } else { c };
    });
  };
};
