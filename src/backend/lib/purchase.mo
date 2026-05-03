import Types "../types/purchase";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type State = List.List<Types.Purchase>;

  public func createPurchase(state : State, nextId : Nat, input : Types.PurchaseInput) : Types.Purchase {
    let now = Time.now();
    let purchase : Types.Purchase = {
      id = nextId;
      supplierId = input.supplierId;
      supplierName = input.supplierName;
      date = input.date;
      amount = input.amount;
      status = input.status;
      description = input.description;
      createdAt = now;
    };
    state.add(purchase);
    purchase;
  };

  public func updatePurchase(state : State, id : Types.PurchaseId, input : Types.PurchaseInput) : ?Types.Purchase {
    var updated : ?Types.Purchase = null;
    state.mapInPlace(func(p) {
      if (p.id == id) {
        let u : Types.Purchase = {
          p with
          supplierId = input.supplierId;
          supplierName = input.supplierName;
          date = input.date;
          amount = input.amount;
          status = input.status;
          description = input.description;
        };
        updated := ?u;
        u;
      } else { p };
    });
    updated;
  };

  public func deletePurchase(state : State, id : Types.PurchaseId) : Bool {
    let sizeBefore = state.size();
    let filtered = state.filter(func(p) { p.id != id });
    state.clear();
    state.append(filtered);
    state.size() < sizeBefore;
  };

  public func getPurchase(state : State, id : Types.PurchaseId) : ?Types.Purchase {
    state.find(func(p) { p.id == id });
  };

  public func listPurchases(state : State) : [Types.Purchase] {
    state.toArray();
  };

  public func listPurchasesBySupplier(state : State, supplierId : Nat) : [Types.Purchase] {
    state.filter(func(p) {
      switch (p.supplierId) {
        case (?sid) sid == supplierId;
        case null false;
      };
    }).toArray();
  };

  public func listPurchasesByStatus(state : State, status : Types.PurchaseStatus) : [Types.Purchase] {
    state.filter(func(p) {
      switch (p.status, status) {
        case (#ordered, #ordered) true;
        case (#received, #received) true;
        case (#cancelled, #cancelled) true;
        case _ false;
      };
    }).toArray();
  };
};
